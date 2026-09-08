import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../hooks/useGsap'
import { getLenis } from '../../utils/lenis'
import { markAppReady, reducedMotion } from '../../utils/motion'

const SHOWN_KEY = 'maven-loaded'
const MIN_HOLD = 450

/**
 * First-load readiness gate (not a preloader). A flat, theme-colored cover
 * stays up until the page has fully loaded, then wipes upward while the
 * load-triggered entrance animations begin — so nothing renders scattered or
 * half-animated. Plays once per session; skipped entirely under reduced
 * motion.
 */
export function ReadyVeil() {
  const [hidden, setHidden] = useState(() => {
    if (reducedMotion) return true
    try {
      return sessionStorage.getItem(SHOWN_KEY) === '1'
    } catch {
      return false
    }
  })
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hidden) {
      markAppReady()
      return
    }
    const root = rootRef.current
    if (!root) return

    document.documentElement.style.overflow = 'hidden'
    getLenis()?.stop()

    let cancelled = false
    let holdTimer: number | undefined
    let tl: ReturnType<typeof gsap.timeline> | undefined

    const finish = () => {
      if (cancelled) return
      try {
        sessionStorage.setItem(SHOWN_KEY, '1')
      } catch {
        /* private mode */
      }
      document.documentElement.style.overflow = ''
      getLenis()?.start()
      setHidden(true)
    }

    const reveal = () => {
      if (cancelled) return
      tl = gsap.timeline({ onComplete: finish })
      tl.call(markAppReady, undefined, 0)
      tl.to(root, { clipPath: 'inset(0 0 100% 0)', duration: 0.7, ease: 'power4.inOut' })
    }

    const mountedAt = performance.now()
    const beginTurn = () => {
      const elapsed = performance.now() - mountedAt
      if (elapsed >= MIN_HOLD) reveal()
      else holdTimer = window.setTimeout(reveal, MIN_HOLD - elapsed)
    }

    if (document.readyState === 'complete') beginTurn()
    else window.addEventListener('load', beginTurn, { once: true })

    return () => {
      cancelled = true
      if (holdTimer !== undefined) window.clearTimeout(holdTimer)
      tl?.kill()
      document.documentElement.style.overflow = ''
      getLenis()?.start()
    }
  }, [hidden])

  if (hidden) return null

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[160] bg-void will-change-[clip-path]"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    />
  )
}