import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { applyTheme, initialTheme, type ThemeName } from '../../utils/theme'

/** Sun/moon toggle persisted to localStorage; follows OS preference initially. */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<ThemeName>(() => initialTheme())

  useEffect(() => {
    // Sync module state + dataset with whatever the pre-paint script decided.
    applyTheme(theme, false)

    // Follow the OS theme live — but only while the user hasn't made a
    // manual choice; a stored preference always wins.
    const mq = window.matchMedia?.('(prefers-color-scheme: light)')
    if (!mq?.addEventListener) return
    const onChange = (e: MediaQueryListEvent) => {
      let stored: string | null = null
      try {
        stored = localStorage.getItem('maven-theme')
      } catch {
        /* private mode */
      }
      if (stored === 'light' || stored === 'dark') return
      const next: ThemeName = e.matches ? 'light' : 'dark'
      setTheme(next)
      applyTheme(next, false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const toggle = () => {
    const next: ThemeName = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    applyTheme(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className={`relative w-11 h-11 flex items-center justify-center rounded-full border border-line bg-ink/60 backdrop-blur-md hover:border-maven-light/50 transition-colors cursor-pointer ${className}`}
    >
      <span className="relative w-[18px] h-[18px]">
        <Sun
          size={18}
          aria-hidden="true"
          className={`absolute inset-0 transition-all duration-500 ${
            theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'
          }`}
        />
        <Moon
          size={18}
          aria-hidden="true"
          className={`absolute inset-0 transition-all duration-500 ${
            theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
          }`}
        />
      </span>
    </button>
  )
}
