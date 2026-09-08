import { termsOfService } from '../data/legal'
import { PageHero } from '../sections/PageHero'
import { LegalContent } from '../components/ui/LegalContent'
import { FinalCTA } from '../sections/FinalCTA'

export default function TermsOfService({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <>
      <PageHero id={termsOfService.id} eyebrow={termsOfService.eyebrow} title={termsOfService.title} lede={termsOfService.lede} />

      <LegalContent page={termsOfService} />

      <FinalCTA onNavigate={onNavigate} />
    </>
  )
}