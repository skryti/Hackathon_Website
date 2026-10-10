import { motion } from 'framer-motion'
import { ArrowUpRight, Clock, Users, ShieldCheck, Gift } from 'lucide-react'
import { Button } from '../ui/Button'
import { Eyebrow } from '../ui/Eyebrow'
import { EVENT } from '../../data/event'
import { triggerGoogleConfetti } from '../../lib/confetti'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { scaleIn } from '../../lib/motion'

const PERKS = [
  {
    icon: Gift,
    title: '100% Free Participation',
    desc: 'Zero registration fee. Fully sponsored by Google Developer Groups.',
  },
  {
    icon: Users,
    title: 'Solo or Full Crews',
    desc: 'Register solo or with a crew of 2–4. Floor team-ups welcome!',
  },
  {
    icon: ShieldCheck,
    title: 'Food, Swag & Overnight Stay',
    desc: 'Free meals, continuous energy drinks, rest zones, and GDG merch.',
  },
]

export function Register() {
  const reducedMotion = usePrefersReducedMotion()

  const handleRegisterClick = () => {
    triggerGoogleConfetti()
    window.open(EVENT.registrationUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <section
      id="register"
      aria-labelledby="register-heading"
      className="relative scroll-mt-[88px] overflow-hidden bg-bg py-24 sm:py-32"
    >
      {/* Top & Bottom Google gradient lines */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-[2px] grad-google-animated" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[2px] grad-google-animated" />

      {/* High-energy background aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            'radial-gradient(70% 60% at 50% 50%, rgba(66, 133, 244, 0.15) 0%, rgba(234, 67, 53, 0.08) 40%, rgba(52, 168, 83, 0.05) 70%, transparent 100%)',
        }}
      />

      {/* Floating 3D geometric shapes background decorations */}
      <motion.div
        animate={reducedMotion ? undefined : { y: [-10, 10, -10], rotate: [0, 90, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-12 top-1/4 h-48 w-48 rounded-3xl border border-google-blue/20 bg-google-blue/5 blur-sm"
        aria-hidden="true"
      />
      <motion.div
        animate={reducedMotion ? undefined : { y: [12, -12, 12], rotate: [0, -90, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -right-12 bottom-1/4 h-56 w-56 rounded-full border border-google-yellow/20 bg-google-yellow/5 blur-sm"
        aria-hidden="true"
      />

      <motion.div
        className="relative mx-auto flex max-w-[880px] flex-col items-center px-[clamp(1.25rem,4vw,3.5rem)] text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
        variants={reducedMotion ? { hidden: { opacity: 0 }, visible: { opacity: 1 } } : scaleIn(0.96)}
      >
        <Eyebrow index={8} label="JOIN THE 36-HOUR CRUCIBLE" />

        {/* Live Registration Closing Alert */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-google-red/30 bg-google-red/10 px-4 py-1.5 font-mono text-xs font-semibold text-google-red shadow-sm animate-pulse">
          <Clock size={14} />
          <span>LIVE ALERT: REGISTRATION CLOSES {EVENT.registrationCloseLabel}</span>
        </div>

        <h2 id="register-heading" className="mt-6 font-display text-display-lg font-extrabold text-txt tracking-tight">
          <span className="block">Ready to Build the Future?</span>
          <span className="block grad-google-animated">Secure Your Spot in INNOV8-MITS.</span>
        </h2>

        <p className="mt-6 max-w-2xl text-body-lg text-txt-2 leading-relaxed">
          Pick your track, assemble your crew of 2–4, and get ready for 36 hours of code, chaos, and creation at MITS-DU Gwalior.
        </p>

        {/* Primary CTA with Confetti Burst */}
        <motion.div
          className="mt-10"
          animate={reducedMotion ? undefined : { scale: [1, 1.03, 1] }}
          transition={
            reducedMotion ? undefined : { duration: 2.5, repeat: Infinity, ease: 'easeInOut' }
          }
        >
          <Button
            onClick={handleRegisterClick}
            variant="primary"
            size="lg"
            icon={ArrowUpRight}
            shimmer
            className="px-8 py-4 text-base shadow-xl shadow-google-blue/30 hover:shadow-google-blue/50 font-bold"
          >
            Register Now
          </Button>
        </motion.div>

        <p className="mt-4 font-mono text-xs uppercase tracking-wider text-txt-3">
          100% FREE PARTICIPATION · FAST TRACK REGISTRATION · ALL COLLEGES WELCOME
        </p>

        {/* Perks Grid */}
        <div className="mt-16 grid w-full grid-cols-1 gap-6 sm:grid-cols-3 text-left">
          {PERKS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col gap-2.5 rounded-2xl border border-border bg-surface/70 p-5 backdrop-blur-sm transition-transform hover:-translate-y-1"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-google-blue/10 text-google-blue">
                <Icon size={20} />
              </div>
              <h4 className="font-display text-base font-bold text-txt">{title}</h4>
              <p className="text-xs text-txt-2 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
