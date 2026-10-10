import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Code2, Target, CheckCircle2, ArrowRight } from 'lucide-react'
import type { Track } from '../../types'
import { Button } from './Button'
import { triggerGoogleConfetti } from '../../lib/confetti'
import { EVENT } from '../../data/event'

interface TrackModalProps {
  track: Track | null
  onClose: () => void
}

const COLOR_MAP = {
  blue: {
    border: 'border-google-blue/30',
    badge: 'bg-google-blue/10 text-google-blue border-google-blue/20',
    glow: 'from-google-blue/20',
    dot: 'bg-google-blue',
  },
  red: {
    border: 'border-google-red/30',
    badge: 'bg-google-red/10 text-google-red border-google-red/20',
    glow: 'from-google-red/20',
    dot: 'bg-google-red',
  },
  yellow: {
    border: 'border-google-yellow/30',
    badge: 'bg-google-yellow/10 text-google-yellow border-google-yellow/20',
    glow: 'from-google-yellow/20',
    dot: 'bg-google-yellow',
  },
  green: {
    border: 'border-google-green/30',
    badge: 'bg-google-green/10 text-google-green border-google-green/20',
    glow: 'from-google-green/20',
    dot: 'bg-google-green',
  },
}

export function TrackModal({ track, onClose }: TrackModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (track) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [track, onClose])

  if (!track) return null

  const styling = COLOR_MAP[track.googleColor]

  const handleRegisterClick = () => {
    triggerGoogleConfetti()
    window.open(EVENT.registrationUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity"
          aria-hidden="true"
        />

        {/* Modal Dialog Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative z-10 w-full max-w-2xl rounded-2xl border ${styling.border} bg-bg-elev p-6 sm:p-8 shadow-2xl overflow-hidden my-8`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="track-modal-title"
        >
          {/* Top ambient color glow */}
          <div
            className={`pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 bg-gradient-to-b ${styling.glow} to-transparent blur-3xl`}
            aria-hidden="true"
          />

          {/* Close button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute right-5 top-5 rounded-full p-2 text-txt-3 transition-colors hover:bg-surface hover:text-txt"
            aria-label="Close track details"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold tracking-wider text-txt-3 uppercase">
              {track.code}
            </span>
            <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${styling.badge}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${styling.dot}`} />
              {track.tagline}
            </span>
          </div>

          <h2 id="track-modal-title" className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-txt">
            {track.name}
          </h2>

          <p className="mt-2 text-body-sm text-txt-2 leading-relaxed">
            {track.oneLiner}
          </p>

          <div className="my-6 border-t border-border" />

          {/* Problem Statement Hints */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-display text-sm font-bold text-txt">
              <Target size={16} className="text-google-blue" />
              <span>Problem Statement Challenges</span>
            </div>
            <ul className="space-y-2.5 pl-1">
              {track.problemStatements.map((statement, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-body-sm text-txt-2">
                  <CheckCircle2 size={16} className={`mt-0.5 shrink-0 text-google-green`} />
                  <span>{statement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested Tech Stack */}
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 font-display text-sm font-bold text-txt">
              <Code2 size={16} className="text-google-yellow" />
              <span>Recommended Tooling &amp; Google Ecosystem</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {track.suggestedTech.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-border bg-surface px-2.5 py-1 font-mono text-xs text-txt-2"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Evaluation Focus */}
          <div className="mt-6 rounded-xl border border-border/80 bg-surface/50 p-4">
            <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wide text-txt-3">
              <Target size={14} className="text-google-red" />
              Evaluation Benchmark
            </div>
            <p className="mt-1.5 text-xs text-txt-2">
              {track.evaluationFocus}
            </p>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-sm text-txt-2 hover:text-txt transition-colors"
            >
              Back to all tracks
            </button>
            <Button
              onClick={handleRegisterClick}
              variant="primary"
              size="md"
              icon={ArrowRight}
              className="w-full sm:w-auto"
            >
              Register for this track
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
