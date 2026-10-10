import { motion } from 'framer-motion'
import { EASE_OUT, VIEWPORT_ONCE } from '../../lib/motion'

interface WeightBarProps {
  weight: number
}

export function WeightBar({ weight }: WeightBarProps) {
  return (
    <div aria-hidden className="h-[6px] w-full overflow-hidden rounded-full bg-border">
      <motion.div
        className="h-full rounded-full grad-horizon-bg"
        initial={{ width: '0%' }}
        whileInView={{ width: `${weight}%` }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: 0.9, ease: EASE_OUT }}
      />
    </div>
  )
}
