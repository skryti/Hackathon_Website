import { motion } from 'framer-motion'
import { Award, Sparkles, Cloud, Coffee, Users, CheckCircle2 } from 'lucide-react'
import { SectionShell } from '../layout/SectionShell'
import { Reveal } from '../ui/Reveal'
import { Stagger } from '../ui/Stagger'
import { PrizeCard } from './PrizeCard'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { EASE_OUT, VIEWPORT_ONCE } from '../../lib/motion'
import { PODIUM_PRIZES, SPECIAL_PRIZES } from '../../data/prizes'

const PARTICIPANT_PERKS = [
  {
    title: 'Official Certificate',
    desc: 'Official GDGoC Certificate of Participation for every team member.',
    icon: Award,
    border: 'border-google-blue/30',
    bg: 'bg-google-blue/10',
    text: 'text-google-blue',
  },
  {
    title: 'Holographic Swag',
    desc: 'Exclusive HackInnov8 holographic stickers, collectible badges & kit.',
    icon: Sparkles,
    border: 'border-google-yellow/30',
    bg: 'bg-google-yellow/10',
    text: 'text-google-yellow',
  },
  {
    title: 'Google Cloud Perks',
    desc: 'Access to Google Cloud Skills Boost credits, cloud sandbox & API perks.',
    icon: Cloud,
    border: 'border-google-green/30',
    bg: 'bg-google-green/10',
    text: 'text-google-green',
  },
  {
    title: 'Meals & Hospitality',
    desc: 'Complimentary catered meals, refreshments, and snacks for all 36 hours.',
    icon: Coffee,
    border: 'border-google-red/30',
    bg: 'bg-google-red/10',
    text: 'text-google-red',
  },
  {
    title: 'GDG Mentor Network',
    desc: 'Direct 1-on-1 access to Google Developer Experts and tech mentors.',
    icon: Users,
    border: 'border-google-blue/30',
    bg: 'bg-google-blue/10',
    text: 'text-google-blue',
  },
]

export function Prizes() {
  const reducedMotion = usePrefersReducedMotion()
  const first = PODIUM_PRIZES.find((p) => p.tier === '1st')!
  const second = PODIUM_PRIZES.find((p) => p.tier === '2nd')!
  const third = PODIUM_PRIZES.find((p) => p.tier === '3rd')!

  return (
    <SectionShell
      id="prizes"
      index={4}
      eyebrow="THE VICTORY REWARDS"
      heading="₹35,000+ Prize Pool & Perks"
      gradientWords={['Prize', 'Pool', '&', 'Perks']}
      deck="Top winners take home direct cash awards (₹20,000 for 1st Prize, ₹10,000 for 2nd Prize, ₹5,000 for 3rd Prize), official GDG trophies, Google Cloud credits, and exclusive swag hampers."
      band="elevated"
    >
      {/* 3D Podium Layout: 2nd (Silver) — 1st (Gold / Champion, Elevated) — 3rd (Bronze) */}
      <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-3 pt-6">
        {/* 2nd Place (Silver) */}
        <motion.div
          className="order-2 lg:order-1"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: reducedMotion ? 0.2 : 0.6, ease: EASE_OUT, delay: 0.1 }}
        >
          <PrizeCard variant="podium" prize={second} />
        </motion.div>

        {/* 1st Place (Gold / Champion - Elevated) */}
        <motion.div
          className="order-1 lg:order-2 lg:-translate-y-4 lg:scale-[1.04] z-10"
          initial={
            reducedMotion ? { opacity: 0 } : { opacity: 0, y: 32, scale: 0.95 }
          }
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: reducedMotion ? 0.2 : 0.6, ease: EASE_OUT, delay: 0 }}
        >
          <PrizeCard variant="podium" prize={first} />
        </motion.div>

        {/* 3rd Place (Bronze) */}
        <motion.div
          className="order-3"
          initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 32 }}
          whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: reducedMotion ? 0.2 : 0.6, ease: EASE_OUT, delay: 0.2 }}
        >
          <PrizeCard variant="podium" prize={third} />
        </motion.div>
      </div>

      {/* Special Categories Title & Grid */}
      <div className="mt-20">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="font-mono text-xs font-semibold uppercase tracking-widest text-txt-3">
            SPECIAL CATEGORY TRACK AWARDS
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" childY={20}>
          {SPECIAL_PRIZES.map((prize) => (
            <PrizeCard key={prize.award} variant="special" prize={prize} />
          ))}
        </Stagger>
      </div>

      {/* All Participants Receive — Modern Perks Bento Card */}
      <Reveal className="mt-20 max-w-5xl mx-auto w-full" y={20}>
        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-surface/70 p-6 sm:p-8 backdrop-blur-md shadow-lg shadow-black/5 dark:shadow-black/20">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-border/60">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-google-blue animate-pulse" />
              <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-google-blue">
                ALL PARTICIPANTS RECEIVE
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 font-mono text-xs text-txt-3">
              <span className="h-1.5 w-1.5 rounded-full bg-google-green" />
              <span>100% Free · Guaranteed for every accepted hacker</span>
            </div>
          </div>

          {/* 5-Card Modern Perks Bento Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {PARTICIPANT_PERKS.map((perk) => {
              const Icon = perk.icon
              return (
                <div
                  key={perk.title}
                  className="group relative flex flex-col justify-between rounded-2xl border border-border/70 bg-bg-elev/50 p-4 transition-all duration-300 hover:border-border-strong hover:bg-surface hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl border ${perk.border} ${perk.bg} ${perk.text} mb-3.5 transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon size={20} aria-hidden />
                    </div>
                    <h4 className="font-display text-sm font-bold text-gray-900 dark:text-white leading-snug">
                      {perk.title}
                    </h4>
                    <p className="mt-1.5 text-xs text-txt-2 leading-relaxed">
                      {perk.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between font-mono text-[11px]">
                    <span className="inline-flex items-center gap-1 text-google-green font-semibold">
                      <CheckCircle2 size={13} className="text-google-green" />
                      <span>Included</span>
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Reveal>
    </SectionShell>
  )
}
