export type ThemeName = 'dark' | 'light'

/** User preference 'system' (default) resolves live against the OS. */
export type ThemePreference = 'system' | 'light' | 'dark'

export const THEME_KEY = 'maven-theme'

/** Module-level theme state readable inside R3F useFrame without re-render.
 *  App syncs it from data-theme on mount; scenes get notified via THEME_EVENT. */
export const themeState: { name: ThemeName } = { name: 'dark' }

export const THEME_EVENT = 'maven-theme'

/** Resolve the OS preference at this moment. */
export function systemTheme(): ThemeName {
  if (typeof window === 'undefined' || !window.matchMedia) return 'dark'
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

/** Read the persisted user preference, or null when never set. */
export function storedPreference(): ThemePreference | null {
  if (typeof window === 'undefined') return null
  try {
    const s = localStorage.getItem(THEME_KEY)
    if (s === 'system' || s === 'light' || s === 'dark') return s
  } catch {
    /* private mode */
  }
  return null
}

/** Map a preference (or absence) to a concrete theme. */
export function resolveTheme(pref: ThemePreference | null): ThemeName {
  return pref === 'light' || pref === 'dark' ? pref : systemTheme()
}

/** Apply + persist a resolved theme, then broadcast so WebGL scenes can retint. */
export function applyTheme(name: ThemeName, persist = true) {
  themeState.name = name
  if (typeof document !== 'undefined') {
    const root = document.documentElement
    // The pre-paint script already set data-theme, so only a genuine change
    // needs the swap frames. A no-op call (mount sync) must not mute entrance
    // transitions that start in the same tick.
    const swap = Boolean(root.dataset.theme) && root.dataset.theme !== name
    if (swap) root.classList.add('theme-switching')
    root.dataset.theme = name
    const meta = document.querySelector('meta[name="theme-color"]')
    meta?.setAttribute('content', name === 'light' ? '#f5f3fa' : '#150c1f')
    if (swap) {
      // Two frames: one to commit data-theme, one to paint with the new vars
      // while transitions are still suppressed.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => root.classList.remove('theme-switching'))
      )
    }
  }
  if (persist) {
    try {
      localStorage.setItem(THEME_KEY, name)
    } catch {
      /* private mode */
    }
  }
  window.dispatchEvent(new Event(THEME_EVENT))
}

/** Store a user preference ('system' | 'light' | 'dark') and apply it now. */
export function setPreference(pref: ThemePreference) {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(THEME_KEY, pref)
    } catch {
      /* private mode */
    }
  }
  applyTheme(resolveTheme(pref), false)
}

/** Read the initial concrete theme (pre-paint script may have set data-theme). */
export function initialTheme(): ThemeName {
  if (typeof document === 'undefined') return 'dark'
  const pref = storedPreference()
  if (pref === 'light' || pref === 'dark') return pref
  if (document.documentElement.dataset.theme === 'light') return 'light'
  if (document.documentElement.dataset.theme === 'dark') return 'dark'
  return 'dark'
}

/** Subscribe to runtime theme changes (returns unsubscribe). */
export function onThemeChange(cb: (name: ThemeName) => void): () => void {
  const handler = () => cb(themeState.name)
  window.addEventListener(THEME_EVENT, handler)
  return () => window.removeEventListener(THEME_EVENT, handler)
}