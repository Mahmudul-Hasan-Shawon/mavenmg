import { useRef, type CSSProperties, type ReactNode } from 'react'
import { gsap, useGsapContext } from '../../hooks/useGsap'
import { cn } from '../../utils/cn'

type Mode = 'words' | 'chars'
type Trigger = 'load' | 'scroll'

interface AnimatedTextProps {
  children: string
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div'
  mode?: Mode
  className?: string
  delay?: number
  stagger?: number
  duration?: number
  blur?: boolean
  /** Apply the Maven gradient fill to every word/char unit. Applied per-unit
   *  (not on a parent) because transforms break parent-level background-clip. */
  gradient?: boolean
  /** Words (case-insensitive) to render in solid maven-light instead of the
   *  inherited color. Only applies in words mode. */
  highlight?: string[]
  /** Trigger on mount (hero) vs when scrolled into view (default). */
  trigger?: Trigger
  /** for a11y: visual splits get aria-hidden, parent keeps a label */
  style?: CSSProperties
}

/**
 * Split-text reveal: words or characters rise out of individual masks with an
 * optional blur-to-sharp. GSAP-driven, scroll-triggered by default.
 */
export function AnimatedText({
  children,
  as: TagProp = 'span',
  mode = 'words',
  className,
  delay = 0,
  stagger = 0.05,
  duration = 0.9,
  blur = false,
  gradient = false,
  highlight,
  trigger = 'scroll',
  style,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null)
  const text = children

  useGsapContext(
    ref,
    ({ ScrollTrigger: ST }) => {
      const targets = ref.current?.querySelectorAll<HTMLElement>('[data-unit]')
      if (!targets?.length) return
      gsap.fromTo(
        targets,
        {
          yPercent: 115,
          ...(blur ? { opacity: 0.2, filter: 'blur(10px)' } : {}),
        },
        {
          yPercent: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration,
          ease: 'expo.out',
          stagger: mode === 'chars' ? stagger : stagger,
          delay,
          ...(trigger === 'scroll'
            ? {
                scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
              }
            : {}),
        }
      )
      void ST
    },
    [text, mode, blur, trigger]
  )

  // Build the split. Words/chars live inside overflow-hidden masks so they
  // "rise out of a line" rather than fading in place.
  const lines = text.split('\n')
  let key = 0

  const renderLine = (line: string, li: number) => (
    <span key={li} className="block" style={{ overflow: 'hidden', paddingBottom: '0.08em', marginBottom: '-0.08em' }}>
      {mode === 'words'
        ? line.split(/(\s+)/).map((piece) =>
            /^\s+$/.test(piece) ? (
              <span key={key++}> </span>
            ) : (
              <Mask key={key++} gradient={gradient} highlight={highlight?.includes(piece.toLowerCase())}>
                {piece}
              </Mask>
            )
          )
        : Array.from(line).map((ch) => (
            <Mask key={key++} preserveSpace gradient={gradient}>
              {ch}
            </Mask>
          ))}
    </span>
  )

  const Tag = TagProp as 'span'

  return (
    <Tag ref={ref as never} className={cn(className)} style={style} aria-label={text.replace(/\n/g, ' ')}>
      <span aria-hidden="true" className="inline">
        {lines.map(renderLine)}
      </span>
    </Tag>
  )
}

function Mask({
  children,
  preserveSpace = false,
  gradient = false,
  highlight = false,
}: {
  children: ReactNode
  preserveSpace?: boolean
  gradient?: boolean
  highlight?: boolean
}) {
  return (
    <span
      data-unit
      className={cn(
        'inline-block will-change-transform',
        gradient && 'grad-text',
        highlight && 'text-maven-light'
      )}
      style={preserveSpace && children === ' ' ? { whiteSpace: 'pre' } : undefined}
    >
      {children}
    </span>
  )
}
