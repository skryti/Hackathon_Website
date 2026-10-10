import type { ReactNode } from 'react'
import { Eyebrow } from '../ui/Eyebrow'
import { SectionHeading } from '../ui/SectionHeading'
import { Reveal } from '../ui/Reveal'
import { cn } from '../../lib/cn'

interface SectionShellProps {
  id: string
  index: number
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
  index,
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
          <Eyebrow index={index} label={eyebrow} />
          <SectionHeading id={headingId} gradientWords={gradientWords}>
            {heading}
          </SectionHeading>
          {deck ? <p className="mt-4 max-w-2xl text-body-lg text-txt-2">{deck}</p> : null}
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  )
}
