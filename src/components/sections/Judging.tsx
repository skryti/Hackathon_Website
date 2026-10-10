import { AlertTriangle, Award, CheckCircle } from 'lucide-react'
import { SectionShell } from '../layout/SectionShell'
import { Reveal } from '../ui/Reveal'
import { CriterionRow } from './CriterionRow'
import { JUDGING_CRITERIA, JUDGING_TIE_BREAK, JUDGING_NOTE } from '../../data/judging'

export function Judging() {
  return (
    <SectionShell
      id="judging"
      index={5}
      eyebrow="EVALUATION RUBRIC"
      heading="Transparent Scoring Matrix."
      gradientWords={['Scoring', 'Matrix']}
      deck="Every team is evaluated by Google Developer Experts, veteran startup founders, and senior engineers using a published 100-point rubric."
    >
      <div className="rounded-2xl border border-border bg-surface/50 p-6 sm:p-8 backdrop-blur-sm">
        {JUDGING_CRITERIA.map((criterion) => (
          <CriterionRow key={criterion.name} criterion={criterion} />
        ))}

        <Reveal className="flex items-center justify-between border-t border-border pt-6 mt-4" y={0}>
          <div className="flex items-center gap-2 font-mono text-xs uppercase text-google-blue">
            <CheckCircle size={16} />
            <span>Calibrated against Google Developer Standards</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase text-txt-3">CUMULATIVE SCORE</span>
            <span className="font-mono text-2xl font-black text-txt">100%</span>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-google-yellow/30 bg-google-yellow/5 p-6">
        <div>
          <div className="flex items-center gap-2 font-display text-sm font-bold text-txt">
            <Award size={18} className="text-google-yellow" />
            <span>Tie-Break Protocol (Public)</span>
          </div>
          <p className="mt-1 text-xs text-txt-2">{JUDGING_TIE_BREAK}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-txt-2 border-t sm:border-t-0 sm:border-l border-border pt-2 sm:pt-0 sm:pl-4">
          <AlertTriangle size={16} className="text-google-red shrink-0" />
          <span>{JUDGING_NOTE}</span>
        </div>
      </Reveal>
    </SectionShell>
  )
}
