import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Theme } from '../types'

const STORAGE_KEY = 'halflight-theme'

interface ThemeContextValue {
  theme: Theme
  resolved: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function readStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored === 'dusk' || stored === 'dawn' ? stored : null
  } catch {
    return null
  }
}

function getInitialTheme(): Theme {
  const stored = readStoredTheme()
  if (stored) return stored
  try {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'dawn' : 'dusk'
  } catch {
    return 'dusk'
  }
}

function applyThemeToDocument(theme: Theme) {
  const root = document.documentElement
  root.classList.toggle('dark', theme === 'dusk')
  root.style.colorScheme = theme === 'dusk' ? 'dark' : 'light'
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme === 'dusk' ? '#07070B' : '#FBF7F0')
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    applyThemeToDocument(theme)
  }, [theme])

  useEffect(() => {
    if (readStoredTheme()) return
    const mq = window.matchMedia('(prefers-color-scheme: light)')
    const handler = (e: MediaQueryListEvent) => {
      if (readStoredTheme()) return
      setThemeState(e.matches ? 'dawn' : 'dusk')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const setTheme = useCallback((next: Theme) => {
    const root = document.documentElement
    root.setAttribute('data-theme-transition', '')
    window.setTimeout(() => root.removeAttribute('data-theme-transition'), 420)

    setThemeState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // private browsing / blocked storage — theme still applies for this session
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dusk' ? 'dawn' : 'dusk')
  }, [theme, setTheme])

  const value = useMemo(
    () => ({ theme, resolved: theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
