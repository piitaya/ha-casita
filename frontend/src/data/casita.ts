/* eslint-disable @typescript-eslint/no-explicit-any */
import type { HomeAssistant } from "./ha";

export const MOOD_KEYS = [
  "joy",
  "excitement",
  "energy",
  "affection",
  "irritation",
  "curiosity",
] as const;
export type MoodKey = (typeof MOOD_KEYS)[number];
export type MoodValues = Record<MoodKey, number>;

export const EMOTIONS = [
  "Normal", "Alert", "Angry", "Scared", "Cheeky", "DeadAss", "Dead", "Devious",
  "Focusing", "Grateful", "Grinning", "Happy", "Hurt", "Initializing", "Loading",
  "Loving", "NoInternet", "Pleading", "Problem", "Sad", "Silly", "Sleeping",
  "Smiling", "Sweating", "UwU", "WTF", "Winking", "WinkingSmile",
] as const;
export type Emotion = (typeof EMOTIONS)[number];
export const isEmotion = (v: unknown): v is Emotion =>
  typeof v === "string" && (EMOTIONS as readonly string[]).includes(v);

/** One Casita config entry, as listed by `casita/info` (contract v0.2, "Changes"). */
export interface CasitaEntry {
  entry_id: string;
  title: string;
  conversation_entity: string;
  emotion_entity: string;
  mood_entities: Partial<Record<MoodKey, string>>;
  diagnostic_entities?: Record<string, string>;
  /** LLM conversation agent of the entry (options), null without one. */
  llm_agent?: string | null;
  /** Weather entity of the entry (options), shown through the window. */
  weather_entity?: string | null;
}

/** Answer of `casita/info`: every loaded entry. */
export interface CasitaInfo {
  version?: string;
  entries: CasitaEntry[];
}

export const fetchCasitaInfo = async (hass: HomeAssistant): Promise<CasitaInfo> => {
  const raw = await hass.callWS<any>({ type: "casita/info" });
  // the first draft of the contract answered with a single entry: accept both shapes
  if (raw && Array.isArray(raw.entries)) return { version: raw.version, entries: raw.entries.filter((e: any) => e && e.entry_id) };
  if (raw && raw.entry_id) return { version: raw.version, entries: [{ title: "Casita", ...raw }] };
  return { version: raw?.version, entries: [] };
};

/** The entry whose agent is this conversation engine, if it is a Casita agent. */
export const entryForEngine = (info: CasitaInfo | undefined, engine: string | null | undefined) =>
  engine ? info?.entries.find((e) => e.conversation_entity === engine) : undefined;

/** The Casita the panel shows: the agent of the pipeline, else the first entry. */
export const resolveEntry = (info: CasitaInfo | undefined, engine: string | null | undefined): CasitaEntry | undefined =>
  entryForEngine(info, engine) ?? info?.entries[0];

/**
 * Name of an entry (HUD heading). Entries share the "Casita" title by default, so a title
 * used twice gets its LLM agent (when known) or its conversation entity id.
 */
export const entryLabel = (entry: CasitaEntry, entries: CasitaEntry[], hass?: HomeAssistant): string => {
  const title = entry.title || "Casita";
  if (entries.filter((e) => (e.title || "Casita") === title).length < 2) return title;
  const llm = entry.llm_agent ? (hass?.states[entry.llm_agent]?.attributes.friendly_name as string | undefined) || entry.llm_agent : undefined;
  return `${title} (${llm ?? entry.conversation_entity ?? entry.entry_id})`;
};

/** Payload of the `casita_emotion` event, also mirrored in the sensor attributes. */
export interface CasitaEmotionEvent {
  emotion: string;
  source?: string;
  text?: string;
  agent_id?: string;
  conversation_id?: string | null;
  device_id?: string | null;
  updated?: string;
}

export const INTERACT_KINDS = [
  "pet", "poke", "tickle", "hug", "shake", "throw", "wake", "greet", "ignore",
] as const;
export type InteractKind = (typeof INTERACT_KINDS)[number];

/** Reads the six mood sensors from `hass.states`. Missing or unavailable ones are left out. */
export const readMood = (
  hass: HomeAssistant,
  entry: CasitaEntry | undefined
): Partial<MoodValues> | undefined => {
  if (!entry) return undefined;
  const out: Partial<MoodValues> = {};
  let n = 0;
  for (const k of MOOD_KEYS) {
    const id = entry.mood_entities[k];
    const st = id ? hass.states[id] : undefined;
    const v = st ? parseFloat(st.state) : NaN;
    if (Number.isFinite(v)) {
      out[k] = v;
      n++;
    }
  }
  return n ? out : undefined;
};

/**
 * Calls `casita.interact` at most once per kind every `windowMs`,
 * adding up the intensity of what happened in between (contract v0.2).
 */
export class InteractThrottle {
  private _last = new Map<InteractKind, number>();

  private _pending = new Map<InteractKind, number>();

  private _timers = new Map<InteractKind, ReturnType<typeof setTimeout>>();

  constructor(
    private _send: (kind: InteractKind, intensity: number) => void,
    private _windowMs = 2000
  ) {}

  public report(kind: InteractKind, intensity = 0.5) {
    const now = Date.now();
    const last = this._last.get(kind) ?? -Infinity;
    const add = Math.max(0, Math.min(1, intensity));
    if (now - last >= this._windowMs && !this._timers.has(kind)) {
      this._last.set(kind, now);
      this._send(kind, round2(add));
      return;
    }
    this._pending.set(kind, Math.min(1, (this._pending.get(kind) ?? 0) + add));
    if (!this._timers.has(kind)) {
      const wait = Math.max(0, last + this._windowMs - now);
      this._timers.set(
        kind,
        setTimeout(() => {
          this._timers.delete(kind);
          const v = this._pending.get(kind) ?? 0;
          this._pending.delete(kind);
          if (v > 0) {
            this._last.set(kind, Date.now());
            this._send(kind, round2(v));
          }
        }, wait)
      );
    }
  }

  public dispose() {
    this._timers.forEach((t) => clearTimeout(t));
    this._timers.clear();
    this._pending.clear();
  }
}

const round2 = (v: number) => Math.round(v * 100) / 100;
