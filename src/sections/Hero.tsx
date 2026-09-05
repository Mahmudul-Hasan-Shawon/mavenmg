import { lazy, useRef, type LazyExoticComponent, type ComponentType } from 'react'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { gsap, useGsapContext } from '../hooks/useGsap'
import { site } from '../data/site'
import { AnimatedText } from '../components/text/AnimatedText'
import { MagneticButton } from '../components/ui/MagneticButton'
import { LazyCanvas } from '../three/LazyCanvas'
import { reducedMotion } from '../utils/motion'

function lazyScene(
  load: () => Promise<{ default: ComponentType<any> }>
): LazyExoticComponent<ComponentType<any>> {
  return lazy(load)
}

const MavenNetwork = reducedMotion ? null : lazyScene(() => import('../three/MavenNetwork'))

export function Hero({ onNavigate }: { onNavigate: (href: string) => void }) {
  const rootRef = useRef<HTMLElement>(null)

  // Scroll exit: content drifts up and dissolves as the hero leaves.
  useGsapContext(
    rootRef,
    () => {
      gsap.to('[data-hero-content]', {
        yPercent: -18,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom 35%', scrub: 0.5 },
      })
      gsap.to('[data-hero-canvas]', {
        yPercent: 12,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: { trigger: rootRef.current, start: 'top top', end: 'bottom top', scrub: 0.5 },
      })
    },
    []
  )

  return (
    <section ref={rootRef} className="relative min-h-svh flex flex-col overflow-hidden" aria-label="Introduction">
      {/* WebGL orbital ring system */}
      <div data-hero-canvas className="absolute inset-0 will-change-transform">
        <LazyCanvas
          Scene={MavenNetwork}
          sceneProps={{ showCore: false }}
          className="absolute inset-0"
          fallback={<HeroFallback />}
        />
        {/* Readability gradients over the canvas */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,transparent_0%,var(--scrim)_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-void" />
      </div>

      {/* Content */}
      <div
        data-hero-content
        className="relative z-10 flex-1 flex items-center container-maven w-full px-6 md:px-10 pt-28 pb-20"
      >
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <span className="mono-label !text-mist">{site.tagline}</span>
          </div>

          <h1 className="display text-[clamp(2.7rem,8.2vw,6.8rem)] text-white">
            <AnimatedText trigger="load" mode="words" stagger={0.09} duration={1.1}>
              {site.headline[0]}
            </AnimatedText>
            <span className="block mt-1">
              <AnimatedText trigger="load" mode="words" stagger={0.09} delay={0.35} duration={1.1} gradient blur>
                {site.headline[1]}
              </AnimatedText>
            </span>
          </h1>

          <p className="mt-8 text-mist text-base md:text-lg leading-relaxed max-w-xl">
            {site.subhead}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton variant="primary" onClick={() => onNavigate('/contact')}>
              Start Your Project
              <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => onNavigate('/work')}>
              View Our Work
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 pb-8 flex justify-center">
        <div className="flex flex-col items-center gap-2 text-mist-dim">
          <span className="mono-label !text-[10px]">Scroll</span>
          <ArrowDown size={14} className="animate-bounce" aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}

/** CSS-only ambient fallback for low-power devices. */
function HeroFallback() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <div className="absolute top-1/4 right-[10%] w-[520px] h-[520px] rounded-full bg-maven/20 blur-[140px]" />
      <div className="absolute bottom-0 left-[5%] w-[420px] h-[420px] rounded-full bg-maven-light/12 blur-[130px]" />
    </div>
  )
}
