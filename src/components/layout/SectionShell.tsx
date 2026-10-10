import type { ReactNode } from 'react'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { cn } from '../../lib/cn'

interface SectionShellProps {
  id: string
  index?: number
  eyebrow: string
  heading: string
  gradientWords?: string[]
  deck?: string
  band?: 'base' | 'elevated'
  children: ReactNode
  className?: string
}

export function SectionShell({
  id,
  index: _index,
  eyebrow,
  heading,
  gradientWords,
  deck,
  band = 'base',
  children,
  className,
}: SectionShellProps) {
  const headingId = `${id}-heading`

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        'relative scroll-mt-[88px] overflow-x-clip py-[clamp(5rem,11vh,9rem)]',
        band === 'elevated' ? 'bg-bg-elev' : 'bg-bg',
        className,
      )}
    >
      <div className="relative mx-auto max-w-[1240px] px-[clamp(1.25rem,5vw,4rem)]">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            {eyebrow ? (
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-google-blue/35 bg-google-blue/10 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-google-blue shadow-sm">
                <span>{eyebrow}</span>
              </div>
            ) : null}
            <SectionHeading id={headingId} gradientWords={gradientWords} className="text-center">
              {heading}
            </SectionHeading>
            {deck ? <p className="mt-4 max-w-3xl mx-auto text-body-lg text-txt-2 text-center leading-relaxed">{deck}</p> : null}
          </div>
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}
