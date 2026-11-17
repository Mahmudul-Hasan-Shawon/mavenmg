import { useRef } from 'react'
import {
  ArrowRight,
  GraduationCap,
  Gem,
  HeartHandshake,
  PenTool,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { reasons } from '../data/content'
import { MagneticButton } from '../components/ui/MagneticButton'
import { Eyebrow } from '../components/text/Eyebrow'
import { SectionHeading } from '../components/ui/SectionHeading'
import { gsap, useGsapContext } from '../hooks/useGsap'
import { reducedMotion } from '../utils/motion'
import { cn } from '../utils/cn'

const reasonIcons: Record<string, LucideIcon> = {
  '01': PenTool,
  '02': GraduationCap,
  '03': TrendingUp,
  '04': HeartHandshake,
  '05': ShieldCheck,
  '06': Sparkles,
  '07': Gem,
}

/**
 * WhyMaven "Why Choose Maven", ported from vault.hyperiux.com/demo/
 * circular-slider: the reasons (plus the contact CTA) sit on a huge
 * invisible wheel; a pinned 250vh scroll range rotates the wheel so each
 * card turns into focus, scrubbed at 0.25 for weight. Below lg, and for
 * reduced-motion users (the rotation can't be meaningfully reduced), the
 * wheel drops and the same cards render as a plain stacked grid, matching
 * the vault's own mobile fallback. Cards wear a light-violet ramp so the
 * brand reads through the rotating arc.
 */

/** Arc spacing between neighbouring cards on the wheel (px). */
const WHEEL_GAP = 24
const CARD_WIDTH = 320
const CARD_HEIGHT = 360

/** Light-violet ramp the reason cards cycle through (Maven-ized from the
 *  vault demo's pastel palette). Capped at light-mid tones so the deep
 *  violet card text keeps readable contrast on every step. */
const CARD_BG = ['#EAE0FC', '#DCC9F7', '#CDB2F1', '#BD97EA', '#AE80E6', '#A977E3']
const CARD_FG = '#2A1140'

interface WheelCard {
  index?: string
  icon?: LucideIcon
  title: string
  description: string
  bg: string
  fg: string
  cta?: boolean
}

const WHEEL_CARDS: WheelCard[] = [
  // "06 Innovative & Creative Design" is dropped from the wheel per request;
  // the remaining reasons renumber sequentially (07 -> 06).
  ...reasons
    .filter((reason) => reason.index !== '06')
    .map((reason, i) => ({
    index: String(i + 1).padStart(2, '0'),
    icon: reasonIcons[reason.index],
    title: reason.title,
    description: reason.description,
    bg: CARD_BG[i % CARD_BG.length],
    fg: CARD_FG,
  })),
  {
    icon: Sparkles,
    title: 'Ready to Build a Website That Converts?',
    description:
      "Tell us about your project and we'll craft a digital presence that drives real results.",
    bg: '#2A1140',
    fg: '#F2ECFC',
    cta: true,
  },
]

function WheelCardView({
  card,
  onNavigate,
}: {
  card: WheelCard
  onNavigate?: (href: string) => void
}) {
  const Icon = card.icon
  return (
    <div
      className="relative w-full h-full rounded-[1.75rem] flex flex-col overflow-hidden p-7 md:p-8 shadow-[0_18px_50px_-24px_rgba(42,17,64,0.45)] border transition-transform duration-500 group-hover:-translate-y-1"
      style={{
        backgroundColor: card.bg,
        color: card.fg,
        borderColor: card.cta ? 'rgba(242,236,252,0.14)' : 'rgba(42,17,64,0.14)',
      }}
    >
      {/* Ghosted numeral watermark: solid low-opacity fill so it stays
          readable on every ramp step */}
      {card.index && (
        <span
          aria-hidden="true"
          className="absolute top-1 right-5 font-poppins font-bold leading-none text-[4.5rem] select-none pointer-events-none"
          style={{ color: card.fg, opacity: 0.28 }}
        >
          {card.index}
        </span>
      )}

      {Icon && (
        <span
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: card.cta ? 'rgba(242,236,252,0.12)' : 'rgba(42,17,64,0.1)' }}
        >
          <Icon size={20} />
        </span>
      )}

      <h3 className="display font-semibold text-[1.3rem] md:text-[1.4rem] leading-snug mt-5 tracking-[0.01em]">
        {card.title}
      </h3>
      <p className="mt-3 text-sm md:text-[15px] leading-relaxed" style={{ opacity: 0.95 }}>
        {card.description}
      </p>

      {card.cta && onNavigate && (
        <div className="mt-auto pt-6">
          <MagneticButton variant="glass" onClick={() => onNavigate('/contact')}>
            Start Your Project
            <ArrowRight size={16} />
          </MagneticButton>
        </div>
      )}
    </div>
  )
}

export function WhyMaven({ onNavigate }: { onNavigate?: (href: string) => void }) {
  const pinRef = useRef<HTMLDivElement>(null)
  const wheelRef = useRef<HTMLDivElement>(null)

  // The vault effect is continuous scroll-driven rotation and can't be
  // reduced to a fade, so reduced-motion users get the static stacked grid.
  const stacked = reducedMotion

  useGsapContext(
    pinRef,
    () => {
      const wheel = wheelRef.current
      if (!wheel) return
      const cards = gsap.utils.toArray<HTMLElement>('.wheel-card')
      const rotation = { current: 0 }

      // Place each card on the circle (center far below the viewport, so
      // only the top arc sweeps through the pinned screen), tangent to the
      // wheel like cabins on a ferris wheel.
      const layout = () => {
        const radius = wheel.offsetWidth / 1.1
        const half = wheel.offsetWidth / 2
        const n = cards.length
        const step =
          (0.58 * Math.PI + (radius > 0 ? WHEEL_GAP / radius : 0) * Math.max(n - 1, 0)) /
          Math.max(n, 1)
        cards.forEach((card, i) => {
          const angle = i * step
          gsap.set(card, {
            rotation: `${angle}_rad`,
            xPercent: -50,
            yPercent: -50,
            x: half + radius * Math.sin(angle),
            y: half - radius * Math.cos(angle),
          })
        })
        rotation.current = -(180 / Math.PI) * ((n - 1) * step)
      }

      layout()
      gsap.to(wheel, {
        rotate: () => rotation.current,
        ease: 'none',
        scrollTrigger: {
          trigger: pinRef.current,
          start: 'top top',
          end: '+=1500 top',
          scrub: 0.25,
          invalidateOnRefresh: true,
          // ScrollTrigger refreshes on window resize; re-run the geometry.
          onRefresh: layout,
        },
      })
    },
    []
  )

  return (
    <section
      id="why-maven"
      className="relative border-t border-line overflow-clip"
      aria-label="Why Maven"
    >
      {/* Ambient wash */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full bg-maven/10 blur-[160px]" />
      </div>

      {/* Pinned wheel (lg+; hidden entirely for reduced motion) */}
      <div ref={pinRef} className={cn('relative h-[250vh] max-lg:hidden', stacked && 'hidden')}>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-between overflow-hidden pb-[3%]">
          {/* Heading stays pinned above the turning wheel */}
          <div className="w-full px-6 md:px-12 pt-10 md:pt-14">
            <div className="flex justify-center">
              <Eyebrow label="Why Maven" align="center" />
            </div>
            <h2 className="display text-center text-white mt-5 text-[clamp(1.7rem,2.6vw,2.75rem)] leading-tight">
              The Agency That Builds{' '}
              <span className="text-maven-light">What It Recommends</span>
            </h2>
          </div>

          {/* The wheel: circle center sits far below the screen so the top
              arc of cards sweeps through view as the wheel rotates. */}
          <div className="absolute top-[65vw] w-full h-screen">
            <div
              ref={wheelRef}
              className="absolute top-0 left-[49%] -translate-x-1/2 w-screen h-[100vw] max-w-[125vw] max-h-[125vw] flex items-center justify-center"
            >
              {WHEEL_CARDS.map((card, i) => (
                <div
                  key={card.index ?? card.title}
                  className="wheel-card absolute top-0 left-0 group"
                  style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
                >
                  <WheelCardView card={card} onNavigate={onNavigate} />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom caption */}
          <div className="w-full flex justify-center pb-[2%] px-6">
            <p className="text-mist text-sm md:text-base leading-relaxed text-center max-w-xl">
              Since 2019 we've helped more than 300 businesses build, grow and manage their online
              presence. Here's what stays the same on every engagement.
            </p>
          </div>
        </div>
      </div>

      {/* Stacked fallback: below lg, and always for reduced motion */}
      <div
        className={cn(
          'section py-16 md:py-24 max-lg:py-20',
          !stacked && 'lg:hidden'
        )}
      >
        <div className="container-maven relative">
          <SectionHeading
            eyebrow="Why Maven"
            title="The Agency That Builds"
            accent="What It Recommends"
            accentLight
            lede="Since 2019 we've helped more than 300 businesses build, grow and manage their online presence. Here's what stays the same on every engagement."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {WHEEL_CARDS.map((card) => (
              <div key={card.index ?? card.title} className="h-full">
                <WheelCardView card={card} onNavigate={onNavigate} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
