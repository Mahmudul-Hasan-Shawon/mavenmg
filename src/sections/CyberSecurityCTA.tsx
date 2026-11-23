import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { CubeWavePanel } from '../components/ui/CubeWavePanel'
import { MagneticButton } from '../components/ui/MagneticButton'
import { Reveal } from '../components/ui/Reveal'

interface CyberSecurityCTAProps {
  onNavigate: (href: string) => void
}

/**
 * Cyber-security-specific closing CTA. Built as a dark "security intake"
 * dossier so it feels like the start of a review rather than a generic
 * marketing banner. The right side carries PODIE's live CubeWave scene as a
 * quiet visual metaphor for a signal resolving into a clear path, while the
 * conversion path stays the same as the site's standard final CTA.
 */
export function CyberSecurityCTA({ onNavigate }: CyberSecurityCTAProps) {
  return (
    <section
      id="cyber-security-cta"
      className="section relative py-20 md:py-28"
      aria-label="Free security gap review"
    >
      <div className="container-maven">
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
                <div className="absolute -left-40 -top-48 h-[560px] w-[560px] rounded-full bg-maven/25 blur-[140px]" />
                <div className="absolute -right-40 top-6 h-[460px] w-[460px] rounded-full bg-[#b98af0]/10 blur-[130px]" />
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(218,202,255,0.16) 1px, transparent 1px), linear-gradient(90deg, rgba(218,202,255,0.16) 1px, transparent 1px)',
                    backgroundSize: '56px 56px',
                    maskImage: 'radial-gradient(circle at 50% 30%, black, transparent 78%)',
                    WebkitMaskImage: 'radial-gradient(circle at 50% 30%, black, transparent 78%)',
                  }}
                />
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(218,202,255,0.55),transparent)]" />
              </div>

              <div className="relative grid gap-12 p-8 pb-4 md:p-14 md:pb-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10">
                <div>
                  <h2 className="display max-w-2xl text-[clamp(2.3rem,4.6vw,4.1rem)] font-bold leading-[1.02] text-white-solid">
                    Send us the{' '}
                    <span
                      style={{
                        backgroundImage: 'linear-gradient(100deg, #f2ecff 0%, #c9a6f5 50%, #8b4fbf 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      questionnaire.
                    </span>{' '}
                    <br />
                    We&apos;ll tell you what it takes to{' '}
                    <span className="text-maven-digest">clear it.</span>
                  </h2>

                  <p className="mt-7 max-w-xl text-base leading-relaxed text-[#b9aecf] md:text-lg">
                    Share the security review, contract clause or framework your customer named and we&apos;ll map the
                    fastest path to yes, with fixed-fee phases and no obligation.
                  </p>

                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <MagneticButton
                      variant="primary"
                      size="lg"
                                      className="w-full sm:w-auto"
                      onClick={() => onNavigate('/contact')}
                    >
                      Book a Free Gap Review <ArrowRight size={18} />
                    </MagneticButton>
                    <MagneticButton
                      variant="glass"
                      size="lg"
                                      className="w-full sm:w-auto"
                      onClick={() => onNavigate('/contact')}
                    >
                      Contact Us <ArrowUpRight size={18} />
                    </MagneticButton>
                  </div>
                </div>

                {/* Live PODIE / Threecn CubeWave — original instanced radial
                    wave on a square stage that matches the dark CTA. */}
                <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl shadow-[0_24px_60px_-30px_rgba(0,0,0,0.9)] lg:ml-auto lg:max-w-none">
                  <CubeWavePanel />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#09060f] to-transparent"
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
