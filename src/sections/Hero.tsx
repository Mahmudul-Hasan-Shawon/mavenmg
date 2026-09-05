import { lazy, useRef, type LazyExoticComponent, type ComponentType } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap, useGsapContext } from '../hooks/useGsap'
import { site, badges } from '../data/site'
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
    <section ref={rootRef} id="hero" className="relative min-h-svh flex flex-col overflow-hidden" aria-label="Introduction">
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
        <div className="w-full min-w-0 max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <span className="mono-label !text-mist">{site.tagline}</span>
          </div>

          <h1
            className="text-[clamp(2.5rem,11vw,6.8rem)] text-white"
            style={{ fontFamily: 'var(--font-dm)', fontWeight: 900, letterSpacing: '0.02em', lineHeight: 1.05 }}
          >
            <AnimatedText trigger="load" mode="words" stagger={0.09} duration={1.1}>
              We Build
            </AnimatedText>
            <span className="block mt-1">
              <AnimatedText trigger="load" mode="words" stagger={0.09} delay={0.35} duration={1.1} gradient blur>
                Websites
              </AnimatedText>
            </span>
            <span className="block mt-1">
              <AnimatedText trigger="load" mode="words" stagger={0.09} delay={0.7} duration={1.1}>
                With a Purpose
              </AnimatedText>
            </span>
          </h1>

          <p className="mt-8 mx-auto w-full max-w-xl text-mist text-base md:text-lg leading-relaxed break-words">
            {site.subhead}
          </p>

          {/* Award badges marquee */}
          <div className="relative mt-14 mb-6 -mx-6 md:mx-0 overflow-hidden" aria-hidden="true">
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-void via-void/70 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-void via-void/70 to-transparent z-10" />
            <div className="marquee-track flex items-center w-max" style={{ animationDuration: '28s' }}>
              {[...badges, ...badges].map((b, i) => (
                <div key={i} className="flex items-center justify-center mx-7 h-14 w-20 shrink-0">
                  <img
                    src={b.src}
                    alt=""
                    loading="lazy"
                    className="max-h-full max-w-full object-contain opacity-95"
                    style={{ filter: 'grayscale(1) invert(1) brightness(1.2)' }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
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
