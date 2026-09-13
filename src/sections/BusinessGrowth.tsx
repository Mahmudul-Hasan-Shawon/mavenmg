import { Fragment } from 'react'
import { ArrowRight, ChevronDown, ChevronRight } from 'lucide-react'
import { SectionHeading } from '../components/ui/SectionHeading'
import { MagneticButton } from '../components/ui/MagneticButton'
import { Eyebrow } from '../components/text/Eyebrow'

interface GrowthTier {
  tag: string
  title: string
  description: string
  image: string
}

/**
 * BusinessGrowth Maven's growth journey as three progressive tiers:
 * Small Business → Medium Business → Enterprise Solutions. Each tier pairs a
 * square illustration with its stage copy, and connector arrows lead the eye
 * along the scaling path.
 */
const tiers: GrowthTier[] = [
  {
    tag: '01 · Foundation',
    title: 'Small Business',
description:
      'Every empire starts somewhere. We give small businesses a website and brand that punch far above their weight, so the first impression is the right one.',
      image: '/images/growth/small-business.png',
  },
  {
    tag: '02 · Momentum',
    title: 'Mid-Sized Business',
description:
      'Systems replace guesswork. As you scale, we automate campaigns, sharpen your funnel, and turn steady traffic into predictable revenue.',
      image: '/images/growth/medium-business.png',
  },
  {
    tag: '03 · Enterprise',
    title: 'Enterprise Solution',
description:
      'Enterprise-grade performance with a hands-on crew. We run integrated marketing engines across every channel so your teams can go bigger.',
      image: '/images/growth/enterprise-solution.png',
  },
]

export function BusinessGrowth({ onNavigate }: { onNavigate?: (href: string) => void }) {
  return (
    <section
      id="business-growth"
      className="section py-28 md:py-36 border-t border-line relative overflow-clip"
      aria-label="Business growth"
    >
      {/* Ambient wash */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-[4%] w-[440px] h-[440px] rounded-full bg-maven-light/10 blur-[150px]" />
        <div className="absolute bottom-[8%] left-[6%] w-[360px] h-[360px] rounded-full bg-maven/10 blur-[140px]" />
      </div>

      <div className="container-maven relative">
        <SectionHeading
          eyebrow="Business Growth"
          title="A growth partner for"
          accent="every stage of your journey"
          highlight={['every', 'journey']}
          accentLight
          accentWhite={['stage']}
          lede="From first launch to full-scale enterprise, Maven grows with you the right tools, the right strategy, at the right size."
          align="center"
        />

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {tiers.map((tier, i) => {
            return (
              <Fragment key={tier.title}>
                {i > 0 && (
                  <div className="flex lg:hidden justify-center -my-2" aria-hidden="true">
                    <span className="w-10 h-10 rounded-full bg-maven-deep border border-maven-light/40 text-white-solid flex items-center justify-center shadow-[0_8px_24px_-8px_rgba(139,79,191,0.6)]">
                      <ChevronDown size={18} />
                    </span>
                  </div>
                )}

                <div className="relative" data-growth-tier>
                  {/* Desktop connector arrow */}
                  {i < tiers.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden lg:flex absolute top-[38%] right-0 translate-x-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-maven-deep border border-maven-light/40 text-white-solid items-center justify-center shadow-[0_8px_28px_-8px_rgba(139,79,191,0.65)]"
                    >
                      <ChevronRight size={20} />
                    </span>
                  )}

                  <div className="scroll-blur panel panel-hover group relative h-full rounded-3xl overflow-hidden transition-shadow duration-500">
                    {/* Illustration */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-void">
                      <div className="absolute inset-0 opacity-25 blur-2xl scale-125 transition-transform duration-700 group-hover:scale-150">
                        <img src={tier.image} alt="" loading="lazy" className="duotone-maven w-full h-full object-contain" />
                      </div>
                      <img
                        src={tier.image}
                        alt={`${tier.title} growth illustration`}
                        loading="lazy"
                        className="duotone-maven relative w-full h-full object-contain p-4 md:p-6 transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Copy */}
                    <div className="p-7 md:p-8">
                      <Eyebrow label={tier.tag} className="mb-4" />
                      <h3 className="display font-semibold text-2xl text-white mb-3 tracking-[0.01em]">
                        {tier.title}
                      </h3>
                      <p className="text-mist text-[15px] leading-relaxed">{tier.description}</p>
                    </div>
                  </div>
                </div>
              </Fragment>
            )
          })}
        </div>

        {onNavigate && (
          <div className="mt-12 flex justify-center">
            <MagneticButton variant="primary" onClick={() => onNavigate('/contact')}>
              Find your growth stage <ArrowRight size={16} />
            </MagneticButton>
          </div>
        )}
      </div>
    </section>
  )
}