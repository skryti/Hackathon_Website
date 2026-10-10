import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

type Tone = 'neutral' | 'accent' | 'accent2' | 'signal' | 'warning' | 'danger'

interface ChipProps {
  children: ReactNode
  tone?: Tone
  icon?: ReactNode
  className?: string
}

const TONE_CLASSES: Record<Tone, string> = {
  neutral: 'border-border text-txt-2',
  accent: 'border-accent/40 text-accent bg-accent-soft',
  accent2: 'border-accent2/40 text-accent2 bg-accent2-soft',
  signal: 'border-signal/40 text-signal bg-signal/10',
  warning: 'border-warning/40 text-warning bg-warning/10',
  danger: 'border-danger/40 text-danger bg-danger/10',
}

export function Chip({ children, tone = 'neutral', icon, className }: ChipProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-mono-sm uppercase',
        TONE_CLASSES[tone],
        className,
      )}
    >
      {icon}
      {children}
    </span>
  )
}
