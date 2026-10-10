import { motion } from 'framer-motion'
import { AlertTriangle, Users, Code, ShieldAlert, Cpu } from 'lucide-react'
import { SectionShell } from '../layout/SectionShell'
import { TiltCard } from '../ui/TiltCard'
import { RULES } from '../../data/rules'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { EASE_OUT, VIEWPORT_ONCE } from '../../lib/motion'
import type { RuleItem } from '../../types'

function RuleItemView({ item, index }: { item: RuleItem; index: number }) {
  const reducedMotion = usePrefersReducedMotion()
  const isDanger = item.severity === 'danger'

  if (isDanger) {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-google-red/40 bg-google-red/10 p-4">
        <AlertTriangle size={18} className="mt-0.5 shrink-0 text-google-red" aria-hidden="true" />
        <div className="text-body-sm text-txt-2 leading-relaxed">
          {item.lead ? <span className="font-bold text-google-red">{item.lead} </span> : null}
          {item.text}
        </div>
      </div>
    )
  }

  return (
    <motion.li
      initial={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
      whileInView={reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: 0.4, delay: index * 0.04, ease: EASE_OUT }}
      className="flex items-start gap-3 text-body-sm text-txt-2 leading-relaxed"
    >
      <span className="mt-1 h-2 w-2 rounded-full bg-google-blue shrink-0" aria-hidden="true" />
      <div>
        {item.lead ? <strong className="font-semibold text-txt">{item.lead} </strong> : null}
        {item.text}
      </div>
    </motion.li>
  )
}

export function Rules() {
  return (
    <SectionShell
      id="rules"
      index={6}
      eyebrow="OFFICIAL GUIDELINES"
      heading="Rules &amp; Code of Conduct"
      gradientWords={['Code', 'of', 'Conduct']}
      deck="Fairness, integrity, and safety are non-negotiable. Please read through team size parameters, code originality constraints, and submission criteria."
      band="elevated"
    >
      {/* Quick Highlights Row: Team Size & Code Originality */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
        <TiltCard glowColor="blue" className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-google-blue/10 border border-google-blue/20 text-google-blue">
              <Users size={20} />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-txt-3">TEAM FORMATION</span>
              <h4 className="font-display text-lg font-bold text-txt">2 to 4 Members</h4>
            </div>
          </div>
          <p className="mt-3 text-xs text-txt-2 leading-relaxed">
            Solo hacking is not permitted. Teams must have between 2 and 4 registered hackers. Cross-college teams are encouraged!
          </p>
        </TiltCard>

        <TiltCard glowColor="red" className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-google-red/10 border border-google-red/20 text-google-red">
              <Code size={20} />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-txt-3">CODE INTEGRITY</span>
              <h4 className="font-display text-lg font-bold text-txt">100% Fresh Code</h4>
            </div>
          </div>
          <p className="mt-3 text-xs text-txt-2 leading-relaxed">
            All code and assets must be written during the 36-hour sprint. Pre-built repos are audited and disqualified.
          </p>
        </TiltCard>

        <TiltCard glowColor="green" className="p-6 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-google-green/10 border border-google-green/20 text-google-green">
              <Cpu size={20} />
            </div>
            <div>
              <span className="font-mono text-[10px] uppercase text-txt-3">TOOLING POLICY</span>
              <h4 className="font-display text-lg font-bold text-txt">Open AI Tools</h4>
            </div>
          </div>
          <p className="mt-3 text-xs text-txt-2 leading-relaxed">
            Gemini, Copilot, and open-source libraries are welcomed. Maintain an AI_USAGE.md in your repository for transparency.
          </p>
        </TiltCard>
      </div>

      {/* Rules Column Breakdown */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {RULES.map((column) => (
          <div key={column.heading} className="rounded-2xl border border-border bg-surface/50 p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="flex items-center gap-2 font-display text-xl font-bold text-txt pb-4 border-b border-border">
              <ShieldAlert size={18} className="text-google-blue" />
              <span>{column.heading}</span>
            </h3>
            <ul className="mt-6 flex flex-col gap-4">
              {column.items.map((item, i) => (
                <RuleItemView key={`${column.heading}-${i}`} item={item} index={i} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
