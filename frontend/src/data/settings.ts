import type { HomeAssistant } from "./ha";

/**
 * Per-user panel settings, stored with `frontend/set_user_data` key `casita`.
 * Only the assistant (pipeline) is set: Casita, weather and satellites follow from it.
 * Keys of older versions (casita_entry, satellite_entity, weather_entity, autonomous_life)
 * are ignored, and dropped at the next save.
 */
export interface CasitaSettings {
  /** Assist pipeline id; undefined = the preferred pipeline. */
  pipeline_id?: string;
}

export const DEFAULT_SETTINGS: CasitaSettings = {};

const USER_DATA_KEY = "casita";
const LOCAL_KEY = "casita.settings";

const sanitize = (raw: unknown): CasitaSettings => {
  const s: CasitaSettings = {};
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return s;
  const r = raw as Record<string, unknown>;
  if (typeof r.pipeline_id === "string" && r.pipeline_id) s.pipeline_id = r.pipeline_id;
  return s;
};

const readLocal = (): unknown => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || "null");
  } catch {
    return null;
  }
};

const writeLocal = (s: CasitaSettings) => {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(s));
  } catch {
    /* storage unavailable */
  }
};

export const loadSettings = async (hass: HomeAssistant): Promise<CasitaSettings> => {
  try {
    const res = await hass.callWS<{ value: unknown }>({
      type: "frontend/get_user_data",
      key: USER_DATA_KEY,
    });
    if (res && res.value != null) return sanitize(res.value);
  } catch {
    /* fall back to this browser */
  }
  return sanitize(readLocal());
};

export const saveSettings = async (hass: HomeAssistant, s: CasitaSettings): Promise<void> => {
  writeLocal(s);
  try {
    await hass.callWS({ type: "frontend/set_user_data", key: USER_DATA_KEY, value: s });
  } catch {
    /* kept in this browser only */
  }
};
