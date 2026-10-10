import { forwardRef } from 'react'
import type { KeyboardEvent } from 'react'
import { motion } from 'framer-motion'
import { Chip } from '../ui/Chip'
import { cn } from '../../lib/cn'
import { EASE_OUT, VIEWPORT_ONCE } from '../../lib/motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import type { ScheduleEntry, ScheduleKind } from '../../types'

const DOT_COLOR: Record<ScheduleKind, string> = {
  ceremony: 'bg-accent2',
  hack: 'bg-accent',
  fuel: 'bg-txt-3',
  checkpoint: 'bg-signal',
  session: 'bg-accent2',
  deadline: 'bg-danger',
}

interface TimelineEntryProps {
  entry: ScheduleEntry
  variant: 'vertical' | 'horizontal'
  className?: string
  tabIndex?: number
  onKeyDown?: (e: KeyboardEvent<HTMLDivElement>) => void
}

export const TimelineEntry = forwardRef<HTMLDivElement, TimelineEntryProps>(function TimelineEntry(
  { entry, variant, className, tabIndex, onKeyDown },
  ref,
) {
  const reducedMotion = usePrefersReducedMotion()
  const isHard = entry.kind === 'deadline' || Boolean(entry.hard)
  const isCheckpoint = entry.kind === 'checkpoint'
  const dotColor = DOT_COLOR[entry.kind]

  const initial = reducedMotion
    ? { opacity: 0 }
    : variant === 'horizontal'
      ? { opacity: 0, x: 32 }
      : { opacity: 0, y: 24 }
  const whileInView = reducedMotion
    ? { opacity: 1 }
    : variant === 'horizontal'
      ? { opacity: 1, x: 0 }
      : { opacity: 1, y: 0 }
  const transition = { duration: reducedMotion ? 0.2 : 0.64, ease: EASE_OUT }

  const metaRow = (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-mono text-mono-sm text-txt-2">{entry.time}</span>
      {entry.hour ? <Chip tone="neutral">{entry.hour}</Chip> : null}
      {isHard ? <Chip tone="danger">HARD</Chip> : null}
    </div>
  )

  if (variant === 'horizontal') {
    return (
      <motion.div
        ref={ref}
        tabIndex={tabIndex}
        onKeyDown={onKeyDown}
        initial={initial}
        whileInView={whileInView}
        viewport={{ once: true, margin: '0px -5% 0px -5%' }}
        transition={transition}
        className={cn(
          'relative flex w-[320px] flex-shrink-0 flex-col gap-3 rounded-[18px] border bg-surface p-6 outline-none',
          'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg',
          isHard ? 'border-border border-l-[3px] border-l-danger' : 'border-border',
          className,
        )}
      >
        <div className="flex items-center gap-2">
          <span className={cn('relative h-2.5 w-2.5 rounded-full', dotColor)} aria-hidden>
            {isCheckpoint ? (
              <span className="absolute -inset-1 rounded-full border-2 border-signal/60" aria-hidden />
            ) : null}
          </span>
          {metaRow}
        </div>
        <h3 className="font-display text-display-md text-txt">{entry.label}</h3>
        <p className="text-body-sm text-txt-2">{entry.detail}</p>
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      tabIndex={tabIndex}
      onKeyDown={onKeyDown}
      initial={initial}
      whileInView={whileInView}
      viewport={VIEWPORT_ONCE}
      transition={transition}
      className={cn(
        'relative pb-10 pl-10 last:pb-0 outline-none',
        isHard && "before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:rounded-full before:bg-danger/70 before:content-['']",
        className,
      )}
    >
      {isHard && !reducedMotion ? (
        <span
          aria-hidden
          className="absolute left-[11px] top-[10px] h-3 w-3 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-danger blur-[6px]"
        />
      ) : null}
      {isCheckpoint ? (
        <span
          aria-hidden
          className="absolute left-[11px] top-[10px] h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-signal/60"
        />
      ) : null}
      <span
        aria-hidden
        className={cn('absolute left-[11px] top-[10px] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-bg', dotColor)}
      />
      {metaRow}
      <h3 className="mt-1.5 font-display text-display-md text-txt">{entry.label}</h3>
      <p className="mt-1 text-body-sm text-txt-2">{entry.detail}</p>
    </motion.div>
  )
})
