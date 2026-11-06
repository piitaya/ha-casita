/* Casita — parametric face engine for the Home Assistant house mascot.
 * Ported verbatim from the web demo (engine.js, verified pixel-faithful to the 28
 * original drawings); only the IIFE/global wrapper became an ES module export.
 * No dependencies. Every frame is generated from numbers (springs + layers),
 * so any expression blends into any other. See ENGINE.md for the API.
 */
/* eslint-disable */

const NS = 'http://www.w3.org/2000/svg';
const HOUSE_D = 'M120,109.38c0,4.12-3.38,7.5-7.5,7.5H7.5c-4.12,0-7.5-3.38-7.5-7.5v-45c0-4.12,2.39-9.89,5.3-12.8L54.7,2.19c2.92-2.92,7.69-2.92,10.61,0l49.39,49.39c2.92,2.92,5.3,8.68,5.3,12.8v45Z';
const FACE = '#f2f4f9';
const COLORS = { blue: '#18bcf2', red: '#ed1c24', orange: '#f7931e', gray: '#999999' };
const PX = 60, PY = 116.88;                 // body pivot: bottom centre of the house
const EYE_R = 8, EYE_N = 120, MOUTH_M = 90, TONGUE_M = 40;
const TAU = Math.PI * 2;

// Accessory artwork, kept exactly as in the original files.
const WIFI_INNER = 'M108.97,24.83h-5.52c0-4.56-3.71-8.28-8.28-8.28v-5.52c7.61,0,13.79,6.19,13.79,13.79Z';
const WIFI_OUTER = 'M120,24.83h-5.52c0-10.65-8.66-19.31-19.31-19.31V0c13.69,0,24.83,11.14,24.83,24.83Z';
const QUESTION = 'M111.91,12.57c0,2.03-.66,3.7-1.99,5.03-.69.69-1.37,1.31-2.05,1.87-.85.69-1.46,1.25-1.81,1.68s-.56.9-.62,1.4v.69h-4.52v-.91c.02-.48.09-.93.22-1.35s.27-.78.44-1.09.42-.64.74-1,.63-.66.92-.92.68-.6,1.19-1.02c.73-.6,1.29-1.09,1.67-1.47s.68-.8.91-1.23.34-.9.34-1.4c0-.86-.3-1.59-.89-2.18s-1.37-.89-2.34-.89c-1.04,0-1.9.33-2.58,1s-1.03,1.48-1.03,2.45h-4.58c0-2.25.78-4.14,2.34-5.67s3.5-2.29,5.82-2.29c1.44,0,2.75.29,3.93.88s2.13,1.44,2.84,2.56c.71,1.12,1.06,2.41,1.06,3.86ZM106.06,26.89c0,.71-.25,1.3-.76,1.78s-1.16.72-1.95.72-1.4-.24-1.91-.73-.77-1.07-.77-1.77.26-1.3.77-1.79,1.15-.74,1.91-.74,1.4.25,1.93.74.79,1.09.79,1.79Z';
const ZED = 'M93.5,21.29l9.04-9.55h-9.04v-4.91h16v4.95l-9.27,9.51h9.27v4.95h-16v-4.95Z';
const BUBBLES = [[91.66, 28.34, 3.66], [100.8, 19.2, 5.49], [112.69, 7.31, 7.31]];
const TEAR = [92, 90.885, 6];
const SWEAT = [[104, 91.885, 6], [16, 100.885, 6]];

// Particle shapes, centred on the origin.
const SHAPES = {
  heart: 'M0,-9.77c-3.12,-3.12 -8.19,-3.12 -11.31,0c-3.12,3.12 -3.12,8.19 0,11.31L0,12.86L11.31,1.54c3.12,-3.12 3.12,-8.19 0,-11.31c-3.12,-3.12 -8.19,-3.12 -11.31,0Z',
  z: 'M-8,4.76l9.04,-9.55h-9.04v-4.91h16v4.95l-9.27,9.51h9.27v4.95h-16v-4.95Z',
  sparkle: 'M0,-7C1,-1.4 1.4,-1 7,0C1.4,1 1,1.4 0,7C-1,1.4 -1.4,1 -7,0C-1.4,-1 -1,-1.4 0,-7Z',
  star: (() => { let d = ''; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 2.6 : 6.4; d += (i ? 'L' : 'M') + (r * Math.cos(a)).toFixed(2) + ',' + (r * Math.sin(a)).toFixed(2); } return d + 'Z'; })(),
  steam: 'M-4,0a4,4 0 1,0 8,0a4,4 0 1,0 -8,0Z',
  tear: 'M0,-8.49L4.24,-4.24A6,6 0 1,1 -4.24,-4.24Z',
  note: 'M0,-9C2,-7 6,-6.5 5,-2C4.5,-4.5 2.5,-5 1.6,-5L1.6,5.2C1.6,7.6 -1.2,9 -3.6,8.6C-6.2,8.2 -6.6,5.6 -4.4,4.2C-2.8,3.2 -1,3.2 0,3.8Z',
  dot: 'M-2.5,0a2.5,2.5 0 1,0 5,0a2.5,2.5 0 1,0 -5,0Z',
  puff: 'M-7.5,3.2a3.6,3.6 0 0,1 0.6,-6.4a4.6,4.6 0 0,1 8.4,-2.6a4,4 0 0,1 6.6,3.4a3.2,3.2 0 0,1 -0.8,5.6Z',
};

// ---------- small helpers ----------
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const clamp01 = (v) => clamp(v, 0, 1);
const lerp = (a, b, t) => a + (b - a) * t;
const rand = (a, b) => a + Math.random() * (b - a);
const smooth = (t) => { t = clamp01(t); return t * t * (3 - 2 * t); };
const f2 = (v) => (Math.abs(v) < 0.005 ? '0' : (Math.round(v * 100) / 100).toString());
const frac = (v) => v - Math.floor(v);
function hexToRgb(h) {
  h = String(h).replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
// OKLab (perceptual) colour space: body colour springs live here so crossfades stay clean.
const s2l = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4); };
const l2s = (c) => { c = clamp(c, 0, 1); c = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055; return clamp(Math.round(c * 255), 0, 255); };
function rgbToOklab(rgb) {
  const r = s2l(rgb[0]), g = s2l(rgb[1]), b = s2l(rgb[2]);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const q = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * q, 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * q, 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * q];
}
function oklabToRgb(L, a, b) {
  const l = L + 0.3963377774 * a + 0.2158037573 * b, m = L - 0.1055613458 * a - 0.0638541728 * b, q = L - 0.0894841775 * a - 1.2914855480 * b;
  const l3 = l * l * l, m3 = m * m * m, q3 = q * q * q;
  return [l2s(4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * q3), l2s(-1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * q3), l2s(-0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * q3)];
}
const hexToOklab = (h) => rgbToOklab(hexToRgb(h));
const FACE_LAB = hexToOklab(FACE);
function isObj(v) { return v && typeof v === 'object' && !Array.isArray(v); }
function merge(...src) {
  const out = {};
  for (const s of src) {
    if (!isObj(s)) continue;
    for (const k of Object.keys(s)) out[k] = isObj(s[k]) ? merge(out[k], s[k]) : s[k];
  }
  return out;
}

// ---------- precomputed radial outlines (heart / cross eyes) ----------
const COS = new Float64Array(EYE_N), SIN = new Float64Array(EYE_N);
for (let i = 0; i < EYE_N; i++) { COS[i] = Math.cos(TAU * i / EYE_N); SIN[i] = Math.sin(TAU * i / EYE_N); }

function rayDisk(ox, oy, dx, dy, cx, cy, r) {
  const px = ox - cx, py = oy - cy;
  const b = px * dx + py * dy, c = px * px + py * py - r * r;
  const disc = b * b - c;
  return disc < 0 ? 0 : -b + Math.sqrt(disc);
}
// Left heart, relative to the eye centre (33,65.88): union of two r8 disks and a diamond.
const HEART_O = [-4, -1.88];
const HEART_L = new Float64Array(EYE_N), HEART_R = new Float64Array(EYE_N), CROSS = new Float64Array(EYE_N);
(function () {
  const [ox, oy] = HEART_O, h = 8 * Math.SQRT2, dcx = -4, dcy = 1.665;
  for (let i = 0; i < EYE_N; i++) {
    const dx = COS[i], dy = SIN[i];
    let t = Math.max(rayDisk(ox, oy, dx, dy, -9.655, -3.995, 8), rayDisk(ox, oy, dx, dy, 1.655, -3.995, 8));
    let td = Infinity;
    for (const sx of [-1, 1]) for (const sy of [-1, 1]) {
      const den = sx * dx + sy * dy;
      if (den > 1e-9) td = Math.min(td, (h + sx * dcx + sy * dcy - (sx * ox + sy * oy)) / den);
    }
    if (td !== Infinity) t = Math.max(t, td);
    HEART_L[i] = t;
  }
  for (let i = 0; i < EYE_N; i++) HEART_R[i] = HEART_L[((EYE_N / 2 - i) % EYE_N + EYE_N) % EYE_N];
  // X eyes: two 6-wide bars, half-length 12·√2, rotated ±45°, centred 0.5 below the eye centre.
  const L = 12 * Math.SQRT2, W = 3;
  for (let i = 0; i < EYE_N; i++) {
    let best = 0;
    for (const a of [Math.PI / 4, -Math.PI / 4]) {
      const lx = COS[i] * Math.cos(a) + SIN[i] * Math.sin(a), ly = -COS[i] * Math.sin(a) + SIN[i] * Math.cos(a);
      best = Math.max(best, Math.min(Math.abs(lx) > 1e-9 ? L / Math.abs(lx) : Infinity, Math.abs(ly) > 1e-9 ? W / Math.abs(ly) : Infinity));
    }
    CROSS[i] = best;
  }
})();

function clipHalf(p, px, py, nx, ny) {
  const out = [], n = p.length;
  if (n < 6) return out;
  let ax = p[n - 2], ay = p[n - 1], da = (ax - px) * nx + (ay - py) * ny;
  for (let i = 0; i < n; i += 2) {
    const bx = p[i], by = p[i + 1], db = (bx - px) * nx + (by - py) * ny;
    if (db >= 0) {
      if (da < 0) { const t = da / (da - db); out.push(ax + (bx - ax) * t, ay + (by - ay) * t); }
      out.push(bx, by);
    } else if (da >= 0) {
      const t = da / (da - db); out.push(ax + (bx - ax) * t, ay + (by - ay) * t);
    }
    ax = bx; ay = by; da = db;
  }
  return out;
}
function polyD(p) {
  if (!p || p.length < 6) return '';
  let d = 'M' + f2(p[0]) + ',' + f2(p[1]);
  for (let i = 2; i < p.length; i += 2) d += 'L' + f2(p[i]) + ',' + f2(p[i + 1]);
  return d + 'Z';
}

// ---------- eye geometry ----------
// side: -1 left, +1 right.
function eyePoints(e, side) {
  const s = e.s;
  if (!(s > 0.01)) return null;
  const r = EYE_R * s;
  const heart = clamp01(e.heart), cross = clamp01(e.cross);
  const ht = side < 0 ? HEART_L : HEART_R;
  const hx = e.x + (side < 0 ? HEART_O[0] : -HEART_O[0]) * s, hy = e.y + HEART_O[1] * s;
  const cx = e.x, cy = e.y + 0.5 * s;
  let p = new Array(EYE_N * 2);
  for (let i = 0; i < EYE_N; i++) {
    const c = COS[i], sn = SIN[i];
    let x = e.x + r * c, y = e.y + r * sn;
    if (heart > 0) { const rh = ht[i] * s; x = lerp(x, hx + rh * c, heart); y = lerp(y, hy + rh * sn, heart); }
    if (cross > 0) { const rc = CROSS[i] * s; x = lerp(x, cx + rc * c, cross); y = lerp(y, cy + rc * sn, cross); }
    p[2 * i] = x; p[2 * i + 1] = y;
  }
  const shapeK = 1 - Math.max(heart, cross);           // lids fade out on heart / X eyes
  let top = clamp01(e.top) * shapeK, bot = clamp01(e.bot) * shapeK;
  if (top + bot > 1) { const k = 1 / (top + bot); top *= k; bot *= k; }
  if (top > 1e-3 || Math.abs(e.ang * shapeK) > 0.05) {
    const a = (side < 0 ? e.ang : -e.ang) * shapeK * Math.PI / 180;
    p = clipHalf(p, e.x, e.y - r + 2 * r * top, -Math.sin(a), Math.cos(a));
  }
  if (bot > 1e-3) p = clipHalf(p, e.x, e.y + r - 2 * r * bot, 0, -1);
  const open = Math.max(0.1, e.open);
  if (Math.abs(open - 1) > 1e-4) for (let i = 1; i < p.length; i += 2) p[i] = e.y + (p[i] - e.y) * open;
  return p;
}

// ---------- mouth geometry ----------
// A mouth is the region between a top curve and a bottom curve. Each curve is
// y0 + sign(h)·profile(x) over [cx-R, cx+R], where profile is the max of two
// rounded "humps" (half-width a, height |h|, corner radius min(|h|,a)) placed at cx±δ.
function hump(x, c, a, H) {
  if (a <= 1e-6 || H <= 1e-6) return 0;
  const d = Math.abs(x - c);
  if (d > a) return 0;
  const rho = Math.min(H, a), flat = a - rho;
  if (d <= flat) return H;
  const q = d - flat;
  return H - rho + Math.sqrt(Math.max(0, rho * rho - q * q));
}
function curve(out, cx, y0, R, a, h, dl, M, reverse) {
  R = Math.max(0, R); a = Math.max(0, a); dl = Math.max(0, dl);
  const H = Math.abs(h), sg = h < 0 ? -1 : 1;
  for (let i = 0; i < M; i++) {
    const k = reverse ? M - 1 - i : i;
    const x = cx - R * Math.cos(Math.PI * k / (M - 1));
    const P = dl > 1e-4 ? Math.max(hump(x, cx - dl, a, H), hump(x, cx + dl, a, H)) : hump(x, cx, a, H);
    out.push(x, y0 + sg * P);
  }
}
function mouthCentre(m) {
  return [m.x, (m.tY + m.bY) / 2 + (Math.max(m.tH, m.bH, 0) + Math.min(m.tH, m.bH, 0)) / 2];
}
function xformMouth(p, m) {
  const [mx, my] = mouthCentre(m);
  const s = m.s, a = m.rot * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a);
  if (Math.abs(s - 1) < 1e-4 && Math.abs(a) < 1e-5) return p;
  for (let i = 0; i < p.length; i += 2) {
    const dx = (p[i] - mx) * s, dy = (p[i + 1] - my) * s;
    p[i] = mx + dx * ca - dy * sa; p[i + 1] = my + dx * sa + dy * ca;
  }
  return p;
}
function mouthPoints(m) {
  if (!(m.s > 0.01)) return null;
  const talk = clamp(m.talk, 0, 1.6);
  const tH = m.tH - 5 * talk, bH = m.bH + 9 * talk;
  const bR = talk > 0 ? Math.max(m.bR, m.tR * talk + m.bR * (1 - talk)) : m.bR;
  const p = [];
  curve(p, m.x, m.tY, m.tR, m.tA, tH, m.tD, MOUTH_M, false);
  curve(p, m.x, m.bY, bR, Math.max(m.bA, talk > 0 ? lerp(m.bA, m.tA, clamp01(talk)) : 0), bH, m.bD, MOUTH_M, true);
  return xformMouth(p, m);
}
function tonguePoints(m) {
  const amt = m.tongue;
  if (!(amt > 0.01) || !(m.s > 0.01)) return null;
  const R = 12 * amt, H = Math.abs(m.tgH) * amt, up = m.tgH < 0;
  const y = m.tgY + (up ? 0 : 6 * clamp(m.talk, 0, 1.6));
  const p = [];
  if (!up) { curve(p, m.tgX, y - 1.2, R, R, 0, 0, TONGUE_M, false); curve(p, m.tgX, y, R, R, H, 0, TONGUE_M, true); }
  else { curve(p, m.tgX, y, R, R, -H, 0, TONGUE_M, false); curve(p, m.tgX, y + 1.2, R, R, 0, 0, TONGUE_M, true); }
  return xformMouth(p, m);
}
function dropD(cx, cy, r) {
  if (!(r > 0.05)) return '';
  const k = r * Math.SQRT1_2;
  return 'M' + f2(cx) + ',' + f2(cy - r * Math.SQRT2) + 'L' + f2(cx + k) + ',' + f2(cy - k) +
    'A' + f2(r) + ',' + f2(r) + ' 0 1 1 ' + f2(cx - k) + ',' + f2(cy - k) + 'Z';
}

// ---------- parameter schema ----------
const EYE_KEYS = ['x', 'y', 's', 'top', 'bot', 'ang', 'heart', 'cross', 'shine', 'open'];
const MOUTH_KEYS = ['x', 's', 'rot', 'tY', 'tR', 'tA', 'tH', 'tD', 'bY', 'bR', 'bA', 'bH', 'bD', 'tongue', 'tgX', 'tgY', 'tgH', 'talk'];
const ACC_KEYS = ['bubbles', 'wifi', 'question', 'z', 'tear', 'sweat'];
const SCHEMA = [];
['x', 'y', 'rot', 'sx', 'sy', 'skew'].forEach((k) => SCHEMA.push(['body.' + k, 'body']));
['L', 'A', 'B'].forEach((k) => SCHEMA.push(['body.' + k, 'color']));   // OKLab
['x', 'y'].forEach((k) => SCHEMA.push(['face.' + k, 'face']));
for (const e of ['eyeL', 'eyeR']) EYE_KEYS.forEach((k) => SCHEMA.push([e + '.' + k, k === 'x' || k === 'y' ? 'eyePos' : (k === 'top' || k === 'bot' || k === 'ang') ? 'lids' : 'eyes']));
SCHEMA.push(['dot.s', 'eyes']); SCHEMA.push(['dot.dy', 'eyePos']);
MOUTH_KEYS.forEach((k) => SCHEMA.push(['mouth.' + k, k === 'talk' ? 'talk' : 'mouth']));
ACC_KEYS.forEach((k) => SCHEMA.push(['acc.' + k, 'acc']));
const KEYS = SCHEMA.map((s) => s[0]);
const GROUP = SCHEMA.map((s) => s[1]);
const I = {}; KEYS.forEach((k, i) => { I[k] = i; });
const NP = KEYS.length;

const PRESETS = { snappy: [420, 30], soft: [150, 21], bouncy: [300, 13], heavy: [70, 12], crisp: [700, 52] };
const GROUP_SPRING = { body: [200, 17], color: [90, 19], face: [190, 24], eyes: [480, 34], lids: [520, 44], eyePos: [650, 46], mouth: [360, 29], talk: [1300, 66], acc: [230, 15] };
const PRESET_GROUPS = ['body', 'eyes', 'mouth', 'acc'];
const DELAY = { body: 0, color: 0, face: 0, eyes: 60, lids: 60, eyePos: 60, mouth: 110, talk: 110, acc: 170 };

// ---------- expressions ----------
const M = {
  smile: (y = 80.88) => ({ tY: y, tR: 13, tA: 13, tH: 13, tD: 0, bY: y, bR: 19, bA: 19, bH: 19, bD: 0 }),
  frown: (y = 96.88) => ({ tY: y, tR: 19, tA: 19, tH: -19, tD: 0, bY: y, bR: 13, bA: 13, bH: -13, bD: 0 }),
  openD: (y = 80.88) => ({ tY: y, tR: 20, tA: 20, tH: 0, tD: 0, bY: y, bR: 20, bA: 20, bH: 20, bD: 0 }),
  openFrown: (y = 94.88) => ({ tY: y, tR: 20, tA: 20, tH: -20, tD: 0, bY: y, bR: 20, bA: 20, bH: 0, bD: 0 }),
  O: (r, y) => ({ tY: y, tR: r, tA: r, tH: -r, tD: 0, bY: y, bR: r, bA: r, bH: r, bD: 0 }),
  line: (y) => ({ tY: y - 3, tR: 20, tA: 20, tH: 0, tD: 0, bY: y + 3, bR: 20, bA: 20, bH: 0, bD: 0 }),
  grin: () => ({ tY: 89.88, tR: 35, tA: 35, tH: -8, tD: 0, bY: 89.88, bR: 35, bA: 35, bH: 8, bD: 0 }),
  uwu: () => ({ tY: 80.88, tR: 19, tA: 5, tH: 5, tD: 8, bY: 80.88, bR: 19, bA: 11, bH: 11, bD: 8 }),
  none: () => Object.assign(M.smile(), { s: 0 }),
};
const tongue = (y, h = 12) => ({ tongue: 1, tgX: 68, tgY: y, tgH: h });

const LIFE_DEFAULT = {
  breath: { rate: 0.23, amp: 0.012 },
  blink: { on: true, min: 2200, max: 5600, double: 0.18, close: 95, hold: 45, open: 150 },
  saccade: { on: true, min: 650, max: 2600, range: 2.4, micro: 0.18 },
  sway: { amp: 0.55, rate: 0.28 },
  gaze: { eye: 4.2, face: 1.6, rot: 4, skew: -1.2, bx: 2 },
};
const OFF = { blink: { on: false }, saccade: { on: false } };

const POSES = {
  Normal: { label: 'Content', mouth: M.smile() },
  Alert: { label: 'Alerte', mouth: M.O(15, 87.88), spring: 'snappy', life: { blink: { min: 3200, max: 7000 }, saccade: { min: 350, max: 1200, range: 3.2 }, breath: { rate: 0.45, amp: 0.016 } } },
  Angry: { label: 'En colère', color: 'red', eyes: { top: 0.5 }, mouth: M.openFrown(94.88), spring: 'snappy', life: { breath: { rate: 0.5, amp: 0.02 }, saccade: { range: 1, min: 1500, max: 4000 }, blink: { min: 4000, max: 8000 }, sway: { amp: 0.25 } } },
  Scared: { label: 'Effrayé', color: 'red', mouth: M.openFrown(94.88), spring: 'snappy', life: { breath: { rate: 0.7, amp: 0.018 }, saccade: { min: 250, max: 900, range: 3.4 }, sway: { amp: 0.9, rate: 1.4 } } },
  Cheeky: { label: 'Taquin', mouth: Object.assign(M.line(83.88), tongue(86.88)), spring: 'bouncy' },
  DeadAss: { label: 'Blasé', eyeR: { top: 0.5 }, mouth: Object.assign(M.line(83.88), tongue(86.88)), life: { saccade: { range: 1.2, min: 2000, max: 5000 }, breath: { rate: 0.16 } } },
  Dead: { label: 'K.O.', color: 'red', eyes: { cross: 1 }, mouth: Object.assign(M.line(87.88), tongue(90.88)), life: merge(OFF, { breath: { rate: 0.12, amp: 0.006 }, sway: { amp: 0.2 } }) },
  Devious: { label: 'Malicieux', eyes: { top: 0.5 }, mouth: M.smile(), life: { saccade: { range: 1.8, min: 900, max: 2400 } } },
  Focusing: { label: 'Concentré', mouth: Object.assign(M.line(91.88), tongue(88.88, -12)), acc: { bubbles: 1 }, life: { saccade: { range: 1.2, min: 1400, max: 3600 }, blink: { min: 3500, max: 7000 } } },
  Grateful: { label: 'Reconnaissant', eyes: { bot: 0.5, y: 69.88 }, mouth: M.openD(76.88), spring: 'soft' },
  Grinning: { label: 'Rayonnant', mouth: M.grin(), spring: 'bouncy', life: { breath: { rate: 0.3, amp: 0.016 } } },
  Happy: { label: 'Heureux', mouth: M.openD(80.88), spring: 'bouncy', life: { breath: { rate: 0.3, amp: 0.016 } } },
  Hurt: { label: 'Blessé', color: 'red', eyes: { cross: 1 }, mouth: M.openFrown(98.88), spring: 'snappy', life: merge(OFF, { breath: { rate: 0.6, amp: 0.014 }, sway: { amp: 0.6, rate: 1.1 } }) },
  Initializing: { label: 'Démarrage', eyes: { s: 0 }, mouth: M.none(), life: OFF },
  Loading: { label: 'Chargement', dot: 1, mouth: M.none(), life: OFF },
  Loving: { label: 'Amoureux', eyes: { heart: 1 }, mouth: M.openD(80.88), spring: 'bouncy', life: { blink: { min: 2600, max: 5000, double: 0.35 }, saccade: { range: 1.4 }, breath: { rate: 0.2, amp: 0.016 } } },
  NoInternet: { label: 'Hors ligne', color: 'orange', mouth: M.frown(), acc: { wifi: 1 } },
  Pleading: { label: 'Suppliant', color: 'orange', eyes: { s: 1.5 }, mouth: M.frown(), acc: { tear: 1 }, spring: 'soft', life: { blink: { min: 1800, max: 3600, double: 0.5, close: 130, open: 220 }, saccade: { range: 1 } } },
  Problem: { label: 'Problème', color: 'orange', mouth: M.frown(), acc: { question: 1 } },
  Sad: { label: 'Triste', color: 'orange', mouth: M.frown(), spring: 'heavy', life: { breath: { rate: 0.17, amp: 0.01 }, saccade: { range: 1.6, min: 1500, max: 4000 }, blink: { close: 140, open: 240 } } },
  Silly: { label: 'Farceur', eyeR: { y: 59.88 }, mouth: Object.assign(M.line(83.88), tongue(86.88)), spring: 'bouncy' },
  Sleeping: { label: 'Endormi', color: 'gray', eyes: { top: 0.5 }, mouth: M.O(10, 86.88), acc: { z: 1 }, spring: 'heavy', life: merge(OFF, { breath: { rate: 0.13, amp: 0.03 }, sway: { amp: 0.3, rate: 0.15 } }) },
  Smiling: { label: 'Souriant', eyes: { bot: 0.5, y: 69.88 }, mouth: M.smile(), spring: 'soft' },
  Sweating: { label: 'En sueur', mouth: M.openD(80.88), acc: { sweat: 1 }, life: { breath: { rate: 0.55, amp: 0.016 }, saccade: { min: 400, max: 1400, range: 3 } } },
  UwU: { label: 'UwU', mouth: M.uwu(), spring: 'bouncy' },
  WTF: { label: 'WTF', color: 'orange', eyes: { top: 0.5 }, mouth: M.line(87.88), life: { saccade: { range: 0.8, min: 2500, max: 6000 } } },
  Winking: { label: "Clin d'œil", eyeR: { top: 0.5 }, mouth: M.openD(80.88), spring: 'bouncy' },
  WinkingSmile: { label: "Clin d'œil souriant", eyeR: { top: 0.5 }, mouth: M.smile(), spring: 'bouncy' },
};

function neutralTargets() {
  const t = {};
  Object.assign(t, { 'body.x': 0, 'body.y': 0, 'body.rot': 0, 'body.sx': 1, 'body.sy': 1, 'body.skew': 0, 'face.x': 0, 'face.y': 0, 'dot.s': 0, 'dot.dy': 0 });
  for (const [e, x] of [['eyeL', 33], ['eyeR', 87]]) {
    Object.assign(t, { [e + '.x']: x, [e + '.y']: 65.88, [e + '.s']: 1, [e + '.top']: 0, [e + '.bot']: 0, [e + '.ang']: 0, [e + '.heart']: 0, [e + '.cross']: 0, [e + '.shine']: 0, [e + '.open']: 1 });
  }
  Object.assign(t, { 'mouth.x': 60, 'mouth.s': 1, 'mouth.rot': 0, 'mouth.tongue': 0, 'mouth.talk': 0 });
  for (const k of ACC_KEYS) t['acc.' + k] = 0;
  return t;
}
// Pose → sparse target map (tongue anchor keys are omitted when unused so they keep their last value).
const POSE_T = {};
for (const id of Object.keys(POSES)) {
  const P = POSES[id], t = neutralTargets();
  const [cL, cA, cB] = hexToOklab(COLORS[P.color || 'blue']);
  t['body.L'] = cL; t['body.A'] = cA; t['body.B'] = cB;
  for (const e of ['eyeL', 'eyeR']) {
    const src = Object.assign({}, P.eyes || {}, P[e] || {});
    for (const k of Object.keys(src)) t[e + '.' + k] = src[k];
  }
  if (P.dot) t['dot.s'] = P.dot;
  for (const k of Object.keys(P.mouth || {})) t['mouth.' + k] = P.mouth[k];
  for (const k of Object.keys(P.acc || {})) t['acc.' + k] = P.acc[k];
  POSE_T[id] = t;
}
const EXPRESSIONS = Object.keys(POSES).map((id) => ({ id, label: POSES[id].label, color: COLORS[POSES[id].color || 'blue'] }));

// ---------- engine ----------
function create(svg, options) {
  const opt = Object.assign({ expression: 'Normal', life: true, autoplay: true, viewBox: '-50 -60 220 230', reducedMotion: null, floor: null, palette: null }, options || {});
  // theme colours for particles; the host page can pass its own (read from CSS tokens)
  const palette = Object.assign({ spark: '#ffd23f', star: '#ffd23f', steam: '#c9d3df', puff: '#ffffff', puffEdge: '#b9c6d2', shine: '#ffffff' }, opt.palette || {});
  const rm = (opt.reducedMotion != null ? opt.reducedMotion : (globalThis.matchMedia && globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches)) ? 0.4 : 1;

  // --- DOM ---
  while (svg.firstChild) svg.removeChild(svg.firstChild);
  svg.setAttribute('viewBox', opt.viewBox);
  if (!svg.getAttribute('role')) svg.setAttribute('role', 'img');
  const mk = (tag, attrs, parent) => {
    const n = document.createElementNS(NS, tag);
    for (const k in attrs) n.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(n);
    return n;
  };
  const gWorld = mk('g', { class: 'casita' }, svg);
  const gBody = mk('g', { class: 'casita-body' }, gWorld);
  const house = mk('path', { d: HOUSE_D, class: 'casita-house' }, gBody);
  const gFace = mk('g', { class: 'casita-face', fill: FACE }, gBody);
  const eyeEls = [mk('path', {}, gFace), mk('path', {}, gFace)];
  const shineEls = [0, 1, 2, 3].map(() => mk('circle', { r: 0 }, gFace));
  const dotEl = mk('circle', { cx: 60, cy: 65.88, r: 0 }, gFace);
  const mouthEl = mk('path', {}, gFace);
  const tongueEl = mk('path', {}, gFace);
  const tearEl = mk('path', {}, gFace);
  const gAcc = mk('g', { class: 'casita-acc' }, gBody);
  const sweatEls = SWEAT.map(() => mk('path', { fill: FACE }, gAcc));
  const bubbleEls = BUBBLES.map(([x, y]) => mk('circle', { cx: x, cy: y, r: 0 }, gAcc));
  const gWifi = mk('g', {}, gAcc);
  const wifiDot = mk('circle', { cx: 95.17, cy: 24.83, r: 2.76 }, gWifi);
  const wifiIn = mk('path', { d: WIFI_INNER }, gWifi);
  const wifiOut = mk('path', { d: WIFI_OUTER }, gWifi);
  const qEl = mk('path', { d: QUESTION }, gAcc);
  const zEls = [0, 1, 2].map(() => mk('path', { d: ZED }, gAcc));
  const gParticles = mk('g', { class: 'casita-particles' }, gWorld);

  // --- state ---
  const val = new Float64Array(NP), vel = new Float64Array(NP), tgt = new Float64Array(NP);
  const poseT = new Float64Array(NP), out = new Float64Array(NP);
  const K = new Float64Array(NP), C = new Float64Array(NP);
  const kOverride = {};
  let current = null, clock = 0, frozen = false, lifeOn = !!opt.life, destroyed = false;
  let pending = [];
  let userLife = {}, lp = merge(LIFE_DEFAULT);
  const layers = new Map(); let layerOrder = [];
  const listeners = {};
  let lookTarget = null, lookLean = null;
  // gaze habituation: the body straightens after the gaze rests on one spot for a while
  const hab = { ax: 0, ay: 0, since: 0, hold: 1700, fade: 1000, peak: 1, lastReset: -1e9, k: 1, init: false };
  // life state
  const noisePh = Array.from({ length: 8 }, () => rand(0, TAU));
  let breathPh = rand(0, TAU), accT = 0;
  let blinkNext = rand(800, 2500), saccNext = 400, microNext = 0;
  const sacc = { x: 0, y: 0 }, micro = { x: 0, y: 0 };
  const blinks = [null, null]; // per eye: {t0, close, hold, open}
  const blinkQueue = [];
  const warned = new Set();

  const init = Object.assign(neutralTargets(), { 'mouth.tgX': 68, 'mouth.tgY': 86.88, 'mouth.tgH': 12 });
  Object.assign(init, POSE_T[opt.expression] || POSE_T.Normal);
  KEYS.forEach((k, i) => { poseT[i] = init[k] != null ? init[k] : 0; val[i] = poseT[i]; });
  applySpring(null);

  function applySpring(preset) {
    for (let i = 0; i < NP; i++) {
      const g = GROUP[i];
      let kc = GROUP_SPRING[g];
      if (preset && PRESETS[preset] && PRESET_GROUPS.includes(g)) kc = PRESETS[preset];
      const ov = kOverride[KEYS[i]] || kOverride[g];
      if (ov) kc = [ov.k != null ? ov.k : kc[0], ov.c != null ? ov.c : kc[1]];
      K[i] = kc[0]; C[i] = kc[1];
    }
  }
  let activePreset = null;

  function emit(evt, ...args) { (listeners[evt] || []).slice().forEach((fn) => { try { fn(...args); } catch (e) { console.error(e); } }); }
  function idxOf(key) {
    const i = I[key];
    if (i == null && !warned.has(key)) { warned.add(key); console.warn('[Casita] unknown param', key); }
    return i;
  }

  // --- expressions ---
  function setExpression(id, o) {
    o = o || {};
    const P = POSE_T[id];
    if (!P) { console.warn('[Casita] unknown expression', id); return api; }
    const prev = current; current = id;
    lp = merge(LIFE_DEFAULT, POSES[id].life, userLife, o.life);
    activePreset = o.spring || POSES[id].spring || null;
    applySpring(activePreset);
    const stagger = o.stagger !== false && !o.instant && prev != null;
    const scale = o.staggerScale != null ? o.staggerScale : 1;
    pending = [];
    const byDelay = {};
    for (const k of Object.keys(P)) {
      const i = I[k]; if (i == null) continue;
      if (o.instant) { poseT[i] = P[k]; val[i] = P[k]; vel[i] = 0; continue; }
      const d = stagger ? DELAY[GROUP[i]] * scale : 0;
      if (d <= 0) { poseT[i] = P[k]; continue; }
      (byDelay[d] = byDelay[d] || []).push([i, P[k]]);
    }
    for (const d of Object.keys(byDelay)) pending.push({ at: clock + Number(d), items: byDelay[d] });
    if (prev !== id) emit('expression', id, prev);
    if (frozen) render(frozenOut());
    return api;
  }

  // --- layers ---
  function sortLayers() { layerOrder = [...layers.values()].sort((a, b) => a.priority - b.priority); }
  function layer(name, o) {
    o = o || {};
    let L = layers.get(name);
    if (!L) {
      L = { name, priority: o.priority || 0, post: !!o.post, w: 1, fade: null, setV: new Map(), addV: new Map(), expires: 0 };
      L.api = {
        set(obj, w) { for (const k in obj) { const i = idxOf(k); if (i != null) L.setV.set(i, obj[k]); } if (w != null) L.w = w; return L.api; },
        add(obj, w) { for (const k in obj) { const i = idxOf(k); if (i != null) L.addV.set(i, obj[k]); } if (w != null) L.w = w; return L.api; },
        unset(...ks) { for (const k of ks) { const i = I[k]; L.setV.delete(i); L.addV.delete(i); } return L.api; },
        clear() { L.setV.clear(); L.addV.clear(); L.expires = 0; return L.api; },
        weight(w, ms) { if (!ms) { L.w = w; L.fade = null; } else L.fade = { from: L.w, to: w, t0: clock, dur: ms }; return L.api; },
        ttl(ms) { L.expires = clock + ms; return L.api; },
        remove() { layers.delete(name); sortLayers(); },
        get weightValue() { return L.w; },
      };
      layers.set(name, L); sortLayers();
    } else {
      let resort = false;
      if (o.priority != null && o.priority !== L.priority) { L.priority = o.priority; resort = true; }
      if (o.post != null) L.post = !!o.post;
      if (resort) sortLayers();
    }
    return L.api;
  }
  function applyLayers(arr, post) {
    for (const L of layerOrder) {
      if (L.post !== post || L.w <= 0) continue;
      const w = L.w;
      L.setV.forEach((v, i) => { arr[i] = w >= 1 ? v : lerp(arr[i], v, w); });
      L.addV.forEach((v, i) => { arr[i] += v * w; });
    }
  }

  // --- life helpers ---
  const noise = (t, k) => 0.55 * Math.sin(t + noisePh[k]) + 0.3 * Math.sin(t * 2.13 + noisePh[k + 1]) + 0.15 * Math.sin(t * 4.37 + noisePh[k + 2]);
  function startBlink(which, o) {
    o = o || {};
    const b = lp.blink;
    const spec = { t0: clock, close: o.close || b.close, hold: o.hold != null ? o.hold : b.hold, open: o.open || b.open };
    if (which !== 'R') blinks[0] = Object.assign({}, spec);
    if (which !== 'L') blinks[1] = Object.assign({}, spec);
    return spec.close + spec.hold + spec.open;
  }
  function blinkValue(bk) {
    if (!bk) return 1;
    const t = clock - bk.t0;
    if (t < 0) return 1;
    if (t < bk.close) { const u = t / bk.close; return 1 - u * u; }
    if (t < bk.close + bk.hold) return 0;
    const u = (t - bk.close - bk.hold) / bk.open;
    if (u >= 1) return 1;
    // ease-out with a small overshoot (lid pops slightly past open)
    const c1 = 1.3, c3 = c1 + 1;
    return 1 + c3 * Math.pow(u - 1, 3) + c1 * Math.pow(u - 1, 2);
  }

  function gazeOffsets() {
    // returns eye offset (gx, gy) in house units
    let gx = 0, gy = 0;
    if (lookTarget) {
      const cx = PX + val[I['body.x']], cy = 70 + val[I['body.y']];
      const dx = lookTarget[0] - cx, dy = lookTarget[1] - cy, d = Math.hypot(dx, dy);
      if (d > 1e-3) { const k = d / (d + 38); gx = dx / d * k * lp.gaze.eye; gy = dy / d * k * lp.gaze.eye * 0.75; }
    } else if (lifeOn && lp.saccade.on) {
      gx = sacc.x; gy = sacc.y;
    }
    if (lifeOn && (lp.saccade.on || lookTarget)) { gx += micro.x; gy += micro.y; }
    return [gx * (lookTarget ? 1 : rm), gy * (lookTarget ? 1 : rm)];
  }

  // --- particles ---
  const particles = [];
  const pool = [];
  function spawnParticle(kind, o) {
    const shape = SHAPES[kind] || SHAPES.dot;
    let el = pool.pop();
    if (!el) { el = mk('path', {}, gParticles); }
    el.setAttribute('d', shape);
    el.style.display = '';
    const p = Object.assign({ kind, el, age: 0, life: 1.6, x: 60, y: 20, vx: 0, vy: -16, ax: 0, gravity: 0, drag: 0, rot: 0, vrot: 0, s0: 0.4, s1: 0.6, color: null, sway: 0, swayF: 3, swayPh: rand(0, TAU), fadeIn: 0.12, fadeOut: 0.35, orbit: null, opacity: 1 }, o);
    const col = p.color && palette[p.color] ? palette[p.color] : p.color;
    el.setAttribute('fill', col || bodyColor);
    const sk = p.stroke && palette[p.stroke] ? palette[p.stroke] : p.stroke;
    if (sk) { el.setAttribute('stroke', sk); el.setAttribute('stroke-width', p.strokeWidth || 1); el.setAttribute('vector-effect', 'non-scaling-stroke'); }
    else { el.removeAttribute('stroke'); el.removeAttribute('vector-effect'); }
    particles.push(p);
    return p;
  }
  const EMIT_DEFAULTS = {
    heart: { x: 60, y: 30, vy: -22, life: 1.9, s0: 0.22, s1: 0.42, sway: 4, spread: 18 },
    z: { x: 100, y: 18, vx: 7, vy: -14, life: 2.6, s0: 0.25, s1: 0.55, sway: 2.5, spread: 4 },
    sparkle: { x: 60, y: 50, vy: -6, life: 0.9, s0: 0.2, s1: 0.65, vrot: 120, spread: 50, color: 'spark' },
    star: { x: 60, y: 30, life: 2.2, s0: 0.75, s1: 0.75, vrot: 160, color: 'star' },
    steam: { x: 60, y: 4, vy: -18, life: 1.2, s0: 0.5, s1: 1.4, sway: 3, spread: 70, color: 'steam', fadeOut: 0.6 },
    puff: { x: 60, y: 4, vy: -16, life: 1.1, s0: 0.55, s1: 1.25, sway: 2.5, spread: 70, color: 'puff', stroke: 'puffEdge', strokeWidth: 1.2, fadeOut: 0.55 },
    tear: { x: 33, y: 72, vy: 4, gravity: 90, life: 1.1, s0: 0.45, s1: 0.4, color: FACE, fadeOut: 0.3 },
    note: { x: 78, y: 70, vx: 10, vy: -16, life: 1.8, s0: 0.45, s1: 0.6, sway: 3, spread: 10 },
    dot: { x: 60, y: 40, vy: -10, life: 1, s0: 0.6, s1: 0.2 },
  };
  function emitParticles(kind, o) {
    o = o || {};
    const base = Object.assign({}, EMIT_DEFAULTS[kind] || {}, o);
    const n = Math.max(1, Math.round((o.count || 1) * (rm < 1 ? 0.5 : 1)));
    const spread = base.spread || 0;
    const made = [];
    for (let k = 0; k < n; k++) {
      const p = Object.assign({}, base);
      const hx = base.x + (spread ? rand(-spread / 2, spread / 2) : 0), hy = base.y + (spread ? rand(-spread / 6, spread / 6) : 0);
      const w = base.space === 'world' ? [hx, hy] : houseToWorld(hx, hy);
      p.x = w[0]; p.y = w[1];
      p.vx = (base.vx || 0) + (spread ? rand(-4, 4) : 0); p.vy = (base.vy || 0) * (n > 1 ? rand(0.8, 1.2) : 1);
      p.life = base.life * (n > 1 ? rand(0.85, 1.15) : 1);
      if (base.orbit) p.orbit = Object.assign({ cx: 60, cy: 18, r: 34, ry: 0.35, speed: 3.2, phase: k * TAU / n }, base.orbit);
      if (p.orbit && base.space !== 'world') { const c = houseToWorld(p.orbit.cx, p.orbit.cy); p.orbit.cx = c[0]; p.orbit.cy = c[1]; }
      delete p.count; delete p.spread; delete p.space;
      made.push(spawnParticle(kind, p));
    }
    return made;
  }
  function updateParticles(dt) {
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.age += dt;
      const u = p.age / p.life;
      if (u >= 1) { p.el.style.display = 'none'; pool.push(p.el); particles.splice(i, 1); continue; }
      let x, y;
      if (p.orbit) {
        const a = p.orbit.phase + p.orbit.speed * p.age;
        x = p.orbit.cx + p.orbit.r * Math.cos(a); y = p.orbit.cy + p.orbit.r * p.orbit.ry * Math.sin(a);
      } else {
        p.vx += p.ax * dt; p.vy += p.gravity * dt;
        if (p.drag) { p.vx *= 1 - p.drag * dt; p.vy *= 1 - p.drag * dt; }
        p.x += p.vx * dt; p.y += p.vy * dt;
        x = p.x + p.sway * Math.sin(p.age * p.swayF + p.swayPh); y = p.y;
      }
      p.rot += p.vrot * dt;
      const pop = u < 0.15 ? 1 + 0.25 * Math.sin(u / 0.15 * Math.PI) : 1;
      const s = lerp(p.s0, p.s1, smooth(u)) * pop;
      const op = clamp01(u / Math.max(1e-3, p.fadeIn)) * (1 - smooth((u - (1 - p.fadeOut)) / Math.max(1e-3, p.fadeOut))) * p.opacity;
      p.el.setAttribute('transform', 'translate(' + f2(x) + ' ' + f2(y) + ') rotate(' + f2(p.rot) + ') scale(' + f2(s) + ')');
      p.el.setAttribute('opacity', f2(op));
    }
  }

  // --- body transform helpers ---
  function bodyAt(arr) {
    return { x: arr[I['body.x']], y: arr[I['body.y']], rot: arr[I['body.rot']], sx: arr[I['body.sx']], sy: arr[I['body.sy']], skew: arr[I['body.skew']] };
  }
  let lastOut = val;
  function houseToWorld(hx, hy) {
    const b = bodyAt(lastOut);
    let x = (hx - PX) * b.sx, y = (hy - PY) * b.sy;
    x = x + y * Math.tan(b.skew * Math.PI / 180);
    const a = b.rot * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    return [PX + b.x + x * c - y * s, PY + b.y + x * s + y * c];
  }
  function worldToHouse(wx, wy) {
    const b = bodyAt(lastOut);
    let x = wx - PX - b.x, y = wy - PY - b.y;
    const a = -b.rot * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    const rx = x * c - y * s, ry = x * s + y * c;
    x = rx - ry * Math.tan(b.skew * Math.PI / 180); y = ry;
    return [PX + x / (b.sx || 1e-6), PY + y / (b.sy || 1e-6)];
  }

  // --- simulation step ---
  function step(dt) {
    if (destroyed) return;
    dt = clamp(dt || 0, 0, 1 / 20);
    clock += dt * 1000;
    if (frozen) { render(frozenOut()); emit('frame', dt, clock); return; }

    // staggered pose targets
    if (pending.length) {
      pending = pending.filter((pd) => { if (clock >= pd.at) { for (const [i, v] of pd.items) poseT[i] = v; return false; } return true; });
    }
    // layer fades / expiry
    for (const L of layerOrder) {
      if (L.fade) { const u = clamp01((clock - L.fade.t0) / L.fade.dur); L.w = lerp(L.fade.from, L.fade.to, smooth(u)); if (u >= 1) L.fade = null; }
      if (L.expires && clock >= L.expires) { L.setV.clear(); L.addV.clear(); L.expires = 0; }
    }

    // life schedulers
    if (lifeOn) {
      const S = lp.saccade;
      if (S.on && !lookTarget && clock >= saccNext) {
        const prevX = sacc.x;
        if (Math.random() < 0.35) { sacc.x = 0; sacc.y = 0; }
        else { const a = rand(0, TAU), r = rand(0.35, 1) * S.range; sacc.x = Math.cos(a) * r; sacc.y = Math.sin(a) * r * 0.6; }
        saccNext = clock + rand(S.min, S.max);
        if (lp.blink.on && Math.abs(sacc.x - prevX) > S.range * 0.9 && Math.random() < 0.25) startBlink('both');
      }
      if (clock >= microNext) {
        const m = (S.micro || 0) * (lookTarget ? 1 : 1);
        micro.x = rand(-m, m); micro.y = rand(-m, m) * 0.7;
        microNext = clock + rand(140, 420);
      }
      const B = lp.blink;
      if (B.on && clock >= blinkNext) {
        const dur = startBlink('both');
        if (Math.random() < B.double) blinkQueue.push(clock + dur + rand(50, 110));
        blinkNext = clock + rand(B.min, B.max);
      }
      if (blinkQueue.length && clock >= blinkQueue[0]) { blinkQueue.shift(); startBlink('both', { close: lp.blink.close * 0.8, open: lp.blink.open * 0.8 }); }
    }

    // targets = pose + layers + gaze
    tgt.set(poseT);
    applyLayers(tgt, false);
    const [gx, gy] = gazeOffsets();
    // lean strength: explicit (lookAt option), else falls off with distance; times habituation
    let lean = 1;
    if (lookTarget) {
      if (lookLean != null) lean = lookLean;
      else { const d = Math.hypot(lookTarget[0] - PX - val[I['body.x']], lookTarget[1] - 70 - val[I['body.y']]); lean = clamp01(1 - (d - 90) / 170); }
    }
    {
      // anchor = where the gaze is aimed (world units); a jump > 15 u relaunches the lean
      // brief glances away from a target (lookAt(null) for < 1 s) keep the anchor, so they don't relaunch the lean
      if (lookTarget) hab.lastTargetAt = clock;
      const holdAnchor = !lookTarget && clock - (hab.lastTargetAt || -1e9) < 1000;
      const ax = holdAnchor ? hab.ax : lookTarget ? lookTarget[0] : gx * 10, ay = holdAnchor ? hab.ay : lookTarget ? lookTarget[1] : gy * 10;
      if (!hab.init || Math.hypot(ax - hab.ax, ay - hab.ay) > 15) {
        hab.peak = clock - hab.lastReset > 3000 ? 1 : 0.85;
        hab.ax = ax; hab.ay = ay; hab.since = clock; hab.lastReset = clock; hab.init = true;
        hab.hold = rand(1500, 2000); hab.fade = rand(800, 1200);
      }
      const dwell = clock - hab.since;
      hab.k = dwell < hab.hold ? hab.peak : hab.peak * (1 - smooth((dwell - hab.hold) / hab.fade));
    }
    const leanK = lean * hab.k;
    if (gx || gy) {
      const G = lp.gaze;
      // lean follows the horizontal offset of the target (saturates ~70 u to the side)
      const nx = lookTarget ? clamp((lookTarget[0] - PX - val[I['body.x']]) / 70, -1, 1) : gx / (G.eye || 1);
      tgt[I['eyeL.x']] += gx; tgt[I['eyeR.x']] += gx; tgt[I['eyeL.y']] += gy; tgt[I['eyeR.y']] += gy;
      const fk = (G.face || 0) / (G.eye || 1) * (0.4 + 0.6 * lean);
      tgt[I['face.x']] += gx * fk; tgt[I['face.y']] += gy * fk;
      tgt[I['body.rot']] += nx * (G.rot || 0) * rm * leanK; tgt[I['body.skew']] += nx * (G.skew || 0) * rm * leanK;
      tgt[I['body.x']] += nx * (G.bx || 0) * rm * leanK;
    }

    // springs (semi-implicit Euler, sub-stepped)
    const n = Math.max(1, Math.ceil(dt / (1 / 240)));
    const h = dt / n;
    for (let s = 0; s < n; s++) {
      for (let i = 0; i < NP; i++) {
        const a = K[i] * (tgt[i] - val[i]) - C[i] * vel[i];
        vel[i] += a * h; val[i] += vel[i] * h;
      }
    }
    for (let i = 0; i < NP; i++) if (!Number.isFinite(val[i])) { val[i] = tgt[i]; vel[i] = 0; }

    // output = springs + post layers + life post-effects
    out.set(val);
    applyLayers(out, true);
    if (lifeOn) {
      const t = clock / 1000;
      breathPh += dt * TAU * lp.breath.rate * (1 + 0.18 * noise(t * 0.7, 0));
      const br = Math.sin(breathPh + 0.25 * Math.sin(breathPh)) * lp.breath.amp * rm;
      out[I['body.sy']] *= 1 + br; out[I['body.sx']] *= 1 - br * 0.55;
      const sw = lp.sway.amp * rm * noise(t * TAU * lp.sway.rate * 0.35, 3);
      out[I['body.rot']] += sw * 0.3; out[I['body.skew']] -= sw * 1.4;   // wobble mostly as lean so the base stays planted
      out[I['body.y']] += 0.35 * rm * noise(t * TAU * lp.sway.rate * 0.27, 5);
      accT += dt;
    }
    // silhouette limits: the house never melts and never sinks below the floor
    out[I['body.sy']] = clamp(out[I['body.sy']], 0.86, 1.12);
    out[I['body.sx']] = clamp(out[I['body.sx']], 0.94, 1.08);
    if (opt.floor != null && out[I['body.y']] > opt.floor) out[I['body.y']] = opt.floor;
    const bl = blinkValue(blinks[0]), brr = blinkValue(blinks[1]);
    out[I['eyeL.open']] *= bl; out[I['eyeR.open']] *= brr;
    if (blinks[0] && clock - blinks[0].t0 > blinks[0].close + blinks[0].hold + blinks[0].open) blinks[0] = null;
    if (blinks[1] && clock - blinks[1].t0 > blinks[1].close + blinks[1].hold + blinks[1].open) blinks[1] = null;

    lastOut = out;
    render(out);
    updateParticles(dt);
    emit('frame', dt, clock);
  }

  function frozenOut() {
    const P = POSE_T[current];
    const o = new Float64Array(poseT);
    for (const k of Object.keys(P)) o[I[k]] = P[k];
    lastOut = o;
    return o;
  }

  // --- rendering ---
  let bodyColor = FACE;
  function eyeObj(arr, e) {
    return { x: arr[I[e + '.x']], y: arr[I[e + '.y']], s: arr[I[e + '.s']], top: arr[I[e + '.top']], bot: arr[I[e + '.bot']], ang: arr[I[e + '.ang']], heart: arr[I[e + '.heart']], cross: arr[I[e + '.cross']], shine: arr[I[e + '.shine']], open: arr[I[e + '.open']] };
  }
  function mouthObj(arr) { const m = {}; for (const k of MOUTH_KEYS) m[k] = arr[I['mouth.' + k]]; return m; }
  function render(o) {
    const live = lifeOn && !frozen;
    const [r, g, b] = oklabToRgb(o[I['body.L']], o[I['body.A']], o[I['body.B']]);
    bodyColor = 'rgb(' + r + ',' + g + ',' + b + ')';
    house.setAttribute('fill', bodyColor);
    const B = bodyAt(o);
    gBody.setAttribute('transform', 'translate(' + f2(B.x + PX) + ' ' + f2(B.y + PY) + ') rotate(' + f2(B.rot) + ') skewX(' + f2(B.skew) + ') scale(' + (Math.round(B.sx * 10000) / 10000) + ' ' + (Math.round(B.sy * 10000) / 10000) + ') translate(' + -PX + ' ' + -PY + ')');
    gFace.setAttribute('transform', 'translate(' + f2(o[I['face.x']]) + ' ' + f2(o[I['face.y']]) + ')');

    const eyes = [eyeObj(o, 'eyeL'), eyeObj(o, 'eyeR')];
    for (let k = 0; k < 2; k++) {
      const e = eyes[k];
      eyeEls[k].setAttribute('d', polyD(eyePoints(e, k ? 1 : -1)));
      const sh = clamp01(e.shine) * Math.max(0, e.s) * clamp01(e.open) * (1 - clamp01(e.heart)) * (1 - clamp01(e.cross));
      if (sh > 0.01) {
        // watery eye: tint the white toward the body colour so white highlights read as reflections
        const t = 0.34 * sh, LB = [o[I['body.L']], o[I['body.A']], o[I['body.B']]];
        const [r2, g2, b2] = oklabToRgb(lerp(FACE_LAB[0], LB[0], t), lerp(FACE_LAB[1], LB[1], t), lerp(FACE_LAB[2], LB[2], t));
        eyeEls[k].setAttribute('fill', 'rgb(' + r2 + ',' + g2 + ',' + b2 + ')');
      } else if (eyeEls[k].hasAttribute('fill')) eyeEls[k].removeAttribute('fill');
      const s1 = shineEls[2 * k], s2 = shineEls[2 * k + 1];
      s1.setAttribute('cx', f2(e.x + 2.7 * e.s)); s1.setAttribute('cy', f2(e.y - 2.7 * e.s * clamp01(e.open))); s1.setAttribute('r', f2(2.3 * sh));
      s2.setAttribute('cx', f2(e.x - 2.5 * e.s)); s2.setAttribute('cy', f2(e.y + 2.4 * e.s * clamp01(e.open))); s2.setAttribute('r', f2(1.15 * sh));
      s1.setAttribute('fill', palette.shine); s2.setAttribute('fill', palette.shine);
    }
    const ds = o[I['dot.s']];
    dotEl.setAttribute('cx', f2(60 + ((eyes[0].x - 33) + (eyes[1].x - 87)) / 2));
    dotEl.setAttribute('cy', f2(65.88 + ((eyes[0].y - 65.88) + (eyes[1].y - 65.88)) / 2 + o[I['dot.dy']]));
    dotEl.setAttribute('r', f2(Math.max(0, 8 * ds)));

    const m = mouthObj(o);
    mouthEl.setAttribute('d', polyD(mouthPoints(m)));
    tongueEl.setAttribute('d', polyD(tonguePoints(m)));

    renderAcc(o, live);
  }

  function renderAcc(o, live) {
    const t = accT, A = (k) => o[I['acc.' + k]];
    // thought bubbles
    const bub = A('bubbles');
    for (let i = 0; i < 3; i++) {
      const [x, y, r] = BUBBLES[i];
      let s = Math.max(0, (bub - i * 0.25) / (1 - i * 0.25));
      let dy = 0;
      if (live && s > 0) { s *= 1 + 0.08 * rm * Math.sin(t * 2.4 - i * 1.1); dy = -1.2 * rm * Math.sin(t * 1.5 - i * 0.8); }
      bubbleEls[i].setAttribute('r', f2(r * s)); bubbleEls[i].setAttribute('cy', f2(y + dy));
      bubbleEls[i].setAttribute('fill', bodyColor);
    }
    // wifi (searching)
    const wf = A('wifi');
    if (wf > 0.005) {
      gWifi.style.display = '';
      gWifi.setAttribute('transform', 'translate(95.17 24.83) scale(' + f2(Math.max(0, wf)) + ') translate(-95.17 -24.83)');
      gWifi.setAttribute('fill', bodyColor);
      let o1 = 1, o2 = 1;
      if (live) { const c = frac(t / 1.9); o1 = c >= 0.2 && c < 0.75 ? 1 : 0.2; o2 = c >= 0.4 && c < 0.75 ? 1 : 0.2; }
      wifiIn.setAttribute('opacity', f2(o1)); wifiOut.setAttribute('opacity', f2(o2)); wifiDot.setAttribute('opacity', '1');
      gWifi.setAttribute('opacity', f2(clamp01(wf * 1.5)));
    } else gWifi.style.display = 'none';
    // question mark
    const q = A('question');
    if (q > 0.005) {
      qEl.style.display = '';
      const rot = live ? 9 * rm * Math.sin(t * 2.2) : 0, dy = live ? -1.4 * rm * Math.abs(Math.sin(t * 2.2)) : 0;
      qEl.setAttribute('transform', 'translate(104.5 ' + f2(29.4 + dy) + ') rotate(' + f2(rot) + ') scale(' + f2(Math.max(0, q)) + ') translate(-104.5 -29.4)');
      qEl.setAttribute('fill', bodyColor);
    } else qEl.style.display = 'none';
    // Z (sleep): anchored Z + two rising ones in life mode
    const z = A('z');
    for (let k = 0; k < 3; k++) {
      const el = zEls[k];
      if (z <= 0.005 || (k > 0 && !live)) { el.style.display = 'none'; continue; }
      el.style.display = ''; el.setAttribute('fill', bodyColor);
      if (k === 0) {
        const bob = live ? -1.2 * rm * Math.sin(t * 1.4) : 0, rr = live ? 4 * rm * Math.sin(t * 0.9) : 0;
        el.setAttribute('transform', 'translate(101.5 ' + f2(16.5 + bob) + ') rotate(' + f2(rr) + ') scale(' + f2(Math.max(0, z)) + ') translate(-101.5 -16.5)');
        el.setAttribute('opacity', f2(clamp01(z * 1.5)));
      } else {
        const p = frac(t / 3 + k * 0.5);
        const x = 101.5 + 8 + p * 14 + 2 * Math.sin(p * 7 + k), y = 16.5 - 6 - p * 26;
        const s = z * (0.32 + 0.3 * p);
        el.setAttribute('transform', 'translate(' + f2(x) + ' ' + f2(y) + ') rotate(' + f2(-8 + 16 * p) + ') scale(' + f2(s) + ') translate(-101.5 -16.5)');
        el.setAttribute('opacity', f2(clamp01(p / 0.2) * clamp01((1 - p) / 0.4) * clamp01(z)));
      }
    }
    // tear (pleading): wells up, wobbles, rolls down
    const te = A('tear');
    if (te > 0.005) {
      let s = te, dy = 0, op = 1, wob = 1;
      if (live) {
        const c = frac(t / 4.2);
        if (c < 0.25) s *= 0.45 + 0.55 * smooth(c / 0.25);
        else if (c > 0.68) { const u = (c - 0.68) / 0.32; dy = 16 * u * u; op = 1 - smooth((u - 0.4) / 0.6); }
        wob = 1 + 0.05 * Math.sin(t * 9);
      }
      tearEl.setAttribute('d', dropD(TEAR[0], TEAR[1] + dy, TEAR[2] * s * wob));
      tearEl.setAttribute('opacity', f2(op));
    } else tearEl.setAttribute('d', '');
    // sweat drops
    const sw = A('sweat');
    for (let k = 0; k < 2; k++) {
      const [x, y, r] = SWEAT[k];
      if (sw <= 0.005) { sweatEls[k].setAttribute('d', ''); continue; }
      let s = sw, dy = 0, op = 1;
      if (live) {
        const c = frac(t / (2.4 + k * 0.5) + k * 0.37);
        if (c < 0.2) s *= 0.5 + 0.5 * smooth(c / 0.2);
        else if (c > 0.55) { const u = (c - 0.55) / 0.45; dy = 9 * u * u; op = 1 - smooth((u - 0.5) / 0.5); }
      }
      sweatEls[k].setAttribute('d', dropD(x, y + dy, r * s));
      sweatEls[k].setAttribute('opacity', f2(op));
    }
  }

  // --- loop ---
  let raf = 0, last = 0, running = false;
  function frame(ts) {
    raf = globalThis.requestAnimationFrame(frame);
    if (!last) last = ts;
    const dt = (ts - last) / 1000; last = ts;
    step(dt);
  }
  function start() { if (running || destroyed) return; running = true; last = 0; raf = globalThis.requestAnimationFrame(frame); }
  function stop() { running = false; if (raf) globalThis.cancelAnimationFrame(raf); raf = 0; }
  function onVis() { if (document.hidden) { if (running) { stop(); running = 'paused'; } } else if (running === 'paused') { running = false; start(); } }
  if (opt.autoplay) { document.addEventListener('visibilitychange', onVis); start(); }

  // --- public API ---
  const api = {
    el: { svg, world: gWorld, body: gBody, house, face: gFace, eyes: eyeEls, mouth: mouthEl, tongue: tongueEl, particles: gParticles },
    get expression() { return current; },
    get frozen() { return frozen; },
    get lifeOn() { return lifeOn; },
    get clock() { return clock; },
    setExpression,
    layer,
    lookAt(x, y, o) { lookTarget = x == null ? null : [x, y]; lookLean = o && o.lean != null ? clamp01(o.lean) : null; return api; },
    get gazeLean() { return { habituation: hab.k, explicit: lookLean }; },
    get looking() { return lookTarget ? lookTarget.slice() : null; },
    blink(o) { o = o || {}; startBlink(o.eye || 'both', o); if (o.double) blinkQueue.push(clock + (o.close || lp.blink.close) + (o.hold || lp.blink.hold) + (o.open || lp.blink.open) + 70); return api; },
    wink(side) { startBlink(side === 'L' ? 'L' : 'R', { close: 90, hold: 220, open: 200 }); return api; },
    impulse(o) {
      o = o || {};
      const map = { x: 'body.x', y: 'body.y', rot: 'body.rot', sx: 'body.sx', sy: 'body.sy', skew: 'body.skew', fx: 'face.x', fy: 'face.y' };
      for (const k in o) { const key = map[k] || k, i = I[key]; if (i != null) vel[i] += o[k]; }
      return api;
    },
    squash(amount, ms) { // quick squash & stretch helper (amount >0 squashes)
      const L = layer('_squash', { priority: 50 });
      L.add({ 'body.sy': -amount, 'body.sx': amount * 0.6 }).ttl(ms || 90);
      return api;
    },
    life(on) { lifeOn = on == null ? !lifeOn : !!on; if (!lifeOn) { sacc.x = sacc.y = micro.x = micro.y = 0; } return api; },
    setLife(p) { userLife = merge(userLife, p); lp = merge(LIFE_DEFAULT, POSES[current].life, userLife); return api; },
    get lifeProfile() { return merge(lp); },
    freeze(on) {
      frozen = on == null ? !frozen : !!on;
      if (frozen) {
        particles.splice(0).forEach((p) => { p.el.style.display = 'none'; pool.push(p.el); });
        render(frozenOut());
      } else {
        const fo = frozenOut(); val.set(fo); vel.fill(0); poseT.set(fo); pending = [];
      }
      return api;
    },
    accessory(name, on) {
      const L = layer('_acc', { priority: 90 });
      if (on == null) L.unset('acc.' + name); else L.set({ ['acc.' + name]: on === true ? 1 : on === false ? 0 : on });
      return api;
    },
    emit: emitParticles,
    tint(hex, w) {
      const L = layer('_tint', { priority: 80 });
      if (hex == null) { L.clear(); return api; }
      const [cL, cA, cB] = hexToOklab(hex);
      L.set({ 'body.L': cL, 'body.A': cA, 'body.B': cB }, w == null ? 1 : w);
      return api;
    },
    setPalette(p) { Object.assign(palette, p || {}); return api; },
    setState(key, v, speed) { const i = I[key]; if (i != null) { val[i] = v; if (speed != null) vel[i] = speed; } return api; },
    spring(target, kc) { kOverride[target] = kc; applySpring(activePreset); return api; },
    get(key) { return lastOut[I[key]]; },
    target(key) { return tgt[I[key]]; },
    velocity(key) { return vel[I[key]]; },
    get params() { return KEYS.slice(); },
    get bodyColor() { return bodyColor; },
    houseToWorld, worldToHouse,
    clientToSvg(cx, cy) {
      const ctm = svg.getScreenCTM(); if (!ctm) return [0, 0];
      const pt = svg.createSVGPoint(); pt.x = cx; pt.y = cy;
      const r = pt.matrixTransform(ctm.inverse()); return [r.x, r.y];
    },
    on(evt, fn) { (listeners[evt] = listeners[evt] || []).push(fn); return api; },
    off(evt, fn) { listeners[evt] = (listeners[evt] || []).filter((f) => f !== fn); return api; },
    step(dt) { step(dt); return api; },
    start, stop,
    destroy() { destroyed = true; stop(); document.removeEventListener('visibilitychange', onVis); while (svg.firstChild) svg.removeChild(svg.firstChild); },
  };

  current = null;
  setExpression(POSE_T[opt.expression] ? opt.expression : 'Normal', { instant: true });
  render(val);
  return api;
}

export const Casita = { hexToOklab, oklabToRgb, create, EXPRESSIONS, POSES, COLORS, FACE, HOUSE_D, SHAPES: Object.keys(SHAPES), PARAMS: KEYS.slice(), PRESETS: Object.keys(PRESETS), LIFE_DEFAULT };
