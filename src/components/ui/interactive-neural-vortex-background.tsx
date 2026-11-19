import { useEffect, useRef } from 'react'

/**
 * InteractiveNeuralVortex: animated WebGL "neural vortex" shader background
 * (interactive-neural-vortex-background), pointer-reactive and scroll-aware.
 *
 * Adapted from the original drop-in snippet for this codebase:
 *  - rendered as a section background (absolute, fills its parent) instead
 *    of a fixed full-viewport layer, so it can live inside the FinalCTA card
 *  - sized from its own box via ResizeObserver (not window dimensions), with
 *    device pixel ratio capped at 2
 *  - typed throughout; the original's <style jsx> block and global
 *    `!important` color rules were Next.js-only and site-wide respectively,
 *    so neither carried over
 *  - the RAF loop pauses when the element leaves the viewport and renders a
 *    single static frame under prefers-reduced-motion
 *
 * Props: className only. Pointer and scroll input come from the window, so
 * the vortex center follows the visitor's cursor wherever the card sits.
 * No assets, contexts, or external dependencies (plain WebGL).
 */

const VS_SOURCE = `
  precision mediump float;
  attribute vec2 a_position;
  varying vec2 vUv;
  void main() {
    vUv = .5 * (a_position + 1.);
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`

const FS_SOURCE = `
  precision mediump float;
  varying vec2 vUv;
  uniform float u_time;
  uniform float u_ratio;
  uniform vec2 u_pointer_position;
  uniform float u_scroll_progress;

  vec2 rotate(vec2 uv, float th) {
    return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
  }

  float neuro_shape(vec2 uv, float t, float p) {
    vec2 sine_acc = vec2(0.);
    vec2 res = vec2(0.);
    float scale = 8.;
    for (int j = 0; j < 15; j++) {
      uv = rotate(uv, 1.);
      sine_acc = rotate(sine_acc, 1.);
      vec2 layer = uv * scale + float(j) + sine_acc - t;
      sine_acc += sin(layer) + 2.4 * p;
      res += (.5 + .5 * cos(layer)) / scale;
      scale *= (1.2);
    }
    return res.x + res.y;
  }

  void main() {
    vec2 uv = .5 * vUv;
    uv.x *= u_ratio;
    vec2 pointer = vUv - u_pointer_position;
    pointer.x *= u_ratio;
    float p = clamp(length(pointer), 0., 1.);
    p = .5 * pow(1. - p, 2.);
    float t = .001 * u_time;
    vec3 color = vec3(0.);
    float noise = neuro_shape(uv, t, p);
    noise = 1.2 * pow(noise, 3.);
    noise += pow(noise, 10.);
    noise = max(.0, noise - .5);
    noise *= (1. - length(vUv - .5));
    color = vec3(0.5, 0.15, 0.65);
    color = mix(color, vec3(0.02, 0.7, 0.9), 0.32 + 0.16 * sin(2.0 * u_scroll_progress + 1.2));
    color += vec3(0.15, 0.0, 0.6) * sin(2.0 * u_scroll_progress + 1.5);
    color = color * noise;
    gl_FragColor = vec4(color, noise);
  }
`

export function InteractiveNeuralVortexBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvasEl = canvasRef.current
    if (!canvasEl) return

    const gl = (canvasEl.getContext('webgl') ||
      canvasEl.getContext('experimental-webgl')) as WebGLRenderingContext | null
    if (!gl) return

    const compileShader = (source: string, type: number): WebGLShader | null => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = compileShader(VS_SOURCE, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(FS_SOURCE, gl.FRAGMENT_SHADER)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }
    gl.useProgram(program)

    // Full-screen quad.
    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    const uTime = gl.getUniformLocation(program, 'u_time')
    const uRatio = gl.getUniformLocation(program, 'u_ratio')
    const uPointerPosition = gl.getUniformLocation(program, 'u_pointer_position')
    const uScrollProgress = gl.getUniformLocation(program, 'u_scroll_progress')

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const pointer = { x: 0, y: 0, tX: 0, tY: 0 }
    let raf = 0
    let running = false

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvasEl.clientWidth
      const h = canvasEl.clientHeight
      if (!w || !h) return
      canvasEl.width = Math.round(w * dpr)
      canvasEl.height = Math.round(h * dpr)
      gl.viewport(0, 0, canvasEl.width, canvasEl.height)
      gl.uniform1f(uRatio, canvasEl.width / canvasEl.height)
    }

    const draw = () => {
      pointer.x += (pointer.tX - pointer.x) * 0.2
      pointer.y += (pointer.tY - pointer.y) * 0.2
      gl.uniform1f(uTime, performance.now())
      gl.uniform2f(
        uPointerPosition,
        pointer.x / window.innerWidth,
        1 - pointer.y / window.innerHeight
      )
      gl.uniform1f(uScrollProgress, window.scrollY / (2 * window.innerHeight))
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    const render = () => {
      draw()
      raf = requestAnimationFrame(render)
    }

    const start = () => {
      if (!running) {
        running = true
        raf = requestAnimationFrame(render)
      }
    }

    const stop = () => {
      if (running) {
        running = false
        cancelAnimationFrame(raf)
      }
    }

    resize()
    draw() // first paint; under reduced motion this stays the static frame

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (reduced) draw()
    })
    resizeObserver.observe(canvasEl)

    // Animate only while the background is actually on screen.
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting && !reduced ? start() : stop()),
      { rootMargin: '80px' }
    )
    intersectionObserver.observe(canvasEl)

    const onPointerMove = (e: PointerEvent) => {
      pointer.tX = e.clientX
      pointer.tY = e.clientY
    }
    const onTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      if (touch) {
        pointer.tX = touch.clientX
        pointer.tY = touch.clientY
      }
    }
    if (!reduced) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('touchmove', onTouchMove, { passive: true })
    }

    return () => {
      stop()
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('touchmove', onTouchMove)
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
      gl.deleteBuffer(vertexBuffer)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />
}
