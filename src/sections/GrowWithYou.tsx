import { useRef } from 'react'
import { ArrowRight, Gauge, Rocket, Search, Trophy, type LucideIcon } from 'lucide-react'
import { gsap, useGsapContext } from '../hooks/useGsap'
import { Eyebrow } from '../components/text/Eyebrow'
import { SmartLink } from '../components/ui/SmartLink'

/**
 * GrowWithYou, "How we grow with you": the four stages a business moves
 * through (Launch, Get Found, Run and Scale, Win Bigger), each wired to the
 * Maven services that own that stage. No cards: four open editorial
 * columns inside the container, each led by its stage icon, all visible
 * at once with a staggered entrance (copy lifts).
 */

/** Shared icon tint, matching the Get Found stage. */
const ICON_ACCENT = '#b98af0'

interface Stage {
  icon: LucideIcon
  title: string
  body: string
  /** Icon tint, shared by all stages. */
  accent: string
  links: { label: string; href: string }[]
}

const STAGES: Stage[] = [
  {
    icon: Rocket,
    title: 'Launch',
    body: "A website built to convert from day one, with a brand that looks like the company you're becoming.",
    accent: ICON_ACCENT,
    links: [{ label: 'Web Design & Development', href: '/services/web-design' }],
  },
  {
    icon: Search,
    title: 'Get Found',
    body: 'Rank for the searches that signal real need, get cited in AI answers and put your brand in front of buyers.',
    accent: ICON_ACCENT,
    links: [
      { label: 'SEO & AEO', href: '/services/seo' },
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
    ],
  },
  {
    icon: Gauge,
    title: 'Run and Scale',
    body: 'Keep the site fast, secure and improving every month, and automate the work that slows your team down.',
    accent: ICON_ACCENT,
    links: [
      { label: 'Website Management & Maintenance', href: '/services/website-management' },
      { label: 'AI Consulting', href: '/services/ai-consulting' },
    ],
  },
  {
    icon: Trophy,
    title: 'Win Bigger',
    body: 'When the enterprise deal asks for a pen test, a SOC 2 report or a PCI AOC, you already have a partner who can get you there.',
    accent: ICON_ACCENT,
    links: [{ label: 'Cyber Security', href: '/services/cyber-security' }],
  },
]

export function GrowWithYou({ onNavigate }: { onNavigate: (href: string) => void }) {
  const rootRef = useRef<HTMLElement>(null)

  // Entrance: header rises, then each column lifts its copy in with a
  // stagger. Plain scroll triggers, no pinning.
  useGsapContext(
    rootRef,
    () => {
      gsap.fromTo(
        '[data-gwy-head]',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: '[data-gwy-head]', start: 'top 84%', once: true },
        }
      )
      gsap.utils.toArray<HTMLElement>('[data-gwy-stage]').forEach((el, i) => {
        gsap.fromTo(
          el.querySelector('[data-gwy-body]'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: 0.25 + i * 0.12,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        )
      })
    },
    []
  )

  return (
    <section
      ref={rootRef}
      id="grow-with-you"
      className="section relative py-24 md:py-32"
      aria-label="How we grow with you"
    >
      {/* Ambient wash */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-[10%] w-[400px] h-[380px] rounded-full bg-maven-light/8 blur-[140px]" />
      </div>

      <div className="container-maven relative">
        <div data-gwy-head className="max-w-3xl">
          <Eyebrow label="How we grow with you" className="mb-6" />
          <h2 className="display text-[clamp(2rem,4.6vw,3.6rem)] leading-[1.12] mb-6">
            Wherever Your Business Is Today, We Meet You{' '}
            <span className="text-maven-light">There and Take You Further</span>
          </h2>
          <p className="text-mist text-base md:text-lg leading-relaxed max-w-2xl">
            Most agencies sell one service. Maven is built around the stages a business actually
            moves through, so the next thing you need is already on the same team.
          </p>
        </div>

        {/* Four open columns: icon + title, copy, links — no cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-12 mt-14 md:mt-20">
          {STAGES.map((stage, i) => (
            <div key={stage.title} data-gwy-stage className="group relative">
              <div data-gwy-body>
                <div className="mb-4 flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="grid h-10 w-10 flex-none place-items-center rounded-full border border-line"
                    style={{
                      color: stage.accent,
                      background: `color-mix(in srgb, ${stage.accent} 12%, transparent)`,
                    }}
                  >
                    <stage.icon size={19} strokeWidth={1.8} />
                  </span>
                  <h3 className="display font-semibold text-[1.35rem] md:text-[1.45rem] text-white tracking-[0.01em] transition-colors duration-300 group-hover:text-maven-lighter">
                    {stage.title}
                  </h3>
                </div>
                <p className="text-mist text-[15px] leading-relaxed">{stage.body}</p>

                <ul className="flex flex-col items-start gap-2.5 mt-6">
                  {stage.links.map((link) => (
                    <li key={link.href}>
                      <SmartLink
                        href={link.href}
                        onNavigate={onNavigate}
                        className="group/link inline-flex items-start gap-1.5 text-left text-sm font-medium text-maven-light transition-colors duration-300 hover:text-white"
                      >
                        {link.label}
                        <ArrowRight
                          size={14}
                          className="mt-0.5 transition-transform duration-300 group-hover/link:translate-x-1"
                          aria-hidden="true"
                        />
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}