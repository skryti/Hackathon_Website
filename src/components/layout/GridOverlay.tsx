export function GridOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage: `
          repeating-linear-gradient(to right, var(--grid-line) 0 1px, transparent 1px 80px),
          repeating-linear-gradient(to bottom, var(--grid-line) 0 1px, transparent 1px 80px)
        `,
        maskImage: 'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)',
      }}
    />
  )
}
