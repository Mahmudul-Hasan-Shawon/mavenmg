import { ArrowRight } from 'lucide-react'
import { MagneticButton } from '../components/ui/MagneticButton'
import { Reveal } from '../components/ui/Reveal'

/**
 * Closing CTA as a single card: content taken from
 * mavenmarketinggroup.com's closing block. The dark card carries a soft
 * violet floor glow and a giant outlined "12" watermark; no moving parts.
 * Stays dark in both themes, like the old gradient CTA did.
 */
export function FinalCTA({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <section id="final-cta" className="section py-20 md:py-28" aria-label="Start your project">
      <div className="container-maven">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line shadow-[0_28px_80px_-28px_rgba(97,44,139,0.55)]">
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
              {/* Giant outlined year watermark */}
              <div
                className="absolute -bottom-8 right-[1%] hidden md:block select-none leading-none text-[8rem] lg:text-[11rem] font-dm font-[1000] opacity-80"
                style={{
                  WebkitTextStroke: '1px rgba(218, 202, 255, 0.14)',
                  color: 'transparent',
                }}
              >
                2027
              </div>
            </div>

            {/* Content */}
            <div className="relative p-8 pb-0 md:p-14 md:pb-0">
              {/* Editorial top rule */}
              <div className="flex items-center justify-between gap-6 border-b border-line pb-5 mb-12 md:mb-16">
                <span className="mono-label text-maven-lighter">Let&rsquo;s grow</span>
                <span className="mono-label hidden sm:block">Search · Web · AI · Security</span>
              </div>

              <div className="grid gap-10 md:grid-cols-12 md:gap-8">
                <h2 className="display text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[1.06] text-white md:col-span-7">
                  Tell us where you want the business to be in{' '}
                  <span className="grad-text whitespace-nowrap">twelve months.</span>
                </h2>

                <p className="text-mist text-base md:text-lg leading-relaxed md:col-span-5 md:pt-2 md:max-w-sm md:justify-self-end">
                  Share what you&rsquo;re trying to accomplish and a Marketing Maven will map the
                  right mix of search, web, AI and security to get there. No pitch deck, just a
                  plan.
                </p>
              </div>

              <div className="mt-12 md:mt-16 flex flex-wrap items-center gap-4">
                <MagneticButton variant="primary" size="lg" onClick={() => onNavigate('/contact')}>
                  Start Your Project
                  <ArrowRight size={18} />
                </MagneticButton>
                <MagneticButton variant="deepOutline" size="lg" onClick={() => onNavigate('/contact')}>
                  Contact Us
                </MagneticButton>
              </div>

              {/* Breathing room above the horizon floor */}
              <div className="h-24 md:h-32" aria-hidden="true" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
