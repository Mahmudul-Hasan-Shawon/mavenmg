import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Megaphone,
  PenTool,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { servicePages, type ServicePageData, type ServiceStat } from '../data/servicePages'
import { serviceCatalog } from '../data/serviceCatalog'
import { PageHero } from '../sections/PageHero'
import { ManagementPlans } from '../sections/ManagementPlans'
import { FinalCTA } from '../sections/FinalCTA'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { MagneticButton } from '../components/ui/MagneticButton'
import { SmartLink } from '../components/ui/SmartLink'
import { Eyebrow } from '../components/text/Eyebrow'
import { trackSpotlight } from '../utils/motion'
import { cn } from '../utils/cn'

const proof = [
  { value: '300+', label: 'Businesses helped' },
  { value: '200+', label: 'Websites launched' },
  { value: '$500M+', label: 'Client revenue generated' },
  { value: '99.9%', label: 'Uptime guarantee' },
]

const process = [
  {
    icon: Search,
    title: 'Discover',
    description:
      'We start with your goals, audience and numbers, then audit what you already have and map what success looks like.',
  },
  {
    icon: PenTool,
    title: 'Design',
    description:
      'Strategy becomes wireframes, brand direction and page designs you can react to long before anything is built.',
  },
  {
    icon: Code2,
    title: 'Build',
    description:
      'Design and code ship in focused sprints, tested for speed, accessibility and conversion at every step.',
  },
  {
    icon: TrendingUp,
    title: 'Grow',
    description:
      'After launch we measure, optimize and iterate, so your website keeps earning more attention and revenue.',
  },
]

const included = [
  'A dedicated project lead from kickoff to launch',
  'Conversion and analytics tracking wired in from day one',
  'SEO-ready structure, content and technical foundations',
  'Transparent monthly reporting in plain English',
  'Ongoing support and optimization after launch',
  'No long-term lock-in — stay because it works',
]

const faqs = [
  {
    q: 'Do I have to buy every service?',
    a: 'Not at all. Start with the one thing holding you back — a redesign, a rebuild, a marketing push — and add services as you grow. We will tell you honestly what to prioritize first.',
  },
  {
    q: 'How do engagements usually start?',
    a: 'With a short discovery call and a look at your current site and numbers. From there we send a clear proposal with scope, timeline and pricing, so you know exactly what you are getting before you commit.',
  },
  {
    q: 'How long does a website project take?',
    a: 'Most custom websites launch in 4–8 weeks depending on scope and content. Branding projects typically take 2–4 weeks, and marketing or SEO work begins producing measurable movement within the first few months.',
  },
  {
    q: 'Can you work alongside our in-house team?',
    a: 'Yes. We often plug in as the design, development or marketing arm of an existing team, sharing tools, reports and goals so everyone is working from the same plan.',
  },
  {
    q: 'What happens after launch?',
    a: 'Every project includes a post-launch support window. Most clients continue with a management plan, which covers monitoring, updates, security, content changes and ongoing optimization.',
  },
]

export default function ServicesPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <>
      <PageHero
        id="services-hero"
        eyebrow="Services"
        title="Every service you need"
        accent="one growth partner"
        accentHighlight={['growth']}
        lede="From SEO and AI consulting to design, development, management, marketing and security, one senior team, one plan, and a single partner accountable for the whole thing."
        style={{
          backgroundColor: 'var(--hero-base)',
          backgroundImage:
            'radial-gradient(ellipse 85% 65% at 50% 0%, var(--hero-glow) 0%, var(--hero-base) 100%)',
        }}
      />

      {/* Proof strip */}
      <section
        className="bg-[var(--hero-base)] border-y border-line"
        aria-label="Maven by the numbers"
      >
        <div className="container-maven grid grid-cols-2 md:grid-cols-4">
          {proof.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.05}>
              <div
                className={cn(
                  'h-full px-5 py-8 md:px-8 md:py-10',
                  i % 2 === 1 && 'border-l border-line',
                  i >= 2 && 'border-t border-line md:border-t-0',
                  i > 0 && 'md:border-l md:border-line'
                )}
              >
                <p className="font-dm font-[1000] leading-none tracking-[0.02em] text-[2rem] md:text-[2.4rem] text-transparent bg-clip-text bg-[image:var(--grad)]">
                  {stat.value}
                </p>
                <p className="text-mist text-sm mt-3">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Full service catalog */}
      <ServiceCatalogSection onNavigate={onNavigate} />

      {/* Core services */}
      <section
        id="services-grid"
        className="section bg-[var(--hero-base)] py-20 md:py-28 border-b border-line relative overflow-clip"
        aria-label="Core services"
      >
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 right-[-6%] w-[480px] h-[380px] rounded-full bg-maven/10 blur-[150px]" />
        </div>

        <div className="container-maven relative">
          <SectionHeading
            eyebrow="Signature services"
            title="Go deeper on"
            accent="the work we love"
            accentLight
            lede="Nine focused services, each with a dedicated team, a proven process and transparent pricing. Pick one to see exactly how we deliver it."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {servicePages.map((service, i) => {
              const featured =
                i === 0 || service.slug === 'ai-consulting' || service.slug === 'cyber-security'
              return (
                <Reveal
                  key={service.slug}
                  delay={(i % 3) * 0.06}
                  className={cn('h-full', featured && 'md:col-span-2 lg:col-span-3')}
                >
                  {featured ? (
                    <FeaturedService
                      service={service}
                      index={i}
                      label={
                        i === 0
                          ? 'Featured service'
                          : service.slug === 'cyber-security'
                            ? 'New security service'
                            : 'New capability'
                      }
                      onNavigate={onNavigate}
                    />
                  ) : (
                    <ServiceCard service={service} index={i} onNavigate={onNavigate} />
                  )}
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* How we work */}
      <section
        id="services-process"
        className="section py-24 md:py-32 relative overflow-clip"
        aria-label="How we work"
      >
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-[-6%] w-[420px] h-[340px] rounded-full bg-maven/10 blur-[140px]" />
        </div>

        <div className="container-maven relative">
          <SectionHeading
            eyebrow="How we work"
            title="One team, one process,"
            accent="from idea to impact"
            lede="No hand-offs between disconnected freelancers. The people who plan your project are the people who design it, build it and keep it growing."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {process.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.07}>
                <div
                  className="scroll-blur spotlight glow-tl group h-full rounded-2xl border border-line bg-ink-2 p-7 md:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:border-maven-light/40 hover:shadow-[0_28px_70px_-28px_rgba(97,44,139,0.55)]"
                  onPointerMove={trackSpotlight}
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="w-11 h-11 rounded-xl bg-maven/10 flex items-center justify-center text-maven-light transition-transform duration-300 group-hover:scale-110">
                      <step.icon size={19} aria-hidden="true" />
                    </span>
                    <span className="mono-label !text-mist-dim">Step 0{i + 1}</span>
                  </div>
                  <h3 className="display font-semibold text-xl text-white mb-2.5">{step.title}</h3>
                  <p className="text-mist text-[15px] leading-relaxed">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-10 md:mt-14 rounded-3xl border border-line bg-white/[0.02] p-7 md:p-10">
              <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
                <div className="lg:max-w-xs shrink-0">
                  <p className="mono-label !text-maven-light mb-3">The Maven standard</p>
                  <h3 className="display font-semibold text-2xl md:text-3xl text-white">
                    Included in every engagement
                  </h3>
                </div>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4 flex-1">
                  {included.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] text-white/85">
                      <span className="w-5 h-5 rounded-full bg-maven/25 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={11} className="text-maven-lighter" aria-hidden="true" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Website Management Service Plans */}
      <ManagementPlans onNavigate={onNavigate} />

      {/* Services FAQ */}
      <ServicesFaq onNavigate={onNavigate} />

      <FinalCTA onNavigate={onNavigate} />
    </>
  )
}

function formatStat(stat: ServiceStat) {
  const value = stat.decimals ? stat.value.toFixed(stat.decimals) : stat.value.toLocaleString()
  return `${stat.prefix ?? ''}${value}${stat.suffix ?? ''}`
}

const catalogIcons: Record<string, LucideIcon> = {
  'seo-aeo': Search,
  'web-design-development': Code2,
  'website-management': Settings,
  'digital-marketing': Megaphone,
  'ai-consulting': Sparkles,
  'cyber-security': ShieldCheck,
}

/**
 * ServiceCatalog the full Maven offering as stacked editorial rows, each with
 * its own oversized title, icon, tagline, description and linked sub-services.
 * Groups mirror the Services mega menu; AI and security point to /contact
 * until their detail pages exist.
 */
function ServiceCatalogSection({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <section
      id="service-catalog"
      className="section py-24 md:py-32 border-b border-line relative overflow-clip"
      aria-label="Full service catalog"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/3 right-[-8%] w-[460px] h-[380px] rounded-full bg-maven/10 blur-[150px]" />
      </div>

      <div className="container-maven relative">
        <SectionHeading
          eyebrow="What we do"
          title="Every capability,"
          accent="under one roof"
          accentLight
          lede="Browse the complete Maven service catalog, grouped the way you actually buy it. Start anywhere and we will connect the pieces."
        />

        <div className="border-t border-line">
          {serviceCatalog.map((category, i) => {
            const Icon = catalogIcons[category.id] ?? Sparkles
            return (
              <Reveal key={category.id}>
                <article
                  id={`catalog-${category.id}`}
                  className="group relative scroll-mt-28 overflow-hidden border-b border-line py-10 md:py-14"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(80% 130% at 88% 12%, var(--glow-tl), transparent 62%)',
                    }}
                  />

                  <div className="relative grid lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-16">
                    <div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-5">
                        <span className="w-11 h-11 rounded-xl border border-maven-light/25 bg-maven/10 text-maven-light grid place-items-center shrink-0">
                          <Icon size={19} aria-hidden="true" />
                        </span>
                        <span className="font-mono text-[11px] tracking-[0.28em] text-maven-light">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="h-px w-7 bg-maven-light/40" aria-hidden="true" />
                        <span className="mono-label !text-mist">{category.tagline}</span>
                      </div>

                      <h3 className="display font-semibold text-[clamp(2.1rem,4.6vw,3.8rem)] leading-[1.02] text-white mb-5">
                        {category.title}{' '}
                        {category.badge && (
                          <span className="ml-3 align-middle inline-flex items-center rounded-full bg-maven-lighter px-2.5 py-1 text-[10px] font-extrabold tracking-[0.14em] text-maven-dark">
                            {category.badge}
                          </span>
                        )}
                      </h3>

                      <p className="text-mist text-base md:text-lg leading-relaxed max-w-xl mb-7">
                        {category.description}
                      </p>

                      <SmartLink
                        href={category.cta.href}
                        onNavigate={onNavigate}
                        data-cursor
                        className="group/cta inline-flex items-center gap-3 text-sm font-semibold text-maven-lighter transition-colors duration-300 hover:text-white"
                      >
                        {category.cta.label}
                        <span className="grid h-8 w-8 place-items-center rounded-full border border-line transition-all duration-300 group-hover/cta:border-maven-light/40 group-hover/cta:bg-maven group-hover/cta:text-white-solid">
                          <ArrowRight size={14} aria-hidden="true" />
                        </span>
                      </SmartLink>
                    </div>

                    <div className="lg:border-l lg:border-line lg:pl-12">
                      <p className="mono-label !text-mist-dim mb-2">Services</p>
                      <ul className="grid sm:grid-cols-2 gap-x-8">
                        {category.items.map((item) => (
                          <li key={item.label}>
                            <SmartLink
                              href={item.href}
                              onNavigate={onNavigate}
                              data-cursor
                              className="group/item flex items-center justify-between gap-3 border-b border-line py-3.5 text-[15px] text-mist transition-colors duration-300 hover:text-white"
                            >
                              <span className="flex items-center gap-3">
                                <span
                                  aria-hidden="true"
                                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-maven-light/50 transition-colors duration-300 group-hover/item:bg-maven-light"
                                />
                                {item.label}
                              </span>
                              <ArrowUpRight
                                size={14}
                                aria-hidden="true"
                                className="-translate-x-1 text-maven-light opacity-40 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                              />
                            </SmartLink>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function FeaturedService({
  service,
  index,
  label,
  onNavigate,
}: {
  service: ServicePageData
  index: number
  label: string
  onNavigate: (href: string) => void
}) {
  return (
    <SmartLink
      href={`/services/${service.slug}`}
      onNavigate={onNavigate}
      data-cursor
      aria-label={`Explore ${service.navLabel}`}
      className="scroll-blur group relative flex min-h-[430px] md:min-h-[480px] overflow-hidden rounded-[2rem] border border-line shadow-[0_24px_70px_-34px_rgba(97,44,139,0.55)] transition-shadow duration-500 hover:shadow-[0_36px_90px_-34px_rgba(97,44,139,0.7)]"
    >
      <img
        src={service.hero.image}
        alt={service.hero.imageAlt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-void/70 md:hidden" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-void via-void/85 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 flex w-full flex-col justify-between p-7 md:p-12 lg:p-14">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-5">
            <span className="mono-label !text-maven-light">{String(index + 1).padStart(2, '0')}</span>
            <span className="h-px w-8 bg-maven-light/50" aria-hidden="true" />
            <span className="mono-label !text-mist">{label}</span>
          </div>

          <h3 className="display font-semibold text-[clamp(1.9rem,4.2vw,3.2rem)] text-white mb-4">
            {service.navLabel}
          </h3>
          <p className="text-mist text-base md:text-lg leading-relaxed max-w-xl mb-6">
            {service.blurb}
          </p>

          <div className="flex flex-wrap gap-2">
            {service.includes.slice(0, 4).map((item) => (
              <span
                key={item.title}
                className="px-3 py-1 rounded-full border border-white/15 bg-void/40 backdrop-blur-sm text-xs tracking-wide text-white/85"
              >
                {item.title}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-6 mt-10">
          <dl className="flex flex-wrap gap-x-9 gap-y-5">
            {service.stats.slice(0, 2).map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block font-dm font-[1000] leading-none tracking-[0.02em] text-3xl md:text-4xl text-maven-lighter">
                    {formatStat(stat)}
                  </span>
                  <span className="block text-mist text-sm mt-2">{stat.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/[0.06] backdrop-blur-md px-5 py-3 text-sm font-semibold text-white transition-all duration-300 group-hover:border-maven-light/50 group-hover:bg-maven group-hover:text-white-solid">
            Explore {service.navLabel}
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </div>
      </div>
    </SmartLink>
  )
}

function ServiceCard({
  service,
  index,
  onNavigate,
}: {
  service: ServicePageData
  index: number
  onNavigate: (href: string) => void
}) {
  return (
    <SmartLink
      href={`/services/${service.slug}`}
      onNavigate={onNavigate}
      data-cursor
      aria-label={`Explore ${service.navLabel}`}
      className="scroll-blur group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white/[0.02] shadow-[0_14px_40px_-22px_rgba(97,44,139,0.3)] transition-all duration-500 hover:-translate-y-1.5 hover:border-maven-light/40 hover:shadow-[0_28px_70px_-28px_rgba(97,44,139,0.55)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={service.hero.image}
          alt={service.hero.imageAlt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/10 to-transparent"
          aria-hidden="true"
        />
        <span
          className="absolute top-4 left-5 font-poppins font-bold text-4xl text-stroke select-none"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-void/55 backdrop-blur-md px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/85">
          {service.hero.eyebrow}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="display font-semibold text-xl md:text-2xl text-white mb-3 tracking-[0.01em]">
          {service.navLabel}
        </h3>
        <p className="text-mist text-[15px] leading-relaxed mb-5">{service.blurb}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {service.includes.slice(0, 3).map((item) => (
            <span
              key={item.title}
              className="px-3 py-1 rounded-full border border-line text-[11px] tracking-wide text-mist"
            >
              {item.title}
            </span>
          ))}
        </div>

        <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-maven-lighter transition-colors duration-300 group-hover:text-white">
          Explore {service.navLabel}
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </SmartLink>
  )
}

function ServicesFaq({ onNavigate }: { onNavigate: (href: string) => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      id="services-faq"
      className="section py-24 md:py-32 border-t border-line"
      aria-label="Frequently asked questions"
    >
      <div className="container-maven grid lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow label="FAQ" className="mb-7" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="display font-semibold text-[clamp(2rem,4.4vw,3.4rem)] text-white mb-5">
              Questions, <span className="text-maven-light">answered</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-mist text-base md:text-lg leading-relaxed mb-8">
              Not sure where to start? Tell us what you are trying to accomplish and we will
              recommend the right mix of services, no pressure.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <MagneticButton variant="deep" onClick={() => onNavigate('/contact')}>
              Talk to a strategist <ArrowRight size={16} />
            </MagneticButton>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex items-start gap-3 rounded-2xl border border-line bg-white/[0.02] p-5">
              <span className="w-9 h-9 shrink-0 rounded-lg bg-maven/15 flex items-center justify-center text-maven-light">
                <ShieldCheck size={17} aria-hidden="true" />
              </span>
              <p className="text-sm leading-relaxed text-mist">
                Every engagement is backed by clear scope, transparent pricing and a real team you
                can reach directly.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="divide-y divide-line border-y border-line">
          {faqs.map((item, k) => {
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
                    <p className="pt-4 pb-1 text-mist leading-relaxed text-base md:text-lg max-w-2xl">
                      {item.a}
                    </p>
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
