import { Check } from 'lucide-react'
import { services, packages } from '../data/services'
import { PageHero } from '../sections/PageHero'
import { FinalCTA } from '../sections/FinalCTA'
import { Reveal } from '../components/ui/Reveal'
import { MagneticButton } from '../components/ui/MagneticButton'

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

      {/* Packages */}
      <section className="section py-24 md:py-32" aria-label="Packages">
        <div className="container-maven">
          <Reveal>
            <div className="flex items-center gap-4 mb-14">
              <span className="index-tag">A</span>
              <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
              <span className="mono-label !text-mist">How we work with you</span>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-line border border-line">
            {packages.map((pkg, i) => (
              <Reveal key={pkg.name} delay={i * 0.08} className="bg-void">
                <div className="p-8 md:p-10 h-full flex flex-col spotlight glow-tl" onPointerMove={spotHandler}>
                  <p className="index-tag mb-6">{String(i + 1).padStart(2, '0')}</p>
                  <h3 className="display text-xl md:text-2xl text-white mb-3">{pkg.name}</h3>
                  <p className="text-mist-dim text-md mb-7">{pkg.blurb}</p>
                  <ul className="space-y-3 mb-10 flex-1">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-md text-mist">
                        <span className="w-4 h-4 rounded-full border border-maven-light/40 flex items-center justify-center shrink-0">
                          <span className="w-1 h-1 rounded-full bg-maven-lighter" />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <MagneticButton variant="ghost" className="w-full !justify-center !bg-[#34164f] !border-[#34164f] hover:!bg-[#3d1a5c] hover:!border-[#3d1a5c]" onClick={() => onNavigate('/contact')}>
                    Get Started
                  </MagneticButton>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCTA onNavigate={onNavigate} />
    </>
  )
}

function spotHandler(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
  el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
}
