/**
 * Dominant accent color extraction for project images.
 *
 * Downscales the image to a tiny canvas, buckets the pixels (4 bits per
 * channel) while dropping near-black, near-white and low-saturation pixels,
 * then averages the winning bucket. The average is normalized in HSL space
 * so every accent lands in a vivid, mid-light range that reads on both
 * themes. Results are cached per source; anything that fails (CORS, decode,
 * a grayscale-only image) resolves null so the caller can fall back.
 */

const cache = new Map<string, string>()

function toHex(r: number, g: number, b: number) {
  return `#${[r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')}`
}

function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  if (max === min) return [0, 0, l]
  const d = max - min
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
  let h: number
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
  else if (max === g) h = ((b - r) / d + 2) / 6
  else h = ((r - g) / d + 4) / 6
  return [h, s, l]
}

function hslToHex(h: number, s: number, l: number) {
  const hue2rgb = (p: number, q: number, t: number) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  if (s === 0) return toHex(l * 255, l * 255, l * 255)
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s
  const p = 2 * l - q
  return toHex(hue2rgb(p, q, h + 1 / 3) * 255, hue2rgb(p, q, h) * 255, hue2rgb(p, q, h - 1 / 3) * 255)
}

/** Normalize any brand hex into the same vivid, mid-light accent range the
 *  image sampler produces, so dark fallback brand colors (e.g. #1A1A2E)
 *  stay readable as text and borders on both themes. */
export function normalizeAccentHex(hex: string): string {
  const m = hex.replace('#', '')
  const full = m.length === 3 ? m.split('').map((c) => c + c).join('') : m
  const num = Number.parseInt(full, 16)
  if (Number.isNaN(num)) return hex
  const [h, s, l] = rgbToHsl((num >> 16) & 255, (num >> 8) & 255, num & 255)
  return hslToHex(h, Math.max(s, 0.5), Math.min(0.62, Math.max(0.52, l)))
}

export function dominantImageColor(src: string): Promise<string | null> {
  const cached = cache.get(src)
  if (cached) return Promise.resolve(cached)

  return new Promise((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      try {
        const size = 28
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        if (!ctx) return resolve(null)
        ctx.drawImage(img, 0, 0, size, size)
        const { data } = ctx.getImageData(0, 0, size, size)

        // Quantized color buckets; extremes and grays never vote.
        const buckets = new Map<number, { r: number; g: number; b: number; n: number }>()
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i + 1]
          const b = data[i + 2]
          const lum = (r * 299 + g * 587 + b * 114) / 1000
          if (lum < 30 || lum > 232) continue
          const max = Math.max(r, g, b)
          const min = Math.min(r, g, b)
          if ((max - min) / (max || 1) < 0.14) continue
          const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4)
          const e = buckets.get(key) ?? { r: 0, g: 0, b: 0, n: 0 }
          e.r += r
          e.g += g
          e.b += b
          e.n += 1
          buckets.set(key, e)
        }
        if (buckets.size === 0) return resolve(null)

        let best = { r: 0, g: 0, b: 0, n: 0 }
        let bestN = 0
        buckets.forEach((e) => {
          if (e.n > bestN) {
            best = e
            bestN = e.n
          }
        })

        const [h, s, l] = rgbToHsl(best.r / bestN, best.g / bestN, best.b / bestN)
        const hex = hslToHex(h, Math.max(s, 0.5), Math.min(0.62, Math.max(0.52, l)))
        cache.set(src, hex)
        resolve(hex)
      } catch {
        resolve(null)
      }
    }
    img.onerror = () => resolve(null)
    img.src = src
  })
}
