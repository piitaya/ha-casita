/**
 * Assist pipeline websocket API, as used by the HA frontend
 * (src/data/assist_pipeline.ts) and emitted by homeassistant/components/assist_pipeline.
 */
import type { HomeAssistant, UnsubscribeFunc } from "../data/ha";
import { isEmotion, type Emotion } from "../data/casita";

export interface AssistPipeline {
  id: string;
  name: string;
  language: string;
  conversation_engine: string;
  conversation_language: string | null;
  prefer_local_intents?: boolean;
  stt_engine: string | null;
  stt_language?: string | null;
  tts_engine: string | null;
  tts_language?: string | null;
  tts_voice?: string | null;
  wake_word_entity?: string | null;
  wake_word_id?: string | null;
}

export interface IntentTarget {
  type: string;
  name: string;
  id: string | null;
}

export interface IntentResponse {
  response_type: "action_done" | "query_answer" | "error";
  language?: string;
  speech: Partial<Record<"plain" | "ssml", { speech: string; extra_data?: unknown }>>;
  data: {
    code?: "no_intent_match" | "no_valid_targets" | "failed_to_handle" | "unknown" | string;
    success?: IntentTarget[];
    failed?: IntentTarget[];
  };
}

export interface ConversationResult {
  conversation_id: string | null;
  response: IntentResponse;
  continue_conversation?: boolean;
}

export interface ChatLogDelta {
  role?: "assistant" | "tool_result" | string;
  content?: string;
  thinking_content?: string;
  tool_calls?: unknown[];
  tool_call_id?: string;
  result?: unknown;
}

export type PipelineRunEvent =
  | {
      type: "run-start";
      data: {
        pipeline: string;
        language: string;
        conversation_id?: string;
        satellite_id?: string;
        runner_data?: { stt_binary_handler_id: number | null; timeout: number };
        tts_output?: { token: string; url: string; mime_type: string; stream_response?: boolean };
      };
    }
  | { type: "run-end"; data: null }
  | { type: "error"; data: { code: string; message: string } }
  | { type: "wake_word-start"; data: Record<string, unknown> }
  | { type: "wake_word-end"; data: Record<string, unknown> }
  | { type: "stt-start"; data: Record<string, unknown> }
  | { type: "stt-vad-start"; data: { timestamp: number } }
  | { type: "stt-vad-end"; data: { timestamp: number } }
  | { type: "stt-end"; data: { stt_output: { text: string } } }
  | {
      type: "intent-start";
      data: { engine: string; language: string; intent_input: string; conversation_id?: string | null };
    }
  | { type: "intent-progress"; data: { tts_start_streaming?: boolean; chat_log_delta?: ChatLogDelta } }
  | { type: "intent-end"; data: { processed_locally?: boolean; intent_output: ConversationResult } }
  | {
      type: "tts-start";
      data: { engine: string; tts_input: string; acknowledge_override?: boolean };
    }
  | { type: "tts-end"; data: { tts_output: { media_id: string; token: string; url: string; mime_type: string } } };

export type PipelineRunOptions = (
  | { start_stage: "intent" | "tts"; input: { text: string } }
  | { start_stage: "stt"; input: { sample_rate: number } }
) & {
  end_stage: "stt" | "intent" | "tts";
  pipeline?: string;
  conversation_id?: string | null;
};

export const listAssistPipelines = (hass: HomeAssistant) =>
  hass.callWS<{ pipelines: AssistPipeline[]; preferred_pipeline: string | null }>({
    type: "assist_pipeline/pipeline/list",
  });

export const runAssistPipeline = (
  hass: HomeAssistant,
  callback: (event: PipelineRunEvent) => void,
  options: PipelineRunOptions
): Promise<UnsubscribeFunc> =>
  hass.connection.subscribeMessage<PipelineRunEvent>(callback, {
    ...options,
    type: "assist_pipeline/run",
  });

export const CASITA_ENGINE = "conversation.casita";

/** Fields of `assist_pipeline/pipeline/create` (admin only), from PIPELINE_FIELDS in HA core. */
export interface AssistPipelineCreate {
  name: string;
  language: string;
  conversation_engine: string;
  conversation_language: string;
  stt_engine: string | null;
  stt_language: string | null;
  tts_engine: string | null;
  tts_language: string | null;
  tts_voice: string | null;
  wake_word_entity: string | null;
  wake_word_id: string | null;
  prefer_local_intents?: boolean;
}

export const createAssistPipeline = (hass: HomeAssistant, pipeline: AssistPipelineCreate) =>
  hass.callWS<AssistPipeline>({ type: "assist_pipeline/pipeline/create", ...pipeline });

/**
 * `assist_pipeline/pipeline/update` (admin only) replaces the whole pipeline: every
 * PIPELINE_FIELDS key is sent again. `acknowledge_media_id` is left out: the schema takes
 * it, but 2026.11 does not store it and fails on it.
 */
export const updateAssistPipeline = (hass: HomeAssistant, pipeline: AssistPipeline, changes: Partial<AssistPipelineCreate>) =>
  hass.callWS<AssistPipeline>({
    type: "assist_pipeline/pipeline/update",
    pipeline_id: pipeline.id,
    name: pipeline.name,
    language: pipeline.language,
    conversation_engine: pipeline.conversation_engine,
    conversation_language: pipeline.conversation_language,
    stt_engine: pipeline.stt_engine ?? null,
    stt_language: pipeline.stt_language ?? null,
    tts_engine: pipeline.tts_engine ?? null,
    tts_language: pipeline.tts_language ?? null,
    tts_voice: pipeline.tts_voice ?? null,
    wake_word_entity: pipeline.wake_word_entity ?? null,
    wake_word_id: pipeline.wake_word_id ?? null,
    prefer_local_intents: !!pipeline.prefer_local_intents,
    ...changes,
  });

export const listConversationAgents = (hass: HomeAssistant) =>
  hass.callWS<{ agents: { id: string; name: string; supported_languages: string[] | "*" }[] }>({
    type: "conversation/agent/list",
  });

/** Error codes that mean "I can't reach something", shown as NoInternet. */
export const isConnectionError = (code: string | undefined, message?: string) =>
  /connection|network|unreachable|disconnect|cloud|timeout|stream-failed|socket|lost/i.test(
    `${code ?? ""} ${message ?? ""}`
  );

const TAG_RE = /^\s*\[\s*emotion\s*:\s*([A-Za-z]+)\s*\]\s*/i;
const TAG_HEAD = "[emotion:";

/**
 * Removes a leading `[emotion:Id]` tag from streamed assistant text. The backend already
 * strips it; this is a defensive copy that holds back the start of each assistant message
 * until the tag is complete or clearly absent.
 */
export class EmotionTagStripper {
  public emotion?: Emotion;

  private _buf = "";

  private _open = true;

  /** A new assistant message starts: a tag may follow again. */
  public newMessage() {
    this._open = true;
    this._buf = "";
  }

  /** Feeds a delta, returns the text that can be shown now. */
  public push(text: string): string {
    if (!this._open) return text;
    this._buf += text;
    const m = this._buf.match(TAG_RE);
    if (m) {
      if (isEmotion(m[1])) this.emotion = m[1];
      const rest = this._buf.slice(m[0].length);
      this._open = false;
      this._buf = "";
      return rest;
    }
    const head = this._buf.toLowerCase().replace(/\s+/g, "");
    const waiting =
      head.length === 0 ||
      TAG_HEAD.startsWith(head) ||
      (head.startsWith(TAG_HEAD) && !head.includes("]") && head.length < 40);
    if (waiting) return "";
    this._open = false;
    const out = this._buf;
    this._buf = "";
    return out;
  }

  /** End of the stream: whatever was held back is text. */
  public flush(): string {
    const out = this._buf;
    this._buf = "";
    this._open = false;
    return out;
  }
}

/** Strips a tag from a complete text (final speech). */
export const stripEmotionTag = (text: string): { text: string; emotion?: Emotion } => {
  const m = text.match(TAG_RE);
  if (!m) return { text };
  return { text: text.slice(m[0].length), emotion: isEmotion(m[1]) ? m[1] : undefined };
};
