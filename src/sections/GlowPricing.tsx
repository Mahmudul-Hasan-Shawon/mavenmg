import { ArrowUpRight, Check, Sparkles } from 'lucide-react'
import type { ServicePageData, ServicePlan } from '../data/servicePages'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { cn } from '../utils/cn'

/**
 * GlowPricing: faithful port of the Framer "Glow" pricing card design
 * (glowpricing.framer.website) for service-page plan sections.
 *
 * Structure per card, straight from the reference: a 6px inset wrapper
 * (room for the plate shadow), the card surface (28px radius) holding a
 * raised top panel (22px radius) with audience tag + badge, plan name +
 * description, the big tabular price with period and billing note, and
 * the pill CTA with a circular arrow chip plus a fine-print line; the
 * "What's included" checklist sits on the card body below the panel.
 *
 * The reference flanks one dark featured card with two light cards, and
 * that contrast IS the design, so the palette is fixed (identical in both
 * site themes) rather than theme-token driven. The colors below are the
 * template's own tokens, verbatim, with one deliberate swap: the lime
 * accent is the requested #e2fa84 instead of the template's #d3f35b.
 *
 * Template tokens used:
 *   light card  #ffffff / panel #f5f5f1 / ink #0f110e / muted #6a6d66 / border #e4e4de
 *   dark card   pure black (client call; the template's is #0f110e) / panel #1a1d18 /
 *               ink #f4f5f0 / muted #9c9f96
 *   accent      #e2fa84 (badge, glow, arrow chips, featured CTA)
 */

interface GlowPricingProps {
  data: ServicePageData
  onNavigate: (href: string) => void
}

export function GlowPricing({ data, onNavigate }: GlowPricingProps) {
  const headings = data.headings?.plans
  return (
    <section
      id={`${data.slug}-plans`}
      className="section py-24 md:py-36 border-t border-line relative overflow-clip"
      aria-label="Plans and pricing"
    >
      <div className="container-maven relative">
        <SectionHeading
          eyebrow={headings?.eyebrow ?? 'Plans & pricing'}
          title={headings?.title ?? 'Pick the plan that fits'}
          accent={headings?.accent ?? 'your goals'}
          lede={
            headings?.lede ??
            'Transparent pricing, no hidden fees. Every plan comes with the Maven quality guarantee and a real team behind you.'
          }
          align="center"
        />

        <div className="grid lg:grid-cols-3 gap-5 items-stretch">
          {data.plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.06} className="h-full">
              <GlowCard plan={plan} onNavigate={onNavigate} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function GlowCard({ plan, onNavigate }: { plan: ServicePlan; onNavigate: (href: string) => void }) {
  const featured = Boolean(plan.featured)
  const { head, period } = splitPrice(plan.price)

  return (
    <div className="h-full p-1.5">
      <div
        className={cn(
          'relative h-full flex flex-col rounded-[28px] border p-1.5',
          featured
            ? 'border-black bg-black shadow-[0_2px_4px_rgba(15,17,14,0.12),0_28px_56px_-16px_rgba(15,17,14,0.4)]'
            : 'border-[#e4e4de] bg-white-solid shadow-[0_1px_2px_rgba(15,17,14,0.04),0_12px_32px_-12px_rgba(15,17,14,0.1)]'
        )}
      >
        {/* Top panel: audience + badge, name, price, CTA */}
        <div
          className={cn(
            'relative overflow-hidden rounded-[22px] p-6 flex flex-col gap-7',
            featured ? 'bg-[#1a1d18]' : 'bg-[#f5f5f1]'
          )}
        >
          {featured && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-[110px] -right-[90px] w-[260px] h-[200px] rounded-full bg-[#e2fa84] opacity-[0.32] blur-[60px]"
            />
          )}

          <div className="relative z-[1] flex flex-col gap-3.5">
            <div className="flex items-center justify-between min-h-7 gap-3">
              {plan.audience && (
                <span className={cn('text-[13px] font-semibold', featured ? 'text-[#9c9f96]' : 'text-[#6a6d66]')}>
                  {plan.audience}
                </span>
              )}
              {featured && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e2fa84] py-1.5 pl-2.5 pr-3 text-[13px] font-semibold text-[#0f110e]">
                  <Sparkles size={12} aria-hidden="true" />
                  Most popular
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <h3 className={cn('display font-semibold text-xl', featured ? 'text-[#f4f5f0]' : 'text-[#0f110e]')}>
                {plan.name}
              </h3>
              <p className={cn('text-[15px] leading-relaxed', featured ? 'text-[#9c9f96]' : 'text-[#6a6d66]')}>
                {plan.blurb}
              </p>
            </div>
          </div>

          <div className="relative z-[1] flex flex-col gap-2">
            <div className="flex items-end gap-1">
              <span
                className={cn(
                  'font-dm font-bold leading-none tracking-[-0.02em] tabular-nums text-[44px] lg:text-[52px]',
                  featured ? 'text-[#f4f5f0]' : 'text-[#0f110e]'
                )}
              >
                {head}
              </span>
              {period && (
                <span className={cn('text-[15px] pb-1.5', featured ? 'text-[#9c9f96]' : 'text-[#6a6d66]')}>
                  {period}
                </span>
              )}
            </div>
            <span className={cn('text-[13px] font-semibold', featured ? 'text-[#9c9f96]' : 'text-[#6a6d66]')}>
              {plan.priceNote}
            </span>
          </div>

          {/* CTA + fine print live inside the panel, like the reference */}
          <div className="relative z-[1] flex flex-col items-center gap-3">
            <button
              type="button"
              data-cursor
              onClick={() => onNavigate('/contact')}
              className={cn(
                'group/btn flex h-[52px] w-full cursor-pointer items-center justify-between rounded-full pl-[22px] pr-1.5 text-[15px] font-semibold transition-colors duration-300',
                featured ? 'bg-[#e2fa84] text-[#0f110e] hover:bg-[#ecf9ab]' : 'bg-[#0f110e] text-[#f4f5f0] hover:bg-[#2a2d27]'
              )}
            >
              {plan.cta ?? 'Get started'}
              <span
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover/btn:translate-x-0.5',
                  featured ? 'bg-[#0f110e]' : 'bg-[#e2fa84]'
                )}
              >
                <ArrowUpRight size={18} className={featured ? 'text-[#e2fa84]' : 'text-[#0f110e]'} aria-hidden="true" />
              </span>
            </button>
            {plan.note && (
              <p className={cn('text-[13px] font-semibold text-center', featured ? 'text-[#9c9f96]' : 'text-[#6a6d66]')}>
                {plan.note}
              </p>
            )}
          </div>
        </div>

        {/* What's included */}
        <div className="flex flex-col gap-[18px] px-4 pt-6 pb-[22px]">
          <p className={cn('text-[13px] font-semibold', featured ? 'text-[#9c9f96]' : 'text-[#6a6d66]')}>
            What's included
          </p>
          <ul className="flex flex-col gap-3.5">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span
                  className={cn(
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full',
                    featured ? 'bg-[#e2fa84]' : 'bg-[#0f110e]'
                  )}
                >
                  <Check
                    size={11}
                    strokeWidth={2.5}
                    className={featured ? 'text-[#0f110e]' : 'text-[#f4f5f0]'}
                    aria-hidden="true"
                  />
                </span>
                <span className={cn('text-[15px] font-medium leading-snug', featured ? 'text-[#f4f5f0]' : 'text-[#0f110e]')}>
                  {f}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/** Splits "$1,200/month" into the big numeral and the trailing period. */
function splitPrice(price: string) {
  const slash = price.indexOf('/')
  if (slash === -1) return { head: price, period: null as string | null }
  return { head: price.slice(0, slash), period: price.slice(slash) }
}
