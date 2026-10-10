import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { EASE_OUT, VIEWPORT_ONCE } from '../../lib/motion'

const TAGS = {
  div: motion.div,
  li: motion.li,
  span: motion.span,
  article: motion.article,
} as const

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  once?: boolean
  as?: keyof typeof TAGS
  className?: string
}

export function Reveal({ children, delay = 0, y = 28, once = true, as = 'div', className }: RevealProps) {
  const reducedMotion = usePrefersReducedMotion()
  const Component = TAGS[as]

  if (reducedMotion) {
    return (
      <Component
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, margin: VIEWPORT_ONCE.margin }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </Component>
    )
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: VIEWPORT_ONCE.margin }}
      transition={{ duration: 0.64, ease: EASE_OUT, delay }}
    >
      {children}
    </Component>
  )
}
