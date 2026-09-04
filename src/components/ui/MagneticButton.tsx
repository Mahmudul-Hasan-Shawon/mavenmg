import { useRef, type ReactNode, type MouseEvent } from 'react'
import { gsap } from '../../hooks/useGsap'
import { useFinePointer, useReducedMotion } from '../../hooks/useDevice'
import { cn } from '../../utils/cn'

interface MagneticButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  external?: boolean
  variant?: 'primary' | 'ghost' | 'light'
  className?: string
  strength?: number
  ariaLabel?: string
  /** Set to "submit" when used as a form submit control. */
  type?: 'button' | 'submit'
}

const styles: Record<NonNullable<MagneticButtonProps['variant']>, string> = {
  primary:
    'bg-maven text-white-solid hover:bg-maven-light border border-maven-light/40 shadow-[0_10px_32px_-10px_rgba(139,79,191,0.55)] hover:shadow-[0_0_36px_-4px_rgba(139,79,191,0.6)]',
  ghost:
    'bg-transparent text-white border border-line hover:border-maven-lighter/50 hover:bg-maven-lighter/[0.04]',
  light:
    'bg-maven text-white-solid border border-maven-light/40 hover:bg-maven-light shadow-[0_10px_32px_-10px_rgba(139,79,191,0.55)] hover:shadow-[0_0_36px_-4px_rgba(139,79,191,0.6)]',
}

/** Pill CTA with magnetic pointer attraction and a sliding label. */
export function MagneticButton({
  children,
  onClick,
  href,
  external,
  variant = 'primary',
  className,
  strength = 0.35,
  ariaLabel,
  type = 'button',
}: MagneticButtonProps) {
  const wrapRef = useRef<HTMLSpanElement>(null)
  const innerRef = useRef<HTMLSpanElement>(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()

  const onMove = (e: MouseEvent) => {
    if (!fine || reduced) return
    const el = wrapRef.current
    const inner = innerRef.current
    if (!el || !inner) return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    gsap.to(inner, { x: dx * strength, y: dy * strength, duration: 0.5, ease: 'power3.out' })
  }

  const onLeave = () => {
    if (!innerRef.current) return
    gsap.to(innerRef.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.45)' })
  }

  const cls = cn(
    'group relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[15px] font-medium tracking-tight overflow-hidden cursor-pointer select-none transition-shadow duration-300',
    styles[variant],
    className
  )

  const inner = (
    <span ref={innerRef} className="relative z-10 inline-flex items-center gap-2.5">
      {children}
    </span>
  )

  return (
    <span ref={wrapRef} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      {href ? (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noreferrer' : undefined}
          aria-label={ariaLabel}
          className={cls}
          data-cursor
        >
          {inner}
        </a>
      ) : (
        <button type={type} onClick={onClick} aria-label={ariaLabel} className={cls} data-cursor>
          {inner}
        </button>
      )}
    </span>
  )
}

/** Understated text link with sliding underline + arrow. */
export function TextLink({
  children,
  onClick,
  href,
  className,
}: {
  children: ReactNode
  onClick?: () => void
  href?: string
  className?: string
}) {
  const cls = cn(
    'link-line inline-flex items-center gap-2 text-[15px] font-medium text-maven-lighter cursor-pointer',
    className
  )
  if (href) {
    return (
      <a href={href} className={cls} data-cursor>
        {children}
      </a>
    )
  }
  return (
    <button type="button" onClick={onClick} className={cls} data-cursor>
      {children}
    </button>
  )
}
