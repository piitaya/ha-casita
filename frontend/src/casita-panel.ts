import { css, html, LitElement, nothing, type PropertyValues } from "lit";
import { property, query, state } from "lit/decorators.js";
import { define } from "./define";
import "./components/casita-face";
import "./components/casita-mood-hud";
import "./components/casita-settings-dialog";
import type { CasitaFace } from "./components/casita-face";
import { skyFrom } from "./ambience";
import { createLife, type Life, type Phase } from "./life/life";
import { ConversationController } from "./assist/conversation";
import {
  CASITA_ENGINE,
  createAssistPipeline,
  listAssistPipelines,
  updateAssistPipeline,
  listConversationAgents,
  type AssistPipeline,
} from "./assist/pipeline";
import {
  entryForEngine,
  entryLabel,
  fetchCasitaInfo,
  InteractThrottle,
  MOOD_KEYS,
  readMood,
  resolveEntry,
  type CasitaEmotionEvent,
  type CasitaEntry,
  type CasitaInfo,
  type InteractKind,
} from "./data/casita";
import type { CasitaPanelConfig, HassEntity, HomeAssistant, PanelInfo, Route, UnsubscribeFunc } from "./data/ha";
import { DEFAULT_SETTINGS, loadSettings, saveSettings, type CasitaSettings } from "./data/settings";
import { langFrom, STRINGS, type Lang } from "./i18n";
import { mdiCog, mdiHeartPulse, mdiMicrophone, mdiSend, mdiStop } from "./icons";

const reducedMotion = () => !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Day phase from sun.sun (elevation + rising), or from the clock without it. */
export const phaseFrom = (sun: HassEntity | undefined): Phase => {
  if (!sun) {
    const h = new Date().getHours();
    return h >= 6 && h < 9 ? "dawn" : h >= 9 && h < 18 ? "day" : h >= 18 && h < 21 ? "dusk" : "night";
  }
  const elev = Number(sun.attributes.elevation);
  if (!Number.isFinite(elev)) return sun.state === "above_horizon" ? "day" : "night";
  if (elev > 8) return "day";
  if (elev < -6) return "night";
  return sun.attributes.rising ? "dawn" : "dusk";
};

/**
 * The Casita sidebar panel: Casita in his room, alive, talking through the Assist pipeline.
 * Properties are the ones HA gives a custom panel: hass, narrow, route, panel.
 */
export class CasitaPanel extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property({ type: Boolean, reflect: true }) public narrow = false;

  @property({ attribute: false }) public route?: Route;

  @property({ attribute: false }) public panel?: PanelInfo<CasitaPanelConfig>;

  @state() private _info?: CasitaInfo;

  @state() private _settings: CasitaSettings = { ...DEFAULT_SETTINGS };

  @state() private _pipelines?: { pipelines: AssistPipeline[]; preferred_pipeline: string | null };

  @state() private _hudOpen = false;

  @state() private _settingsOpen = false;

  @state() private _note?: string;

  @state() private _expression = "Normal";

  @state() private _phase: Phase = phaseFrom(undefined);

  @state() private _condition: string | null = null;

  @state() private _creating = false;

  @state() private _createError?: string;

  @state() private _fixing = false;

  @state() private _fixError?: string;

  @query(".room", true) private _room!: HTMLElement;

  @query("casita-face", true) private _faceEl!: CasitaFace;

  @query(".bubble", true) private _bubble!: HTMLElement;

  @query(".bubble-text", true) private _bubbleText!: HTMLElement;

  @query("#sr-speech", true) private _srSpeech!: HTMLElement;

  @query("#chat-input", true) private _input!: HTMLInputElement;

  @query("#mood-btn", true) private _moodBtn!: HTMLButtonElement;

  private _life?: Life;

  private _lang: Lang = "en";

  private _rm = reducedMotion();

  private _conv = new ConversationController(this, {
    hass: () => this.hass,
    life: () => this._life,
    pipeline: () => this._pipeline,
    info: () => this._info,
    strings: () => STRINGS[this._lang],
    note: (t) => this._showNote(t),
  });

  private _throttle = new InteractThrottle((kind, intensity) => this._interact(kind, intensity));

  private _unsubEvents?: Promise<UnsubscribeFunc | undefined>;

  private _resize?: ResizeObserver;

  private _seen: { states: Record<string, HassEntity | undefined>; connected?: boolean; entry?: string } = { states: {} };

  private _recentEmotions: string[] = [];

  private _noteTimer?: ReturnType<typeof setTimeout>;

  private _ready = false;

  private _faceReady = false;

  // ------------------------------------------------------------------ lifecycle
  public connectedCallback() {
    super.connectedCallback();
    if (this._ready) {
      this._life?.start();
      this._subscribeEvents();
      this._observe();
      this._refreshPipelines();
      this._scheduleStorm();
    }
    document.addEventListener("visibilitychange", this._onVisible);
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    this._life?.stop();
    this._resize?.disconnect();
    this._resize = undefined;
    this._unsubscribeEvents();
    clearTimeout(this._noteTimer);
    clearTimeout(this._stormTimer);
    this._stormTimer = undefined;
    document.removeEventListener("visibilitychange", this._onVisible);
  }

  /** Back on the panel: an assistant may have been created meanwhile. */
  private _onVisible = () => {
    if (!document.hidden && this._ready) this._refreshPipelines();
  };

  private async _refreshPipelines() {
    if (!this.hass) return;
    try {
      this._pipelines = await listAssistPipelines(this.hass);
      this._processHass(false);
    } catch {
      /* keep the list we have */
    }
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has("hass") && this.hass) {
      const lang = langFrom(this.hass.locale?.language ?? this.hass.language);
      if (lang !== this._lang) {
        this._lang = lang;
        this._life?.setLang(lang);
      }
      this.toggleAttribute("dark", !!this.hass.themes?.darkMode);
      if (this._ready) this._processHass(false);
      else if (this._faceReady) queueMicrotask(() => this._init());
    }
  }

  protected async firstUpdated() {
    await this._faceEl.updateComplete;
    this._faceReady = true;
    this._init();
  }

  /** Starts Casita once the face is drawn and `hass` is known (HA sets it before attaching). */
  private _init() {
    const face = this._faceEl?.face;
    if (this._ready || !this._faceReady || !face || !this.hass) return;
    this._life = createLife(
      {
        stage: this._room,
        svg: this._faceEl.svg,
        face,
        bubble: this._bubble,
        bubbleText: this._bubbleText,
        srSpeech: this._srSpeech,
        input: () => this._input,
        onInteract: (kind, intensity) => this._throttle.report(kind, intensity),
        onExpression: (id) => {
          this._expression = id;
        },
      },
      {
        lang: this._lang,
        reducedMotion: this._rm,
        autonomous: true,
        userName: this.hass.user?.name?.split(" ")[0],
      }
    );
    this._ready = true;
    this._observe();
    this._processHass(true);
    this._life.greet();
    this._life.start();
    this._subscribeEvents();
    this._load();
  }

  protected updated(changed: PropertyValues<this>) {
    const ch = changed as Map<PropertyKey, unknown>;
    if (ch.has("_condition") || ch.has("_phase")) {
      const was = skyFrom(
        ch.has("_condition") ? (ch.get("_condition") as string | null) : this._condition,
        ch.has("_phase") ? (ch.get("_phase") as Phase) : this._phase
      );
      const now = skyFrom(this._condition, this._phase);
      // a storm begins: a flash right away, then from time to time
      if (now === "storm" && was !== "storm" && !this._ambienceInitial) this.strike();
      this._scheduleStorm();
    }
    this._ambienceInitial = false;
    if (changed.has("hass") && changed.get("hass")?.themes?.darkMode !== this.hass?.themes?.darkMode) {
      // theme colours of particles are read from the CSS tokens
      requestAnimationFrame(() => this._life?.layout());
    }
  }

  private _observe() {
    if (this._resize || !this._room) return;
    this._resize = new ResizeObserver(() => this._life?.layout());
    this._resize.observe(this._room);
  }

  private async _load() {
    const hass = this.hass;
    const [info, settings, pipelines] = await Promise.allSettled([fetchCasitaInfo(hass), loadSettings(hass), listAssistPipelines(hass)]);
    if (settings.status === "fulfilled") {
      this._settings = settings.value;
    }
    if (pipelines.status === "fulfilled") this._pipelines = pipelines.value;
    if (info.status === "fulfilled") this._info = info.value;
    this._processHass(true);
  }

  /** Pipelines whose conversation agent is a Casita. */
  private get _casitaPipelines(): AssistPipeline[] {
    return (this._pipelines?.pipelines ?? []).filter(
      (p) => p.conversation_engine === CASITA_ENGINE || !!entryForEngine(this._info, p.conversation_engine)
    );
  }

  /** Default when nothing is saved: the preferred one if it runs Casita, else the first that does. */
  private get _defaultPipeline(): AssistPipeline | undefined {
    const p = this._pipelines;
    if (!p) return undefined;
    const preferred = p.pipelines.find((x) => x.id === p.preferred_pipeline);
    const casita = this._casitaPipelines;
    return (preferred && casita.includes(preferred) ? preferred : casita[0]) ?? preferred ?? p.pipelines[0];
  }

  private get _pipeline(): AssistPipeline | undefined {
    return this._pipelines?.pipelines.find((x) => x.id === this._settings.pipeline_id) ?? this._defaultPipeline;
  }

  /** No assistant talks to Casita (or no assistant at all). */
  private get _empty(): boolean {
    return !!this._pipelines && !this._casitaPipelines.length;
  }

  /** The Casita this panel shows: the agent of the pipeline, else the first entry. */
  private get _entry(): CasitaEntry | undefined {
    return resolveEntry(this._info, this._pipeline?.conversation_engine);
  }

  /** The pipeline runs a Casita agent. */
  private get _casitaPipeline(): boolean {
    const engine = this._pipeline?.conversation_engine;
    return !!engine && (engine === CASITA_ENGINE || !!entryForEngine(this._info, engine));
  }

  /** The selected pipeline runs a Casita agent but lets local commands bypass it. */
  private get _localWarning(): boolean {
    return this._casitaPipeline && !!this._pipeline?.prefer_local_intents;
  }

  /** The weather entity of the Casita options, else the only weather entity. */
  private get _weatherEntity(): string | undefined {
    const configured = this._entry?.weather_entity;
    if (configured) return configured;
    const all = Object.keys(this.hass?.states ?? {}).filter((id) => id.startsWith("weather."));
    return all.length === 1 ? all[0] : undefined;
  }

  private _satCache?: { entities: unknown; pairs: [string, string, string][] };

  /**
   * Satellites that talk to this Casita, found without a setting: an assist_satellite and
   * the "Assistant" select of its device (translation key `pipeline`), whose option is a
   * pipeline name or "preferred". Returns [satellite entity, device id] pairs.
   */
  private get _satellites(): [string, string][] {
    const hass = this.hass;
    const entry = this._entry;
    const pl = this._pipelines;
    if (!hass?.entities || !entry?.conversation_entity || !pl) return [];
    if (this._satCache?.entities !== hass.entities) {
      const selects = new Map<string, string>();
      for (const e of Object.values(hass.entities)) {
        if (e.device_id && e.entity_id.startsWith("select.") && (e.translation_key === "pipeline" || (e.translation_key === "pipeline_n" && !selects.has(e.device_id)))) {
          selects.set(e.device_id, e.entity_id);
        }
      }
      const pairs: [string, string, string][] = [];
      for (const e of Object.values(hass.entities)) {
        const sel = e.device_id && e.entity_id.startsWith("assist_satellite.") ? selects.get(e.device_id) : undefined;
        if (sel) pairs.push([e.entity_id, e.device_id!, sel]);
      }
      this._satCache = { entities: hass.entities, pairs };
    }
    const preferred = pl.pipelines.find((p) => p.id === pl.preferred_pipeline);
    return this._satCache.pairs
      .filter(([, , sel]) => {
        const option = hass.states[sel]?.state;
        const p = option === "preferred" ? preferred : pl.pipelines.find((x) => x.name === option);
        return p?.conversation_engine === entry.conversation_entity;
      })
      .map(([id, dev]) => [id, dev]);
  }

  // ------------------------------------------------------------------ hass → Casita
  private _changed(id: string | undefined): HassEntity | undefined | false {
    if (!id) return false;
    const st = this.hass.states[id];
    if (this._seen.states[id] === st) return false;
    this._seen.states[id] = st;
    return st;
  }

  private _processHass(initial: boolean) {
    const life = this._life;
    const hass = this.hass;
    if (!life || !hass) return;
    if (initial) this._seen.states = {};

    // connection
    const connected = hass.connected !== false;
    if (this._seen.connected !== connected) {
      this._seen.connected = connected;
      life.setOffline(!connected);
    }

    // mood sensors of the selected Casita
    const info = this._info;
    const entry = this._entry;
    const switched = entry?.entry_id !== this._seen.entry;
    this._seen.entry = entry?.entry_id;
    let moodChanged = false;
    if (entry) {
      for (const k of MOOD_KEYS) {
        const id = entry.mood_entities[k];
        if (id && this._changed(id) !== false) moodChanged = true;
      }
      if (moodChanged || initial || switched) life.setMood(readMood(hass, entry));
    } else if (initial || switched) life.setMood(undefined);

    // day phase + weather
    const sunSt = this._changed("sun.sun");
    const wId = this._weatherEntity;
    const wSt = this._changed(wId);
    if (initial || sunSt !== false || wSt !== false || (!wId && this._condition !== null)) {
      const phase = phaseFrom(hass.states["sun.sun"]);
      const cond = wId ? hass.states[wId]?.state ?? null : null;
      const condition = cond === "unavailable" || cond === "unknown" ? null : cond;
      if (initial || phase !== this._phase || condition !== this._condition) {
        if (initial) this._ambienceInitial = true;
        this._phase = phase;
        this._condition = condition;
        life.setAmbience(phase, condition, initial);
      }
    }

    // satellites that talk to this Casita: when one listens, thinks or answers, he does too
    for (const [satId] of this._satellites) {
      const satSt = this._changed(satId);
      if (satSt && !initial) life.satellite(satSt.state);
    }

    // emotion sensors: every reply updates one (with `updated`), so this also works for
    // users who may not subscribe to the casita_emotion event (non-admins)
    for (const e of info?.entries ?? []) {
      const emoSt = this._changed(e.emotion_entity);
      if (!emoSt) continue;
      const a = emoSt.attributes;
      const ev: CasitaEmotionEvent = {
        emotion: emoSt.state,
        text: a.text,
        conversation_id: a.conversation_id,
        device_id: a.device_id,
        agent_id: a.agent_id || e.conversation_entity,
        source: a.source,
        updated: a.updated,
      };
      if (initial) this._remember(ev);
      else this._onEmotion(ev);
    }
  }

  private _emotionKey(ev: CasitaEmotionEvent) {
    return `${ev.agent_id ?? ""}|${ev.updated ?? ""}|${ev.emotion}|${ev.conversation_id ?? ""}`;
  }

  private _remember(ev: CasitaEmotionEvent): boolean {
    const key = this._emotionKey(ev);
    if (this._recentEmotions.includes(key)) return false;
    this._recentEmotions.push(key);
    if (this._recentEmotions.length > 12) this._recentEmotions.shift();
    return true;
  }

  private _onEmotion(ev: CasitaEmotionEvent) {
    if (!ev?.emotion || !this._remember(ev)) return;
    if (this._conv.onCasitaEmotion(ev)) return;
    // every reply of this Casita, from any device (a satellite, the Assist dialog…),
    // shows here with its words; another Casita's replies are not hers
    const entry = this._entry;
    if (ev.agent_id && entry && ev.agent_id !== entry.conversation_entity) return;
    const followed = !!ev.device_id && this._satellites.some(([, dev]) => dev === ev.device_id);
    this._life?.react(ev.emotion, ev.text || undefined, followed);
  }

  private _subscribeEvents() {
    if (this._unsubEvents || !this.hass?.user?.is_admin) return;
    this._unsubEvents = this.hass.connection
      .subscribeEvents<CasitaEmotionEvent>((e) => this._onEmotion(e.data), "casita_emotion")
      .catch(() => undefined);
  }

  private _unsubscribeEvents() {
    const p = this._unsubEvents;
    this._unsubEvents = undefined;
    p?.then((unsub) => unsub?.()).catch(() => undefined);
  }

  private _interact(kind: InteractKind, intensity: number) {
    const entry = this._entry;
    if (!this.hass || !entry) return;
    this.hass.callService("casita", "interact", { kind, intensity, entry_id: entry.entry_id }).catch(() => undefined);
  }

  // ------------------------------------------------------------------ UI events
  private _showNote(text: string | undefined) {
    clearTimeout(this._noteTimer);
    this._note = text;
    if (text) this._noteTimer = setTimeout(() => (this._note = undefined), 5000);
  }

  private _submit(ev: Event) {
    ev.preventDefault();
    const v = this._input.value;
    if (!v.trim()) return;
    this._input.value = "";
    this._life?.typing("");
    if (!this._pipelines?.pipelines.length && this._pipelines) this._showNote(STRINGS[this._lang].noPipeline);
    this._conv.sendText(v);
  }

  private _onInput() {
    this._life?.typing(this._input.value, this._casitaPipeline);
  }

  private _toggleMic() {
    this._conv.toggleMic();
  }

  private _toggleHud() {
    this._hudOpen = !this._hudOpen;
  }

  private _onKeyDown = (ev: KeyboardEvent) => {
    if (ev.key === "Escape" && this._hudOpen && !this._settingsOpen) {
      ev.stopPropagation();
      this._hudOpen = false;
      this._moodBtn?.focus();
    }
  };

  private _openSettings() {
    this._settingsOpen = true;
    this._refreshPipelines();
  }

  private _settingsChanged(ev: CustomEvent<{ settings: CasitaSettings }>) {
    const prevWeather = this._weatherEntity;
    const prevSats = this._satellites.map(([id]) => id);
    this._settings = ev.detail.settings;
    this._fixError = undefined;
    saveSettings(this.hass, this._settings);
    // the pipeline picks the Casita, so his weather and satellites may change
    for (const id of [prevWeather, this._weatherEntity, ...prevSats]) if (id) delete this._seen.states[id];
    this._processHass(false);
  }

  private _stormTimer?: ReturnType<typeof setTimeout>;

  /** The weather was just (re)read from scratch: a storm already there does not flash at once. */
  private _ambienceInitial = true;

  private _scheduleStorm() {
    clearTimeout(this._stormTimer);
    this._stormTimer = undefined;
    if (!this.isConnected || skyFrom(this._condition, this._phase) !== "storm") return;
    this._stormTimer = setTimeout(() => {
      if (!document.hidden) this.strike();
      this._scheduleStorm();
    }, 6000 + Math.random() * 9000);
  }

  /** A lightning flash over the whole room, then Casita's startle. */
  public strike() {
    const flash = this.renderRoot.querySelector<HTMLElement>(".flash");
    if (flash) {
      flash.classList.remove("on");
      void flash.offsetWidth;
      flash.classList.add("on");
    }
    setTimeout(() => this._life?.lightning(), 160);
  }

  // ------------------------------------------------------------------ empty state: no assistant uses Casita
  private _openAssistants(ev: Event) {
    ev.preventDefault();
    // HA's own navigation: push the path, then tell the app (frontend src/common/navigate.ts)
    history.pushState(null, "", "/config/voice-assistants/assistants");
    window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false }, bubbles: true, composed: true }));
  }

  private async _createAssistant() {
    const hass = this.hass;
    const S = STRINGS[this._lang];
    const entry = this._entry;
    if (!hass || this._creating) return;
    this._createError = undefined;
    if (!entry?.conversation_entity) {
      this._createError = S.createFailed;
      return;
    }
    this._creating = true;
    try {
      const list = this._pipelines ?? (await listAssistPipelines(hass));
      const preferred = list.pipelines.find((p) => p.id === list.preferred_pipeline);
      const system = hass.config?.language || hass.language || "en";
      let conversationLanguage = system;
      try {
        const { agents } = await listConversationAgents(hass);
        if (agents.find((a) => a.id === entry.conversation_entity)?.supported_languages === "*") conversationLanguage = "*";
      } catch {
        /* the language of the system */
      }
      const names = new Set(list.pipelines.map((p) => p.name));
      let name = "Casita";
      for (let n = 2; names.has(name); n++) name = `Casita ${n}`;
      const created = await createAssistPipeline(hass, {
        name,
        language: preferred?.language ?? system,
        conversation_engine: entry.conversation_entity,
        conversation_language: conversationLanguage,
        prefer_local_intents: false,
        stt_engine: preferred?.stt_engine ?? null,
        stt_language: preferred?.stt_language ?? null,
        tts_engine: preferred?.tts_engine ?? null,
        tts_language: preferred?.tts_language ?? null,
        tts_voice: preferred?.tts_voice ?? null,
        wake_word_entity: preferred?.wake_word_entity ?? null,
        wake_word_id: preferred?.wake_word_id ?? null,
      });
      this._settings = { pipeline_id: created.id };
      saveSettings(hass, this._settings);
      this._pipelines = { ...list, pipelines: [...list.pipelines.filter((p) => p.id !== created.id), created] };
      this._processHass(false);
      this._life?.react("Happy", S.assistantReady);
      this._refreshPipelines();
    } catch (err: any) {
      this._createError = err?.message ? `${S.createFailed} ${err.message}` : S.createFailed;
    } finally {
      this._creating = false;
    }
  }

  /** Turns "Prefer handling commands locally" off on the selected assistant, the rest unchanged. */
  private async _fixLocal() {
    const hass = this.hass;
    const pipeline = this._pipeline;
    const S = STRINGS[this._lang];
    if (!hass || !pipeline || this._fixing) return;
    this._fixing = true;
    this._fixError = undefined;
    try {
      await updateAssistPipeline(hass, pipeline, { prefer_local_intents: false });
      const list = this._pipelines;
      if (list)
        this._pipelines = { ...list, pipelines: list.pipelines.map((p) => (p.id === pipeline.id ? { ...p, prefer_local_intents: false } : p)) };
      await this._refreshPipelines();
    } catch (err: any) {
      this._fixError = err?.message ? `${S.fixFailed} ${err.message}` : S.fixFailed;
    } finally {
      this._fixing = false;
    }
  }

  private _renderLocalWarning() {
    const S = STRINGS[this._lang];
    const admin = !!this.hass?.user?.is_admin;
    return html`<div class="empty local" role="note">
      <p class="empty-text" id="local-text">${S.localWarning}</p>
      ${admin
        ? html`<div class="empty-actions">
            <button type="button" class="empty-btn" aria-describedby="local-text" ?disabled=${this._fixing} @click=${this._fixLocal}>
              ${this._fixing ? S.fixing : S.fixLocal}
            </button>
          </div>`
        : html`<p class="empty-note">${S.askAdminFix}</p>`}
      ${this._fixError ? html`<p class="empty-error" role="alert">${this._fixError}</p>` : nothing}
    </div>`;
  }

  private _renderEmpty() {
    const S = STRINGS[this._lang];
    const admin = !!this.hass?.user?.is_admin;
    return html`<div class="empty" role="note">
      <p class="empty-text">${S.emptyTalk}</p>
      ${this._pipeline ? html`<p class="empty-note">${S.notCasita}</p>` : nothing}
      ${admin
        ? html`<div class="empty-actions">
            <button type="button" class="empty-btn" ?disabled=${this._creating} @click=${this._createAssistant}>
              ${this._creating ? S.creating : S.createAssistant}
            </button>
            <a class="empty-link" href="/config/voice-assistants/assistants" @click=${this._openAssistants}>${S.openAssistants}</a>
          </div>`
        : html`<p class="empty-note">${S.askAdmin}</p>`}
      ${this._createError ? html`<p class="empty-error" role="alert">${this._createError}</p>` : nothing}
    </div>`;
  }

  // ------------------------------------------------------------------ render
  protected render() {
    const S = STRINGS[this._lang];
    const sky = skyFrom(this._condition, this._phase);
    const listening = this._conv.listening;
    return html`
      <div class="toolbar" @keydown=${this._onKeyDown}>
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="main-title">${S.title}</div>
        <button
          id="mood-btn"
          class="icon-btn"
          type="button"
          aria-label=${this._hudOpen ? S.moodHide : S.moodShow}
          title=${S.mood}
          aria-expanded=${this._hudOpen ? "true" : "false"}
          aria-controls="hud"
          @click=${this._toggleHud}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${mdiHeartPulse}></path></svg>
        </button>
        <button class="icon-btn" type="button" aria-label=${S.settings} title=${S.settings} aria-haspopup="dialog" @click=${this._openSettings}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${mdiCog}></path></svg>
        </button>
      </div>
      <div class="content" @keydown=${this._onKeyDown}>
        <div
          class="room"
          tabindex="0"
          role="group"
          aria-label=${S.stageLabel}
          aria-describedby="room-help"
          data-phase=${this._phase}
          data-sky=${sky}
        >
          <div class="ambience" aria-hidden="true">
            <i class="l l-dawn"></i><i class="l l-dusk"></i><i class="l l-sun"></i><i class="l l-cloud"></i><i class="l l-fog"></i>
            <i class="l l-rain"></i><i class="l l-snow"></i><i class="l l-night"></i><i class="l l-glow"></i>
          </div>
          <casita-face controlled ?reduced-motion=${this._rm} .label=${S.exprAria + (S.labels[this._expression] ?? this._expression)}></casita-face>
          <div class="flash" aria-hidden="true"></div>
          <div class="bubble" hidden aria-hidden="true"><span class="bubble-text"></span></div>
        </div>
        ${this._hudOpen
          ? html`<casita-mood-hud
              id="hud"
              class="hud"
              .hass=${this.hass}
              .entry=${this._entry}
              .strings=${S}
              .heading=${(this._info?.entries.length ?? 0) > 1 && this._entry ? entryLabel(this._entry, this._info!.entries, this.hass) : ""}
              ?narrow=${this.narrow}
            ></casita-mood-hud>`
          : nothing}
        <p id="room-help" class="sr-only">${S.stageHelp}</p>
        <div id="sr-speech" class="sr-only" aria-live="polite"></div>
        <div class="bottom">
          ${this._empty ? this._renderEmpty() : this._localWarning ? this._renderLocalWarning() : nothing}
          ${this._note ? html`<p class="note" role="status">${this._note}</p>` : nothing}
          <form class="chat" autocomplete="off" @submit=${this._submit}>
            <label for="chat-input" class="sr-only">${S.chatLabel}</label>
            <input
              id="chat-input"
              type="text"
              maxlength="400"
              placeholder=${S.chatPh}
              enterkeyhint="send"
              @input=${this._onInput}
              @focus=${() => this._life?.inputFocus(true)}
              @blur=${() => this._life?.inputFocus(false)}
            />
            <button
              type="button"
              class="round mic ${listening ? "on" : ""}"
              aria-pressed=${listening ? "true" : "false"}
              aria-label=${listening ? S.micStop : S.micStart}
              title=${listening ? S.micStop : S.micStart}
              @click=${this._toggleMic}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${listening ? mdiStop : mdiMicrophone}></path></svg>
            </button>
            <button type="submit" class="round send" aria-label=${S.send} title=${S.send}>
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d=${mdiSend}></path></svg>
            </button>
          </form>
        </div>
      </div>
      <casita-settings-dialog
        .hass=${this.hass}
        .strings=${S}
        .settings=${this._settings}
        .pipelines=${this._pipelines}
        .warning=${this._localWarning ? S.localWarning : undefined}
        .warningAction=${this.hass?.user?.is_admin ? (this._fixing ? S.fixing : S.fixLocal) : undefined}
        .warningNote=${this.hass?.user?.is_admin ? undefined : S.askAdminFix}
        .warningError=${this._fixError}
        .warningBusy=${this._fixing}
        @warning-action=${this._fixLocal}
        .note=${this._pipeline && !this._casitaPipeline ? S.notCasita : undefined}
        .defaultId=${this._defaultPipeline?.id}
        .open=${this._settingsOpen}
        @settings-changed=${this._settingsChanged}
        @closed=${() => (this._settingsOpen = false)}
      ></casita-settings-dialog>
    `;
  }

  static styles = css`
    :host {
      /* Casita's room keeps its own palette; the chrome uses the HA theme */
      --room-top: #fafcfe;
      --room-bottom: #e5eef5;
      --grid: rgba(24, 188, 242, 0.09);
      --floor: #dbe6ee;
      --floor-line: #c5d5e1;
      --shadow: #16324a;
      --steam: #8ea2b4;
      --cloud: #9db0c1;
      --bubble: #ffffff;
      --bubble-ink: #13212c;
      --bubble-line: #d8e2ea;
      --bubble-shadow: rgba(10, 30, 50, 0.12);
      /* room light: weather and time of day only tint the light, discreetly */
      --sun-a: rgba(255, 196, 120, 0.2);
      --sun-b: rgba(255, 222, 170, 0.1);
      --cloud-l: rgba(150, 146, 140, 0.13);
      --fog-a: rgba(240, 239, 236, 0.5);
      --fog-b: rgba(212, 210, 206, 0.2);
      --rain-a: rgba(72, 92, 118, 0.16);
      --rain-b: rgba(72, 92, 118, 0.1);
      --snow-a: rgba(226, 240, 255, 0.55);
      --snow-b: rgba(236, 246, 255, 0.5);
      --dawn: rgba(255, 158, 92, 0.2);
      --dusk: rgba(255, 140, 96, 0.2);
      --night-a: rgba(16, 30, 64, 0.22);
      --night-b: rgba(16, 30, 64, 0.17);
      --glow-l: rgba(255, 168, 76, 0.34);
      --blush: #ff7aa8;
      --glow: #ffcf3f;
      --spark: #f5b800;
      --star-fx: #f5b800;
      --puff: #ffffff;
      --puff-edge: #aab9c7;
      --shine: #ffffff;
      display: flex;
      flex-direction: column;
      /* ha-panel-custom, the parent, has no height: fill the viewport like HA's iframe panels */
      height: 100vh;
      height: 100dvh;
      position: relative;
      overflow: hidden;
      background: var(--primary-background-color, #fafafa);
      color: var(--primary-text-color, #212121);
      font-family: var(--ha-font-family-body, Roboto, system-ui, sans-serif);
      -webkit-font-smoothing: var(--ha-font-smoothing, antialiased);
    }
    :host([dark]) {
      --room-top: #162430;
      --room-bottom: #0f1921;
      --grid: rgba(24, 188, 242, 0.07);
      --floor: #122029;
      --floor-line: #1c3140;
      --shadow: #000000;
      --steam: #7a90a2;
      --cloud: #5d7385;
      --bubble: #1d2c37;
      --bubble-ink: #e4ecf2;
      --bubble-line: #243440;
      --bubble-shadow: rgba(0, 0, 0, 0.35);
      --sun-a: rgba(255, 186, 108, 0.1);
      --sun-b: rgba(255, 206, 150, 0.04);
      --cloud-l: rgba(170, 160, 148, 0.07);
      --fog-a: rgba(196, 196, 194, 0.1);
      --fog-b: rgba(170, 170, 168, 0.05);
      --rain-a: rgba(6, 18, 40, 0.3);
      --rain-b: rgba(10, 24, 46, 0.22);
      --snow-a: rgba(170, 205, 250, 0.11);
      --snow-b: rgba(190, 215, 250, 0.07);
      --dawn: rgba(255, 150, 80, 0.12);
      --dusk: rgba(255, 130, 90, 0.12);
      --night-a: rgba(0, 4, 12, 0.36);
      --night-b: rgba(0, 4, 12, 0.3);
      --glow-l: rgba(255, 160, 70, 0.16);
      --blush: #ff8db6;
      --glow: #ffd45c;
      --spark: #ffd23f;
      --star-fx: #ffd23f;
      --puff: #f2f6fa;
      --puff-edge: #6f8394;
    }

    /* HA toolbar */
    .toolbar {
      display: flex;
      align-items: center;
      flex: none;
      height: var(--header-height, 56px);
      padding: 0 4px 0 12px;
      padding-top: var(--safe-area-inset-top, 0px);
      box-sizing: content-box;
      font-size: var(--ha-font-size-xl, 20px);
      font-weight: var(--ha-font-weight-normal, 400);
      color: var(--app-header-text-color, var(--primary-text-color, #212121));
      background-color: var(--app-header-background-color, var(--primary-background-color, #fafafa));
      border-bottom: var(--app-header-border-bottom, 1px solid var(--divider-color, rgba(0, 0, 0, 0.12)));
      position: relative;
      z-index: 4;
    }
    .main-title {
      margin: var(--margin-title, 0 0 0 12px);
      line-height: var(--ha-line-height-normal, 20px);
      flex-grow: 1;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    :host([narrow]) .main-title {
      margin-left: 4px;
    }
    .icon-btn {
      width: 48px;
      height: 48px;
      flex: none;
      border: 0;
      border-radius: 50%;
      background: transparent;
      color: inherit;
      display: grid;
      place-items: center;
      cursor: pointer;
      padding: 0;
    }
    .icon-btn svg {
      width: 24px;
      height: 24px;
      fill: currentColor;
    }
    .icon-btn:hover {
      background: rgba(127, 127, 127, 0.12);
    }
    .icon-btn[aria-expanded="true"] {
      background: rgba(127, 127, 127, 0.18);
      color: var(--primary-color, #18bcf2);
    }
    .icon-btn:focus-visible,
    .round:focus-visible {
      outline: 2px solid var(--primary-color, #18bcf2);
      outline-offset: 2px;
    }

    .content {
      position: relative;
      flex: 1;
      min-height: 0;
    }

    /* the room */
    .room {
      position: absolute;
      inset: 0;
      overflow: hidden;
      touch-action: pan-y pinch-zoom;
      user-select: none;
      -webkit-user-select: none;
      -webkit-touch-callout: none;
      outline: none;
      background:
        linear-gradient(
          to bottom,
          transparent calc(var(--floor-y, 76%) - 1px),
          var(--floor-line) calc(var(--floor-y, 76%) - 1px),
          var(--floor-line) calc(var(--floor-y, 76%) + 1px),
          var(--floor) calc(var(--floor-y, 76%) + 1px)
        ),
        repeating-linear-gradient(0deg, var(--grid) 0 1px, transparent 1px 28px),
        repeating-linear-gradient(90deg, var(--grid) 0 1px, transparent 1px 28px),
        linear-gradient(var(--room-top), var(--room-bottom));
    }
    .room:focus-visible {
      box-shadow: inset 0 0 0 3px var(--primary-color, #18bcf2);
    }
    .room.over {
      cursor: grab;
    }
    .room.grabbing {
      cursor: grabbing;
    }
    /* light layers, cross-faded over several seconds (--ambience-transition) */
    .ambience,
    .ambience .l {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .ambience .l {
      opacity: 0;
      transition: opacity var(--ambience-transition, 6s) ease-in-out;
    }
    .l-sun {
      background: linear-gradient(160deg, var(--sun-a), var(--sun-b) 50%, transparent 92%);
    }
    .l-cloud {
      background: var(--cloud-l);
    }
    .l-fog {
      background: linear-gradient(var(--fog-a), var(--fog-b));
    }
    .l-rain {
      background: linear-gradient(var(--rain-a), var(--rain-b));
    }
    .l-snow {
      background: linear-gradient(var(--snow-a), var(--snow-b));
    }
    .l-dawn {
      background: radial-gradient(140% 100% at 88% 0%, var(--dawn), transparent 80%);
    }
    .l-dusk {
      background: radial-gradient(140% 100% at 12% 0%, var(--dusk), transparent 80%);
    }
    .l-night {
      background: linear-gradient(var(--night-a), var(--night-b));
    }
    /* night: a small warm light around Casita */
    .l-glow {
      background: radial-gradient(
        calc(var(--house-w, 200px) * 1.25) calc(var(--house-w, 200px) * 0.95) at 50% calc(var(--floor-y, 76%) - var(--house-w, 200px) * 0.32),
        var(--glow-l),
        transparent
      );
    }
    .room:is([data-phase="day"], [data-phase="dawn"], [data-phase="dusk"])[data-sky="sun"] .l-sun {
      opacity: 1;
    }
    .room:is([data-phase="dawn"], [data-phase="dusk"])[data-sky="sun"] .l-sun,
    .room:not([data-phase="night"])[data-sky="partly"] .l-sun {
      opacity: 0.55;
    }
    .room[data-sky="cloud"] .l-cloud,
    .room[data-sky="fog"] .l-fog {
      opacity: 1;
    }
    .room:is([data-sky="partly"], [data-sky="wind"]) .l-cloud {
      opacity: 0.45;
    }
    .room[data-sky="fog"] .l-cloud {
      opacity: 0.7;
    }
    .room:is([data-sky="rain"], [data-sky="pour"], [data-sky="hail"], [data-sky="storm"]) .l-rain {
      opacity: 1;
    }
    .room[data-sky="sleet"] .l-rain {
      opacity: 0.7;
    }
    .room[data-sky="snow"] .l-snow {
      opacity: 1;
    }
    .room[data-sky="sleet"] .l-snow {
      opacity: 0.5;
    }
    .room[data-phase="dawn"] .l-dawn,
    .room[data-phase="dusk"] .l-dusk,
    .room[data-phase="night"] .l-night,
    .room[data-phase="night"] .l-glow {
      opacity: 1;
    }
    .flash {
      position: absolute;
      inset: 0;
      background: #f4f8ff;
      opacity: 0;
      pointer-events: none;
    }
    .flash.on {
      animation: flash 0.45s ease-out;
    }
    :host([dark]) .flash {
      background: #dfe8ff;
    }
    @keyframes flash-soft {
      50% {
        opacity: 0.16;
      }
    }
    @keyframes flash {
      0% {
        opacity: 0;
      }
      15% {
        opacity: 0.32;
      }
      30% {
        opacity: 0.05;
      }
      45% {
        opacity: 0.22;
      }
      100% {
        opacity: 0;
      }
    }

    /* speech bubble */
    .bubble {
      position: absolute;
      left: 0;
      top: 0;
      max-width: min(300px, 70%);
      padding: 9px 13px;
      border-radius: 16px;
      background: var(--bubble);
      color: var(--bubble-ink);
      border: 1px solid var(--bubble-line);
      box-shadow: 0 6px 18px var(--bubble-shadow);
      font-size: 17px;
      font-weight: 500;
      line-height: 1.35;
      pointer-events: none;
      transform-origin: 0 100%;
      animation: pop 0.26s cubic-bezier(0.3, 1.6, 0.5, 1);
      will-change: transform;
      z-index: 2;
      overflow-wrap: anywhere;
    }
    .bubble[hidden] {
      display: none;
    }
    .bubble.short {
      font-size: 18px;
      font-weight: 600;
    }
    .bubble::after {
      content: "";
      position: absolute;
      left: 14px;
      bottom: -7px;
      width: 12px;
      height: 12px;
      background: var(--bubble);
      border-right: 1px solid var(--bubble-line);
      border-bottom: 1px solid var(--bubble-line);
      transform: rotate(45deg);
      border-bottom-right-radius: 3px;
    }
    .bubble.flip::after {
      left: auto;
      right: 14px;
    }
    .bubble.out {
      opacity: 0;
      transition: opacity 0.2s;
    }
    @keyframes pop {
      from {
        opacity: 0;
        scale: 0.85;
      }
      to {
        opacity: 1;
        scale: 1;
      }
    }

    /* mood HUD: under the Mood button, or a thin strip on narrow */
    .hud {
      position: absolute;
      top: 8px;
      right: 12px;
      z-index: 3;
    }
    :host([narrow]) .hud {
      top: 0;
      left: 0;
      right: 0;
    }

    /* bottom chat pill */
    .bottom {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0 max(16px, var(--safe-area-inset-right, 0px)) max(16px, calc(var(--safe-area-inset-bottom, 0px) + 12px))
        max(16px, var(--safe-area-inset-left, 0px));
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      pointer-events: none;
      z-index: 3;
    }
    .bottom > * {
      pointer-events: auto;
    }
    .chat {
      display: flex;
      align-items: center;
      gap: 4px;
      width: min(560px, 100%);
      box-sizing: border-box;
      padding: 4px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--card-background-color, #fff) 86%, transparent);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 10px 30px var(--bubble-shadow);
    }
    .chat input {
      flex: 1;
      min-width: 0;
      font: inherit;
      font-size: 16px;
      padding: 9px 14px;
      border: 0;
      border-radius: 999px;
      background: transparent;
      color: var(--primary-text-color, #212121);
    }
    .chat input::placeholder {
      color: var(--secondary-text-color, #727272);
    }
    .chat input:focus {
      outline: none;
    }
    .chat:focus-within {
      border-color: var(--primary-color, #18bcf2);
      box-shadow: 0 0 0 1px var(--primary-color, #18bcf2), 0 10px 30px var(--bubble-shadow);
    }
    .round {
      width: 40px;
      height: 40px;
      flex: none;
      border-radius: 50%;
      border: 0;
      display: grid;
      place-items: center;
      cursor: pointer;
      padding: 0;
      position: relative;
    }
    .round svg {
      width: 22px;
      height: 22px;
      fill: currentColor;
    }
    .mic {
      background: transparent;
      color: var(--primary-color, #18bcf2);
    }
    .mic:hover {
      background: rgba(127, 127, 127, 0.12);
    }
    .mic.on {
      background: var(--primary-color, #18bcf2);
      color: var(--text-primary-color, #fff);
    }
    .mic.on::before {
      content: "";
      position: absolute;
      inset: -4px;
      border-radius: 50%;
      border: 2px solid var(--primary-color, #18bcf2);
      animation: ring 1.2s ease-out infinite;
    }
    @keyframes ring {
      from {
        opacity: 0.8;
        transform: scale(0.9);
      }
      to {
        opacity: 0;
        transform: scale(1.35);
      }
    }
    .send {
      background: var(--primary-color, #18bcf2);
      color: var(--text-primary-color, #fff);
    }
    .note {
      margin: 0;
      font-size: 13px;
      color: var(--secondary-text-color, #5a6a77);
      text-align: center;
      padding: 4px 12px;
      border-radius: 999px;
      max-width: min(560px, 100%);
      background: color-mix(in srgb, var(--card-background-color, #fff) 80%, transparent);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
    }
    /* no assistant talks to Casita yet */
    .empty {
      width: min(560px, 100%);
      box-sizing: border-box;
      padding: 10px 14px;
      border-radius: 16px;
      background: color-mix(in srgb, var(--card-background-color, #fff) 88%, transparent);
      border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      font-size: 14px;
      line-height: 1.4;
      text-align: center;
    }
    .empty p {
      margin: 0;
    }
    .empty-note {
      margin-top: 2px !important;
      font-size: 13px;
      color: var(--secondary-text-color, #5a6a77);
    }
    .empty-error {
      margin-top: 6px !important;
      font-size: 13px;
      color: var(--error-color, #db4437);
    }
    .empty-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 4px 14px;
      margin-top: 8px;
    }
    .empty-btn {
      font: inherit;
      font-size: 14px;
      font-weight: var(--ha-font-weight-medium, 500);
      border: 0;
      border-radius: 999px;
      padding: 8px 16px;
      min-height: 36px;
      cursor: pointer;
      background: var(--primary-color, #18bcf2);
      color: var(--text-primary-color, #fff);
    }
    .empty-btn[disabled] {
      opacity: 0.6;
      cursor: progress;
    }
    .empty-link {
      font-size: 13px;
      color: var(--primary-color, #18bcf2);
      text-decoration: underline;
      text-underline-offset: 2px;
      padding: 6px 2px;
    }
    .empty-btn:focus-visible,
    .empty-link:focus-visible {
      outline: 2px solid var(--primary-color, #18bcf2);
      outline-offset: 2px;
    }
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      overflow: hidden;
      clip: rect(0 0 0 0);
      white-space: nowrap;
    }
    @media (prefers-reduced-motion: reduce) {
      .bubble {
        animation: none;
      }
      .mic.on::before {
        animation: none;
      }
      /* one soft pulse instead of a flicker */
      .flash.on {
        animation: flash-soft 0.9s ease-in-out;
      }
    }
  `;
}
define("casita-panel", CasitaPanel);

declare global {
  interface HTMLElementTagNameMap {
    "casita-panel": CasitaPanel;
  }
}
