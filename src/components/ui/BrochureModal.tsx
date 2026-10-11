import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, FileText, ArrowUpRight, MapPin, Calendar, Shield } from 'lucide-react'
import { EVENT } from '../../data/event'
import { Button } from './Button'
import { triggerGoogleConfetti } from '../../lib/confetti'
import { useScrollApi } from '../layout/SmoothScrollProvider'

interface BrochureModalProps {
  isOpen: boolean
  onClose: () => void
}

export function BrochureModal({ isOpen, onClose }: BrochureModalProps) {
  const scrollApi = useScrollApi()
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
          aria-hidden="true"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative z-10 w-full max-w-xl rounded-2xl border border-border bg-bg-elev p-6 sm:p-8 shadow-2xl overflow-hidden my-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="brochure-modal-title"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute right-5 top-5 rounded-full p-2 text-txt-3 transition-colors hover:bg-surface hover:text-txt"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-google-blue/20 bg-google-blue/10 px-3 py-1 font-mono text-xs font-semibold text-google-blue">
              <FileText size={14} />
              OFFICIAL EVENT PACKET
            </span>
          </div>

          <h2 id="brochure-modal-title" className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-txt">
            {EVENT.name} Guide &amp; Rules
          </h2>

          <p className="mt-2 text-body-sm text-txt-2">
            Access the official hackathon brochure, rulebook documentation, and event schedule.
          </p>

          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
              <Calendar size={20} className="mt-0.5 text-google-blue shrink-0" />
              <div>
                <div className="font-display text-sm font-bold text-txt">Dates &amp; Duration</div>
                <div className="text-xs text-txt-2">{EVENT.dateRangeLabel} · 36 Continuous Hours</div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
              <MapPin size={20} className="mt-0.5 text-google-red shrink-0" />
              <div>
                <div className="font-display text-sm font-bold text-txt">Venue</div>
                <div className="text-xs text-txt-2">{EVENT.venueFull}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4">
              <Shield size={20} className="mt-0.5 text-google-green shrink-0" />
              <div>
                <div className="font-display text-sm font-bold text-txt">Perks &amp; Support</div>
                <div className="text-xs text-txt-2">100% Free Food, Overnight Stay, ₹1,00,000+ Prizes, and Google Swag</div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button
              onClick={() => {
                onClose()
                triggerGoogleConfetti()
                window.open(EVENT.registrationUrl, '_blank', 'noopener,noreferrer')
              }}
              variant="primary"
              size="md"
              icon={ArrowUpRight}
              className="flex-1 font-bold"
            >
              Register Now
            </Button>
            <Button
              onClick={() => {
                onClose()
                setTimeout(() => {
                  scrollApi.scrollTo('#rules', { offset: -88 })
                }, 80)
              }}
              variant="secondary"
              size="md"
              icon={ArrowUpRight}
              className="flex-1 font-semibold"
            >
              Explore Full Guide
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
