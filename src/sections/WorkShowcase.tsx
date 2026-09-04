import { useRef } from 'react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'
import { gsap, useGsapContext } from '../hooks/useGsap'
import { useIsMobile } from '../hooks/useDevice'

/**
 * WorkShowcase — Maven's case studies as a pinned horizontal journey on
 * desktop: the viewport pins and the panel track glides sideways while the
 * user scrolls. On mobile it becomes a native snap-scrolling gallery.
 */
export function WorkShowcase({ onNavigate }: { onNavigate: (href: string) => void }) {
  const rootRef = useRef<HTMLElement>(null)
  const mobile = useIsMobile()

  useGsapContext(
    rootRef,
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 768px)', () => {
        const track = rootRef.current?.querySelector<HTMLElement>('[data-track]')
        if (!track) return
        const getAmount = () => Math.max(0, track.scrollWidth - window.innerWidth + 96)
        gsap.to(track, {
          x: () => -getAmount(),
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top top',
            end: () => `+=${getAmount()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      })
    },
    [mobile]
  )

  return (
    <section ref={rootRef} className="relative border-t border-line" aria-label="Featured work">
      {/* Header inside the pinned viewport */}
      <div className="section pt-24 md:pt-28 pb-8 md:pb-10">
        <div className="container-maven flex items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <span className="index-tag">05</span>
              <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
              <span className="mono-label !text-mist">Featured work</span>
            </div>
            <h2 className="display text-[clamp(2rem,5vw,3.8rem)]">
              Websites built with <span className="grad-text">purpose</span>
            </h2>
          </div>
          <p className="hidden md:block mono-label !text-mist-dim max-w-[22ch] text-right">
            {mobile ? 'Swipe to explore' : 'Scroll to explore the work'}
          </p>
        </div>
      </div>

      {mobile ? (
        <div className="overflow-x-auto snap-x snap-mandatory flex gap-4 px-6 pb-14 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {projects.map((p, i) => (
            <Panel key={p.id} project={p} index={i} className="snap-center shrink-0 w-[85vw] max-w-[420px]" />
          ))}
          <EndPanel onNavigate={onNavigate} className="snap-center shrink-0 w-[70vw] max-w-[320px]" />
        </div>
      ) : (
        <div className="h-screen overflow-hidden">
          <div data-track className="flex items-stretch gap-8 pl-10 md:pl-16 pr-24 h-full py-8 w-max">
            {projects.map((p, i) => (
              <Panel key={p.id} project={p} index={i} className="h-full w-[min(72vw,1080px)]" />
            ))}
            <EndPanel onNavigate={onNavigate} className="h-full w-[40vw]" />
          </div>
        </div>
      )}
    </section>
  )
}

function Panel({
  project,
  index,
  className,
}: {
  project: (typeof projects)[number]
  index: number
  className?: string
}) {
  return (
    <article
      data-cursor-label="View"
      className={`panel panel-hover group relative flex flex-col md:flex-row overflow-hidden ${className ?? ''}`}
    >
      {/* Image side */}
      <div className="relative md:w-[58%] h-56 md:h-auto overflow-hidden">
        <img
          src={project.image}
          alt={`${project.name} — ${project.category} website by Maven Marketing Group`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1.2s] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-ink/90 via-transparent to-transparent" />
        <span className="absolute top-4 left-5 font-sora font-bold text-5xl text-stroke select-none" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Text side */}
      <div className="relative flex-1 p-6 md:p-10 flex flex-col justify-center">
        <p className="mono-label mb-4">{project.category}</p>
        <h3 className="display text-2xl md:text-4xl text-white mb-4">{project.name}</h3>
        <p className="text-mist text-sm md:text-[15px] leading-relaxed mb-5 max-w-[38ch]">{project.blurb}</p>
        <p className="text-mist-dim text-xs leading-relaxed max-w-[36ch]">{project.services}</p>
        <span
          aria-hidden="true"
          className="absolute bottom-5 right-5 w-10 h-10 rounded-full border border-line flex items-center justify-center text-maven-lighter opacity-0 group-hover:opacity-100 group-hover:rotate-45 transition-all duration-500"
        >
          <ArrowUpRight size={16} />
        </span>
      </div>

      {/* Accent edge in the project's colour */}
      <span aria-hidden="true" className="absolute top-0 left-0 h-[2px] w-full opacity-60" style={{ background: project.color }} />
    </article>
  )
}

function EndPanel({ onNavigate, className }: { onNavigate: (href: string) => void; className?: string }) {
  return (
    <div className={`flex items-center justify-center ${className ?? ''}`}>
      <button
        type="button"
        onClick={() => onNavigate('/work')}
        data-cursor
        className="group flex flex-col items-center gap-6 cursor-pointer"
      >
        <span className="w-24 h-24 rounded-full border border-maven-light/40 flex items-center justify-center text-maven-lighter group-hover:bg-maven/30 group-hover:border-maven-lighter transition-all duration-500">
          <ArrowRight size={26} className="group-hover:translate-x-1 transition-transform" />
        </span>
        <span className="mono-label !text-mist group-hover:!text-maven-lighter transition-colors">View Our Work</span>
      </button>
    </div>
  )
}
