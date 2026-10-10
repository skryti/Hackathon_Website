import type { Transition, Variants } from 'framer-motion'

export const EASE_OUT = [0.22, 1, 0.36, 1] as const
export const EASE_IN_OUT = [0.4, 0, 0.2, 1] as const

export const DUR = {
  micro: 0.16,
  reveal: 0.64,
  sectionReveal: 0.8,
  theme: 0.42,
  heroIntro: 1.4,
} as const

export const fadeRise = (y = 28, delay = 0): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.reveal, ease: EASE_OUT, delay } as Transition,
  },
})

export const fadeOnly = (delay = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: EASE_OUT, delay } as Transition,
  },
})

export const scaleIn = (from = 0.96, delay = 0): Variants => ({
  hidden: { opacity: 0, scale: from },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DUR.sectionReveal, ease: EASE_OUT, delay } as Transition,
  },
})

export const staggerParent = (stagger = 0.07, delayChildren = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren },
  },
})

export const staggerChild = (y = 24): Variants => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.reveal, ease: EASE_OUT },
  },
})

export const heroLine: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE_OUT },
  },
}

export const VIEWPORT_ONCE = { once: true, margin: '-12% 0px -12% 0px' } as const
