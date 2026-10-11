import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { useScrollApi } from '../layout/SmoothScrollProvider'
import { TRACKS } from '../../data/tracks'
import type { Track } from '../../types'

interface TrackSatellitesProps {
  maxCount?: number
  reducedMotion?: boolean
}

const SATELLITE_RADIUS = 0.075
const HIT_RADIUS = 0.3
const TRAIL_SEGMENTS = 24
const TRAIL_STEP = 0.045 // radians behind the satellite, per segment
const HOVER_SCALE = 1.6
const HOVER_LERP = 0.18
const PACKET_INTERVAL = 4 // seconds, approximate
const PACKET_DURATION = 1.1

function orbitPosition(track: Track, angle: number, out: THREE.Vector3) {
  const inclRad = THREE.MathUtils.degToRad(track.inclinationDeg)
  const flat = track.orbitRadius * Math.sin(angle)
  out.set(
    track.orbitRadius * Math.cos(angle),
    flat * Math.sin(inclRad),
    flat * Math.cos(inclRad),
  )
  return out
}

const trailVertexShader = /* glsl */ `
  attribute float alpha;
  varying float vAlpha;
  void main() {
    vAlpha = alpha;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const trailFragmentShader = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    gl_FragColor = vec4(uColor, vAlpha);
  }
`

interface SatelliteProps {
  track: Track
  phaseOffset: number
  signalColor: THREE.Color
  reducedMotion: boolean
  onScrollTo: (id: string) => void
}

function Satellite({ track, phaseOffset, signalColor, reducedMotion, onScrollTo }: SatelliteProps) {
  const groupRef = useRef<THREE.Group>(null)
  const sphereScaleRef = useRef<THREE.Mesh>(null)
  const trailGeometryRef = useRef<THREE.BufferGeometry>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const angleRef = useRef(phaseOffset)
  const [hovered, setHovered] = useState(false)

  const trailPositions = useMemo(() => new Float32Array(TRAIL_SEGMENTS * 3), [])
  const trailAlphas = useMemo(() => {
    const arr = new Float32Array(TRAIL_SEGMENTS)
    for (let i = 0; i < TRAIL_SEGMENTS; i++) {
      arr[i] = 1 - i / (TRAIL_SEGMENTS - 1)
    }
    return arr
  }, [])

  const uniforms = useMemo(() => ({ uColor: { value: signalColor.clone() } }), [signalColor])

  const scratch = useMemo(() => new THREE.Vector3(), [])

  useFrame((state, delta) => {
    uniforms.uColor.value.copy(signalColor)

    if (!reducedMotion) {
      angleRef.current += ((Math.PI * 2) / track.periodSeconds) * delta
    }

    const pos = orbitPosition(track, angleRef.current, scratch)
    if (groupRef.current) groupRef.current.position.copy(pos)

    const trailGeometry = trailGeometryRef.current
    if (trailGeometry) {
      const positionAttr = trailGeometry.getAttribute('position') as THREE.BufferAttribute
      for (let i = 0; i < TRAIL_SEGMENTS; i++) {
        const trailAngle = angleRef.current - i * TRAIL_STEP
        orbitPosition(track, trailAngle, scratch)
        positionAttr.array[i * 3] = scratch.x
        positionAttr.array[i * 3 + 1] = scratch.y
        positionAttr.array[i * 3 + 2] = scratch.z
      }
      positionAttr.needsUpdate = true
    }

    if (sphereScaleRef.current) {
      const targetScale = hovered ? HOVER_SCALE : 1
      sphereScaleRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        HOVER_LERP,
      )
    }

    void state
  })

  return (
    <>
      <line>
        <bufferGeometry ref={trailGeometryRef}>
          <bufferAttribute attach="attributes-position" args={[trailPositions, 3]} />
          <bufferAttribute attach="attributes-alpha" args={[trailAlphas, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={materialRef}
          vertexShader={trailVertexShader}
          fragmentShader={trailFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </line>

      <group ref={groupRef}>
        <mesh ref={sphereScaleRef}>
          <sphereGeometry args={[SATELLITE_RADIUS, 16, 16]} />
          <meshStandardMaterial
            color={signalColor}
            emissive={signalColor}
            emissiveIntensity={1.4}
            toneMapped={false}
          />
        </mesh>

        <mesh
          onPointerOver={(e) => {
            e.stopPropagation()
            setHovered(true)
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={(e) => {
            e.stopPropagation()
            setHovered(false)
            document.body.style.cursor = 'auto'
          }}
          onClick={(e) => {
            e.stopPropagation()
            onScrollTo(`#track-${track.id}`)
          }}
          visible={false}
        >
          <sphereGeometry args={[HIT_RADIUS, 12, 12]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>

        {hovered ? (
          <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
            <div
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '11px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                padding: '4px 8px',
                borderRadius: '6px',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(10,10,16,0.75)',
                color: '#F4F1EA',
              }}
            >
              {track.code} · {track.name}
            </div>
          </Html>
        ) : null}
      </group>
    </>
  )
}

interface Pulse {
  active: boolean
  trackIndex: number
  startTime: number
}

const GOOGLE_COLORS_THREE = [
  new THREE.Color('#4285F4'), // Blue
  new THREE.Color('#EA4335'), // Red
  new THREE.Color('#FBBC05'), // Yellow
  new THREE.Color('#34A853'), // Green
]

function PacketPulses({
  tracks,
  reducedMotion,
}: {
  tracks: Track[]
  reducedMotion: boolean
}) {
  const pulses = useRef<Pulse[]>(
    Array.from({ length: 3 }, () => ({ active: false, trackIndex: 0, startTime: 0 })),
  )
  const nextSpawn = useRef(PACKET_INTERVAL)
  const meshRefs = useRef<(THREE.Mesh | null)[]>([])
  const scratchStart = useMemo(() => new THREE.Vector3(), [])
  const scratchEnd = useMemo(() => new THREE.Vector3(), [])

  useFrame((state) => {
    if (reducedMotion || tracks.length === 0) return
    const t = state.clock.elapsedTime

    if (t >= nextSpawn.current) {
      const slot = pulses.current.find((p) => !p.active)
      if (slot) {
        slot.active = true
        slot.trackIndex = Math.floor(Math.random() * tracks.length)
        slot.startTime = t
      }
      nextSpawn.current = t + PACKET_INTERVAL * (0.75 + Math.random() * 0.5)
    }

    pulses.current.forEach((pulse, i) => {
      const mesh = meshRefs.current[i]
      if (!mesh) return

      if (!pulse.active) {
        mesh.visible = false
        return
      }

      const progress = (t - pulse.startTime) / PACKET_DURATION
      if (progress >= 1) {
        pulse.active = false
        mesh.visible = false
        return
      }

      const track = tracks[pulse.trackIndex]
      const angle = (t / track.periodSeconds) * Math.PI * 2
      orbitPosition(track, angle, scratchStart)
      scratchEnd.copy(scratchStart).normalize().multiplyScalar(2.2)

      mesh.visible = true
      mesh.position.lerpVectors(scratchStart, scratchEnd, progress)
      const material = mesh.material as THREE.MeshBasicMaterial
      material.color.copy(GOOGLE_COLORS_THREE[pulse.trackIndex % GOOGLE_COLORS_THREE.length])
      material.opacity = 1 - progress
    })
  })

  return (
    <>
      {pulses.current.map((_, i) => (
        <mesh key={i} ref={(ref) => { meshRefs.current[i] = ref }} visible={false}>
          <sphereGeometry args={[0.045, 8, 8]} />
          <meshBasicMaterial
            color="#4285F4"
            transparent
            opacity={0}
            toneMapped={false}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </>
  )
}

export function TrackSatellites({ maxCount = 6, reducedMotion = false }: TrackSatellitesProps) {
  const { scrollTo } = useScrollApi()
  const tracks = useMemo(() => TRACKS.slice(0, maxCount), [maxCount])

  const handleScrollTo = (hash: string) => scrollTo(hash, { offset: -88 })

  return (
    <group>
      {tracks.map((track, i) => (
        <Satellite
          key={track.id}
          track={track}
          phaseOffset={(i / tracks.length) * Math.PI * 2}
          signalColor={GOOGLE_COLORS_THREE[i % GOOGLE_COLORS_THREE.length]}
          reducedMotion={reducedMotion}
          onScrollTo={handleScrollTo}
        />
      ))}
      <PacketPulses tracks={tracks} reducedMotion={reducedMotion} />
    </group>
  )
}
