import { useEffect, useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import {
  applyTheme,
  initialTheme,
  setPreference,
  storedPreference,
  systemTheme,
  type ThemeName,
  type ThemePreference,
} from '../../utils/theme'

const CYCLE: ThemePreference[] = ['system', 'light', 'dark']

const LABELS: Record<ThemePreference, string> = {
  system: 'System theme',
  light: 'Light theme',
  dark: 'Dark theme',
}

/**
 * Sun/system/moon toggle cycling System → Light → Dark. "System" (the
 * default) resolves against the OS and follows live changes; the other two
 * persist an explicit user override that always wins.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const [pref, setPref] = useState<ThemePreference>(() => storedPreference() ?? 'system')
  const [theme, setTheme] = useState<ThemeName>(() => initialTheme())

  useEffect(() => {
    // Sync module state + dataset with whatever the pre-paint script decided.
    applyTheme(initialTheme(), false)

    // Follow OS theme changes live — unless an explicit preference is set.
    const mq = window.matchMedia?.('(prefers-color-scheme: light)')
    if (!mq?.addEventListener) return
    const onChange = () => {
      const stored = storedPreference()
      if (stored === 'light' || stored === 'dark') return
      const next = systemTheme()
      setTheme(next)
      applyTheme(next, false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const cycle = () => {
    const next = CYCLE[(CYCLE.indexOf(pref) + 1) % CYCLE.length]
    setPref(next)
    setTheme(resolve(next))
    setPreference(next)
  }

  return (
    <button
      type="button"
      onClick={cycle}
      data-cursor
      aria-label={`Theme: ${LABELS[pref]}. Switch to ${pref === 'system' ? 'light' : pref === 'light' ? 'dark' : 'system'}`}
      title={`Theme: ${LABELS[pref]}`}
      className={`relative w-11 h-11 flex items-center justify-center rounded-full border border-line bg-ink/60 backdrop-blur-md hover:border-maven-light/50 transition-colors cursor-pointer ${className}`}
    >
      <span className="relative w-[18px] h-[18px]">
        <Monitor
          size={18}
          aria-hidden="true"
          className={`absolute inset-0 transition-all duration-500 ${
            pref === 'system' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'
          }`}
        />
        <Sun
          size={18}
          aria-hidden="true"
          className={`absolute inset-0 transition-all duration-500 ${
            pref !== 'system' && theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
          }`}
        />
        <Moon
          size={18}
          aria-hidden="true"
          className={`absolute inset-0 transition-all duration-500 ${
            pref !== 'system' && theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'
          }`}
        />
      </span>
    </button>
  )
}

function resolve(pref: ThemePreference): ThemeName {
  return pref === 'system' ? systemTheme() : pref
}
