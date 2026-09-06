import { Check } from 'lucide-react'
import { MagneticButton } from '../components/ui/MagneticButton'
import { Reveal } from '../components/ui/Reveal'
import { Eyebrow } from '../components/text/Eyebrow'
import { trackSpotlight } from '../utils/motion'
import { cn } from '../utils/cn'

/**
 * ManagementPlans — "Website Management Service Plans" as three pure pricing
 * cards: identical skeleton (icon + tier, name, tagline, price, note,
 * features, CTA) with gradient hairline borders that ignite on hover. The
 * featured tier lifts, carries the "Most Popular" chip and ignited border.
 */

const plans = [
  {
    name: 'Essential Maintenance',
    tier: 'Tier 01',
    tagline: 'Perfect for effortlessly maintaining peak website performance.',
    price: '500',
    perMonth: true,
    note: '',
    icon: 'fas fa-shield-halved',
    features: [
      'Maintenance & Hosting',
      'Website Speed Optimization',
      'Dedicated WordPress Engineer',
      'Emergency Support',
      '24/7 Security & Uptime Monitoring',
      'Daily Back-ups',
      'WP Plugin Updates',
    ],
    featured: false,
  },
  {
    name: 'Proactive Management',
    tier: 'Tier 02',
    tagline: 'Perfect for designing new pages and enhancing content or adding images and videos.',
    price: '1500',
    perMonth: true,
    note: 'Includes everything in Essential Maintenance.',
    icon: 'fas fa-rocket',
    features: [
      'Website Edits',
      'Designers',
      'Developers',
      'Copywriters',
      'Custom Page Design & Development',
      'Chat Support',
    ],
    featured: true,
  },
  {
    name: 'Premier Management',
    tier: 'Tier 03',
    tagline: 'Perfect for larger websites and coordinating regular project meetings.',
    price: 'Custom Quote',
    perMonth: false,
    note: 'Builds on Proactive Management.',
    icon: 'fas fa-crown',
    features: [
      'Unlimited Website Projects',
      'Dedicated Project Manager',
      'Scheduled Management Meetings',
      'Web Consulting & Planning',
    ],
    featured: false,
  },
]

export function ManagementPlans({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <section id="management-plans" className="section py-28 md:py-36 relative overflow-hidden" aria-label="Website Management Service Plans">
      <div className="container-maven">
        <Reveal>
          <Eyebrow label="Management plans" className="mb-8 justify-center" />
          <h2 className="display text-[clamp(1.8rem,4.2vw,3.6rem)] text-white max-w-2xl text-center mx-auto">
            Website Management <span className="grad-text block">Service Plans</span>
          </h2>
          <p className="mt-5 text-mist text-base md:text-lg leading-relaxed max-w-xl text-center mx-auto">
            Select the plan that best fits your business needs. Switch to Maven without any risks
            with our website migration service.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 mt-14 md:mt-24">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1}>
              <div
                className={cn(
                  'group relative rounded-3xl h-full transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_28px_70px_-28px_rgba(97,44,139,0.55)]',
                  plan.featured && 'md:-translate-y-3 md:hover:-translate-y-5'
                )}
              >
                {plan.featured && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-maven-light text-white-solid text-[11px] font-semibold tracking-[0.18em] uppercase whitespace-nowrap">
                    Most Popular
                  </span>
                )}

                {/* Gradient hairline border — ignites to maven on hover */}
                <div
                  className={cn(
                    'rounded-3xl p-px h-full transition-colors duration-500',
                    plan.featured ? 'bg-maven-light/50' : 'bg-line',
                    'group-hover:bg-maven-light/50'
                  )}
                >
                  <div
                    className="spotlight glow-tl rounded-[calc(1.5rem-1px)] bg-void p-8 md:p-9 h-full flex flex-col"
                    onPointerMove={trackSpotlight}
                  >
                    {/* Icon + tier */}
                    <div className="flex items-center justify-between mb-7">
                      <span
                        aria-hidden="true"
                        className={cn(
                          'w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110',
                          plan.featured ? 'bg-maven-light/20 text-maven-lighter' : 'bg-maven/15 text-maven-lighter'
                        )}
                      >
                        <i className={plan.icon} aria-hidden="true" />
                      </span>
                      <span className="mono-label !text-mist-dim">{plan.tier}</span>
                    </div>

                    <h3 className="display font-semibold tracking-[0.98px] text-2xl text-white mb-2">{plan.name}</h3>
                    <p className="text-mist-dim text-md leading-relaxed mb-7 min-h-[3.75rem]">{plan.tagline}</p>

                    {/* Price */}
                    <div className="pb-6 border-b border-line mb-6">
                      {plan.perMonth ? (
                        <p className="flex items-center gap-1.5">
                          <span className="display text-[2rem] leading-none text-maven-lighter">$</span>
                          <span className="display font-bold text-[2.75rem] leading-none tabular-nums tracking-tight text-white">
                            {plan.price}
                          </span>
                          <span className="mono-label ml-1">/ per month</span>
                        </p>
                      ) : (
                        <p className="display font-bold text-[2rem] leading-tight text-white">{plan.price}</p>
                      )}
                      {plan.note && (
                        <p className="text-mist-dim text-[13px] leading-snug mt-3">{plan.note}</p>
                      )}
                    </div>

                    {/* Features */}
                    <ul className="space-y-3.5 mb-9 flex-1">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-[15px] text-mist">
                          <span className="w-[18px] h-[18px] rounded-full bg-maven/25 flex items-center justify-center shrink-0">
                            <Check size={10} className="text-maven-lighter" />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <MagneticButton
                      variant={plan.featured ? 'accent' : 'deep'}
                      className="w-full"
                      onClick={() => onNavigate('/contact')}
                    >
                      Get Started
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
