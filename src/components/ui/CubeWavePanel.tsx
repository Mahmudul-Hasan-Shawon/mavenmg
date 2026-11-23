import { lazy, Suspense } from 'react'
import { cn } from '../../utils/cn'
import { reducedMotion } from '../../utils/motion'
import { ErrorBoundary } from './ErrorBoundary'

/**
 * Live PODIE / Threecn CubeWave. The component itself holds its WebGL canvas
 * until it is near the viewport; this layer only code-splits the three.js
 * import and keeps a reduced-motion-safe wave speed.
 */
const CubeWave = lazy(() =>
  import('../podie/threecn--cube-wave/author/0/cube-wave').then((module) => ({
    default: module.CubeWave,
  })),
)

export function CubeWavePanel({ className }: { className?: string }) {
  return (
    <div data-card-theme="dark" aria-hidden="true" className={cn('cube-wave-panel', className)}>
      <ErrorBoundary>
        <Suspense fallback={null}>
          {/* Original animation and drag-to-orbit are preserved; reduced
              motion only freezes the radial wave itself. */}
          <CubeWave
            grid={12}
            gap={0.62}
            speed={reducedMotion ? 0 : 1}
            theme="dark"
            environment="night"
            lazy={false}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
