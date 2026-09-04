import { partners } from '../data/site'
import { Reveal } from '../components/ui/Reveal'

/** Partner strip — fine editorial ticker with hairline borders. */
export function Partners() {
  return (
    <section className="py-16 border-y border-line" aria-label="Partners">
      <div className="container-maven px-6 md:px-10 mb-8">
        <Reveal>
          <p className="mono-label text-center">Trusted by startups, creatives, and suits alike</p>
        </Reveal>
      </div>
      <div className="relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-void to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-void to-transparent z-10" />
        <div className="marquee-track flex items-center gap-20 w-max pr-20">
          {[...partners, ...partners].map((p, i) => (
            <div key={i} className="h-12 flex items-center opacity-45 grayscale hover:opacity-90 hover:grayscale-0 transition-all duration-500">
              <img src={p.src} alt={p.alt} loading="lazy" style={{ maxHeight: '48px', maxWidth: '120px', objectFit: 'contain' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
