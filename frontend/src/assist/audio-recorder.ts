/**
 * Microphone capture for the Assist pipeline, modelled on the HA frontend
 * (src/util/audio-recorder.ts + recorder-worklet.js). Differences:
 * - the worklet is inlined (Blob URL) so the panel stays a single file;
 * - it downsamples to 16 kHz mono 16-bit PCM in the worklet, the format STT expects
 *   (HA core would also resample another rate, see assist_pipeline/websocket_api.py);
 * - it reports a level (RMS) so Casita can react to the voice before VAD events arrive.
 */

export type MicrophoneError = "not_supported" | "permission_denied" | "not_found" | "in_use" | "unknown";

export const TARGET_RATE = 16000;

const WORKLET = `
class CasitaRecorder extends AudioWorkletProcessor {
  constructor() {
    super();
    this.ratio = sampleRate / ${TARGET_RATE};
    this.acc = 0; this.n = 0; this.pos = 0;
    this.out = new Int16Array(${TARGET_RATE / 50}); this.o = 0; this.sq = 0;
  }
  process(inputs) {
    const input = inputs[0];
    if (!input || !input.length) return true;
    const ch = input[0];
    for (let i = 0; i < ch.length; i++) {
      // box filter over each output sample's span of input samples
      this.acc += ch[i]; this.n++; this.pos += 1;
      if (this.pos >= this.ratio) {
        this.pos -= this.ratio;
        let s = this.acc / this.n; this.acc = 0; this.n = 0;
        s = s < -1 ? -1 : s > 1 ? 1 : s;
        this.sq += s * s;
        this.out[this.o++] = s < 0 ? s * 0x8000 : s * 0x7fff;
        if (this.o === this.out.length) {
          this.port.postMessage({ pcm: this.out, rms: Math.sqrt(this.sq / this.o) });
          this.out = new Int16Array(this.out.length); this.o = 0; this.sq = 0;
        }
      }
    }
    return true;
  }
}
registerProcessor("casita-recorder", CasitaRecorder);
`;

const errorFromName = (name?: string): MicrophoneError => {
  switch (name) {
    case "NotAllowedError":
    case "SecurityError":
      return "permission_denied";
    case "NotFoundError":
    case "OverconstrainedError":
      return "not_found";
    case "NotReadableError":
      return "in_use";
    default:
      return "unknown";
  }
};

export class AudioRecorder {
  private _context?: AudioContext;

  private _stream?: MediaStream;

  private _source?: MediaStreamAudioSourceNode;

  private _node?: AudioWorkletNode;

  private _active = false;

  constructor(private _onChunk: (pcm: Int16Array, rms: number) => void) {}

  public static get isSupported() {
    return (
      window.isSecureContext &&
      "AudioContext" in window &&
      "AudioWorkletNode" in window &&
      !!navigator.mediaDevices?.getUserMedia
    );
  }

  public get active() {
    return this._active;
  }

  public readonly sampleRate = TARGET_RATE;

  public async start(): Promise<MicrophoneError | undefined> {
    if (!AudioRecorder.isSupported) return "not_supported";
    if (this._context && this._stream && this._node) {
      this._stream.getTracks().forEach((t) => (t.enabled = true));
      await this._context.resume();
      this._active = true;
      return undefined;
    }
    let url: string | undefined;
    try {
      const context = new AudioContext();
      this._context = context;
      this._stream = await navigator.mediaDevices.getUserMedia({
        audio: { channelCount: 1, echoCancellation: true, noiseSuppression: true, autoGainControl: true },
      });
      url = URL.createObjectURL(new Blob([WORKLET], { type: "application/javascript" }));
      await context.audioWorklet.addModule(url);
      this._source = context.createMediaStreamSource(this._stream);
      this._node = new AudioWorkletNode(context, "casita-recorder");
      this._node.port.onmessage = (e: MessageEvent<{ pcm: Int16Array; rms: number }>) => {
        if (this._active) this._onChunk(e.data.pcm, e.data.rms);
      };
      this._source.connect(this._node);
      this._active = true;
      return undefined;
    } catch (err) {
      this.close();
      return errorFromName(err instanceof DOMException ? err.name : undefined);
    } finally {
      if (url) URL.revokeObjectURL(url);
    }
  }

  public async stop() {
    this._active = false;
    this._stream?.getTracks().forEach((t) => (t.enabled = false));
    try {
      await this._context?.suspend();
    } catch {
      /* already closed */
    }
  }

  public close() {
    this._active = false;
    this._stream?.getTracks().forEach((t) => t.stop());
    if (this._node) this._node.port.onmessage = null;
    this._source?.disconnect();
    this._context?.close().catch(() => undefined);
    this._stream = undefined;
    this._source = undefined;
    this._node = undefined;
    this._context = undefined;
  }
}
