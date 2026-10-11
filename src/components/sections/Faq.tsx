import { Phone, Mail, ArrowUpRight } from 'lucide-react'
import { SectionShell } from '../layout/SectionShell'
import { Accordion } from '../ui/Accordion'
import { FAQ } from '../../data/faq'
import { EVENT } from '../../data/event'

export function Faq() {
  return (
    <SectionShell
      id="faq"
      index={7}
      eyebrow="FREQUENTLY ASKED QUESTIONS"
      heading="Frequently Asked Questions"
      gradientWords={['Questions']}
      deck="Got questions about eligibility, accommodation, team rules, or technology stacks? We have you covered."
    >
      <div className="mx-auto max-w-[840px] space-y-8">
        <Accordion items={FAQ} defaultOpenIndex={null} />

        {/* Stylish & Subtle Still Have Questions Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#0c1017]/70 p-6 sm:p-7 backdrop-blur-md shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[11px] font-semibold tracking-wider text-google-blue uppercase">
                Support &amp; Helpline
              </span>
              <h4 className="mt-1 font-display text-lg font-bold text-white">
                Still have questions?
              </h4>
              <p className="mt-0.5 text-xs text-txt-2">
                Reach out directly to our team via email or call our student coordinators.
              </p>
            </div>

            {/* Stylish subtle Email pill */}
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(EVENT.contacts.general)}&su=${encodeURIComponent('HackInnov8 2026 Inquiry')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs sm:text-sm font-medium text-gray-200 transition-all duration-200 hover:border-google-blue/50 hover:bg-google-blue/10 hover:text-white shrink-0 self-start sm:self-auto"
            >
              <Mail size={15} className="text-google-blue transition-transform group-hover:scale-110" />
              <span className="font-mono text-xs">{EVENT.contacts.general}</span>
              <ArrowUpRight size={13} className="text-txt-3 transition-transform group-hover:text-google-blue group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          <div className="mt-5 border-t border-white/[0.06] pt-4">
            <div className="font-mono text-[11px] uppercase tracking-wider text-txt-3">
              Direct Call Helpline:
            </div>
            <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EVENT.contacts.helpline.map((lead) => (
                <a
                  key={lead.name}
                  href={`tel:${lead.phone.replace(/\s+/g, '')}`}
                  className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-3.5 py-2.5 transition-all duration-200 hover:border-google-green/40 hover:bg-google-green/[0.05]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-google-green/30 bg-google-green/10 text-google-green">
                      <Phone size={13} />
                    </span>
                    <div className="text-left">
                      <span className="block font-display text-xs font-bold text-gray-200 group-hover:text-white transition-colors">
                        {lead.name}
                      </span>
                      <span className="block font-mono text-[10px] text-txt-3 uppercase">
                        {lead.role}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-medium text-txt-2 group-hover:text-google-green transition-colors">
                    {lead.phone}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
