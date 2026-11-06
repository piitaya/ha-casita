/**
 * Plays the TTS answer and exposes its loudness, so Casita's mouth follows the real audio.
 * WebAudio: <audio> → MediaElementSource → Analyser → destination.
 */

export interface SpeechPlayback {
  /** Smoothed loudness 0..1 of what is heard right now. */
  level(): number;
  /** True once the analyser has heard something (false = no usable signal, e.g. CORS). */
  readonly heard: boolean;
  readonly playing: boolean;
  /** Seconds, NaN or Infinity while unknown (streamed audio). */
  duration(): number;
  stop(): void;
}

export interface PlayCallbacks {
  onStart?: (p: SpeechPlayback) => void;
  onEnd?: () => void;
  /** Playback impossible (autoplay policy, decode error…): fall back to text lip-sync. */
  onError?: (err: unknown) => void;
}

let sharedContext: AudioContext | undefined;
const getContext = (): AudioContext | undefined => {
  if (!sharedContext) {
    try {
      sharedContext = new AudioContext();
    } catch {
      return undefined;
    }
  }
  return sharedContext;
};

/** Call from a user gesture so later playback is allowed. */
export const unlockAudio = () => {
  const ctx = getContext();
  if (ctx && ctx.state === "suspended") ctx.resume().catch(() => undefined);
};

export const playSpeech = (url: string, cb: PlayCallbacks = {}): SpeechPlayback => {
  const audio = new Audio();
  audio.preload = "auto";
  let analyser: AnalyserNode | undefined;
  let buf: Float32Array<ArrayBuffer> | undefined;
  let source: MediaElementAudioSourceNode | undefined;
  let smooth = 0;
  let heard = false;
  let playing = false;
  let done = false;

  const ctx = getContext();
  if (ctx) {
    try {
      source = ctx.createMediaElementSource(audio);
      analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.1;
      buf = new Float32Array(analyser.fftSize);
      source.connect(analyser);
      analyser.connect(ctx.destination);
    } catch {
      analyser = undefined;
    }
  }

  const finish = (err?: unknown) => {
    if (done) return;
    done = true;
    playing = false;
    try {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
    } catch {
      /* ignore */
    }
    try {
      source?.disconnect();
      analyser?.disconnect();
    } catch {
      /* ignore */
    }
    if (err !== undefined) cb.onError?.(err);
    else cb.onEnd?.();
  };

  const playback: SpeechPlayback = {
    level() {
      if (!analyser || !buf || !playing) return 0;
      analyser.getFloatTimeDomainData(buf);
      let sq = 0;
      for (let i = 0; i < buf.length; i++) sq += buf[i] * buf[i];
      const rms = Math.sqrt(sq / buf.length);
      if (rms > 0.004) heard = true;
      // speech RMS sits around 0.02–0.25: map to 0..1 with a soft knee
      const x = Math.max(0, rms - 0.01) * 5;
      const target = Math.min(1, x / (0.35 + x) * 1.35);
      smooth += (target - smooth) * (target > smooth ? 0.6 : 0.25);
      return smooth;
    },
    get heard() {
      return heard;
    },
    get playing() {
      return playing;
    },
    duration() {
      return audio.duration;
    },
    stop() {
      finish();
    },
  };

  audio.addEventListener("playing", () => {
    if (done || playing) return;
    playing = true;
    cb.onStart?.(playback);
  });
  audio.addEventListener("ended", () => finish());
  audio.addEventListener("error", () => finish(audio.error ?? new Error("audio error")));
  audio.src = url;
  if (ctx && ctx.state === "suspended") ctx.resume().catch(() => undefined);
  audio.play().catch((err) => finish(err ?? new Error("play rejected")));
  return playback;
};
