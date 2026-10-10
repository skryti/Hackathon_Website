import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

const TAGS = {
  div: 'div',
  article: 'article',
  li: 'li',
  button: 'button',
} as const

interface GlassCardProps {
  children: ReactNode
  as?: keyof typeof TAGS
  glow?: 'accent' | 'none'
  className?: string
  id?: string
}

export function GlassCard({ children, as = 'div', glow = 'none', className, id }: GlassCardProps) {
  const Component = TAGS[as]
  return (
    <Component
      id={id}
      className={cn(
        'relative rounded-[18px] border backdrop-blur-xl backdrop-saturate-150',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]',
        className,
      )}
      style={{
        backgroundColor: 'var(--glass-fill)',
        borderColor: 'var(--glass-stroke)',
        boxShadow:
          glow === 'accent'
            ? '0 0 40px -12px rgba(255,138,61,0.35), inset 0 1px 0 rgba(255,255,255,0.06)'
            : 'inset 0 1px 0 rgba(255,255,255,0.06)',
      }}
    >
      {children}
    </Component>
  )
}
