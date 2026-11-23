import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { GenerativeArtScene } from '../components/ui/anomalous-matter-hero'
import { MagneticButton } from '../components/ui/MagneticButton'
import { Reveal } from '../components/ui/Reveal'

interface AIConsultingCTAProps {
  onNavigate: (href: string) => void
}

/**
 * AI-consulting closing CTA, sharing the homepage final CTA's card
 * geometry: same container, card, padding and 12-column split with the copy
 * on the left and the anomalous matter wireframe (pointer-following light,
 * noise-displaced blob) sitting in the orb's slot on the right.
 */
export function AIConsultingCTA({ onNavigate }: AIConsultingCTAProps) {
  return (
    <section
      id="ai-consulting-cta"
      className="section py-20 md:py-28"
      aria-label="Free AI discovery call"
    >
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
            </div>

            {/* Content */}
            <div className="relative p-8 md:p-14">
              <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-7">
                  <h2 className="display text-[clamp(1.9rem,4.4vw,3.6rem)] leading-[1.06] text-white">
                    Ready to build your{' '}
                    <span
                      className="whitespace-nowrap"
                      style={{
                        backgroundImage: 'linear-gradient(100deg, #f2ecff 0%, #c9a6f5 50%, #8b4fbf 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      AI advantage?
                    </span>
                  </h2>
                  <p className="mt-5 max-w-xl text-base leading-relaxed text-mist md:text-lg">
                    Book a free discovery call. We&apos;ll map your highest-impact AI opportunities and
                    outline a path to production in 90 days or less.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <MagneticButton variant="primary" size="lg" onClick={() => onNavigate('/contact')}>
                      Book Your Discovery Call
                      <ArrowRight size={18} />
                    </MagneticButton>
                    <MagneticButton variant="deepOutline" size="lg" onClick={() => onNavigate('/services')}>
                      All Services
                      <ArrowUpRight size={18} />
                    </MagneticButton>
                  </div>
                </div>
                <div className="relative mx-auto aspect-square w-[260px] max-w-full sm:w-[340px] md:col-span-5 md:w-full md:max-w-[380px] lg:max-w-[440px]">
                  <GenerativeArtScene
                    className="pointer-events-none absolute inset-0"
                    color="#a06fdb"
                    scale={1.35}
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
