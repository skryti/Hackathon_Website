import { createContext, useContext, useMemo } from 'react'
import type { ReactNode } from 'react'
import { useLenis } from '../../hooks/useLenis'

interface ScrollApi {
  scrollTo: (target: string | HTMLElement, options?: { offset?: number }) => void
}

const ScrollContext = createContext<ScrollApi | null>(null)

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenis = useLenis()

  const api = useMemo<ScrollApi>(() => {
    if (lenis) {
      return {
        scrollTo: (target, options) =>
          lenis.scrollTo(target, { offset: options?.offset ?? 0 }),
      }
    }
    return {
      scrollTo: (target) => {
        const el = typeof target === 'string' ? document.querySelector(target) : target
        el?.scrollIntoView({ behavior: 'auto', block: 'start' })
      },
    }
  }, [lenis])

  return <ScrollContext.Provider value={api}>{children}</ScrollContext.Provider>
}

export function useScrollApi(): ScrollApi {
  const ctx = useContext(ScrollContext)
  if (!ctx) throw new Error('useScrollApi must be used within SmoothScrollProvider')
  return ctx
}
