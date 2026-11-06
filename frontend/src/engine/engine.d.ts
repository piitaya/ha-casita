/** Types for the Casita face engine (engine.js). See ENGINE.md in the demo for details. */

export type ParamValues = Record<string, number>;

export interface FaceLayer {
  set(values: ParamValues, weight?: number): FaceLayer;
  add(values: ParamValues, weight?: number): FaceLayer;
  unset(...keys: string[]): FaceLayer;
  clear(): FaceLayer;
  weight(w: number, ms?: number): FaceLayer;
  ttl(ms: number): FaceLayer;
  remove(): void;
  readonly weightValue: number;
  /** Free slots used by behaviours (e.g. boot sequence flags). */
  [flag: string]: unknown;
}

export interface EmitOptions {
  x?: number;
  y?: number;
  count?: number;
  spread?: number;
  vx?: number;
  vy?: number;
  gravity?: number;
  drag?: number;
  life?: number;
  s0?: number;
  s1?: number;
  color?: string;
  sway?: number;
  vrot?: number;
  fadeOut?: number;
  orbit?: { cx: number; cy: number; r: number; ry?: number; speed?: number };
  space?: "house" | "world";
}

export interface BlinkOptions {
  eye?: "both" | "L" | "R";
  close?: number;
  hold?: number;
  open?: number;
  double?: boolean;
}

export interface FaceElements {
  svg: SVGSVGElement;
  world: SVGGElement;
  body: SVGGElement;
  house: SVGPathElement;
  face: SVGGElement;
  eyes: SVGPathElement[];
  mouth: SVGPathElement;
  tongue: SVGPathElement;
  particles: SVGGElement;
}

export interface Face {
  readonly el: FaceElements;
  readonly expression: string;
  readonly frozen: boolean;
  readonly lifeOn: boolean;
  readonly clock: number;
  readonly bodyColor: string;
  readonly gazeLean: { habituation: number; explicit: number | null };
  readonly params: string[];
  setExpression(
    id: string,
    o?: { spring?: string; stagger?: boolean; staggerScale?: number; instant?: boolean; life?: unknown }
  ): Face;
  layer(name: string, o?: { priority?: number; post?: boolean }): FaceLayer;
  lookAt(x: number | null, y?: number, o?: { lean?: number }): Face;
  blink(o?: BlinkOptions): Face;
  wink(side: "L" | "R"): Face;
  impulse(o: Partial<Record<"x" | "y" | "rot" | "sx" | "sy" | "skew" | "fx" | "fy", number>>): Face;
  squash(amount: number, ms: number): Face;
  life(on?: boolean): Face;
  setLife(p: Record<string, unknown>): Face;
  freeze(on?: boolean): Face;
  accessory(name: string, on: boolean | number | null): Face;
  emit(kind: string, o?: EmitOptions): void;
  tint(hex: string | null, w?: number): Face;
  setPalette(p: Record<string, string>): Face;
  setState(key: string, v: number, speed?: number): Face;
  spring(target: string, kc: { k?: number; c?: number } | null): Face;
  get(key: string): number;
  target(key: string): number;
  velocity(key: string): number;
  houseToWorld(x: number, y: number): [number, number];
  worldToHouse(x: number, y: number): [number, number];
  clientToSvg(cx: number, cy: number): [number, number];
  on(evt: string, fn: (...args: unknown[]) => void): Face;
  off(evt: string, fn: (...args: unknown[]) => void): Face;
  step(dt: number): Face;
  start(): void;
  stop(): void;
  destroy(): void;
}

export interface CreateOptions {
  expression?: string;
  life?: boolean;
  autoplay?: boolean;
  viewBox?: string;
  reducedMotion?: boolean | null;
  floor?: number | null;
  palette?: Record<string, string> | null;
}

export interface ExpressionInfo {
  id: string;
  label: string;
  color: string;
}

export declare const Casita: {
  hexToOklab(hex: string): [number, number, number];
  oklabToRgb(L: number, a: number, b: number): [number, number, number];
  create(svg: SVGSVGElement, options?: CreateOptions): Face;
  EXPRESSIONS: ExpressionInfo[];
  POSES: Record<string, unknown>;
  COLORS: Record<"blue" | "red" | "orange" | "gray", string>;
  FACE: string;
  HOUSE_D: string;
  SHAPES: string[];
  PARAMS: string[];
  PRESETS: string[];
  LIFE_DEFAULT: Record<string, unknown>;
};
