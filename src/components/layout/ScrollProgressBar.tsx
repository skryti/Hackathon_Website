import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

/**
 * A 2px fixed bar at the very top of the viewport tracking overall scroll
 * progress, painted with the brand horizon gradient. Purely decorative.
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const smoothed = useSpring(scrollYProgress, { stiffness: 120, damping: 28 })
  const width = useTransform(smoothed, (v) => `${v * 100}%`)

  return (
    <motion.div
      aria-hidden
      className="grad-horizon-bg fixed inset-x-0 top-0 z-[60] h-[2px]"
      style={{ width }}
    />
  )
}
