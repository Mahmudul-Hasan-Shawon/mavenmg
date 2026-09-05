import { partners } from '../data/site'
import { Reveal } from '../components/ui/Reveal'

/** Partner strip — fine editorial ticker with hairline borders. */
export function Partners() {
  return (
    <div>
      <div className="container-maven px-6 md:px-10 pb-10">
        <Reveal>
          <p className="mono-label text-center">Trusted by startups, creatives, and suits alike</p>
        </Reveal>
      </div>
      <section className="pt-12 pb-12 border-y border-line" aria-label="Partners">
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-[22rem] bg-gradient-to-r from-void to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-[22rem] bg-gradient-to-l from-void to-transparent z-10" />
          <div className="marquee-track flex items-center w-max">
            {[...partners, ...partners].map((p, i) => (
              <div key={i} className="flex items-center pr-44">
                <img src={p.src} alt={p.alt} loading="lazy" style={{ maxHeight: '65px', maxWidth: '110px', objectFit: 'contain' }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
