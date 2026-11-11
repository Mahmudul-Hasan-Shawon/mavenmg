import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import { MagneticButton } from '../components/ui/MagneticButton'
import { Reveal } from '../components/ui/Reveal'

interface AIConsultingCTAProps {
  onNavigate: (href: string) => void
}


/**
 * AI-consulting-specific closing CTA. A dark "orbit + constellation" card:
 * a dark card with a calm ambient glow and corner washes behind the
 * headline. It reads as its own moment instead of a generic banner, while
 * keeping the same conversion path as the site's standard final CTA.
 */
export function AIConsultingCTA({ onNavigate }: AIConsultingCTAProps) {
  return (
    <section
      id="ai-consulting-cta"
      className="section relative px-6 pt-4 pb-20 md:pt-16 md:pb-32"
      aria-label="Free AI discovery call"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div
            className="relative rounded-[2rem] p-px shadow-[0_40px_120px_-40px_rgba(97,44,139,0.7)]"
            style={{
              background:
                'linear-gradient(135deg, rgba(218,202,255,0.45) 0%, rgba(139,79,191,0.16) 45%, rgba(185,138,240,0.35) 100%)',
            }}
          >
            <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-[#09060f]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                {/* Ambient center glow + soft corner washes, no network overlay */}
                <div className="absolute left-1/2 top-1/2 h-[520px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-maven/25 blur-[150px]" />
                <div className="absolute -top-24 -left-24 h-[300px] w-[300px] rounded-full bg-maven-light/10 blur-[120px]" />
                <div className="absolute -bottom-28 -right-20 h-[320px] w-[320px] rounded-full bg-[#b98af0]/10 blur-[130px]" />

                {/* Top hairline + horizon hairline */}
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(218,202,255,0.55),transparent)]" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(185,138,240,0.5),transparent)]" />
              </div>

              <div className="relative mx-auto max-w-3xl px-6 py-16 text-center sm:px-10 md:py-24">
                <Reveal>
                  <span className="inline-flex items-center gap-2 rounded-full border border-[#b98af0]/30 bg-[#b98af0]/[0.08] px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-[#dacaff]">
                    <Sparkles size={12} aria-hidden="true" /> AI Consulting
                  </span>
                </Reveal>

                <Reveal delay={0.05}>
                  <h2 className="display mt-7 text-[clamp(2.4rem,5vw,4.2rem)] font-bold leading-[1.04] text-white-solid">
                    Ready to build your{' '}
                    <span
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
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#b9aecf] md:text-lg">
                    Book a free discovery call. We&apos;ll map your highest-impact AI opportunities and outline a path
                    to production in 90 days or less.
                  </p>
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <MagneticButton
                      variant="primary"
                      size="lg"
                      shape="soft"
                      className="w-full sm:w-auto"
                      onClick={() => onNavigate('/contact')}
                    >
                      Book Your Discovery Call <ArrowRight size={18} />
                    </MagneticButton>
                    <MagneticButton
                      variant="glass"
                      size="lg"
                      shape="soft"
                      className="w-full sm:w-auto"
                      onClick={() => onNavigate('/services')}
                    >
                      All Services <ArrowUpRight size={18} />
                    </MagneticButton>
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
