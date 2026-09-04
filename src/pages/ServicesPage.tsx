import { Check } from 'lucide-react'
import { services } from '../data/services'
import { PageHero } from '../sections/PageHero'
import { ManagementPlans } from '../sections/ManagementPlans'
import { Reveal } from '../components/ui/Reveal'

export default function ServicesPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="Services"
        title="Digital marketing services"
        accent="that increase sales"
        lede="Companies all around the world use our freelance digital marketing services to generate leads, land new clients and — most importantly — increase sales."
      />

      {/* Service detail rows */}
      <section className="section pb-8" aria-label="Service details">
        <div className="container-maven divide-y divide-line border-y border-line">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.05}>
              <article className="grid md:grid-cols-[1fr_1.4fr] gap-6 md:gap-16 py-12 md:py-16">
                <div>
                  <span className="index-tag block mb-4">{s.index}</span>
                  <h2 className="display text-2xl md:text-3xl text-white mb-5">{s.title}</h2>
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
