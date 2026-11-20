import { Hero } from '../sections/Hero'
import { Partners } from '../sections/Partners'
import { GrowWithYou } from '../sections/GrowWithYou'
import { Services } from '../sections/Services'
import { WhyMaven } from '../sections/WhyMaven'
import { Results } from '../sections/Results'
import { ClientLogos } from '../sections/ClientLogos'
import { Philosophy } from '../sections/Philosophy'
import { FeaturedWork } from '../sections/FeaturedWork'
import { Testimonials } from '../sections/Testimonials'
import { FinalCTA } from '../sections/FinalCTA'

/** The full narrative experience Maven's home page. */
export default function Home({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <Results />
      <ClientLogos />
      <Partners />
      <GrowWithYou onNavigate={onNavigate} />
      <Services onNavigate={onNavigate} />
      <WhyMaven onNavigate={onNavigate} />
      <FeaturedWork onNavigate={onNavigate} />
      <Testimonials />
      <Philosophy />
      <FinalCTA onNavigate={onNavigate} />
    </>
  )
}
