import { useState, useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { Clock, Radio, CheckCircle, Coffee, AlertCircle, Presentation } from 'lucide-react'
import { SectionShell } from '../layout/SectionShell'
import { Chip } from '../ui/Chip'
import { TiltCard } from '../ui/TiltCard'
import { SCHEDULE, SCHEDULE_LEGEND } from '../../data/schedule'
import type { ScheduleKind } from '../../types'

const KIND_CONFIG: Record<ScheduleKind, { color: string; border: string; bg: string; icon: any }> = {
  ceremony: {
    color: 'text-google-blue',
    border: 'border-google-blue/30',
    bg: 'bg-google-blue/10',
    icon: Radio,
  },
  hack: {
    color: 'text-google-green',
    border: 'border-google-green/30',
    bg: 'bg-google-green/10',
    icon: Clock,
  },
  fuel: {
    color: 'text-google-yellow',
    border: 'border-google-yellow/30',
    bg: 'bg-google-yellow/10',
    icon: Coffee,
  },
  checkpoint: {
    color: 'text-google-blue',
    border: 'border-google-blue/30',
    bg: 'bg-google-blue/10',
    icon: CheckCircle,
  },
  session: {
    color: 'text-google-yellow',
    border: 'border-google-yellow/30',
    bg: 'bg-google-yellow/10',
    icon: Presentation,
  },
  deadline: {
    color: 'text-google-red',
    border: 'border-google-red/40',
    bg: 'bg-google-red/15',
    icon: AlertCircle,
  },
}

const PHASES = [
  {
    id: 1,
    label: 'Day 1 (Hours 00 - 12)',
    date: 'SATURDAY, NOV 14, 2026 • HOURS 00 - 12',
    title: 'Phase 1: Kickoff, Ideation & Mentor Sync',
  },
  {
    id: 2,
    label: 'Day 2 (Hours 12 - 28)',
    date: 'SUNDAY, NOV 15, 2026 • HOURS 12 - 28',
    title: 'Phase 2: The 24-Hour Build Sprint',
  },
  {
    id: 3,
    label: 'Day 3 (Hours 28 - 36)',
    date: 'SUNDAY, NOV 15, 2026 • HOURS 28 - 36',
    title: 'Phase 3: Final Pitches, Judging & Victory Ceremony',
  },
]

export function Timeline() {
  const [selectedPhase, setSelectedPhase] = useState<number>(1)
  const timelineRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  })

  const currentPhase = PHASES.find((p) => p.id === selectedPhase) ?? PHASES[0]
  const filteredEntries = SCHEDULE.filter((e) => e.phase === selectedPhase)

  return (
    <SectionShell
      id="timeline"
      index={3}
      eyebrow="36-HOUR RUNTIME SCHEDULE"
      heading="The Hackathon Timeline"
      gradientWords={['Timeline']}
      deck="Every hour counts. Explore our structured 3–phase schedule packed with keynotes, mentorship rounds, meal breaks, and final pitching showdowns."
      band="elevated"
    >
      {/* Legend & Phase Tabs */}
      <div className="space-y-6">
        {/* Phase Toggle Tabs matching Image 3 */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 p-1.5 rounded-2xl border border-border bg-surface/60 backdrop-blur-md max-w-2xl mx-auto">
          {PHASES.map((phase) => {
            const isActive = selectedPhase === phase.id
            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => setSelectedPhase(phase.id)}
                className={`relative flex-1 min-w-[130px] px-3.5 py-2.5 rounded-xl text-center transition-all duration-200 ${
                  isActive
                    ? 'text-white font-bold shadow-md'
                    : 'text-txt-2 hover:text-txt hover:bg-surface'
                }`}
              >
                {isActive ? (
                  <motion.div
                    layoutId="activePhaseTab"
                    className="absolute inset-0 rounded-xl bg-google-blue"
                    transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  />
                ) : null}
                <div className="relative z-10 font-display text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5">
                  <Clock size={13} className={isActive ? 'text-white' : 'text-txt-3'} />
                  <span>{phase.label}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Active Phase Banner matching Image 3 */}
        <div className="mx-auto max-w-2xl rounded-2xl border border-white/[0.08] bg-[#0c1017]/80 px-6 py-4 text-center shadow-lg backdrop-blur-md">
          <span className="font-mono text-[11px] font-bold tracking-widest uppercase text-google-blue">
            {currentPhase.date}
          </span>
          <h3 className="mt-1 font-display text-lg sm:text-xl font-black text-white">
            {currentPhase.title}
          </h3>
        </div>

        {/* Legend Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
          {SCHEDULE_LEGEND.map((item) => (
            <Chip key={item.kind} tone={item.tone}>
              {item.label}
            </Chip>
          ))}
        </div>
      </div>

      {/* Vertical Animated Timeline with 3D Tilt Cards */}
      <div ref={timelineRef} className="relative mt-16 max-w-4xl mx-auto">
        {/* Glowing vertical spine line */}
        <div
          aria-hidden="true"
          className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[3px] -translate-x-1/2 bg-border/60"
        />
        <motion.div
          aria-hidden="true"
          className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-[3px] -translate-x-1/2 grad-google-animated origin-top"
          style={{ scaleY: scrollYProgress }}
        />

        {/* Timeline Events List */}
        <div className="space-y-8 relative z-10">
          {filteredEntries.map((entry, idx) => {
            const config = KIND_CONFIG[entry.kind]
            const Icon = config.icon
            const isEven = idx % 2 === 0
            const glowColor =
              entry.kind === 'deadline'
                ? 'red'
                : entry.kind === 'hack'
                  ? 'green'
                  : entry.kind === 'fuel'
                    ? 'yellow'
                    : 'blue'

            return (
              <motion.div
                key={`${entry.day}-${entry.time}-${idx}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
                transition={{ duration: 0.5, delay: 0.04 }}
                className={`flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-6 sm:gap-12 pl-10 sm:pl-0`}
              >
                {/* Content Card (Half width on desktop) */}
                <div className="w-full sm:w-[calc(50%-2rem)]">
                  <TiltCard
                    glowColor={glowColor}
                    className={`p-5 rounded-2xl ${
                      entry.hard ? 'border-google-red/40 bg-surface' : ''
                    }`}
                  >
                    {/* Card Header: Time, Phase Badge, Hard indicator */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-google-blue">
                          {entry.time}
                        </span>
                        {entry.hour ? (
                          <span className="rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] text-txt-3 border border-border">
                            Hour {entry.hour}
                          </span>
                        ) : null}
                      </div>
                      <span className="font-mono text-[10px] uppercase text-txt-3 tracking-wide">
                        {entry.day} · {entry.phaseTitle.split(':')[0]}
                      </span>
                    </div>

                    {/* Event Title & Detail */}
                    <div className="mt-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-base sm:text-lg font-bold text-txt">
                          {entry.label}
                        </h3>
                        {entry.hard ? (
                          <span className="rounded-full bg-google-red/10 border border-google-red/30 px-2 py-0.5 font-mono text-[9px] font-bold text-google-red uppercase">
                            CRITICAL
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1.5 text-body-sm text-txt-2 leading-relaxed">
                        {entry.detail}
                      </p>
                    </div>
                  </TiltCard>
                </div>

                {/* Central Node Badge */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 flex items-center justify-center">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 ${config.border} bg-bg-elev shadow-lg transition-transform duration-300 hover:scale-125`}
                  >
                    <Icon size={16} className={config.color} aria-hidden="true" />
                  </div>
                </div>

                {/* Empty opposite spacer on desktop */}
                <div className="hidden sm:block w-[calc(50%-2rem)]" />
              </motion.div>
            )
          })}
        </div>
      </div>
    </SectionShell>
  )
}
