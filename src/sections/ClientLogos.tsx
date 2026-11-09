import { useEffect, useRef } from 'react'
import { gsap } from '../hooks/useGsap'
import { reducedMotion } from '../utils/motion'

/**
 * Selected clients: a standalone full-width white section, two rows of six
 * hairline-bordered cells showing real Maven portfolio logos big and clear.
 * The wall cycles through all 23 portfolio clients (mavenmarketinggroup.com
 * /maven-marketing-group-portfolio): every 3 seconds each cell slides its
 * current logo up and out while the next slides in from below (0.65s
 * power2.inOut), cells staggered 60ms in two parallel halves — ported from
 * theSTART's logo-block. The pool step (12 in a pool of 23, coprime) keeps
 * every logo distributed with no duplicates visible until a full lap.
 * Logos are tight-cropped at build time so they fill their cells.
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
]

const CELL_COUNT = 12

const logoSrc = (file: string) => `/images/clients/${file}.png`

export function ClientLogos() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid || reducedMotion) return

    /* Every cell stacks the whole pool (already translated out of sight);
       a swap slides the current one out and the next in — the reference
       engine's structure, so no src swapping ever happens mid-flight. */
    const slots = Array.from(grid.querySelectorAll<HTMLElement>('[data-logo-cell]')).map((cell, i) => {
      /* Clear any stale inline background (e.g. HMR residue from older
         builds) so cells always sit on the section's white. */
      cell.style.backgroundColor = ''
      const imgs = Array.from(cell.querySelectorAll<HTMLElement>('[data-logo-img]'))
      imgs.forEach((img, k) => gsap.set(img, { yPercent: k === i % imgs.length ? 0 : 300 }))
      return { imgs, index: i % imgs.length }
    })
    if (!slots.length) return

    const timelines: gsap.core.Timeline[] = []
    const swapOne = (slot: (typeof slots)[number]) => {
      const cur = slot.index
      const next = (cur + 1) % slot.imgs.length
      const tl = gsap.timeline()
      tl.to(slot.imgs[cur], { yPercent: -300, duration: 0.65, ease: 'power2.inOut' }).fromTo(
        slot.imgs[next],
        { yPercent: 300 },
        { yPercent: 0, duration: 0.65, ease: 'power2.inOut' },
        '<'
      )
      timelines.push(tl)
      slot.index = next
    }

    const interval = setInterval(() => {
      const half = Math.ceil(slots.length / 2)
      const tlA = gsap.timeline()
      const tlB = gsap.timeline()
      timelines.push(tlA, tlB)
      slots.slice(0, half).forEach((slot, i) => tlA.add(() => swapOne(slot), i * 0.06))
      slots.slice(half).forEach((slot, i) => tlB.add(() => swapOne(slot), i * 0.06))
    }, 3000)

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
    <section className="bg-white border-y border-[rgba(20,18,24,0.12)]" aria-label="Selected clients">
      {/* Two rows of six */}
      <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: CELL_COUNT }).map((_, i) => (
          <div
            key={i}
            data-logo-cell
            className="relative h-28 sm:h-32 flex items-center justify-center p-7 border-r border-b border-[rgba(20,18,24,0.12)] overflow-hidden"
          >
            {CLIENTS.map((client, k) => (
              <img
                key={client.file}
                data-logo-img
                src={logoSrc(client.file)}
                alt={k === i % CLIENTS.length ? `${client.name} logo` : ''}
                aria-hidden={k !== i % CLIENTS.length}
                loading="eager"
                className="absolute inset-0 m-auto max-w-full max-h-24 object-contain"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
