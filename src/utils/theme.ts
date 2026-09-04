export type ThemeName = 'dark' | 'light'

/** Module-level theme state — readable inside R3F useFrame without re-render.
 *  App syncs it from data-theme on mount; scenes get notified via THEME_EVENT. */
export const themeState: { name: ThemeName } = { name: 'dark' }

export const THEME_EVENT = 'maven-theme'

/** Apply + persist a theme, then broadcast so WebGL scenes can retint. */
export function applyTheme(name: ThemeName, persist = true) {
  themeState.name = name
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = name
    const meta = document.querySelector('meta[name="theme-color"]')
    meta?.setAttribute('content', name === 'light' ? '#f5f3fa' : '#08060d')
  }
  if (persist) {
    try {
      localStorage.setItem('maven-theme', name)
    } catch {
      /* private mode */
    }
  }
  window.dispatchEvent(new Event(THEME_EVENT))
}

/** Read the initial theme (pre-paint script may have set data-theme). */
export function initialTheme(): ThemeName {
  if (typeof document === 'undefined') return 'dark'
  if (document.documentElement.dataset.theme === 'light') return 'light'
  if (document.documentElement.dataset.theme === 'dark') return 'dark'
  // Fallback when the pre-paint script didn't run (e.g. Tests).
  try {
    const stored = localStorage.getItem('maven-theme')
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    /* private mode */
  }
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

/** Subscribe to runtime theme changes (returns unsubscribe). */
export function onThemeChange(cb: (name: ThemeName) => void): () => void {
  const handler = () => cb(themeState.name)
  window.addEventListener(THEME_EVENT, handler)
  return () => window.removeEventListener(THEME_EVENT, handler)
}
