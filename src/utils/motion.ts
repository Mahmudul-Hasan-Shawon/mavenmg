/**
 * Shared motion/scroll state. Lenis writes to this on every scroll tick;
 * R3F scenes read it inside useFrame no React re-renders involved.
 */
export const scrollState = {
  y: 0,
  progress: 0, // 0..1 through the whole document
  velocity: 0, // px/frame, smoothed
}

/** Device quality tier for WebGL scenes. */
export type Tier = 'high' | 'mid' | 'low'

export const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true

function detectTier(): Tier {
  if (typeof navigator === 'undefined') return 'mid'
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8
  const cores = navigator.hardwareConcurrency || 4
  const mobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
  if (mem <= 2 || cores <= 2) return 'low'
  if (mem <= 4 || cores <= 4 || mobile) return 'mid'
  return 'high'
}

export const tier: Tier = detectTier()
export const isMobileWidth = () => typeof window !== 'undefined' && window.innerWidth < 768

/** Skip WebGL entirely on low-power devices / reduced motion. */
export const skipWebGL = reducedMotion || tier === 'low'

export const quality = {
  tier,
  dpr: tier === 'high' ? Math.min(window.devicePixelRatio || 1, 2) : tier === 'mid' ? 1.5 : 1,
  heroNodes: { high: 110, mid: 70, low: 40 }[tier],
  heroFlow: { high: 260, mid: 140, low: 60 }[tier],
  fieldCount: { high: 6500, mid: 3200, low: 1200 }[tier],
  mavenNodes: { high: 140, mid: 90, low: 52 }[tier],
}

type ReadyListener = () => void
let appReady = false
const readyWaiters: ReadyListener[] = []

/**
 * Register a callback that runs once the app is ready for entrance
 * animations (after the readiness veil has settled). If already ready, it
 * fires immediately so this also works for sections that mount later.
 */
export function onAppReady(cb: ReadyListener) {
  if (appReady) cb()
  else readyWaiters.push(cb)
}

/** Mark the app ready called by ReadyVeil so load-triggered intro
 *  animations start exactly as the cover lifts. */
export function markAppReady() {
  if (appReady) return
  appReady = true
  const waiters = readyWaiters.splice(0)
  for (const cb of waiters) cb()
}

export function resetAppReady() {
  appReady = false
  readyWaiters.length = 0
}

/**
 * Pointer handler for the `.spotlight` utility: feeds the cursor position
 * into the CSS vars the radial wash reads. Attach via onPointerMove on the
 * spotlight host element.
 */
export function trackSpotlight(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
  el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
}
