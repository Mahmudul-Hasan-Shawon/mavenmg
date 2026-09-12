import { ArrowRight, Check } from 'lucide-react'
import { services } from '../data/services'
import { PageHero } from '../sections/PageHero'
import { ManagementPlans } from '../sections/ManagementPlans'
import { Reveal } from '../components/ui/Reveal'

/** Maps the legacy service ids in data/services.ts to their detail page slugs. */
const serviceSlug: Record<string, string> = {
  'web-design': 'web-design',
  management: 'website-management',
  seo: 'seo',
  marketing: 'digital-marketing',
}

export default function ServicesPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <>
      <PageHero
        id="services-hero"
        eyebrow="Services"
        title="Digital marketing
services that"
        accent="increase sales"
        lede="Companies all around the world use our freelance digital marketing services to generate leads, land new clients and most importantly increase sales."
        style={{
          backgroundColor: 'var(--hero-base)',
          backgroundImage:
            'radial-gradient(ellipse 85% 65% at 50% 0%, var(--hero-glow) 0%, var(--hero-base) 100%)',
        }}
      />

      {/* Service detail rows */}
      <section id="service-details" className="bg-[var(--hero-base)] section pb-8" aria-label="Service details">
        <div className="container-maven divide-y divide-line border-y border-line">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <article className="grid md:grid-cols-[1fr_1.4fr] gap-6 md:gap-16 py-12 md:py-16">
                <div>
                  <h2 className="display font-semibold text-2xl md:text-3xl text-white mb-5">{s.title}</h2>
                  <div className="flex flex-wrap gap-2">
                    {s.features.map((f) => (
                      <span key={f} className="px-3 py-1 rounded-full border border-line text-[11px] tracking-wide text-mist">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-mist text-base md:text-lg leading-relaxed mb-7">{s.longDescription}</p>
                  <ul className="space-y-3">
                    {s.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-3 text-sm text-white/85">
                        <span className="w-5 h-5 rounded-full bg-maven/25 flex items-center justify-center shrink-0">
                          <Check size={11} className="text-maven-lighter" />
                        </span>
                        {h}
                      </li>
                    ))}
                  </ul>
                  <a
                    data-cursor
                    onClick={() => onNavigate(`/services/${serviceSlug[s.id] ?? s.id}`)}
                    className="group mt-8 inline-flex items-center gap-2.5 text-sm font-medium text-maven-lighter hover:text-white cursor-pointer transition-colors duration-300"
                  >
                    Explore {s.title}
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Website Management Service Plans */}
      <ManagementPlans onNavigate={onNavigate} />
    </>
  )
}
