import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useMotionValue, useMotionValueEvent } from 'framer-motion'
import { Check, Trophy, Medal, Award, Target } from 'lucide-react'
import { TiltCard } from '../ui/TiltCard'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import type { PodiumPrize, SpecialPrize } from '../../types'

type PrizeCardProps =
  | { variant: 'podium'; prize: PodiumPrize; className?: string }
  | { variant: 'special'; prize: SpecialPrize; className?: string }

function parseCash(cash: string): number {
  const digits = cash.replace(/[^0-9]/g, '')
  return digits ? parseInt(digits, 10) : 0
}

function CountingCash({ cash, className }: { cash: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px -12% 0px' })
  const reducedMotion = usePrefersReducedMotion()
  const target = parseCash(cash)
  const prefix = cash.match(/^[^\d]*/)?.[0] ?? ''
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useMotionValueEvent(motionValue, 'change', (latest) => setDisplay(Math.round(latest)))

  useEffect(() => {
    if (!inView) return
    if (reducedMotion) {
      motionValue.set(target)
      return
    }
    const controls = animate(motionValue, target, { duration: 0.9, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [inView, reducedMotion, target, motionValue])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString('en-IN')}
    </span>
  )
}

const TIER_CONFIG = {
  '1st': {
    glow: 'blue' as const,
    badge: 'bg-google-blue/15 text-google-blue border-google-blue/30',
    cashColor: 'text-google-blue',
    icon: Trophy,
    podiumHeight: 'min-h-[460px]',
    rankLabel: 'CHAMPION',
  },
  '2nd': {
    glow: 'red' as const,
    badge: 'bg-google-red/15 text-google-red border-google-red/30',
    cashColor: 'text-google-red',
    icon: Medal,
    podiumHeight: 'min-h-[410px]',
    rankLabel: '1ST RUNNER UP',
  },
  '3rd': {
    glow: 'yellow' as const,
    badge: 'bg-google-yellow/15 text-google-yellow border-google-yellow/30',
    cashColor: 'text-google-yellow',
    icon: Award,
    podiumHeight: 'min-h-[380px]',
    rankLabel: '2ND RUNNER UP',
  },
}

function PodiumCard({ prize, className }: { prize: PodiumPrize; className?: string }) {
  const config = TIER_CONFIG[prize.tier]
  const Icon = config.icon
  const isFirst = prize.tier === '1st'

  return (
    <TiltCard
      glowColor={config.glow}
      className={`relative flex flex-col justify-between overflow-hidden p-6 sm:p-8 ${config.podiumHeight} ${
        isFirst ? 'border-google-blue/40 shadow-2xl shadow-google-blue/10 bg-surface' : 'bg-surface'
      } ${className ?? ''}`}
    >
      {/* Background rank watermark */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-4 select-none font-display text-stroke-border opacity-20"
        style={{ fontSize: isFirst ? '9rem' : '7.5rem', lineHeight: 1 }}
      >
        {prize.numeral}
      </span>

      {/* Top Banner */}
      <div>
        <div className="flex items-center justify-between">
          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider ${config.badge}`}>
            <Icon size={13} />
            {config.rankLabel}
          </span>
          <span className="font-mono text-xs text-txt-3">TIER {prize.numeral}</span>
        </div>

        <div className="mt-5">
          <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-txt">
            {prize.title}
          </h3>
          <p className="mt-1 font-mono text-xs uppercase tracking-wide text-txt-3">
            {prize.subtitle}
          </p>
        </div>

        {/* Big Animated Cash Prize */}
        <div className="mt-6">
          <CountingCash
            cash={prize.cash}
            className={`block font-mono text-4xl sm:text-5xl font-black tracking-tight ${config.cashColor}`}
          />
          <span className="font-mono text-[11px] uppercase tracking-wider text-txt-3">
            DIRECT CASH PRIZE
          </span>
        </div>
      </div>

      {/* Extras list */}
      <div className="mt-6 border-t border-border pt-4">
        <ul className="space-y-2.5">
          {prize.extras.map((extra) => (
            <li key={extra} className="flex items-start gap-2.5 text-body-sm text-txt-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-google-green" aria-hidden="true" />
              <span className="text-xs sm:text-sm">{extra}</span>
            </li>
          ))}
        </ul>
      </div>
    </TiltCard>
  )
}

function SpecialCard({ prize, className }: { prize: SpecialPrize; className?: string }) {
  return (
    <TiltCard
      glowColor={prize.googleColor}
      className={`flex flex-col justify-between p-5 rounded-2xl ${className ?? ''}`}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-google-blue">
            <Target size={12} />
            SPECIAL CATEGORY
          </span>
          <span className="font-mono text-lg font-bold text-google-green">
            {prize.cash}
          </span>
        </div>

        <h4 className="mt-2 font-display text-lg font-bold text-txt">
          {prize.award}
        </h4>
        <span className="font-mono text-xs text-txt-3">
          {prize.subtitle}
        </span>

        <p className="mt-2.5 text-xs text-txt-2 leading-relaxed">
          {prize.forText}
        </p>
      </div>
    </TiltCard>
  )
}

export function PrizeCard(props: PrizeCardProps) {
  if (props.variant === 'podium') {
    return <PodiumCard prize={props.prize} className={props.className} />
  }
  return <SpecialCard prize={props.prize} className={props.className} />
}
