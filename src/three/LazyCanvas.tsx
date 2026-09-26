/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, useEffect, useRef, useState, type ReactNode, type LazyExoticComponent, type ComponentType } from 'react'
import { skipWebGL } from '../utils/motion'
import { ErrorBoundary } from '../components/ui/ErrorBoundary'
import { cn } from '../utils/cn'

// Scenes carry their own typed prop shapes; the lazy wrapper stays loose.
type AnyScene = LazyExoticComponent<ComponentType<any>>

interface LazyCanvasProps {
  /** React.lazy(() => import('./SomeScene')) scene must render an R3F <Canvas>. */
  Scene: AnyScene | null
  /** CSS fallback layer, always rendered beneath the canvas. */
  fallback?: ReactNode
  className?: string
  /** Extra props forwarded to the scene component. */
  sceneProps?: Record<string, unknown>
  /** Only initialize when scrolled near the viewport (default true). */
  defer?: boolean
}

/**
 * Mounts an R3F scene only when it matters:
 *  - skipped entirely on low-power devices / prefers-reduced-motion / when no
 *    WebGL context can be created (CSS fallback shows)
 *  - lazy-imported so three.js stays out of the initial bundle
 *  - the render loop pauses whenever the canvas leaves the viewport
 *  - wrapped in an ErrorBoundary so a GL crash degrades to the fallback
 */
export function LazyCanvas({ Scene, fallback, className, sceneProps, defer = true }: LazyCanvasProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(!defer)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (skipWebGL) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) setNear(true)
      },
      { rootMargin: '250px', threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const S = Scene as AnyScene | null

  return (
    <div ref={ref} className={cn('pointer-events-none', className)} aria-hidden="true">
      {fallback}
      {!skipWebGL && near && S && (
        <ErrorBoundary>
          <Suspense fallback={null}>
            <S frameloop={inView ? 'always' : 'never'} {...sceneProps} />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  )
}
