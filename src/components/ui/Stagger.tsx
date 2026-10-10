import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { EASE_OUT, VIEWPORT_ONCE } from '../../lib/motion'

interface StaggerProps {
  children: ReactNode
  gap?: number
  stagger?: number
  childY?: number
  className?: string
}

export function Stagger({ children, stagger = 0.07, childY = 24, className }: StaggerProps) {
  const reducedMotion = usePrefersReducedMotion()

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: VIEWPORT_ONCE.margin }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reducedMotion ? 0 : stagger } },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: reducedMotion ? 0 : childY },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: reducedMotion ? 0.2 : 0.64, ease: EASE_OUT },
                },
              }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}
