import {
  ArrowRight,
  GraduationCap,
  Gem,
  HeartHandshake,
  PenTool,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react'
import { reasons } from '../data/content'
import { SectionHeading } from '../components/ui/SectionHeading'
import { MagneticButton } from '../components/ui/MagneticButton'
import GradientWaves from '../components/ui/GradientWaves'
import { trackSpotlight } from '../utils/motion'
import { cn } from '../utils/cn'

const reasonIcons: Record<string, LucideIcon> = {
  '01': PenTool,
  '02': GraduationCap,
  '03': TrendingUp,
  '04': HeartHandshake,
  '05': ShieldCheck,
  '06': Sparkles,
  '07': Gem,
}

/**
 * WhyMaven "Why Choose Maven" as a premium bento index. The flagship
 * "01" reason spans two columns with a ghosted numeral; every card carries
 * a mouse-tracked spotlight, a glow-tl lift, an icon tile and a gradient
 * hairline border that ignites to maven on hover. A deep-violet CTA card
 * closes the grid.
 */
export function WhyMaven({ onNavigate }: { onNavigate?: (href: string) => void }) {
  return (
    <section
      id="why-maven"
      className="section py-28 md:py-36 border-t border-line relative overflow-clip"
      aria-label="Why Maven"
    >
      {/* Ambient wash */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[900px] h-[420px] rounded-full bg-maven/10 blur-[160px]" />
      </div>

      <div className="container-maven relative">
        <SectionHeading
          eyebrow="Why Maven"
          title="Why Choose Maven"
          accent={'For Web Design &\nMarketing Services?'}
          highlight={['maven']}
          accentLight
          accentWhite={['&', 'for']}
          lede="Seven reasons businesses across the US and beyond trust Maven with their digital presence."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {reasons.map((reason, i) => {
            const Icon = reasonIcons[reason.index]
            const featured = i === 0
            return (
              <div
                key={reason.index}
                className={cn('h-full', featured && 'sm:col-span-2 lg:col-span-2')}
              >
                <div className="scroll-blur group relative h-full rounded-3xl transition-all duration-500 ease-out hover:-translate-y-1.5">
                  {/* Gradient hairline border ignites to maven on hover */}
                  <div
                    className={cn(
                      'rounded-3xl p-px h-full transition-colors duration-500',
                      featured ? 'bg-maven-light/40 group-hover:bg-maven-light/70' : 'bg-line group-hover:bg-maven-light/50'
                    )}
                  >
                    <div
                      className={cn(
                        'spotlight glow-tl rounded-[calc(1.5rem-1px)] bg-void h-full flex flex-col overflow-hidden',
                        featured ? 'p-8 md:p-10' : 'p-7 md:p-8'
                      )}
                      onPointerMove={trackSpotlight}
                    >
                      {/* Ghosted numeral top-right watermark */}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute top-0 -right-0 block font-poppins font-bold leading-none text-stroke-faint select-none pointer-events-none',
                          featured ? 'text-[8rem]' : 'text-[5rem]'
                        )}
                      >
                        {reason.index}
                      </span>

                      {/* Icon */}
                      <div className="mb-6">
                        <span
                          className={cn(
                            'w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110',
                            featured ? 'bg-maven-light/20 text-maven-lighter' : 'bg-maven/15 text-maven-lighter'
                          )}
                        >
                          {Icon && <Icon size={20} />}
                        </span>
                      </div>

                      <h3
                        className={cn(
                          'display font-semibold leading-snug tracking-[0.01em]',
                          featured ? 'text-2xl md:text-[1.75rem]' : 'text-xl'
                        )}
                      >
                        {reason.title}
                      </h3>

                      <p
                        className={cn(
                          'mt-3 text-mist-dim leading-relaxed',
                          featured ? 'max-w-xl text-base md:text-lg' : 'text-[15px]'
                        )}
                      >
                        {reason.description}
</p>
                  </div>
                </div>
              </div>
            </div>
            )
          })}

          {/* CTA card */}
          {onNavigate && (
            <div className="h-full sm:col-span-2 lg:col-span-1">
              <div className="scroll-blur group relative h-full rounded-3xl transition-transform duration-500 ease-out hover:-translate-y-1.5">
                <div className="spotlight glow-tl rounded-3xl bg-[#0d0818] p-8 md:p-9 flex flex-col justify-end gap-6 h-full overflow-hidden">
                  <div aria-hidden="true" className="absolute inset-0">
                    <GradientWaves
                      horizonColor="#1b0b2e"
                      waveColor="#612c8b"
                      crestColor="#dacaff"
                      speed={0.35}
                      amplitude={2.5}
                      waveScale={0.9}
                      waveRatio={0.9}
                      swell={35}
                      turbulence={20}
                      tilt={1.11}
                      zoom={1.05}
                      height={3.5}
                      fogDepth={18}
                      detail="medium"
                      brightness={1.05}
                      opacity={1.0}
                      mouseInteraction
                      parallaxStrength={0.5}
                      grain
                      grainIntensity={0.05}
                    />
                  </div>

                  <div className="relative">
                    <span className="mono-label !text-white-solid/70 mb-4 block">Next step</span>
                    <p className="display font-semibold text-2xl md:text-[1.75rem] leading-tight text-white-solid">
                      Ready to build a website that converts?
                    </p>
                    <p className="mt-3 text-white-solid/70 text-[15px] leading-relaxed max-w-xs">
                      Tell us about your project, we'll craft a digital presence that drives real results.
                    </p>
                  </div>

                  <MagneticButton variant="glass" className="relative" onClick={() => onNavigate('/contact')}>
                    Start Your Project
                    <ArrowRight size={16} />
                  </MagneticButton>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}