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
    <div className="flex flex-col items-center gap-3 w-full" aria-live="off">
      <div className="inline-flex items-center gap-2 rounded-full border border-google-blue/30 bg-google-blue/10 px-3 py-1 font-mono text-[10px] sm:text-[11px] font-semibold text-google-blue">
        <span className="h-1.5 w-1.5 rounded-full bg-google-blue animate-pulse" />
        <span>
          {phase === 'before' ? 'HACKATHON COMMENCES IN' : 'HOUR 36 DEADLINE IN'}
        </span>
      </div>

      <div
        className="flex items-center justify-center gap-2 sm:gap-3 font-mono"
        aria-label={`${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds remaining`}
      >
        {/* DAYS */}
        <div className="flex flex-col items-center justify-center min-w-[68px] sm:min-w-[80px] rounded-xl border border-border/80 bg-surface/80 px-3 py-2.5 backdrop-blur-md shadow-sm">
          <span className="font-mono text-2xl sm:text-3xl font-black text-txt">
            {String(days).padStart(2, '0')}
          </span>
          <span className="mt-0.5 font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-txt-3">
            DAYS
          </span>
        </div>

        <span className="font-mono text-xl sm:text-2xl font-bold text-txt-3 pb-3">:</span>

        {/* HOURS */}
        <div className="flex flex-col items-center justify-center min-w-[68px] sm:min-w-[80px] rounded-xl border border-border/80 bg-surface/80 px-3 py-2.5 backdrop-blur-md shadow-sm">
          <span className="font-mono text-2xl sm:text-3xl font-black text-txt">
            {String(hours).padStart(2, '0')}
          </span>
          <span className="mt-0.5 font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-txt-3">
            HOURS
          </span>
        </div>

        <span className="font-mono text-xl sm:text-2xl font-bold text-txt-3 pb-3">:</span>

        {/* MINUTES */}
        <div className="flex flex-col items-center justify-center min-w-[68px] sm:min-w-[80px] rounded-xl border border-border/80 bg-surface/80 px-3 py-2.5 backdrop-blur-md shadow-sm">
          <span className="font-mono text-2xl sm:text-3xl font-black text-txt">
            {String(minutes).padStart(2, '0')}
          </span>
          <span className="mt-0.5 font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-txt-3">
            MINUTES
          </span>
        </div>

        <span className="font-mono text-xl sm:text-2xl font-bold text-txt-3 pb-3">:</span>

        {/* SECONDS */}
        <div className="flex flex-col items-center justify-center min-w-[68px] sm:min-w-[80px] rounded-xl border border-border/80 bg-surface/80 px-3 py-2.5 backdrop-blur-md shadow-sm">
          <span className="font-mono text-2xl sm:text-3xl font-black text-google-blue">
            {String(seconds).padStart(2, '0')}
          </span>
          <span className="mt-0.5 font-mono text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-txt-3">
            SECONDS
          </span>
        </div>
      </div>

      <span className="font-mono text-[11px] text-txt-3 tracking-wide mt-1">
        HOUR 0 · 20 MARCH 2026, 12:00 PM IST · MITS-DU GWALIOR
      </span>
    </div>
  )
}
