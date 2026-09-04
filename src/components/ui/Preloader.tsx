import { useEffect, useRef, useState } from 'react'
import { gsap } from '../../hooks/useGsap'
import { getLenis } from '../../utils/lenis'

/**
 * Branded preloader — percentage count with a fine progress rule, then the
 * panel wipes upward. Plays once per session.
 */
export function Preloader({ onDone }: { onDone?: () => void }) {
  const [done, setDone] = useState(() => {
    try {
      return sessionStorage.getItem('maven-loaded') === '1'
    } catch {
      return false
    }
  })
  const [count, setCount] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const countRef = useRef({ v: 0 })

  useEffect(() => {
    if (done) return
    document.documentElement.style.overflow = 'hidden'
    getLenis()?.stop()

    const tl = gsap.timeline({
      onComplete: () => {
        try {
          sessionStorage.setItem('maven-loaded', '1')
        } catch {
          /* private mode */
        }
        setDone(true)
        document.documentElement.style.overflow = ''
        getLenis()?.start()
        onDone?.()
      },
    })

    tl.to(countRef.current, {
      v: 100,
      duration: 1.6,
      ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(countRef.current.v)),
    })
    tl.to(rootRef.current, {
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.85,
      ease: 'power4.inOut',
      delay: 0.15,
    })

    return () => {
      tl.kill()
      document.documentElement.style.overflow = ''
      getLenis()?.start()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (done) return null

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 z-[160] bg-void flex flex-col items-center justify-center"
      style={{ clipPath: 'inset(0 0 0% 0)' }}
    >
      <div className="overflow-hidden mb-5">
        <span className="mono-label block !text-mist">Maven Marketing Group</span>
      </div>
      <div className="font-sora text-[clamp(4.5rem,14vw,9rem)] leading-none font-bold tabular-nums grad-text">
        {count}
      </div>
      <div className="mt-8 h-px w-52 bg-line overflow-hidden">
        <div
          className="h-full bg-maven-lighter/80 transition-[width] duration-100 ease-linear"
          style={{ width: `${count}%` }}
        />
      </div>
    </div>
  )
}
