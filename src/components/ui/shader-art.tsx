import { type ReactNode, useEffect, useRef, useState } from "react";

export type ShaderArtProps = {
  /** How fast the field flows: 0 holds the shapes, 1 is calm, up to 4. */
  speed?: number;
  /** Strength of the accent glow, from 0 to 1. */
  intensity?: number;
  /** Size of the shapes: 2 makes them twice as large (0.25 to 4). */
  scale?: number;
  /** The field leans softly towards the pointer. */
  interactive?: boolean;
  /** Holds the current frame. */
  paused?: boolean;
  /** CSS colours in place of the tokens: base `--background`, accent `--primary`, ink `--foreground`. */
  colors?: { base?: string; accent?: string; ink?: string };
  className?: string;
  /** Content over the field; it stays readable and focusable. */
  children?: ReactNode;
};

type Colors = Required<NonNullable<ShaderArtProps["colors"]>>;
type Live = Colors & Omit<ShaderArtProps, "children" | "className" | "colors">;
type Gl = WebGLRenderingContext;
type Env = { canvas: HTMLCanvasElement; gl: Gl; lost: (on: boolean) => void };
type Scene = NonNullable<ReturnType<typeof buildScene>>;
const RANGE = { intensity: [0, 1, 0.7], scale: [0.25, 4, 1], speed: [0, 4, 1] }; // min, max, default
/** DPR cap, pixel budget, pull easing (per s), first second of flow, longest frame step (s). */
const LIMITS = { dpr: 2, ease: 3, pixels: 2_000_000, start: 80, step: 0.1 };
const UNIFORMS = ["view", "field", "base", "accent", "ink"];
const VERTEX = `attribute vec2 position;
void main() { gl_Position = vec4(position, 0.0, 1.0); }`;
/** Gradient noise (fbm) warped through itself twice: slow smoke whose crests glow with the accent. */
const FRAGMENT = `precision highp float;
uniform vec3 base, accent, ink;
uniform vec4 view, field; // view: size, pointer; field: time, scale, intensity, pull
vec2 hash(vec2 p) {
  vec3 q = fract(p.xyx * vec3(0.1031, 0.103, 0.0973)); q += dot(q, q.yzx + 33.33);
  return fract((q.xx + q.yz) * q.zy) * 2.0 - 1.0;
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p), u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0), e = vec2(1, 0);
  return mix(mix(dot(hash(i), f), dot(hash(i + e), f - e), u.x),
    mix(dot(hash(i + e.yx), f - e.yx), dot(hash(i + 1.0), f - 1.0), u.x), u.y);
}
float fbm(vec2 p) {
  float sum = 0.0;
  for (int i = 0; i < 4; i++) {
    sum += 0.5 * pow(0.45, float(i)) * noise(p);
    p = mat2(1.6, 1.2, -1.2, 1.6) * p + vec2(3.1, 1.7);
  }
  return sum;
}
void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * view.xy) / min(view.x, view.y), d = uv - view.zw;
  float near = field.w * exp(-dot(d, d) * 5.0), t = field.x * 0.04;
  vec2 p = (uv - d * near * 0.5) * 0.85 / field.y;
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + 0.6 * t), fbm(p + 3.0 * q + vec2(8.3, 2.8) - 0.5 * t));
  float v = clamp(0.5 + 1.8 * fbm(p + 2.4 * r), 0.0, 1.0), lift = v + 0.9 * (length(r) - 0.15);
  float light = smoothstep(0.35, 0.7, dot(base, vec3(0.2126, 0.7152, 0.0722)));
  vec3 shade = mix(base * 0.7, mix(base, ink, 0.08), light);
  vec3 color = mix(shade, mix(base, accent, mix(0.12, 0.08, light)), smoothstep(0.2, 0.8, v));
  float halo = pow(smoothstep(0.3, 1.0, lift), 2.0), core = pow(smoothstep(0.7, 1.05, lift), 2.0);
  float glow = (halo + core) * 0.75 * mix(1.0, 0.7, light) + near * 0.3;
  color = mix(color, accent, clamp(glow * field.z, 0.0, 1.0));
  float sheen = exp(-abs(q.x - q.y) * 18.0) * smoothstep(0.3, 0.8, v) * mix(0.1, 0.05, light);
  color = mix(color, ink, core * core * mix(0.4, 0.0, light) * field.z + sheen);
  color = mix(color, shade, smoothstep(0.35, 1.25, length(uv)) * 0.5);
  gl_FragColor = vec4(color + hash(gl_FragCoord.xy + fract(field.x) * 61.0).x / 170.0, 1.0);
}`;

/** The program and its triangle; `null`, with nothing left behind, when it does not link. */
function buildScene(gl: Gl) {
  const [program, buffer] = [gl.createProgram(), gl.createBuffer()];
  const stages = { [gl.VERTEX_SHADER]: VERTEX, [gl.FRAGMENT_SHADER]: FRAGMENT };
  for (const [kind, source] of Object.entries(stages)) {
    const shader = gl.createShader(Number(kind));
    if (program && shader) {
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      gl.attachShader(program, shader);
    }
    gl.deleteShader(shader);
  }
  if (program) {
    gl.bindAttribLocation(program, 0, "position");
    gl.linkProgram(program);
  }
  if (!(program && buffer && gl.getProgramParameter(program, gl.LINK_STATUS))) {
    gl.deleteProgram(program);
    gl.deleteBuffer(buffer);
    return null;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  const triangle = new Float32Array([-1, -1, 3, -1, -1, 3]);
  gl.bufferData(gl.ARRAY_BUFFER, triangle, gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const at = UNIFORMS.map(
    (n) => [n, gl.getUniformLocation(program, n)] as const
  );
  return { at: Object.fromEntries(at), buffer, program };
}

const READBACK: CanvasRenderingContext2DSettings = { willReadFrequently: true };
let paint: CanvasRenderingContext2D | null | undefined;
/** A CSS colour as `element` computes it, as a background (never inherited): sRGB and alpha 0–1. */
function rgbaOf(element: HTMLElement, value: string) {
  paint ??= document.createElement("canvas").getContext("2d", READBACK);
  element.style.backgroundColor = value;
  const fill = getComputedStyle(element).backgroundColor;
  element.style.backgroundColor = "";
  if (!paint) {
    return [0, 0, 0, 0];
  }
  paint.clearRect(0, 0, 1, 1);
  paint.fillStyle = "transparent";
  paint.fillStyle = fill;
  paint.fillRect(0, 0, 1, 1);
  return [...paint.getImageData(0, 0, 1, 1).data].map((byte) => byte / 255);
}

/** `top` (sRGB and alpha) laid over the opaque `ground`: how a translucent accent shows. */
function over(top: number[], ground: number[]) {
  const alpha = top[3] ?? 0;
  return ground.map((value, i) => (top[i] ?? 0) * alpha + value * (1 - alpha));
}

/** A setting as a finite number within its range, or its default. */
function within(live: Live, key: keyof typeof RANGE) {
  const [min = 0, max = 1, preset = 1] = RANGE[key];
  const value = live[key] ?? Number.NaN;
  return Number.isFinite(value) ? Math.min(Math.max(value, min), max) : preset;
}

/** Canvas pixels for a CSS size: the device ratio up to 2, within the pixel budget. */
function pixelsFor({ height, width }: { height: number; width: number }) {
  const ratio = Math.min(window.devicePixelRatio || 1, LIMITS.dpr);
  const area = Math.max(1, width * height * ratio ** 2);
  const fit = ratio * Math.min(1, Math.sqrt(LIMITS.pixels / area));
  return [width, height].map((side) => Math.max(1, Math.floor(side * fit)));
}

/** The field on a canvas: each change asks for a frame, which asks for the next while it runs.
 * Without a scene (lost context, no link) it waits for the context to be restored. */
class Field {
  private readonly env: Env;
  private readonly motion = matchMedia("(prefers-reduced-motion: reduce)");
  private readonly stops: (() => void)[] = [];
  private scene: Scene | null = null;
  private live: Live | null = null;
  private box: { height: number; width: number };
  private onScreen = true;
  private frame = 0;
  private last = 0;
  private time = LIMITS.start;
  private pointer = { over: false, pull: 0, x: 0, y: 0 };

  constructor(env: Env, scene: Scene | null) {
    this.env = env;
    this.release(scene);
    this.box = env.canvas.getBoundingClientRect();
    this.watch();
  }

  /** New settings, or a new theme: the colours read again, then a frame. */
  update(live: Live | null) {
    this.live = live ?? this.live;
    const { base = "", accent = "", ink = "" } = this.live ?? {};
    const read = (value: string) => rgbaOf(this.env.canvas, value);
    const ground = read(base);
    const colours = { accent: read(accent), base: ground, ink: read(ink) };
    for (const [name, rgba] of Object.entries(colours)) {
      const rgb = over(rgba, ground).slice(0, 3);
      this.env.gl.uniform3fv(this.scene?.at[name] ?? null, rgb);
    }
    this.wake();
  }

  dispose() {
    cancelAnimationFrame(this.frame);
    for (const stop of this.stops) {
      stop();
    }
    this.release(null);
  }

  /** Puts `next` in place of the scene and deletes the old GL objects (no-ops when lost). */
  private release(next: Scene | null) {
    // biome-ignore lint/correctness/useHookAtTopLevel: WebGL's useProgram, not a React hook
    this.env.gl.useProgram(next?.program ?? null);
    this.env.gl.deleteProgram(this.scene?.program ?? null);
    this.env.gl.deleteBuffer(this.scene?.buffer ?? null);
    this.scene = next;
  }

  private watch() {
    const root = this.env.canvas.parentElement ?? this.env.canvas;
    const resize = new ResizeObserver(() => this.see());
    const screen = new IntersectionObserver((seen) => this.see(seen));
    const theme = new MutationObserver(() => this.update(null));
    const attributeFilter = ["class", "style", "data-theme"];
    theme.observe(document.documentElement, { attributeFilter });
    theme.observe(root, { attributeFilter }); // its own class: a new currentColor, say
    try {
      resize.observe(this.env.canvas, { box: "device-pixel-content-box" });
    } catch {
      resize.observe(this.env.canvas); // no device-pixel box (Safari): CSS size only
    }
    screen.observe(this.env.canvas);
    const scheme = matchMedia("(prefers-color-scheme: dark)");
    const on: [EventTarget, string, (event: Event) => void][] = [
      [this.motion, "change", () => this.wake()],
      [scheme, "change", () => this.update(null)],
      [document, "visibilitychange", () => this.wake()],
      [window, "resize", () => this.see()], // zoom: CSS size changes, device pixels may not
      [root, "pointermove", (event) => this.aim(event as PointerEvent)],
      [root, "pointerleave", () => this.aim(null)],
      [this.env.canvas, "webglcontextlost", (event) => this.rebuild(event)],
      [this.env.canvas, "webglcontextrestored", (event) => this.rebuild(event)],
    ];
    for (const [target, type, run] of on) {
      target.addEventListener(type, run);
      this.stops.push(() => target.removeEventListener(type, run));
    }
    this.stops.push(() => [resize, screen, theme].map((o) => o.disconnect()));
  }

  private see(seen?: IntersectionObserverEntry[]) {
    this.box = this.env.canvas.getBoundingClientRect();
    this.onScreen = seen?.at(-1)?.isIntersecting ?? this.onScreen;
    this.wake();
  }

  /** The pointer over the element (centred, in its shorter side, y up), or gone. */
  private aim(event: PointerEvent | null) {
    const { canvas } = this.env;
    const { height, left, top, width } = canvas.getBoundingClientRect();
    const side = Math.max(1, Math.min(width, height));
    const [centreX, centreY] = [left + width / 2, top + height / 2];
    const x = event ? (event.clientX - centreX) / side : this.pointer.x;
    const y = event ? (centreY - event.clientY) / side : this.pointer.y;
    this.pointer = { ...this.pointer, over: event !== null, x, y };
  }

  /** A lost context draws nothing until it is restored; then the scene is built again. */
  private rebuild(event: Event) {
    event.preventDefault();
    const lost = event.type === "webglcontextlost";
    this.release(lost ? null : buildScene(this.env.gl));
    this.env.lost(!this.scene);
    this.update(null);
  }

  private wake() {
    this.frame ||= requestAnimationFrame(this.tick);
  }

  private readonly tick = (now: number) => {
    const { live, motion, onScreen, scene } = this;
    const held = !(live && scene && onScreen) || live.paused || motion.matches;
    const running = !(held || document.hidden);
    const step = running && this.last ? (now - this.last) / 1000 : 0;
    this.last = running ? now : 0;
    this.frame = running ? requestAnimationFrame(this.tick) : 0;
    this.draw(Math.min(step, LIMITS.step));
  };

  private draw(step: number) {
    const { pointer, live, scene } = this;
    const { canvas, gl } = this.env;
    if (!(live && scene)) {
      return;
    }
    const goal = pointer.over && live.interactive ? 1 : 0;
    const ease = 1 - Math.exp(-step * LIMITS.ease);
    const pull = pointer.pull + (goal - pointer.pull) * ease;
    this.pointer = { ...pointer, pull };
    this.time += step * within(live, "speed");
    const [width = 1, height = 1] = pixelsFor(this.box);
    if (canvas.width !== width || canvas.height !== height) {
      Object.assign(canvas, { height, width });
    }
    const looks = [within(live, "scale"), within(live, "intensity")];
    gl.viewport(0, 0, width, height);
    gl.uniform4fv(scene.at.view ?? null, [width, height, pointer.x, pointer.y]);
    gl.uniform4fv(scene.at.field ?? null, [this.time, ...looks, pull]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
}

/** A WebGL field in the theme's colours behind its children; `contain: paint` holds the canvas. */
export function ShaderArt({
  speed,
  intensity,
  scale,
  interactive = true,
  paused = false,
  colors,
  className,
  children,
}: ShaderArtProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldRef = useRef<Field | null>(null);
  const [fallback, setFallback] = useState(false);
  const base = colors?.base ?? "var(--background)";
  const accent = colors?.accent ?? "var(--primary)";
  const ink = colors?.ink ?? "var(--foreground)";

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { antialias: false, depth: false });
    const env = canvas && gl ? { canvas, gl, lost: setFallback } : null;
    const scene = gl ? buildScene(gl) : null;
    const field = env && new Field(env, scene);
    fieldRef.current = field;
    setFallback(!scene);
    return () => field?.dispose();
  }, []);

  useEffect(() => {
    const live = { accent, base, ink, intensity, interactive, paused };
    fieldRef.current?.update({ ...live, scale, speed });
  }, [accent, base, ink, intensity, interactive, paused, scale, speed]);

  const cssGlow = `radial-gradient(120% 90% at 20% 0%, color-mix(in oklab, ${accent} 30%, transparent), transparent 70%)`;
  const backgroundImage = fallback ? cssGlow : "none";
  return (
    <div
      className={className}
      data-renderer={fallback ? "css" : "webgl"}
      data-slot="shader-art"
      style={{ backgroundColor: base, backgroundImage, contain: "paint" }}
    >
      <canvas
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        hidden={fallback}
        ref={canvasRef}
        tabIndex={-1}
      />
      {children}
    </div>
  );
}

export default ShaderArt;
