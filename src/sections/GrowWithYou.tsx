import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap, useGsapContext } from '../hooks/useGsap'
import { Eyebrow } from '../components/text/Eyebrow'
import { SmartLink } from '../components/ui/SmartLink'

/**
 * GrowWithYou, "How we grow with you": the four stages a business moves
 * through (Launch, Get Found, Run and Scale, Win Bigger), each wired to the
 * Maven services that own that stage. No cards: four open editorial
 * columns inside the container, each led by its stage's violet rule and
 * index, all visible at once with a staggered entrance (rule draws in,
 * copy lifts).
 */

interface Stage {
  title: string
  body: string
  /** Accent for the stage rule and index: a step down the violet ramp. */
  accent: string
  links: { label: string; href: string }[]
}

const STAGES: Stage[] = [
  {
    title: 'Launch',
    body: "A website built to convert from day one, with a brand that looks like the company you're becoming.",
    accent: 'var(--maven-lighter)',
    links: [{ label: 'Web Design & Development', href: '/services/web-design' }],
  },
  {
    title: 'Get Found',
    body: 'Rank for the searches that signal real need, get cited in AI answers and put your brand in front of buyers.',
    accent: '#b98af0',
    links: [
      { label: 'SEO & AEO', href: '/services/seo' },
      { label: 'Digital Marketing', href: '/services/digital-marketing' },
    ],
  },
  {
    title: 'Run and Scale',
    body: 'Keep the site fast, secure and improving every month, and automate the work that slows your team down.',
    accent: 'var(--maven-light)',
    links: [
      { label: 'Website Management & Maintenance', href: '/services/website-management' },
      { label: 'AI Consulting', href: '/services/ai-consulting' },
    ],
  },
  {
    title: 'Win Bigger',
    body: 'When the enterprise deal asks for a pen test, a SOC 2 report or a PCI AOC, you already have a partner who can get you there.',
    accent: 'var(--maven)',
    links: [{ label: 'Cyber Security', href: '/services/cyber-security' }],
  },
]

export function GrowWithYou({ onNavigate }: { onNavigate: (href: string) => void }) {
  const rootRef = useRef<HTMLElement>(null)

  // Entrance: header rises, then each column draws its stage rule and
  // lifts its copy in with a stagger. Plain scroll triggers, no pinning.
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
        const line = el.querySelector('[data-gwy-line]')
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.9,
            delay: 0.15 + i * 0.12,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        )
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

        {/* Four open columns: stage rule, index, copy, links — no cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-12 mt-14 md:mt-20">
          {STAGES.map((stage, i) => (
            <div key={stage.title} data-gwy-stage className="group relative">
              <span
                aria-hidden="true"
                data-gwy-line
                className="absolute top-0 left-0 right-0 h-[2px] origin-left scale-x-0"
                style={{ background: `linear-gradient(90deg, ${stage.accent}, transparent 96%)` }}
              />
              <div data-gwy-body className="pt-6">
                <h3 className="display font-semibold text-[1.35rem] md:text-[1.45rem] text-white tracking-[0.01em] mb-3.5 transition-colors duration-300 group-hover:text-maven-lighter">
                  {stage.title}
                </h3>
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
