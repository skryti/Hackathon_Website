interface GoogleTextProps {
  text: string
  className?: string
}

export const GOOGLE_COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'] as const

export function GoogleText({ text, className = '' }: GoogleTextProps) {
  let colorIndex = 0
  const clean = text.replace(/&amp;/g, '&')

  return (
    <span className={`inline-block ${className}`} aria-label={clean}>
      <span aria-hidden="true">
        {Array.from(clean).map((char, i) => {
          if (char === ' ') {
            colorIndex = 0
            return <span key={i}> </span>
          }
          const color = GOOGLE_COLORS[colorIndex % GOOGLE_COLORS.length]
          colorIndex++
          return (
            <span key={i} style={{ color }}>
              {char}
            </span>
          )
        })}
      </span>
    </span>
  )
}

