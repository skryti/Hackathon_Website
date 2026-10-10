import { useEffect, useState } from 'react'
import { NAV_ITEMS } from '../data/nav'

/**
 * Tracks which nav-linked section is currently "active" (nearest the
 * vertical centre of the viewport) using an IntersectionObserver over the
 * section ids referenced by NAV_ITEMS hrefs. Drives the Navbar's animated
 * underline (see Navbar.tsx).
 */
export function useActiveSection(): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const ids = NAV_ITEMS.map((item) => item.href.replace('#', ''))
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return activeId
}
