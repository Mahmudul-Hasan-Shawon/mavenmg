import { Hero } from '../sections/Hero'
import { Partners } from '../sections/Partners'
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
      <Partners />
      <Services onNavigate={onNavigate} />
      <Results />
      <ClientLogos />
      <WhyMaven onNavigate={onNavigate} />
      <FeaturedWork onNavigate={onNavigate} />
      <Testimonials />
      <Philosophy />
      <FinalCTA onNavigate={onNavigate} />
    </>
  )
}
