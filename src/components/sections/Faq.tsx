import { Phone, Mail } from 'lucide-react'
import { SectionShell } from '../layout/SectionShell'
import { Accordion } from '../ui/Accordion'
import { Button } from '../ui/Button'
import { FAQ } from '../../data/faq'
import { EVENT } from '../../data/event'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export function Faq() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <SectionShell
      id="faq"
      index={7}
      eyebrow="FREQUENTLY ASKED QUESTIONS"
      heading="Everything You Need to Know."
      gradientWords={['Need', 'Know']}
      deck="Got questions about eligibility, accommodation, team rules, or technology stacks? We have you covered."
    >
      <div className="mx-auto max-w-[840px] space-y-10">
        <Accordion items={FAQ} defaultOpenIndex={isDesktop ? 0 : null} />

        {/* Still have questions banner */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-border bg-surface/70 p-6 backdrop-blur-sm">
          <div>
            <h4 className="font-display text-base font-bold text-txt">Still have questions?</h4>
            <p className="text-xs text-txt-2">Our organizing leads and support crew are always available to help you.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              as="a"
              href={`mailto:${EVENT.contacts.general}`}
              variant="primary"
              size="sm"
              icon={Mail}
            >
              Email Us
            </Button>
            <Button
              as="a"
              href={`tel:${EVENT.contacts.phone.replace(/\s+/g, '')}`}
              variant="secondary"
              size="sm"
              icon={Phone}
            >
              Call Helpline
            </Button>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
