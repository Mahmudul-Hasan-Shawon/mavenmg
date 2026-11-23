import type { ReactNode } from 'react'
import { ArrowRight } from 'lucide-react'
import { MagneticButton } from '../components/ui/MagneticButton'
import { CuriousAiOrb } from '../components/ui/CuriousAiOrb'
import { Reveal } from '../components/ui/Reveal'
import { cn } from '../utils/cn'

/**
 * Closing CTA as a single card: content taken from
 * mavenmarketinggroup.com's closing block. The dark card carries a quiet
 * violet gradient under a soft violet floor glow.
 * Stays dark in both themes, like the old gradient CTA did.
 * Every page uses the live Curious AI orb on the right.
 */
export function FinalCTA({
  onNavigate,
  title = (
    <>
      Tell us where you want the business to be in{' '}
      <span className="grad-text whitespace-nowrap">twelve months.</span>
    </>
  ),
  description = (
    <>
      Share what you&rsquo;re trying to accomplish and a Marketing Maven will map the
      right mix of search, web, AI and security to get there. No pitch deck, just a
      plan.
    </>
  ),
  stacked = false,
  orb = true,
}: {
  onNavigate: (href: string) => void
  /** Optional copy overrides so other pages can reuse the same card. */
  title?: ReactNode
  description?: ReactNode
  /** Put the description under the heading instead of beside it on wide screens. */
  stacked?: boolean
  /** Show the interactive Curious AI orb beside the copy (on by default). */
  orb?: boolean
}) {
  const showOrb = orb

  const actions = (spacing: string) => (
    <div className={cn('flex flex-wrap items-center gap-4', spacing)}>
      <MagneticButton variant="primary" size="lg" onClick={() => onNavigate('/contact')}>
        Start Your Project
        <ArrowRight size={18} />
      </MagneticButton>
      <MagneticButton variant="deepOutline" size="lg" onClick={() => onNavigate('/contact')}>
        Contact Us
      </MagneticButton>
    </div>
  )

  return (
    <section id="final-cta" className="section py-20 md:py-28" aria-label="Start your project">
      <div className="container-maven">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] shadow-[0_28px_80px_-28px_rgba(97,44,139,0.55)]">
            {/* Horizon backdrop, clipped to the card */}
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
              <div
                className="absolute inset-0"
                style={{
                  backgroundColor: '#050308',
                  backgroundImage:
                    'radial-gradient(ellipse 75% 60% at 50% 108%, rgba(139,79,191,0.5) 0%, rgba(5,3,8,0) 65%)',
                }}
              />
            </div>

            {/* Content */}
            <div className="relative p-8 md:p-14">
              {showOrb ? (
                <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-7">
                    <h2 className="display text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[1.06] text-white">
                      {title}
                    </h2>
                    <p className="mt-5 max-w-xl text-base leading-relaxed text-mist md:text-lg">
                      {description}
                    </p>
                    {actions('mt-8')}
                  </div>
                  <div className="relative mx-auto aspect-square w-[260px] max-w-full sm:w-[340px] md:col-span-5 md:w-full md:max-w-[380px] lg:max-w-[440px]">
                    <CuriousAiOrb className="absolute inset-0" />
                  </div>
                </div>
              ) : (
                <>
                  <div className={cn(stacked ? 'flex flex-col gap-5' : 'grid gap-10 md:grid-cols-12 md:gap-8')}>
                    <h2
                      className={cn(
                        'display text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[1.06] text-white',
                        stacked ? 'max-w-3xl' : 'md:col-span-7',
                      )}
                    >
                      {title}
                    </h2>

                    <p
                      className={cn(
                        'text-mist text-base md:text-lg leading-relaxed',
                        stacked
                          ? 'max-w-xl'
                          : 'md:col-span-5 md:pt-2 md:max-w-sm md:justify-self-end',
                      )}
                    >
                      {description}
                    </p>
                  </div>

                  {actions('mt-12 md:mt-16')}
                </>
              )}

              {/* Breathing room above the horizon floor (non-orb layout only;
                  the orb layout keeps its padding symmetric instead) */}
              {!showOrb && <div className="h-24 md:h-32" aria-hidden="true" />}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
