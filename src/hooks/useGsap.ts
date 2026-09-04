import { useLayoutEffect, useEffect, type RefObject } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { reducedMotion } from '../utils/motion'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/** useLayoutEffect that falls back to useEffect on the server. */
export const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * Run a gsap.context scoped to a ref, auto-reverted on unmount.
 * When the user prefers reduced motion, the setup is skipped entirely so
 * elements render in their final state.
 */
export function useGsapContext(
  ref: RefObject<HTMLElement | null>,
  setup: (ctx: { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger }) => void,
  deps: unknown[] = []
) {
  useIsoLayoutEffect(() => {
    if (!ref.current || reducedMotion) return
    const ctx = gsap.context(() => setup({ gsap, ScrollTrigger }), ref)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

/** ScrollTrigger.refresh() after fonts/images settle. */
export function useRefreshOnLoad() {
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 400)
    return () => clearTimeout(t)
  }, [])
}
