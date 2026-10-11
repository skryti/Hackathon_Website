import { useEffect, useState } from 'react'
import type { MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { Menu, ArrowUpRight, Sparkles } from 'lucide-react'
import { NAV_ITEMS } from '../../data/nav'
import { EVENT } from '../../data/event'
import { useScrollApi } from './SmoothScrollProvider'
import { MobileMenu } from './MobileMenu'
import { GDGLogo } from '../common/GDGLogo'
import { useActiveSection } from '../../hooks/useActiveSection'
import { triggerGoogleConfetti } from '../../lib/confetti'
import { triggerGoogleEasterEgg } from '../../lib/googleEasterEgg'
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
    triggerGoogleEasterEgg(event.currentTarget)
  }

  const handleRegisterClick = () => {
    triggerGoogleConfetti()
  }

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#070709]/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.6)]'
            : 'bg-[#070709]/75 backdrop-blur-xl border-b border-white/[0.05]',
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[72px] max-w-[1360px] items-center justify-between px-4 sm:px-6 lg:px-8"
        >
          {/* Left: Brand Logo & White HackInnov8 Title */}
          <a
            href="#main"
            onClick={handleLogoClick}
            title={`${EVENT.name} · ${EVENT.organizer}`}
            className="group flex items-center gap-3 transition-opacity hover:opacity-90 shrink-0"
          >
            <GDGLogo />
            <div className="hidden sm:flex items-center pl-3 border-l border-white/15">
              <span className="font-display font-bold text-sm tracking-tight text-white whitespace-nowrap">
                HackInnov8
              </span>
            </div>
          </a>

          {/* Center: Clean navigation links with active capsule */}
          <ul className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV_ITEMS.map((item) => {
              const id = item.href.replace('#', '')
              const isActive = id === activeId
              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    onClick={(event) => handleNavClick(event, item.href)}
                    className={cn(
                      'relative inline-flex items-center px-3 py-1.5 text-xs xl:text-sm font-medium whitespace-nowrap transition-colors duration-200 rounded-full',
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-gray-300 hover:text-white hover:bg-white/[0.05]',
                    )}
                  >
                    {item.label}
                    {isActive ? (
                      <motion.span
                        layoutId="navPill"
                        className="absolute inset-0 -z-10 rounded-full bg-google-blue/20 border border-google-blue/40 shadow-[0_0_12px_rgba(66,133,244,0.3)]"
                        transition={{ duration: 0.28, ease: EASE_OUT }}
                      />
                    ) : null}
                  </a>
                </li>
              )
            })}
          </ul>

          {/* Right: CTA & Mobile trigger */}
          <div className="flex items-center shrink-0 gap-2.5 sm:gap-3">
            <a
              href={EVENT.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleRegisterClick}
              className="group relative inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/25 bg-gradient-to-r from-[#4285F4] via-[#6366F1] to-[#EA4335] px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white shadow-[0_0_18px_rgba(66,133,244,0.35)] transition-all duration-200 hover:shadow-[0_0_26px_rgba(234,67,53,0.5)] hover:scale-105 active:scale-95 hover:brightness-110 whitespace-nowrap"
            >
              <Sparkles size={14} className="text-amber-300 animate-pulse shrink-0" />
              <span>Register Now</span>
              <ArrowUpRight size={14} className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 text-white lg:hidden transition-colors hover:bg-white/10"
            >
              <Menu size={18} aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  )
}
