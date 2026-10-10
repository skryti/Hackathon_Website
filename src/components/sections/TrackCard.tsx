import { BrainCircuit, ShieldCheck, Cpu, HeartPulse, CreditCard, Compass, Zap, ArrowUpRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { TiltCard } from '../ui/TiltCard'
import { Reveal } from '../ui/Reveal'
import type { Track } from '../../types'

const ICONS: Record<string, LucideIcon> = {
  BrainCircuit,
  ShieldCheck,
  Cpu,
  HeartPulse,
  CreditCard,
  Compass,
  Zap,
}

const COLOR_CONFIG = {
  blue: {
    text: 'text-google-blue',
    bg: 'bg-google-blue/15 border-google-blue/30',
    badge: 'border-google-blue/30 text-google-blue',
    dot: 'bg-google-blue',
  },
  red: {
    text: 'text-google-red',
    bg: 'bg-google-red/15 border-google-red/30',
    badge: 'border-google-red/30 text-google-red',
    dot: 'bg-google-red',
  },
  yellow: {
    text: 'text-google-yellow',
    bg: 'bg-google-yellow/15 border-google-yellow/30',
    badge: 'border-google-yellow/30 text-google-yellow',
    dot: 'bg-google-yellow',
  },
  green: {
    text: 'text-google-green',
    bg: 'bg-google-green/15 border-google-green/30',
    badge: 'border-google-green/30 text-google-green',
    dot: 'bg-google-green',
  },
}

interface TrackCardProps {
  track: Track
  delay?: number
  onSelect: (track: Track) => void
}

export function TrackCard({ track, delay = 0, onSelect }: TrackCardProps) {
  const Icon = ICONS[track.icon] ?? Compass
  const styling = COLOR_CONFIG[track.googleColor]

  return (
    <Reveal delay={delay} y={24} className="h-full">
      <TiltCard
        glowColor={track.googleColor}
        className="group cursor-pointer p-7 flex flex-col justify-between h-full rounded-3xl border border-border/80 bg-surface/60 transition-all hover:border-border-strong hover:shadow-xl"
        contentClassName="flex flex-col justify-between h-full"
        onClick={() => onSelect(track)}
      >
        <div className="flex flex-col flex-1">
          {/* Header row: Left = Icon Box, Right = Code Pill Badge */}
          <div className="flex items-center justify-between">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${styling.bg} transition-transform duration-300 group-hover:scale-105`}
            >
              <Icon className={`h-6 w-6 ${styling.text}`} aria-hidden />
            </div>
            <span className="font-mono text-xs font-semibold tracking-wider text-txt-3 px-3 py-1 rounded-full border border-border/70 bg-bg-elev/80">
              {track.code}
            </span>
          </div>

          {/* Uppercase Category Eyebrow in Track Color - fixed height so all titles start on the same line */}
          <div className={`mt-5 font-mono text-[11px] sm:text-xs font-bold uppercase tracking-wider h-10 flex items-center leading-snug ${styling.text}`}>
            {track.tagline}
          </div>

          {/* Track Title - fixed height so all descriptions start on the same line */}
          <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-txt group-hover:text-google-blue transition-colors h-16 flex items-start leading-tight">
            {track.name}
          </h3>

          {/* Track Description - uniform min-height so content takes equal space */}
          <p className="mt-3 text-body-sm text-txt-2 leading-relaxed min-h-[5.5rem] flex-1">
            {track.oneLiner}
          </p>
        </div>

        {/* Action footer - pinned to bottom on the exact same horizontal line */}
        <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
          <span className="font-mono text-xs text-txt-3">
            {track.problemStatements.length} Challenges Available
          </span>
          <button
            type="button"
            className={`inline-flex items-center gap-1 text-xs font-bold ${styling.text} group-hover:translate-x-1 transition-transform`}
          >
            <span>Explore Track</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </TiltCard>
    </Reveal>
  )
}
