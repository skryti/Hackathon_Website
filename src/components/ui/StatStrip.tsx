import { Stagger } from './Stagger'

interface Stat {
  value: string
  label: string
}

interface StatStripProps {
  stats: Stat[]
}

export function StatStrip({ stats }: StatStripProps) {
  return (
    <Stagger stagger={0.06} className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border border-border/80 bg-surface/75 backdrop-blur-md shadow-sm transition-all duration-300 hover:border-google-blue/30"
        >
          <span className="font-display text-2xl sm:text-3xl font-black text-txt tracking-tight">
            {stat.value}
          </span>
          <span className="mt-1 font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-txt-2">
            {stat.label}
          </span>
        </div>
      ))}
    </Stagger>
  )
}
