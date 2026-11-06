/* A fake `hass` for the dev harness: states, a fake websocket connection that answers
 * casita/info, the pipeline list, frontend user data, and plays Assist pipeline runs
 * (text and microphone) with event sequences close to HA core's, including TTS audio
 * from a generated WAV. Everything is exposed on `window.dev` for Playwright.
 */

const params = new URLSearchParams(location.search);
const LANG = params.get("lang") || "fr";
const DARK = params.get("dark") === "1";
const ADMIN = params.get("admin") !== "0";
const PIPELINE = params.get("pipeline") || "p-casita";
// ?nocasita=1: no assistant uses a Casita agent; ?nopipelines=1: no assistant at all;
// ?createfail=1: creating an assistant fails; ?fast=1: short light transitions (tint sampling)
const NOCASITA = params.get("nocasita") === "1";
const NOPIPELINES = params.get("nopipelines") === "1";
const CREATEFAIL = params.get("createfail") === "1";
const FAST = params.get("fast") === "1";
const nowIso = () => new Date().toISOString();

const log = (window.__log = []);
const calls = (window.__calls = []);
const binary = (window.__binary = []);
const runs = (window.__runs = []);

// ------------------------------------------------------------------ states
const ent = (entity_id, state, attributes = {}) => ({
  entity_id,
  state: String(state),
  attributes,
  last_changed: nowIso(),
  last_updated: nowIso(),
});

// Two Casita config entries (contract v0.2 "Changes": casita/info lists every entry).
// Entity ids depend on the install language: the panel must only use what casita/info says.
const ENTRIES = [
  {
    entry_id: "01JCASITA",
    title: "Casita",
    conversation_entity: "conversation.casita",
    emotion_entity: "sensor.casita_emotion",
    mood_entities: {
      joy: "sensor.casita_joie", excitement: "sensor.casita_excitation", energy: "sensor.casita_energie",
      affection: "sensor.casita_affection", irritation: "sensor.casita_agacement", curiosity: "sensor.casita_curiosite",
    },
    diagnostic_entities: {},
    llm_agent: null,
    weather_entity: "weather.maison",
  },
  {
    entry_id: "01JATELIER",
    title: "Casita Atelier",
    conversation_entity: "conversation.casita_atelier",
    emotion_entity: "sensor.casita_atelier_emotion",
    mood_entities: {
      joy: "sensor.casita_atelier_joie", excitement: "sensor.casita_atelier_excitation", energy: "sensor.casita_atelier_energie",
      affection: "sensor.casita_atelier_affection", irritation: "sensor.casita_atelier_agacement", curiosity: "sensor.casita_atelier_curiosite",
    },
    diagnostic_entities: {},
    llm_agent: "conversation.openai_conversation",
    weather_entity: null,
  },
];
// ?entries=1: a single Casita; ?dupes=1: two entries both titled "Casita" (the default title)
if (params.get("entries") === "1") ENTRIES.splice(1);
if (params.get("dupes") === "1") ENTRIES[1].title = "Casita";
const byEntry = Object.fromEntries(ENTRIES.map((e) => [e.entry_id, e]));
const byAgent = Object.fromEntries(ENTRIES.map((e) => [e.conversation_entity, e]));
const MOODS = {
  "01JCASITA": { joy: 0.3, excitement: 0.35, energy: 0.7, affection: 0.55, irritation: 0, curiosity: 0.3 },
  "01JATELIER": { joy: -0.2, excitement: 0.2, energy: 0.4, affection: 0.3, irritation: 0.35, curiosity: 0.6 },
};
// compatibility: the first entry is the default for setMood / fireEmotion
const MOOD = ENTRIES[0].mood_entities;
const mood = MOODS["01JCASITA"];

let states = {
  "sensor.casita_emotion": ent("sensor.casita_emotion", "Normal", {
    source: "local", text: "", agent_id: "conversation.casita", conversation_id: null, device_id: null, updated: nowIso(), friendly_name: "Casita Émotion",
  }),
  "sensor.casita_atelier_emotion": ent("sensor.casita_atelier_emotion", "Normal", {
    source: "local", text: "", agent_id: "conversation.casita_atelier", conversation_id: null, device_id: null, updated: nowIso(), friendly_name: "Casita Atelier Émotion",
  }),
  "conversation.casita_atelier": ent("conversation.casita_atelier", "unknown", { friendly_name: "Casita Atelier" }),
  "sun.sun": ent("sun.sun", "above_horizon", { elevation: 38, rising: false, friendly_name: "Soleil" }),
  "weather.maison": ent("weather.maison", params.get("weather") || "sunny", { friendly_name: "Maison", temperature: 18 }),
  "weather.jardin": ent("weather.jardin", "rainy", { friendly_name: "Jardin", temperature: 12 }),
  // satellites: their "Assistant" select (translation key "pipeline") says which pipeline they use
  "assist_satellite.vpe_salon": ent("assist_satellite.vpe_salon", "idle", { friendly_name: "VPE Salon" }),
  "select.vpe_salon_assistant": ent("select.vpe_salon_assistant", "preferred", { friendly_name: "VPE Salon Assistant", options: ["preferred", "Casita", "Atelier"] }),
  "assist_satellite.vpe_atelier": ent("assist_satellite.vpe_atelier", "idle", { friendly_name: "VPE Atelier" }),
  "select.vpe_atelier_assistant": ent("select.vpe_atelier_assistant", "Atelier", { friendly_name: "VPE Atelier Assistant", options: ["preferred", "Casita", "Atelier"] }),
  "conversation.openai_conversation": ent("conversation.openai_conversation", "unknown", { friendly_name: "OpenAI" }),
  "conversation.casita": ent("conversation.casita", "unknown", { friendly_name: "Casita" }),
};
// ?single_weather=1: only one weather entity
if (params.get("single_weather") === "1") delete states["weather.jardin"];
for (const e of ENTRIES)
  for (const [k, id] of Object.entries(e.mood_entities))
    states[id] = ent(id, MOODS[e.entry_id][k].toFixed(2), { baseline: MOODS[e.entry_id][k], friendly_name: e.title + " " + k, state_class: "measurement" });

const entities = {
  "assist_satellite.vpe_salon": { entity_id: "assist_satellite.vpe_salon", device_id: "dev-vpe-salon", platform: "esphome" },
  "select.vpe_salon_assistant": { entity_id: "select.vpe_salon_assistant", device_id: "dev-vpe-salon", platform: "esphome", translation_key: "pipeline" },
  "select.vpe_salon_vad": { entity_id: "select.vpe_salon_vad", device_id: "dev-vpe-salon", platform: "esphome", translation_key: "vad_sensitivity" },
  "assist_satellite.vpe_atelier": { entity_id: "assist_satellite.vpe_atelier", device_id: "dev-vpe-atelier", platform: "esphome" },
  "select.vpe_atelier_assistant": { entity_id: "select.vpe_atelier_assistant", device_id: "dev-vpe-atelier", platform: "esphome", translation_key: "pipeline" },
  "sensor.casita_emotion": { entity_id: "sensor.casita_emotion", device_id: "dev-casita", platform: "casita" },
};

const PIPELINES = {
  pipelines: [
    { id: "p-casita", name: "Casita", language: LANG, conversation_engine: "conversation.casita", conversation_language: LANG, prefer_local_intents: false, stt_engine: "stt.faster_whisper", tts_engine: "tts.piper", wake_word_entity: null },
    { id: "p-atelier", name: "Atelier", language: LANG, conversation_engine: "conversation.casita_atelier", conversation_language: LANG, prefer_local_intents: true, stt_engine: "stt.faster_whisper", tts_engine: "tts.piper", wake_word_entity: null },
    { id: "p-ha", name: "Home Assistant (sans voix)", language: LANG, conversation_engine: "conversation.home_assistant", conversation_language: LANG, prefer_local_intents: true, stt_engine: "stt.faster_whisper", tts_engine: null, wake_word_entity: null },
  ],
  preferred_pipeline: PIPELINE,
};
if (NOCASITA) {
  // "Casita" is taken by an assistant that does not use him: the new one is "Casita 2"
  PIPELINES.pipelines = [
    { id: "p-ha", name: "Home Assistant", language: LANG, conversation_engine: "conversation.home_assistant", conversation_language: LANG, prefer_local_intents: true, stt_engine: "stt.faster_whisper", stt_language: LANG, tts_engine: "tts.piper", tts_language: LANG, tts_voice: "fr_FR-siwis-medium", wake_word_entity: "wake_word.openwakeword", wake_word_id: "ok_nabu" },
    { id: "p-old", name: "Casita", language: LANG, conversation_engine: "conversation.home_assistant", conversation_language: LANG, prefer_local_intents: false, stt_engine: null, stt_language: null, tts_engine: null, tts_language: null, tts_voice: null, wake_word_entity: null, wake_word_id: null },
  ];
  PIPELINES.preferred_pipeline = "p-ha";
}
if (NOPIPELINES) {
  PIPELINES.pipelines = [];
  PIPELINES.preferred_pipeline = null;
}
let pipelineN = 0;
function addPipeline(p) {
  const created = { id: "p-new" + ++pipelineN, ...p };
  PIPELINES.pipelines.push(created);
  return created;
}
// HA's navigate(): the panel pushes the path, then fires location-changed on window
const nav = (window.__locationChanged = []);
window.addEventListener("location-changed", (ev) => nav.push({ path: location.pathname, detail: ev.detail }));
const userData = (window.__userData = {});
// ?olddata=1: user data saved by an older panel (keys that are gone must be ignored)
// ?saved=<id>: this user picked that assistant
if (params.get("saved")) userData.casita = { pipeline_id: params.get("saved") };
if (params.get("olddata") === "1")
  userData.casita = { pipeline_id: "p-ha", casita_entry: "01JATELIER", satellite_entity: "assist_satellite.vpe_salon", weather_entity: "weather.nope", autonomous_life: false, junk: [1, 2] };

// ------------------------------------------------------------------ hass object
let panel;
let hass;
const listeners = { casita_emotion: [] };

const socket = {
  binaryType: "blob",
  send(data) {
    binary.push({ len: data.length, handler: data[0] });
  },
};

const connection = {
  connected: true,
  socket,
  subscribeMessage(cb, msg) {
    log.push({ type: "subscribeMessage", msg });
    if (msg.type === "assist_pipeline/run") return simulateRun(cb, msg);
    return Promise.reject({ code: "unknown_command", message: "Unknown command." });
  },
  subscribeEvents(cb, eventType) {
    log.push({ type: "subscribeEvents", eventType });
    if (!ADMIN) return Promise.reject({ code: "unauthorized", message: "Unauthorized" });
    (listeners[eventType] = listeners[eventType] || []).push(cb);
    return Promise.resolve(() => {
      listeners[eventType] = listeners[eventType].filter((f) => f !== cb);
    });
  },
};

const callWS = async (msg) => {
  log.push({ type: "callWS", msg });
  switch (msg.type) {
    case "casita/info":
      return { version: "0.2.0", entries: JSON.parse(JSON.stringify(ENTRIES)) };
    case "assist_pipeline/pipeline/list":
      return JSON.parse(JSON.stringify(PIPELINES));
    case "assist_pipeline/pipeline/create": {
      // HA core: admin only, all fields required except prefer_local_intents / acknowledge_media_id
      if (!ADMIN) throw { code: "unauthorized", message: "Unauthorized" };
      if (CREATEFAIL) throw { code: "home_assistant_error", message: "Pipeline creation failed." };
      const { type, id, ...data } = msg;
      return JSON.parse(JSON.stringify(addPipeline(data)));
    }
    case "conversation/agent/list":
      return {
        agents: [
          { id: "conversation.home_assistant", name: "Home Assistant", supported_languages: ["fr", "en"] },
          // ?casitalangs=1: the Casita agents list their languages instead of "*"
          ...ENTRIES.map((e) => ({ id: e.conversation_entity, name: e.title, supported_languages: params.get("casitalangs") === "1" ? ["fr", "en"] : "*" })),
        ],
      };
    case "frontend/get_user_data":
      return { value: userData[msg.key] ?? null };
    case "frontend/set_user_data":
      userData[msg.key] = msg.value;
      return null;
    default:
      throw { code: "unknown_command", message: "Unknown command." };
  }
};

const callService = async (domain, service, data) => {
  calls.push({ domain, service, data, t: performance.now() });
  if (domain === "casita" && service === "interact") backendInteract(data.kind, data.intensity ?? 0.5, data.entry_id);
  return { context: { id: "ctx" } };
};

function makeHass() {
  hass = {
    states,
    entities,
    connection,
    connected: connection.connected,
    language: LANG,
    locale: { language: LANG },
    config: { language: LANG, country: "FR" },
    themes: { darkMode: DARK },
    user: { id: "u1", name: "Alex Martin", is_admin: ADMIN },
    callWS,
    callService,
    hassUrl: (p = "") => (/^(blob:|data:|https?:)/.test(p) ? p : location.origin + p),
  };
  return hass;
}

function setStates(patch) {
  states = { ...states };
  for (const [id, v] of Object.entries(patch)) {
    const prev = states[id];
    states[id] = ent(id, v.state ?? prev?.state ?? "unknown", { ...(prev?.attributes || {}), ...(v.attributes || {}) });
  }
  if (panel) panel.hass = makeHass();
}

// ------------------------------------------------------------------ simulated backend mood
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const DELTAS = {
  pet: { joy: 0.12, affection: 0.06, irritation: -0.1 },
  poke: { excitement: 0.1, irritation: 0.12, curiosity: 0.05 },
  tickle: { joy: 0.12, excitement: 0.15 },
  hug: { joy: 0.15, affection: 0.08, irritation: -0.1 },
  shake: { joy: -0.2, excitement: 0.3, irritation: 0.3, affection: -0.04 },
  throw: { joy: 0.05, excitement: 0.25, curiosity: 0.1 },
  wake: { excitement: 0.15 },
  greet: { joy: 0.05, excitement: 0.05 },
  ignore: { joy: -0.05 },
};
function backendInteract(kind, intensity, entryId) {
  // without entry_id the service applies to every entry (contract)
  const targets = entryId ? [byEntry[entryId]].filter(Boolean) : ENTRIES;
  const d = DELTAS[kind] || {};
  const patch = {};
  for (const e of targets) {
    const m = MOODS[e.entry_id];
    for (const [k, v] of Object.entries(d)) {
      m[k] = clamp(m[k] + v * (0.5 + intensity), k === "joy" ? -1 : 0, 1);
      patch[e.mood_entities[k]] = { state: m[k].toFixed(2) };
    }
  }
  setTimeout(() => setStates(patch), 120);
}
function setMood(values, entryId = "01JCASITA") {
  const e = byEntry[entryId];
  const patch = {};
  for (const [k, v] of Object.entries(values)) {
    MOODS[entryId][k] = v;
    patch[e.mood_entities[k]] = { state: Number(v).toFixed(2) };
  }
  setStates(patch);
}

// ------------------------------------------------------------------ casita_emotion
function fireEmotion({ emotion, text = "", conversation_id = null, device_id = null, source = "llm", agent_id = "conversation.casita" }) {
  const updated = nowIso();
  const data = { emotion, source, text, agent_id, conversation_id, device_id, updated };
  // the sensor of that entry is updated before the event is fired (README)
  setStates({ [byAgent[agent_id].emotion_entity]: { state: emotion, attributes: { source, text, agent_id, conversation_id, device_id, updated } } });
  for (const cb of listeners.casita_emotion || []) cb({ event_type: "casita_emotion", data, origin: "LOCAL", time_fired: updated });
}

// ------------------------------------------------------------------ TTS audio (generated WAV)
function speechWav(seconds, rate = 16000) {
  const n = Math.floor(seconds * rate);
  const buf = new ArrayBuffer(44 + n * 2);
  const v = new DataView(buf);
  const w = (o, s) => [...s].forEach((c, i) => v.setUint8(o + i, c.charCodeAt(0)));
  w(0, "RIFF"); v.setUint32(4, 36 + n * 2, true); w(8, "WAVE"); w(12, "fmt ");
  v.setUint32(16, 16, true); v.setUint16(20, 1, true); v.setUint16(22, 1, true); v.setUint32(24, rate, true);
  v.setUint32(28, rate * 2, true); v.setUint16(32, 2, true); v.setUint16(34, 16, true); w(36, "data"); v.setUint32(40, n * 2, true);
  // syllables: 4–6 per second, pauses between words, a voiced buzz with formant-ish harmonics
  let t = 0, i = 0;
  while (i < n) {
    const syl = 0.12 + Math.random() * 0.12;
    const gap = Math.random() < 0.25 ? 0.18 + Math.random() * 0.2 : 0.03;
    const f0 = 170 + Math.random() * 60;
    const sylN = Math.floor(syl * rate), gapN = Math.floor(gap * rate);
    for (let k = 0; k < sylN && i < n; k++, i++) {
      const u = k / sylN, env = Math.sin(Math.PI * u) ** 0.7;
      const tt = i / rate;
      const s = 0.55 * Math.sin(2 * Math.PI * f0 * tt) + 0.3 * Math.sin(2 * Math.PI * f0 * 2 * tt) + 0.15 * Math.sin(2 * Math.PI * f0 * 3.1 * tt);
      v.setInt16(44 + i * 2, Math.round(s * env * 0.3 * 32767), true);
    }
    for (let k = 0; k < gapN && i < n; k++, i++) v.setInt16(44 + i * 2, 0, true);
    t += syl + gap;
  }
  return URL.createObjectURL(new Blob([buf], { type: "audio/wav" }));
}

// ------------------------------------------------------------------ pipeline runs
const FR = LANG === "fr";
function scenario(text, pipeline) {
  const casita = !!byAgent[pipeline.conversation_engine];
  if (/erreur|error|panne/i.test(text)) return { error: { code: "intent-failed", message: "Unexpected error during intent recognition" } };
  if (/hors ligne|offline|réseau/i.test(text)) return { error: { code: "stt-stream-failed", message: "Connection lost" } };
  if (/lumi[eè]re|light|lampe/i.test(text))
    return {
      local: true,
      response: { response_type: "action_done", speech: FR ? "C’est fait, la lumière du salon est allumée." : "Done, the living room light is on.", data: { success: [{ type: "entity", name: "Salon", id: "light.salon" }], failed: [] } },
      emotion: "Happy",
    };
  if (/blabla|xyz|zzz/i.test(text))
    return { local: true, response: { response_type: "error", speech: FR ? "Désolé, je n’ai pas compris." : "Sorry, I couldn't understand that.", data: { code: "no_intent_match" } }, emotion: "Pleading" };
  const chunks = FR
    ? ["[emo", "tion:Grateful] ", "Oh, merci ", "de passer me voir ! ", "Je me sens tout léger aujourd’hui, ", "et mes volets sont parfaitement réglés."]
    : ["[emo", "tion:Grateful] ", "Oh, thanks ", "for dropping by! ", "I feel light as a feather today, ", "and my blinds are perfectly set."];
  return { stream: chunks, emotion: casita ? "Grateful" : undefined, response: { response_type: "action_done", data: { success: [], failed: [] } }, continue: /\?$/.test(text.trim()) && false };
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let runN = 0;

function simulateRun(cb, msg) {
  const run = { n: ++runN, msg, events: [], cancelled: false };
  runs.push(run);
  const send = (type, data) => {
    if (run.cancelled) return false;
    const ev = { type, data, timestamp: nowIso() };
    run.events.push(type);
    cb(ev);
    return true;
  };
  (async () => {
    await sleep(30);
    const pipeline = PIPELINES.pipelines.find((p) => p.id === msg.pipeline) || PIPELINES.pipelines.find((p) => p.id === PIPELINES.preferred_pipeline);
    if (!pipeline) {
      send("error", { code: "pipeline-not-found", message: "Pipeline not found" });
      return;
    }
    const convId = msg.conversation_id || "01JCONV" + run.n;
    const wantsTts = msg.end_stage === "tts" && pipeline.tts_engine;
    let text = msg.input?.text ?? "";
    send("run-start", {
      pipeline: pipeline.id,
      language: LANG,
      conversation_id: convId,
      runner_data: { stt_binary_handler_id: msg.start_stage === "stt" ? 7 : null, timeout: 300 },
      ...(wantsTts ? { tts_output: { token: "tok" + run.n, url: "/api/tts_proxy/tok" + run.n + ".wav", mime_type: "audio/wav", stream_response: false } } : {}),
    });
    if (msg.start_stage === "stt") {
      await sleep(250);
      send("stt-start", { engine: pipeline.stt_engine, metadata: { language: LANG, sample_rate: msg.input.sample_rate } });
      await sleep(500);
      send("stt-vad-start", { timestamp: 500 });
      await sleep(1400);
      send("stt-vad-end", { timestamp: 1900 });
      await sleep(300);
      text = FR ? "allume la lumière du salon" : "turn on the living room light";
      send("stt-end", { stt_output: { text } });
    }
    await sleep(80);
    send("intent-start", { engine: pipeline.conversation_engine, language: LANG, intent_input: text, conversation_id: convId, device_id: null, prefer_local_intents: false });
    const sc = scenario(text, pipeline);
    if (sc.error) {
      await sleep(900);
      send("error", sc.error);
      return;
    }
    let speech = sc.response.speech;
    if (sc.stream) {
      await sleep(1600); // the LLM thinks
      send("intent-progress", { chat_log_delta: { role: "assistant" } });
      for (const c of sc.stream) {
        await sleep(160);
        if (!send("intent-progress", { chat_log_delta: { content: c } })) return;
      }
      speech = sc.stream.join("").replace(/^\[emotion:\w+\]\s*/, "");
    } else await sleep(700);
    const casita = !!byAgent[pipeline.conversation_engine];
    // "prefer handling commands locally": the pipeline answers local commands itself, Casita is not called
    const bypass = !!sc.local && !!pipeline.prefer_local_intents;
    if (casita && sc.emotion && !bypass) {
      await sleep(40);
      fireEmotion({ emotion: sc.emotion, text: speech, conversation_id: convId, source: sc.local ? "local" : "llm", agent_id: pipeline.conversation_engine });
    }
    await sleep(40);
    send("intent-end", {
      processed_locally: !!sc.local && (!casita || bypass),
      intent_output: {
        conversation_id: convId,
        continue_conversation: !!sc.continue,
        response: { response_type: sc.response.response_type, language: LANG, speech: { plain: { speech, extra_data: null } }, data: sc.response.data },
      },
    });
    if (!wantsTts) return;
    send("tts-start", { engine: pipeline.tts_engine, language: LANG, voice: null, tts_input: speech, acknowledge_override: false });
    await sleep(350);
    const url = speechWav(Math.max(1.2, Math.min(6, speech.length / 15)));
    run.ttsUrl = url;
    send("tts-end", { tts_output: { media_id: "media-source://tts/x", token: "tok" + run.n, url, mime_type: "audio/wav" } });
    await sleep(20);
    send("run-end", null);
  })();
  return Promise.resolve(() => {
    run.cancelled = true;
  });
}

// ------------------------------------------------------------------ dev API
async function mirror({ emotion = "Smiling", text = FR ? "Il fait 21 degrés dans le salon." : "It’s 21 degrees in the living room." } = {}) {
  // a Voice PE whose assistant is the preferred pipeline (Casita): no panel setting needed
  const sat = "assist_satellite.vpe_salon";
  setStates({ [sat]: { state: "listening" } });
  await sleep(1500);
  setStates({ [sat]: { state: "processing" } });
  await sleep(1200);
  fireEmotion({ emotion, text, conversation_id: "01JVPE", device_id: "dev-vpe-salon", source: "local" });
  await sleep(250);
  setStates({ [sat]: { state: "responding" } });
  await sleep(2600);
  setStates({ [sat]: { state: "idle" } });
}

const PHASES = { dawn: { state: "above_horizon", elevation: 2, rising: true }, day: { state: "above_horizon", elevation: 38, rising: false }, dusk: { state: "above_horizon", elevation: 1, rising: false }, night: { state: "below_horizon", elevation: -25, rising: true } };

window.dev = {
  get hass() {
    return hass;
  },
  get panel() {
    return panel;
  },
  life: () => panel?._life?.debug(),
  setStates,
  setMood,
  fireEmotion,
  mirror,
  weather: (cond) => setStates({ "weather.maison": { state: cond } }),
  phase: (p) => setStates({ "sun.sun": { state: PHASES[p].state, attributes: { elevation: PHASES[p].elevation, rising: PHASES[p].rising } } }),
  satellite: (s, id = "assist_satellite.vpe_salon") => setStates({ [id]: { state: s } }),
  disconnect: (off = true) => {
    connection.connected = !off;
    setStates({});
  },
  strike: () => panel?.strike(),
  /** An admin created a Casita assistant elsewhere (the panel sees it on its next read). */
  addCasitaPipeline: (name = "Casita") =>
    addPipeline({ name, language: LANG, conversation_engine: "conversation.casita", conversation_language: "*", prefer_local_intents: false, stt_engine: "stt.faster_whisper", stt_language: LANG, tts_engine: "tts.piper", tts_language: LANG, tts_voice: null, wake_word_entity: null, wake_word_id: null }),
  speechWav,
};

// ------------------------------------------------------------------ mount
export function mount(el) {
  panel = el;
  if (FAST) panel.style.setProperty("--ambience-transition", "0.05s");
  panel.hass = makeHass();
  panel.narrow = window.innerWidth < 870;
  panel.route = { prefix: "/casita", path: "" };
  panel.panel = { component_name: "custom", url_path: "casita", title: "Casita", config: { entry_id: "01JCASITA", version: "0.2.0", _panel_custom: { name: "casita-panel" } } };
  window.addEventListener("resize", () => (panel.narrow = window.innerWidth < 870));
}
