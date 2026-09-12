import { ExternalLink } from 'lucide-react'
import { sitemapGroups, type SitemapGroup, type SitemapLink } from '../data/sitemap'
import { PageHero } from '../sections/PageHero'
import { Reveal } from '../components/ui/Reveal'
import { Eyebrow } from '../components/text/Eyebrow'

/** Groups that get A→Z sorting with letter markers. */
const ALPHA_GROUP_IDS = new Set(['blog', 'industries', 'locations'])

interface LetterGroup {
  letter: string
  links: SitemapLink[]
}

/** Sort links A→Z and cluster them by their leading letter. */
function groupByLetter(links: SitemapLink[]): LetterGroup[] {
  const sorted = [...links].sort((a, b) => a.label.localeCompare(b.label, 'en', { numeric: true }))
  const groups: LetterGroup[] = []
  for (const link of sorted) {
    const first = link.label.trim().charAt(0)
    const letter = /[a-z]/i.test(first) ? first.toUpperCase() : '#'
    const last = groups[groups.length - 1]
    if (last && last.letter === letter) last.links.push(link)
    else groups.push({ letter, links: [link] })
  }
  return groups
}

/** One clickable sitemap row — clean, borderless. */
function SitemapCard({ link }: { link: SitemapLink }) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor
      className="group flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-colors duration-300 hover:bg-maven-lighter/[0.04]"
    >
      <span className="text-sm text-mist group-hover:text-white transition-colors truncate">{link.label}</span>
      <ExternalLink
        size={14}
        className="shrink-0 text-mist-dim/70 group-hover:text-maven-lighter transition-colors"
        aria-hidden="true"
      />
    </a>
  )
}

/** Standard vertical list, one link per line. */
function GroupGrid({ group }: { group: SitemapGroup }) {
  return (
    <div className="space-y-1">
      {group.links.map((link) => (
        <SitemapCard key={link.href} link={link} />
      ))}
    </div>
  )
}

/** A→Z letter columns, side by side; items stacked within each column. */
function AlphabeticalGrid({ group }: { group: SitemapGroup }) {
  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-x-12 gap-y-10 [&>div]:break-inside-avoid">
      {groupByLetter(group.links).map(({ letter, links }) => (
        <div key={letter}>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-9 h-9 shrink-0 grid place-items-center rounded-lg border border-maven-light/40 bg-maven/15 text-sm font-semibold text-maven-lighter">
              {letter}
            </span>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            {links.map((link) => (
              <SitemapCard key={link.href} link={link} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function SitemapPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <>
      <PageHero
        id="sitemap-hero"
        eyebrow="Sitemap"
        title="Everything on"
        accent="Maven, organized"
        lede="Browse every page across the Maven website: services, portfolio, blog and the communities we serve, in one clear, searchable map."
      />

      <section id="sitemap-links" className="section pt-8 md:pt-12 pb-24 md:pb-32" aria-label="Website sitemap">
        <div className="container-maven space-y-14 md:space-y-20">
          {sitemapGroups.map((group, gi) => (
            <Reveal key={group.id} delay={gi * 0.05}>
              <div id={group.id} className="scroll-mt-28">
                <Eyebrow label={group.title} className="mb-3" />
                <p className="text-mist text-sm md:text-base max-w-xl mb-8">{group.description}</p>

                {ALPHA_GROUP_IDS.has(group.id) ? (
                  <AlphabeticalGrid group={group} />
                ) : (
                  <GroupGrid group={group} />
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Quick contact CTA */}
      <section id="sitemap-cta" className="pb-24 md:pb-36" aria-label="Can't find what you need?">
        <div className="container-maven">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-maven/10 px-8 py-14 md:py-20 text-center">
              <div aria-hidden="true" className="absolute -top-24 left-1/2 -translate-x-1/2 w-[480px] h-64 rounded-full bg-maven/25 blur-[120px] pointer-events-none" />
              <div className="relative">
                <h2 className="display font-semibold text-2xl md:text-4xl text-white mb-4">Can&rsquo;t find what you&rsquo;re looking for?</h2>
                <p className="text-mist text-base md:text-lg max-w-xl mx-auto mb-8">
                  If a page you expected isn&rsquo;t listed here, get in touch and we&rsquo;ll point you in the right direction.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('/contact')}
                  data-cursor
                  className="group relative inline-flex items-center justify-center gap-2.5 rounded-full bg-maven text-white-solid px-7 py-3.5 text-[15px] font-medium hover:bg-maven-light border border-maven-light/40 transition-all duration-300"
                >
                  Contact Maven
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}