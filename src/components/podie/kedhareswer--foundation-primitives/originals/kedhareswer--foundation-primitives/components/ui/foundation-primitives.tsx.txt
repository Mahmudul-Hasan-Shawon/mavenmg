"use client"

import * as React from "react"

/**
 * Foundation Primitives: a card of soft 3D primitives, including an asterisk, a sphere, a
 * stack of half-domes, an hourglass and an orb, shaded as frosted gradient gel.
 *
 * The shapes are real 3D: one fragment pass raymarches signed distance fields,
 * shades them as gel (saturated core, milky rim, soft translucent edges) and
 * lets them cast soft shadows and a coloured glow onto the card and the pale
 * plates they sit on. A glass lens magnifies whatever it floats over.
 *
 * Interaction: the scene tilts toward the pointer and the light follows it, the
 * lens follows the pointer, hovering a shape lifts it (the asterisk spins, the
 * half-domes fan out), dragging spins it with inertia, and clicking pops it and
 * selects it. Every shape is a real button, so all of it works from the keyboard.
 *
 * Self-contained: raw WebGL2, React is the only import. No textures, no image
 * assets, no CSS file. The canvas sizes itself from its own box, never the
 * window, and releases every GL object on unmount.
 */

export type FoundationShape = "asterisk" | "sphere" | "halves" | "hourglass" | "torus" | "pill" | "cube"

export type FoundationItem = {
  /** Accessible name of the shape's button. Never drawn. */
  label: string
  shape: FoundationShape
  /** [core, rim]: the saturated centre and the milky edge of the gel. */
  colors: [string, string]
  /** The pale plate the shape sits on. Neighbouring "square" tiles join into one strip. */
  tile?: "disc" | "square" | "none"
}

export type FoundationPrimitivesProps = {
  /** Up to six. Order is left to right, and top row first on narrow cards. */
  items?: FoundationItem[]
  /** Controlled selection (index, or null for none). A selected shape stays lifted. */
  selected?: number | null
  defaultSelected?: number | null
  onSelect?: (index: number | null) => void
  /** Height of the card. Must be a definite length. */
  height?: string
  /** The glass lens that follows the pointer. */
  lens?: boolean
  /** Idle life: floating, slow turning, the hourglass flipping over. */
  idle?: boolean
  interactive?: boolean
  /** 0..1 strength of the shadows on the card. */
  shadow?: number
  /** 0..1 strength of the coloured glow each shape throws on the card. */
  glow?: number
  maxDpr?: number
  /** Accessible name of the whole card. */
  ariaLabel?: string
  className?: string
}

export const DEFAULT_ITEMS: FoundationItem[] = [
  { label: "Iconography", shape: "asterisk", colors: ["#9b5cf6", "#f3b4ef"], tile: "disc" },
  { label: "Color", shape: "sphere", colors: ["#3b74ff", "#d6e4ff"], tile: "square" },
  { label: "Typography", shape: "halves", colors: ["#ea4fd3", "#fbd3f1"], tile: "square" },
  { label: "Spacing", shape: "hourglass", colors: ["#ec7a35", "#f8c29a"], tile: "square" },
  { label: "Grid", shape: "sphere", colors: ["#a15cf7", "#ecc6fc"], tile: "none" },
]

// #region stage
// Pure geometry and colour helpers, lifted out and run by the test.

export const MAX_SHAPES = 6
export const SHAPE_KIND: Record<string, number> = {
  sphere: 0,
  asterisk: 1,
  halves: 2,
  hourglass: 3,
  torus: 4,
  pill: 5,
  cube: 6,
}
/** World units between neighbouring shapes; every shape is about 2 units across. */
export const SPACING = 2.75
/** How far the frame reaches past a shape centre: its radius plus breathing room. */
export const MARGIN = 1.75
export const ROW_GAP = 2.75
export const CAMERA_DISTANCE = 18

export type StageLayout = { rows: number; pts: [number, number][]; fit: number }

/** Where each shape sits, and how much world height the camera must show. */
export function layoutStage(n: number, aspect: number): StageLayout {
  const count = Math.max(0, Math.min(n, MAX_SHAPES))
  const a = Math.max(aspect, 0.2)
  const rows = count > 3 && a < 1.9 ? 2 : 1
  const pts: [number, number][] = []
  if (rows === 1) {
    for (let i = 0; i < count; i++) pts.push([(i - (count - 1) / 2) * SPACING, 0])
  } else {
    const top = Math.ceil(count / 2)
    const bottom = count - top
    for (let i = 0; i < top; i++) pts.push([(i - (top - 1) / 2) * SPACING, ROW_GAP / 2])
    for (let i = 0; i < bottom; i++) pts.push([(i - (bottom - 1) / 2) * SPACING, -ROW_GAP / 2])
  }
  let halfW = MARGIN
  let halfH = MARGIN
  for (const [x, y] of pts) {
    halfW = Math.max(halfW, Math.abs(x) + MARGIN)
    halfH = Math.max(halfH, Math.abs(y) + MARGIN)
  }
  return { rows, pts, fit: Math.max(halfH, halfW / a) }
}

export type Strip = [number, number, number]

/** Runs of neighbouring "square" tiles on the same row become one rounded strip [x0, x1, y]. */
export function stripsFor(tiles: string[], pts: [number, number][]): Strip[] {
  const out: Strip[] = []
  let run: Strip | null = null
  for (let i = 0; i < pts.length; i++) {
    const sq = tiles[i] === "square"
    const [x, y] = pts[i]
    if (sq && run && run[2] === y) {
      run[1] = x + 1.12
      continue
    }
    if (run) out.push(run)
    run = sq ? [x - 1.12, x + 1.12, y] : null
  }
  if (run) out.push(run)
  return out.slice(0, 4)
}

export function clamp(v: number, lo: number, hi: number) {
  return Math.min(Math.max(v, lo), hi)
}

/** Frame-rate independent approach of `from` toward `to`. */
export function damp(from: number, to: number, rate: number, dt: number) {
  return to + (from - to) * Math.exp(-rate * dt)
}

export function hexToRgb(hex: string): [number, number, number] | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim())
  if (!m) return null
  let h = m[1]
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]
  const v = parseInt(h, 16)
  return [((v >> 16) & 255) / 255, ((v >> 8) & 255) / 255, (v & 255) / 255]
}

/** Column-major rotation Rz(roll) · Ry(yaw) · Rx(pitch), written into out at offset. */
export function rotation(yaw: number, pitch: number, roll: number, out: Float32Array | number[] = new Float32Array(9), at = 0) {
  const cy = Math.cos(yaw), sy = Math.sin(yaw)
  const cp = Math.cos(pitch), sp = Math.sin(pitch)
  const cr = Math.cos(roll), sr = Math.sin(roll)
  // Ry · Rx
  const a = [cy, 0, -sy, sy * sp, cp, cy * sp, sy * cp, -sp, cy * cp] // columns
  for (let c = 0; c < 3; c++) {
    const x = a[c * 3], y = a[c * 3 + 1], z = a[c * 3 + 2]
    out[at + c * 3] = cr * x - sr * y
    out[at + c * 3 + 1] = sr * x + cr * y
    out[at + c * 3 + 2] = z
  }
  return out
}

export type Camera = { eye: number[]; right: number[]; up: number[]; back: number[]; fov: number }

/** An orbit camera looking at the origin, tilted by yaw/pitch, framing `fit` world units of half-height. */
export function makeCamera(yaw: number, pitch: number, fit: number): Camera {
  const back = [Math.sin(yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(yaw) * Math.cos(pitch)]
  const eye = back.map((v) => v * CAMERA_DISTANCE)
  // right = normalize(cross(worldUp, back))
  const rx = back[2], rz = -back[0]
  const rl = Math.hypot(rx, rz) || 1
  const right = [rx / rl, 0, rz / rl]
  const up = [
    back[1] * right[2] - back[2] * right[1],
    back[2] * right[0] - back[0] * right[2],
    back[0] * right[1] - back[1] * right[0],
  ]
  return { eye, right, up, back, fov: fit / CAMERA_DISTANCE }
}

/** World point → CSS pixels in a w×h viewport, plus the pixel size of one world unit there. */
export function project(cam: Camera, p: number[], w: number, h: number): [number, number, number] {
  const v = [p[0] - cam.eye[0], p[1] - cam.eye[1], p[2] - cam.eye[2]]
  const x = v[0] * cam.right[0] + v[1] * cam.right[1] + v[2] * cam.right[2]
  const y = v[0] * cam.up[0] + v[1] * cam.up[1] + v[2] * cam.up[2]
  const z = -(v[0] * cam.back[0] + v[1] * cam.back[1] + v[2] * cam.back[2])
  const k = h / 2 / (Math.max(z, 1e-3) * cam.fov)
  return [w / 2 + x * k, h / 2 - y * k, k]
}

/** The ray through a CSS pixel, hit against the plane z = planeZ. */
export function unproject(cam: Camera, px: number, py: number, w: number, h: number, planeZ: number): [number, number] {
  const u = ((px - w / 2) / (h / 2)) * cam.fov
  const v = ((h / 2 - py) / (h / 2)) * cam.fov
  const d = [0, 1, 2].map((c) => cam.right[c] * u + cam.up[c] * v - cam.back[c])
  const t = (planeZ - cam.eye[2]) / (Math.abs(d[2]) < 1e-6 ? -1e-6 : d[2])
  return [cam.eye[0] + d[0] * t, cam.eye[1] + d[1] * t]
}
// #endregion

const VERT = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`

const FRAG = `#version 300 es
precision highp float;
out vec4 outColor;

uniform vec2 uRes;
uniform int uCount;
uniform vec4 uPos[6];
uniform mat3 uRot[6];
uniform vec4 uInfo[6];
uniform vec3 uSquash[6];
uniform vec3 uCore[6];
uniform vec3 uRim[6];
uniform vec4 uStrip[4];
uniform int uStripCount;
uniform vec3 uDisc[6];
uniform int uDiscCount;
uniform vec3 uEye;
uniform vec3 uRight;
uniform vec3 uUp;
uniform vec3 uBack;
uniform float uFov;
uniform vec3 uLight;
uniform vec4 uLens;
uniform vec3 uFg;
uniform float uShadow;
uniform float uGlow;

const float PLANE_Z = -1.32;
const float TILE_Z = -1.24;
const float LENS_Z = 1.9;

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}
float smax(float a, float b, float k) { return -smin(-a, -b, k); }
float sdBox(vec3 p, vec3 b, float r) {
  vec3 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
}
mat2 rot2(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float halfCentre(int k, float spread) { return (float(k) - 1.0) * 0.55 * spread + 0.5; }

// Distance to one shape in its own frame (unit size), and the nearest sub-part.
vec2 shapeDist(int kind, vec3 q, float spread, int skipSub) {
  if (kind == 1) {
    float d = 1e9;
    for (int k = 0; k < 4; k++) {
      vec3 r = q;
      r.xy = rot2(float(k) * 0.7853982) * r.xy;
      d = smin(d, sdBox(r, vec3(1.0, 0.2, 0.2), 0.1), 0.05);
    }
    return vec2(d, 0.0);
  }
  if (kind == 2) {
    float d = 1e9;
    float sub = 0.0;
    for (int k = 0; k < 3; k++) {
      if (k == skipSub) continue;
      float cx = halfCentre(k, spread);
      vec3 c = q - vec3(cx, 0.0, 0.0);
      float h = smax(length(c) - 1.0, c.x, 0.05);
      if (h < d) { d = h; sub = float(k); }
    }
    return vec2(d, sub);
  }
  if (kind == 3) {
    vec3 s = q * vec3(0.9, 1.0, 0.9);
    float top = smax(length(s - vec3(0.0, 1.0, 0.0)) - 1.0, s.y - 1.0, 0.05);
    float bot = smax(length(s + vec3(0.0, 1.0, 0.0)) - 1.0, -1.0 - s.y, 0.05);
    return vec2(smin(top, bot, 0.1) * 0.9, 0.0);
  }
  if (kind == 4) {
    vec2 t = vec2(length(q.xy) - 0.68, q.z);
    return vec2(length(t) - 0.32, 0.0);
  }
  if (kind == 5) {
    vec3 c = q;
    c.x -= clamp(c.x, -0.55, 0.55);
    return vec2(length(c) - 0.5, 0.0);
  }
  if (kind == 6) return vec2(sdBox(q, vec3(0.74), 0.2), 0.0);
  return vec2(length(q) - 1.0, 0.0);
}

// The plates are flat: a 2D distance on the plate plane, negative inside.
float tileDist2(vec2 p) {
  float d = 1e9;
  for (int i = 0; i < 4; i++) {
    if (i >= uStripCount) break;
    vec4 s = uStrip[i];
    vec2 c = vec2((s.x + s.y) * 0.5, s.z);
    vec2 b = vec2((s.y - s.x) * 0.5, 1.04);
    vec2 q = abs(p - c) - b + 0.34;
    d = min(d, length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - 0.34);
  }
  for (int i = 0; i < 6; i++) {
    if (i >= uDiscCount) break;
    d = min(d, length(p - uDisc[i].xy) - uDisc[i].z);
  }
  return d;
}

vec2 map(vec3 p, int skip) {
  vec2 res = vec2(1e9, -1.0);
  for (int i = 0; i < 6; i++) {
    if (i >= uCount) break;
    vec3 q = p - uPos[i].xyz;
    float s = uPos[i].w;
    float bound = length(q) - 1.9 * s;
    if (bound > 0.35) {
      if (bound < res.x) res = vec2(bound, float(i * 4));
      continue;
    }
    int kind = int(uInfo[i].x + 0.5);
    int skipSub = -1;
    if (skip >= 0 && skip / 4 == i) {
      if (kind != 2) continue;
      skipSub = skip - i * 4;
    }
    vec3 sq = uSquash[i];
    vec3 lq = (transpose(uRot[i]) * q) / (s * sq);
    vec2 h = shapeDist(kind, lq, uInfo[i].w, skipSub);
    float d = h.x * s * min(sq.x, min(sq.y, sq.z));
    if (d < res.x) res = vec2(d, float(i * 4) + h.y);
  }
  return res;
}

vec3 calcNormal(vec3 p, int skip) {
  const vec2 e = vec2(1.0, -1.0) * 0.0015;
  return normalize(
    e.xyy * map(p + e.xyy, skip).x +
    e.yyx * map(p + e.yyx, skip).x +
    e.yxy * map(p + e.yxy, skip).x +
    e.xxx * map(p + e.xxx, skip).x);
}

// Soft shadows from a sphere stand-in per shape: smooth, cheap, and free of the
// banding a marched shadow shows on a flat card.
float sphShadow(vec3 ro, vec3 rd, vec4 sph) {
  vec3 oc = ro - sph.xyz;
  float b = dot(oc, rd);
  float c = dot(oc, oc) - sph.w * sph.w;
  float h = b * b - c;
  float d = sqrt(max(0.0, sph.w * sph.w - h)) - sph.w;
  float t = -b - sqrt(max(h, 0.0));
  return t < 0.0 ? 1.0 : smoothstep(0.0, 1.0, 1.6 * d / t);
}

float softShadow(vec3 ro, vec3 rd, int self) {
  float res = 1.0;
  for (int i = 0; i < 6; i++) {
    if (i >= uCount) break;
    if (i == self) continue;
    res = min(res, sphShadow(ro, rd, vec4(uPos[i].xyz, 0.92 * uPos[i].w)));
  }
  return res;
}

vec4 over(vec4 top, vec4 under) { return top + (1.0 - top.a) * under; }

// The coloured light each shape throws on the card behind it.
vec4 glowAt(vec2 xy) {
  vec3 g = vec3(0.0);
  float sum = 0.0;
  for (int i = 0; i < 6; i++) {
    if (i >= uCount) break;
    vec2 d = xy - uPos[i].xy;
    float w = exp(-dot(d, d) * 0.55) * uGlow * (0.7 + 0.5 * uInfo[i].z);
    g += uCore[i] * w;
    sum += w;
  }
  float a = min(sum, 0.6);
  return vec4(g * (a / max(sum, 1e-4)), a) * 0.45;
}

// What a ray that misses every shape sees: a plate, or the bare card, with
// shadows and glow on both.
vec4 behind(vec3 ro, vec3 rd, vec3 L) {
  float tt = (TILE_Z - ro.z) / min(rd.z, -1e-4);
  vec3 p = ro + rd * tt;
  float d = tileDist2(p.xy);
  float px = 1.5 * uFov * tt / uRes.y;
  float cover = 1.0 - smoothstep(-px, px, d);
  float tp = (PLANE_Z - ro.z) / min(rd.z, -1e-4);
  vec3 q = ro + rd * tp;
  vec4 card = over(vec4(0.0, 0.0, 0.0, (1.0 - softShadow(q, L, -1)) * uShadow), glowAt(q.xy));
  if (cover <= 0.0) return card;
  // plate: flat face, a lit bevel along the edge facing the lamp, shade on the other side
  vec2 e = vec2(0.01, 0.0);
  vec2 g = normalize(vec2(tileDist2(p.xy + e.xy) - tileDist2(p.xy - e.xy), tileDist2(p.xy + e.yx) - tileDist2(p.xy - e.yx)) + 1e-5);
  float bevel = smoothstep(-0.07, 0.0, d);
  float lit = dot(g, normalize(L.xy + 1e-5));
  vec4 c = vec4(uFg * 0.055, 0.055);
  c = over(vec4(vec3(1.0), 1.0) * bevel * max(lit, 0.0) * 0.5, c);
  c = over(vec4(0.0, 0.0, 0.0, bevel * max(-lit, 0.0) * 0.06), c);
  c = over(vec4(0.0, 0.0, 0.0, (1.0 - softShadow(p, L, -1)) * uShadow * 0.55), c);
  c = over(c, glowAt(p.xy) * 0.6);
  return mix(card, c, cover);
}

vec4 shapeShade(vec3 p, vec3 rd, int id, int skip, vec3 L) {
  int i = id / 4;
  int sub = id - i * 4;
  int kind = int(uInfo[i].x + 0.5);
  float hover = uInfo[i].z;
  vec3 n = calcNormal(p, skip);
  vec3 lq = (transpose(uRot[i]) * (p - uPos[i].xyz)) / (uPos[i].w * uSquash[i]);

  float facing = clamp(dot(n, -rd), 0.0, 1.0);
  float radial;
  float cx = 0.0;
  if (kind == 2) {
    cx = halfCentre(sub, uInfo[i].w);
    radial = clamp(1.0 - length(lq - vec3(cx - 0.55, 0.0, 0.0)) / 1.4, 0.0, 1.0);
  } else if (kind == 3) {
    radial = clamp(1.0 - length(lq * vec3(0.8, 1.1, 1.0)) / 1.85, 0.0, 1.0);
  } else {
    radial = clamp(1.0 - length(lq.xy) / 1.3, 0.0, 1.0);
  }
  float core = clamp(0.45 * pow(facing, 1.6) + 0.7 * radial, 0.0, 1.0);
  vec3 base = mix(uRim[i], uCore[i], smoothstep(0.06, 0.9, core));

  float sh = softShadow(p, L, i);
  float dif = clamp(dot(n, L) * 0.5 + 0.5, 0.0, 1.0);
  vec3 col = base * (0.8 + 0.3 * dif) * mix(0.8, 1.0, sh);
  float fres = pow(1.0 - facing, 2.4);
  col = mix(col, mix(uRim[i], vec3(1.0), 0.55), fres * 0.6);
  // light seeping through the gel on the side away from the lamp
  col += uRim[i] * pow(clamp(dot(n, -L) * 0.5 + 0.5, 0.0, 1.0), 3.0) * 0.18;
  vec3 hv = normalize(L - rd);
  col += vec3(1.0) * pow(max(dot(n, hv), 0.0), 56.0) * 0.42 * sh;
  col = mix(col, col * 1.06 + 0.015, hover);

  float soft = kind == 0 ? 0.32 : kind == 2 ? 0.1 : 0.16;
  float a = smoothstep(0.0, soft, facing);
  if (kind == 2) {
    // each half-dome fades out toward its flat face
    float f = smoothstep(-0.95, 0.02, lq.x - cx);
    a *= mix(1.0, 0.55, f);
    col = mix(col, mix(uRim[i], vec3(1.0), 0.2), f * 0.18);
  }
  return vec4(clamp(col, 0.0, 1.0) * a, a);
}

vec2 march(vec3 ro, vec3 rd, float t, float tMax, int skip) {
  for (int i = 0; i < 80; i++) {
    vec2 h = map(ro + rd * t, skip);
    if (h.x < 0.0025) return vec2(t, h.y);
    t += h.x;
    if (t > tMax) break;
  }
  return vec2(tMax, -1.0);
}

// Does the ray pass through any shape's bounding sphere at all?
bool mayHit(vec3 ro, vec3 rd) {
  for (int i = 0; i < 6; i++) {
    if (i >= uCount) break;
    vec3 oc = ro - uPos[i].xyz;
    float r = 1.95 * uPos[i].w;
    float b = dot(oc, rd);
    if (b * b - dot(oc, oc) + r * r > 0.0) return true;
  }
  return false;
}

vec4 render(vec3 ro, vec3 rd, vec3 L) {
  if (!mayHit(ro, rd)) return behind(ro, rd, L);
  // nothing reaches in front of z = 2.4, so start the march there
  float t = max(0.0, (2.4 - ro.z) / min(rd.z, -1e-4));
  float tEnd = (TILE_Z - ro.z) / min(rd.z, -1e-4);
  vec4 acc = vec4(0.0);
  int skip = -1;
  for (int layer = 0; layer < 3; layer++) {
    vec2 h = march(ro, rd, t, tEnd, skip);
    if (h.y < 0.0) break;
    vec3 p = ro + rd * h.x;
    acc = over(acc, shapeShade(p, rd, int(h.y + 0.5), skip, L));
    if (acc.a > 0.985) return acc;
    skip = int(h.y + 0.5);
    t = h.x + 0.01;
  }
  return over(acc, behind(ro, rd, L));
}

vec4 lensLayer(vec2 o, float r) {
  vec4 c = vec4(vec3(1.0) * 0.06, 0.06);
  float rim = smoothstep(0.84, 0.975, r) * (1.0 - smoothstep(0.975, 1.0, r));
  c = over(vec4(vec3(1.0), 1.0) * rim * 0.5, c);
  float line = smoothstep(0.955, 0.985, r) * (1.0 - smoothstep(0.985, 1.0, r));
  c = over(vec4(uFg, 1.0) * line * 0.16, c);
  float spot = smoothstep(0.55, 0.0, length(o - vec2(-0.42, 0.48)));
  c = over(vec4(vec3(1.0), 1.0) * spot * 0.3, c);
  return c;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / (0.5 * uRes.y);
  vec3 ro = uEye;
  vec3 rd = normalize(uRight * uv.x * uFov + uUp * uv.y * uFov - uBack);
  vec3 L = normalize(uLight);

  vec4 glass = vec4(0.0);
  if (uLens.w > 0.002) {
    float tl = (LENS_Z - ro.z) / min(rd.z, -1e-4);
    vec3 lp = ro + rd * tl;
    vec2 o = (lp.xy - uLens.xy) / uLens.z;
    float r = length(o);
    if (r < 1.0) {
      glass = lensLayer(o, r) * uLens.w;
      // a convex lens bends rays toward its axis, so what is behind it looks bigger
      float bend = 0.13 * uLens.w * (1.0 - 0.25 * r * r);
      ro = lp;
      rd = normalize(rd - vec3(o * bend, 0.0));
    }
  }
  outColor = over(glass, render(ro, rd, L));
}`

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)"

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return
    const mq = window.matchMedia(REDUCED_QUERY)
    const on = () => setReduced(mq.matches)
    on()
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])
  return reduced
}

/** Any CSS colour → linear-ish 0..1 rgb, via a 1px canvas so oklch() and friends work too. */
function makeColorReader() {
  let ctx: CanvasRenderingContext2D | null = null
  return (css: string, fallback: [number, number, number]): [number, number, number] => {
    const hex = hexToRgb(css)
    if (hex) return hex
    try {
      if (!ctx) {
        const c = document.createElement("canvas")
        c.width = c.height = 1
        ctx = c.getContext("2d", { willReadFrequently: true })
      }
      if (!ctx) return fallback
      ctx.clearRect(0, 0, 1, 1)
      ctx.fillStyle = "#000"
      ctx.fillStyle = css
      ctx.fillRect(0, 0, 1, 1)
      const d = ctx.getImageData(0, 0, 1, 1).data
      return [d[0] / 255, d[1] / 255, d[2] / 255]
    } catch {
      return fallback
    }
  }
}

type Anim = {
  hover: number
  sel: number
  yaw: number
  pitch: number
  vYaw: number
  vPitch: number
  roll: number
  flips: number
  flipAngle: number
  squash: number
  vSquash: number
}

const freshAnim = (): Anim => ({
  hover: 0, sel: 0, yaw: 0, pitch: 0, vYaw: 0, vPitch: 0, roll: 0, flips: 0, flipAngle: 0, squash: 0, vSquash: 0,
})

export default function FoundationPrimitives({
  items = DEFAULT_ITEMS,
  selected,
  defaultSelected = null,
  onSelect,
  height = "clamp(240px, 30vw, 340px)",
  lens = true,
  idle = true,
  interactive = true,
  shadow = 0.5,
  glow = 0.5,
  maxDpr = 1.75,
  ariaLabel = "Foundation primitives",
  className = "",
}: FoundationPrimitivesProps) {
  const list = items.slice(0, MAX_SHAPES)
  const reduced = useReducedMotion()

  const [inner, setInner] = React.useState<number | null>(defaultSelected ?? null)
  const current = selected !== undefined ? selected : inner
  const active = current != null && current >= 0 && current < list.length ? current : null
  const [hovered, setHovered] = React.useState<number | null>(null)
  const [failed, setFailed] = React.useState(false)
  const [generation, setGeneration] = React.useState(0)

  const stageRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const buttonRefs = React.useRef<(HTMLButtonElement | null)[]>([])

  // The render loop reads everything through one ref so it never restarts on a prop change.
  const live = React.useRef({
    items: list,
    hovered: null as number | null,
    selected: active,
    lens,
    idle,
    interactive,
    shadow,
    glow,
    anims: [] as Anim[],
    pointer: { x: 0.5, y: 0.5, inside: false },
    drag: null as null | { i: number; x: number; y: number; lx: number; ly: number; lt: number; moved: boolean },
    kick: () => {},
  })
  live.current.items = list
  live.current.hovered = hovered
  live.current.selected = active
  live.current.lens = lens
  live.current.idle = idle
  live.current.interactive = interactive
  live.current.shadow = shadow
  live.current.glow = glow
  React.useEffect(() => {
    live.current.kick()
  })

  const select = React.useCallback(
    (i: number | null) => {
      if (selected === undefined) setInner(i)
      onSelect?.(i)
    },
    [selected, onSelect],
  )

  const pop = (i: number) => {
    const a = live.current.anims[i]
    if (!a || reduced) return
    a.vYaw += 11
    a.vSquash += 7
    if (list[i]?.shape === "hourglass") a.flips += 1
    live.current.kick()
  }

  const toggle = (i: number) => {
    const next = active === i ? null : i
    select(next)
    if (next != null) pop(i)
  }

  // ---- WebGL -----------------------------------------------------------------
  React.useEffect(() => {
    const canvas = canvasRef.current
    const stage = stageRef.current
    if (!canvas || !stage) return
    const gl = canvas.getContext("webgl2", { premultipliedAlpha: true, alpha: true, antialias: false })
    if (!gl) {
      setFailed(true)
      return
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)
      if (!s) return null
      gl.shaderSource(s, src)
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error("foundation-primitives:", gl.getShaderInfoLog(s))
        gl.deleteShader(s)
        return null
      }
      return s
    }
    const vs = compile(gl.VERTEX_SHADER, VERT)
    const fs = compile(gl.FRAGMENT_SHADER, FRAG)
    const program = vs && fs ? gl.createProgram() : null
    if (!program || !vs || !fs) {
      setFailed(true)
      return
    }
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    gl.deleteShader(vs)
    gl.deleteShader(fs)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("foundation-primitives:", gl.getProgramInfoLog(program))
      gl.deleteProgram(program)
      setFailed(true)
      return
    }
    const loc = (n: string) => gl.getUniformLocation(program, n)
    const U = {
      res: loc("uRes"), count: loc("uCount"), pos: loc("uPos"), rot: loc("uRot"), info: loc("uInfo"),
      squash: loc("uSquash"), core: loc("uCore"), rim: loc("uRim"), strip: loc("uStrip"),
      stripCount: loc("uStripCount"), disc: loc("uDisc"), discCount: loc("uDiscCount"),
      eye: loc("uEye"), right: loc("uRight"), up: loc("uUp"), back: loc("uBack"), fov: loc("uFov"),
      light: loc("uLight"), lens: loc("uLens"), fg: loc("uFg"), shadow: loc("uShadow"), glow: loc("uGlow"),
    }
    const vao = gl.createVertexArray()
    gl.clearColor(0, 0, 0, 0)

    const pos = new Float32Array(MAX_SHAPES * 4)
    const rot = new Float32Array(MAX_SHAPES * 9)
    const info = new Float32Array(MAX_SHAPES * 4)
    const squash = new Float32Array(MAX_SHAPES * 3)
    const core = new Float32Array(MAX_SHAPES * 3)
    const rim = new Float32Array(MAX_SHAPES * 3)
    const strips = new Float32Array(16)
    const discs = new Float32Array(MAX_SHAPES * 3)

    // ---- sizing, from the element rather than the window ----------------------
    let cssW = 1
    let cssH = 1
    let layout = layoutStage(live.current.items.length, 1)
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, Math.max(maxDpr, 0.5))
      cssW = Math.max(stage.clientWidth, 1)
      cssH = Math.max(stage.clientHeight, 1)
      const w = Math.floor(cssW * dpr)
      const h = Math.floor(cssH * dpr)
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      kick()
    }

    // ---- theme: the plates and the lens outline are tinted with the text colour ----
    const readColor = makeColorReader()
    let fg: [number, number, number] = [0.1, 0.1, 0.1]
    let fgFrame = 0
    const readTheme = () => {
      fg = readColor(getComputedStyle(stage).color, fg)
    }
    const themeWatch = new MutationObserver(() => {
      readTheme()
      kick()
    })
    themeWatch.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style", "data-theme"] })

    let colorKey = ""
    const readItemColors = () => {
      const its = live.current.items
      const key = its.map((it) => it.colors.join(",")).join("|")
      if (key === colorKey) return
      colorKey = key
      its.forEach((it, i) => {
        core.set(readColor(it.colors[0], [0.5, 0.4, 1]), i * 3)
        rim.set(readColor(it.colors[1], [0.9, 0.85, 1]), i * 3)
      })
    }

    // ---- motion state --------------------------------------------------------
    const anims = live.current.anims
    let camYaw = 0
    let camPitch = 0
    let lightX = 0
    let lightY = 0
    let lensX = 0
    let lensY = 0
    let lensVis = 0
    let lensPlaced = false
    let t = 0
    let last = performance.now()
    let settle = 0

    const frameState = () => {
      const now = performance.now()
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      const L = live.current
      const still = reduced
      const idleOn = L.idle && !still
      if (!still) t += dt
      const its = L.items
      const n = its.length
      while (anims.length < n) anims.push(freshAnim())
      layout = layoutStage(n, cssW / cssH)
      const cam0 = L.pointer
      const k = (rate: number) => (still ? 1 : 1 - Math.exp(-rate * dt))

      // camera tilt and the lamp follow the pointer; with no hand on it they sway
      const px = L.interactive && cam0.inside ? cam0.x - 0.5 : idleOn ? Math.sin(t * 0.23) * 0.22 : 0
      const py = L.interactive && cam0.inside ? cam0.y - 0.5 : idleOn ? Math.sin(t * 0.31 + 1) * 0.12 : 0
      camYaw += (px * 0.3 - camYaw) * k(3)
      camPitch += (-py * 0.2 - camPitch) * k(3)
      lightX += (px * 1.6 - lightX) * k(4)
      lightY += (-py * 1.2 - lightY) * k(4)
      const cam = makeCamera(camYaw, camPitch, layout.fit)

      let moving = false
      for (let i = 0; i < n; i++) {
        const a = anims[i]
        const it = its[i]
        const kind = SHAPE_KIND[it.shape] ?? 0
        const isHover = L.hovered === i || L.drag?.i === i
        const isSel = L.selected === i
        a.hover += ((isHover ? 1 : 0) - a.hover) * k(9)
        a.sel += ((isSel ? 1 : 0) - a.sel) * k(6)

        // spin: drag velocity with inertia; pitch springs back upright
        if (still) {
          // reduced motion: the shape stays exactly where the hand left it
          a.vYaw = a.vPitch = a.vSquash = a.squash = 0
        } else if (!L.drag || L.drag.i !== i) {
          a.yaw += a.vYaw * dt
          a.pitch += a.vPitch * dt
          a.vYaw *= Math.exp(-2.4 * dt)
          a.vPitch = a.vPitch * Math.exp(-3 * dt) - a.pitch * 14 * dt
        }
        // squash and stretch
        a.vSquash += (-a.squash * 170 - a.vSquash * 9) * dt
        a.squash += a.vSquash * dt
        if (still) a.squash = a.vSquash = 0
        // the asterisk turns, faster under the pointer; the hourglass flips like a timer
        if (kind === 1 && !still) a.roll += dt * (0.25 + 3.2 * a.hover)
        if (kind === 3) {
          if (idleOn && Math.floor(t / 6.5 + i * 0.13) > Math.floor((t - dt) / 6.5 + i * 0.13)) a.flips += 1
          const target = a.flips * Math.PI
          a.flipAngle = still ? target : damp(a.flipAngle, target, 5.5, dt)
          a.roll = a.flipAngle
        }
        if (Math.abs(a.vYaw) > 0.01 || Math.abs(a.vPitch) > 0.01 || Math.abs(a.squash) > 0.002) moving = true

        const [hx, hy] = layout.pts[i]
        const bob = idleOn ? Math.sin(t * 1.05 + i * 1.3) * 0.07 : 0
        const lift = 0.5 * a.hover + 0.22 * a.sel
        const s = 1 + 0.06 * a.hover + 0.03 * a.sel
        pos.set([hx, hy + bob, lift, s], i * 4)
        const idleYaw = idleOn ? Math.sin(t * 0.45 + i * 1.7) * 0.4 : 0
        const idlePitch = idleOn ? Math.sin(t * 0.37 + i * 2.3) * 0.2 : 0
        rotation(a.yaw + idleYaw, a.pitch + idlePitch, a.roll, rot, i * 9)
        const spread = 1 + 0.42 * Math.max(a.hover, a.sel * 0.45)
        info.set([kind, 0, a.hover, spread], i * 4)
        const sq = clamp(a.squash, -0.6, 0.6)
        squash.set([1 + 0.1 * sq, 1 - 0.14 * sq, 1 + 0.1 * sq], i * 3)

        // keep the invisible button over the shape
        const btn = buttonRefs.current[i]
        if (btn) {
          const [sx, sy, unit] = project(cam, [hx, hy + bob, lift], cssW, cssH)
          const r = unit * 1.12 * s
          btn.style.width = btn.style.height = Math.round(r * 2) + "px"
          btn.style.transform = "translate(" + (sx - r).toFixed(1) + "px," + (sy - r).toFixed(1) + "px)"
        }
      }

      // plates
      const st = stripsFor(its.map((it) => it.tile ?? "none"), layout.pts)
      strips.fill(0)
      st.forEach((s, j) => strips.set([s[0], s[1], s[2], 0], j * 4))
      let dc = 0
      its.forEach((it, i) => {
        if (it.tile === "disc") discs.set([layout.pts[i][0], layout.pts[i][1], 1.3], dc++ * 3)
      })

      // the lens rests between the first two shapes and follows the pointer
      const p0 = layout.pts[0] ?? [0, 0]
      const homeX = p0[0] + (layout.rows === 1 ? SPACING * 0.6 : SPACING * 0.5)
      const homeY = p0[1] - (layout.rows === 1 ? 0 : 0.3)
      let tx = homeX
      let ty = homeY
      if (L.interactive && cam0.inside) [tx, ty] = unproject(cam, cam0.x * cssW, cam0.y * cssH, cssW, cssH, 1.9)
      if (!lensPlaced) {
        lensX = tx
        lensY = ty
        lensPlaced = true
      }
      lensX += (tx - lensX) * k(cam0.inside ? 7 : 2.5)
      lensY += (ty - lensY) * k(cam0.inside ? 7 : 2.5)
      lensVis += ((L.lens && n > 0 ? 1 : 0) - lensVis) * k(5)

      readItemColors()
      if (fgFrame++ % 45 === 0) readTheme()

      return { cam, n, stripCount: st.length, discCount: dc, moving }
    }

    const paint = () => {
      const f = frameState()
      const L = live.current
      gl.useProgram(program)
      gl.bindVertexArray(vao)
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.uniform2f(U.res, canvas.width, canvas.height)
      gl.uniform1i(U.count, f.n)
      gl.uniform4fv(U.pos, pos)
      gl.uniformMatrix3fv(U.rot, false, rot)
      gl.uniform4fv(U.info, info)
      gl.uniform3fv(U.squash, squash)
      gl.uniform3fv(U.core, core)
      gl.uniform3fv(U.rim, rim)
      gl.uniform4fv(U.strip, strips)
      gl.uniform1i(U.stripCount, f.stripCount)
      gl.uniform3fv(U.disc, discs)
      gl.uniform1i(U.discCount, f.discCount)
      gl.uniform3fv(U.eye, f.cam.eye)
      gl.uniform3fv(U.right, f.cam.right)
      gl.uniform3fv(U.up, f.cam.up)
      gl.uniform3fv(U.back, f.cam.back)
      gl.uniform1f(U.fov, f.cam.fov)
      gl.uniform3f(U.light, -0.45 + lightX, 0.6 + lightY, 1.3)
      gl.uniform4f(U.lens, lensX, lensY, 1.0, lensVis)
      gl.uniform3fv(U.fg, fg)
      gl.uniform1f(U.shadow, clamp(L.shadow, 0, 1) * 0.13)
      gl.uniform1f(U.glow, clamp(L.glow, 0, 1) * 0.5)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
      return f.moving
    }

    // ---- loop, paused whenever nobody can see it -------------------------------
    let raf = 0
    let visible = true
    const frame = () => {
      raf = 0
      const moving = paint()
      if (moving || !reduced) settle = 0
      else settle++
      // Reduced motion: draw until the springs settle, then stop until the next event.
      const keepGoing = reduced ? settle < 2 : true
      if (keepGoing && visible && !document.hidden) raf = requestAnimationFrame(frame)
    }
    function kick() {
      settle = 0
      if (!raf && visible && !document.hidden) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    }
    live.current.kick = kick
    const io = new IntersectionObserver((entries) => {
      visible = entries.some((e) => e.isIntersecting)
      kick()
    })
    io.observe(stage)
    document.addEventListener("visibilitychange", kick)

    const onLost = (e: Event) => {
      e.preventDefault()
      cancelAnimationFrame(raf)
      raf = 0
    }
    const onRestored = () => setGeneration((g) => g + 1)
    canvas.addEventListener("webglcontextlost", onLost)
    canvas.addEventListener("webglcontextrestored", onRestored)

    readTheme()
    const ro = new ResizeObserver(resize)
    ro.observe(stage)
    resize()
    // Paint before the first rAF so nothing flashes an empty card.
    paint()

    return () => {
      cancelAnimationFrame(raf)
      raf = 0
      live.current.kick = () => {}
      ro.disconnect()
      io.disconnect()
      themeWatch.disconnect()
      document.removeEventListener("visibilitychange", kick)
      canvas.removeEventListener("webglcontextlost", onLost)
      canvas.removeEventListener("webglcontextrestored", onRestored)
      gl.deleteVertexArray(vao)
      gl.deleteProgram(program)
    }
  }, [reduced, generation, maxDpr])

  // ---- pointer ----------------------------------------------------------------
  const onStageMove = (e: React.PointerEvent) => {
    const el = stageRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const p = live.current.pointer
    p.x = clamp((e.clientX - r.left) / Math.max(r.width, 1), 0, 1)
    p.y = clamp((e.clientY - r.top) / Math.max(r.height, 1), 0, 1)
    p.inside = e.pointerType !== "touch" || !!live.current.drag
    const d = live.current.drag
    if (d) {
      const a = live.current.anims[d.i]
      const now = performance.now()
      const dx = e.clientX - d.lx
      const dy = e.clientY - d.ly
      if (Math.hypot(e.clientX - d.x, e.clientY - d.y) > 5) d.moved = true
      if (a) {
        const dtm = Math.max((now - d.lt) / 1000, 1 / 240)
        a.yaw += dx * 0.012
        a.pitch = clamp(a.pitch + dy * 0.012, -1.2, 1.2)
        a.vYaw = a.vYaw * 0.4 + ((dx * 0.012) / dtm) * 0.6
        a.vPitch = a.vPitch * 0.4 + ((dy * 0.012) / dtm) * 0.6
      }
      d.lx = e.clientX
      d.ly = e.clientY
      d.lt = now
    }
    live.current.kick()
  }
  const onStageLeave = () => {
    live.current.pointer.inside = false
    live.current.kick()
  }

  const onShapeDown = (i: number) => (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!interactive || e.button > 0) return
    e.currentTarget.setPointerCapture?.(e.pointerId)
    live.current.drag = { i, x: e.clientX, y: e.clientY, lx: e.clientX, ly: e.clientY, lt: performance.now(), moved: false }
    const a = live.current.anims[i]
    if (a) {
      a.vYaw = 0
      a.vPitch = 0
    }
    live.current.kick()
  }
  const onShapeUp = (i: number) => (e: React.PointerEvent<HTMLButtonElement>) => {
    const d = live.current.drag
    if (!d || d.i !== i) return
    live.current.drag = null
    e.currentTarget.releasePointerCapture?.(e.pointerId)
    if (!d.moved) toggle(i)
    if (e.pointerType === "touch") live.current.pointer.inside = false
    live.current.kick()
  }
  const onShapeKey = (i: number) => (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const n = list.length
    let to = -1
    if (e.key === "ArrowRight" || e.key === "ArrowDown") to = (i + 1) % n
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") to = (i - 1 + n) % n
    if (e.key === "Home") to = 0
    if (e.key === "End") to = n - 1
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggle(i)
      return
    }
    if (to >= 0) {
      e.preventDefault()
      buttonRefs.current[to]?.focus()
    }
  }

  return (
    <div
      ref={stageRef}
      role="group"
      aria-label={ariaLabel}
      className={
        "relative w-full touch-pan-y select-none overflow-hidden rounded-[28px] bg-foreground/[0.022] text-foreground ring-1 ring-inset ring-foreground/[0.035] " +
        className
      }
      style={{ height }}
      onPointerMove={interactive ? onStageMove : undefined}
      onPointerLeave={interactive ? onStageLeave : undefined}
      onPointerCancel={interactive ? onStageLeave : undefined}
    >
      {failed ? (
        // No WebGL2: flat gradient discs in the same order beat an empty card.
        <div className="absolute inset-0 flex items-center justify-center gap-[3%] px-[6%]" aria-hidden="true">
          {list.map((it, i) => (
            <div
              key={i}
              className="aspect-square w-[12%] min-w-10 max-w-36 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 42% 40%, " + it.colors[0] + " 0%, " + it.colors[0] + " 35%, " + it.colors[1] + " 100%)",
              }}
            />
          ))}
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 block h-full w-full"
          style={{ maxWidth: "none" }}
        />
      )}

      {!failed
        ? list.map((it, i) => {
            const on = active === i
            return (
              <button
                key={i}
                ref={(el) => {
                  buttonRefs.current[i] = el
                }}
                type="button"
                aria-pressed={on}
                aria-label={it.label}
                tabIndex={interactive ? (active == null ? (i === 0 ? 0 : -1) : on ? 0 : -1) : -1}
                disabled={!interactive}
                className={
                  "absolute left-0 top-0 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent " +
                  (interactive ? "cursor-grab active:cursor-grabbing" : "cursor-default")
                }
                style={{ width: 0, height: 0, touchAction: "none" }}
                onPointerEnter={() => setHovered(i)}
                onPointerLeave={() => setHovered((h) => (h === i ? null : h))}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered((h) => (h === i ? null : h))}
                onPointerDown={onShapeDown(i)}
                onPointerUp={onShapeUp(i)}
                onPointerCancel={() => {
                  live.current.drag = null
                }}
                onKeyDown={onShapeKey(i)}
              />
            )
          })
        : null}
    </div>
  )
}
