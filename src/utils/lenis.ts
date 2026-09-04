import type Lenis from 'lenis'

/**
 * Typed access to the shared Lenis instance. (The `lenis` package declares
 * `window.lenis` with its own incompatible shape, so we store it under a
 * symbol-safe cast instead of fighting the global merge.)
 */
export function getLenis(): Lenis | undefined {
  return (window as unknown as { lenis?: Lenis }).lenis
}

export function setLenis(lenis: Lenis | undefined) {
  ;(window as unknown as { lenis?: Lenis }).lenis = lenis
}
