import { useTheme } from '../../context/ThemeContext'

const NOISE_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
    <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/></filter>
    <rect width="100%" height="100%" filter="url(#n)"/>
  </svg>`,
)

export function NoiseOverlay() {
  const { theme } = useTheme()

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[55]"
      style={{
        backgroundImage: `url("data:image/svg+xml,${NOISE_SVG}")`,
        opacity: theme === 'dusk' ? 0.03 : 0.022,
        mixBlendMode: 'overlay',
      }}
    />
  )
}
