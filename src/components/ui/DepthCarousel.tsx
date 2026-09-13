import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent, type KeyboardEvent, type ReactNode } from 'react'
import gsap from 'gsap'
import './DepthCarousel.css'

export interface DepthCarouselItem {
  image: string
  alt?: string
  /** Optional overlay content rendered inside the card above the tint. */
  content?: ReactNode
}

interface DepthCarouselProps {
  items?: Array<string | DepthCarouselItem>
  cardWidth?: number
  cardHeight?: number
  radius?: number
  tint?: string
  depth?: number
  spread?: number
  tilt?: number
  tiltDirection?: 'left' | 'right'
  perspective?: number
  visibleCards?: number
  falloff?: number
  blur?: number
  duration?: number
  ease?: string
  autoplay?: boolean
  autoplayDelay?: number
  loop?: boolean
  showControls?: boolean
  showIndicators?: boolean
  onChange?: (index: number, item?: DepthCarouselItem) => void
  className?: string
}

const DEFAULT_ITEMS: DepthCarouselItem[] = [
  { image: 'https://picsum.photos/seed/depth1/800/1000', alt: 'Slide 1' },
  { image: 'https://picsum.photos/seed/depth2/800/1000', alt: 'Slide 2' },
  { image: 'https://picsum.photos/seed/depth3/800/1000', alt: 'Slide 3' },
  { image: 'https://picsum.photos/seed/depth4/800/1000', alt: 'Slide 4' },
  { image: 'https://picsum.photos/seed/depth5/800/1000', alt: 'Slide 5' },
  { image: 'https://picsum.photos/seed/depth6/800/1000', alt: 'Slide 6' },
]

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max)
const normalizeItem = (it: string | DepthCarouselItem): DepthCarouselItem =>
  typeof it === 'string' ? { image: it, alt: '' } : it

interface DepthCfg {
  count: number
  depth: number
  spread: number
  tilt: number
  tiltDirection: 'left' | 'right'
  visibleCards: number
  falloff: number
  blur: number
  duration: number
  ease: string
  loop: boolean
  cardWidth: number
  autoplayDelay: number
}

interface DragState {
  x: number
  startPos: number
  lastX: number
  lastT: number
  v: number
  moved: boolean
  id: number
}

export default function DepthCarousel({
  items = DEFAULT_ITEMS,
  cardWidth = 300,
  cardHeight = 380,
  radius = 18,
  tint = '#05060a',
  depth = 220,
  spread = 90,
  tilt = 22,
  tiltDirection = 'right',
  perspective = 1400,
  visibleCards = 4,
  falloff = 0.2,
  blur = 6,
  duration = 700,
  ease = 'power3.out',
  autoplay = false,
  autoplayDelay = 3200,
  loop = true,
  showControls = true,
  showIndicators = true,
  onChange,
  className = '',
}: DepthCarouselProps) {
  const data = useMemo(() => (Array.isArray(items) ? items : []).map(normalizeItem), [items])
  const count = data.length

  const rootRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const overlayRefs = useRef<(HTMLSpanElement | null)[]>([])

  const posRef = useRef(0)
  const focusRef = useRef(0)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const scaleRef = useRef(1)
  const cfgRef = useRef<DepthCfg>({
    count: 0,
    depth: 220,
    spread: 90,
    tilt: 22,
    tiltDirection: 'right',
    visibleCards: 4,
    falloff: 0.2,
    blur: 6,
    duration: 700,
    ease: 'power3.out',
    loop: true,
    cardWidth: 300,
    autoplayDelay: 3200,
  })
  const onChangeRef = useRef(onChange)

  const dragRef = useRef<DragState | null>(null)
  const autoTimerRef = useRef<number | null>(null)
  const reducedRef = useRef(false)
  const coarseRef = useRef(false)
  const filterCacheRef = useRef<string[]>([])

  const [active, setActive] = useState(0)

  useEffect(() => {
    coarseRef.current = typeof window !== 'undefined' ? window.matchMedia('(pointer: coarse)').matches : false
  }, [])

  useEffect(() => {
    onChangeRef.current = onChange
    const isCoarse = coarseRef.current
    cfgRef.current = {
      count,
      depth,
      spread,
      tilt,
      tiltDirection,
      visibleCards: isCoarse ? Math.min(visibleCards, 3) : visibleCards,
      falloff,
      blur: isCoarse ? 0 : blur,
      duration,
      ease,
      loop,
      cardWidth,
      autoplayDelay,
    }
  }, [autoplayDelay, blur, cardWidth, count, depth, duration, ease, falloff, loop, onChange, spread, tilt, tiltDirection, visibleCards])

  const layout = useCallback(
    (pos: number) => {
      const cfg = cfgRef.current
      const n = cfg.count
      if (!n) return
      const dir = cfg.tiltDirection === 'left' ? -1 : 1
      const sc = scaleRef.current

      for (let i = 0; i < n; i++) {
        const el = cardRefs.current[i]
        if (!el) continue

        let d = i - pos
        if (cfg.loop && n > 1) {
          d = ((d % n) + n) % n
          if (d > n / 2) d -= n
        }

        const back = Math.max(0, d)
        const az = Math.abs(d)
        const wrapLimit =
          cfg.loop && n > 1 ? Math.min(n / 2, cfg.visibleCards + 0.5) : cfg.visibleCards + 0.5
        const shown = az <= wrapLimit

        const tz = -cfg.depth * d
        const tx = dir * cfg.spread * d
        const ry = dir * cfg.tilt * clamp(d, 0, 1)

        let opacity: number
        if (d < 0) {
          opacity = Math.max(0, Math.min(1, 1 + d))
        } else if (az >= wrapLimit) {
          opacity = 0
        } else {
          opacity = Math.max(0, Math.min(1, wrapLimit - az))
        }

        const backQ = d < 0 ? 0 : Math.round(back)
        const brightness = Math.max(0.2, 1 - backQ * cfg.falloff)
        const blurPx =
          cfg.blur > 0 ? Math.min(cfg.blur, (backQ / Math.max(1, cfg.visibleCards)) * cfg.blur) : 0
        const zi = Math.round(2000 - d * 20)

        el.style.transform = `translate(-50%, -50%) scale(${sc}) translateX(${tx.toFixed(2)}px) translateZ(${tz.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg)`
        el.style.opacity = opacity.toFixed(3)
        const filterStr = `brightness(${brightness.toFixed(3)}) blur(${blurPx.toFixed(2)}px)`
        if (filterCacheRef.current[i] !== filterStr) {
          filterCacheRef.current[i] = filterStr
          el.style.filter = filterStr
        }
        el.style.zIndex = String(zi)
        el.style.pointerEvents = shown && opacity > 0.05 ? 'auto' : 'none'

        const ov = overlayRefs.current[i]
        if (ov) ov.style.opacity = clamp(back * cfg.falloff * 1.25, 0, 0.86).toFixed(3)
      }
    },
    []
  )

  const notify = useCallback(
    (idx: number) => {
      setActive(idx)
      onChangeRef.current?.(idx, data[idx])
    },
    [data]
  )

  const tweenTo = useCallback(
    (target: number, animate: boolean) => {
      tweenRef.current?.kill()
      const cfg = cfgRef.current
      const proxy = { p: posRef.current }
      const dur = animate && !reducedRef.current ? cfg.duration / 1000 : 0
      tweenRef.current = gsap.to(proxy, {
        p: target,
        duration: dur,
        ease: cfg.ease,
        onUpdate: () => {
          posRef.current = proxy.p
          layout(proxy.p)
        },
        onComplete: () => {
          const n = cfg.count
          if (n > 0) posRef.current = ((posRef.current % n) + n) % n
          layout(posRef.current)
        },
      })
    },
    [layout]
  )

  const setFocus = useCallback(
    (rawIndex: number, animate = true) => {
      const cfg = cfgRef.current
      const n = cfg.count
      if (!n) return
      const idx = cfg.loop ? ((rawIndex % n) + n) % n : clamp(rawIndex, 0, n - 1)
      let delta = idx - posRef.current
      if (cfg.loop && n > 1) {
        delta = ((delta % n) + n) % n
        if (delta > n / 2) delta -= n
      }
      tweenTo(posRef.current + delta, animate)
      if (idx !== focusRef.current) {
        focusRef.current = idx
        notify(idx)
      }
    },
    [tweenTo, notify]
  )

  const navigateBy = useCallback((step: number) => setFocus(focusRef.current + step, true), [setFocus])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ro = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width
      const cfg = cfgRef.current
      const needed = w < 640 ? cfg.cardWidth : cfg.cardWidth + Math.abs(cfg.spread) + 40
      scaleRef.current = clamp(w / needed, 0.5, 1)
      layout(posRef.current)
    })
    ro.observe(root)
    return () => ro.disconnect()
  }, [layout])

  const onPointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    const cfg = cfgRef.current
    if (cfg.count < 2) return
    tweenRef.current?.kill()
    dragRef.current = {
      x: e.clientX,
      startPos: posRef.current,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
      moved: false,
      id: e.pointerId,
    }
  }, [])

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current
      if (!drag) return
      const cfg = cfgRef.current
      const stepPx = Math.max(cfg.cardWidth * 0.55 * scaleRef.current, 40)
      const dx = e.clientX - drag.x
      if (!drag.moved && Math.abs(dx) > 4) {
        drag.moved = true
        rootRef.current?.setPointerCapture(drag.id)
      }
      if (!drag.moved) return
      const now = performance.now()
      const dt = Math.max(now - drag.lastT, 1)
      drag.v = (e.clientX - drag.lastX) / dt
      drag.lastX = e.clientX
      drag.lastT = now
      posRef.current = drag.startPos - dx / stepPx
      layout(posRef.current)
    },
    [layout]
  )

  const onPointerEnd = useCallback(() => {
    const drag = dragRef.current
    if (!drag) return
    dragRef.current = null
    if (!drag.moved) return
    const cfg = cfgRef.current
    const stepPx = Math.max(cfg.cardWidth * 0.55 * scaleRef.current, 40)
    const projected = posRef.current - (drag.v * 180) / stepPx
    setFocus(Math.round(projected), true)
  }, [setFocus])

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        navigateBy(-1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        navigateBy(1)
      }
    },
    [navigateBy]
  )

  const onCardClick = useCallback(
    (index: number) => {
      if (dragRef.current?.moved) return
      setFocus(index, true)
    },
    [setFocus]
  )

  useEffect(() => {
    reducedRef.current =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!autoplay || reducedRef.current || count < 2) return
    const root = rootRef.current
    let hovered = false
    let focused = false
    const stop = () => {
      if (autoTimerRef.current) window.clearInterval(autoTimerRef.current)
      autoTimerRef.current = null
    }
    const start = () => {
      stop()
      autoTimerRef.current = window.setInterval(
        () => {
          if (!hovered && !focused) navigateBy(1)
        },
        Math.max(cfgRef.current.autoplayDelay, 600)
      )
    }
    const onEnter = () => {
      hovered = true
    }
    const onLeave = () => {
      hovered = false
    }
    const onFocusIn = () => {
      focused = true
    }
    const onFocusOut = () => {
      focused = false
    }
    const onInteractStart = () => {
      stop()
    }
    const onInteractEnd = () => {
      start()
    }
    root?.addEventListener('mouseenter', onEnter)
    root?.addEventListener('mouseleave', onLeave)
    root?.addEventListener('focusin', onFocusIn)
    root?.addEventListener('focusout', onFocusOut)
    root?.addEventListener('pointerdown', onInteractStart)
    root?.addEventListener('pointerup', onInteractEnd)
    root?.addEventListener('pointercancel', onInteractEnd)
    start()
    return () => {
      stop()
      root?.removeEventListener('mouseenter', onEnter)
      root?.removeEventListener('mouseleave', onLeave)
      root?.removeEventListener('focusin', onFocusIn)
      root?.removeEventListener('focusout', onFocusOut)
      root?.removeEventListener('pointerdown', onInteractStart)
      root?.removeEventListener('pointerup', onInteractEnd)
      root?.removeEventListener('pointercancel', onInteractEnd)
    }
  }, [autoplay, autoplayDelay, count, navigateBy])

  useEffect(() => {
    layout(posRef.current)
  }, [layout, depth, spread, tilt, tiltDirection, visibleCards, falloff, blur, cardWidth, cardHeight, radius, count])

  useEffect(
    () => () => {
      tweenRef.current?.kill()
      if (autoTimerRef.current) window.clearInterval(autoTimerRef.current)
    },
    []
  )

  return (
    <div
      ref={rootRef}
      className={`depth-carousel ${className}`.trim()}
      style={{ '--dc-perspective': `${perspective}px` } as CSSProperties}
      role="group"
      aria-roledescription="carousel"
      aria-label="Depth carousel"
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onKeyDown={onKeyDown}
    >
      <div className="depth-carousel__stage" ref={stageRef}>
        {data.map((item, i) => (
          <div
            key={i}
            className="depth-carousel__card"
            ref={(el) => {
              cardRefs.current[i] = el
            }}
            style={{ width: cardWidth, height: cardHeight, borderRadius: radius }}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            aria-hidden={active !== i}
            onClick={() => onCardClick(i)}
          >
            {item.content ? (
              <div className="depth-carousel__content">{item.content}</div>
            ) : (
              <>
                <img className="depth-carousel__img" src={item.image} alt={item.alt || ''} draggable={false} />
                <span
                  className="depth-carousel__tint"
                  ref={(el) => {
                    overlayRefs.current[i] = el
                  }}
                  style={{ background: tint }}
                />
              </>
            )}
          </div>
        ))}
      </div>

      {showControls && count > 1 && (
        <>
          <button
            type="button"
            className="depth-carousel__arrow depth-carousel__arrow--prev"
            aria-label="Previous slide"
            onClick={() => navigateBy(-1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M15 5l-7 7 7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="depth-carousel__arrow depth-carousel__arrow--next"
            aria-label="Next slide"
            onClick={() => navigateBy(1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M9 5l7 7-7 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </>
      )}

      {showIndicators && count > 1 && (
        <div className="depth-carousel__dots" role="tablist" aria-label="Slides">
          {data.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Go to slide ${i + 1}`}
              className={`depth-carousel__dot${active === i ? ' is-active' : ''}`}
              onClick={() => setFocus(i, true)}
            />
          ))}
        </div>
      )}
    </div>
  )
}