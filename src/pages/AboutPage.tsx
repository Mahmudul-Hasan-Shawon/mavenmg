import { ArrowRight } from 'lucide-react'
import { PageHero } from '../sections/PageHero'
import { Story } from '../sections/Story'
import { AboutStory } from '../sections/AboutStory'
import { MagneticButton } from '../components/ui/MagneticButton'
import { Reveal } from '../components/ui/Reveal'
import { Eyebrow } from '../components/text/Eyebrow'
import { aboutStats, aboutExpect, aboutTestimonial, aboutTeam } from '../data/content'

/**
 * About, mirroring mavenmarketinggroup.com/about: brand hero with actions and
 * stats, Our Story, What We Do, How We Work, a client testimonial, Leadership,
 * and the closing CTA.
 */
export default function AboutPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <>
      <PageHero
        id="about-hero"
        eyebrow="About Maven"
        title="A web agency"
        titleHighlight={['web', 'agency']}
        accent="built to stick around after launch."
        accentHighlight={['stick', 'around']}
        lede="Maven Marketing Group designs, builds and manages websites for businesses across the country, then keeps them fast, secure and bringing in leads. We started in 2019 to bring small businesses into the digital age. That's still the job."
        image="/images/logos/3dlogomaven.png"
        imageAlt="Maven Marketing Group 3D logo"
        logo3d
        style={{
          backgroundColor: 'var(--hero-base)',
          backgroundImage:
            'radial-gradient(ellipse 85% 65% at 50% 0%, var(--hero-glow) 0%, var(--hero-base) 100%)',
        }}
      />

      {/* Hero actions + stats */}
      <section className="bg-[var(--hero-base)] pb-20 md:pb-28" aria-label="Maven highlights">
        <div className="container-maven">
          <Reveal>
            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton variant="primary" onClick={() => onNavigate('/contact')}>
                Start Your Project
                <ArrowRight size={16} />
              </MagneticButton>
              <MagneticButton variant="deepOutline" onClick={() => onNavigate('/work')}>
                View Our Work
                <ArrowRight size={16} />
                </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-14 md:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-line rounded-3xl overflow-hidden border border-line">
              {aboutStats.map((s) => (
                <div key={s.label} className="bg-[var(--hero-base)] px-6 py-10 md:px-8 md:py-12 text-center">
                  <p className="font-dm font-[1000] leading-none tracking-[0.02em] tabular-nums text-[2.2rem] md:text-[2.9rem] lg:text-[3.2rem] text-transparent bg-clip-text bg-[image:var(--grad)]">
                    {s.value}
                  </p>
                  <p className="text-mist text-md mt-4">{s.label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        </section>

      <Story />

      <AboutStory />

      {/* How we work */}
      <section className="section py-24 md:py-32 border-t border-line" aria-label="How we work">
        <div className="container-maven">
          <Reveal>
            <Eyebrow label="How we work" className="mb-8" />
          </Reveal>
          <Reveal>
            <h2 className="display text-[clamp(1.8rem,4.2vw,3.6rem)] text-white max-w-2xl mb-12 md:mb-16">
              What you can <span className="grad-text">expect from us</span>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {aboutExpect.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-white/[0.02] p-7 hover:border-maven-light/40 transition-colors duration-300">
                  <h3 className="display font-semibold tracking-[0.98px] text-lg text-white mb-3">{e.title}</h3>
                  <p className="text-mist text-[15px] leading-relaxed">{e.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="section py-20 md:py-28 bg-[var(--hero-base)] border-t border-line" aria-label="Client testimonial">
        <div className="container-maven">
          <Reveal>
            <figure className="max-w-3xl mx-auto text-center">
              <blockquote className="font-serif italic text-[clamp(1.4rem,3vw,2rem)] leading-normal text-white">
                &ldquo;{aboutTestimonial.quote}&rdquo;
              </blockquote>
              <figcaption className="mono-label mt-6 text-white/90">
                {aboutTestimonial.author}
                <span className="text-mist-dim">, {aboutTestimonial.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Leadership */}
      <section className="section py-24 md:py-32 border-t border-line" aria-label="Leadership">
        <div className="container-maven">
          <Reveal>
            <Eyebrow label="Leadership" className="mb-8" />
          </Reveal>
          <Reveal>
            <h2 className="display text-[clamp(1.8rem,4.2vw,3.6rem)] text-white max-w-2xl mb-12 md:mb-16">
              The people behind <span className="grad-text">Maven</span>
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-5">
            {aboutTeam.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-white/[0.02] p-8 text-center hover:border-maven-light/40 transition-colors duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-maven/15 flex items-center justify-center mx-auto mb-5">
                    <span className="display font-semibold text-lg text-maven-lighter">{m.initials}</span>
                  </div>
                  <h3 className="display font-semibold tracking-[0.98px] text-lg text-white mb-1.5">{m.name}</h3>
                  <p className="text-mist text-md">{m.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section py-24 md:py-32 bg-[var(--hero-base)] border-t border-line" aria-label="Start your project">
        <div className="container-maven text-center">
          <Reveal>
            <h2 className="display text-[clamp(2rem,5vw,4rem)] text-white">
              Let's build <span className="grad-text">what's next.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-5 text-mist text-base md:text-lg leading-relaxed max-w-xl mx-auto">
              Tell us about your project and a Marketing Maven will reach out to talk it through.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <MagneticButton variant="primary" onClick={() => onNavigate('/contact')}>
                Start Your Project
                <ArrowRight size={16} />
              </MagneticButton>
              <MagneticButton variant="deepOutline" onClick={() => onNavigate('/contact')}>
                Contact Us
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
