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

/** Parallax wrapper: translates its child as it passes through the viewport. */
export function Parallax({
  children,
  className,
  distance = 60,
}: {
  children: ReactNode
  className?: string
  distance?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  useGsapContext(
    ref,
    ({ ScrollTrigger: ST }) => {
      gsap.fromTo(
        ref.current,
        { y: distance },
        {
          y: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.6,
          },
        }
      )
      void ST
    },
    [distance]
  )
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
