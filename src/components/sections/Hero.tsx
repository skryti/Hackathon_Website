import { lazy, Suspense, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Sparkles, Calendar, MapPin } from 'lucide-react'
import { Button } from '../ui/Button'
import { Countdown } from '../ui/Countdown'
import { StatStrip } from '../ui/StatStrip'
import { EVENT } from '../../data/event'
import { BrochureModal } from '../ui/BrochureModal'
import { triggerGoogleConfetti } from '../../lib/confetti'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { EASE_OUT } from '../../lib/motion'

const HeroCanvas = lazy(() =>
  import('../three/HeroCanvas').then((mod) => ({ default: mod.HeroCanvas })),
)

const BADGE_TEXT = 'PRESENTED BY GDGoC • MITS-DU GWALIOR'
const SUBTITLE =
  'A 36-Hour National Hackathon to build bold, disruptive real-world solutions. 36 hours of non-stop code, chaos & creation at MITS-DU Gwalior.'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [brochureOpen, setBrochureOpen] = useState(false)
  const reducedMotion = usePrefersReducedMotion()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const { scrollY } = useScroll()

  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const canvasOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2])
  const headlineY = useTransform(scrollYProgress, [0, 1], [0, -40])
  const countdownY = useTransform(scrollYProgress, [0, 1], [0, -15])
  const scrollHintOpacity = useTransform(scrollY, [0, 40], [1, 0])

  const handleRegisterClick = () => {
    triggerGoogleConfetti()
    window.open(EVENT.registrationUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <section
        id="hero"
        ref={sectionRef}
        aria-labelledby="hero-heading"
        className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden pt-20"
      >
        {/* Soft radial backdrop illumination */}
        <div className="grad-dawn-bg pointer-events-none absolute inset-0" aria-hidden />

        {/* 3D Interactive Three.js Background with Google Shapes & Constellation */}
        <motion.div
          className="absolute inset-0"
          style={
            reducedMotion
              ? undefined
              : { scale: canvasScale, opacity: canvasOpacity }
          }
        >
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        </motion.div>

        {/* Backdrop Scrim */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-[5]"
          style={{
            background:
              'radial-gradient(65% 55% at 50% 46%, var(--bg) 0%, color-mix(in srgb, var(--bg) 60%, transparent) 50%, transparent 80%)',
          }}
        />

        <div className="relative z-10 mx-auto flex w-full max-w-[1240px] flex-col items-center px-[clamp(1.25rem,4vw,3.5rem)] py-16 text-center">
          {/* College & Club Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.6 }}
            className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/80 px-4 py-1.5 shadow-sm backdrop-blur-md"
          >
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-google-blue animate-pulse" />
              <span className="h-1.5 w-1.5 rounded-full bg-google-red" />
              <span className="h-1.5 w-1.5 rounded-full bg-google-yellow" />
              <span className="h-1.5 w-1.5 rounded-full bg-google-green" />
            </div>
            <span className="font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-txt-2">
              {BADGE_TEXT}
            </span>
          </motion.div>

          {/* Main Title: HackInnov8 full white in dark mode */}
          <motion.div style={reducedMotion ? undefined : { y: headlineY }} className="mt-6">
            <h1
              id="hero-heading"
              className="font-display text-[clamp(2.75rem,8vw,5.75rem)] font-black tracking-tight leading-[0.96] select-none"
            >
              <span className="block text-gray-900 dark:text-white drop-shadow-sm font-black">
                HackInnov8
              </span>
              <span className="block text-txt-2 text-[clamp(1.5rem,4vw,2.75rem)] font-bold tracking-tight mt-3">
                36 Hours of Code, Chaos &amp; Creation
              </span>
            </h1>

            {/* Highly Visible Event Date & Venue Badges */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-google-blue/40 bg-google-blue/15 px-4 py-1.5 font-mono text-xs sm:text-sm font-bold text-google-blue shadow-md backdrop-blur-sm">
                <Calendar size={15} className="text-google-blue" />
                <span>10 NOVEMBER 2026</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-google-red/40 bg-google-red/15 px-4 py-1.5 font-mono text-xs sm:text-sm font-bold text-google-red shadow-md backdrop-blur-sm">
                <MapPin size={15} className="text-google-red" />
                <span>CONCLAVE CENTRE, MITS GWALIOR</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-google-green/40 bg-google-green/15 px-3.5 py-1.5 font-mono text-xs font-bold text-google-green shadow-sm backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-google-green animate-pulse" />
                <span>36-HOUR SPRINT</span>
              </div>
            </div>
          </motion.div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.6, delay: 0.35, ease: EASE_OUT }}
            className="mt-6 max-w-2xl text-body-lg text-txt-2 leading-relaxed"
          >
            {SUBTITLE}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.5, delay: 0.55, ease: EASE_OUT }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
          >
            <a
              href={EVENT.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleRegisterClick}
              className="group relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-gradient-to-r from-[#4285F4] via-[#6366F1] to-[#EA4335] px-6 sm:px-7 py-3 text-sm sm:text-base font-bold text-white shadow-xl shadow-google-blue/35 transition-all duration-200 hover:shadow-google-blue/60 hover:scale-105 active:scale-95 hover:brightness-110"
            >
              <Sparkles size={16} className="text-amber-300 animate-pulse shrink-0" />
              <span className="tracking-wide">Register Now</span>
              <ArrowUpRight size={16} className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setBrochureOpen(true)}
            >
              View Guide
            </Button>
          </motion.div>

          {/* Live 36-Hour Countdown Clock matching Image 3 directly without outer GlassCard */}
          <motion.div
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.6, delay: 0.7, ease: EASE_OUT }}
            style={reducedMotion ? undefined : { y: countdownY }}
            className="mt-10 w-full max-w-lg"
          >
            <Countdown />
          </motion.div>

          {/* Quick Stats Counter Strip (Sleek Telemetry Cards) */}
          <motion.div
            initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0.2 : 0.6, delay: 0.85, ease: EASE_OUT }}
            className="mt-10 w-full flex justify-center"
          >
            <StatStrip stats={[...EVENT.stats]} />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={reducedMotion ? undefined : { opacity: scrollHintOpacity }}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1, y: [0, -5, 0] }}
            transition={
              reducedMotion
                ? { duration: 0.2, delay: 1.1 }
                : {
                    opacity: { duration: 0.5, delay: 1.1 },
                    y: { duration: 2, delay: 1.1, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' },
                  }
            }
            className="flex flex-col items-center gap-1 font-mono text-[11px] uppercase tracking-wider text-txt-3"
          >
            <span aria-hidden>↓</span>
            <span>SCROLL TO EXPLORE THE 36 HOURS</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Brochure / Discord Dialog Modal */}
      <BrochureModal isOpen={brochureOpen} onClose={() => setBrochureOpen(false)} />
    </>
  )
}
