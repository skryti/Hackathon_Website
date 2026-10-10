import { motion } from 'framer-motion'
import { SectionShell } from '../layout/SectionShell'
import { Reveal } from '../ui/Reveal'
import { Stagger } from '../ui/Stagger'
import { Chip } from '../ui/Chip'
import { PrizeCard } from './PrizeCard'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { EASE_OUT, VIEWPORT_ONCE } from '../../lib/motion'
import { PODIUM_PRIZES, SPECIAL_PRIZES, EVERYONE_GETS } from '../../data/prizes'

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
      heading="₹35,000+ Prize Pool &amp; Perks"
      gradientWords={['Prize', 'Pool', 'Perks']}
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

      {/* All Participants Get */}
      <Reveal className="mt-16 flex flex-wrap items-center justify-center gap-3 text-center rounded-2xl border border-border/80 bg-surface/50 p-6 max-w-4xl mx-auto" y={16}>
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-google-blue">
          ALL PARTICIPANTS RECEIVE:
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2 mt-2 sm:mt-0">
          {EVERYONE_GETS.map((item) => (
            <Chip key={item} tone="neutral">
              {item}
            </Chip>
          ))}
        </div>
      </Reveal>
    </SectionShell>
  )
}
