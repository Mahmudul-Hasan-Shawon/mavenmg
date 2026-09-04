import { Hero } from '../sections/Hero'
import { Partners } from '../sections/Partners'
import { Services } from '../sections/Services'
import { WhyMaven } from '../sections/WhyMaven'
import { Results } from '../sections/Results'
import { Philosophy } from '../sections/Philosophy'
import { WorkShowcase } from '../sections/WorkShowcase'
import { Testimonials } from '../sections/Testimonials'
import { MavensTeam } from '../sections/MavensTeam'
import { FinalCTA } from '../sections/FinalCTA'

/** The full narrative experience — Maven's home page. */
export default function Home({ onNavigate }: { onNavigate: (href: string) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <Partners />
      <Services onNavigate={onNavigate} />
      <Results />
      <WhyMaven />
      <Testimonials />
      <Philosophy />
      <WorkShowcase onNavigate={onNavigate} limit={6} />
      <MavensTeam />
      <FinalCTA onNavigate={onNavigate} />
    </>
  )
}
