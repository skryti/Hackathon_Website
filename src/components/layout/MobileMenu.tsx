import { useEffect, useRef } from 'react'
import type { KeyboardEvent, MouseEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ArrowUpRight } from 'lucide-react'
import { NAV_ITEMS } from '../../data/nav'
import { EVENT } from '../../data/event'
import { useScrollApi } from './SmoothScrollProvider'
import { Button } from '../ui/Button'
import { GDGLogo } from '../common/GDGLogo'
import { triggerGoogleConfetti } from '../../lib/confetti'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { EASE_OUT } from '../../lib/motion'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

const NAV_LINK_OFFSET = -88

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const scrollApi = useScrollApi()
  const reducedMotion = usePrefersReducedMotion()
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const handler = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  const handleTabTrap = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab' || !panelRef.current) return
    const focusables = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )
    if (focusables.length === 0) return
    const first = focusables[0]
    const last = focusables[focusables.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) onClose()
  }

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault()
    onClose()
    scrollApi.scrollTo(href, { offset: NAV_LINK_OFFSET })
  }

  const handleRegisterClick = () => {
    triggerGoogleConfetti()
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          onKeyDown={handleTabTrap}
          onClick={handleBackdropClick}
          initial={reducedMotion ? { opacity: 0 } : { y: '-100%' }}
          animate={reducedMotion ? { opacity: 1 } : { y: 0 }}
          exit={reducedMotion ? { opacity: 0 } : { y: '-100%' }}
          transition={{ duration: reducedMotion ? 0.2 : 0.38, ease: EASE_OUT }}
          className="fixed inset-0 z-[70] flex flex-col bg-bg lg:hidden overflow-y-auto"
        >
          <div className="flex items-center justify-between px-6 py-5 border-b border-border">
            <GDGLogo compact />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-txt hover:bg-surface transition-colors"
            >
              <X size={20} aria-hidden />
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-between px-6 py-8">
            <ul className="space-y-4">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={(event) => handleLinkClick(event, item.href)}
                    className="block font-display text-2xl font-bold text-txt hover:text-google-blue transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="pt-8 border-t border-border flex flex-col gap-4">
              <Button
                as="a"
                href={EVENT.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleRegisterClick}
                variant="primary"
                size="lg"
                icon={ArrowUpRight}
                shimmer
                className="w-full text-center justify-center"
              >
                Register Now
              </Button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
