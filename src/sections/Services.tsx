import { ArrowUpRight } from 'lucide-react'
import { services } from '../data/services'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Reveal } from '../components/ui/Reveal'
import { MagneticButton } from '../components/ui/MagneticButton'

/**
 * ServiceExplorer, Maven's services as image-top cards built on the Work
 * page's card concept: panel shell, image zoom on hover, stroked index
 * number, ink gradient fade, and highlight chips. The card itself never
 * translates on hover, so no seams appear under the image.
 */
export function Services({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <section id="services" className="section py-28 md:py-36" aria-label="Services">
      <div className="container-maven">
        <SectionHeading
          eyebrow="What we do"
          title="Everything your Business"
          accent="needs to win online"
          highlight={['business', 'win']}
          lede="Affordable web design services and digital marketing that fit your business needs, from first design to daily management."
        />

        <div className="grid sm:grid-cols-2 gap-6 mt-14 md:mt-20">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.06}>
              <article className="scroll-blur panel panel-hover group relative block h-full overflow-hidden rounded-2xl shadow-[0_14px_40px_-22px_rgba(97,44,139,0.3)] hover:shadow-[0_28px_70px_-28px_rgba(97,44,139,0.55)] transition-shadow duration-500">
                {/* Image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-[1.2s] ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                  <span
                    className="absolute top-4 left-5 font-poppins font-bold text-4xl text-stroke select-none"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Meta */}
                <div className="p-5 md:p-6">
                  <h3 className="display font-semibold text-xl text-white mb-2 tracking-[0.01em]">{service.title}</h3>
                  <p className="text-mist text-base leading-relaxed mb-5">{service.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.highlights.map((h) => (
                      <span
                        key={h}
                        className="px-3 py-1 rounded-full border border-line text-xs tracking-wide text-mist"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12 flex justify-center">
          <MagneticButton variant="primary" onClick={() => onNavigate('/contact')}>
            Discuss your project <ArrowUpRight size={16} />
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  )
}
