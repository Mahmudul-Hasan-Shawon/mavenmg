import { Check, Layout, Megaphone, Server } from 'lucide-react'
import { Reveal } from '../components/ui/Reveal'
import { MagneticButton } from '../components/ui/MagneticButton'
import { Eyebrow } from '../components/text/Eyebrow'
import { trackSpotlight } from '../utils/motion'

/**
 * AboutStory — the live-site "About / Services We Offer" story, rebuilt in
 * Maven's editorial design language: a founding-story split with the Chicago
 * skyline, then the three service offerings as flush hairline panels with the
 * signature spotlight + top-left glow treatment.
 */

const offerings = [
  {
    icon: Layout,
    title: 'Web Design Packages',
    description: 'A responsive custom website designed to fit all your business needs.',
    image: '/images/about/webdesign.jpg',
    alt: 'Custom website design by Maven',
    features: ['Responsive on all devices', 'Custom designed', 'E-commerce capabilities'],
  },
  {
    icon: Server,
    title: 'Website Management Services',
    description: 'Your website up and running with a 99.9% up-time guarantee.',
    image: '/images/about/hosting.jpg',
    alt: 'Hosting and maintenance',
    features: ['Website monitoring', 'Website core updates', 'Website plugin updates', 'Routine content updates'],
  },
  {
    icon: Megaphone,
    title: 'Digital Marketing',
    description: 'Freelance digital marketing solutions that fulfill any of your business needs.',
    image: '/images/about/marketing.jpg',
    alt: 'Freelance digital marketing',
    features: ['Logo design', 'Social media marketing', 'Google Ads', 'SEO', 'Lead generation'],
  },
]

export function AboutStory({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <>
      {/* Services we offer — flush hairline panels */}
      <section id="about-services" className="section py-28 md:py-36 border-t border-line relative overflow-hidden" aria-label="Services we offer">
        <div className="container-maven">
          <Reveal>
            <Eyebrow label="Services we offer" className="mb-14 md:mb-20" />
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {offerings.map((o, i) => {
              const Icon = o.icon
              return (
                <Reveal key={o.title} delay={i * 0.08}>
                  <div className="spotlight glow-tl h-full flex flex-col rounded-2xl border border-line bg-void overflow-hidden shadow-[0_24px_60px_-24px_rgba(97,44,139,0.45)] hover:shadow-[0_28px_70px_-28px_rgba(97,44,139,0.55)] transition-shadow duration-500" onPointerMove={trackSpotlight}>
                    <div className="relative overflow-hidden">
                      <img
                        src={o.image}
                        alt={o.alt}
                        className="w-full aspect-[16/10] object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" aria-hidden="true" />
                      <span className="absolute top-5 left-5 w-10 h-10 rounded-full bg-void/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-maven-light">
                        <Icon size={17} aria-hidden="true" />
                      </span>
                    </div>

                    <div className="p-8 md:p-9 flex flex-col flex-1">
                      <h3 className="display font-semibold tracking-[0.98px] text-xl md:text-2xl text-white mb-3">{o.title}</h3>
                      <p className="text-mist-dim text-base leading-relaxed mb-7">{o.description}</p>
                      <ul className="space-y-3 mb-8 mt-auto">
                        {o.features.map((f) => (
                          <li key={f} className="flex items-center gap-3 text-base text-mist">
                            <span className="w-5 h-5 rounded-full bg-maven/25 flex items-center justify-center shrink-0">
                              <Check size={11} className="text-maven-lighter" />
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={0.1}>
            <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6">
              <p className="mono-label !text-mist">Ready to chat?</p>
              <MagneticButton variant="accent" onClick={() => onNavigate('/contact')}>
                Start Your Project
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
