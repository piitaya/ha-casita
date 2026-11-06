import type { ReactiveController, ReactiveControllerHost } from "lit";
import type { CasitaEmotionEvent, CasitaInfo } from "../data/casita";
import { isEmotion } from "../data/casita";
import type { HomeAssistant, UnsubscribeFunc } from "../data/ha";
import type { Life } from "../life/life";
import type { Strings } from "../i18n";
import { AudioRecorder, type MicrophoneError } from "./audio-recorder";
import {
  CASITA_ENGINE,
  EmotionTagStripper,
  isConnectionError,
  runAssistPipeline,
  stripEmotionTag,
  type AssistPipeline,
  type PipelineRunEvent,
} from "./pipeline";
import { playSpeech, unlockAudio, type SpeechPlayback } from "./speech-player";

export interface ConversationDeps {
  hass(): HomeAssistant | undefined;
  life(): Life | undefined;
  pipeline(): AssistPipeline | undefined;
  info(): CasitaInfo | undefined;
  strings(): Strings;
  /** Short message under the chat pill (mic errors, missing TTS…). */
  note(text: string | undefined): void;
}

interface Run {
  n: number;
  voice: boolean;
  unsub?: UnsubscribeFunc;
  pipeline?: AssistPipeline;
  convId?: string | null;
  expectAudio: boolean;
  ttsUrl?: string;
  audioStarted: boolean;
  role?: string;
  stripper: EmotionTagStripper;
  streamed: boolean;
  replied: boolean;
  ended: boolean;
  continueConversation: boolean;
  emotionEvent?: CasitaEmotionEvent;
  waiters: ((ev: CasitaEmotionEvent | undefined) => void)[];
  intentStarted: number;
  /** The pipeline's agent is a Casita: his emotions may show. */
  casita: boolean;
}

const EMOTION_WAIT_MS = 900;

/**
 * Talks to the Assist pipeline (text and microphone) and drives Casita's conversation
 * choreography from the pipeline events. Modelled on the HA frontend's ha-assist-chat.
 */
export class ConversationController implements ReactiveController {
  public listening = false;

  public busy = false;

  public conversationId: string | null = null;

  private _run?: Run;

  private _n = 0;

  private _recorder?: AudioRecorder;

  private _audioBuffer?: Int16Array[];

  private _handlerId?: number | null;

  private _playback?: SpeechPlayback;

  private _heardTimer?: ReturnType<typeof setTimeout>;

  constructor(
    private _host: ReactiveControllerHost,
    private _deps: ConversationDeps
  ) {
    _host.addController(this);
  }

  public hostDisconnected() {
    this.cancel();
    this._recorder?.close();
    this._recorder = undefined;
  }

  public get micSupported() {
    return AudioRecorder.isSupported;
  }

  /** Stops whatever runs: pipeline, microphone and voice. */
  public cancel() {
    const run = this._run;
    this._run = undefined;
    if (run && !run.ended) {
      run.ended = true;
      Promise.resolve(run.unsub?.()).catch(() => undefined);
    }
    this._stopListening();
    this._stopAudio();
    this._setBusy(false);
  }

  // ------------------------------------------------------------------ text
  public async sendText(text: string) {
    text = text.trim();
    const hass = this._deps.hass();
    if (!text || !hass) return;
    unlockAudio();
    this.cancel();
    this._deps.life()?.userSent();
    const pipeline = this._deps.pipeline();
    const run = this._newRun(false, pipeline);
    try {
      run.unsub = await runAssistPipeline(hass, (ev) => this._onEvent(run, ev), {
        start_stage: "intent",
        end_stage: run.expectAudio ? "tts" : "intent",
        input: { text },
        pipeline: pipeline?.id,
        conversation_id: this.conversationId,
      });
      if (run.ended) Promise.resolve(run.unsub()).catch(() => undefined);
    } catch (err: any) {
      this._failRun(run, String(err?.code ?? "connection"), err?.message);
    }
  }

  // ------------------------------------------------------------------ microphone
  public toggleMic() {
    if (this.listening) this._finishSpeaking();
    else this.startListening();
  }

  public async startListening() {
    const hass = this._deps.hass();
    if (!hass) return;
    unlockAudio();
    this.cancel();
    if (!AudioRecorder.isSupported) {
      this._deps.note(this._deps.strings().micUnsupported);
      return;
    }
    const pipeline = this._deps.pipeline();
    const run = this._newRun(true, pipeline);
    if (!this._recorder) {
      this._recorder = new AudioRecorder((pcm, rms) => {
        this._deps.life()?.voiceLevel(rms);
        if (this._audioBuffer) this._audioBuffer.push(pcm);
        else this._sendAudioChunk(pcm);
      });
    }
    this._handlerId = undefined;
    this._audioBuffer = [];
    const err = await this._recorder.start();
    if (run !== this._run) return;
    if (err) {
      this._audioBuffer = undefined;
      this._run = undefined;
      this._setBusy(false);
      this._deps.note(this._micError(err));
      return;
    }
    this.listening = true;
    this._host.requestUpdate();
    this._deps.life()?.listen({ wake: true, source: "panel" });
    try {
      run.unsub = await runAssistPipeline(hass, (ev) => this._onEvent(run, ev), {
        start_stage: "stt",
        end_stage: run.expectAudio ? "tts" : "intent",
        input: { sample_rate: this._recorder.sampleRate },
        pipeline: pipeline?.id,
        conversation_id: this.conversationId,
      });
      if (run.ended) Promise.resolve(run.unsub()).catch(() => undefined);
    } catch (e: any) {
      this._stopListening();
      this._failRun(run, String(e?.code ?? "connection"), e?.message);
    }
  }

  private _micError(err: MicrophoneError) {
    const S = this._deps.strings();
    switch (err) {
      case "not_supported":
        return S.micUnsupported;
      case "permission_denied":
        return S.micDenied;
      case "not_found":
        return S.micNotFound;
      case "in_use":
        return S.micInUse;
      default:
        return S.micError;
    }
  }

  /** The user pressed the mic again: end the audio stream, STT finishes with what it has. */
  private _finishSpeaking() {
    this._stopListening();
  }

  private _stopListening() {
    this._recorder?.stop();
    if (this._handlerId != null) {
      if (this._audioBuffer) for (const chunk of this._audioBuffer) this._sendAudioChunk(chunk);
      // an empty message ends the audio stream
      this._sendAudioChunk(new Int16Array());
      this._handlerId = undefined;
    }
    this._audioBuffer = undefined;
    if (this.listening) {
      this.listening = false;
      this._host.requestUpdate();
    }
  }

  private _sendAudioChunk(chunk: Int16Array) {
    const socket = this._deps.hass()?.connection.socket;
    if (this._handlerId == null || !socket) return;
    socket.binaryType = "arraybuffer";
    // 1 byte of handler id, then 16-bit little endian PCM (as the HA frontend does)
    const data = new Uint8Array(1 + chunk.length * 2);
    data[0] = this._handlerId;
    data.set(new Uint8Array(chunk.buffer, chunk.byteOffset, chunk.byteLength), 1);
    socket.send(data);
  }

  // ------------------------------------------------------------------ casita_emotion
  /** Returns true when the event belongs to the running conversation. */
  public onCasitaEmotion(ev: CasitaEmotionEvent): boolean {
    const run = this._run;
    // one emotion per reply; once the reply is out, later events are not ours
    if (!run || !run.intentStarted || run.emotionEvent) return false;
    if (run.ended && !run.waiters.length) return false;
    const fresh = Date.now() - run.intentStarted < 120000;
    const engine = run.pipeline?.conversation_engine;
    if (ev.agent_id && engine && ev.agent_id !== engine) return false;
    const ours = ev.conversation_id ? ev.conversation_id === run.convId : !ev.device_id && fresh;
    if (!ours) return false;
    run.emotionEvent = ev;
    const w = run.waiters.splice(0);
    w.forEach((fn) => fn(ev));
    return true;
  }

  private _waitEmotion(run: Run): Promise<CasitaEmotionEvent | undefined> {
    if (run.emotionEvent) return Promise.resolve(run.emotionEvent);
    return new Promise((resolve) => {
      const t = setTimeout(() => {
        run.waiters = run.waiters.filter((f) => f !== done);
        resolve(undefined);
      }, EMOTION_WAIT_MS);
      const done = (ev: CasitaEmotionEvent | undefined) => {
        clearTimeout(t);
        resolve(ev);
      };
      run.waiters.push(done);
    });
  }

  // ------------------------------------------------------------------ pipeline events
  private _newRun(voice: boolean, pipeline: AssistPipeline | undefined): Run {
    const run: Run = {
      n: ++this._n,
      voice,
      pipeline,
      expectAudio: !!pipeline?.tts_engine,
      audioStarted: false,
      stripper: new EmotionTagStripper(),
      streamed: false,
      replied: false,
      ended: false,
      continueConversation: false,
      waiters: [],
      intentStarted: 0,
      casita: false,
    };
    run.casita = this._isCasita(run);
    this._run = run;
    this._setBusy(true);
    return run;
  }

  private _isCasita(run: Run) {
    const engine = run.pipeline?.conversation_engine;
    const info = this._deps.info();
    return !!engine && (engine === CASITA_ENGINE || !!info?.entries.some((e) => e.conversation_entity === engine));
  }

  private _onEvent(run: Run, ev: PipelineRunEvent) {
    if (run !== this._run || run.ended) return;
    const life = this._deps.life();
    switch (ev.type) {
      case "run-start":
        this._handlerId = ev.data.runner_data?.stt_binary_handler_id ?? undefined;
        if (ev.data.tts_output?.url) run.ttsUrl = ev.data.tts_output.url;
        if (ev.data.conversation_id) run.convId = ev.data.conversation_id;
        break;
      case "wake_word-end":
        life?.listen({ wake: true, source: "panel" });
        break;
      case "stt-start":
        if (this._audioBuffer) {
          for (const chunk of this._audioBuffer) this._sendAudioChunk(chunk);
          this._audioBuffer = undefined;
        }
        break;
      case "stt-vad-start":
        life?.voice(true);
        break;
      case "stt-vad-end":
        life?.voice(false);
        break;
      case "stt-end": {
        this._handlerId = undefined;
        this._stopListening();
        const text = ev.data.stt_output?.text?.trim();
        if (text) this._deps.note(`« ${text} »`);
        life?.think();
        break;
      }
      case "intent-start":
        run.intentStarted = Date.now();
        if (ev.data.conversation_id) run.convId = ev.data.conversation_id;
        life?.think();
        break;
      case "intent-progress": {
        if (ev.data.tts_start_streaming && run.ttsUrl && run.expectAudio) this._startAudio(run, run.ttsUrl);
        const d = ev.data.chat_log_delta;
        if (!d) break;
        if (d.role) {
          run.role = d.role;
          if (d.role === "assistant") run.stripper.newMessage();
        }
        if (run.role === "assistant" && d.content) {
          const shown = run.stripper.push(d.content);
          if (shown) {
            run.streamed = true;
            life?.streamText(shown, run.casita ? run.stripper.emotion : undefined, run.expectAudio);
          }
        }
        break;
      }
      case "intent-end":
        this._onIntentEnd(run, ev.data.intent_output, !!ev.data.processed_locally);
        if (!run.expectAudio) this._endRun(run);
        break;
      case "tts-start":
        break;
      case "tts-end":
        if (!run.audioStarted && ev.data.tts_output?.url) this._startAudio(run, ev.data.tts_output.url);
        break;
      case "run-end":
        this._endRun(run);
        break;
      case "error":
        this._failRun(run, ev.data.code, ev.data.message);
        break;
    }
  }

  private async _onIntentEnd(run: Run, out: { conversation_id: string | null; response: any; continue_conversation?: boolean }, processedLocally: boolean) {
    const life = this._deps.life();
    // a reply is coming (the emotion may take a moment): the run end must not release Casita
    run.replied = true;
    if (out?.conversation_id) {
      this.conversationId = out.conversation_id;
      run.convId = run.convId ?? out.conversation_id;
    }
    run.continueConversation = !!out?.continue_conversation;
    const raw: string = out?.response?.speech?.plain?.speech ?? "";
    const tail = run.stripper.flush();
    if (tail && !raw) life?.streamText(tail, run.casita ? run.stripper.emotion : undefined, run.expectAudio);
    const { text, emotion: tagEmotion } = stripEmotionTag(raw);
    // Only Casita gives emotions. Another agent, or a command handled locally before
    // reaching Casita, is spoken on his resting face: nothing is guessed from the reply.
    // (Only real problems show: Problem on a pipeline error, NoInternet when offline.)
    let emotion = "Normal";
    if (run.casita && !processedLocally) {
      const ev = await this._waitEmotion(run);
      if (run !== this._run) return;
      emotion = (ev && isEmotion(ev.emotion) ? ev.emotion : undefined) ?? run.stripper.emotion ?? tagEmotion ?? "Normal";
    }
    // no audio will play for an empty answer
    const willSpeak = run.expectAudio && !!text;
    life?.reply({
      text,
      emotion,
      expectAudio: willSpeak,
      success: run.casita && !processedLocally && out?.response?.response_type === "action_done",
      done: () => {
        if (!run.expectAudio || !text) this._maybeContinue(run);
      },
    });
  }

  private _startAudio(run: Run, url: string) {
    const hass = this._deps.hass();
    if (!hass || run.audioStarted) return;
    run.audioStarted = true;
    this._stopAudio();
    const life = this._deps.life();
    this._playback = playSpeech(hass.hassUrl(url), {
      onStart: (p) => {
        if (run !== this._run && this._run) return;
        life?.speak(p);
        clearTimeout(this._heardTimer);
        // no usable signal (silent stream, cross-origin audio): lip-sync from the text
        this._heardTimer = setTimeout(() => {
          if (p.playing && !p.heard) life?.speechFailed();
        }, 900);
      },
      onEnd: () => {
        clearTimeout(this._heardTimer);
        this._playback = undefined;
        life?.speechEnded();
        this._maybeContinue(run);
      },
      onError: () => {
        clearTimeout(this._heardTimer);
        this._playback = undefined;
        life?.speechFailed();
      },
    });
  }

  private _stopAudio() {
    clearTimeout(this._heardTimer);
    const p = this._playback;
    this._playback = undefined;
    p?.stop();
  }

  private _maybeContinue(run: Run) {
    if (!run.continueConversation || run.n !== this._n) return;
    run.continueConversation = false;
    if (run.voice) setTimeout(() => this.startListening(), 350);
  }

  private _endRun(run: Run) {
    if (run.ended) return;
    run.ended = true;
    Promise.resolve(run.unsub?.()).catch(() => undefined);
    if (run === this._run) {
      this._stopListening();
      this._setBusy(false);
      if (!run.replied) this._deps.life()?.endConversation();
    }
  }

  private _failRun(run: Run, code: string | undefined, message: string | undefined) {
    if (run !== this._run) return;
    const S = this._deps.strings();
    this._stopListening();
    this._stopAudio();
    run.ended = true;
    Promise.resolve(run.unsub?.()).catch(() => undefined);
    this._run = undefined;
    this._setBusy(false);
    const offline = isConnectionError(code, message) || this._deps.hass()?.connected === false;
    const text = code === "stt-no-text-recognized" ? S.notUnderstood : offline ? S.oopsNet : S.oops;
    this._deps.life()?.fail({ offline, text });
  }

  private _setBusy(busy: boolean) {
    if (this.busy === busy) return;
    this.busy = busy;
    this._host.requestUpdate();
  }
}
