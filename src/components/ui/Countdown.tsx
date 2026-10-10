import { Clock } from 'lucide-react'
import { useCountdown } from '../../hooks/useCountdown'
import { EVENT } from '../../data/event'

export function Countdown() {
  const { phase, days, hours, minutes, seconds } = useCountdown(
    EVENT.clockStartISO,
    EVENT.clockEndISO,
  )

  if (phase === 'after') {
    return (
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="font-mono text-xs uppercase tracking-widest text-txt-3">HACKATHON CONCLUDED</span>
        <span className="font-mono text-3xl font-black text-txt">36:00:00</span>
        <p className="max-w-xs text-xs text-txt-2">
          Submissions closed. Results & awards have been announced.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2.5 sm:gap-3 w-full" aria-live="off">
      {/* Eyebrow Pill matching Image 3 */}
      <div className="inline-flex items-center gap-2 rounded-full border border-google-blue/30 dark:border-[#1e3a5f] bg-google-blue/10 dark:bg-[#0c1829]/90 px-3.5 sm:px-4 py-1 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-google-blue shadow-sm">
        <Clock size={13} className="text-google-blue" />
        <span>HACKATHON COMMENCES IN</span>
      </div>

      {/* 4 Dedicated Cards matching Image 3 (Blue, Red, Yellow, Green) */}
      <div
        className="flex items-center justify-center gap-2 sm:gap-3.5 w-full"
        aria-label={`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds remaining`}
      >
        {/* DAYS - Google Blue */}
        <div className="flex flex-col items-center justify-center w-[72px] sm:w-[94px] md:w-[100px] rounded-2xl border border-gray-200/80 dark:border-white/[0.08] bg-white/95 dark:bg-[#0c1017] py-2.5 sm:py-3.5 px-2 shadow-md dark:shadow-xl dark:shadow-black/50">
          <span className="font-display text-2xl sm:text-4xl md:text-[2.6rem] font-black text-[#4285F4] tracking-tight leading-none">
            {String(days).padStart(2, '0')}
          </span>
          <span className="mt-1.5 font-mono text-[9px] sm:text-[11px] font-bold tracking-widest uppercase text-txt-3 dark:text-gray-400">
            DAYS
          </span>
        </div>

        {/* HOURS - Google Red */}
        <div className="flex flex-col items-center justify-center w-[72px] sm:w-[94px] md:w-[100px] rounded-2xl border border-gray-200/80 dark:border-white/[0.08] bg-white/95 dark:bg-[#0c1017] py-2.5 sm:py-3.5 px-2 shadow-md dark:shadow-xl dark:shadow-black/50">
          <span className="font-display text-2xl sm:text-4xl md:text-[2.6rem] font-black text-[#EA4335] tracking-tight leading-none">
            {String(hours).padStart(2, '0')}
          </span>
          <span className="mt-1.5 font-mono text-[9px] sm:text-[11px] font-bold tracking-widest uppercase text-txt-3 dark:text-gray-400">
            HOURS
          </span>
        </div>

        {/* MINUTES - Google Yellow */}
        <div className="flex flex-col items-center justify-center w-[72px] sm:w-[94px] md:w-[100px] rounded-2xl border border-gray-200/80 dark:border-white/[0.08] bg-white/95 dark:bg-[#0c1017] py-2.5 sm:py-3.5 px-2 shadow-md dark:shadow-xl dark:shadow-black/50">
          <span className="font-display text-2xl sm:text-4xl md:text-[2.6rem] font-black text-[#FBBC04] tracking-tight leading-none">
            {String(minutes).padStart(2, '0')}
          </span>
          <span className="mt-1.5 font-mono text-[9px] sm:text-[11px] font-bold tracking-widest uppercase text-txt-3 dark:text-gray-400">
            MINUTES
          </span>
        </div>

        {/* SECONDS - Google Green */}
        <div className="flex flex-col items-center justify-center w-[72px] sm:w-[94px] md:w-[100px] rounded-2xl border border-gray-200/80 dark:border-white/[0.08] bg-white/95 dark:bg-[#0c1017] py-2.5 sm:py-3.5 px-2 shadow-md dark:shadow-xl dark:shadow-black/50">
          <span className="font-display text-2xl sm:text-4xl md:text-[2.6rem] font-black text-[#34A853] tracking-tight leading-none">
            {String(seconds).padStart(2, '0')}
          </span>
          <span className="mt-1.5 font-mono text-[9px] sm:text-[11px] font-bold tracking-widest uppercase text-txt-3 dark:text-gray-400">
            SECONDS
          </span>
        </div>
      </div>

      {/* Visible Event Date & Venue Label */}
      <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[11px] sm:text-xs text-txt-3 tracking-wide mt-1">
        <span className="text-google-blue font-bold">10 NOVEMBER 2026</span>
        <span>•</span>
        <span className="text-txt-2 font-semibold">CONCLAVE CENTRE, MITS GWALIOR</span>
      </div>
    </div>
  )
}
