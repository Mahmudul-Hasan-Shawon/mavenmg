import { cn } from '../../utils/cn'
import { Reveal } from './Reveal'
import { AnimatedText } from '../text/AnimatedText'
import { Eyebrow } from '../text/Eyebrow'

interface SectionHeadingProps {
  eyebrow: string
  title: string
  /** Optional highlighted final word(s) rendered with grad-text */
  accent?: string
  /** Words (case-insensitive) in the title to render in solid maven-light */
  highlight?: string[]
  lede?: string
  align?: 'left' | 'center'
  className?: string
}

/** Editorial section header: eyebrow, split heading, lede. */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  highlight,
  lede,
  align = 'left',
  className,
}: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div className={cn('mb-14 md:mb-20', centered && 'text-center', className)}>
      <Reveal>
        <Eyebrow label={eyebrow} align={centered ? 'center' : 'left'} className="mb-7" />
      </Reveal>
      <h2 className="display text-[clamp(2.1rem,5.4vw,4.3rem)] max-w-4xl" style={centered ? { marginInline: 'auto' } : undefined}>
        <AnimatedText mode="words" stagger={0.055} highlight={highlight}>
          {title}
        </AnimatedText>
        {accent && (
          <span className="block">
            <AnimatedText
              mode="words"
              stagger={0.055}
              delay={0.18}
              blur
              gradient={!highlight}
              highlight={highlight}
            >
              {accent}
            </AnimatedText>
          </span>
        )}
      </h2>
      {lede && (
        <Reveal delay={0.15}>
          <p
            className={cn(
              'mt-6 text-mist text-base md:text-lg leading-relaxed max-w-xl',
              centered && 'mx-auto'
            )}
          >
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  )
}
