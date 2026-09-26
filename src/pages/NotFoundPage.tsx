import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PageHero } from '../sections/PageHero'
import { MagneticButton } from '../components/ui/MagneticButton'

/** Rendered for any unknown path — the SPA catch-all no longer silently
 *  serves the homepage at wrong URLs. */
export default function NotFoundPage({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <>
      <PageHero
        id="not-found-hero"
        eyebrow="Error 404"
        title="This page wandered off the map."
        accent="Let's get you back on track."
        lede="The page you're looking for doesn't exist, moved, or never did. Try one of these instead — or browse the sitemap to find what you came for."
        titleHighlight={['wandered']}
        accentHighlight={['back']}
      />

      <section className="pb-24 pt-2 px-6">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center gap-4">
          <MagneticButton variant="primary" size="default" onClick={() => onNavigate('/')}>
            <ArrowLeft size={18} />
            Back to Home
          </MagneticButton>
          <MagneticButton variant="ghost" size="default" onClick={() => onNavigate('/sitemap')}>
            Browse the Sitemap
            <ArrowRight size={18} />
          </MagneticButton>
        </div>
      </section>
    </>
  )
}
