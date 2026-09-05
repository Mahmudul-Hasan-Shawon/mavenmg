import { useRef, type ReactNode, type CSSProperties } from 'react'
import { gsap, useGsapContext } from '../../hooks/useGsap'
import { cn } from '../../utils/cn'

interface RevealProps {
  children: ReactNode
  className?: string
  /** px travel distance */
  y?: number
  delay?: number
  duration?: number
  style?: CSSProperties
  as?: 'div' | 'span' | 'li' | 'section'
}

/** Standard scroll reveal: fade + rise with expo easing. */
export function Reveal({ children, className, y = 36, delay = 0, duration = 1, style, as = 'div' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  useGsapContext(
    ref,
    () => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'expo.out',
          scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
        }
      )
    },
    []
  )
  const Tag = as as 'div'
  return (
    <Tag ref={ref as never} className={cn(className)} style={style}>
      {children}
    </Tag>
  )
}
