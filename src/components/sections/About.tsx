import { Users, Coffee, Share2, Zap } from 'lucide-react'
import { SectionShell } from '../layout/SectionShell'
import { TiltCard } from '../ui/TiltCard'
import { ABOUT } from '../../data/about'

const HIGHLIGHT_ICONS = {
  Users: Users,
  Coffee: Coffee,
  Network: Share2,
  Zap: Zap,
}

const COLOR_GLOW_MAP = {
  blue: 'blue' as const,
  red: 'red' as const,
  yellow: 'yellow' as const,
  green: 'green' as const,
}

const ICON_BG_MAP = {
  blue: 'bg-google-blue/10 text-google-blue border-google-blue/20',
  red: 'bg-google-red/10 text-google-red border-google-red/20',
  yellow: 'bg-google-yellow/10 text-google-yellow border-google-yellow/20',
  green: 'bg-google-green/10 text-google-green border-google-green/20',
}

export function About() {
  return (
    <SectionShell
      id="about"
      index={1}
      eyebrow="THE SPRINT EXPERIENCE"
      heading="Engineering The Future At MITS Gwalior."
      deck="Organized by GDG On Campus MITS-DU Gwalior, INNOV8-MITS 2026 brings together developers, designers, and visionaries to convert raw passion into production-ready software and hardware prototypes."
      gradientWords={['Future', 'MITS Gwalior']}
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {ABOUT.highlights.map((item) => {
          const Icon = HIGHLIGHT_ICONS[item.icon as keyof typeof HIGHLIGHT_ICONS] ?? Zap
          return (
            <TiltCard
              key={item.title}
              glowColor={COLOR_GLOW_MAP[item.color]}
              className="p-6 flex flex-col justify-between"
            >
              <div>
                <div
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-xl border ${ICON_BG_MAP[item.color]} mb-5`}
                >
                  <Icon size={24} aria-hidden />
                </div>
                <h3 className="font-display text-lg font-bold text-txt">
                  {item.title}
                </h3>
                <p className="mt-2 text-body-sm text-txt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-wide text-txt-3">
                <span className="h-1.5 w-1.5 rounded-full bg-google-blue" />
                <span>INCLUDED FOR ALL CREWS</span>
              </div>
            </TiltCard>
          )
        })}
      </div>
    </SectionShell>
  )
}
