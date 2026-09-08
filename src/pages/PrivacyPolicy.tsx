import { privacyPolicy } from '../data/legal'
import { PageHero } from '../sections/PageHero'
import { LegalContent } from '../components/ui/LegalContent'
import { FinalCTA } from '../sections/FinalCTA'

export default function PrivacyPolicy({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <>
      <PageHero id={privacyPolicy.id} eyebrow={privacyPolicy.eyebrow} title={privacyPolicy.title} lede={privacyPolicy.lede} />

      <LegalContent page={privacyPolicy} />

      <FinalCTA onNavigate={onNavigate} />
    </>
  )
}