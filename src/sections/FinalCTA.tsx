import { useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap, useGsapContext } from '../hooks/useGsap'
import { AnimatedText } from '../components/text/AnimatedText'
import { MagneticButton } from '../components/ui/MagneticButton'
import { LazyCanvas } from '../three/LazyCanvas'
import { lazy, type LazyExoticComponent, type ComponentType } from 'react'
import { reducedMotion } from '../utils/motion'

const CTAField = reducedMotion ? null : lazyScene(() => import('../three/CTAField'))

function lazyScene(
  load: () => Promise<{ default: ComponentType<any> }>
): LazyExoticComponent<ComponentType<any>> {
  return lazy(load)
}

/**
 * FinalCTA — the climax. A deep particle field gathers and brightens as the
 * section scrolls in (focus uniform driven by ScrollTrigger), typography
 * reveals line by line, and the CTA is magnetic.
 */
export function FinalCTA({ onNavigate }: { onNavigate: (href: string) => void }) {
  const rootRef = useRef<HTMLElement>(null)
  const focusRef = useRef(0)

  useGsapContext(
    rootRef,
    ({ ScrollTrigger: ST }) => {
      ST.create({
        trigger: rootRef.current,
        start: 'top 85%',
        end: 'top 20%',
        scrub: 0.5,
        onUpdate: (self) => {
          focusRef.current = self.progress
        },
      })

      gsap.fromTo(
        '[data-cta-line]',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.12,
          scrollTrigger: { trigger: rootRef.current, start: 'top 65%', once: true },
        }
      )
    },
    []
  )

  return (
    <section
      ref={rootRef}
      className="relative min-h-[92svh] flex items-center justify-center overflow-hidden border-t border-line"
      aria-label="Start your project"
    >
      {/* Particle field */}
      <div className="absolute inset-0">
        <LazyCanvas
          Scene={CTAField}
          sceneProps={{ focusRef }}
          className="absolute inset-0"
          fallback={
            <div className="absolute inset-0" aria-hidden="true">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-maven/15 blur-[150px]" />
            </div>
          }
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--scrim-strong)_100%)]" />
      </div>

      <div className="relative z-10 text-center px-6 py-28">
        <p data-cta-line className="mono-label !text-mist mb-8">Connect with a Marketing Maven now</p>

        <h2 className="display text-[clamp(2.6rem,8vw,6.5rem)] text-white">
          <span data-cta-line className="block">
            <AnimatedText trigger="scroll" mode="words" stagger={0.08} duration={1}>
              Start Your
            </AnimatedText>
          </span>
          <span data-cta-line className="block mt-1">
            <AnimatedText trigger="scroll" mode="words" stagger={0.08} delay={0.2} duration={1} blur gradient>
              Success Story
            </AnimatedText>
          </span>
        </h2>

        <div data-cta-line className="mt-12 flex justify-center">
          <MagneticButton variant="light" strength={0.45} onClick={() => onNavigate('/contact')} className="!px-10 !py-5 !text-lg">
            Start Your Project
            <ArrowRight size={20} />
          </MagneticButton>
        </div>

        <p data-cta-line className="mt-10 text-mist-dim text-sm">
          Elevate your website and supercharge your digital marketing results.
        </p>
      </div>
    </section>
  )
}
