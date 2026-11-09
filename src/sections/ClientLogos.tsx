import { useEffect, useRef } from 'react'
import { gsap } from '../hooks/useGsap'
import { reducedMotion } from '../utils/motion'

/**
 * Selected clients: sits on the theme ground (no white band), inside the
 * standard page container (same width as the Results "Maven impact" card).
 * The grid lives in a rounded panel wearing the impact card's gradient
 * hairline; the panel interior is fully white (one surface, no per-logo
 * boxes) with hairline dividers between cells, so colorful brand marks
 * render true while the section itself stays dark and seamless with the
 * rest of the page.
 * The 24 portfolio clients split into two disjoint pages so the two sets
 * never mix: page one fills the grid with the first 12 clients, page two
 * shows the remaining 12. Every 3 seconds the wall flips to the
 * other page: each cell slides its current logo up and out while the next
 * page's logo slides in from below (0.65s power2.inOut), cells staggered
 * 60ms in two parallel halves — ported from theSTART's logo-block.
 * A centered "Who we work with" heading opens the section.
 * Logos are tight-cropped at build time so they fill their tiles.
 */

const CLIENTS = [
  { file: 'craftsman', name: 'CRAFTSMAN Pressure Washers' },
  { file: 'trulaw', name: 'TruLaw Marketing' },
  { file: 'dewalt', name: 'DeWALT Pressure Washers' },
  { file: 'bolco', name: 'Bolco Construction' },
  { file: 'growth-saloon', name: 'Growth Saloon' },
  { file: 'haq', name: 'HAQ Pickleball' },
  { file: 'springs', name: 'Springs Law Group' },
  { file: 'trulawsuit', name: 'TruLawsuit Info' },
  { file: 'piscitelli', name: 'Piscitelli Law Firm' },
  { file: 'thinkingmats', name: 'Thinking Mats' },
  { file: 'simpson', name: 'Simpson Cleaning' },
  { file: 'pirtano', name: 'Pirtano Construction' },
  { file: 'zoll-kranz', name: 'Zoll & Kranz' },
  { file: 'passion', name: 'Passion Sports Camo' },
  { file: 'torhoerman', name: 'TorHoerman Law' },
  { file: 'nwa', name: 'NWA Car Accident Attorneys' },
  { file: 'lsc', name: 'LSC Development' },
  { file: 'keith', name: 'Keith Law Group' },
  { file: 'ganan', name: 'Ganan & Shapiro' },
  { file: 'firstbenefits', name: 'First Benefits Corporation' },
  { file: 'crx-hd', name: 'CRX Engines' },
  { file: 'cryptocache', name: 'Crypto Cache' },
  { file: 'gxc', name: 'GXC Inc' },
  { file: 'rod-safety-group', name: 'Rod Safety Group' },
]

const CELL_COUNT = 12

/* Two disjoint pages of twelve over the 24-client pool: page one is the
   first 12 clients, page two the remaining 12, so each flip shows a
   wholly different set with no duplicates anywhere. */
const PAGE_ONE = Array.from({ length: CELL_COUNT }, (_, i) => i)
const PAGE_TWO = Array.from({ length: CLIENTS.length - CELL_COUNT }, (_, i) => CELL_COUNT + i)
const PAGES = [PAGE_ONE, PAGE_TWO]

const logoSrc = (file: string) => `/images/clients/${file}.png`

export function ClientLogos() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid || reducedMotion) return

    /* Every cell stacks the whole pool; CSS translates everything except
       the cell's active page-one logo out of sight (see index.css), and
       GSAP mirrors that state inline before the first swap. */
    const slots = Array.from(grid.querySelectorAll<HTMLElement>('[data-logo-cell]')).map((cell, i) => {
      /* Clear any stale inline background (e.g. HMR residue from older
         builds) so cells always sit on the panel's white. */
      cell.style.backgroundColor = ''
      const imgs = Array.from(cell.querySelectorAll<HTMLElement>('[data-logo-img]'))
      /* y: 0 clears whatever offset GSAP parses out of the CSS fallback
         transform on these imgs (see index.css); the flips then drive
         yPercent alone, so a logo at yPercent -300 is truly out of sight. */
      imgs.forEach((img, k) => gsap.set(img, { yPercent: k === PAGE_ONE[i] ? 0 : 300, y: 0 }))
      return { imgs }
    })
    if (!slots.length) return

    const timelines: gsap.core.Timeline[] = []
    let page = 0

    /* Flip the whole wall to the other page: each cell slides its current
       logo out while the next page's logo slides in, halves staggered. */
    const flipTo = (next: number) => {
      const half = Math.ceil(slots.length / 2)
      const tlA = gsap.timeline()
      const tlB = gsap.timeline()
      timelines.push(tlA, tlB)
      slots.forEach((slot, i) => {
        const from = PAGES[page][i]
        const to = PAGES[next][i]
        const swap = () => {
          if (from === to) return
          const tl = gsap.timeline()
          tl.to(slot.imgs[from], { yPercent: -300, duration: 0.65, ease: 'power2.inOut' }).fromTo(
            slot.imgs[to],
            { yPercent: 300 },
            { yPercent: 0, duration: 0.65, ease: 'power2.inOut' },
            '<'
          )
          timelines.push(tl)
        }
        ;(i < half ? tlA : tlB).add(swap, (i % half) * 0.06)
      })
      page = next
    }

    const interval = setInterval(() => flipTo((page + 1) % PAGES.length), 3000)

    return () => {
      clearInterval(interval)
      timelines.forEach((tl) => tl.kill())
      slots.forEach((slot) =>
        slot.imgs.forEach((img) => {
          gsap.set(img, { clearProps: 'transform' })
        })
      )
    }
  }, [])

  return (
    <section className="py-12 md:py-16" aria-label="Selected clients">
      {/* One step wider than container-maven so the wall breathes */}
      <div className="mx-auto max-w-[90rem] px-6 md:px-12">
        <header className="flex flex-col items-center text-center mb-10 md:mb-12">
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
            <span className="mono-label">Who we work with</span>
            <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
          </div>
          <h2 className="display text-[clamp(1.9rem,4.2vw,3.2rem)] text-white mt-5 mb-4">
            Built for businesses ready to grow.
          </h2>
          <p className="max-w-2xl text-base md:text-lg leading-relaxed text-mist">
            From law firms to home service companies, we partner with ambitious businesses to build
            stronger brands, reach more customers, and turn growth into measurable results.
          </p>
        </header>

        {/* Three rows of four on one white surface, in a panel wearing
            the impact card's gradient hairline so the two sit as siblings. */}
        <div className="rounded-3xl p-px bg-maven-light/50">
          <div className="rounded-[calc(1.5rem-1px)] bg-white p-4 sm:p-6 lg:p-8 overflow-hidden">
            <div
              ref={gridRef}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border-t border-l border-[rgba(20,18,24,0.14)]"
            >
              {Array.from({ length: CELL_COUNT }).map((_, i) => (
                <div
                  key={i}
                  data-logo-cell
                  className="relative h-28 sm:h-32 flex items-center justify-center p-7 border-r border-b border-[rgba(20,18,24,0.14)] overflow-hidden"
                >
                  {CLIENTS.map((client, k) => (
                    <img
                      key={client.file}
                      data-logo-img
                      src={logoSrc(client.file)}
                      alt={k === PAGE_ONE[i] ? `${client.name} logo` : ''}
                      aria-hidden={k !== PAGE_ONE[i]}
                      loading="eager"
                      className="absolute inset-0 m-auto max-w-full max-h-24 object-contain"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
