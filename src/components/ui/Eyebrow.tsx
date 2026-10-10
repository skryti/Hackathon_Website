import { motion } from 'framer-motion'
import { EASE_OUT } from '../../lib/motion'

interface EyebrowProps {
  index: number
  label: string
}

export function Eyebrow({ index, label }: EyebrowProps) {
  const padded = String(index).padStart(2, '0')

  return (
    <div className="mb-4 flex items-center justify-center gap-3 font-mono text-eyebrow uppercase text-txt-2">
      <motion.span
        aria-hidden
        className="block h-px bg-accent"
        initial={{ width: 0 }}
        whileInView={{ width: 32 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      />
      <span>
        {padded}&nbsp;&mdash;&nbsp;{label}
      </span>
      <motion.span
        aria-hidden
        className="block h-px bg-accent"
        initial={{ width: 0 }}
        whileInView={{ width: 32 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      />
    </div>
  )
}
