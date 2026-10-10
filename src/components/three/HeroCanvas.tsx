import { Canvas } from '@react-three/fiber'
import { useTheme } from '../../context/ThemeContext'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useDeviceTier } from '../../hooks/useDeviceTier'
import { TerminatorGlobe } from './TerminatorGlobe'
import { TrackSatellites } from './TrackSatellites'
import { HorizonStrip } from './HorizonStrip'
import { ParticleField } from './ParticleField'

const QUALITY = {
  high: { particleCount: 600, globeDetail: 2, satellites: 6 },
  mid: { particleCount: 300, globeDetail: 2, satellites: 4 },
  low: { particleCount: 0, globeDetail: 1, satellites: 0 },
} as const

function StaticGlobeFallback({ theme }: { theme: 'dusk' | 'dawn' }) {
  const isDark = theme === 'dusk'
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-70" aria-hidden>
      <div
        className="h-[60vmin] w-[60vmin] rounded-full border border-google-blue/30"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(66,133,244,0.18) 0%, rgba(234,67,53,0.08) 50%, transparent 70%)'
            : 'radial-gradient(circle, rgba(66,133,244,0.12) 0%, rgba(251,188,5,0.06) 50%, transparent 70%)',
          boxShadow: '0 0 80px rgba(66,133,244,0.15)',
        }}
      />
    </div>
  )
}

export function HeroCanvas() {
  const { theme } = useTheme()
  const reducedMotion = usePrefersReducedMotion()
  const tier = useDeviceTier()

  if (tier === 'low' || reducedMotion) {
    return (
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <StaticGlobeFallback theme={theme} />
      </div>
    )
  }

  const quality = QUALITY[tier]

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <Canvas
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 7.4], fov: 45 }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />

        {/* 3D Celestial Wireframe Geodesic Globe from Image 1 */}
        <TerminatorGlobe detail={quality.globeDetail} reducedMotion={reducedMotion} />

        {/* Orbiting Track Satellites with Telemetry Signals */}
        {quality.satellites > 0 && (
          <TrackSatellites maxCount={quality.satellites} reducedMotion={reducedMotion} />
        )}

        {/* Horizon Strip light sweep */}
        <HorizonStrip reducedMotion={reducedMotion} />

        {/* Subtle background ambient constellation */}
        <ParticleField count={quality.particleCount} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
