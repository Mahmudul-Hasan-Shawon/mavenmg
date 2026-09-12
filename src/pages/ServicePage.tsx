import { useRef, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Code,
  CreditCard,
  Database,
  FileText,
  Gauge,
  Layers,
  Layout,
  LifeBuoy,
  Link2,
  Mail,
  MapPin,
  Megaphone,
  MousePointerClick,
  Package,
  Palette,
  PenTool,
  RefreshCw,
  Rocket,
  Search,
  Server,
  Settings,
  Share2,
  Shield,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'
import { servicePages, type ServiceIcon, type ServicePageData, type ServiceStat } from '../data/servicePages'
import { PageHero } from '../sections/PageHero'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Eyebrow } from '../components/text/Eyebrow'
import { Reveal } from '../components/ui/Reveal'
import { MagneticButton } from '../components/ui/MagneticButton'
import { FinalCTA } from '../sections/FinalCTA'
import { cn } from '../utils/cn'
import { gsap, useGsapContext } from '../hooks/useGsap'
import { reducedMotion, trackSpotlight } from '../utils/motion'

const iconMap: Record<ServiceIcon, LucideIcon> = {
  layout: Layout,
  code: Code,
  settings: Settings,
  search: Search,
  megaphone: Megaphone,
  cart: ShoppingCart,
  palette: Palette,
  target: Target,
  zap: Zap,
  shield: Shield,
  gauge: Gauge,
  refresh: RefreshCw,
  mail: Mail,
  link: Link2,
  share: Share2,
  smartphone: Smartphone,
  'credit-card': CreditCard,
  package: Package,
  pen: PenTool,
  layers: Layers,
  file: FileText,
  'life-buoy': LifeBuoy,
  trending: TrendingUp,
  rocket: Rocket,
  sparkles: Sparkles,
  'map-pin': MapPin,
  mouse: MousePointerClick,
  server: Server,
  database: Database,
}

interface ServicePageProps {
  data: ServicePageData
  onNavigate: (href: string) => void
}

export default function ServicePage({ data, onNavigate }: ServicePageProps) {
  const relatedPages = data.related
    .map((r) => ({ entry: r, page: servicePages.find((p) => p.slug === r.slug) }))
    .filter((x): x is { entry: { slug: string; blurb: string }; page: ServicePageData } => Boolean(x.page))

  return (
    <>
      <PageHero
        id={`${data.slug}-hero`}
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        titleHighlight={data.hero.titleHighlight}
        accent={data.hero.accent}
        accentHighlight={data.hero.accentHighlight}
        lede={data.hero.lede}
        ledeHighlight={data.hero.ledeHighlight}
        image={data.hero.image}
        imageAlt={data.hero.imageAlt}
      />

      <OverviewSection data={data} />

      <IncludesSection data={data} />

      {data.tech && <TechStrip data={data} />}

      <ProcessSection data={data} />

      <PlansSection data={data} onNavigate={onNavigate} />

      <FaqSection data={data} onNavigate={onNavigate} />

      <RelatedSection data={data} relatedPages={relatedPages} onNavigate={onNavigate} />

      <FinalCTA onNavigate={onNavigate} />
    </>
  )
}

function OverviewSection({ data }: { data: ServicePageData }) {
  return (
    <section id={`${data.slug}-overview`} className="section py-24 md:py-36 relative overflow-clip" aria-label="Overview">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-28 -left-32 w-[480px] h-[380px] rounded-full bg-maven/10 blur-[140px]" />
      </div>

      <div className="container-maven relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <Reveal>
              <Eyebrow label="Overview" className="mb-6" />
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="display font-bold text-[clamp(2rem,4.6vw,3.5rem)] text-white mb-7">
                <HeadingHighlight text={data.overview.heading} highlight={data.overview.headingHighlight} />
              </h2>
            </Reveal>
            <div className="space-y-4 mb-9">
              {data.overview.paragraphs.map((p, i) => (
                <Reveal key={i} delay={0.1 + i * 0.06}>
                  <p className="text-mist text-base md:text-lg leading-relaxed">{p}</p>
                </Reveal>
              ))}
            </div>
            <ul className="space-y-3.5">
              {data.overview.bullets.map((b, i) => (
                <Reveal key={b} delay={0.18 + i * 0.05} as="li">
                  <span className="flex items-start gap-3 text-white/85 text-base">
                    <span className="w-5 h-5 rounded-full bg-maven/25 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} className="text-maven-lighter" />
                    </span>
                    {b}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1}>
            <div className="relative lg:mt-10">
              <div className="relative overflow-hidden rounded-3xl border border-line shadow-[0_30px_70px_-30px_rgba(97,44,139,0.45)]">
                <img
                  src={data.overview.image}
                  alt={data.overview.imageAlt}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-void/75 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-0 left-0 max-w-[min(85%,20rem)]">
                  <div
                    className="spotlight glow-tl relative isolate overflow-hidden rounded-2xl rounded-tl-none px-4 py-3 sm:px-5 sm:py-4"
                    onPointerMove={trackSpotlight}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-ink/95 backdrop-blur-md [mask-image:linear-gradient(to_right,black_0%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,black_0%,transparent_100%)]"
                    />
                    <div className="relative z-10 flex items-center gap-3">
                      <span className="hidden sm:flex w-10 h-10 shrink-0 rounded-lg bg-gradient-to-br from-maven/40 to-maven/15 border border-maven-light/25 items-center justify-center">
                        <Sparkles size={16} className="text-maven-lighter" />
                      </span>
                      <div className="flex flex-wrap items-center gap-x-2">
                        <p className="font-dm font-[1000] leading-none tracking-[0.02em] tabular-nums text-3xl text-white">
                          {data.stats[0].prefix}
                          {formatValue(data.stats[0])}
                          {data.stats[0].suffix}
                        </p>
                        <p className="text-sm text-white">{data.stats[0].label}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <StatsPanel stats={data.stats.slice(1)} />
      </div>
    </section>
  )
}

/** Static (non-animated) number formatting used for reduced motion + the floating stat badge. */
function formatValue(stat: ServiceStat) {
  return stat.decimals ? stat.value.toFixed(stat.decimals) : stat.value.toLocaleString()
}

/** Renders a heading, wrapping any listed words in solid maven-light. */
function HeadingHighlight({ text, highlight }: { text: string; highlight?: string[] }) {
  if (!highlight?.length) return <>{text}</>
  const set = new Set(highlight.map((w) => w.toLowerCase()))
  return (
    <>
      {text.split(/(\s+)/).map((piece, i) =>
        /^\s+$/.test(piece) ? (
          <span key={i}> </span>
        ) : set.has(piece.toLowerCase()) ? (
          <span key={i} className="text-maven-light">{piece}</span>
        ) : (
          <span key={i}>{piece}</span>
        )
      )}
    </>
  )
}

/**
 * StatsPanel — a single "luminous panel" holding the service stats side by
 * side (hairline dividers between them), wrapped in a gradient hairline
 * border that ignites to maven on hover. An orbiting border beam, mouse
 * spotlight, and top-left ambient glow make it feel lit from within; the
 * numerals render in the brand gradient and count up once when they scroll
 * into view.
 */
function StatsPanel({ stats }: { stats: ServiceStat[] }) {
  const rootRef = useRef<HTMLDivElement>(null)

  useGsapContext(
    rootRef,
    () => {
      gsap.utils.toArray<HTMLElement>('[data-counter]').forEach((el) => {
        const target = Number(el.dataset.counter || '0')
        const decimals = Number(el.dataset.decimals || '0')
        const obj = { v: 0 }
        gsap.to(obj, {
          v: target,
          duration: 2.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 82%', once: true },
          onUpdate: () => {
            el.textContent = decimals > 0 ? obj.v.toFixed(decimals) : Math.round(obj.v).toLocaleString()
          },
        })
      })
    },
    []
  )

  const renderValue = (stat: ServiceStat) => {
    if (reducedMotion) return <span>{formatValue(stat)}</span>
    return (
      <span data-counter={stat.value} data-decimals={stat.decimals ?? 0}>
        0
      </span>
    )
  }

  return (
    <Reveal delay={0.1}>
      <div ref={rootRef} className="border-beam group relative rounded-3xl mt-24 md:mt-32">
        {/* Orbiting border beam — blurred halo underneath, sharp core on top */}
        <div aria-hidden="true" className="beam-viewport beam-viewport-halo">
          <div className="beam-rotator beam-rotator-halo" />
        </div>
        <div aria-hidden="true" className="beam-viewport">
          <div className="beam-rotator beam-rotator-core" />
        </div>

        {/* Gradient hairline border */}
        <div className="rounded-3xl p-px bg-maven-light/50 group-hover:bg-maven-light/70 transition-colors duration-500">
          <div
            className="spotlight glow-tl rounded-[calc(1.5rem-1px)] bg-void overflow-hidden"
            onPointerMove={trackSpotlight}
          >
            <div className="grid md:grid-cols-3 divide-y divide-line md:divide-y-0 md:divide-x">
              {stats.map((stat) => (
                <div key={stat.label} className="px-6 py-12 md:px-8 md:py-16 text-center">
                  <p className="font-dm font-[1000] leading-none tracking-[0.02em] tabular-nums text-[2.9rem] lg:text-[3.6rem] text-transparent bg-clip-text bg-[image:var(--grad)]">
                    {stat.prefix}
                    {renderValue(stat)}
                    {stat.suffix}
                  </p>
                  <p className="mono-label !text-mist mt-4 md:mt-5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

function IncludesSection({ data }: { data: ServicePageData }) {
  return (
    <section
      id={`${data.slug}-includes`}
      className="section py-24 md:py-36 bg-maven-dark border-t border-line relative overflow-clip"
      aria-label="What's included"
    >
      <div className="container-maven relative">
        <SectionHeading
          eyebrow="What's included"
          title="Everything you need,"
          accent="nothing you don't"
          accentLight
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.includes.map((item, i) => {
            const Icon = iconMap[item.icon]
            return (
              <Reveal key={item.title} delay={(i % 3) * 0.06}>
                <div
                  className="scroll-blur spotlight glow-tl group h-full rounded-2xl border border-line bg-white/[0.02] p-8 hover:border-maven-light/40 hover:shadow-[0_24px_60px_-28px_rgba(97,44,139,0.55)] transition-all duration-500"
                  onPointerMove={trackSpotlight}
                >
                  <div className="w-12 h-12 rounded-xl bg-maven/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon size={20} className="text-maven-light" aria-hidden="true" />
                  </div>
                  <h3 className="display font-semibold text-lg md:text-xl text-white mb-2.5">{item.title}</h3>
                  <p className="text-mist text-[15px] leading-relaxed">{item.description}</p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function TechStrip({ data }: { data: ServicePageData }) {
  return (
    <section id={`${data.slug}-tech`} className="px-6 md:px-10 pb-24 md:pb-32 bg-maven-dark" aria-label="Platforms we build on">
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <p className="mono-label !text-mist text-center mb-10">Built on platforms your customers trust</p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
            {data.tech?.map((t) => (
              <img
                key={t.alt}
                src={t.src}
                alt={t.alt}
                loading="lazy"
                className="h-8 md:h-9 w-auto opacity-100  hover:opacity-100 transition-all duration-300"
              />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ProcessSection({ data }: { data: ServicePageData }) {
  return (
    <section
      id={`${data.slug}-process`}
      className="section bg-maven-dark py-24 md:py-36 border-t border-line relative overflow-clip"
      aria-label="Our process"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-24 right-[-8%] w-[420px] h-[340px] rounded-full bg-maven/10 blur-[130px]" />
      </div>

      <div className="container-maven relative">
        <Reveal>
          <Eyebrow label="How it works" className="mb-14 md:mb-20" />
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-y-12 md:gap-y-0 md:gap-x-8">
          {data.process.map((step, i) => (
            <div
              key={step.title}
              className="relative first:pl-0 md:pl-8 md:border-l md:border-maven-light/20 md:first:border-l-0"
            >
              <Reveal delay={i * 0.08}>
                <p className="font-mono text-xs tracking-[0.3em] text-maven-light/80 mb-3">STEP 0{i + 1}</p>
                <h3 className="display font-semibold text-xl md:text-2xl text-white mb-3">{step.title}</h3>
                <p className="text-mist text-[15px] leading-relaxed md:pr-4">{step.description}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function PlansSection({ data, onNavigate }: { data: ServicePageData; onNavigate: (href: string) => void }) {
  return (
    <section
      id={`${data.slug}-plans`}
      className="section py-24 md:py-36 border-t  border-line relative overflow-clip"
      aria-label="Plans and pricing"
    >
      <div className="container-maven relative">
        <SectionHeading
          eyebrow="Plans & pricing"
          title="Pick the plan that fits"
          accent="your goals"
          lede="Transparent pricing, no hidden fees. Every plan comes with the Maven quality guarantee and a real team behind you."
          align="center"
        />

        <div className="grid lg:grid-cols-3 gap-5 items-stretch">
          {data.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.06}>
              <div
                className={cn(
                  'relative h-full flex flex-col rounded-3xl border p-8 md:p-9',
                  plan.featured
                    ? 'border-maven-light/50 bg-maven/10 shadow-[0_30px_80px_-30px_rgba(97,44,139,0.6)]'
                    : 'border-line bg-white/[0.02]'
                )}
              >
                {plan.featured && (
                  <span className="absolute top-0 right-8 -translate-y-1/2 rounded-full bg-maven text-white-solid text-[11px] font-semibold uppercase tracking-[0.18em] px-4 py-1.5 border border-maven-light/40">
                    Most Popular
                  </span>
                )}
                <p className="mono-label !text-mist mb-4">{plan.name}</p>
                <p className="display font-semibold text-4xl text-white mb-1">{plan.price}</p>
                <p className="text-mist-dim text-sm mb-7">
                  {plan.priceNote} · {plan.blurb}
                </p>
                <ul className="space-y-3 mb-9 mt-auto">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white/85">
                      <span className="w-5 h-5 rounded-full bg-maven/25 flex items-center justify-center shrink-0">
                        <Check size={11} className="text-maven-lighter" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <MagneticButton
                  variant={plan.featured ? 'primary' : 'ghost'}
                  fullWidth
                  onClick={() => onNavigate('/contact')}
                >
                  Get started <ArrowRight size={16} />
                </MagneticButton>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqSection({ data, onNavigate }: { data: ServicePageData; onNavigate: (href: string) => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id={`${data.slug}-faq`}
      className="section py-24 md:py-36 border-t border-line"
      aria-label="Frequently asked questions"
    >
      <div className="container-maven grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow label="FAQ" className="mb-7" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display font-semibold text-[clamp(2rem,4.4vw,3.4rem)] text-white mb-5">Questions, answered.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-mist text-base md:text-lg leading-relaxed mb-8">
              Still curious? Ask us anything — we will give you a straight answer.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <MagneticButton variant="ghost" onClick={() => onNavigate('/contact')}>
              Ask a question <ArrowRight size={16} />
            </MagneticButton>
          </Reveal>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {data.faq.map((item, k) => {
            const isOpen = openIndex === k
            return (
              <div key={item.q} className="py-5">
                <button
                  type="button"
                  data-cursor
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : k)}
                  className="flex w-full items-center justify-between gap-6 text-left cursor-pointer select-none"
                >
                  <span
                    className={cn(
                      'display font-medium text-lg md:text-xl transition-colors duration-300',
                      isOpen ? 'text-maven-lighter' : 'text-white'
                    )}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={cn(
                      'shrink-0 text-maven-light transition-transform duration-300',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  )}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="pt-4 pb-1 text-mist leading-relaxed text-base md:text-lg max-w-2xl">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function RelatedSection({
  data,
  relatedPages,
  onNavigate,
}: {
  data: ServicePageData
  relatedPages: { entry: { slug: string; blurb: string }; page: ServicePageData }[]
  onNavigate: (href: string) => void
}) {
  return (
    <section
      id={`${data.slug}-related`}
      className="section py-24 md:py-36 border-t border-line relative overflow-clip"
      aria-label="Related services"
    >
      <div className="container-maven relative">
        <Reveal>
          <Eyebrow label="Keep exploring" className="mb-7" />
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display font-semibold text-[clamp(2rem,4.6vw,3.5rem)] text-white mb-12">
            Services that work well together
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {relatedPages.map(({ entry, page }, i) => (
            <Reveal key={page.slug} delay={i * 0.06}>
              <a
                data-cursor
                onClick={() => onNavigate(`/services/${page.slug}`)}
                className="group block w-full h-full rounded-3xl border border-line bg-white/[0.02] p-8 hover:border-maven-light/40 hover:bg-maven/5 hover:shadow-[0_24px_60px_-28px_rgba(97,44,139,0.55)] transition-all duration-500 overflow-hidden relative cursor-pointer"
              >
                <span className="absolute top-7 right-7 w-10 h-10 rounded-full border border-line grid place-items-center text-mist group-hover:bg-maven group-hover:text-white-solid group-hover:border-maven-light/40 transition-all duration-300 rotate-45 group-hover:rotate-0">
                  <ArrowRight size={15} />
                </span>
                <p className="mono-label !text-mist-dim mb-4">Related · 0{i + 1}</p>
                <h3 className="display font-semibold text-xl md:text-2xl text-white mb-3 pr-12">{page.navLabel}</h3>
                <p className="text-mist-dim text-[15px] leading-relaxed">{entry.blurb}</p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}