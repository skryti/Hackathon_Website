import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface FlipDigitProps {
  value: number
  digits?: number
  label: string
}

export function FlipDigit({ value, digits = 2, label }: FlipDigitProps) {
  const reducedMotion = usePrefersReducedMotion()
  const display = String(value).padStart(digits, '0')

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative h-[1em] overflow-hidden font-mono text-countdown text-accent">
        {reducedMotion ? (
          <span>{display}</span>
        ) : (
          <AnimatePresence mode="popLayout">
            <motion.span
              key={display}
              className="block"
              initial={{ y: '60%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-60%', opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              {display}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
      <span className="font-mono text-mono-sm uppercase text-txt-3">{label}</span>
    </div>
  )
}
