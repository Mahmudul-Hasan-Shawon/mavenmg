import { ArrowRight, ArrowUpRight, Check, Clock, FileText, Fingerprint, ShieldCheck } from 'lucide-react'
import { MagneticButton } from '../components/ui/MagneticButton'
import { Reveal } from '../components/ui/Reveal'

interface CyberSecurityCTAProps {
  onNavigate: (href: string) => void
}

/**
 * Cyber-security-specific closing CTA. Built as a dark "security intake"
 * dossier so it feels like the start of a review rather than a generic
 * marketing banner, while keeping the same conversion path as the site's
 * standard final CTA.
 */
export function CyberSecurityCTA({ onNavigate }: CyberSecurityCTAProps) {
  return (
    <section
      id="cyber-security-cta"
      className="section relative px-6 pt-4 pb-20 md:pt-16 md:pb-32"
      aria-label="Free security gap review"
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

              <div className="relative grid gap-12 p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:p-16">
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
                      shape="soft"
                      className="w-full sm:w-auto"
                      onClick={() => onNavigate('/contact')}
                    >
                      Book a Free Gap Review <ArrowRight size={18} />
                    </MagneticButton>
                    <MagneticButton
                      variant="glass"
                      size="lg"
                      shape="soft"
                      className="w-full sm:w-auto"
                      onClick={() => onNavigate('/contact')}
                    >
                      Contact Us <ArrowUpRight size={18} />
                    </MagneticButton>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#a89fc0]">
                    <span className="inline-flex items-center gap-2">
                      <Clock size={14} className="text-[#dacaff]" /> 15 minutes
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <ShieldCheck size={14} className="text-[#dacaff]" /> No obligation
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <FileText size={14} className="text-[#dacaff]" /> Fixed-fee phases
                    </span>
                  </div>
                </div>

                <div className="relative mx-auto w-full max-w-md lg:ml-auto">
                  <div aria-hidden="true" className="absolute -inset-4 rounded-[2rem] bg-maven/20 blur-2xl" />
                  <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)] backdrop-blur-xl md:p-6">
                    <div
                      aria-hidden="true"
                      className="security-scan pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(218,202,255,0.9),transparent)]"
                    />

                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <div className="flex items-center gap-2.5">
                        <Fingerprint size={14} className="text-[#dacaff]" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#9f92b8]">
                          Security review intake
                        </span>
                      </div>
                      <span className="font-mono text-[9px] tracking-[0.2em] text-[#9f92b8]">001</span>
                    </div>

                    <div className="mt-5 flex items-start gap-3">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-[#dacaff]/20 bg-[#dacaff]/[0.08] text-[#dacaff]">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white-solid">Your questionnaire</p>
                        <p className="mt-1 text-xs leading-relaxed text-[#9f92b8]">
                          SOC 2 · PCI DSS · enterprise vendor review
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                      <IntakeRow label="Framework" value="SOC 2 Type II" />
                      <IntakeRow label="Blocking deal" value="Enterprise vendor review" />
                      <IntakeRow label="Target" value="Fastest path to yes" accent />
                    </div>

                    <div className="mt-5 rounded-2xl border border-white/10 bg-[#0d0915]/80 p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#9f92b8]">
                          Path to clearance
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#dacaff]">
                          3 phases
                        </span>
                      </div>
                      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full w-[78%] rounded-full bg-[linear-gradient(90deg,#8b4fbf,#b98af0_55%,#dacaff)] shadow-[0_0_18px_rgba(139,79,191,0.5)]" />
                      </div>
                      <div className="mt-2.5 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.12em] text-[#9f92b8]">
                        <span className="text-[#dacaff]">Scope</span>
                        <span className="text-[#dacaff]">Gap map</span>
                        <span>Fixed fee</span>
                      </div>
                    </div>

                    <div className="mt-5 flex items-center gap-2 text-[11px] leading-relaxed text-[#b9aecf]">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#b98af0]/10 text-[#dacaff]">
                        <Check size={11} />
                      </span>
                      Independent audit coordination included
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function IntakeRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#9f92b8]">{label}</span>
      <span className={`text-right text-xs font-medium ${accent ? 'text-[#dacaff]' : 'text-white-solid'}`}>{value}</span>
    </div>
  )
}
