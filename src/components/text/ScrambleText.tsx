import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useDevice'
import { cn } from '../../utils/cn'

/**
 * ScrambleText: hover-scrambling label, ported from theSTART
 * (thestart.com.au). When the pointer enters the label's host (the
 * closest <a>/<button>, falling back to the label itself), the text
 * churns through the same random-glyph charset for 240ms at 40ms ticks
 * and settles back; on leave it restores instantly. The label's width is
 * locked while scrambling so nothing reflows. Skipped under reduced
 * motion.
 */

const GLYPHS = 'eatbcdf190$*()+=/il1|!.,;:-'
const DURATION = 240
const TICK = 40

export function ScrambleText({
  children,
  className,
  as: Tag = 'span',
}: {
  children: string
  className?: string
  /** Element to render, matching the host's typography. */
  as?: 'span' | 'div'
}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced) return

    const original = children
    let timer: ReturnType<typeof setInterval> | null = null

    const stop = () => {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
      el.textContent = original
      el.style.width = ''
      el.style.whiteSpace = ''
    }

    const start = () => {
      if (timer) return
      /* Lock the width so random glyphs can't shift the layout. */
      el.style.width = `${el.getBoundingClientRect().width}px`
      el.style.whiteSpace = 'nowrap'
      let elapsed = 0
      timer = setInterval(() => {
        el.textContent = original
          .split('')
          .map((ch) => (ch === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
          .join('')
        elapsed += TICK
        if (elapsed >= DURATION) stop()
      }, TICK)
    }

    /* Hover anywhere on the enclosing link/button triggers the scramble,
       matching theSTART where the whole link is the hover target. */
    const host = el.closest('a,button') ?? el
    host.addEventListener('mouseenter', start)
    host.addEventListener('mouseleave', stop)
    return () => {
      host.removeEventListener('mouseenter', start)
      host.removeEventListener('mouseleave', stop)
      stop()
    }
  }, [reduced, children])

  if (reduced) {
    return (
      <Tag ref={ref as never} className={cn(className)}>
        {children}
      </Tag>
    )
  }

  return (
    <Tag ref={ref as never} className={cn(className)}>
      {children}
    </Tag>
  )
}
