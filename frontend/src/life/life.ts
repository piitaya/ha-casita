/* Casita's life: mood visuals, the autonomous director, reactions to touch, speech and
 * lip-sync, conversation choreography and the room (weather, day/night).
 *
 * Ported from the web demo (app.js). The behaviour code keeps the demo's structure and
 * numbers on purpose (motion-spec.md is the reference); what changed:
 * - the long-term mood comes from the backend sensors (setMood), the demo's local model
 *   only remains as a fallback and as short-term deltas that make reactions immediate;
 * - interactions are reported to `casita.interact` through `onInteract`;
 * - the chat/Assist simulators became real conversation hooks (listen/think/stream/reply…);
 * - the clock-based ambiance became sun.sun phases + the weather entity;
 * - demo-only parts (ball, palette, hints, backstage, offline replies) are gone.
 */
import { Casita } from "../engine/engine.js";
import type { Face, FaceLayer, EmitOptions } from "../engine/engine.js";
import type { InteractKind, MoodValues } from "../data/casita";
import type { SpeechPlayback } from "../assist/speech-player";
import { STRINGS, type Lang, type Strings } from "../i18n";

/* eslint-disable @typescript-eslint/no-explicit-any */

export type Phase = "dawn" | "day" | "dusk" | "night";

export interface LifeHost {
  /** The room: pointer target, keyboard focus, CSS tokens, pixel box. */
  stage: HTMLElement;
  svg: SVGSVGElement;
  face: Face;
  bubble: HTMLElement;
  bubbleText: HTMLElement;
  srSpeech: HTMLElement;
  /** Chat input, for reading along the caret. */
  input(): HTMLInputElement | null | undefined;
  onInteract(kind: InteractKind, intensity: number): void;
  onExpression?(id: string): void;
}

export interface LifeOptions {
  lang: Lang;
  reducedMotion: boolean;
  autonomous: boolean;
  userName?: string;
}

export interface ReplyOptions {
  text: string;
  emotion: string;
  /** TTS audio is coming: hold the mouth until it plays. */
  expectAudio?: boolean;
  /** An action was done (sparkles). */
  success?: boolean;
  /** Called when the bubble is done speaking. */
  done?: () => void;
}

export interface Life {
  start(): void;
  stop(): void;
  destroy(): void;
  layout(): void;
  setLang(l: Lang): void;
  setUserName(n: string | undefined): void;
  setAutonomous(on: boolean): void;
  /** Backend mood (sensors), or undefined to use the local model. */
  setMood(m: Partial<MoodValues> | undefined): void;
  setAmbience(phase: Phase, condition: string | null, initial: boolean): void;
  lightning(): void;
  greet(): void;
  // typing
  /** `keywords`: react to words being typed (only when the assistant is a Casita). */
  typing(value: string, keywords?: boolean): void;
  inputFocus(focused: boolean): void;
  // conversation
  userSent(): void;
  listen(o: { wake?: boolean; source?: "panel" | "satellite" }): void;
  voice(active: boolean): void;
  voiceLevel(rms: number): void;
  think(): void;
  streamText(chunk: string, emotionHint?: string, expectAudio?: boolean): void;
  reply(o: ReplyOptions): void;
  speak(p: SpeechPlayback): void;
  speechEnded(): void;
  speechFailed(): void;
  fail(o: { offline?: boolean; text?: string }): void;
  endConversation(delay?: number): void;
  setOffline(on: boolean): void;
  satellite(state: string): void;
  /** A casita_emotion outside our own conversation (fromSatellite: the mirrored one). */
  react(emotion: string, text?: string, fromSatellite?: boolean): void;
  readonly expression: string;
  readonly conversing: boolean;
  readonly talking: boolean;
  /** Roof top, in stage pixels (for floating indicators). */
  anchorPx(): [number, number];
  /** A point of the house (0..120 × 0..116.88, follows the body), in stage pixels. */
  houseToPx(hx: number, hy: number): [number, number];
  debug(): Record<string, unknown>;
}

export function createLife(host: LifeHost, opts: LifeOptions): Life {
  const NS = "http://www.w3.org/2000/svg";
  const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
  const clamp01 = (v: number) => clamp(v, 0, 1);
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const rand = (a: number, b: number) => a + Math.random() * (b - a);
  const pick = <T>(a: readonly T[]): T => a[Math.floor(Math.random() * a.length)];
  const smooth = (t: number) => {
    t = clamp01(t);
    return t * t * (3 - 2 * t);
  };
  const env = (u: number) => (u <= 0 || u >= 1 ? 0 : Math.sin(Math.PI * u));
  const RM = opts.reducedMotion;
  const RMK = RM ? 0.35 : 1;
  const FACE = Casita.FACE;
  const IDS = Casita.EXPRESSIONS.map((e) => e.id);
  const { stage, svg, face, bubble, bubbleText } = host;

  let lang: Lang = opts.lang;
  let S: Strings = STRINGS[lang];
  const T = <K extends keyof Strings>(k: K): Strings[K] => S[k];
  const Tn = (k: "reName", n: string) => String(T(k)).replace("{n}", n);
  let userName = opts.userName;

  const PH = Array.from({ length: 16 }, () => rand(0, 6.283));

  // ------------------------------------------------------------------ clocks
  let rt = 0; // real seconds since start
  let at = 0; // app seconds (mood, boredom, director)
  let frameDt = 0;
  const timers: { at: number; fn: () => void; tag: string | null }[] = [];
  function after(sec: number, fn: () => void, tag?: string) {
    timers.push({ at: rt + sec, fn, tag: tag || null });
  }
  function cancel(tag: string) {
    for (let i = timers.length - 1; i >= 0; i--) if (timers[i].tag === tag) timers.splice(i, 1);
  }
  function runTimers() {
    for (let i = 0; i < timers.length; i++) {
      if (rt >= timers[i].at) {
        const t = timers.splice(i, 1)[0];
        i--;
        try {
          t.fn();
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e);
        }
      }
    }
  }

  // ------------------------------------------------------------------ memory (per viewer)
  const MEM_KEY = "casita.v1";
  const mem: any = (() => {
    let m: any = null;
    try {
      m = JSON.parse(localStorage.getItem(MEM_KEY) || "null");
    } catch {
      m = null;
    }
    if (!m || typeof m !== "object") m = {};
    return Object.assign({ visits: 0, firstSeen: null, lastSeen: null, affection: 0.3, pokesTotal: 0, petsSeconds: 0 }, m);
  })();
  function saveMem() {
    mem.lastSeen = Date.now();
    mem.affection = M.F;
    try {
      localStorage.setItem(MEM_KEY, JSON.stringify(mem));
    } catch {
      /* storage unavailable */
    }
  }

  // ------------------------------------------------------------------ mood
  // B: long-term mood (backend sensors, or the demo's local model as a fallback)
  // D: short-term deltas of local reactions, decaying in seconds (backend mode)
  // W: weather bias. M = B + D + W, what every behaviour reads.
  let phase: Phase = (() => {
    const h = new Date().getHours();
    return h >= 6 && h < 9 ? "dawn" : h >= 9 && h < 18 ? "day" : h >= 18 && h < 21 ? "dusk" : "night";
  })();
  let condition: string | null = null;
  const isNight = () => phase === "night";
  function energyBase() {
    return phase === "dawn" ? 0.8 : phase === "day" ? 0.7 : phase === "dusk" ? 0.5 : 0.25;
  }
  const KEYS = ["V", "A", "E", "F", "I", "C"] as const;
  type K = (typeof KEYS)[number];
  const RANGE: Record<K, [number, number]> = { V: [-1, 1], A: [0, 1], E: [0, 1], F: [0, 1], I: [0, 1], C: [0, 1] };
  const FROM_SENSOR: Record<K, keyof MoodValues> = { V: "joy", A: "excitement", E: "energy", F: "affection", I: "irritation", C: "curiosity" };
  const B: Record<K, number> = { V: 0.25, A: 0.35, E: energyBase(), F: clamp01(mem.affection), I: 0, C: 0.3 };
  B.V = 0.25 + 0.1 * B.F;
  const D: Record<K, number> = { V: 0, A: 0, E: 0, F: 0, I: 0, C: 0 };
  const W: Record<K, number> = { V: 0, A: 0, E: 0, F: 0, I: 0, C: 0 };
  const M: Record<K, number> & { asleep: boolean } = { ...B, asleep: false };
  let backend = false;
  function mergeMood() {
    for (const k of KEYS) M[k] = clamp(B[k] + D[k] + W[k], RANGE[k][0], RANGE[k][1]);
  }
  function nudge(d: Partial<Record<K, number>>) {
    for (const k of KEYS) {
      const v = d[k];
      if (!v) continue;
      if (backend) D[k] = clamp(D[k] + v, RANGE[k][0] - B[k], RANGE[k][1] - B[k]);
      else B[k] = clamp(B[k] + v, RANGE[k][0], RANGE[k][1]);
    }
    mergeMood();
  }
  function moodUpdate(dt: number) {
    if (backend) {
      const k = Math.exp(-dt / 6);
      for (const key of KEYS) D[key] *= k;
    } else {
      const dec = (x: number, base: number, tau: number) => x + (base - x) * (1 - Math.exp(-dt / tau));
      B.V = dec(B.V, 0.25 + 0.1 * B.F, 40);
      B.A = dec(B.A, 0.35, 12);
      B.E = dec(B.E, energyBase(), 120);
      if (M.asleep) B.E = clamp01(B.E + 0.02 * dt);
      B.I = dec(B.I, 0, 8);
      B.C = dec(B.C, 0.3, 15);
    }
    mergeMood();
  }
  function setMood(m: Partial<MoodValues> | undefined) {
    if (!m) {
      if (backend) {
        // keep where he was, then let the local model carry on
        for (const k of KEYS) {
          B[k] = M[k];
          D[k] = 0;
        }
      }
      backend = false;
      return;
    }
    for (const k of KEYS) {
      const v = m[FROM_SENSOR[k]];
      if (v == null || !Number.isFinite(v)) continue;
      const nv = clamp(v, RANGE[k][0], RANGE[k][1]);
      // the backend now includes what we reported: absorb the local delta
      if (backend && Math.abs(nv - B[k]) > 0.005) D[k] *= 0.3;
      B[k] = nv;
    }
    if (!backend) for (const k of KEYS) D[k] = 0;
    backend = true;
    mergeMood();
  }

  // ------------------------------------------------------------------ face + stage
  function scaleBody(o: any) {
    if (!RM || !o) return o;
    const r: any = {};
    for (const k in o)
      r[k] = (k.startsWith("body.") && k !== "body.L" && k !== "body.A" && k !== "body.B") || k === "face.x" || k === "face.y" ? o[k] * RMK : o[k];
    return r;
  }
  {
    const imp = face.impulse;
    (face as any).impulse = (o: any) => imp(scaleBody(o));
  }
  const BLUE_LAB = Casita.hexToOklab(Casita.COLORS.blue);
  face.spring("dot.s", { k: 900, c: 60 });
  const view = { s: 2, x0: -60, y0: -80, w: 240, h: 230, pxW: 480, pxH: 460 };
  const FLOOR = 0.76; // floor line, as a share of the room height
  let rect = { left: 0, top: 0, right: 0, bottom: 0 };
  function cacheRect() {
    const r = svg.getBoundingClientRect();
    rect = { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
  }
  function layout() {
    const r = stage.getBoundingClientRect();
    const w = Math.max(200, r.width),
      h = Math.max(240, r.height);
    const houseW = clamp(Math.min(w * 0.5, h * 0.42), 120, 340);
    const s = houseW / 120;
    const vbW = w / s,
      vbH = h / s;
    view.s = s;
    view.w = vbW;
    view.h = vbH;
    view.pxW = w;
    view.pxH = h;
    view.x0 = 60 - vbW / 2;
    view.y0 = 116.88 - FLOOR * vbH;
    svg.setAttribute("viewBox", [view.x0, view.y0, vbW, vbH].map((v) => v.toFixed(2)).join(" "));
    stage.style.setProperty("--floor-y", (FLOOR * 100).toFixed(1) + "%");
    stage.style.setProperty("--house-w", houseW.toFixed(1) + "px");
    cacheRect();
  }
  const toPx = (wx: number, wy: number): [number, number] => [(wx - view.x0) * view.s, (wy - view.y0) * view.s];
  function clientToWorld(cx: number, cy: number): [number, number] {
    return [view.x0 + (cx - rect.left) / view.s, view.y0 + (cy - rect.top) / view.s];
  }
  // how much the body may lean toward a point: full on the stage, fading to nothing ~120 px outside it
  function leanFor(cx: number, cy: number) {
    const out = Math.max(0, rect.left - cx, cx - rect.right, rect.top - cy, cy - rect.bottom);
    if (out > 0) return clamp01(1 - out / 120) * 0.7;
    return 1;
  }

  // ground shadow, extras group, defs
  const mk = (tag: string, attrs: Record<string, any>, parent?: Element) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, String(attrs[k]));
    if (parent) parent.appendChild(n);
    return n as SVGElement;
  };
  const defs = mk("defs", {});
  svg.insertBefore(defs, svg.firstChild);
  const clip = mk("clipPath", { id: "casita-house-clip" }, defs);
  mk("path", { d: Casita.HOUSE_D }, clip);
  const shadow = mk("ellipse", { cx: 60, cy: 117.6, rx: 54, ry: 4.6, class: "casita-shadow" });
  svg.insertBefore(shadow, face.el.world);
  const gX = mk("g", { class: "casita-extras" }, face.el.body);
  const grad = mk("radialGradient", { id: "casita-glow-grad" }, defs);
  mk("stop", { offset: "0", style: "stop-color: var(--glow); stop-opacity: .75" }, grad);
  mk("stop", { offset: "0.55", style: "stop-color: var(--glow); stop-opacity: .28" }, grad);
  mk("stop", { offset: "1", style: "stop-color: var(--glow); stop-opacity: 0" }, grad);
  const glowEl = mk("ellipse", { cx: 60, cy: 64, rx: 0, ry: 0, fill: "url(#casita-glow-grad)" });
  face.el.world.insertBefore(glowEl, face.el.body);
  const gXFace = mk("g", { class: "casita-extras-face" });
  face.el.face.insertBefore(gXFace, face.el.face.firstChild);

  // theme-aware colours for particles drawn over the stage
  let TOK: { cloud: string } = { cloud: "#9fb0c0" };
  function readTokens() {
    const cs = getComputedStyle(stage);
    const g = (n: string, d: string) => cs.getPropertyValue(n).trim() || d;
    TOK = { cloud: g("--cloud", "#9fb0c0") };
    face.setPalette({
      spark: g("--spark", "#ffd23f"),
      star: g("--star-fx", "#ffd23f"),
      steam: g("--steam", "#8fa3b5"),
      puff: g("--puff", "#ffffff"),
      puffEdge: g("--puff-edge", "#b9c6d2"),
      shine: g("--shine", "#ffffff"),
    });
  }

  // ------------------------------------------------------------------ extras (invented accessories)
  const springVal = (k?: number, c?: number) => ({ x: 0, v: 0, t: 0, k: k || 260, c: c || 18 });
  function stepSpring(s: any, dt: number) {
    const a = s.k * (s.t - s.x) - s.c * s.v;
    s.v += a * dt;
    s.x += s.v * dt;
    return s.x;
  }
  const X: any = {
    blush: { g: mk("g", { opacity: 0 }, gXFace), sp: springVal(80, 16) },
    bang: { g: mk("g", {}, gX), sp: springVal(320, 14) },
    vein: { g: mk("g", {}, gX), sp: springVal(260, 16) },
    dots: { g: mk("g", {}, gX), sp: springVal(200, 20) },
    bandage: { g: mk("g", {}, gX), sp: springVal(300, 15) },
    cloud: { g: mk("g", {}, gX), sp: springVal(60, 14) },
    dream: { g: mk("g", {}, gX), sp: springVal(160, 14) },
    rings: { g: mk("g", {}, gX), sp: springVal(120, 18) },
    scan: { g: mk("g", { "clip-path": "url(#casita-house-clip)" }, gX), sp: springVal(120, 22) },
    glow: { g: glowEl, sp: springVal(40, 12) },
  };
  mk("ellipse", { cx: 22, cy: 80, rx: 6, ry: 3.2, style: "fill: var(--blush)" }, X.blush.g);
  mk("ellipse", { cx: 98, cy: 80, rx: 6, ry: 3.2, style: "fill: var(--blush)" }, X.blush.g);
  X.bangEls = [mk("rect", { x: -2.6, y: -16, width: 5.2, height: 12, rx: 2.6 }, X.bang.g), mk("circle", { cx: 0, cy: 1, r: 2.8 }, X.bang.g)];
  mk("path", { d: "M-7,-2.5Q-2.5,-2.5 -2.5,-7M2.5,-7Q2.5,-2.5 7,-2.5M7,2.5Q2.5,2.5 2.5,7M-2.5,7Q-2.5,2.5 -7,2.5", fill: "none", stroke: FACE, "stroke-width": 2.4, "stroke-linecap": "round" }, X.vein.g);
  X.dotEls = [0, 1, 2].map((i) => mk("circle", { cx: 48 + i * 12, cy: -10, r: 0 }, X.dots.g));
  for (const a of [45, -45]) mk("rect", { x: -9, y: -3, width: 18, height: 6, rx: 3, fill: FACE, transform: "rotate(" + a + ")" }, X.bandage.g);
  X.cloudBody = mk("path", { d: "M-16,4a7,7 0 0,1 2,-13.6a9,9 0 0,1 17,-2.6a7,7 0 0,1 12,6.2a5.6,5.6 0 0,1 -1,10Z" }, X.cloud.g);
  X.rain = [0, 1, 2].map((i) => mk("rect", { x: -9 + i * 9, y: 8, width: 2, height: 5, rx: 1 }, X.cloud.g));
  X.dreamEls = {
    a: mk("circle", { cx: 96, cy: 8, r: 2.6 }, X.dream.g),
    b: mk("circle", { cx: 103, cy: -2, r: 4.2 }, X.dream.g),
    c: mk("circle", { cx: 116, cy: -22, r: 15 }, X.dream.g),
    icon: mk("path", { fill: FACE, d: "" }, X.dream.g),
  };
  const ICONS: Record<string, string> = {
    heart: "M116,-15.5l-6.4,-6.4a4,4 0 0,1 6.4,-4.9a4,4 0 0,1 6.4,4.9Z",
    sun: "M116,-26.5a4.5,4.5 0 1,0 0.01,0ZM116,-34v3M116,-13v3M104,-22h3M125,-22h3M107.5,-30.5l2,2M122.5,-15.5l2,2M107.5,-13.5l2,-2M122.5,-28.5l2,-2",
    bulb: "M116,-31a6.5,6.5 0 0,1 4,11.6v2.4h-8v-2.4a6.5,6.5 0 0,1 4,-11.6ZM112.5,-15h7v2.4h-7Z",
    house: "M107.5,-14v-8.5l8.5,-8l8.5,8v8.5Z",
  };
  X.ringEls = [0, 1].map(() => mk("path", { d: "M-10,-4A12,12 0 0,1 10,-4", fill: "none", "stroke-width": 2.4, "stroke-linecap": "round" }, X.rings.g));
  X.scanEl = mk("rect", { x: 0, y: 0, width: 120, height: 10, fill: FACE, opacity: 0.12 }, X.scan.g);
  const want: Record<string, number> = { blush: 0, bang: 0, vein: 0, dots: 0, bandage: 0, cloud: 0, dream: 0, rings: 0, scan: 0, glow: 0 };
  let glowUntil = 0;
  let ringsSpeed = 1;
  let bangT0 = -9,
    dreamIcon = "heart",
    ringsT = 0;
  function popBang() {
    bangT0 = rt;
    X.bang.sp.x = 0;
    X.bang.sp.v = 0;
  }
  function renderExtras(dt: number) {
    const col = face.bodyColor;
    for (const k of Object.keys(want)) X[k].sp.t = want[k];
    // bang auto-fades 1.2 s after a pop
    const bangOn = rt - bangT0 < 1.2;
    X.bang.sp.t = bangOn ? 1 : 0;
    for (const k of Object.keys(want)) stepSpring(X[k].sp, Math.min(dt, 1 / 30));
    const s = (k: string) => Math.max(0, X[k].sp.x);
    X.blush.g.setAttribute("opacity", (clamp01(s("blush")) * (0.42 + 0.08 * Math.sin(rt * 1.9))).toFixed(3));
    const b = s("bang");
    X.bang.g.setAttribute("transform", "translate(108 " + (-14 - 1.5 * Math.sin(rt * 5)).toFixed(2) + ") rotate(12) scale(" + b.toFixed(3) + ")");
    X.bangEls.forEach((e: Element) => e.setAttribute("fill", col));
    X.bang.g.style.display = b < 0.01 ? "none" : "";
    const v = s("vein");
    X.vein.g.setAttribute("transform", "translate(84 44) scale(" + (v * (1 + 0.18 * (0.5 + 0.5 * Math.sin(rt * 9.4)))).toFixed(3) + ")");
    X.vein.g.style.display = v < 0.01 ? "none" : "";
    const d = s("dots");
    X.dotEls.forEach((e: Element, i: number) => {
      const u = clamp01((rt % 2.4) / 0.4 - i);
      e.setAttribute("r", (3 * d * smooth(u)).toFixed(2));
      e.setAttribute("fill", col);
    });
    const bd = s("bandage");
    X.bandage.g.setAttribute("transform", "translate(76 26) rotate(-8) scale(" + bd.toFixed(3) + ")");
    X.bandage.g.style.display = bd < 0.01 ? "none" : "";
    const c = s("cloud");
    X.cloud.g.setAttribute("transform", "translate(" + (60 + 3 * Math.sin(rt * 0.6)).toFixed(2) + " -26) scale(" + c.toFixed(3) + ")");
    X.cloud.g.style.display = c < 0.01 ? "none" : "";
    X.cloudBody.setAttribute("fill", TOK.cloud);
    X.rain.forEach((e: Element, i: number) => {
      const u = (rt * 1.3 + i * 0.37) % 1;
      e.setAttribute("y", (8 + u * 14).toFixed(2));
      e.setAttribute("opacity", (1 - u).toFixed(2));
      e.setAttribute("fill", TOK.cloud);
    });
    const dr = s("dream");
    X.dream.g.style.display = dr < 0.01 ? "none" : "";
    if (dr >= 0.01) {
      X.dream.g.setAttribute("opacity", clamp01(dr).toFixed(3));
      const bob = 1.2 * Math.sin(rt * 1.7);
      X.dreamEls.a.setAttribute("r", (2.6 * clamp01(dr * 3)).toFixed(2));
      X.dreamEls.b.setAttribute("r", (4.2 * clamp01(dr * 3 - 1)).toFixed(2));
      X.dreamEls.c.setAttribute("r", (15 * clamp01(dr * 3 - 2)).toFixed(2));
      X.dreamEls.c.setAttribute("cy", (-22 + bob).toFixed(2));
      for (const k of ["a", "b", "c"]) X.dreamEls[k].setAttribute("fill", col);
      X.dreamEls.icon.setAttribute("d", ICONS[dreamIcon]);
      X.dreamEls.icon.setAttribute("transform", "translate(0 " + bob.toFixed(2) + ")");
      X.dreamEls.icon.setAttribute("opacity", clamp01(dr * 3 - 2).toFixed(2));
      X.dreamEls.icon.setAttribute("stroke", dreamIcon === "sun" ? FACE : "none");
      X.dreamEls.icon.setAttribute("stroke-width", "2");
    }
    const rg = s("rings");
    X.rings.g.style.display = rg < 0.01 ? "none" : "";
    if (rg >= 0.01) {
      ringsT += dt * ringsSpeed;
      X.ringEls.forEach((e: Element, i: number) => {
        const u = (ringsT / 0.8 + i * 0.5) % 1;
        const sc = 1 + 0.9 * u,
          side = i ? 1 : -1;
        e.setAttribute("transform", "translate(" + (60 + side * 30) + " " + (22 - 8 * u) + ") rotate(" + side * 38 + ") scale(" + sc.toFixed(3) + ")");
        e.setAttribute("stroke", col);
        e.setAttribute("opacity", (rg * (1 - u)).toFixed(3));
      });
    }
    const sc = s("scan");
    X.scan.g.style.display = sc < 0.01 ? "none" : "";
    if (sc >= 0.01) {
      const u = (rt / 1.6) % 1;
      X.scanEl.setAttribute("y", (-10 + u * 130).toFixed(2));
      X.scanEl.setAttribute("opacity", (0.14 * sc).toFixed(3));
    }
    const gl = s("glow");
    glowEl.style.display = gl < 0.01 ? "none" : "";
    if (gl >= 0.01) {
      const bx0 = face.get("body.x") || 0,
        by0 = face.get("body.y") || 0,
        fl = 1 + 0.04 * Math.sin(rt * 7) * Math.sin(rt * 2.3);
      glowEl.setAttribute("cx", (60 + bx0).toFixed(2));
      glowEl.setAttribute("cy", (64 + by0).toFixed(2));
      glowEl.setAttribute("rx", (110 * gl * fl).toFixed(2));
      glowEl.setAttribute("ry", (100 * gl * fl).toFixed(2));
    }
    // ground shadow follows the body
    const bx = face.get("body.x") || 0,
      by = face.get("body.y") || 0;
    const lift = Math.max(0, -by);
    const k = 1 / (1 + lift / 55);
    shadow.setAttribute("cx", (60 + bx).toFixed(2));
    shadow.setAttribute("rx", (54 * k * (face.get("body.sx") || 1)).toFixed(2));
    shadow.setAttribute("ry", (4.6 * k).toFixed(2));
    shadow.setAttribute("opacity", (0.9 * k).toFixed(3));
  }

  // ------------------------------------------------------------------ particles with a budget
  const alive: number[] = [];
  let lastRMEmit = -9;
  const LIFE: Record<string, number> = { heart: 1.9, z: 2.6, sparkle: 0.9, star: 2.2, steam: 1.2, puff: 1.1, tear: 1.1, note: 1.8, dot: 1 };
  function emit(kind: string, o?: EmitOptions, force?: boolean) {
    o = o || {};
    for (let i = alive.length - 1; i >= 0; i--) if (alive[i] <= rt) alive.splice(i, 1);
    const n = o.count || 1;
    if (!force && alive.length + n > 7) return false;
    if (RM && !force) {
      if (rt - lastRMEmit < 0.5) return false;
      lastRMEmit = rt;
    }
    face.emit(kind, o);
    const life = o.life || LIFE[kind] || 2;
    for (let i = 0; i < n; i++) alive.push(rt + life * 1.15);
    return true;
  }

  // ------------------------------------------------------------------ layers
  const Lp = face.layer("posture", { priority: 5 });
  const Ls = face.layer("sig", { priority: 10 });
  const Lsp = face.layer("sigp", { priority: 10, post: true });
  const La = face.layer("act", { priority: 20 });
  const Lap = face.layer("actp", { priority: 20, post: true });
  const Lr = face.layer("react", { priority: 30 });
  const Lrp = face.layer("reactp", { priority: 30, post: true });
  const Lmood = face.layer("mood", { priority: 32 });
  const Lsys = face.layer("sys", { priority: 35 });
  const Ltalk = face.layer("talk", { priority: 40 });
  const Ldrag = face.layer("drag", { priority: 60 });
  for (const L of [Ls, Lsp, La, Lap, Lr, Lrp, Lmood, Lsys]) {
    const a = L.add;
    (L as any).add = (o: any, w?: number) => a(scaleBody(o), w);
  }
  const Ldragp = face.layer("dragp", { priority: 60, post: true });
  // weather reactions play on the features only (see weatherFx)
  const Lwx = face.layer("weather", { priority: 31 });
  {
    const a = Lwx.add;
    (Lwx as any).add = (o: any, w?: number) => a(scaleBody(o), w);
  }

  const POSTURE: Record<string, Record<string, number>> = {
    Happy: { "body.sy": 0.02 },
    Grinning: { "body.sy": 0.02 },
    Grateful: { "body.y": 0.5 },
    DeadAss: { "body.sy": -0.02 },
    Devious: { "eyeL.ang": 8, "eyeR.ang": 8, "body.L": -0.035 },
    Alert: { "body.sy": 0.04, "eyeL.s": 0.1, "eyeR.s": 0.1 },
    Scared: { "body.sy": -0.05, "body.y": 2, "eyeL.s": -0.12, "eyeR.s": -0.12 },
    Angry: { "body.sy": 0.04, "eyeL.ang": 12, "eyeR.ang": 12 },
    Hurt: { "body.sy": -0.03, "body.rot": -4 },
    Sad: { "body.sy": -0.03, "body.y": 1.5, "eyeL.y": 2.5, "eyeR.y": 2.5, "eyeL.top": 0.16, "eyeR.top": 0.16, "eyeL.ang": -12, "eyeR.ang": -12 },
    NoInternet: { "body.rot": 3 },
    Pleading: { "body.rot": -5, "eyeL.shine": 1, "eyeR.shine": 1 },
    Focusing: { "eyeL.ang": -6, "eyeR.ang": -6 },
    Sleeping: { "body.sy": -0.03, "body.y": 1 },
    Initializing: { "body.A": -0.4 * BLUE_LAB[1], "body.B": -0.4 * BLUE_LAB[2] },
  };
  const EYE_TYPE: Record<string, string> = { Loving: "heart", Dead: "cross", Hurt: "cross", Initializing: "none", Angry: "half", Sleeping: "half", WTF: "half", Devious: "half", Smiling: "low", Grateful: "low", DeadAss: "wink", Winking: "wink", WinkingSmile: "wink", Pleading: "big" };
  const eyeType = (id: string) => EYE_TYPE[id] || "circle";
  function setColorSpring(dur: number) {
    const w = 4 / dur;
    face.spring("color", { k: w * w, c: 2 * w });
  }
  const MOUTH = (o: Record<string, number>) => {
    const r: Record<string, number> = {};
    for (const k in o) r["mouth." + k] = o[k];
    return r;
  };
  const O_MOUTH = (r: number, y: number) => MOUTH({ tY: y, tR: r, tA: r, tH: -r, tD: 0, bY: y, bR: r, bA: r, bH: r, bD: 0, tongue: 0, s: 1, rot: 0 });
  const LINE_MOUTH = (y: number, w: number) => MOUTH({ tY: y - 3, tR: w, tA: w, tH: 0, tD: 0, bY: y + 3, bR: w, bA: w, bH: 0, bD: 0, tongue: 0 });

  // ------------------------------------------------------------------ expression controller
  const ctl: any = { system: null, acute: null, flavor: null, auto: "Normal", autoAt: -99, flavorCool: 0, lastFlavor: null, miss: false, source: "auto" };
  let auto = opts.autonomous;
  let shown = "Normal",
    shownAt = 0,
    sig: any = {};
  function setAcute(id: string, dur: number, extra?: any) {
    ctl.acute = Object.assign({ id, until: rt + dur }, extra || {});
  }
  function desired(): string {
    if (ctl.system) {
      ctl.source = ctl.system.tag;
      return ctl.system.id;
    }
    if (ctl.acute && rt < ctl.acute.until) {
      ctl.source = "react";
      return ctl.acute.id;
    }
    ctl.acute = null;
    ctl.source = "mood";
    if (M.asleep) return "Sleeping";
    if (ctl.flavor && at < ctl.flavor.until) return ctl.flavor.id;
    ctl.flavor = null;
    if (ctl.miss) return "Sad";
    return ctl.auto;
  }
  function show(id: string, o?: any) {
    o = o || {};
    const prev = shown;
    if (prev === id) return;
    const dur = id === "Sleeping" ? 1.5 : id === "Sad" || prev === "Sad" ? 0.6 : id === "Angry" || id === "Hurt" || id === "Scared" ? 0.12 : prev === "Sleeping" ? 0.8 : 0.3;
    setColorSpring(dur);
    if (eyeType(prev) !== eyeType(id) && !o.noBlink) face.blink({ close: 80, hold: 70, open: 140 });
    face.setExpression(id, { spring: o.spring });
    if (prev === "Loading") {
      face.setState("dot.s", 0, 0);
      face.layer("dotOff", { priority: 98 }).set({ "dot.s": 0 }).ttl(250);
    }
    shown = id;
    shownAt = rt;
    sig = {};
    Lp.clear();
    if (POSTURE[id]) Lp.add(POSTURE[id]);
    enterSpecial(id, prev, o);
    host.onExpression?.(id);
  }
  function enterSpecial(id: string, prev: string, o: any) {
    if (prev === "Sleeping" && id !== "Sleeping" && !o.quiet) {
      if (o.startle) {
        face.impulse({ y: -200 * RMK, sy: 3 });
        popBang();
        face.blink({ double: true });
      }
    }
    if (id === "Angry") {
      face.impulse({ sy: 2.4 * RMK, sx: 1.2 * RMK });
      face.layer("flush", { priority: 33 }).set({ "body.L": -0.06 }).weight(1).weight(0, 420);
      emit("puff", { count: 2, x: 60, y: 6 });
    }
    if (id === "Sad") face.impulse({ sy: -1.6 * RMK, y: 30 * RMK });
    if ((id === "Happy" || id === "Grinning" || id === "Loving") && !o.noHop) hop(0.9);
    if (id === "Loving") emit("heart", { count: 3, x: 60, y: 2, spread: 60 });
    if (id === "Dead") face.impulse({ sy: -3.5 * RMK, rot: 60 * RMK });
    if (id === "Alert") {
      face.impulse({ y: -110 * RMK, sy: 1.8 * RMK });
      popBang();
    }
    if (id === "Winking" || id === "WinkingSmile") emit("sparkle", { x: 104, y: 56, life: 0.5, color: face.bodyColor });
  }
  const Lhop = face.layer("hop", { priority: 55, post: true });
  const hopS = { on: false, t0: 0, H: 6 };
  function hop(k?: number) {
    k = (k || 1) * RMK;
    if (hopS.on && rt - hopS.t0 < 0.5) return; // already in the air
    Object.assign(hopS, { on: true, t0: rt, H: 6 * k + 1.5 });
  }
  function hopUpdate() {
    Lhop.clear();
    if (!hopS.on) return;
    const t = rt - hopS.t0,
      A = 0.12,
      Tt = 0.17 + 0.03 * hopS.H,
      Ld = 0.18;
    let y = 0,
      sy = 0;
    if (t < A) sy = -0.06 * smooth(t / A); // crouch (anticipation)
    else if (t < A + Tt) {
      const u = (t - A) / Tt;
      y = -hopS.H * 4 * u * (1 - u);
      sy = u < 0.5 ? 0.06 * (1 - u * 2) : 0.03 * (u - 0.5) * 2;
    } else if (t < A + Tt + Ld) {
      const u = (t - A - Tt) / Ld;
      sy = -0.07 * Math.sin(Math.PI * Math.min(1, u * 1.6)) * (1 - u);
    } else {
      hopS.on = false;
      face.impulse({ sy: 1.2 });
      return;
    }
    Lhop.add({ "body.y": y, "body.sy": sy * RMK, "body.sx": -sy * 0.5 * RMK });
  }
  let lastAutoEval = -9;
  function autoPick() {
    const cur = ctl.auto,
      h = (id: string) => (cur === id ? 0.08 : 0);
    if (M.I > 0.75 - h("Angry")) return "Angry";
    if (M.I > 0.45 - h("WTF") - h("DeadAss")) return M.E < 0.4 ? "DeadAss" : "WTF";
    if (M.A > 0.85 - h("Scared") && M.V < -0.2 + h("Scared")) return "Scared";
    if (M.V > 0.7 - h("Loving") && M.F > 0.6 - h("Loving")) return "Loving";
    if (M.V > 0.6 - h("Grinning") - h("Happy") && M.A > 0.6 - h("Grinning") - h("Happy")) return cur === "Happy" || cur === "Grinning" ? cur : Math.random() < 0.5 ? "Grinning" : "Happy";
    if (M.V > 0.4 - h("Happy") - h("Smiling")) return M.A > 0.45 ? "Happy" : "Smiling";
    if (M.V < -0.4 + h("Sad")) return "Sad";
    if (M.V < -0.15 + h("Problem") && M.C > 0.5 - h("Problem")) return "Problem";
    return "Normal";
  }
  function autoUpdate() {
    if (at - lastAutoEval < 0.7) return;
    lastAutoEval = at;
    const next = autoPick();
    if (next !== ctl.auto && at - ctl.autoAt >= 2.5) {
      ctl.auto = next;
      ctl.autoAt = at;
    }
    if (auto && !ctl.flavor && at > ctl.flavorCool && (ctl.auto === "Normal" || ctl.auto === "Smiling" || ctl.auto === "Happy") && M.V > 0.3 && !M.asleep && Math.random() < 0.12) {
      const opts2 = ["Cheeky", "Silly", "UwU", "WinkingSmile"].concat(M.I > 0.1 ? ["Devious"] : []).filter((x) => x !== ctl.lastFlavor);
      const f = pick(opts2);
      ctl.flavor = { id: f, until: at + rand(4, 7) };
      ctl.lastFlavor = f;
      ctl.flavorCool = ctl.flavor.until + 8;
    }
  }

  // ------------------------------------------------------------------ pointer / gaze state
  const P: any = { inside: false, type: "mouse", cx: 0, cy: 0, wx: 60, wy: 60, vx: 0, vy: 0, speed: 0, samples: [], press: null, lastMove: -9, leftAt: null, hoverHouse: false, lean: 1 };
  let lastInput = 0; // app time of the last viewer input
  function inputSeen(kind?: string | null) {
    if (doze.forced && !kind) return;
    lastInput = at;
    if (doze.on) endDoze();
    if (R.name === "fallAsleep" && (kind || !doze.forced)) {
      react(null);
      wake(kind === "sudden" ? "startle" : "gentle");
      return;
    }
    if (M.asleep && kind) wake(kind === "sudden" ? "startle" : "gentle");
  }
  function inHouse(hx: number, hy: number, m?: number) {
    m = m || 0;
    if (hx < -m || hx > 120 + m || hy > 116.88 + m || hy < -m) return false;
    if (hy >= 52) return true;
    const yr = Math.abs(hx - 60) - 2; // roof line y ≈ |x-60| - 2 (45° slopes)
    return hy >= yr - m * 1.4;
  }
  function hitInfo(wx: number, wy: number, margin?: number) {
    const [hx, hy] = face.worldToHouse(wx, wy);
    const hit = inHouse(hx, hy, margin || 0);
    let region: string | null = null;
    if (hit) {
      if (Math.hypot(hx - 33, hy - 65.88) < 9.5 || Math.hypot(hx - 87, hy - 65.88) < 9.5) region = "eye";
      else region = hy < 52 ? "roof" : "face";
    }
    return { hit, hx, hy, region };
  }
  function reversals(windowSec: number, minSpeed: number, axis?: string) {
    const s = P.samples,
      t0 = rt - windowSec;
    let n = 0,
      last = 0;
    for (let i = 1; i < s.length; i++) {
      if (s[i].t < t0) continue;
      const d = axis === "y" ? s[i].y - s[i - 1].y : s[i].x - s[i - 1].x;
      const dt = Math.max(1e-3, s[i].t - s[i - 1].t);
      if (Math.abs(d) < 2 || Math.abs(d) / dt < minSpeed) continue;
      const sg = Math.sign(d);
      if (last && sg !== last) n++;
      last = sg;
    }
    return n;
  }
  function pathLen(windowSec: number) {
    const s = P.samples,
      t0 = rt - windowSec;
    let Ln = 0;
    for (let i = 1; i < s.length; i++) if (s[i].t >= t0) Ln += Math.hypot(s[i].x - s[i - 1].x, s[i].y - s[i - 1].y);
    return Ln;
  }

  // ------------------------------------------------------------------ reactions (acute)
  const R: any = { name: null, t0: 0, dur: 0, run: null, end: null, st: {} };
  function react(name: string | null, dur?: number, run?: (t: number, u: number, st: any, dt: number) => void, end?: (st: any, cut: boolean) => void) {
    if (R.end && R.name) {
      try {
        R.end(R.st, true);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
      }
    }
    Lr.clear();
    Lrp.clear();
    if (!name) {
      Object.assign(R, { name: null, run: null, end: null, st: {} });
      return;
    }
    Object.assign(R, { name, t0: rt, dur, run, end, st: {} });
  }
  function reactUpdate(dt: number) {
    Lr.clear();
    Lrp.clear();
    if (!R.name) return;
    const t = rt - R.t0;
    if (t >= R.dur) {
      const e = R.end,
        st = R.st;
      R.name = null;
      R.run = null;
      R.end = null;
      if (e) e(st, false);
      return;
    }
    if (R.run) R.run(t, t / R.dur, R.st, dt);
  }
  const report = (kind: InteractKind, intensity: number) => {
    try {
      host.onInteract(kind, clamp01(intensity));
    } catch {
      /* the panel handles errors */
    }
  };
  const pokes: number[] = [];
  function poke(info?: any) {
    inputSeen("sudden");
    const side = info && info.hx != null ? (info.hx < 60 ? 1 : -1) : Math.random() < 0.5 ? 1 : -1;
    face.impulse({ rot: side * 150 * RMK, sy: -2.8 * RMK, sx: 1.4 * RMK });
    face.squash(0.08 * RMK, 90);
    face.blink({ close: 50, hold: 60, open: 120 });
    mem.pokesTotal++;
    for (let i = pokes.length - 1; i >= 0; i--) if (rt - pokes[i] > 4) pokes.splice(i, 1);
    const spaced = !pokes.length || rt - pokes[pokes.length - 1] > 1.5;
    pokes.push(rt);
    nudge(spaced ? { V: 0.03, A: 0.2, I: 0.08, C: 0.1 } : { V: -0.05, A: 0.15, I: 0.18 });
    report("poke", info && info.region === "eye" ? 0.5 : spaced ? 0.25 : 0.35);
    if (info && info.region === "eye") {
      nudge({ I: 0.1 });
      setAcute("Hurt", 0.7);
      say(T("ouch"), { short: true });
      return;
    }
    if (info && info.region === "roof") emit("star", { x: info.hx, y: info.hy - 8, life: 0.7, s0: 0.6, s1: 0.2, vy: -20 }, true);
    const n = pokes.length;
    if (n === 1) setAcute("Alert", 0.9);
    else if (n === 2) setAcute(Math.random() < 0.5 ? "Cheeky" : "Silly", 1.5);
    else if (n <= 4) {
      setAcute("WTF", 1.5);
      if (n === 4) say(T("hey"), { short: true });
    } else if (n <= 7) {
      setAcute("Angry", 2.5);
      if (n === 5) say(T("stop"), { short: true });
      emit("puff", { count: 2, x: 60, y: 4 });
    } else sulk();
  }
  function sulk() {
    setAcute("WTF", 3.4);
    say(T("hmph"), { short: true });
    react(
      "sulk",
      3.4,
      (t) => {
        const k = smooth(t / 0.4) * (1 - smooth((t - 2.9) / 0.5));
        Lr.add({ "body.rot": -8 * k, "eyeL.top": 0.5 * k, "eyeR.top": 0.5 * k, "face.x": -4 * k });
        if (t > 2.6 && t < 3.1) Lr.add({ "eyeR.top": -0.4 }); // peeks back
      },
      () => {
        pokes.length = 0;
      }
    );
  }
  function doubleTap() {
    inputSeen("sudden");
    pokes.pop();
    report("poke", 0.1);
    if (Math.random() < 0.7) {
      setAcute("Winking", 1.1);
      after(0.15, () => face.wink("R"));
    } else setAcute("Devious", 1.1);
  }
  // hug (long press)
  let hug: { t0: number } | null = null;
  function hugStart() {
    inputSeen("gentle");
    hug = { t0: rt };
    setAcute("Smiling", 30);
    want.blush = 1;
  }
  function hugUpdate() {
    if (!hug) return;
    const k = smooth((rt - hug.t0) / 1);
    Lr.add({ "body.sy": -0.12 * k * RMK, "body.sx": 0.06 * k * RMK });
    nudge({ V: 0.002, F: 0.0007, I: -0.002 });
  }
  function hugEnd() {
    if (!hug) return;
    const held = rt - hug.t0;
    hug = null;
    want.blush = 0;
    face.impulse({ sy: 3.2 * RMK });
    nudge({ V: 0.15, F: 0.04, I: -0.1 });
    report("hug", clamp(held / 3, 0.3, 1));
    if (M.F > 0.4) {
      setAcute("Loving", 2);
      emit("heart", { count: 3, x: 60, y: 0, spread: 70 });
    } else if (M.F < 0.2) setAcute("Sweating", 1.5);
    else setAcute("Happy", 1.4);
    if (held > 2) say(pick(T("hugLines")), { short: true });
  }
  // petting
  const pet = { on: false, t0: 0, last: -9, px: 0, total: 0, heartAt: 0, reportAt: 0 };
  function petTouch(wx: number) {
    if (!pet.on) {
      pet.on = true;
      pet.t0 = rt;
      pet.heartAt = rt + 1.5;
      pet.reportAt = rt + 0.5;
      inputSeen("gentle");
    }
    pet.last = rt;
    pet.px = wx;
  }
  function petUpdate(dt: number) {
    if (!pet.on) return;
    if (rt - pet.last > 1) {
      // stopped
      pet.on = false;
      want.blush = 0;
      if (M.F > 0.5 && rt - pet.t0 > 1.5) {
        setAcute("Pleading", 0.8);
        say(T("more"), { short: true });
        after(0.8, () => setAcute("Happy", 1.2));
      }
      return;
    }
    const t = rt - pet.t0;
    pet.total += dt;
    mem.petsSeconds += dt;
    nudge({ V: 0.12 * dt, A: -0.05 * dt, F: 0.05 * dt, I: -0.15 * dt });
    if (rt >= pet.reportAt) {
      pet.reportAt = rt + 0.5;
      report("pet", 0.15);
    }
    want.blush = clamp01(t / 0.8);
    const k = smooth(t / 0.5);
    const lean = clamp((pet.px - (60 + (face.get("body.x") || 0))) / 40, -1, 1) * 5;
    Lr.add({ "eyeL.bot": 0.5 * k, "eyeR.bot": 0.5 * k, "eyeL.y": 4 * k, "eyeR.y": 4 * k, "body.rot": lean });
    if (!RM) Lrp.add({ "body.x": 0.25 * Math.sin(rt * 2 * Math.PI * 24), "body.sy": 0.012 * Math.sin(rt * 2.4) });
    setAcute(t > 4 ? "Loving" : "Smiling", 1.2);
    if (t > 1.5 && rt >= pet.heartAt) {
      emit("heart", { x: rand(30, 90), y: -2, count: 1 });
      pet.heartAt = rt + 0.8;
    }
  }
  // tickle
  const tickle = { on: false, t0: 0, last: -9, px: 60, over: false, refract: 0, reportAt: 0 };
  function tickleTouch(wx: number) {
    if (rt < tickle.refract) return;
    if (!tickle.on) {
      tickle.on = true;
      tickle.t0 = rt;
      tickle.over = false;
      tickle.reportAt = rt + 0.5;
      inputSeen("sudden");
    }
    tickle.last = rt;
    tickle.px = wx;
  }
  function tickleUpdate(dt: number) {
    if (!tickle.on) return;
    if (rt - tickle.last > 0.6) {
      tickle.on = false;
      if (!tickle.over) setAcute("Happy", 1.2);
      return;
    }
    const t = rt - tickle.t0;
    nudge({ V: 0.15 * dt, A: 0.2 * dt, E: -0.03 * dt, F: 0.01 * dt, I: -0.05 * dt });
    if (rt >= tickle.reportAt) {
      tickle.reportAt = rt + 0.5;
      report("tickle", 0.2);
    }
    if (t > 6 && !tickle.over) {
      tickle.over = true;
      tickle.on = false;
      tickle.refract = rt + 4;
      report("tickle", 0.6);
      setAcute("Dead", 2.6);
      say(T("tooMuch"), { short: true });
      after(2.6, () => setAcute("Happy", 1.4));
      return;
    }
    setAcute("Grinning", 0.8);
    const away = clamp((60 + (face.get("body.x") || 0) - tickle.px) / 30, -1, 1) * 6;
    Lr.add({ "eyeL.bot": 0.45, "eyeR.bot": 0.45, "eyeL.y": 3, "eyeR.y": 3, "body.rot": away });
    if (!RM) Lrp.add({ "body.y": 1.2 * Math.sin(rt * 2 * Math.PI * 8), "body.rot": 1.2 * Math.sin(rt * 2 * Math.PI * 6.5) });
    want.blush = 1;
    if (t > 3 && Math.random() < dt * 1.2) emit("tear", { x: pick([22, 98]), y: 70, count: 1 });
  }
  // shy (pointer very close and slow)
  const shy: any = { since: null, on: false, t0: 0, until: 0, cool: 0, id: null };
  function shyBlocked() {
    return (
      !P.inside || P.press || !P.hoverHouse || P.type !== "mouse" || pet.on || tickle.on || hug || drag.on || airborne() ||
      R.name || (ctl.acute && ctl.acute.tag !== "shy") || ctl.system || M.I > 0.3 || M.asleep || shown === "Angry" || shown === "Sleeping"
    );
  }
  function shyUpdate() {
    if (shy.on) {
      if (rt > shy.until || shyBlocked() || P.speed > 400) {
        shy.on = false;
        shy.cool = rt + 14;
        if (ctl.acute && ctl.acute.tag === "shy") ctl.acute = null;
        return;
      }
      const t = rt - shy.t0;
      want.blush = 1;
      Lmood.add({ "eyeL.bot": 0.35, "eyeR.bot": 0.35, "eyeL.y": 2.5, "eyeR.y": 2.5, "body.rot": t < 0.6 ? -2 : 1 });
      return;
    }
    if (shyBlocked() || P.speed > 150 || rt < shy.cool) {
      shy.since = null;
      return;
    }
    if (shy.since == null) shy.since = rt;
    if (rt - shy.since > 0.8) {
      shy.on = true;
      shy.t0 = rt;
      shy.until = rt + 2.6;
      shy.since = null;
      shy.id = M.F > 0.6 ? "Loving" : M.F < 0.3 ? "Sweating" : "Smiling";
      setAcute(shy.id, 2.6, { tag: "shy" });
      inputSeen("gentle");
    }
  }
  // drag & throw
  const drag: any = { on: false, bx0: 0, by0: 0, wx0: 0, wy0: 0, vx: 0, vy: 0, revs: [], shaken: false, lastDir: 0, t0: 0, tx: null, ty: null };
  const fly: any = { on: false, x: 0, y: 0, vx: 0, vy: 0, rot: 0, vr: 0, impacts: 0, hard: 0, shaken: false, settleT: 0 };
  const SIL = [[0, 116.88], [0, 64], [5.3, 51.6], [54.7, 2.2], [60, 0], [65.3, 2.2], [114.7, 51.6], [120, 64], [120, 116.88]];
  function houseBox(bx: number, by: number, rot: number, sx: number, sy: number, skew: number) {
    const a = (rot * Math.PI) / 180,
      c = Math.cos(a),
      sn = Math.sin(a),
      tk = Math.tan(((skew || 0) * Math.PI) / 180);
    let x0 = Infinity,
      x1 = -Infinity,
      y0 = Infinity,
      y1 = -Infinity;
    for (const [hx, hy] of SIL) {
      let x = (hx - 60) * sx;
      const y = (hy - 116.88) * sy;
      x += y * tk;
      const wx = 60 + bx + x * c - y * sn,
        wy = 116.88 + by + x * sn + y * c;
      if (wx < x0) x0 = wx;
      if (wx > x1) x1 = wx;
      if (wy < y0) y0 = wy;
      if (wy > y1) y1 = wy;
    }
    return { x0, x1, y0, y1 };
  }
  function roomBox() {
    return { L: view.x0 + 4, R: view.x0 + view.w - 4, T: view.y0 + 5, F: 116.88 };
  }
  // shift (dx, dy) that brings a silhouette box inside the room
  function fitShift(b: { x0: number; x1: number; y0: number; y1: number }): [number, number] {
    const r = roomBox();
    let dx = 0,
      dy = 0;
    if (b.x0 < r.L) dx = r.L - b.x0;
    else if (b.x1 > r.R) dx = r.R - b.x1;
    if (b.y0 < r.T) dy = r.T - b.y0;
    else if (b.y1 > r.F) dy = r.F - b.y1;
    return [dx, dy];
  }
  const cur = (k: string, d: number) => {
    const v = face.get(k);
    return v == null ? d : v;
  };
  const Lclampp = face.layer("clampp", { priority: 99, post: true });
  let clampCorr: [number, number] = [0, 0];
  function safetyClamp() {
    const bx = cur("body.x", 0) - clampCorr[0],
      by = cur("body.y", 0) - clampCorr[1];
    const [dx, dy] = fitShift(houseBox(bx, by, cur("body.rot", 0), cur("body.sx", 1), cur("body.sy", 1), cur("body.skew", 0)));
    clampCorr = [dx, dy];
    Lclampp.clear();
    if (dx || dy) Lclampp.add({ "body.x": clampCorr[0], "body.y": clampCorr[1] });
  }
  function dragStart(wx: number, wy: number) {
    inputSeen("sudden");
    fly.on = false;
    if (phys.live) physGive();
    Object.assign(drag, { on: true, bx0: face.get("body.x") || 0, by0: face.get("body.y") || 0, wx0: wx, wy0: wy, vx: 0, vy: 0, revs: [], shaken: false, lastDir: 0, t0: rt, tx: null, ty: null });
    face.spring("body.x", { k: 260, c: 22 });
    face.spring("body.y", { k: 260, c: 22 });
    stage.classList.add("grabbing");
    setAcute("Alert", 99);
    nudge({ A: 0.2, C: 0.1 });
  }
  function dragMove(wx: number, wy: number, vxPx: number, vyPx: number) {
    let tx = drag.bx0 + (wx - drag.wx0),
      ty = Math.min(0, drag.by0 + (wy - drag.wy0));
    const rot = clamp(vxPx / 80, -15, 15) * RMK,
      sy = 1 + clamp(Math.abs(vyPx) / 2000, 0, 0.12) * RMK;
    const [fx, fy] = fitShift(houseBox(tx, ty, rot, 1, sy, 0));
    tx += fx;
    ty += fy;
    drag.tx = tx;
    drag.ty = ty;
    drag.vx = vxPx;
    drag.vy = vyPx;
    const sp = Math.hypot(vxPx, vyPx);
    const dir = Math.sign(vxPx);
    if (Math.abs(vxPx) > 900 && dir && dir !== drag.lastDir) {
      if (drag.lastDir) drag.revs.push(rt);
      drag.lastDir = dir;
    }
    while (drag.revs.length && rt - drag.revs[0] > 0.9) drag.revs.shift();
    if (drag.revs.length >= 4) drag.shaken = true;
    if (drag.shaken) setAcute("Dead", 99);
    else if (sp > 1800) setAcute("Scared", 99);
    else if (sp > 300 && M.V > 0.3) setAcute("Grinning", 99);
    else if (rt - drag.t0 > 0.4) setAcute("Alert", 99);
    if (sp > 1800) nudge({ A: 0.01 });
  }
  function dragUpdate() {
    if (!drag.on) return;
    Ldrag.set({ "body.x": drag.tx != null ? drag.tx : drag.bx0, "body.y": drag.ty != null ? drag.ty : drag.by0, "body.rot": clamp(drag.vx / 80, -15, 15) });
    Ldragp.add({ "body.sy": clamp(Math.abs(drag.vy) / 2000, 0, 0.12) * RMK, "body.sx": -clamp(Math.abs(drag.vy) / 4000, 0, 0.06) * RMK });
    const mx = clamp(drag.vx / 500, -1, 1),
      my = clamp(drag.vy / 500, -1, 1);
    face.lookAt(60 + (face.get("body.x") || 0) + mx * 80, 66 + (face.get("body.y") || 0) + my * 80);
  }
  function dragEnd() {
    if (!drag.on) return;
    drag.on = false;
    stage.classList.remove("grabbing");
    const s = view.s;
    const vx = clamp(drag.vx, -3000, 3000) / s,
      vy = clamp(drag.vy, -3000, 3000) / s;
    const shaken = drag.shaken;
    if (shaken) {
      nudge({ V: -0.25, A: 0.4, E: -0.05, F: -0.05, I: 0.35 });
      report("shake", 0.8);
    }
    if (phys.live) {
      // with an accelerometer he is let go in the room, and falls where things fall now
      physTake(vx, vy, vx * 0.006);
      Object.assign(phys, { shaken, lively: true, thrownAt: rt });
      if (!shaken && Math.hypot(vx, vy) > 60 / s) {
        nudge({ V: 0.05, A: 0.3, E: -0.02, C: 0.1 });
        report("throw", clamp(Math.hypot(drag.vx, drag.vy) / 3000, 0.2, 1));
      }
      setAcute(shaken ? "Dead" : "Alert", shaken ? 99 : 0.3);
      return;
    }
    if (RM || Math.hypot(vx, vy) < 60 / s) {
      Ldrag.clear();
      goHome();
      if (shaken) dizzy(rand(2.5, 4));
      else setAcute(M.V > 0.3 ? "Happy" : "Normal", 0.8);
      return;
    }
    Ldrag.clear();
    Object.assign(fly, { on: true, x: face.get("body.x") || 0, y: face.get("body.y") || 0, vx, vy, rot: face.get("body.rot") || 0, vr: vx * 0.9, impacts: 0, hard: 0, shaken, settleT: 0 });
    nudge({ V: 0.05, A: 0.3, E: -0.02, C: 0.1 });
    if (!shaken) report("throw", clamp(Math.hypot(drag.vx, drag.vy) / 3000, 0.2, 1));
    setAcute(Math.hypot(drag.vx, drag.vy) > 1800 ? "Scared" : M.V > 0.3 ? "Grinning" : "Alert", 99);
  }
  function flyUpdate(dt: number) {
    if (!fly.on) return;
    const s = view.s,
      g = 2600 / s,
      r = roomBox();
    fly.vy += g * dt;
    fly.x += fly.vx * dt;
    fly.y += fly.vy * dt;
    fly.vr *= Math.exp(-dt * 1.2);
    fly.rot += fly.vr * dt;
    fly.rot = clamp(fly.rot, -25 * RMK, 25 * RMK);
    const bx = houseBox(fly.x, fly.y, fly.rot, cur("body.sx", 1), cur("body.sy", 1), 0);
    const impact = (v: number) => {
      const vpx = Math.abs(v) * s;
      if (vpx > 300) {
        fly.impacts++;
        face.impulse({ sy: -Math.min(vpx / 4000, 0.14) * 30 * RMK, sx: Math.min(vpx / 4000, 0.14) * 15 * RMK });
        if (vpx > 1400) {
          fly.hard++;
          if (fly.hard >= 2) {
            setAcute("Hurt", 1);
            nudge({ V: -0.25, A: 0.4, I: 0.35 });
            if (fly.hard === 2) report("shake", 0.5);
            want.bandage = 1;
            after(4, () => {
              want.bandage = 0;
            });
          }
        } else if (vpx > 700) setAcute("Alert", 0.6);
      }
    };
    // walls, ceiling and floor against the whole rotated, stretched silhouette
    if (bx.x0 < r.L) {
      fly.x += r.L - bx.x0;
      if (fly.vx < 0) {
        impact(fly.vx);
        fly.vx = -fly.vx * 0.45;
        fly.vr = -fly.vr * 0.6;
      }
    }
    if (bx.x1 > r.R) {
      fly.x -= bx.x1 - r.R;
      if (fly.vx > 0) {
        impact(fly.vx);
        fly.vx = -fly.vx * 0.45;
        fly.vr = -fly.vr * 0.6;
      }
    }
    if (bx.y0 < r.T) {
      fly.y += r.T - bx.y0;
      if (fly.vy < 0) {
        impact(fly.vy);
        fly.vy = -fly.vy * 0.45;
      }
    }
    let onFloor = false;
    if (bx.y1 > r.F) {
      fly.y -= bx.y1 - r.F;
      onFloor = true;
      if (fly.vy > 0) {
        impact(fly.vy);
        fly.vy = -fly.vy * 0.45;
        fly.vx *= 0.85;
        fly.vr *= 0.6;
        if (Math.abs(fly.vy) * s < 160) fly.vy = 0;
      }
      fly.rot *= 0.82; // the floor rights him up
    }
    fly.y = Math.min(0, fly.y);
    if (onFloor && Math.abs(fly.vy) < 1) fly.settleT += dt;
    face.setState("body.x", fly.x, fly.vx);
    face.setState("body.y", fly.y, fly.vy);
    Ldrag.set({ "body.x": fly.x, "body.y": fly.y, "body.rot": fly.rot });
    if (fly.settleT > 0.25 && Math.abs(fly.vx) * s < 120) {
      fly.on = false;
      Ldrag.clear();
      goHome();
      if (fly.shaken) dizzy(rand(2.5, 4));
      else if (fly.hard >= 2) setAcute("Hurt", 1.2);
      else setAcute(M.V > 0.2 ? "Happy" : "Normal", 1);
    }
  }
  function goHome() {
    face.spring("body.x", { k: 60, c: 14 });
    face.spring("body.y", { k: 60, c: 14 });
    after(
      2.2,
      () => {
        face.spring("body.x", null);
        face.spring("body.y", null);
      },
      "home"
    );
    face.lookAt(null);
  }
  function dizzy(dur: number) {
    setAcute("Dead", dur);
    emit("star", { count: 3, orbit: { cx: 60, cy: -6, r: 22, ry: 0.27, speed: 4.5 }, life: dur }, true);
    react("dizzy", dur, (t, u) => {
      Lr.add({ "body.rot": 4 * Math.sin(t * 3.8), "body.x": 1.5 * Math.sin(t * 3.8 + 1.57) });
      if (t > dur - 0.5) Lr.add({ "body.rot": 8 * Math.sin(t * 44) * (1 - u) * 4 });
    });
  }

  // ------------------------------------------------------------------ device motion (phone, tablet)
  // With an accelerometer, the room is a real box and Casita a rigid body in it. What the
  // sensor feels (gravity and the moves of the phone, together) is the force on him: tilt
  // the screen and he slides, turn it and he tumbles to the wall that is now the floor,
  // jerk it and inertia throws him, lay it flat and the back of the room holds him.
  // He is alive, not a brick: like a cat, he gets back on his feet, feet toward the real
  // ground, unless he is knocked out or asleep. At rest, the simulation sleeps and the
  // usual animations go on, on top of where he landed.
  const G = 9.81;
  const GW = 1800; // 1 g, in room units/s² (the house is 120 wide)
  const mo: any = {
    t: 0, vote: 0.3, gx: 0, gy: -G, ax: 0, ay: G, az: 0,
    revs: { x: [] as number[], y: [] as number[] }, dir: { x: 0, y: 0 }, shaking: false, strongAt: -9, freeT: 0,
  };
  // Safari gives the opposite of what the specification says, on every axis
  const UA = navigator.userAgent || "";
  const IOS = /iPad|iPhone|iPod/.test(UA) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const motionSign = () => (IOS ? -1 : /Android/.test(UA) ? 1 : mo.vote >= 0 ? 1 : -1);
  function screenAngle() {
    const a = screen.orientation ? screen.orientation.angle : (window as any).orientation;
    return ((+a || 0) * Math.PI) / 180;
  }
  // device axes (x right, y up), turned with the screen, to the room (x right, y down)
  function toRoom(x: number, y: number): [number, number] {
    const a = screenAngle(),
      c = Math.cos(a),
      s = Math.sin(a),
      k = motionSign();
    return [(x * c - y * s) * k, -(x * s + y * c) * k];
  }
  let motionEvents = 0;
  function onMotion(e: DeviceMotionEvent) {
    motionEvents++;
    const ig = e.accelerationIncludingGravity;
    if (!ig || ig.x == null || ig.y == null) return;
    const now = performance.now() / 1000,
      dt = clamp(now - (mo.t || now - 0.016), 0.005, 0.1);
    mo.t = now;
    const z = ig.z || 0;
    // Unknown browser: someone who looks at the screen holds it top up or face up, so
    // the sensed "up" tells which sign convention this one uses.
    const a = screenAngle(),
      up = ig.x * Math.sin(a) + ig.y * Math.cos(a) + z;
    if (Math.abs(up) > 6) {
      const was = mo.vote >= 0;
      mo.vote = clamp(mo.vote + Math.sign(up) * dt, -1, 1);
      if (was !== mo.vote >= 0) {
        mo.gx = -mo.gx;
        mo.gy = -mo.gy;
      }
    }
    // u: the floor pushing up. What a body in the room feels is the opposite.
    const [ux, uy] = toRoom(ig.x, ig.y);
    const kf = 1 - Math.exp(-dt / 0.025);
    mo.ax += (-ux - mo.ax) * kf;
    mo.ay += (-uy - mo.ay) * kf;
    mo.az += (Math.abs(z) - mo.az) * kf;
    // gravity alone, slow, to tell the moves of the phone from its tilt
    const acc = e.acceleration,
      lin = !!acc && acc.x != null && acc.y != null;
    const [sx, sy] = lin ? toRoom(ig.x - acc!.x!, ig.y - acc!.y!) : [ux, uy];
    const kg = 1 - Math.exp(-dt / 0.2);
    mo.gx += (sx - mo.gx) * kg;
    mo.gy += (sy - mo.gy) * kg;
    const [lx, ly] = lin ? toRoom(acc!.x!, acc!.y!) : [ux - mo.gx, uy - mo.gy];
    // free fall: the sensor feels nothing
    const g3 = Math.hypot(ig.x, ig.y, z);
    mo.freeT = g3 < 2.5 ? mo.freeT + dt : 0;
    if (mo.freeT > 0.12 && !drag.on) {
      inputSeen("sudden");
      setAcute("Scared", 1.2);
      mo.freeT = -1; // once per fall
    }
    if (drag.on) return;
    // shaking: the phone keeps reversing its direction
    for (const [axis, v] of [["x", lx], ["y", ly]] as const) {
      if (Math.abs(v) < 14) continue;
      const d = Math.sign(v);
      if (d !== mo.dir[axis]) {
        if (mo.dir[axis]) mo.revs[axis].push(rt);
        mo.dir[axis] = d;
      }
      while (mo.revs[axis].length && rt - mo.revs[axis][0] > 1) mo.revs[axis].shift();
    }
    const amag = Math.hypot(lx, ly);
    if (amag > 14) mo.strongAt = rt;
    if (amag > 9) inputSeen("sudden");
    if (!mo.shaking && Math.max(mo.revs.x.length, mo.revs.y.length) >= 4) {
      mo.shaking = true;
      inputSeen("sudden");
    }
    if (mo.shaking) setAcute("Dead", 99);
  }

  // --- the body: the silhouette, around its centre of mass
  const Lphys = face.layer("phys", { priority: 57, post: true });
  const body = (() => {
    // centroid and moment of inertia of the polygon (mass 1)
    let A = 0,
      cx = 0,
      cy = 0;
    for (let i = 0; i < SIL.length; i++) {
      const [x0, y0] = SIL[i],
        [x1, y1] = SIL[(i + 1) % SIL.length],
        c = x0 * y1 - x1 * y0;
      A += c;
      cx += (x0 + x1) * c;
      cy += (y0 + y1) * c;
    }
    cx /= 3 * A;
    cy /= 3 * A;
    const pts = SIL.map(([x, y]) => [x - cx, y - cy] as [number, number]);
    let num = 0,
      den = 0;
    for (let i = 0; i < pts.length; i++) {
      const [x0, y0] = pts[i],
        [x1, y1] = pts[(i + 1) % pts.length],
        c = Math.abs(x0 * y1 - x1 * y0);
      num += c * (x0 * x0 + x0 * x1 + x1 * x1 + y0 * y0 + y0 * y1 + y1 * y1);
      den += c;
    }
    return { pts, cx, cy, hc: 116.88 - cy, I: num / (6 * den) };
  })();
  const MU = 0.3, // floor, walls, ceiling
    MU_BACK = 0.15, // back of the room, when the screen lies flat
    BOUNCE = 0.35;
  const phys: any = {
    live: false, sleep: true, x: body.cx, y: body.cy, th: 0, vx: 0, vy: 0, w: 0,
    touch: 0, airT: 0, restT: 0, levelT: 0, sa: [0, GW], box: "", err: 0, side: 0,
    hard: 0, hardAt: -9, hitAt: -9, thrownAt: -9, hopAt: -9, walking: false, lively: false, shaken: false, upT: 0,
  };
  const wrapPi = (a: number) => a - 2 * Math.PI * Math.round(a / (2 * Math.PI));
  const knocked = () => mo.shaking || shown === "Dead" || shown === "Hurt" || M.asleep || shown === "Sleeping";
  /** Thrown, falling or sliding fast: the body is busy with physics. */
  const airborne = () => fly.on || (phys.live && !phys.sleep && (phys.airT > 0.1 || Math.hypot(phys.vx, phys.vy) > 60));
  function physPose(): [number, number, number] {
    const s = Math.sin(phys.th),
      c = Math.cos(phys.th);
    // the pivot of the body is the middle of its base
    return [phys.x - s * body.hc - 60, phys.y + c * body.hc - 116.88, (phys.th * 180) / Math.PI];
  }
  /** The simulation takes the body where it is shown now, with a speed (released, sensor back). */
  function physTake(vx: number, vy: number, w: number) {
    const bx = face.get("body.x") || 0,
      by = face.get("body.y") || 0,
      th = ((face.get("body.rot") || 0) * Math.PI) / 180;
    Object.assign(phys, { th, x: 60 + bx + Math.sin(th) * body.hc, y: 116.88 + by - Math.cos(th) * body.hc, vx, vy, w, sleep: false, restT: 0, airT: 0 });
    for (const k of ["body.x", "body.y", "body.rot"]) face.setState(k, 0, 0);
    face.spring("body.x", null);
    face.spring("body.y", null);
    cancel("home");
    Ldrag.clear();
    face.lookAt(null);
  }
  /** The springs take the body back (grabbed, sensor lost). */
  function physGive() {
    // what is shown now becomes the state of the springs
    face.setState("body.x", face.get("body.x") || 0, phys.vx);
    face.setState("body.y", face.get("body.y") || 0, phys.vy);
    face.setState("body.rot", face.get("body.rot") || 0, 0);
    Object.assign(phys, { x: body.cx, y: body.cy, th: 0, vx: 0, vy: 0, w: 0, sleep: true, touch: 0, airT: 0, restT: 0 });
    Lphys.clear();
  }
  function physImpact(v: number, nx: number, ny: number) {
    const vpx = v * view.s;
    if (vpx < 260 || rt - phys.hitAt < 0.08) return;
    phys.hitAt = rt;
    // squash along the wall's normal, in the axes of the body
    const s = Math.sin(phys.th),
      c = Math.cos(phys.th),
      k = Math.min(vpx / 4000, 0.14);
    if (Math.abs(-nx * s + ny * c) > Math.abs(nx * c + ny * s)) face.impulse({ sy: -k * 30, sx: k * 15 });
    else face.impulse({ sx: -k * 22, sy: k * 12 });
    if (vpx > 1400) {
      inputSeen("sudden");
      if (rt - phys.hardAt > 6) phys.hard = 0;
      phys.hardAt = rt;
      phys.hard++;
      if (phys.hard >= 2) {
        if (!mo.shaking) setAcute("Hurt", 1.2);
        nudge({ V: -0.25, A: 0.4, I: 0.35 });
        if (phys.hard === 2) report("shake", 0.5);
        want.bandage = 1;
        after(4, () => {
          want.bandage = 0;
        });
      }
    } else if (vpx > 700 && !mo.shaking && !M.asleep) setAcute("Alert", 0.6);
  }
  const contacts: any[] = [];
  function physStep(h: number, ax: number, ay: number, back: number, muscle: number, damp: number, target: number, r: { L: number; R: number; T: number; F: number }) {
    // forces
    phys.vx += ax * h;
    phys.vy += ay * h;
    if (muscle) phys.w += (muscle * wrapPi(target - phys.th) - damp * phys.w) * h;
    const air = Math.exp(-h * 0.25);
    phys.vx *= air;
    phys.vy *= air;
    phys.w *= Math.exp(-h * 0.8);
    // the back of the room rubs: it holds him when the screen lies flat
    if (back > 0) {
      const sp = Math.hypot(phys.vx, phys.vy),
        cut = MU_BACK * back * h;
      if (sp <= cut) phys.vx = phys.vy = 0;
      else {
        phys.vx -= (phys.vx / sp) * cut;
        phys.vy -= (phys.vy / sp) * cut;
      }
      const cw = cut * 0.018;
      phys.w = Math.abs(phys.w) <= cw ? 0 : phys.w - Math.sign(phys.w) * cw;
    }
    // contacts: each corner against the four sides
    const s = Math.sin(phys.th),
      c = Math.cos(phys.th),
      SLOP = 0.4;
    contacts.length = 0;
    for (const [lx, ly] of body.pts) {
      const rx = lx * c - ly * s,
        ry = lx * s + ly * c,
        wx = phys.x + rx,
        wy = phys.y + ry;
      if (wx < r.L + SLOP) contacts.push({ rx, ry, nx: 1, ny: 0 });
      if (wx > r.R - SLOP) contacts.push({ rx, ry, nx: -1, ny: 0 });
      if (wy < r.T + SLOP) contacts.push({ rx, ry, nx: 0, ny: 1 });
      if (wy > r.F - SLOP) contacts.push({ rx, ry, nx: 0, ny: -1 });
    }
    let hit = 0,
      hnx = 0,
      hny = 0;
    for (const k of contacts) {
      const vn = (phys.vx - phys.w * k.ry) * k.nx + (phys.vy + phys.w * k.rx) * k.ny;
      k.jn = 0;
      k.jt = 0;
      k.bias = vn < -70 ? -BOUNCE * vn : 0;
      if (-vn > hit) {
        hit = -vn;
        hnx = k.nx;
        hny = k.ny;
      }
    }
    for (let it = 0; it < 10; it++) {
      for (const k of contacts) {
        // along the normal: no going through, a bounce when fast
        const rn = k.rx * k.ny - k.ry * k.nx;
        const vn = (phys.vx - phys.w * k.ry) * k.nx + (phys.vy + phys.w * k.rx) * k.ny;
        const jn = Math.max(0, k.jn + (k.bias - vn) / (1 + (rn * rn) / body.I)),
          dn = jn - k.jn;
        k.jn = jn;
        phys.vx += dn * k.nx;
        phys.vy += dn * k.ny;
        phys.w += (dn * rn) / body.I;
        // along the side: friction
        const tx = -k.ny,
          ty = k.nx,
          rtn = k.rx * ty - k.ry * tx;
        const vt = (phys.vx - phys.w * k.ry) * tx + (phys.vy + phys.w * k.rx) * ty;
        const jt = clamp(k.jt - vt / (1 + (rtn * rtn) / body.I), -MU * k.jn, MU * k.jn),
          dtn = jt - k.jt;
        k.jt = jt;
        phys.vx += dtn * tx;
        phys.vy += dtn * ty;
        phys.w += (dtn * rtn) / body.I;
      }
    }
    let touch = 0;
    for (const k of contacts) if (k.jn > 0) touch |= k.nx > 0 ? 1 : k.nx < 0 ? 2 : k.ny > 0 ? 4 : 8;
    phys.touch |= touch;
    if (hit > 0) physImpact(hit, hnx, hny);
    // move, then push back what went through
    phys.x += phys.vx * h;
    phys.y += phys.vy * h;
    phys.th += phys.w * h;
    const s2 = Math.sin(phys.th),
      c2 = Math.cos(phys.th);
    let x0 = Infinity,
      x1 = -Infinity,
      y0 = Infinity,
      y1 = -Infinity;
    for (const [lx, ly] of body.pts) {
      const wx = phys.x + lx * c2 - ly * s2,
        wy = phys.y + lx * s2 + ly * c2;
      if (wx < x0) x0 = wx;
      if (wx > x1) x1 = wx;
      if (wy < y0) y0 = wy;
      if (wy > y1) y1 = wy;
    }
    if (x0 < r.L) phys.x += r.L - x0;
    else if (x1 > r.R) phys.x -= x1 - r.R;
    if (y1 > r.F) phys.y -= y1 - r.F;
    else if (y0 < r.T) phys.y += r.T - y0;
  }
  function physUpdate(dt: number) {
    // the shake is over
    if (mo.shaking && rt - mo.strongAt > 0.6) {
      mo.shaking = false;
      mo.revs.x.length = 0;
      mo.revs.y.length = 0;
      nudge({ V: -0.25, A: 0.4, E: -0.05, F: -0.05, I: 0.35 });
      report("shake", 0.8);
      phys.shaken = false;
      dizzy(rand(2.5, 4));
    }
    const live = !RM && !!mo.t && performance.now() / 1000 - mo.t < 1;
    if (live !== phys.live) {
      phys.live = live;
      if (live) {
        if (!drag.on) {
          fly.on = false;
          physTake(0, 0, 0);
        }
      } else if (!drag.on) {
        physGive();
        goHome();
      }
    }
    if (!live) return;
    if (drag.on) {
      phys.sleep = true;
      Lphys.clear();
      return;
    }
    const K = GW / G;
    let ax = mo.ax * K,
      ay = mo.ay * K;
    const am = Math.hypot(ax, ay);
    if (am > 5 * GW) {
      ax *= (5 * GW) / am;
      ay *= (5 * GW) / am;
    }
    const back = mo.az * K;
    const r = roomBox(),
      box = [r.L, r.R, r.T, r.F].map((v) => v.toFixed(1)).join();
    // "down" for him: where things fall, or the bottom of the screen when it lies flat
    const dl = Math.hypot(mo.ax, mo.ay + 0.8) || 1,
      down = Math.atan2(-mo.ax / dl, (mo.ay + 0.8) / dl);
    // he stands on the side of the room that is the most under him, and changes his
    // mind only when another one clearly is
    if (Math.abs(wrapPi(down - phys.side)) > 0.9) phys.side = Math.round(down / (Math.PI / 2)) * (Math.PI / 2);
    const target = phys.side,
      err = wrapPi(target - phys.th);
    phys.err = wrapPi(down - phys.th);
    const out = knocked();
    const level = phys.side === 0 && Math.abs(down) < 0.21 && mo.ay > 5;
    phys.levelT = level && Math.abs(err) < 0.2 ? phys.levelT + dt : 0;
    const home = 60 - phys.x;
    const walk = !out && !conv.phase && phys.levelT > 1.5 && Math.abs(home) > 0.5 && !!(phys.touch & 8);
    if (phys.sleep) {
      // woken by a change of what he feels, by the room, or by himself
      const da = Math.hypot(ax - phys.sa[0], ay - phys.sa[1]);
      if (da > 0.1 * GW || box !== phys.box || walk || (!out && Math.abs(err) > 0.3)) {
        phys.sleep = false;
        phys.restT = 0;
        if (da > 0.1 * GW) inputSeen();
      }
    }
    if (!phys.sleep) {
      // muscles: a firm push on the ground, a softer twist in the air
      const grounded = !!phys.touch;
      let muscle = 0,
        damp = 0;
      if (!out) {
        if (grounded && (phys.upT > 0.15 || Math.abs(err) < 0.5)) {
          muscle = 70;
          damp = 14;
        } else if (!grounded) {
          muscle = 26;
          damp = 6;
        }
      }
      phys.upT = grounded && !out && Math.abs(err) > 0.5 ? phys.upT + dt : 0;
      // stuck on his side or on his roof: a hop, away from what he lies on
      if (phys.upT > 0.5 && rt - phys.hopAt > 1.2) {
        phys.hopAt = rt;
        const t = phys.touch,
          nx = (t & 1 ? 1 : 0) - (t & 2 ? 1 : 0),
          ny = (t & 4 ? 1 : 0) - (t & 8 ? 1 : 0);
        phys.vx += nx * 200 - (mo.ax / dl) * 260;
        phys.vy += ny * 200 - ((mo.ay + 0.8) / dl) * 260;
        phys.w += Math.sign(err) * 5;
      }
      const n = Math.max(1, Math.ceil(dt / (1 / 120))),
        h = dt / n;
      const was = phys.touch;
      phys.touch = 0;
      for (let i = 0; i < n; i++) {
        physStep(h, ax, ay, back, muscle, damp, target, r);
      }
      const sp = Math.hypot(phys.vx, phys.vy);
      phys.airT = phys.touch ? 0 : phys.airT + dt;
      // thrown by the phone
      if (!phys.touch && was && sp * view.s > 500 && rt - phys.thrownAt > 2) {
        phys.thrownAt = rt;
        nudge({ V: 0.03, A: 0.3, C: 0.1 });
        if (!mo.shaking) report("throw", clamp((sp * view.s) / 3000, 0.2, 1));
      }
      if (sp * view.s > 250) phys.lively = true;
      if (!out) {
        if (phys.airT > 0.12 && sp * view.s > 300) setAcute(sp * view.s > 1700 ? "Scared" : M.V > 0.3 ? "Grinning" : "Alert", 0.35);
        else if (sp > 50) setAcute(M.V > 0.45 ? "Grinning" : "Alert", 0.35);
        if (sp > 50) face.lookAt(phys.x + (phys.vx / sp) * 120, phys.y + (phys.vy / sp) * 120);
      }
      // level again: he walks back home, on his own legs
      phys.walking = walk && sp < 30;
      if (phys.walking) {
        const step = clamp(home * 2.5, -80, 80) * dt;
        phys.x = Math.abs(step) >= Math.abs(home) || Math.abs(home) < 1 ? 60 : phys.x + step;
      }
      // rest
      const still = sp < 4 && Math.abs(phys.w) < 0.06 && (out || Math.abs(err) < 0.3) && !walk;
      phys.restT = still ? phys.restT + dt : 0;
      if (phys.restT > 0.3) {
        phys.sleep = true;
        phys.vx = phys.vy = phys.w = 0;
        phys.th = wrapPi(phys.th);
        phys.sa = [ax, ay];
        phys.box = box;
        face.lookAt(null);
        if (phys.shaken) {
          phys.shaken = phys.lively = false;
          dizzy(rand(2.5, 4));
        } else if (phys.lively) {
          phys.lively = false;
          if (!out) setAcute(phys.hard >= 2 && rt - phys.hardAt < 3 ? "Hurt" : M.V > 0.2 ? "Happy" : "Normal", 1);
        }
      }
    }
    const [px, py, deg] = physPose();
    Lphys.clear();
    Lphys.add({ "body.x": px, "body.y": py, "body.rot": deg + (phys.walking ? 3 * Math.sin(rt * 14) : 0) });
    if (phys.touch && !out) {
      // on a slope he cannot follow: he leans uphill, the base planted
      const lean = clamp((-err * 180) / Math.PI * 0.3, -7, 7);
      // heavier or lighter with the moves of the phone
      const load = clamp(((-Math.sin(phys.th) * ax + Math.cos(phys.th) * ay) / GW - 1) * 0.05, -0.04, 0.08);
      Lphys.add({ "body.skew": lean, "body.sy": -load, "body.sx": load * 0.6 });
    }
  }
  // iOS asks for permission, from a gesture. WebKit only counts the end of a touch
  // (touchend, pointerup, click) as one, not pointerdown.
  const MotionPerm = (window as any).DeviceMotionEvent as { requestPermission?: () => Promise<string> } | undefined;
  const needsPerm = !!MotionPerm && typeof MotionPerm.requestPermission === "function";
  let motionPerm: "unknown" | "asking" | "granted" | "denied" | "error" = needsPerm ? "unknown" : "granted";
  function askMotion() {
    if (!needsPerm || mo.t || motionPerm === "asking" || motionPerm === "granted" || motionPerm === "denied") return;
    motionPerm = "asking";
    MotionPerm!.requestPermission!()
      .then((state) => {
        motionPerm = state === "granted" ? "granted" : "denied";
      })
      .catch(() => {
        motionPerm = "error"; // not counted as a gesture: try again on the next touch
      });
  }

  // ------------------------------------------------------------------ signature loops (life inside each state)
  function every(st: any, key: string, a: number, b: number, fn: () => void) {
    const k = "n_" + key;
    if (st[k] == null) {
      st[k] = rt + rand(a, b);
      return;
    }
    if (rt >= st[k]) {
      fn();
      st[k] = rt + rand(a, b);
    }
  }
  function burst(st: any, key: string) {
    const t0 = st[key + "T"];
    return t0 == null ? -1 : rt - t0;
  }
  const SIG: Record<string, (st: any, soft?: boolean) => void> = {
    Normal(st) {
      Ls.add({ "body.rot": 1 * Math.sin(rt * 0.75 + PH[0]), "mouth.s": 0.04 * Math.sin(rt * 1.2) });
      every(st, "sq", 8, 15, () => {
        st.sqT = rt;
      });
      const b = burst(st, "sq");
      if (b >= 0 && b < 0.6) Ls.add({ "eyeL.bot": 0.15 * env(b / 0.6), "eyeR.bot": 0.15 * env(b / 0.6) });
    },
    Smiling(st) {
      want.blush = Math.max(want.blush, 0.75);
      every(st, "sq", 4, 8, () => {
        st.sqT = rt;
      });
      const b = burst(st, "sq");
      if (b >= 0 && b < 0.15) Ls.add({ "eyeL.bot": 0.12, "eyeR.bot": 0.12 });
      Ls.add({ "body.y": -1.2 * (0.5 + 0.5 * Math.sin(rt * 2.8)), "body.rot": cursorTilt(2) });
    },
    Happy(st) {
      every(st, "hop", 2.5, 4.5, () => hop(0.7));
      every(st, "sp", 3, 6, () => emit("sparkle", { x: pick([8, 112]), y: 36, life: 0.45, spread: 0, color: face.bodyColor }));
      Ls.add({ "mouth.bH": 1.5 * Math.sin(rt * 2) });
    },
    Grinning(st) {
      every(st, "g", 3, 6, () => {
        st.gT = rt;
        st.gD = rand(0.4, 0.7);
      });
      const b = burst(st, "g");
      if (b >= 0 && b < st.gD) {
        if (!RM) Lsp.add({ "body.y": 0.8 * Math.sin(rt * 2 * Math.PI * 8) });
        Ls.add({ "eyeL.bot": 0.25, "eyeR.bot": 0.25, "mouth.tR": 1, "mouth.bR": 1, "mouth.tA": 1, "mouth.bA": 1 });
        want.blush = Math.max(want.blush, 1);
      }
    },
    Grateful(st) {
      every(st, "bow", 5, 8, () => {
        st.bowT = rt;
      });
      const b = burst(st, "bow");
      if (b >= 0 && b < 1.1) {
        const k = env(b / 1.1);
        Ls.add({ "body.sy": -0.04 * k, "body.y": 1.5 * k, "face.y": 1 * k });
      }
      every(st, "h", 4, 7, () => emit("heart", { x: 60, y: -4, life: 1.8 }));
    },
    Loving(st) {
      want.blush = Math.max(want.blush, 1);
      const period = pet.on ? 0.52 : st.per || (st.per = rand(0.7, 0.85));
      const u = (rt % period) / period;
      const beat = u < 0.13 ? 0.18 * Math.sin((u / 0.13) * Math.PI) : u > 0.29 && u < 0.42 ? 0.12 * Math.sin(((u - 0.29) / 0.13) * Math.PI) : 0;
      Lsp.add({ "eyeL.s": beat * RMK, "eyeR.s": beat * RMK });
      Ls.add({ "body.rot": 2 * Math.sin(rt * 2.5) });
      every(st, "h", 0.9, 1.6, () => emit("heart", { x: pick([6, 114]), y: 40, vx: 0, vy: -20, life: 1.6, spread: 6 }));
    },
    UwU(st) {
      want.blush = Math.max(want.blush, 1);
      every(st, "side", 4, 7, () => {
        st.side = -(st.side || 1);
      });
      Ls.add({ "body.rot": 6 * (st.side || 1) });
      every(st, "mlem", 3, 5, () => {
        st.mlemT = rt;
      });
      const b = burst(st, "mlem");
      if (b >= 0 && b < 1) Ls.add({ "mouth.rot": 5 * Math.sin(b * 2 * Math.PI * 2), "mouth.bH": 1.5 * Math.sin(b * 12.6) });
    },
    Winking(st, soft) {
      every(st, "w", 4, 7, () => {
        st.wT = rt;
        emit("sparkle", { x: 104, y: 56, life: 0.4, color: face.bodyColor });
      });
      const b = burst(st, "w");
      if (b >= 0 && b < 0.32) {
        const k = b < 0.08 ? b / 0.08 : 1 - (b - 0.08) / 0.24;
        Ls.add({ "eyeR.top": 0.5 * clamp01(k), "body.rot": 3 * clamp01(k) });
        if (soft) Ls.add({ "mouth.rot": -3 * clamp01(k) });
      }
      Ls.add({ "body.rot": soft ? 3 : 4 });
    },
    WinkingSmile(st) {
      SIG.Winking(st, true);
    },
    Cheeky(st) {
      every(st, "tilt", 2, 4, () => {
        st.tilt = -(st.tilt || 1);
      });
      Ls.add({ "body.rot": 3 * (st.tilt || 1) });
      every(st, "wig", 1.6, 3, () => {
        st.wigT = rt;
      });
      const b = burst(st, "wig");
      if (b >= 0 && b < 0.8) Ls.add({ "mouth.tgX": 2 * Math.sin(b * 2 * Math.PI * 3) });
      every(st, "blep", 6, 10, () => {
        st.blepT = rt;
      });
      const bl = burst(st, "blep");
      if (bl >= 0 && bl < 0.24) Ls.set({ "mouth.tongue": bl < 0.12 ? 0 : 1.25 });
    },
    Silly(st) {
      Ls.add({ "body.rot": 2.5 * Math.sin(rt * 6.3) });
      every(st, "swap", 5, 9, () => {
        st.swap = !st.swap;
      });
      const ph = Math.sin(rt * 7.5);
      if (st.swap) Ls.add({ "eyeL.y": -6 + 2 * ph, "eyeR.y": 6 - 2 * ph });
      else Ls.add({ "eyeR.y": 2 * ph, "eyeL.y": -2 * ph });
      every(st, "wig", 1.2, 2.4, () => {
        st.wigT = rt;
      });
      const b = burst(st, "wig");
      if (b >= 0 && b < 0.8) Ls.add({ "mouth.tgX": 2 * Math.sin(b * 2 * Math.PI * 4.5) });
    },
    DeadAss(st) {
      Ls.add({ "mouth.tgX": 1 * Math.sin(rt * 1.9) });
      every(st, "slump", 6, 10, () => {
        st.slumpT = rt;
        face.blink({ close: 150, hold: 380, open: 250 });
      });
      const b = burst(st, "slump");
      if (b >= 0 && b < 1.4) Ls.add({ "body.sy": -0.02 * env(b / 1.4) });
      every(st, "sigh", 10, 16, () => {
        st.sighT = rt;
        after(0.7, () => emit("puff", { x: 84, y: 88, vy: -6, vx: 10, life: 0.9, s0: 0.3, s1: 0.8 }));
      });
      const s = burst(st, "sigh");
      if (s >= 0 && s < 1.6) Ls.add({ "body.sy": s < 0.7 ? 0.03 * smooth(s / 0.7) : 0.03 - 0.06 * smooth((s - 0.7) / 0.9) * (1 - smooth((s - 1.2) / 0.4)) });
    },
    Devious(st) {
      every(st, "slide", 1.2, 2.2, () => {
        st.dir = st.dir === 1 ? -1 : 1;
      });
      Ls.add({ "eyeL.x": 3 * (st.dir || 1), "eyeR.x": 3 * (st.dir || 1) });
      every(st, "heh", 4, 7, () => {
        st.hehT = rt;
      });
      const b = burst(st, "heh");
      if (b >= 0 && b < 0.9) {
        Ls.add({ "mouth.s": 0.1 * env(b / 0.9), "eyeL.top": 0.12, "eyeR.top": 0.12 });
        if (!RM && b > 0.4) Lsp.add({ "body.y": -1 * Math.abs(Math.sin((b - 0.4) * Math.PI * 6)) });
      }
    },
    Alert() {
      Ls.add({ "mouth.s": 0.06 * Math.sin(rt * 5) });
    },
    Scared(st) {
      if (!RM) Lsp.add({ "body.x": 0.6 * Math.sin(rt * 113) * Math.sin(rt * 7.1) });
      every(st, "look", 2, 3, () => {
        st.lookT = rt;
        st.lookDir = Math.random() < 0.5 ? -1 : 1;
      });
      const b = burst(st, "look");
      if (b >= 0 && b < 0.6) Ls.add({ "eyeL.x": 4 * st.lookDir, "eyeR.x": 4 * st.lookDir });
      Ls.add({ "body.L": 0.02 * Math.sin(rt * 6) });
      if (rt - shownAt > 2) every(st, "drop", 2.5, 4, () => emit("tear", { x: 108, y: 60, vy: 6, gravity: 40, life: 1.2 }));
    },
    Angry(st) {
      if (!RM) Lsp.add({ "body.x": 0.4 * Math.sin(rt * 75) });
      Ls.add({ "body.L": -0.03 * (0.5 + 0.5 * Math.sin(rt * 3.1)) });
      want.vein = 1;
      every(st, "huff", 3, 5, () => face.impulse({ sy: -2.2 * RMK }));
      every(st, "steam", 1.4, 2.4, () => {
        emit("puff", { x: 30, y: 34, vx: -10, vy: -18, spread: 0 });
        emit("puff", { x: 90, y: 34, vx: 10, vy: -18, spread: 0 });
      });
      if (P.inside && !drag.on && !ctl.system) face.lookAt(P.wx, P.wy, { lean: P.lean });
    },
    Hurt(st) {
      every(st, "w", 1, 2, () => {
        st.wT = rt;
      });
      const b = burst(st, "w");
      if (b >= 0 && b < 0.3) {
        Ls.add({ "eyeL.s": -0.1, "eyeR.s": -0.1 });
        if (!RM) Lsp.add({ "body.x": 0.5 * Math.sin(rt * 88) * (1 - b / 0.3) });
      }
      if (rt - shownAt > 1) want.bandage = 1;
      every(st, "tear", 1.5, 3, () => emit("tear", { x: pick([33, 87]), y: 76 }));
    },
    Dead(st) {
      Ls.add({ "body.rot": 4 * Math.sin(rt * 3.8), "body.x": 1.5 * Math.cos(rt * 3.8) });
      every(st, "tw", 3, 6, () => {
        st.twT = rt;
        st.twE = Math.random() < 0.5 ? "eyeL.s" : "eyeR.s";
      });
      const b = burst(st, "tw");
      if (b >= 0 && b < 0.08) Ls.add({ [st.twE]: 0.15 });
      if (!st.stars || rt > st.stars) {
        emit("star", { count: 3, orbit: { cx: 60, cy: -6, r: 22, ry: 0.27, speed: 4.5 }, life: 2.6 }, true);
        st.stars = rt + 2.5;
      }
    },
    Sad(st) {
      every(st, "sigh", 9, 13, () => {
        st.sighT = rt;
      });
      const s = burst(st, "sigh");
      if (s >= 0 && s < 2.3) Ls.add({ "body.sy": s < 0.9 ? 0.025 * smooth(s / 0.9) : 0.025 - 0.055 * smooth((s - 0.9) / 1.4) * (1 - smooth((s - 1.9) / 0.4)), "eyeL.top": s > 0.9 ? 0.1 : 0, "eyeR.top": s > 0.9 ? 0.1 : 0 });
      every(st, "tear", 6, 10, () => emit("tear", { x: pick([30, 90]), y: 74, vy: 2, gravity: 30, life: 1.6 }));
      if (P.inside && !drag.on && !ctl.system) face.lookAt(60 + (60 - P.wx), 160, { lean: 0.3 * (P.lean || 0) });
      want.cloud = rt - shownAt > 20 ? 1 : 0;
    },
    Problem(st) {
      every(st, "tilt", 1.5, 2.5, () => {
        st.tilt = -(st.tilt || 1);
      });
      Ls.add({ "body.rot": 6 * (st.tilt || 1) });
      every(st, "scr", 4, 7, () => {
        st.scrT = rt;
      });
      const b = burst(st, "scr");
      if (b >= 0 && b < 0.3 && !RM) Lsp.add({ "body.rot": 2 * Math.sin(rt * 63) });
      every(st, "up", 2, 4, () => {
        st.upT = rt;
      });
      const u = burst(st, "up");
      if (u >= 0 && u < 0.9) Ls.add({ "eyeL.x": 3, "eyeR.x": 3, "eyeL.y": -3, "eyeR.y": -3 });
    },
    NoInternet(st) {
      every(st, "up", 2, 4, () => {
        st.upT = rt;
      });
      const u = burst(st, "up");
      if (u >= 0 && u < 0.8) Ls.add({ "eyeL.x": 3.5, "eyeR.x": 3.5, "eyeL.y": -3, "eyeR.y": -3 });
      every(st, "reach", 6, 9, () => {
        st.reachT = rt;
      });
      const r = burst(st, "reach");
      if (r >= 0 && r < 0.9) Ls.add({ "body.sy": 0.06 * env(r / 0.9), "body.rot": 2 * env(r / 0.9) });
      if (st.cyc == null) st.cyc = Math.floor(rt / 1.9);
      const c = Math.floor(rt / 1.9);
      if (c !== st.cyc) {
        st.cyc = c;
        if (Math.random() < 0.6) face.blink({ double: true });
      }
    },
    Pleading(st) {
      if (!RM) Lsp.add({ "eyeL.s": 0.03 * Math.sin(rt * 37.7), "eyeR.s": 0.03 * Math.sin(rt * 37.7 + 0.6) });
      every(st, "pp", 3, 5, () => {
        st.ppT = rt;
      });
      const b = burst(st, "pp");
      if (b >= 0 && b < 0.5) Ls.add({ "body.y": -1.5 * Math.abs(Math.sin(b * Math.PI * 4)) });
    },
    Sweating(st) {
      every(st, "drop", 5, 8, () => emit("tear", { x: 92, y: 40, vy: 8, vx: 4, gravity: 60, life: 1.1 }));
      every(st, "laugh", 2.5, 4.5, () => {
        st.lT = rt;
      });
      const b = burst(st, "laugh");
      if (b >= 0 && b < 0.5 && !RM) Lsp.add({ "body.y": 0.4 * Math.sin(rt * 56) });
    },
    WTF(st) {
      Ls.add({ "body.rot": -0.6 * Math.sin(rt * 0.6) });
      every(st, "dt", 6, 10, () => {
        st.dtT = rt;
      });
      const b = burst(st, "dt");
      if (b >= 0 && b < 0.9) {
        if (b < 0.2) Ls.set({ "eyeL.top": 0, "eyeR.top": 0 });
        Ls.add({ "body.rot": 3 * Math.sin(b * Math.PI * 4) * (b > 0.2 ? 1 : 0) });
      }
      every(st, "dots", 7, 11, () => {
        st.dotsT = rt;
      });
      const d = burst(st, "dots");
      want.dots = d >= 0 && d < 2.6 ? 1 : 0;
    },
    Focusing(st) {
      const u = (rt % 3.2) / 3.2;
      const bub = u < 0.25 ? smooth(u / 0.25) : u < 0.62 ? 1 : u < 0.85 ? 1 - smooth((u - 0.62) / 0.23) : 0;
      Ls.set({ "acc.bubbles": bub });
      Ls.add({ "eyeL.x": 3, "eyeR.x": 3, "eyeL.y": -2.5, "eyeR.y": -2.5, "body.rot": 1.5 * Math.sin(rt * 1.57), "mouth.tgX": 1.5 * Math.sin(rt * 9.4) });
      every(st, "lb", 5, 8, () => face.blink({ close: 110, hold: 400, open: 180 }));
    },
    Loading(st) {
      const w = (k: number) => {
        const u = ((rt - k * 0.12) % 0.9) / 0.9;
        return u < 0.45 ? Math.sin((u / 0.45) * Math.PI) : 0;
      };
      const a = w(0),
        b = w(1),
        c = w(2);
      Ls.add({ "eyeL.y": -5 * a * RMK, "eyeL.s": 0.15 * a, "dot.dy": -5 * b * RMK, "dot.s": 0.15 * b, "eyeR.y": -5 * c * RMK, "eyeR.s": 0.15 * c });
      every(st, "bl", 4, 7, () => {
        st.blT = rt;
      });
      const bl = burst(st, "bl");
      if (bl >= 0 && bl < 0.18) Ls.add({ "eyeL.open": -0.8, "eyeR.open": -0.8, "dot.s": -0.7 });
    },
    Initializing() {
      want.scan = 1;
      Ls.add({ "body.L": 0.03 * Math.sin(rt * 5) });
    },
    Sleeping(st) {
      const cyc = 4.2,
        u = (rt % cyc) / cyc,
        inh = u < 0.43;
      const r = inh ? smooth(u / 0.43) : 1 - smooth((u - 0.43) / 0.57);
      Ls.add({ "mouth.s": -0.3 + 0.5 * r, "body.sy": 0.02 * r });
      every(st, "dream", 8, 20, () => {
        st.dreamT = rt;
        st.dreamK = Math.random() < 0.12 ? "bubble" : pick(["flutter", "smile", "mumble", "giggle"]);
        if (st.dreamK === "bubble") dreamIcon = pick(Object.keys(ICONS));
      });
      const b = burst(st, "dream");
      if (b >= 0) {
        const k = st.dreamK;
        if (k === "flutter" && b < 0.36) Ls.add({ "eyeL.top": -0.18 * Math.abs(Math.sin((b * Math.PI) / 0.12)), "eyeR.top": -0.18 * Math.abs(Math.sin((b * Math.PI) / 0.12)) });
        if (k === "smile" && b < 0.6) Ls.set({ "mouth.tH": 10, "mouth.bH": 14, "mouth.tR": 12, "mouth.bR": 14, "mouth.tA": 12, "mouth.bA": 14 });
        if (k === "mumble" && b < 0.8) Ls.add({ "mouth.s": 0.2 * Math.sin(b * Math.PI * 6), "mouth.rot": 6 * Math.sin(b * 9) });
        if (k === "giggle" && b < 0.5) Ls.add({ "body.y": -1.5 * Math.abs(Math.sin(b * Math.PI * 4)) });
        want.dream = k === "bubble" && b < 4.5 ? 1 : 0;
      }
    },
  };
  function cursorTilt(max: number) {
    if (!P.inside) return 0;
    return clamp((P.wx - 60 - (face.get("body.x") || 0)) / 80, -1, 1) * max * (P.lean || 0) * face.gazeLean.habituation;
  }

  // ------------------------------------------------------------------ micro-acts (autonomous director)
  const ACTS: Record<string, any> = {
    lookAround: {
      dur: [2, 3.5], cd: 6, w: () => 10 * (1 + M.C) * boredK("look"),
      run(t: number, u: number, s: any) {
        if (!s.n || t > s.n) {
          s.n = t + rand(0.4, 0.9);
          s.p = [60 + rand(-1, 1) * 140, 60 + rand(-1, 1) * 90];
        }
        face.lookAt(s.p[0], s.p[1]);
      },
      end() {
        face.lookAt(null);
      },
    },
    glanceAtCursor: {
      dur: [0.8, 1.5], cd: 4, w: () => (P.inside ? 8 * (1 + M.F) : 0),
      run(t: number, u: number, s: any) {
        face.lookAt(P.wx, P.wy, { lean: P.lean });
        if (!s.b && t > 0.3) {
          s.b = 1;
          if (Math.random() < 0.15) face.blink({ close: 120, hold: 500, open: 200 });
        }
      },
      end() {
        face.lookAt(null);
      },
    },
    lookUp: {
      dur: [1.6, 2.6], cd: 25, w: () => (weatherKind() !== "clear" ? 3 : 1) * (1 + M.C),
      run() {
        const w = skyWorld();
        face.lookAt(w[0], w[1], { lean: 0.5 });
      },
      end() {
        face.lookAt(null);
      },
    },
    peekRoof: {
      dur: [1.5, 1.5], cd: 20, w: () => 3 * (1 + M.C),
      run(t: number, u: number) {
        const k = env(u);
        face.lookAt(60, -300);
        La.add({ "body.sy": 0.03 * k, "body.rot": 2 * k });
      },
      end() {
        face.lookAt(null);
      },
    },
    yawn: {
      dur: [2.2, 2.2], cd: 25, w: () => 2 * (M.E < 0.4 ? 4 : 1) * boredK("yawn") * (isNight() ? 1.5 : 1),
      run(t: number) {
        const r = t < 0.9 ? lerp(6, 17, smooth(t / 0.9)) : t < 1.3 ? 17 : lerp(17, 6, smooth((t - 1.3) / 0.5));
        const k = t < 1.8 ? smooth(t / 0.3) : 1 - smooth((t - 1.8) / 0.4);
        La.set(O_MOUTH(r, 88), k);
        La.add({ "eyeL.top": 0.3 * k, "eyeR.top": 0.3 * k, "eyeL.bot": 0.3 * k, "eyeR.bot": 0.3 * k, "body.sy": 0.06 * k * RMK });
      },
      end() {
        face.blink({ close: 140, hold: 300, open: 240 });
      },
    },
    stretch: {
      dur: [1.6, 1.6], cd: 30, w: () => 2,
      run(t: number) {
        if (t < 0.6) La.add({ "body.sy": 0.1 * smooth(t / 0.6) * RMK, "body.sx": -0.04 * smooth(t / 0.6) });
        else if (t > 1.2 && !RM) Lap.add({ "body.x": 0.6 * Math.sin(t * 90) });
      },
      start() {
        after(0.62, () => face.impulse({ sy: -2 * RMK }));
      },
    },
    hum: {
      dur: [3, 5], cd: 18, w: () => (M.V > 0.3 ? 4 * (1 + M.V) : 0),
      run(t: number, u: number, s: any) {
        La.add({ "mouth.s": 0.06 * Math.sin(t * 15.7), "body.rot": 3 * Math.sin(t * 6.28) * env(u) });
        if (!s.n || t > s.n) {
          s.n = t + rand(0.9, 1.5);
          emit("note", { x: 114, y: 72, vx: 12, vy: -14 });
        }
      },
    },
    whistle: {
      dur: [2.5, 2.5], cd: 25, w: () => (M.V > 0.2 ? 2 : 0),
      run(t: number, u: number, s: any) {
        const k = env(u) > 0.2 ? 1 : env(u) * 5;
        La.set(O_MOUTH(5, 86), k);
        La.add({ "body.sx": 0.02 * k });
        if (!s.n || t > s.n) {
          s.n = t + 1.1;
          emit("note", { x: 112, y: 76, vx: 14, vy: -12 });
        }
      },
    },
    sneeze: {
      dur: [1.8, 1.8], cd: 60, w: () => 0.6,
      run(t: number, u: number, s: any) {
        if (t < 0.9) {
          const k = t < 0.3 ? 0.5 : 1;
          La.add({ "eyeL.top": 0.25 * k, "eyeR.top": 0.25 * k, "eyeL.bot": 0.25 * k, "eyeR.bot": 0.25 * k, "body.sy": 0.06 * smooth(t / 0.9) * RMK });
          La.set(O_MOUTH(4 + 4 * k, 88));
        } else {
          if (!s.c) {
            s.c = 1;
            face.impulse({ sy: -4 * RMK, y: 60 * RMK });
            emit("dot", { x: 60, y: 92, count: 3, vy: 10, spread: 30, gravity: 80, life: 0.7, color: FACE });
            say(T("achoo"), { short: true });
          }
          La.add({ "body.rot": 6 * Math.sin((t - 0.9) * 22) * (1 - (t - 0.9) / 0.9) * RMK });
        }
      },
    },
    shiver: {
      dur: [1.2, 1.2], cd: 40, w: () => 0.8 * (isNight() && M.E < 0.3 ? 3 : 1) * (weatherKind() === "wind" || weatherKind() === "snow" ? 2.5 : 1),
      run() {
        if (!RM) Lap.add({ "body.x": 0.7 * Math.sin(rt * 88) });
        La.add({ "body.sy": -0.03, "eyeL.top": 0.2, "eyeR.top": 0.2, "eyeL.bot": 0.2, "eyeR.bot": 0.2 });
      },
    },
    daydream: {
      dur: [4, 6], cd: 30, w: () => (M.V >= 0 ? 3 : 0),
      start() {
        dreamIcon = pick(Object.keys(ICONS));
      },
      run(t: number, u: number) {
        const k = env(u) > 0.15 ? 1 : env(u) / 0.15;
        face.lookAt(140, -120);
        La.add({ "eyeL.bot": 0.35 * k, "eyeR.bot": 0.35 * k });
        La.set({ "acc.bubbles": clamp01(t / 0.7) * (1 - smooth((u - 0.85) / 0.15)) });
        want.dream = u > 0.15 && u < 0.9 ? 1 : 0;
      },
      end() {
        face.lookAt(null);
        want.dream = 0;
      },
    },
    peekaboo: {
      dur: [2, 2], cd: 45, w: () => (P.inside && M.F > 0.5 ? 2 : 0),
      run(t: number, u: number, s: any) {
        if (t < 1) La.add({ "eyeL.bot": 0.5, "eyeR.bot": 0.5, "eyeL.y": 4, "eyeR.y": 4, "body.sy": -0.05 });
        else if (!s.p) {
          s.p = 1;
          hop(0.8);
          face.lookAt(P.wx, P.wy, { lean: P.lean });
          popBang();
        }
      },
      end() {
        face.lookAt(null);
      },
    },
    tinyDance: {
      dur: [3, 4], cd: 40, w: () => (M.E > 0.6 && M.V > 0.5 ? 1.5 : 0),
      run(t: number, u: number, s: any) {
        const beat = Math.floor(t * 2);
        La.add({ "body.rot": 7 * (beat % 2 ? 1 : -1) * RMK, "eyeL.bot": 0.5, "eyeR.bot": 0.5, "eyeL.y": 4, "eyeR.y": 4 });
        if (s.b !== beat) {
          s.b = beat;
          face.impulse({ y: -70 * RMK });
        }
      },
    },
    suspicious: {
      dur: [1.2, 1.2], cd: 20, w: () => (M.I > 0.2 || M.C > 0.6 ? 1.5 : 0),
      run(t: number, u: number) {
        const k = env(u) > 0.2 ? 1 : env(u) * 5;
        if (P.inside) face.lookAt(P.wx, P.wy, { lean: P.lean });
        La.add({ "eyeR.top": 0.35 * k, "body.rot": -2 * k });
      },
      end() {
        face.lookAt(null);
      },
    },
    headBob: {
      dur: [2, 4], cd: 15, w: () => (M.E > 0.4 ? 3 : 0),
      run(t: number) {
        La.add({ "face.y": 1.2 * Math.sin(t * 9.4), "body.rot": 1.5 * Math.sin(t * 9.4) });
      },
    },
    sigh: {
      dur: [1.6, 1.6], cd: 14, w: () => (at - lastInput > 20 ? 4 : 0),
      run(t: number) {
        La.add({ "body.sy": t < 0.7 ? 0.03 * smooth(t / 0.7) : 0.03 - 0.06 * smooth((t - 0.7) / 0.9) });
      },
      start() {
        after(0.7, () => emit("puff", { x: 84, y: 88, vx: 10, vy: -6, life: 0.9, s0: 0.3, s1: 0.8 }));
      },
    },
  };
  const ACT_NO = new Set(["Sleeping", "Dead", "Hurt", "Initializing", "Loading", "Angry", "Scared"]);
  function boredK(kind: string) {
    const idle = at - lastInput;
    if (idle < 20) return 1;
    if (kind === "look") return 2;
    if (kind === "yawn") return 3;
    return 1;
  }
  const Dir: any = { act: null, name: null, t0: 0, dur: 0, st: {}, nextAt: 2, cool: {} };
  function startAct(name: string) {
    const a = ACTS[name];
    if (!a) return false;
    endAct(true);
    Dir.act = a;
    Dir.name = name;
    Dir.t0 = rt;
    Dir.dur = rand(a.dur[0], a.dur[1]);
    Dir.st = {};
    Dir.cool[name] = at + a.cd;
    if (a.start) a.start(Dir.st);
    return true;
  }
  function endAct(cut: boolean) {
    if (!Dir.act) return;
    const a = Dir.act;
    Dir.act = null;
    Dir.name = null;
    La.clear();
    Lap.clear();
    if (a.end) a.end(Dir.st, cut);
    Dir.nextAt = at + rand(1.5, 4);
  }
  function actsUpdate() {
    La.clear();
    Lap.clear();
    if (Dir.act) {
      const t = rt - Dir.t0;
      if (t >= Dir.dur || ctl.system || ctl.acute || drag.on || airborne() || talk.on) endAct(t < Dir.dur);
      else Dir.act.run(t, t / Dir.dur, Dir.st);
    }
  }
  function director() {
    if (!auto || Dir.act || at < Dir.nextAt || ctl.system || ctl.acute || drag.on || airborne() || talk.on || conv.phase || M.asleep || doze.on || ACT_NO.has(shown)) return;
    const pool: [string, number][] = [];
    let total = 0;
    for (const [n, a] of Object.entries(ACTS)) {
      if ((Dir.cool[n] || 0) > at) continue;
      const w = a.w();
      if (w > 0) {
        pool.push([n, w]);
        total += w;
      }
    }
    if (!total) {
      Dir.nextAt = at + 2;
      return;
    }
    let r = Math.random() * total;
    for (const [n, w] of pool) {
      r -= w;
      if (r <= 0) {
        startAct(n);
        return;
      }
    }
  }

  // ------------------------------------------------------------------ boredom → doze → sleep
  const doze: any = { on: false, t0: 0, nodT: 0, forced: false, jerked: false };
  function boredomUpdate() {
    if (!auto || M.asleep || ctl.system || conv.phase || talk.on || drag.on || airborne() || hug) return;
    const k = (isNight() ? 0.5 : 1) * (M.E < 0.2 ? 0.6 : 1);
    const idle = at - lastInput;
    if (!doze.on && idle > 45 * k && !ctl.acute) {
      doze.on = true;
      doze.t0 = at;
      doze.nodT = at + 1;
      endAct(true);
    }
    if (doze.on && (idle > 60 * k || (doze.forced && at - doze.t0 > 6))) fallAsleep(true);
  }
  function dozeUpdate() {
    if (!doze.on) return;
    const t = at - doze.t0;
    const lids = 0.25 + 0.15 * (0.5 + 0.5 * Math.sin(rt * 1.3));
    Lmood.add({ "eyeL.top": lids, "eyeR.top": lids });
    const c = ((at - doze.t0) % 4) / 4;
    if (c < 0.4) Lmood.add({ "body.sy": -0.03 * smooth(c / 0.4), "body.y": 1.5 * smooth(c / 0.4) });
    if (c > 0.4 && c < 0.45) Lmood.add({ "eyeL.top": -lids, "eyeR.top": -lids });
    if (t > 0 && c > 0.4 && !doze.jerked) {
      doze.jerked = true;
      face.impulse({ y: -40 * RMK });
    }
    if (c < 0.4) doze.jerked = false;
  }
  function endDoze() {
    doze.on = false;
    doze.forced = false;
    Lmood.clear();
  }
  let sleepWakeAt = 0;
  function fallAsleep(bored?: boolean) {
    doze.on = false;
    doze.forced = false;
    Lmood.clear();
    react(
      "fallAsleep",
      3.2,
      (t) => {
        const steps = [0.2, 0.35, 0.25, 0.45, 0.4, 0.5];
        const i = Math.min(steps.length - 1, Math.floor(t / 0.45));
        Lr.add({ "eyeL.top": steps[i], "eyeR.top": steps[i], "body.sy": -0.03 * smooth(t / 3) });
        if (t > 1 && t < 2.4) {
          const y = t - 1;
          const r = y < 0.6 ? lerp(6, 15, smooth(y / 0.6)) : lerp(15, 8, smooth((y - 0.6) / 0.8));
          Lr.set(O_MOUTH(r, 88));
        }
      },
      (st, cut) => {
        if (!cut) {
          M.asleep = true;
          sleepWakeAt = at + rand(100, 160) * (isNight() ? 2.5 : 1);
          if (bored) report("ignore", 0.5);
        }
      }
    );
    setAcute("Normal", 3.2);
  }
  function wake(kind: "startle" | "gentle", silent?: boolean) {
    const wasAsleep = M.asleep;
    M.asleep = false;
    lastInput = at;
    if (wasAsleep && !silent) report("wake", kind === "startle" ? 0.8 : 0.4);
    if (kind === "startle") {
      show("Alert", { startle: true });
      setAcute("Alert", 1.1);
      nudge({ A: 0.3 });
      return;
    }
    setAcute("Smiling", 2.6);
    react("wakeGentle", 2.6, (t) => {
      if (t < 0.6) Lr.add({ "body.sy": 0.08 * smooth(t / 0.6) * RMK });
      else if (t < 1.4) {
        const y = (t - 0.6) / 0.8;
        Lr.set(O_MOUTH(lerp(6, 14, env(y)), 88), env(y));
      }
      Lr.add({ "eyeL.bot": 0.3 * (1 - smooth((t - 2) / 0.6)), "eyeR.bot": 0.3 * (1 - smooth((t - 2) / 0.6)) });
    });
  }

  // ------------------------------------------------------------------ speech bubble + lip-sync
  // Two kinds of speech share one mouth and one bubble:
  // - "line": a complete sentence (reactions, greetings) — the demo's say(), unchanged;
  // - "stream": a conversation reply that may grow while it streams and may be voiced by
  //   TTS audio (mouth from the real loudness) or lip-synced from the text.
  const talk: any = { on: false, kind: "line", vis: [], t0: 0, total: 0, text: "", shownChars: -1, idx: -1, done: null, short: false, nextBob: 0, nextLook: 0, f: 1 };
  function visemes(text: string) {
    const s = text.toLowerCase(),
      out: any[] = [];
    const DI: Record<string, number[]> =
      lang === "fr"
        ? { eau: [0.8, 0.75, 1.25], ou: [0.4, 0.65, 1.25], au: [0.8, 0.75, 1.25], eu: [0.6, 1, 1.25], on: [0.8, 0.75, 1.25], an: [0.55, 0.95, 1.25], en: [0.55, 0.95, 1.25], in: [0.55, 0.95, 1.25], ch: [0.35, 0.95, 0.7], oi: [0.75, 0.85, 1.25], ai: [0.6, 1, 1.25] }
        : { oo: [0.4, 0.65, 1.25], ee: [0.35, 1.15, 1.25], ea: [0.4, 1.1, 1.25], ou: [0.6, 0.8, 1.25], ow: [0.7, 0.75, 1.25], oa: [0.75, 0.75, 1.25], ai: [0.6, 1, 1.25], ay: [0.6, 1, 1.25], th: [0.25, 1, 0.7], sh: [0.35, 0.85, 0.7], ch: [0.35, 0.9, 0.7], ng: [0.3, 1, 0.7] };
    let i = 0;
    while (i < s.length) {
      const c = s[i];
      let len = 1,
        open = 0.25,
        wf = 1,
        d = 80 * 0.7,
        kind: string | null = null;
      const tri = s.substr(i, 3),
        duo = s.substr(i, 2);
      if (DI[tri]) {
        len = 3;
        [open, wf] = DI[tri];
        d = 80 * DI[tri][2];
      } else if (DI[duo]) {
        len = 2;
        [open, wf] = DI[duo];
        d = 80 * DI[duo][2];
      } else if ("aàâ".includes(c)) {
        open = 1;
        d = 100;
      } else if ("eéèêë".includes(c)) {
        open = 0.6;
        d = 100;
      } else if ("iîïy".includes(c)) {
        open = 0.35;
        wf = 1.15;
        d = 100;
      } else if ("oôö".includes(c)) {
        open = 0.8;
        wf = 0.75;
        d = 100;
      } else if ("uùûü".includes(c)) {
        open = 0.4;
        wf = 0.65;
        d = 100;
      } else if ("mbp".includes(c)) {
        open = 0;
        wf = 0.95;
        d = 60;
      } else if ("fv".includes(c)) open = 0.15;
      else if ("lndtsz".includes(c)) open = 0.3;
      else if ("kgrjcqx".includes(c)) {
        open = 0.35;
        wf = 0.95;
      } else if (c === " " || c === "\n") {
        open = 0.1;
        d = 40;
      } else if (",;:".includes(c)) {
        open = 0;
        d = 180;
      } else if (".!?…".includes(c)) {
        open = 0;
        d = 350;
        kind = c;
      } else if (/[0-9]/.test(c)) {
        open = 0.5;
        d = 90;
      } else if (!/[a-zà-ÿ]/.test(c)) {
        open = 0.1;
        d = 30;
      }
      open = clamp01(open * rand(0.9, 1.1));
      out.push({ len, open, wf, d: d / 1000, kind });
      i += len;
    }
    let t = 0,
      ci = 0;
    for (const v of out) {
      v.t = t;
      v.ci = ci;
      t += v.d;
      ci += v.len;
    }
    return out;
  }
  // how much the talking mouth smiles (+) or frowns (−) for each emotion
  const TALK_CURVE: Record<string, number> = { Happy: 1, Grinning: 1, Loving: 1, Grateful: 0.9, Winking: 0.9, WinkingSmile: 0.8, Smiling: 0.8, UwU: 0.7, Cheeky: 0.6, Silly: 0.6, Devious: 0.6, Normal: 0.5, Sweating: 0.3, Loading: 0.3, Initializing: 0.3, Alert: 0, Focusing: 0, Dead: 0, Sleeping: 0, WTF: -0.1, DeadAss: -0.1, Problem: -0.5, NoInternet: -0.6, Pleading: -0.7, Scared: -0.7, Angry: -0.8, Hurt: -0.8, Sad: -0.9 };
  const cleanText = (text: string) => String(text || "").replace(/\s+/g, " ").trim();
  function showBubble(short: boolean) {
    bubble.hidden = false;
    bubble.classList.remove("out");
    bubble.classList.toggle("short", short);
  }
  function talkMouth(open: number, wf: number) {
    const c = TALK_CURVE[shown] != null ? TALK_CURVE[shown] : 0.4;
    const h = 1 + open * 7,
      w = 14 * wf * (1 + 0.12 * c),
      y = 86 - 1.5 * c;
    Ltalk.set(MOUTH({ tY: y, tR: w, tA: w, tH: -h + 3.5 * c, tD: 0, bY: y, bR: w, bA: w, bH: h + 3.5 * c, bD: 0, tongue: 0, s: 1, rot: 0, talk: 0 }));
  }
  function say(text: string, o?: any) {
    o = o || {};
    text = cleanText(text);
    if (!text) return;
    // a reaction never cuts a conversation reply
    if (talk.on && talk.kind === "stream" && o.short) return;
    const vis = visemes(text);
    // Text reveals at reading speed (~38 chars/s), not speaking speed: compress the timeline.
    const natural = vis.length ? vis[vis.length - 1].t + vis[vis.length - 1].d : 0.5;
    const target = Math.max(0.8, Math.min(5, text.length / 38));
    const f = Math.min(1, target / natural);
    if (f < 1) for (const v of vis) {
      v.t *= f;
      v.d *= f;
    }
    Object.assign(talk, { on: true, kind: "line", f, vis, t0: rt, total: vis.length ? vis[vis.length - 1].t + vis[vis.length - 1].d : 0.5, text, shownChars: -1, idx: -1, done: o.done || null, short: !!o.short, nextBob: rt + 0.3, nextLook: rt });
    showBubble(talk.short);
    bubbleText.textContent = "";
    host.srSpeech.textContent = text;
    face.spring("mouth", { k: 700, c: 40 });
    face.setState("mouth.tongue", Math.min(cur("mouth.tongue", 0), 0.2), 0); // no tongue bubble on the first frame
    cancel("bubble");
    endAct(true);
  }
  function finishTalk() {
    talk.on = false;
    Ltalk.clear();
    if (talk.playback) {
      talk.playback = null;
    }
    bubbleText.textContent = talk.text;
    if (talk.text) placeBubble();
    else bubble.hidden = true;
    face.spring("mouth", null);
    face.blink({ close: 80, hold: 40, open: 140 });
    const hold = talk.short ? 1.4 : Math.min(9, 2.5 + 0.06 * talk.text.length);
    if (talk.text)
      after(
        hold,
        () => {
          bubble.classList.add("out");
          after(0.22, () => {
            if (!talk.on) bubble.hidden = true;
          }, "bubble");
        },
        "bubble"
      );
    if (talk.done) {
      const d = talk.done;
      talk.done = null;
      d();
    }
  }
  function lineUpdate() {
    const t = rt - talk.t0;
    if (t >= talk.total) {
      finishTalk();
      return;
    }
    let idx = talk.idx < 0 ? 0 : talk.idx;
    while (idx + 1 < talk.vis.length && talk.vis[idx + 1].t <= t) idx++;
    const v = talk.vis[idx];
    if (idx !== talk.idx) {
      talk.idx = idx;
      visemeCue(v);
    }
    const chars = v.ci + v.len;
    if (chars !== talk.shownChars) {
      talk.shownChars = chars;
      bubbleText.textContent = talk.text.slice(0, chars);
      placeBubble();
    }
    let open = v.open,
      wf = v.wf;
    if (talk.f < 0.8) {
      // Compressed speech: cartoon flap at a steady ~7.5 Hz, loudness from nearby vowels, closed on pauses.
      const r = flapAt(idx, t);
      open = r[0];
      wf = r[1];
    }
    talkMouth(open, wf);
  }
  function visemeCue(v: any) {
    if (v.kind) {
      face.blink({ close: 70, hold: 40, open: 120 });
      if (v.kind === "!") face.impulse({ y: -60 * RMK });
      if (v.kind === "?") face.impulse({ rot: 30 * RMK });
    } else if (rt > talk.nextBob && v.open > 0.5) {
      face.impulse({ rot: (Math.random() < 0.5 ? -1 : 1) * 14 * RMK });
      talk.nextBob = rt + rand(0.25, 0.45);
    }
  }
  function flapAt(idx: number, t: number): [number, number] {
    const v = talk.vis[idx];
    let amp = 0,
      wsum = 0,
      n = 0;
    for (let j = Math.max(0, idx - 2); j <= Math.min(talk.vis.length - 1, idx + 2); j++) {
      amp = Math.max(amp, talk.vis[j].open);
      wsum += talk.vis[j].wf;
      n++;
    }
    const pause = !!v.kind || (v.open === 0 && v.d > 0.05);
    return [pause ? 0 : amp * (0.5 + 0.5 * Math.abs(Math.sin(t * Math.PI * 7.5))), n ? wsum / n : 1];
  }
  const visIndex = (pos: number) => {
    const vis = talk.vis;
    let lo = 0,
      hi = vis.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (vis[mid].ci <= pos) lo = mid;
      else hi = mid - 1;
    }
    return lo;
  };

  // --- streamed / voiced replies
  function streamStart(o: { expectAudio?: boolean; hold?: number }) {
    cancel("bubble");
    Object.assign(talk, {
      on: true, kind: "stream", text: "", vis: [], rev: 0, budget: 0, pauseUntil: 0, mouth: 0, mbudget: 0, mpauseUntil: 0,
      replay: false, final: false, mode: o.expectAudio ? "silent" : "flap", playback: null, holdUntil: rt + (o.hold || 0),
      rate: 38, shownChars: -1, idx: -1, done: null, short: false, nextBob: rt + 0.3, nextLook: rt, waitAudioUntil: Infinity,
      lastLevel: 0, quietSince: rt, blinked: true, t0: rt,
    });
    bubbleText.textContent = "";
    bubble.hidden = true;
    face.spring("mouth", { k: 700, c: 40 });
    face.setState("mouth.tongue", Math.min(cur("mouth.tongue", 0), 0.2), 0);
    endAct(true);
  }
  function streamSet(text: string) {
    talk.text = text;
    talk.vis = visemes(text);
    if (talk.rev > text.length) talk.rev = text.length;
  }
  function streamAppend(chunk: string) {
    if (!chunk) return;
    let text = talk.text + chunk;
    if (!talk.text) text = text.replace(/^\s+/, "");
    streamSet(text.replace(/\s+/g, " "));
  }
  function streamFinal(text: string, done?: () => void) {
    const fin = cleanText(text);
    const curT = cleanText(talk.text);
    if (fin && fin !== curT) {
      if (!curT) streamSet(fin);
      else if (fin.startsWith(curT)) streamSet(fin);
      else {
        // the final speech differs from what streamed (e.g. a rewritten answer): keep the common start
        let i = 0;
        while (i < Math.min(fin.length, curT.length) && fin[i] === curT[i]) i++;
        talk.rev = Math.min(talk.rev, i);
        streamSet(fin);
      }
    }
    talk.final = true;
    talk.done = done || null;
    if (talk.mode === "silent") talk.waitAudioUntil = rt + 8;
    host.srSpeech.textContent = talk.text;
  }
  function streamUpdate() {
    const text: string = talk.text;
    // reveal the bubble at reading speed, with small holds at punctuation
    if (rt >= talk.holdUntil && rt >= talk.pauseUntil && talk.rev < text.length) {
      talk.budget += frameDt * talk.rate;
      while (talk.budget >= 1 && talk.rev < text.length) {
        talk.budget -= 1;
        const c = text[talk.rev];
        talk.rev++;
        const nx = text[talk.rev];
        if (".!?…".includes(c) && (nx === undefined || nx === " ")) {
          talk.pauseUntil = rt + 0.22;
          talk.budget = 0;
          break;
        }
        if (",;:".includes(c)) {
          talk.pauseUntil = rt + 0.08;
          talk.budget = 0;
          break;
        }
      }
    }
    if (talk.rev !== talk.shownChars) {
      talk.shownChars = talk.rev;
      if (talk.rev > 0) {
        if (bubble.hidden) showBubble(false);
        bubbleText.textContent = text.slice(0, talk.rev);
        placeBubble();
      }
    }
    // mouth
    if (talk.mode === "flap") {
      const pos = talk.replay ? talk.mouth : talk.rev;
      if (talk.replay && rt >= talk.mpauseUntil && talk.mouth < text.length) {
        talk.mbudget += frameDt * 38;
        while (talk.mbudget >= 1 && talk.mouth < text.length) {
          talk.mbudget -= 1;
          const c = text[talk.mouth++];
          if (".!?…".includes(c)) {
            talk.mpauseUntil = rt + 0.22;
            talk.mbudget = 0;
            break;
          }
        }
      }
      const waiting = pos >= text.length || rt < talk.holdUntil;
      if (text.length && !waiting) {
        const idx = visIndex(Math.max(0, pos - 1));
        if (idx !== talk.idx) {
          talk.idx = idx;
          visemeCue(talk.vis[idx]);
        }
        const inPause = rt < (talk.replay ? talk.mpauseUntil : talk.pauseUntil);
        const [open, wf] = flapAt(idx, rt - talk.t0);
        talkMouth(inPause ? 0 : open, wf);
      } else Ltalk.clear();
    } else if (talk.mode === "audio") {
      const p: SpeechPlayback | null = talk.playback;
      const lvl = p ? p.level() : 0;
      if (lvl > 0.55 && talk.lastLevel <= 0.55 && rt > talk.nextBob) {
        face.impulse({ rot: (Math.random() < 0.5 ? -1 : 1) * 14 * RMK });
        talk.nextBob = rt + rand(0.25, 0.45);
      }
      if (lvl > 0.08) {
        talk.quietSince = rt;
        talk.blinked = false;
      } else if (!talk.blinked && rt - talk.quietSince > 0.4) {
        talk.blinked = true;
        face.blink({ close: 70, hold: 40, open: 120 });
      }
      talk.lastLevel = lvl;
      talkMouth(lvl, 0.9 + 0.2 * lvl);
    } else Ltalk.clear(); // silent: waiting for the voice, mouth keeps the emotion
    // end (in audio mode, the end of the audio ends it: speechEnded)
    if (talk.final && talk.rev >= text.length && talk.mode !== "audio") {
      if (!text) return finishTalk();
      if (talk.mode === "flap" && (!talk.replay || talk.mouth >= text.length) && rt >= talk.pauseUntil) return finishTalk();
      if (talk.mode === "silent" && rt > talk.waitAudioUntil) return finishTalk();
    }
  }
  function talkUpdate() {
    Ltalk.clear();
    if (!talk.on) return;
    if (talk.kind === "line") lineUpdate();
    else streamUpdate();
    if (talk.on && rt >= talk.nextLook && !drag.on) {
      talk.nextLook = rt + rand(1, 2);
      if (!P.inside) face.lookAt(60 + rand(-8, 8), 140 + rand(-6, 6));
    }
  }
  function placeBubble() {
    if (bubble.hidden) return;
    const bubbleW = bubble.offsetWidth,
      bh = bubble.offsetHeight;
    const right = face.houseToWorld(88, 12),
      left = face.houseToWorld(32, 12);
    let [x, y] = toPx(right[0], right[1]);
    let flip = false;
    if (x + 6 + bubbleW > view.pxW - 10) {
      const l = toPx(left[0], left[1]);
      if (l[0] - 6 - bubbleW > 10) {
        x = l[0] - 6 - bubbleW;
        y = l[1];
        flip = true;
      } else x = clamp(view.pxW / 2 - bubbleW / 2, 10, view.pxW - bubbleW - 10);
    } else x = x + 6;
    y = clamp(y - bh - 8, 8, view.pxH - bh - 8);
    bubble.classList.toggle("flip", flip);
    bubble.style.transform = "translate(" + x.toFixed(1) + "px," + y.toFixed(1) + "px)";
  }

  // ------------------------------------------------------------------ conversation (Assist pipeline)
  const conv: any = { phase: null, t0: 0, voice: false, level: 0, nod: 0, source: "panel", typingAt: -9, offline: false, satState: "idle" };
  let inputFocused = false;
  function release(delay = 0) {
    cancel("conv");
    const go = () => {
      conv.phase = null;
      conv.voice = false;
      want.rings = 0;
      ringsSpeed = 1;
      if (ctl.system && ctl.system.tag !== "offline") ctl.system = conv.offline ? { id: "NoInternet", tag: "offline" } : null;
      face.lookAt(null);
    };
    if (delay > 0) after(delay, go, "conv");
    else go();
  }
  function hideBubble() {
    if (bubble.hidden) return;
    cancel("bubble");
    bubble.classList.add("out");
    after(0.22, () => {
      if (!talk.on) bubble.hidden = true;
    }, "bubble");
  }
  function stopTalk() {
    if (talk.on) {
      talk.on = false;
      talk.done = null;
      Ltalk.clear();
      face.spring("mouth", null);
    }
    // a bubble still lingering from a previous line goes away too
    hideBubble();
  }
  function listen(o: { wake?: boolean; source?: "panel" | "satellite" }) {
    cancel("conv");
    stopTalk();
    inputSeen("sudden");
    endAct(true);
    kw.on = false;
    conv.phase = "listen";
    conv.t0 = rt;
    conv.voice = false;
    conv.level = 0;
    conv.source = o.source || "panel";
    if (o.wake) {
      ctl.system = { id: "Alert", tag: "pipe" };
      face.impulse({ y: -90 * RMK });
      popBang();
      after(0.6, () => {
        if (conv.phase === "listen") ctl.system = { id: "Focusing", tag: "listen" };
      }, "conv");
    } else ctl.system = { id: "Focusing", tag: "listen" };
  }
  function think() {
    if (conv.phase === "wait") return;
    want.rings = 0;
    ringsSpeed = 1;
    conv.phase = "wait";
    conv.t0 = rt;
    endAct(true);
  }
  function userSent() {
    cancel("conv");
    kw.fired.clear();
    kw.on = false;
    stopTalk();
    inputSeen("sudden");
    face.squash(0.03, 150);
    face.blink();
    nudge({ V: 0.05, A: 0.1, F: 0.01, C: 0.15 });
    conv.phase = null;
    think();
  }
  function startReplyTalk(emotion: string | undefined, expectAudio: boolean, hold: number) {
    cancel("conv");
    conv.phase = "talk";
    conv.voice = false;
    want.rings = 0;
    ctl.system = { id: emotion && IDS.includes(emotion) ? emotion : "Normal", tag: "chat" };
    streamStart({ expectAudio, hold });
  }
  const REPLY_V: Record<string, number> = { Loving: 0.2, Grateful: 0.2, Happy: 0.15, Grinning: 0.15, Smiling: 0.1, Sad: -0.2, Angry: -0.15, Hurt: -0.2, Scared: -0.1 };
  function reply(o: ReplyOptions) {
    const emotion = IDS.includes(o.emotion) ? o.emotion : "Normal";
    const streaming = talk.on && talk.kind === "stream" && conv.phase === "talk";
    if (!streaming) startReplyTalk(emotion, !!o.expectAudio, o.expectAudio ? 1.2 : 0.25);
    else ctl.system = { id: emotion, tag: "chat" };
    nudge({ V: REPLY_V[emotion] || 0 });
    if (emotion === "Loving" || emotion === "Grateful") nudge({ F: 0.03, I: -0.2 });
    if (o.success) emit("sparkle", { count: 6, x: 60, y: 30, spread: 110, life: 0.6, color: face.bodyColor }, true);
    streamFinal(o.text, () => {
      o.done?.();
      release(4);
    });
  }
  function speak(p: SpeechPlayback) {
    if (!talk.on || talk.kind !== "stream") {
      // voice without a bubble (e.g. text not known): talk from the audio alone
      startReplyTalk(ctl.system?.id, true, 0);
      talk.final = true;
    }
    talk.mode = "audio";
    talk.playback = p;
    talk.holdUntil = 0;
    const remaining = talk.text.length - talk.rev;
    const dur = p.duration();
    talk.rate = remaining > 0 ? (Number.isFinite(dur) && dur > 0.6 ? clamp(remaining / (dur - 0.3), 10, 38) : 16) : 38;
  }
  function speechEnded() {
    if (!talk.on || talk.kind !== "stream") return;
    talk.playback = null;
    talk.rev = talk.text.length;
    talk.final = true;
    finishTalk();
  }
  function speechFailed() {
    if (!talk.on || talk.kind !== "stream") return;
    talk.playback = null;
    talk.mode = "flap";
    talk.holdUntil = 0;
    talk.rate = 38;
    if (talk.rev > 0) {
      talk.replay = true;
      talk.mouth = 0;
      talk.mbudget = 0;
    }
  }
  function streamText(chunk: string, emotionHint?: string, expectAudio?: boolean) {
    if (!(talk.on && talk.kind === "stream" && conv.phase === "talk")) startReplyTalk(emotionHint, !!expectAudio, 0);
    else if (emotionHint && IDS.includes(emotionHint)) ctl.system = { id: emotionHint, tag: "chat" };
    streamAppend(chunk);
  }
  function fail(o: { offline?: boolean; text?: string }) {
    stopTalk();
    cancel("conv");
    conv.phase = "error";
    want.rings = 0;
    ctl.system = { id: o.offline ? "NoInternet" : "Problem", tag: "pipe" };
    if (o.offline) flashWifiOff();
    after(0.2, () => say(o.text || (o.offline ? T("oopsNet") : T("notUnderstood")), { short: true }), "conv-say");
    release(o.offline ? 3 : 2.2);
  }
  function endConversation(delay = 0) {
    if (talk.on && talk.kind === "stream") return; // the reply ends it
    release(delay);
  }
  function setOffline(on: boolean) {
    if (on === conv.offline) return;
    conv.offline = on;
    if (on) {
      if (!conv.phase) ctl.system = { id: "NoInternet", tag: "offline" };
    } else {
      if (ctl.system && ctl.system.tag === "offline") ctl.system = null;
      setAcute("Grinning", 1.6);
      flashWifi();
    }
  }
  function flashWifi() {
    let n = 0;
    const f = () => {
      face.accessory("wifi", n % 2 ? null : 1);
      n++;
      if (n < 6) after(0.18, f);
      else face.accessory("wifi", null);
    };
    f();
  }
  function flashWifiOff() {
    /* NoInternet already shows the broken wifi */
  }
  // casita_emotion of a mirrored satellite that arrived before it starts speaking
  let satPending: { emotion: string; text: string } | null = null;
  function flushSatPending() {
    cancel("sat-pending");
    const p = satPending;
    satPending = null;
    if (p) reply({ text: p.text, emotion: p.emotion, expectAudio: false });
  }
  function satellite(state: string) {
    const prev = conv.satState;
    conv.satState = state;
    if (state === prev) return;
    if (state === "listening") {
      satPending = null;
      listen({ wake: true, source: "satellite" });
    } else if (state === "processing") {
      if (conv.phase !== "talk") think();
      conv.source = "satellite";
    } else if (state === "responding") {
      conv.source = "satellite";
      if (satPending) flushSatPending();
      else if (!(talk.on && talk.kind === "stream")) {
        // the reply text may arrive with the casita_emotion event; meanwhile he talks
        conv.phase = "murmur";
        conv.t0 = rt;
        ctl.system = { id: ctl.system && ctl.system.tag === "chat" ? ctl.system.id : "Normal", tag: "chat" };
      }
    } else if (state === "idle") {
      if (satPending) flushSatPending();
      else if (conv.phase === "murmur" || conv.phase === "listen" || conv.phase === "wait") release(conv.phase === "murmur" ? 0.6 : 0);
    }
  }
  function reactExternal(emotion: string, text?: string, fromSatellite?: boolean) {
    if (!IDS.includes(emotion)) return;
    if (fromSatellite && (conv.phase === "murmur" || conv.satState === "responding")) {
      reply({ text: text || "", emotion, expectAudio: false });
      return;
    }
    if (fromSatellite && (conv.phase === "wait" || conv.phase === "listen" || conv.satState === "processing" || conv.satState === "listening")) {
      // show the feeling now, speak when the satellite does (or soon, if it never says so)
      satPending = { emotion, text: text || "" };
      ctl.system = { id: emotion, tag: "chat" };
      conv.phase = "hold";
      cancel("sat-pending");
      after(2.5, flushSatPending, "sat-pending");
      return;
    }
    if (conv.phase) return;
    inputSeen("sudden");
    setAcute(emotion, 3);
    if (text) after(0.25, () => say(text));
  }
  function convUpdate() {
    Lsys.clear();
    const typing = inputFocused && rt - conv.typingAt < 2 && !!host.input()?.value;
    if (conv.phase === "listen") {
      want.rings = 1;
      ringsSpeed = conv.voice ? 1.9 : 1;
      const lv = conv.level;
      Lsys.set({ "acc.bubbles": 0 }).add({ "eyeL.s": 0.06 + 0.06 * lv, "eyeR.s": 0.06 + 0.06 * lv, "body.sy": 0.02 + 0.03 * lv, "eyeL.y": -1, "eyeR.y": -1 });
      Lsys.set(Object.assign(LINE_MOUTH(86, 10), { "mouth.s": 1 }));
      if (!conv.nod || rt > conv.nod) {
        conv.nod = rt + (conv.voice ? rand(0.45, 0.8) : rand(0.8, 1.4));
        face.impulse({ rot: 12 * RMK, y: 20 * RMK });
      }
      conv.level *= 0.9;
      return;
    }
    want.rings = 0;
    if (conv.phase === "wait") {
      const t = rt - conv.t0;
      let id = "Focusing";
      if (t < 0.6) {
        Lsys.set({ "acc.bubbles": 0 });
        face.lookAt(60, 240);
      } else if (t < 2.5) id = "Loading";
      else if (t < 8) id = Math.floor((t - 2.5) / 3) % 2 ? "Focusing" : "Loading";
      else id = "Sweating";
      ctl.system = { id, tag: "chat" };
      if (t > 0.6 && t < 0.7) face.lookAt(null);
      return;
    }
    if (conv.phase === "murmur") {
      // a satellite is answering and we don't know the words: soft talking flap
      const t = rt - conv.t0;
      const open = 0.25 + 0.5 * Math.abs(Math.sin(t * Math.PI * 3.1)) * (0.6 + 0.4 * Math.sin(t * 1.7));
      if (!talk.on) talkMouth(open, 1);
      return;
    }
    if (conv.phase) return;
    if (typing || (kw.on && rt < kw.until)) {
      if (kw.on && rt < kw.until) {
        ctl.system = { id: kw.id, tag: "typing" };
        if (kw.fn) kw.fn(rt - kw.t0);
      } else {
        kw.on = false;
        ctl.system = { id: "Focusing", tag: "typing" };
        Lsys.set({ "acc.bubbles": 0 }).add({ "eyeL.s": 0.05, "eyeR.s": 0.05 });
      }
      // reads along: eyes follow the text caret
      const c = caretClient();
      if (c) {
        const [wx, wy] = clientToWorld(c[0], c[1]);
        face.lookAt(wx, wy, { lean: 0.25 });
      }
      inputSeen("gentle");
    } else if (ctl.system && ctl.system.tag === "typing") {
      ctl.system = conv.offline ? { id: "NoInternet", tag: "offline" } : null;
      face.lookAt(null);
      if (host.input()?.value) setAcute("Normal", 1.2);
    }
  }

  // reading along: keyword reactions before the message is sent
  const kw: any = { on: false, id: null, t0: 0, until: 0, fn: null, fired: new Set<string>() };
  const yawnFn = (t: number) => {
    const r = t < 0.9 ? lerp(6, 16, smooth(t / 0.9)) : t < 1.3 ? 16 : lerp(16, 6, smooth((t - 1.3) / 0.6));
    const k = t < 1.9 ? smooth(t / 0.3) : 1 - smooth((t - 1.9) / 0.3);
    Lsys.set(O_MOUTH(r, 88), k);
    Lsys.add({ "eyeL.top": 0.3 * k, "eyeR.top": 0.3 * k, "eyeL.bot": 0.3 * k, "eyeR.bot": 0.3 * k, "body.sy": 0.05 * k * RMK });
  };
  const KEYWORDS_EN: any[] = [
    ["merci", /\b(thanks|thank you|thx)\b/i, "Grateful", 1.8, () => emit("heart", { x: 60, y: -4 })],
    ["love", /(love you|luv you|adore you|\bxoxo\b)/i, "Loving", 2.2, () => emit("heart", { count: 3, x: 60, y: 0, spread: 70 })],
    ["vexe", /\b(stupid|dumb|idiot|mean|ugly|useless)\b/i, "Sad", 1.8, () => nudge({ V: -0.1, I: 0.05 })],
    ["dodo", /\b(sleep|sleepy|bedtime|tired|nap)\b/i, "Normal", 2.2, null, yawnFn],
    ["lumiere", /\b(light|lights|lamp|turn on)\b/i, "Grinning", 2.4, () => {
      glowUntil = rt + 3.2;
    }],
    ["salut", /\b(hello|hi|hey)\b/i, "Happy", 1.4, () => hop(0.6)],
    ["wifi", /(wi-?fi|internet|network)/i, "NoInternet", 1.6, null],
  ];
  const KEYWORDS: any[] = [
    ["merci", /\bmerci\b/i, "Grateful", 1.8, () => emit("heart", { x: 60, y: -4 })],
    ["love", /(t['’]aime|t['’]adore|je t['’]kiffe|bisou)/i, "Loving", 2.2, () => emit("heart", { count: 3, x: 60, y: 0, spread: 70 })],
    ["vexe", /\b(nul|nulle|bête|bete|idiot|idiote|méchant|méchante|moche)\b/i, "Sad", 1.8, () => nudge({ V: -0.1, I: 0.05 })],
    ["dodo", /\b(dodo|dormir|sommeil|fatigu[ée]e?|sieste)\b/i, "Normal", 2.2, null, yawnFn],
    ["lumiere", /(lumi[eè]re|lampe|allume|éclaire|eclaire)/i, "Grinning", 2.4, () => {
      glowUntil = rt + 3.2;
    }],
    ["salut", /\b(bonjour|salut|coucou|hello)\b/i, "Happy", 1.4, () => hop(0.6)],
    ["wifi", /(wi-?fi|internet|réseau)/i, "NoInternet", 1.6, null],
  ];
  function keywordCheck(text: string) {
    for (const [key, re, id, dur, once, fn] of lang === "fr" ? KEYWORDS : KEYWORDS_EN) {
      if (kw.fired.has(key) || !re.test(text)) continue;
      kw.fired.add(key);
      Object.assign(kw, { on: true, id, t0: rt, until: rt + dur, fn: fn || null });
      if (once) once();
      return;
    }
  }
  let measure: CanvasRenderingContext2D | null = null;
  function caretClient(): [number, number] | null {
    const inp = host.input();
    if (!inp) return null;
    if (!measure) measure = document.createElement("canvas").getContext("2d");
    const r = inp.getBoundingClientRect(),
      cs = getComputedStyle(inp);
    if (!measure) return [r.left + r.width / 2, r.top + r.height / 2];
    measure.font = cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily;
    const pos = inp.selectionStart == null ? inp.value.length : inp.selectionStart;
    const w = measure.measureText(inp.value.slice(0, pos)).width;
    const x = r.left + parseFloat(cs.paddingLeft) + w - inp.scrollLeft;
    return [clamp(x, r.left, r.right), r.top + r.height / 2];
  }

  // ------------------------------------------------------------------ boot sequence
  function boot(done?: () => void) {
    ctl.system = { id: "Initializing", tag: "boot" };
    const Lb: FaceLayer = face.layer("boot", { priority: 36 });
    react(
      "boot",
      2.5,
      (t) => {
        want.scan = t < 1.6 ? 1 : 0;
        if (t >= 0.3 && t < 1.6) {
          const open = t < 0.75 ? 0.1 : 1;
          Lb.set({ "eyeL.s": 1, "eyeR.s": 1, "eyeL.open": open, "eyeR.open": open });
          if (t > 0.95 && t < 1.15) face.lookAt(-200, 60);
          else if (t > 1.15 && t < 1.35) face.lookAt(320, 60);
          else face.lookAt(null);
          if (t > 1.4 && !Lb.blinked) {
            Lb.blinked = true;
            face.blink({ double: true });
          }
        }
        if (t >= 1.6 && ctl.system && ctl.system.id === "Initializing") {
          Lb.clear();
          ctl.system = { id: "Normal", tag: "boot" };
        }
        if (t > 2.2 && !Lb.hopped) {
          Lb.hopped = true;
          hop(0.6);
        }
      },
      () => {
        Lb.clear();
        want.scan = 0;
        if (ctl.system && ctl.system.tag === "boot") ctl.system = null;
        face.lookAt(null);
        if (done) done();
      }
    );
  }

  // ------------------------------------------------------------------ pointer events
  function pushSample(cx: number, cy: number) {
    const now = rt;
    const last = P.samples[P.samples.length - 1];
    if (last) {
      const dt = Math.max(1e-3, now - last.t);
      const vx = (cx - last.x) / dt,
        vy = (cy - last.y) / dt;
      P.vx = lerp(P.vx, vx, 0.5);
      P.vy = lerp(P.vy, vy, 0.5);
      P.speed = Math.hypot(P.vx, P.vy);
    }
    P.samples.push({ x: cx, y: cy, t: now });
    while (P.samples.length > 60 || (P.samples.length && now - P.samples[0].t > 1.6)) P.samples.shift();
  }
  function onMove(e: PointerEvent) {
    P.type = e.pointerType || "mouse";
    P.cx = e.clientX;
    P.cy = e.clientY;
    const [wx, wy] = clientToWorld(e.clientX, e.clientY);
    P.wx = wx;
    P.wy = wy;
    P.lean = leanFor(e.clientX, e.clientY);
    pushSample(e.clientX, e.clientY);
    P.lastMove = rt;
    P.mvx = P.vx;
    P.mvy = P.vy;
    if (!P.inside) pointerReturn();
    P.inside = true;
    P.leftAt = null;
    const info = hitInfo(wx, wy, 6);
    P.hoverHouse = info.hit;
    stage.classList.toggle("over", info.hit && P.type === "mouse");
    if (P.press) return pressMove(e, info);
    if (P.type !== "mouse") return;
    // fast fly-by → startle
    const d = Math.hypot(wx - (60 + (face.get("body.x") || 0)), wy - (66 + (face.get("body.y") || 0)));
    if (P.speed > 1500 && d < 80 && !drag.on && !fly.on && rt - (P.flybyAt || -9) > 3) {
      P.flybyAt = rt;
      setAcute("Alert", 0.5);
      face.impulse({ y: -80 * RMK });
      inputSeen("sudden");
      nudge({ A: 0.15 });
    }
    if (info.hit && info.region === "roof" && P.speed > 60 && P.speed < 700 && (reversals(1.5, 60) >= 3 || pathLen(1.2) > 250)) petTouch(wx);
    else if (info.hit && (info.region === "face" || info.region === "eye") && reversals(0.7, 400) >= 5) tickleTouch(wx);
    if (info.hit && !P.wasOver) nudge({ V: 0.05, A: 0.15, C: 0.2 });
    P.wasOver = info.hit;
    if (rt - (P.lastInputPing || 0) > 0.3) {
      P.lastInputPing = rt;
      inputSeen(info.hit ? "hover" : null);
    }
  }
  function pointerReturn() {
    if (ctl.miss) {
      ctl.miss = false;
      setAcute("Alert", 0.3);
      after(0.3, () => setAcute("Happy", 1.2));
    } else if (P.leftAt != null && rt - P.leftAt > 3) {
      setAcute("Alert", 0.3);
      after(0.3, () => setAcute("Happy", 1));
    }
  }
  function onLeave() {
    if (P.press || drag.on) return;
    P.inside = false;
    P.leftAt = rt;
    P.hoverHouse = false;
    if (P.type !== "mouse") {
      face.lookAt(null);
      return;
    }
    const exitX = P.wx,
      exitY = P.wy;
    after(0.4, () => {
      if (!P.inside) face.lookAt(exitX + (exitX - 60) * 2, exitY + (exitY - 60));
    }, "leave");
    after(1.2, () => {
      if (!P.inside) {
        face.lookAt(null);
        if (auto && !ctl.system) startAct("lookAround");
      }
    }, "leave");
  }
  const search = { dir: 1, next: 0 };
  function missUpdate() {
    if (P.inside || P.leftAt == null || P.type !== "mouse" || !auto || ctl.system || ctl.acute || M.asleep || drag.on || airborne()) return;
    const t = rt - P.leftAt;
    if (t < 3 || ctl.miss) return;
    if (rt > search.next) {
      search.dir = -search.dir;
      search.next = rt + rand(1.5, 2.5);
    }
    Lmood.add({ "body.rot": 6 * search.dir * RMK });
  }
  function onDown(e: PointerEvent) {
    if (e.button != null && e.button > 0) return;
    cacheRect();
    const [wx, wy] = clientToWorld(e.clientX, e.clientY);
    P.wx = wx;
    P.wy = wy;
    P.type = e.pointerType || "mouse";
    P.samples.length = 0;
    pushSample(e.clientX, e.clientY);
    const info = hitInfo(wx, wy, P.type === "touch" ? 8 : 3);
    if (!info.hit) {
      // clicking the floor or the air: Casita looks there, curious
      face.lookAt(wx, wy);
      inputSeen("sudden");
      nudge({ C: 0.15 });
      cancel("look");
      after(1.2, () => {
        if (!P.press) face.lookAt(null);
      }, "look");
      return;
    }
    e.preventDefault();
    try {
      stage.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    P.press = { id: e.pointerId, t0: rt, cx0: e.clientX, cy0: e.clientY, wx0: wx, wy0: wy, region: info.region, info, mode: null, moved: 0 };
    after(0.55, () => {
      const p = P.press;
      if (p && !p.mode && p.moved < 6) {
        p.mode = "hug";
        hugStart();
      }
    }, "press");
  }
  function pressMove(e: PointerEvent, info: any) {
    const p = P.press;
    const net = Math.hypot(e.clientX - p.cx0, e.clientY - p.cy0);
    p.moved = Math.max(p.moved, net);
    if (p.mode === "drag") {
      dragMove(P.wx, P.wy, P.vx, P.vy);
      return;
    }
    if (p.mode === "pet") {
      if (info.hit || Math.abs(e.clientY - p.cy0) < 40) petTouch(P.wx);
      if (Math.abs(e.clientY - p.cy0) > 60) {
        p.mode = "drag";
        dragStart(p.wx0, p.wy0);
        dragMove(P.wx, P.wy, P.vx, P.vy);
      }
      return;
    }
    if (p.mode === "tickle") {
      tickleTouch(P.wx);
      return;
    }
    if (p.mode === "hug") return;
    const thr = P.type === "touch" ? 14 : 6;
    if (P.type !== "mouse") {
      const dx = e.clientX - p.cx0,
        dy = e.clientY - p.cy0,
        held = rt - p.t0;
      const path = pathLen(rt - p.t0 + 0.05);
      const oneWay = net > 60 && path < net * 1.15;
      if (p.region === "roof" && held < 0.2 && Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        p.mode = "pet";
        cancel("press");
        petTouch(P.wx);
        return;
      }
      if (p.region === "roof" && !(held >= 0.2 || oneWay || Math.abs(dy) > 28)) return;
      if (p.region !== "roof" && (p.region === "face" || p.region === "eye") && reversals(0.7, 300) >= 3 && net < 40) {
        p.mode = "tickle";
        cancel("press");
        tickleTouch(P.wx);
        return;
      }
      if (net > thr && !(net < 24 && reversals(0.5, 200) >= 2)) {
        p.mode = "drag";
        cancel("press");
        dragStart(p.wx0, p.wy0);
        dragMove(P.wx, P.wy, P.vx, P.vy);
      }
      return;
    }
    if (p.region === "roof" && reversals(1.5, 40) >= 2 && Math.abs(e.clientY - p.cy0) < 30) {
      p.mode = "pet";
      cancel("press");
      petTouch(P.wx);
      return;
    }
    if ((p.region === "face" || p.region === "eye") && reversals(0.7, 300) >= 4 && net < 40) {
      p.mode = "tickle";
      cancel("press");
      tickleTouch(P.wx);
      return;
    }
    if (net > (p.region === "roof" ? Math.max(thr, 22) : thr)) {
      p.mode = "drag";
      cancel("press");
      dragStart(p.wx0, p.wy0);
      dragMove(P.wx, P.wy, P.vx, P.vy);
    }
  }
  let lastTap = { t: -9, x: 0, y: 0 };
  function onUp(e: PointerEvent) {
    const p = P.press;
    if (!p) return;
    P.press = null;
    cancel("press");
    try {
      stage.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    if (p.mode === "drag") {
      if (rt - P.lastMove > 0.12) {
        drag.vx = 0;
        drag.vy = 0;
      }
      dragEnd();
      return;
    }
    if (p.mode === "hug") {
      hugEnd();
      return;
    }
    if (p.mode === "pet" || p.mode === "tickle") return;
    if (rt - p.t0 < 0.35 && p.moved < 8) {
      if (rt - lastTap.t < 0.3 && Math.hypot(e.clientX - lastTap.x, e.clientY - lastTap.y) < 30) {
        lastTap.t = -9;
        doubleTap();
        return;
      }
      lastTap = { t: rt, x: e.clientX, y: e.clientY };
      poke(p.info);
    }
    if (P.type !== "mouse") {
      P.inside = false;
      face.lookAt(null);
    }
  }
  function onCancel() {
    if (P.press) {
      const p = P.press;
      P.press = null;
      if (p.mode === "drag") dragEnd();
      if (p.mode === "hug") hugEnd();
    }
  }
  const wheel = { ticks: [] as number[] };
  function onWheel(e: WheelEvent) {
    const [wx, wy] = clientToWorld(e.clientX, e.clientY);
    if (!hitInfo(wx, wy, 6).hit) return;
    e.preventDefault();
    inputSeen("sudden");
    wheel.ticks.push(rt);
    while (wheel.ticks.length && rt - wheel.ticks[0] > 1.5) wheel.ticks.shift();
    face.lookAt(60 + (face.get("body.x") || 0), 66 + (e.deltaY > 0 ? 300 : -300));
    cancel("wheel");
    after(0.5, () => face.lookAt(null), "wheel");
    if (wheel.ticks.length > 12) {
      wheel.ticks.length = 0;
      report("shake", 0.3);
      setAcute("Dead", 1.2);
      emit("star", { count: 3, orbit: { cx: 60, cy: -6, r: 22, ry: 0.27, speed: 4.5 }, life: 1.2 }, true);
    }
  }
  function onKey(e: KeyboardEvent) {
    if (e.target !== stage) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      poke({ hx: rand(30, 90), hy: 90, region: "face" });
    }
    const dirs: Record<string, [number, number]> = { ArrowLeft: [-300, 66], ArrowRight: [420, 66], ArrowUp: [60, -300], ArrowDown: [60, 400] };
    if (dirs[e.key]) {
      e.preventDefault();
      face.lookAt(dirs[e.key][0], dirs[e.key][1]);
      inputSeen("gentle");
      cancel("look");
      after(1.2, () => face.lookAt(null), "look");
    }
  }
  function onTouchStart(e: TouchEvent) {
    const t = e.touches[0];
    if (!t) return;
    cacheRect();
    const [wx, wy] = clientToWorld(t.clientX, t.clientY);
    if (hitInfo(wx, wy, 8).hit) e.preventDefault();
  }
  function onTouchMove(e: TouchEvent) {
    if (P.press) e.preventDefault();
  }
  const onContext = (e: Event) => e.preventDefault();
  const onDocLeave = (e: MouseEvent) => {
    if (!e.relatedTarget) onLeave();
  };

  // ------------------------------------------------------------------ gaze manager (cursor tracking + eye contact)
  const gaze: any = { contactSince: null, awayUntil: 0, glanceUntil: 0, gx: 0, gy: 0 };
  function glanceAtWorld(wx: number, wy: number, dur?: number, lean = 0.15) {
    gaze.glanceUntil = rt + (dur || 0.4);
    gaze.gx = wx;
    gaze.gy = wy;
    gaze.lean = lean;
    face.lookAt(wx, wy, { lean });
  }
  function gazeUpdate() {
    if (rt < gaze.glanceUntil) {
      face.lookAt(gaze.gx, gaze.gy, { lean: gaze.lean ?? 0.15 });
      return;
    }
    if (gaze.glanceUntil && rt - gaze.glanceUntil < 0.05) {
      gaze.glanceUntil = 0;
      face.lookAt(null);
    }
    if (drag.on || airborne() || (Dir.act && ["lookAround", "glanceAtCursor", "peekRoof", "daydream", "suspicious", "peekaboo", "lookUp"].includes(Dir.name))) return;
    if (conv.phase === "wait" || (ctl.system && ctl.system.tag === "typing")) return;
    if (M.asleep || shown === "Sleeping" || shown === "Dead" || shown === "Initializing" || shown === "Angry" || shown === "Sad") return;
    if (R.name === "sulk") {
      face.lookAt(-300, 80);
      return;
    }
    if (!P.inside || P.type !== "mouse") return;
    if (rt < gaze.awayUntil) {
      face.lookAt(null);
      return;
    }
    if (gaze.contactSince == null) gaze.contactSince = rt;
    if (rt - gaze.contactSince > rand(1.5, 3) && P.speed < 40 && Math.random() < 0.3) {
      gaze.awayUntil = rt + rand(0.6, 1.2);
      gaze.contactSince = null;
      return;
    }
    if (P.speed > 40) gaze.contactSince = rt;
    face.lookAt(P.wx, P.wy, { lean: P.lean });
  }

  // ------------------------------------------------------------------ weather + day/night (the light of the room)
  /** The top of the scene, a little to his right: where he looks to check the sky. */
  function skyWorld(): [number, number] {
    return [60 + (face.get("body.x") || 0) + 30, view.y0 + 6];
  }
  function weatherKind(c: string | null = condition) {
    switch (c) {
      case "rainy":
      case "pouring":
      case "hail":
        return "rain";
      case "lightning":
      case "lightning-rainy":
        return "storm";
      case "snowy":
      case "snowy-rainy":
        return "snow";
      case "sunny":
        return "sun";
      case "fog":
        return "fog";
      case "windy":
      case "windy-variant":
        return "wind";
      case "cloudy":
      case "partlycloudy":
        return "cloud";
      default:
        return "clear";
    }
  }
  function glanceSky(dur: number) {
    const w = skyWorld();
    glanceAtWorld(w[0], w[1], dur, 0.5);
  }
  function applyWeatherBias() {
    const k = weatherKind();
    W.V = k === "sun" && (phase === "day" || phase === "dawn") ? 0.12 : 0;
    W.A = k === "storm" ? 0.05 : k === "snow" ? 0.05 : 0;
    W.E = 0;
    mergeMood();
  }
  let lastLightning = -9;
  function setAmbience(ph: Phase, cond: string | null, initial: boolean) {
    const prevPhase = phase,
      prevKind = weatherKind(condition);
    phase = ph;
    condition = cond;
    applyWeatherBias();
    if (!backend) B.E = clamp01(B.E); // local energy drifts toward the new base by itself
    if (initial || !started) return;
    const k = weatherKind(cond);
    if (prevPhase !== ph && ph === "dawn" && M.asleep && auto) after(rand(4, 12), () => {
      if (M.asleep) wake("gentle", true);
    });
    if (k === prevKind || M.asleep || ctl.system) return;
    if (k === "rain") {
      weatherFx("rain", 3.4);
      after(0.9, () => {
        if (Math.random() < 0.6) say(pick(T("rain")), { short: true });
      });
    } else if (k === "snow") {
      weatherFx("snow", 2.6);
      after(0.5, () => {
        hop(0.8);
        emit("sparkle", { count: 3, x: 60, y: 10, spread: 80, life: 0.6, color: face.bodyColor });
        say(pick(T("snow")), { short: true });
      });
      nudge({ A: 0.15 });
    } else if (k === "storm") {
      // the panel flashes the room first, then calls lightning()
    } else if (k === "sun" && (ph === "day" || ph === "dawn")) {
      weatherFx("sun", 2.8);
      after(0.5, () => {
        glowUntil = rt + 1.6;
        if (prevKind === "rain" || prevKind === "storm") say(pick(T("sun")), { short: true });
      });
    } else if (k === "fog" || k === "wind") {
      glanceSky(1.2);
      if (k === "wind" && auto) after(0.8, () => startAct("shiver"));
    }
  }
  // Weather is not a problem: orange, red and grey mean a status in Casita's design, so
  // these reactions never change the expression (and the body colour). They play on
  // the features over whatever he shows: drooping lids and a slow look outside for rain,
  // shiny eyes and a hop for snow, a soft smile for sun.
  const wx: { kind: string | null; t0: number; dur: number; from: [number, number] } = { kind: null, t0: 0, dur: 0, from: [60, 66] };
  function weatherFx(kind: string, dur: number) {
    Object.assign(wx, { kind, t0: rt, dur, from: [60 + (face.get("body.x") || 0), 66 + (face.get("body.y") || 0)] });
  }
  function weatherFxUpdate() {
    Lwx.clear();
    if (!wx.kind) return;
    const t = rt - wx.t0;
    if (t >= wx.dur || ctl.system || M.asleep || drag.on || airborne()) {
      wx.kind = null;
      return;
    }
    const k = smooth(t / 0.6) * (1 - smooth((t - (wx.dur - 0.7)) / 0.7));
    const w = skyWorld();
    if (wx.kind === "rain") {
      Lwx.add({ "eyeL.top": 0.32 * k, "eyeR.top": 0.32 * k, "body.sy": -0.02 * k, "mouth.s": -0.08 * k, "mouth.bH": -3 * k });
      // a slow look up at the sky, then back
      if (t < wx.dur - 0.6) {
        const u = smooth((t - 0.15) / 1.5);
        glanceAtWorld(lerp(wx.from[0], w[0], u), lerp(wx.from[1], w[1], u), 0.1, 0.35);
      }
    } else if (wx.kind === "snow") {
      Lwx.add({ "eyeL.shine": k, "eyeR.shine": k, "eyeL.s": 0.12 * k, "eyeR.s": 0.12 * k, "body.sy": 0.02 * k });
      if (t < 1.2) glanceAtWorld(w[0], w[1], 0.1, 0.6);
    } else if (wx.kind === "sun") {
      Lwx.add({ "eyeL.bot": 0.15 * k, "eyeR.bot": 0.15 * k, "mouth.bH": 2.5 * k, "mouth.s": 0.06 * k });
      if (t < 1.1) glanceAtWorld(w[0], w[1], 0.1, 0.5);
    }
  }
  function lightning() {
    if (!started || rt - lastLightning < 4) return;
    lastLightning = rt;
    if (M.asleep) {
      if (Math.random() < 0.3) {
        inputSeen("sudden");
        say(pick(T("thunder")), { short: true });
      }
      return;
    }
    if (ctl.system) return;
    // startled, without the red of Scared: weather is not a status
    setAcute("Alert", 0.9);
    face.impulse({ y: -120 * RMK, sy: 2 * RMK });
    face.layer("thunder", { priority: 34 }).set({ "eyeL.s": 1.2, "eyeR.s": 1.2 }).ttl(450);
    popBang();
    nudge({ A: 0.15 });
    after(0.9, () => glanceSky(1));
  }

  // ------------------------------------------------------------------ visibility (misses you)
  let hiddenAt: number | null = null;
  function onVisibility() {
    if (document.hidden) {
      hiddenAt = Date.now();
      saveMem();
      stopLoop();
      return;
    }
    if (running) startLoop();
    if (hiddenAt == null) return;
    const away = (Date.now() - hiddenAt) / 1000;
    hiddenAt = null;
    if (away > 300) nudge({ V: -0.1 });
    if (conv.phase) return;
    if (away < 30) setAcute("Alert", 0.4);
    else if (away < 300) {
      if (M.asleep) wake("gentle");
      setAcute("Happy", 1.5);
      after(0.3, () => say(T("back"), { short: true }));
    } else {
      M.asleep = true;
      after(0.6, () => {
        wake("gentle", true);
        report("greet", 0.5);
        after(2.6, () => {
          if (M.F > 0.6) {
            setAcute("Pleading", 0.9);
            after(0.9, () => {
              setAcute("Loving", 2);
              say(T("missed"), { short: true });
            });
          } else setAcute("Happy", 1.4);
        });
      });
    }
    lastInput = at;
  }

  // ------------------------------------------------------------------ greeting
  function greet() {
    const now = Date.now();
    const since = mem.lastSeen ? (now - mem.lastSeen) / 1000 : null;
    mem.visits = (mem.visits || 0) + 1;
    if (!mem.firstSeen) mem.firstSeen = now;
    const night = isNight();
    if (since == null) {
      show("Initializing", { noBlink: true });
      boot(() => {
        setAcute("Alert", 0.8);
        after(0.8, () => {
          say(T("hello"));
          setAcute("Happy", 2.4);
        });
      });
      report("greet", 0.6);
    } else if (night && since > 600) {
      M.asleep = true;
      show("Sleeping", { noBlink: true });
      after(1.2, () => {
        wake("gentle", true);
        after(2.4, () => say(T("late"), { short: true }));
      });
      report("greet", 0.3);
    } else if (since < 600) {
      setAcute("Happy", 1.2);
      face.blink();
    } else if (since < 86400) {
      setAcute("Happy", 2);
      after(0.5, () => say(userName ? Tn("reName", userName) : T("re"), { short: true }));
      report("greet", 0.5);
    } else if (M.F > 0.5) {
      setAcute("Loving", 2.4);
      after(0.4, () => {
        emit("heart", { count: 3, x: 60, y: 0, spread: 70 });
        say(T("missed"), { short: true });
      });
      report("greet", 0.8);
    } else {
      setAcute("Pleading", 1);
      after(1, () => {
        setAcute("Smiling", 2);
        say(T("shyHi"), { short: true });
      });
      report("greet", 0.6);
    }
    if (mem.visits % 10 === 0)
      after(2.5, () => {
        startAct("tinyDance");
        for (let i = 0; i < 24; i++) face.emit("dot", { x: rand(0, 120), y: -10, vx: rand(-30, 30), vy: rand(-60, -20), gravity: 120, life: 1.2, color: i % 2 ? FACE : face.bodyColor, s0: 0.9, s1: 0.6 });
      });
    saveMem();
  }

  // ------------------------------------------------------------------ main loop
  let raf = 0,
    last = 0,
    lastSave = 0,
    running = false,
    started = false;
  function frame(ts: number) {
    raf = requestAnimationFrame(frame);
    if (!last) last = ts;
    const dt = Math.min(0.05, (ts - last) / 1000);
    last = ts;
    frameDt = dt;
    rt += dt;
    at += dt;
    // no pointermove for a while: the pointer is still, so its speed falls to zero by ~120 ms
    if (rt - P.lastMove > 0.12) {
      P.speed = 0;
      P.vx = 0;
      P.vy = 0;
    } else if (rt - P.lastMove > 0.04) {
      const k = Math.exp(-dt / 0.03);
      P.vx *= k;
      P.vy *= k;
      P.speed *= k;
    }
    runTimers();
    moodUpdate(dt);
    Lmood.clear();
    convUpdate();
    autoUpdate();
    if (auto) {
      director();
      boredomUpdate();
    }
    if (M.asleep && auto && at > sleepWakeAt && !ctl.system && !isNight()) wake("gentle", true);
    dozeUpdate();
    actsUpdate();
    reactUpdate(dt);
    hugUpdate();
    petUpdate(dt);
    tickleUpdate(dt);
    shyUpdate();
    dragUpdate();
    flyUpdate(dt);
    physUpdate(dt);
    weatherFxUpdate();
    gazeUpdate();
    missUpdate();
    // missing you: pointer gone a long while and Casita is fond of the viewer
    if (auto && P.type === "mouse" && !P.inside && P.leftAt != null && rt - P.leftAt > 20 && M.F > 0.5 && !ctl.miss && !conv.phase) ctl.miss = true;
    // night: a little droopy when nothing happens
    if (isNight() && !M.asleep && !ctl.system && !ctl.acute && !doze.on && at - lastInput > 8) Lmood.add({ "eyeL.top": 0.1, "eyeR.top": 0.1 });
    // expression resolution
    want.glow = rt < glowUntil ? 1 : 0;
    want.vein = 0;
    want.cloud = 0;
    want.dots = want.dots && shown === "WTF" ? want.dots : 0;
    want.scan = R.name === "boot" ? want.scan : 0;
    if (!pet.on && !hug && !shy.on && !tickle.on) want.blush = 0;
    if (shy.on) want.blush = 1;
    const id = desired();
    if (id !== shown) show(id, { startle: ctl.acute && ctl.acute.id === "Alert" && shown === "Sleeping" });
    Ls.clear();
    Lsp.clear();
    if (shown !== "Dead" && shown !== "Hurt") want.bandage = (fly.hard >= 2 || phys.hard >= 2) && rt - shownAt < 4 ? want.bandage : 0;
    const f = SIG[shown];
    if (f) f(sig);
    if (shown === "Initializing") want.scan = 1;
    talkUpdate();
    hopUpdate();
    safetyClamp();
    face.step(dt);
    renderExtras(dt);
    if (talk.on || !bubble.hidden) placeBubble();
    if (rt - lastSave > 30) {
      lastSave = rt;
      saveMem();
    }
  }
  function startLoop() {
    if (raf || document.hidden) return;
    last = 0;
    raf = requestAnimationFrame(frame);
  }
  function stopLoop() {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  }

  // listeners
  const docOpts = { passive: true } as AddEventListenerOptions;
  stage.addEventListener("pointerdown", onDown);
  stage.addEventListener("keydown", onKey);
  stage.addEventListener("wheel", onWheel, { passive: false });
  stage.addEventListener("touchstart", onTouchStart, { passive: false });
  stage.addEventListener("touchmove", onTouchMove, { passive: false });
  stage.addEventListener("contextmenu", onContext);
  document.addEventListener("pointermove", onMove, docOpts);
  document.addEventListener("pointerup", onUp);
  document.addEventListener("pointercancel", onCancel);
  document.documentElement.addEventListener("pointerleave", onLeave);
  document.addEventListener("mouseout", onDocLeave);
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("scroll", cacheRect, docOpts);
  window.addEventListener("devicemotion", onMotion, docOpts);
  stage.addEventListener("touchend", askMotion, docOpts);
  stage.addEventListener("click", askMotion);

  readTokens();
  layout();
  face.step(0.016);

  const api: Life = {
    start() {
      running = true;
      started = true;
      startLoop();
    },
    stop() {
      running = false;
      stopLoop();
      saveMem();
    },
    destroy() {
      api.stop();
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("keydown", onKey);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
      stage.removeEventListener("contextmenu", onContext);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onCancel);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("mouseout", onDocLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", cacheRect);
      window.removeEventListener("devicemotion", onMotion);
      stage.removeEventListener("touchend", askMotion);
      stage.removeEventListener("click", askMotion);
    },
    layout() {
      layout();
      readTokens();
      if (!bubble.hidden) placeBubble();
    },
    setLang(l) {
      if (l === lang) return;
      lang = l;
      S = STRINGS[l];
    },
    setUserName(n) {
      userName = n;
    },
    setAutonomous(on) {
      auto = on;
      if (!on) {
        endAct(true);
        endDoze();
        ctl.flavor = null;
        if (M.asleep || R.name === "fallAsleep") {
          react(null);
          wake("gentle", true);
        }
      } else lastInput = at;
    },
    setMood,
    setAmbience,
    lightning,
    greet,
    typing(value, keywords = true) {
      conv.typingAt = rt;
      if (!value) kw.fired.clear();
      else if (!conv.phase && keywords) keywordCheck(value);
    },
    inputFocus(focused) {
      inputFocused = focused;
      if (focused) {
        const inp = host.input();
        if (inp) {
          const r = inp.getBoundingClientRect();
          const [wx, wy] = clientToWorld(r.left + 40, r.top + r.height / 2);
          glanceAtWorld(wx, wy, 0.4);
        }
      }
    },
    userSent,
    listen,
    voice(active) {
      conv.voice = active;
      if (active && conv.phase === "listen") {
        face.impulse({ y: -40 * RMK });
        face.blink({ close: 60, hold: 30, open: 100 });
      }
      if (!active && conv.phase === "listen") face.impulse({ rot: 10 * RMK, y: 30 * RMK });
    },
    voiceLevel(rms) {
      conv.level = Math.max(conv.level, clamp01((rms - 0.01) * 8));
    },
    think,
    streamText,
    reply,
    speak,
    speechEnded,
    speechFailed,
    fail,
    endConversation,
    setOffline,
    satellite,
    react: reactExternal,
    get expression() {
      return shown;
    },
    get conversing() {
      return !!conv.phase;
    },
    get talking() {
      return talk.on;
    },
    anchorPx() {
      const top = face.houseToWorld(60, 0);
      return toPx(top[0], top[1]);
    },
    houseToPx(hx, hy) {
      const w = face.houseToWorld(hx, hy);
      return toPx(w[0], w[1]);
    },
    debug() {
      return {
        expression: shown, source: ctl.source, phase: conv.phase, talk: talk.on ? { kind: talk.kind, mode: talk.mode, text: talk.text, rev: talk.rev } : null,
        motion: {
          secure: window.isSecureContext, permission: motionPerm, events: motionEvents, sign: motionSign(), live: phys.live, sleep: phys.sleep,
          x: Math.round(phys.x - 60), y: Math.round(phys.y - body.cy), rot: Math.round((phys.th * 180) / Math.PI), speed: Math.round(Math.hypot(phys.vx, phys.vy)),
          touch: phys.touch, shaking: mo.shaking,
        },
        mood: { ...M }, backend, delta: { ...D }, weather: condition, dayPhase: phase, weatherFx: wx.kind, glance: rt < gaze.glanceUntil ? { x: gaze.gx, y: gaze.gy, top: view.y0, height: view.h } : null, bodyColor: face.bodyColor, asleep: M.asleep, act: Dir.name, reaction: R.name, auto,
      };
    },
  };
  return api;
}
