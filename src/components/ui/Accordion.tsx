import { useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '../../lib/cn'

interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
  defaultOpenIndex?: number | null
}

export function Accordion({ items, defaultOpenIndex = null }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex)
  const baseId = useId()
  const headerRefs = useRef<(HTMLButtonElement | null)[]>([])

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i))

  const focusHeader = (i: number) => headerRefs.current[i]?.focus()

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      focusHeader((i + 1) % items.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      focusHeader((i - 1 + items.length) % items.length)
    } else if (e.key === 'Home') {
      e.preventDefault()
      focusHeader(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      focusHeader(items.length - 1)
    }
  }

  return (
    <div className="divide-y divide-border rounded-[18px] border border-border">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        const headerId = `${baseId}-header-${i}`
        const panelId = `${baseId}-panel-${i}`

        return (
          <div key={i}>
            <button
              ref={(el) => {
                headerRefs.current[i] = el
              }}
              id={headerId}
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggle(i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={cn(
                'flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-160 hover:bg-surface-hover',
                isOpen && 'bg-surface-hover',
              )}
            >
              <span className="font-display text-display-md text-txt">{item.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.26 }}
                className="shrink-0 text-txt-2"
              >
                <ChevronDown size={22} aria-hidden />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-body text-txt-2">{item.answer}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
