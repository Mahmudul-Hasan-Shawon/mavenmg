import { cn } from '../../utils/cn'

interface EyebrowProps {
  /** Uppercase mono label, e.g. "Our story". */
  label: string
  /** Center the row; otherwise it stays left-aligned. */
  align?: 'left' | 'center'
  className?: string
}

/**
 * Eyebrow row that opens a section: hairline rule + uppercase mono label +
 * hairline rule. The single source for this cluster — compose margins via
 * className (e.g. "mb-8", "mb-14 md:mb-20").
 */
export function Eyebrow({ label, align = 'left', className }: EyebrowProps) {
  return (
    <div className={cn('flex items-center gap-4', align === 'center' && 'justify-center', className)}>
      <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
      <span className="mono-label !text-mist">{label}</span>
      <span className="h-px w-10 bg-maven-light/50" aria-hidden="true" />
    </div>
  )
}
