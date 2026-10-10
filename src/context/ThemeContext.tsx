import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'
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

function applyThemeToDocument() {
  const root = document.documentElement
  root.classList.add('dark')
  root.style.colorScheme = 'dark'
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', '#070709')
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme: Theme = 'dusk'

  useEffect(() => {
    applyThemeToDocument()
    try {
      localStorage.setItem(STORAGE_KEY, 'dusk')
    } catch {}
  }, [])

  const setTheme = useCallback((_next: Theme) => {
    // Locked in dark mode
  }, [])

  const toggleTheme = useCallback(() => {
    // Locked in dark mode
  }, [])

  const value = useMemo(
    () => ({ theme, resolved: theme, setTheme, toggleTheme }),
    [],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
