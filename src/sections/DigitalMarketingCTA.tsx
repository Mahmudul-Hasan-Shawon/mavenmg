import { ArrowRight, ArrowUpRight } from 'lucide-react'
import FoundationPrimitives, {
  type FoundationItem,
} from '../components/podie/kedhareswer--foundation-primitives/components/ui/foundation-primitives'
import { MagneticButton } from '../components/ui/MagneticButton'
import { Reveal } from '../components/ui/Reveal'

interface DigitalMarketingCTAProps {
  onNavigate: (href: string) => void
}

/** The channel shapes on the PODIE Foundation Primitives card, in brand hues. */
const CHANNELS: FoundationItem[] = [
  { label: 'Search', shape: 'asterisk', colors: ['#8b4fbf', '#e5d5ff'], tile: 'disc' },
  { label: 'Social', shape: 'sphere', colors: ['#a06fdb', '#ecd9ff'], tile: 'square' },
  { label: 'Content', shape: 'halves', colors: ['#7c3aed', '#dcc9ff'], tile: 'square' },
  { label: 'Email', shape: 'hourglass', colors: ['#c084fc', '#f0e3ff'], tile: 'disc' },
  { label: 'Ads', shape: 'torus', colors: ['#6d2fa5', '#d8c4ff'], tile: 'none' },
]

/**
 * Digital-marketing-specific closing CTA, sharing the cyber CTA's dark
 * dossier card. The right side carries PODIE's Foundation Primitives
 * (kedhareswer, via the podie.dev registry; license notice in
 * src/licenses/kedhareswer--foundation-primitives.txt) as a playful metaphor
 * for the channel mix: gel 3D shapes that tilt to the pointer, lift on
 * hover, spin on drag and pop on click.
 */
export function DigitalMarketingCTA({ onNavigate }: DigitalMarketingCTAProps) {
  return (
    <section
      id="digital-marketing-cta"
      className="section relative py-20 md:py-28"
      aria-label="Start growing"
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
              </div>

              <div className="relative grid gap-12 p-8 pb-4 md:p-14 md:pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-10">
                <div>
                  <h2 className="display max-w-2xl text-[clamp(2.3rem,4.6vw,4.1rem)] font-bold leading-[1.02] text-white-solid">
                    Your next customer is already{' '}
                    <span
                      style={{
                        backgroundImage: 'linear-gradient(100deg, #f2ecff 0%, #c9a6f5 50%, #8b4fbf 100%)',
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      searching.
                    </span>{' '}
                    <br />
                    We&apos;ll make sure they find{' '}
                    <span className="text-maven-digest">you.</span>
                  </h2>

                  <p className="mt-7 max-w-xl text-base leading-relaxed text-[#b9aecf] md:text-lg">
                    Tell us the growth target and a Marketing Maven will map the channel mix across search,
                    social, email and paid to hit it. No lock-in, just compounding results.
                  </p>

                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <MagneticButton
                      variant="primary"
                      size="lg"
                      shape="soft"
                      className="w-full sm:w-auto"
                      onClick={() => onNavigate('/contact')}
                    >
                      Book a Free Strategy Call <ArrowRight size={18} />
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
                </div>

                <FoundationPrimitives
                  ariaLabel="Marketing channels"
                  items={CHANNELS}
                  height="clamp(240px, 26vw, 320px)"
                  className="lg:ml-auto"
                />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
