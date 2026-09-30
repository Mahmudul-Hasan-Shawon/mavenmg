import { Reveal } from '../components/ui/Reveal'
import { Eyebrow } from '../components/text/Eyebrow'

/**
 * Story, the live site's "Our Story" block: founding narrative in the left
 * column with the Chicago skyline in its own column on the right, so the
 * image never affects the text layout. Mirrors mavenmarketinggroup.com/about.
 */
export function Story() {
  return (
    <section id="story" className="section py-24 md:py-32" aria-label="Our story">
      <div className="container-maven">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <Reveal>
              <Eyebrow label="Our story" className="mb-8" />
            </Reveal>

            <Reveal>
              <h2 className="display text-[clamp(1.8rem,4.2vw,3.6rem)] text-white mb-8 md:mb-10">
                From small-business websites to a{' '}
                <span className="grad-text">full-service web team</span>
              </h2>
            </Reveal>

            <div className="space-y-5 text-mist text-base md:text-lg leading-relaxed">
              <Reveal>
                <p>
                  Maven Marketing Group was founded in 2019 on a simple idea:{' '}
                  <span className="text-white">
                    small businesses deserve the same quality of website as the big brands
                  </span>{' '}
                  they compete with.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  Since then we&rsquo;ve grown into a full-service web design and digital marketing agency. We build and
                  run sites for construction firms, manufacturers, e-commerce brands, law firms and security-industry
                  distributors, with clients across the United States.
                </p>
              </Reveal>
              <Reveal>
                <p>
                  Many of our clients stay with us long after launch through our website management plans. We handle the
                  updates, hosting, SEO and content that keep a website working, so they can get back to running their
                  business.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="relative" data-cursor>
            <div
              aria-hidden="true"
              className="absolute -inset-3 bg-gradient-to-br from-maven-lighter/8 to-maven-light/15 blur-2xl"
            />
            <img
              src="/images/about/chicago.jpg"
              alt="Chicago, home of Maven Marketing Group"
              className="relative rounded-3xl w-full aspect-[4/3] object-cover border border-line shadow-[0_32px_80px_-32px_rgba(97,44,139,0.5)]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
