import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { cn } from '../../utils/cn'
import { tier, webglAvailable } from '../../utils/motion'
import { ErrorBoundary } from './ErrorBoundary'

/** Live PODIE / AI Canvas shader orb, held out of the initial bundle. */
const CuriousAi = lazy(
  () => import('../podie/aicanvas--curious-ai/components-workspace/curious-ai/index'),
)

/**
 * Mounts the installed Curious AI component only when the CTA is near the
 * viewport. The component keeps its own WebGL failure guard; this layer just
 * defers the three.js import and matches the project's Scene fallbacks.
 */
export function CuriousAiOrb({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null)
  const canRender = tier !== 'low' && webglAvailable()
  const [near, setNear] = useState(() => canRender && typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    if (!canRender || typeof IntersectionObserver === 'undefined') return
    const el = hostRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '250px', threshold: 0 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [canRender])

  return (
    <div
      ref={hostRef}
      data-card-theme="dark"
      aria-hidden="true"
      className={cn('curious-ai-orb', className)}
    >
      {canRender && near && (
        <ErrorBoundary>
          <Suspense fallback={null}>
            <CuriousAi />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  )
}
