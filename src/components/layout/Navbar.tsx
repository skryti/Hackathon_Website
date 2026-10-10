import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { Menu, ArrowUpRight } from 'lucide-react'
import { NAV_ITEMS } from '../../data/nav'
import { EVENT } from '../../data/event'
import { useScrollApi } from './SmoothScrollProvider'
import { ThemeToggle } from './ThemeToggle'
import { MobileMenu } from './MobileMenu'
import { Button } from '../ui/Button'
import { GDGLogo } from '../common/GDGLogo'
import { useActiveSection } from '../../hooks/useActiveSection'
import { triggerGoogleConfetti } from '../../lib/confetti'
import { cn } from '../../lib/cn'
import { EASE_OUT } from '../../lib/motion'

const NAV_LINK_OFFSET = -88

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const scrollApi = useScrollApi()
  const activeId = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    scrollApi.scrollTo(href, { offset: NAV_LINK_OFFSET })
  }

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    scrollApi.scrollTo('#main', { offset: 0 })
  }

  const handleRegisterClick = () => {
    triggerGoogleConfetti()
  }

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300"
        style={{
          backgroundColor: scrolled ? 'var(--glass-fill)' : 'transparent',
          borderBottomColor: scrolled ? 'var(--glass-stroke)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(140%)' : 'none',
        }}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-[clamp(1.25rem,4vw,3.5rem)]"
        >
          <a
            href="#main"
            onClick={handleLogoClick}
            title={`${EVENT.name} · ${EVENT.organizer}`}
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
          >
            <GDGLogo />
            <div className="hidden xl:flex items-center gap-1.5 pl-2 border-l border-border">
              <span className="font-display font-extrabold text-sm tracking-tight grad-google-animated">
                INNOV8-MITS
              </span>
              <span className="rounded bg-google-blue/15 px-1.5 py-0.5 font-mono text-[10px] font-bold text-google-blue">
                '26
              </span>
            </div>
          </a>

          {/* Navigation links with live pill tracker */}
          <ul className="hidden items-center gap-6 lg:flex">
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace('#', '')
              const isActive = id === activeId
              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    className={cn(
                      'relative inline-block px-2 py-1.5 text-body-sm font-medium transition-colors duration-200',
                      isActive ? 'text-google-blue font-semibold' : 'text-txt-2 hover:text-txt',
                    )}
                  >
                    {item.label}
                    {isActive ? (
                      <motion.span
                        layoutId="navPill"
                        className="absolute inset-0 -z-10 rounded-full bg-google-blue/10 border border-google-blue/20"
                        transition={{ duration: 0.28, ease: EASE_OUT }}
                      />
                    ) : null}
                  </a>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              as="a"
              href={EVENT.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleRegisterClick}
              variant="primary"
              size="sm"
              icon={ArrowUpRight}
              shimmer
              className="hidden sm:inline-flex shadow-sm hover:shadow-google-blue/20"
            >
              Register Now
            </Button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-txt lg:hidden transition-colors hover:bg-surface"
            >
              <Menu size={20} aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
