import { useEffect, useState } from 'react'

/** True once the viewport is at least `width` px wide. Reactive, so crossing
 *  the threshold (resize / device rotation) live-updates the caller. */
export function useMinWidth(width: number): boolean {
  const [wide, setWide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia?.(`(min-width: ${width}px)`).matches
  )
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${width}px)`)
    const onChange = () => setWide(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [width])
  return wide
}

/** True when the device has a fine pointer (mouse/trackpad). */
export function useFinePointer(): boolean {
  const [fine, setFine] = useState(
    () => typeof window !== 'undefined' && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const onChange = (e: MediaQueryListEvent) => setFine(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return fine
}

/** Reactive prefers-reduced-motion. */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}
