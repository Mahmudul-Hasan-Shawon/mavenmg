import { useEffect, useRef } from 'react'
import { gsap } from '../../hooks/useGsap'
import { useFinePointer, useReducedMotion } from '../../hooks/useDevice'

/**
 * Custom cursor: a single precise dot that tracks the pointer and gently
 * scales up over interactive elements. Desktop pointers only; inert under
 * reduced motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()

  useEffect(() => {
    if (!fine || reduced) return
    const dot = dotRef.current
    if (!dot) return

    gsap.set(dot, { xPercent: -50, yPercent: -50, x: -100, y: -100, opacity: 0, scale: 1 })
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.14, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.14, ease: 'power3.out' })

    let shown = false
    const onMove = (e: PointerEvent) => {
      if (!shown) {
        shown = true
        gsap.to(dot, { opacity: 1, duration: 0.3 })
      }
      dotX(e.clientX)
      dotY(e.clientY)
    }

    const onOver = (e: Event) => {
      const target = e.target as HTMLElement
      const interactive = target.closest('a, button, [data-cursor], input, textarea, select, label')
      gsap.to(dot, { scale: interactive ? 2.4 : 1, duration: 0.35, ease: 'power3.out' })
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [fine, reduced])

  if (!fine || reduced) return null

  return <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
}
