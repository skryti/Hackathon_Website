import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { cn } from '../../lib/cn'

interface MarqueeProps {
  children: ReactNode
  direction?: 'left' | 'right'
  durationSeconds?: number
  className?: string
}

export function Marquee({ children, direction = 'left', durationSeconds = 40, className }: MarqueeProps) {
  const reducedMotion = usePrefersReducedMotion()

  if (reducedMotion) {
    return (
      <div aria-hidden className={cn('overflow-hidden whitespace-nowrap', className)}>
        {children}
      </div>
    )
  }

  return (
    <div aria-hidden className={cn('group overflow-hidden whitespace-nowrap', className)}>
      <motion.div
        className="inline-flex [animation-play-state:running] group-hover:[animation-play-state:paused]"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: durationSeconds, repeat: Infinity, ease: 'linear' }}
      >
        <span className="inline-flex">{children}</span>
        <span className="inline-flex">{children}</span>
      </motion.div>
    </div>
  )
}
