import { useCallback, useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { AnimatePresence, motion, useMotionValue } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TimelineEntry } from './TimelineEntry'
import { cn } from '../../lib/cn'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import type { ScheduleDay, ScheduleEntry } from '../../types'

const DAY_LABELS: Record<ScheduleDay, string> = {
  FRI: 'FRIDAY · 4 DEC',
  SAT: 'SATURDAY · 5 DEC',
  SUN: 'SUNDAY · 6 DEC',
}

interface TimelineRailHorizontalProps {
  entries: ScheduleEntry[]
}

/**
 * Native horizontally-scrollable schedule row. Scrolls independently of the
 * page's vertical scroll (trackpad / shift+wheel / touch drag / arrow keys) —
 * no pinning, no scroll-jacking. CSS scroll-snap keeps cards aligned.
 */
export function TimelineRailHorizontal({ entries }: TimelineRailHorizontalProps) {
  const reducedMotion = usePrefersReducedMotion()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Array<HTMLDivElement | null>>([])
  const rafRef = useRef<number | null>(null)

  const progress = useMotionValue(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const measure = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    const p = max > 0 ? el.scrollLeft / max : 0
    progress.set(Math.min(1, Math.max(0, p)))
    setAtStart(el.scrollLeft <= 2)
    setAtEnd(el.scrollLeft >= max - 2)

    const center = el.scrollLeft + el.clientWidth / 2
    let closestIdx = 0
    let closestDist = Infinity
    cardRefs.current.forEach((card, i) => {
      if (!card) return
      const cardCenter = card.offsetLeft + card.offsetWidth / 2
      const dist = Math.abs(cardCenter - center)
      if (dist < closestDist) {
        closestDist = dist
        closestIdx = i
      }
    })
    setActiveIndex((prev) => (prev === closestIdx ? prev : closestIdx))
  }, [progress])

  const handleScroll = useCallback(() => {
    if (rafRef.current != null) return
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null
      measure()
    })
  }, [measure])

  useEffect(() => {
    measure()
    window.addEventListener('resize', measure)
    return () => {
      window.removeEventListener('resize', measure)
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
    }
  }, [measure, entries.length])

  const scrollByStep = useCallback(
    (direction: 1 | -1) => {
      const el = scrollerRef.current
      const card = cardRefs.current[0]
      if (!el) return
      const step = (card?.offsetWidth ?? 320) + 24
      el.scrollBy({ left: direction * step, behavior: reducedMotion ? 'auto' : 'smooth' })
    },
    [reducedMotion],
  )

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      scrollByStep(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      scrollByStep(-1)
    }
  }

  const activeDay = entries[activeIndex]?.day ?? entries[0]?.day ?? 'FRI'

  return (
    <div className="group/rail relative">
      <div className="mb-4 flex justify-end">
        <div className="font-mono text-mono-sm uppercase text-txt-3">
          <AnimatePresence mode="wait">
            <motion.span
              key={activeDay}
              initial={reducedMotion ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: reducedMotion ? 0.12 : 0.3 }}
              className="rounded-full border border-border bg-bg/80 px-3 py-1 backdrop-blur"
            >
              {DAY_LABELS[activeDay]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      <div className="relative">
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-bg-elev to-transparent transition-opacity duration-300 sm:w-20',
            atStart ? 'opacity-0' : 'opacity-100',
          )}
        />
        <div
          aria-hidden
          className={cn(
            'pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-bg-elev to-transparent transition-opacity duration-300 sm:w-20',
            atEnd ? 'opacity-0' : 'opacity-100',
          )}
        />

        <button
          type="button"
          aria-label="Scroll schedule left"
          onClick={() => scrollByStep(-1)}
          disabled={atStart}
          className={cn(
            'absolute left-1 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-bg/90 p-2 text-txt backdrop-blur transition-all duration-200 hover:border-accent/50 hover:text-accent sm:left-2 sm:p-2.5',
            'opacity-0 focus-visible:opacity-100 group-hover/rail:opacity-100 [@media(hover:none)]:opacity-100',
            'disabled:pointer-events-none disabled:opacity-0',
          )}
        >
          <ChevronLeft size={18} aria-hidden />
        </button>
        <button
          type="button"
          aria-label="Scroll schedule right"
          onClick={() => scrollByStep(1)}
          disabled={atEnd}
          className={cn(
            'absolute right-1 top-1/2 z-20 -translate-y-1/2 rounded-full border border-border bg-bg/90 p-2 text-txt backdrop-blur transition-all duration-200 hover:border-accent/50 hover:text-accent sm:right-2 sm:p-2.5',
            'opacity-0 focus-visible:opacity-100 group-hover/rail:opacity-100 [@media(hover:none)]:opacity-100',
            'disabled:pointer-events-none disabled:opacity-0',
          )}
        >
          <ChevronRight size={18} aria-hidden />
        </button>

        <div
          ref={scrollerRef}
          role="group"
          aria-label="Event schedule. Scroll horizontally, or use the arrow keys."
          tabIndex={0}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          className={cn(
            'flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain px-1 py-2 outline-none',
            'focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-elev',
            '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          )}
          style={{ scrollBehavior: reducedMotion ? 'auto' : 'smooth' }}
        >
          {entries.map((entry, i) => (
            <TimelineEntry
              key={`${entry.day}-${entry.time}-${i}`}
              ref={(el) => {
                cardRefs.current[i] = el
              }}
              entry={entry}
              variant="horizontal"
              className="snap-start"
            />
          ))}
        </div>
      </div>

      <div className="mt-5 h-[3px] w-full overflow-hidden rounded-full bg-border/60" aria-hidden>
        <motion.div className="h-full w-full origin-left rounded-full grad-horizon-bg" style={{ scaleX: progress }} />
      </div>
    </div>
  )
}
