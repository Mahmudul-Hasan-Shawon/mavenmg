import { Fragment, useState } from 'react'
import { Star, Quote } from 'lucide-react'
import { testimonials } from '../data/testimonials'
import { Eyebrow } from '../components/text/Eyebrow'
import { Reveal } from '../components/ui/Reveal'

/**
 * Client words a scrolling marquee of review cards with star ratings,
 * seeded just above the footer. Uses the real Maven testimonials and their
 * photos. The track duplicates its content so the translateX(-50%) keyframe
 * loops seamlessly.
 */
export function ClientWords() {
  const doubled = [...testimonials, ...testimonials]

  return (
    <section
      id="client-words"
      className="section py-28 md:py-36 border-t border-line relative overflow-hidden"
      aria-label="Client words"
    >
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-24 right-1/4 w-[500px] h-[360px] rounded-full bg-maven/8 blur-[150px]" />
        <div className="absolute top-0 left-1/4 w-[420px] h-[300px] rounded-full bg-maven-light/8 blur-[140px]" />
      </div>

      <div className="container-maven relative mb-14 md:mb-16">
        <Eyebrow label="Client words" align="center" />
      </div>

      <Reveal className="[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
        <div className="cw-track marquee-track flex gap-5 w-max py-2">
          {doubled.map((word, i) => (
            <Fragment key={`${word.name}-${i}`}>
              <article className="cw-card panel rounded-2xl p-6 w-[19rem] sm:w-[22rem] shrink-0 flex flex-col relative overflow-hidden">
<Quote
                  size={56}
                  strokeWidth={1}
                  aria-hidden="true"
                  className="cw-wm absolute -top-[-2px] -left-[-20px] text-maven-lighter/10 pointer-events-none select-none"
                />
                <div className="stars flex gap-1 mb-5 relative justify-end" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }, (_, s) => (
                    <Star
                      key={s}
                      size={15}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="text-maven-light fill-maven-light"
                    />
                  ))}
                </div>
                <blockquote className="flex-1 font-dm text-[0.95rem] leading-[1.65] text-mist relative">
                  “{word.quote}”
                </blockquote>
                <figcaption className="mt-6 pt-6 border-t border-line flex items-center gap-3 relative">
                  <Avatar name={word.name} image={word.image} />
                  <span className="text-left">
                    <span className="block text-white font-medium text-sm">{word.name}</span>
                    <span className="block text-mist-dim text-xs mt-0.5">
                      {word.role}
                      {word.company ? `, ${word.company}` : ''}
                    </span>
                  </span>
                </figcaption>
              </article>
            </Fragment>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

/** Client avatar shows the photo, falls back to initials if it fails to load. */
function Avatar({ name, image }: { name: string; image?: string }) {
  const [failed, setFailed] = useState(false)

  if (!image || failed) {
    return (
      <span
        aria-hidden="true"
        className="cw-av w-11 h-11 rounded-full bg-gradient-to-br from-maven to-maven-light flex items-center justify-center font-sora font-bold text-xs text-white-solid ring-1 ring-maven-light/40 shrink-0"
      >
        {initialsOf(name)}
      </span>
    )
  }

  return (
    <img
      src={image}
      alt={name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="cw-av w-11 h-11 rounded-full object-contain p-1.5 bg-white-solid ring-1 ring-maven-light/40 shrink-0"
    />
  )
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}
