import { useRef, type ReactNode, type MouseEvent } from 'react'
import { gsap } from '../../hooks/useGsap'
import { useFinePointer, useReducedMotion } from '../../hooks/useDevice'
import { cn } from '../../utils/cn'

interface MagneticButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  external?: boolean
  /**
   * Visual spec. `primary` = solid brand violet; `ghost` = hairline outline;
   * `accent` = brighter solid violet; `deep` = quiet dark-violet tier;
   * `frost` = translucent frosted pill for use over imagery.
   */
  variant?: 'primary' | 'ghost' | 'accent' | 'deep' | 'frost'
  /** Pill size — carries padding, font size and weight as one spec. */
  size?: 'default' | 'sm' | 'md' | 'lg'
  /** Stretch the pill to fill its container (e.g. full-width on mobile). */
  fullWidth?: boolean
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
  accent:
    'bg-maven-light text-white-solid border border-maven-light hover:bg-maven-light-hover hover:border-maven-light-hover',
  deep:
    'bg-maven-deep text-white-solid border border-maven-deep hover:bg-maven-light-hover hover:border-maven-light-hover',
  frost:
    'bg-white-solid text-maven border border-line hover:bg-[#efeafb] backdrop-blur-md',
}

const sizes: Record<NonNullable<MagneticButtonProps['size']>, string> = {
  default: 'px-7 py-3.5 text-[15px] font-medium',
  sm: 'px-5 py-2.5 text-[13.5px]',
  md: 'px-6 py-3 text-sm font-semibold',
  lg: 'px-8 py-4 text-base sm:px-10 sm:text-lg font-bold',
}

/** Pill CTA with magnetic pointer attraction and a sliding label. */
export function MagneticButton({
  children,
  onClick,
  href,
  external,
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  className,
  strength = 0.35,
  ariaLabel,
  type = 'button',
}: MagneticButtonProps) {
  const innerRef = useRef<HTMLSpanElement>(null)
  const fine = useFinePointer()
  const reduced = useReducedMotion()

  const onMove = (e: MouseEvent) => {
    if (!fine || reduced) return
    const el = e.currentTarget as HTMLElement
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
    'group relative inline-flex items-center justify-center gap-2.5 rounded-full tracking-tight overflow-hidden cursor-pointer select-none transition-shadow duration-300',
    styles[variant],
    sizes[size],
    fullWidth && 'w-full',
    className
  )

  const inner = (
    <span ref={innerRef} className="relative z-10 inline-flex items-center gap-2.5">
      {children}
    </span>
  )

  const baseProps = {
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    className: cls,
    'aria-label': ariaLabel,
    'data-cursor': true,
  }

  return href ? (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined} {...baseProps}>
      {inner}
    </a>
  ) : (
    <button type={type} onClick={onClick} {...baseProps}>
      {inner}
    </button>
  )
}
