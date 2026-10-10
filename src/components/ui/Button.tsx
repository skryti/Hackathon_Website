import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  icon?: LucideIcon
  iconPosition?: 'left' | 'right'
  shimmer?: boolean
  as?: 'button' | 'a'
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
}

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'px-4 py-2.5 text-body-sm',
  md: 'px-5 py-3 text-body',
  lg: 'px-7 py-4 text-body-lg',
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: 'bg-accent text-on-accent border border-transparent hover:bg-accent-hover',
  secondary: 'bg-transparent text-txt border border-border-strong hover:border-accent',
  ghost: 'bg-transparent text-txt border border-transparent underline-offset-4 hover:underline',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'right',
  shimmer = false,
  as = 'button',
  href,
  target,
  rel,
  onClick,
  className,
  type = 'button',
}: ButtonProps) {
  const classes = cn(
    'relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[10px] font-sans font-medium transition-colors duration-150',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
    SIZE_CLASSES[size],
    VARIANT_CLASSES[variant],
    className,
  )

  const content = (
    <>
      {shimmer ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
          animate={{ translateX: ['-100%', '200%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
      ) : null}
      {Icon && iconPosition === 'left' ? <Icon size={18} aria-hidden /> : null}
      <span className="relative z-10">{children}</span>
      {Icon && iconPosition === 'right' ? (
        <motion.span
          className="relative z-10 inline-flex"
          whileHover={{ x: 3, y: -3 }}
          transition={{ duration: 0.16 }}
        >
          <Icon size={18} aria-hidden />
        </motion.span>
      ) : null}
    </>
  )

  const motionProps = {
    whileTap: { scale: 0.97 },
    transition: { duration: 0.12 },
  }

  if (as === 'a') {
    return (
      <motion.a href={href} target={target} rel={rel} className={classes} {...motionProps}>
        {content}
      </motion.a>
    )
  }

  return (
    <motion.button type={type} onClick={onClick} className={classes} {...motionProps}>
      {content}
    </motion.button>
  )
}
