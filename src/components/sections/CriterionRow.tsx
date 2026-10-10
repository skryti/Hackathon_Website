import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useMotionValue, useMotionValueEvent } from 'framer-motion'
import { WeightBar } from '../ui/WeightBar'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../lib/cn'
import type { JudgingCriterion } from '../../types'

interface CriterionRowProps {
  criterion: JudgingCriterion
  className?: string
}

const COLOR_MAP = {
  blue: 'text-google-blue',
  red: 'text-google-red',
  yellow: 'text-google-yellow',
  green: 'text-google-green',
}

export function CriterionRow({ criterion, className }: CriterionRowProps) {
  const { name, weight, description, color } = criterion
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-12% 0px -12% 0px' })
  const reducedMotion = usePrefersReducedMotion()
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useMotionValueEvent(motionValue, 'change', (latest) => setDisplay(Math.round(latest)))

  useEffect(() => {
    if (!inView) return
    if (reducedMotion) {
      motionValue.set(weight)
      return
    }
    const controls = animate(motionValue, weight, { duration: 0.9, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [inView, reducedMotion, weight, motionValue])

  const colorClass = COLOR_MAP[color] ?? 'text-google-blue'

  return (
    <div
      ref={ref}
      className={cn(
        'grid grid-cols-[1fr,auto] items-baseline gap-x-4 gap-y-3 border-b border-border py-6 transition-colors duration-160 hover:bg-surface-hover/50 rounded-xl px-4',
        className,
      )}
    >
      <div className="flex items-center gap-2.5">
        <span className={`h-2.5 w-2.5 rounded-full ${color === 'blue' ? 'bg-google-blue' : color === 'red' ? 'bg-google-red' : color === 'yellow' ? 'bg-google-yellow' : 'bg-google-green'}`} />
        <p className="font-display text-xl sm:text-2xl font-bold text-txt">{name}</p>
      </div>
      <p className={`whitespace-nowrap font-mono text-3xl sm:text-4xl font-extrabold ${colorClass}`}>
        {display}%
      </p>
      <p className="col-span-2 text-body-sm text-txt-2 leading-relaxed">{description}</p>
      <div className="col-span-2 pt-1">
        <WeightBar weight={weight} />
      </div>
    </div>
  )
}
