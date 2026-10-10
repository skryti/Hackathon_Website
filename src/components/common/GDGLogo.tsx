import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

interface GDGLogoProps extends HTMLAttributes<HTMLDivElement> {
  compact?: boolean
}

export function GDGLogo({ compact = false, className, ...props }: GDGLogoProps) {
  return (
    <div className={cn('flex items-center gap-2.5', className)} {...props}>
      {/* Google Brackets visual logo */}
      <svg
        width={compact ? '28' : '34'}
        height={compact ? '28' : '34'}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-hidden="true"
      >
        {/* Left Bracket < (Blue & Red) */}
        <path
          d="M18.5 12L7.5 23L6.44 24.06L7.5 25.12L18.5 36.12"
          stroke="#4285F4"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.5 12L13 17.5"
          stroke="#EA4335"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Right Bracket > (Yellow & Green) */}
        <path
          d="M29.5 12L40.5 23L41.56 24.06L40.5 25.12L29.5 36.12"
          stroke="#34A853"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M29.5 36.12L35 30.62"
          stroke="#FBBC05"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="flex flex-col text-left leading-tight">
        <div className="flex items-center gap-1 font-display text-sm font-bold tracking-tight text-txt">
          <span>GDGoC</span>
          <span className="hidden sm:inline-block h-1.5 w-1.5 rounded-full bg-google-blue" />
        </div>
        <span className="font-mono text-[10px] tracking-wider uppercase text-txt-3">
          MITS-DU Gwalior
        </span>
      </div>
    </div>
  )
}
