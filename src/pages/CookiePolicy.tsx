import { cookiePolicy } from '../data/legal'
import { PageHero } from '../sections/PageHero'
import { LegalContent } from '../components/ui/LegalContent'

export default function CookiePolicy({ onNavigate: _onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <>
      <PageHero id={cookiePolicy.id} eyebrow={cookiePolicy.eyebrow} title={cookiePolicy.title} lede={cookiePolicy.lede} />

      <LegalContent page={cookiePolicy} />
    </>
  )
}
