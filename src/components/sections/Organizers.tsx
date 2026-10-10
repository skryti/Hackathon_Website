import { useState } from 'react'
import { ArrowUpRight, ExternalLink, ShieldCheck } from 'lucide-react'
import { SectionShell } from '../layout/SectionShell'
import { Reveal } from '../ui/Reveal'
import { Stagger } from '../ui/Stagger'
import { ORGANIZERS } from '../../data/organizers'
import type { Organizer } from '../../data/organizers'

const COLOR_STYLES = {
  blue: {
    ring: 'ring-google-blue/40 group-hover:ring-google-blue',
    badge: 'border-google-blue/30 bg-google-blue/10 text-google-blue',
    glow: 'rgba(66, 133, 244, 0.15)',
    btnHover: 'hover:border-google-blue hover:text-google-blue hover:bg-google-blue/10',
    fallbackBg: 'bg-google-blue/20 text-google-blue',
  },
  red: {
    ring: 'ring-google-red/40 group-hover:ring-google-red',
    badge: 'border-google-red/30 bg-google-red/10 text-google-red',
    glow: 'rgba(234, 67, 53, 0.15)',
    btnHover: 'hover:border-google-red hover:text-google-red hover:bg-google-red/10',
    fallbackBg: 'bg-google-red/20 text-google-red',
  },
  yellow: {
    ring: 'ring-google-yellow/40 group-hover:ring-google-yellow',
    badge: 'border-google-yellow/30 bg-google-yellow/10 text-google-yellow',
    glow: 'rgba(251, 188, 5, 0.15)',
    btnHover: 'hover:border-google-yellow hover:text-google-yellow hover:bg-google-yellow/10',
    fallbackBg: 'bg-google-yellow/20 text-google-yellow',
  },
  green: {
    ring: 'ring-google-green/40 group-hover:ring-google-green',
    badge: 'border-google-green/30 bg-google-green/10 text-google-green',
    glow: 'rgba(52, 168, 83, 0.15)',
    btnHover: 'hover:border-google-green hover:text-google-green hover:bg-google-green/10',
    fallbackBg: 'bg-google-green/20 text-google-green',
  },
} as const

function OrganizerCard({ organizer }: { organizer: Organizer }) {
  const [imgError, setImgError] = useState(false)
  const colors = COLOR_STYLES[organizer.googleColor]

  return (
    <div className="group relative flex flex-col items-center justify-between rounded-3xl border border-border/80 bg-surface/60 p-6 sm:p-7 text-center backdrop-blur-md transition-all duration-300 hover:border-border-strong hover:bg-surface hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/40">
      {/* Top ambient hover glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at 50% 30%, ${colors.glow}, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center w-full">
        {/* Avatar with futuristic glowing ring */}
        <div className="relative mb-5">
          <div className={`h-24 w-24 sm:h-28 sm:w-28 rounded-full ring-2 ring-offset-4 ring-offset-bg transition-all duration-300 group-hover:scale-105 overflow-hidden shadow-lg ${colors.ring}`}>
            {!imgError ? (
              <img
                src={organizer.avatar}
                alt={organizer.name}
                loading="lazy"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className={`flex h-full w-full items-center justify-center font-display text-2xl font-bold ${colors.fallbackBg}`}>
                {organizer.initials}
              </div>
            )}
          </div>
        </div>

        {/* Organizer Name */}
        <h3 className="font-display text-lg sm:text-xl font-bold text-gray-900 dark:text-white transition-colors group-hover:text-google-blue">
          {organizer.name}
        </h3>

        {/* Role Pill Badge */}
        <div className={`mt-2 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] sm:text-xs font-semibold ${colors.badge}`}>
          <span>{organizer.role}</span>
        </div>
      </div>

      {/* View Profile Action Link */}
      <div className="relative z-10 mt-6 pt-4 border-t border-border/50 w-full flex justify-center">
        <a
          href={organizer.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-1.5 rounded-full border border-border/80 bg-bg-elev/60 px-4 py-1.5 font-mono text-xs font-semibold text-txt-2 transition-all duration-200 ${colors.btnHover} hover:scale-105 active:scale-95`}
        >
          <span>View profile</span>
          <ArrowUpRight size={13} className="shrink-0" />
        </a>
      </div>
    </div>
  )
}

export function Organizers() {
  return (
    <SectionShell
      id="organizers"
      index={8}
      eyebrow="COMMUNITY LEADERSHIP"
      heading="Organizers"
      gradientWords={['Organizers']}
      deck="The student leads behind GDGoC • MITS-DU Gwalior driving HackInnov8 2026."
      band="elevated"
    >
      <Stagger className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" childY={24}>
        {ORGANIZERS.map((organizer) => (
          <OrganizerCard key={organizer.name} organizer={organizer} />
        ))}
      </Stagger>

      {/* Official Community Dev Chapter Pill */}
      <Reveal className="mt-12 text-center" y={16}>
        <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 rounded-2xl border border-border/80 bg-surface/50 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-txt-2 font-mono text-xs">
            <ShieldCheck size={16} className="text-google-blue shrink-0" />
            <span>Official GDGoC Chapter · Madhav Institute of Technology &amp; Science</span>
          </div>
          <a
            href="https://gdg.community.dev/gdg-on-campus-madhav-institute-of-technology-science-gwalior-india/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-google-blue hover:underline"
          >
            <span>Visit Community Portal</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </Reveal>
    </SectionShell>
  )
}
