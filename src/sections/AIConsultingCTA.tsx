import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react'
import { MagneticButton } from '../components/ui/MagneticButton'
import { Reveal } from '../components/ui/Reveal'

interface AIConsultingCTAProps {
  onNavigate: (href: string) => void
}

/**
 * AI-consulting-specific closing CTA. A dark "orbit + constellation" card:
 * satellite rings spinning behind the headline and a network of pulsing
 * nodes with data pulses flowing between them. It reads as its own moment
 * instead of a generic banner, while keeping the same conversion path as the
 * site's standard final CTA.
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
                {/* Ambient center glow */}
                <div className="absolute left-1/2 top-1/2 h-[520px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-maven/25 blur-[150px]" />

                {/* Satellite rings with orbiting dots */}
                <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2">
                  <div className="ai-orbit relative h-[430px] w-[430px] rounded-full border border-[#b98af0]/15">
                    <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dacaff] shadow-[0_0_14px_rgba(218,202,255,0.8)]" />
                  </div>
                </div>
                <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2">
                  <div className="ai-orbit-reverse relative h-[640px] w-[640px] rounded-full border border-dashed border-[#b98af0]/10">
                    <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b98af0] shadow-[0_0_10px_rgba(185,138,240,0.8)]" />
                  </div>
                </div>

                {/* Neural constellation */}
                <svg
                  className="absolute inset-0 h-full w-full"
                  viewBox="0 0 1200 480"
                  preserveAspectRatio="xMidYMid slice"
                  fill="none"
                >
                  <g stroke="rgba(218,202,255,0.14)" strokeWidth="1">
                    <line x1="80" y1="120" x2="300" y2="180" />
                    <line x1="300" y1="180" x2="420" y2="80" />
                    <line x1="420" y1="80" x2="680" y2="120" />
                    <line x1="680" y1="120" x2="900" y2="200" />
                    <line x1="900" y1="200" x2="1060" y2="340" />
                    <line x1="980" y1="80" x2="1120" y2="140" />
                    <line x1="180" y1="300" x2="300" y2="180" />
                    <line x1="180" y1="300" x2="150" y2="420" />
                    <line x1="240" y1="60" x2="80" y2="120" />
                    <line x1="520" y1="360" x2="760" y2="400" />
                    <line x1="760" y1="400" x2="840" y2="420" />
                    <line x1="520" y1="360" x2="620" y2="460" />
                    <line x1="360" y1="440" x2="520" y2="360" />
                    <line x1="1060" y1="340" x2="840" y2="420" />
                    <line x1="520" y1="360" x2="680" y2="120" />
                  </g>

                  {/* Data pulses traveling along the network */}
                  <g stroke="#dacaff" strokeWidth="1.5" strokeLinecap="round">
                    <path
                      className="ai-flow"
                      pathLength={100}
                      strokeDasharray="6 94"
                      strokeOpacity="0.45"
                      d="M 80 120 L 300 180 L 420 80 L 680 120"
                    />
                    <path
                      className="ai-flow ai-flow-delay-1"
                      pathLength={100}
                      strokeDasharray="6 94"
                      strokeOpacity="0.35"
                      d="M 180 300 L 300 180 L 420 80"
                    />
                    <path
                      className="ai-flow ai-flow-delay-2"
                      pathLength={100}
                      strokeDasharray="6 94"
                      strokeOpacity="0.4"
                      d="M 520 360 L 760 400 L 1060 340 L 900 200"
                    />
                  </g>

                  {/* Network nodes */}
                  <g fill="#b98af0">
                    <circle className="ai-node" style={{ animationDelay: '0s' }} cx="80" cy="120" r="3" />
                    <circle className="ai-node" style={{ animationDelay: '1.2s' }} cx="300" cy="180" r="2.5" />
                    <circle className="ai-node" style={{ animationDelay: '2.1s' }} cx="420" cy="80" r="2" />
                    <circle className="ai-node" style={{ animationDelay: '0.7s' }} cx="680" cy="120" r="2.5" />
                    <circle className="ai-node" style={{ animationDelay: '1.8s' }} cx="900" cy="200" r="3" />
                    <circle className="ai-node" style={{ animationDelay: '2.6s' }} cx="980" cy="80" r="2" />
                    <circle className="ai-node" style={{ animationDelay: '0.4s' }} cx="1120" cy="140" r="2.5" />
                    <circle className="ai-node" style={{ animationDelay: '1.5s' }} cx="1060" cy="340" r="3" />
                    <circle className="ai-node" style={{ animationDelay: '2.9s' }} cx="840" cy="420" r="2" />
                    <circle className="ai-node" style={{ animationDelay: '0.9s' }} cx="760" cy="400" r="2.5" />
                    <circle className="ai-node" style={{ animationDelay: '2.3s' }} cx="520" cy="360" r="3" />
                    <circle className="ai-node" style={{ animationDelay: '1.1s' }} cx="360" cy="440" r="2.5" />
                    <circle className="ai-node" style={{ animationDelay: '2.7s' }} cx="620" cy="460" r="2" />
                    <circle className="ai-node" style={{ animationDelay: '0.2s' }} cx="180" cy="300" r="2.5" />
                    <circle className="ai-node" style={{ animationDelay: '1.9s' }} cx="150" cy="420" r="2" />
                    <circle className="ai-node" style={{ animationDelay: '2.4s' }} cx="240" cy="60" r="2" />
                  </g>
                </svg>

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
