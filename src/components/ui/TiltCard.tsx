import { useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { cn } from '../../lib/cn'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  contentClassName?: string
  glowColor?: 'blue' | 'red' | 'yellow' | 'green' | 'google'
  maxTilt?: number
  scaleOnHover?: number
  onClick?: () => void
}

const GLOW_MAP = {
  blue: 'rgba(66, 133, 244, 0.45)',
  red: 'rgba(234, 67, 53, 0.45)',
  yellow: 'rgba(251, 188, 5, 0.45)',
  green: 'rgba(52, 168, 83, 0.45)',
  google: 'rgba(66, 133, 244, 0.45)',
}

export function TiltCard({
  children,
  className,
  contentClassName,
  glowColor = 'google',
  maxTilt = 12,
  scaleOnHover = 1.02,
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })
  const reducedMotion = usePrefersReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for buttery-smooth tilting
  const springConfig = { damping: 20, stiffness: 260 }
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [maxTilt, -maxTilt]), springConfig)
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-maxTilt, maxTilt]), springConfig)
  const scale = useSpring(isHovered ? scaleOnHover : 1, springConfig)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const clientX = e.clientX - rect.left
    const clientY = e.clientY - rect.top

    // Normalized coordinates (-0.5 to 0.5)
    mouseX.set(clientX / width - 0.5)
    mouseY.set(clientY / height - 0.5)

    // Percentage for spotlight
    setMousePos({
      x: (clientX / width) * 100,
      y: (clientY / height) * 100,
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  const activeGlow = GLOW_MAP[glowColor]

  return (
    <div
      style={{ perspective: 1000 }}
      className="h-full w-full"
      onClick={onClick}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={
          reducedMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                scale,
                transformStyle: 'preserve-3d',
              }
        }
        className={cn(
          'group relative h-full w-full rounded-2xl border border-border bg-surface p-1 transition-colors duration-300',
          className,
        )}
      >
        {/* Dynamic cursor-follow glowing gradient border */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, ${activeGlow}, transparent 55%)`,
          }}
          aria-hidden="true"
        />

        {/* Ambient interior spotlight */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(300px circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 255, 255, 0.05), transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Content layer */}
        <div className={cn('relative z-10 h-full w-full', contentClassName)}>{children}</div>
      </motion.div>
    </div>
  )
}
