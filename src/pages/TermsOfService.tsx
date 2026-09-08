import { termsOfService } from '../data/legal'
import { PageHero } from '../sections/PageHero'
import { LegalContent } from '../components/ui/LegalContent'

export default function TermsOfService({ onNavigate: _onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <>
      <PageHero id={termsOfService.id} eyebrow={termsOfService.eyebrow} title={termsOfService.title} lede={termsOfService.lede} />

      <LegalContent page={termsOfService} />
    </>
  )
}
