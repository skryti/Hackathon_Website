import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { GOOGLE_COLORS } from '../../lib/theme'

interface ParticleFieldProps {
  count?: number
  reducedMotion?: boolean
}

const INNER_RADIUS = 3.5
const OUTER_RADIUS = 8.5
const FIELD_SPIN_SPEED = 0.015
const WOBBLE_SPEED = 0.4
const WOBBLE_AMPLITUDE = 0.08

function mulberry32(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function ParticleField({ count = 1200, reducedMotion = false }: ParticleFieldProps) {
  const groupRef = useRef<THREE.Group>(null)
  const geometryRef = useRef<THREE.BufferGeometry>(null)

  const { basePositions, offsets } = useMemo(() => {
    const rand = mulberry32(4285)
    const basePositions = new Float32Array(count * 3)
    const offsets = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const r = INNER_RADIUS + rand() * (OUTER_RADIUS - INNER_RADIUS)
      const theta = rand() * Math.PI * 2
      const phi = Math.acos(2 * rand() - 1)

      basePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      basePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      basePositions[i * 3 + 2] = r * Math.cos(phi)

      offsets[i] = rand() * Math.PI * 2
    }

    return { basePositions, offsets }
  }, [count])

  const positions = useMemo(() => basePositions.slice(), [basePositions])

  // Google 4-Color constellation particles
  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3)
    const googleHexes = [
      GOOGLE_COLORS.blue,
      GOOGLE_COLORS.red,
      GOOGLE_COLORS.yellow,
      GOOGLE_COLORS.green,
    ]
    const c = new THREE.Color()

    for (let i = 0; i < count; i++) {
      const chosen = googleHexes[i % 4]
      c.set(chosen)
      arr[i * 3] = c.r
      arr[i * 3 + 1] = c.g
      arr[i * 3 + 2] = c.b
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.y += FIELD_SPIN_SPEED * delta
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05
    }

    if (reducedMotion) return

    const geometry = geometryRef.current
    if (!geometry) return
    const positionAttr = geometry.getAttribute('position') as THREE.BufferAttribute
    const t = state.clock.elapsedTime
    for (let i = 0; i < count; i++) {
      const baseY = basePositions[i * 3 + 1]
      positionAttr.array[i * 3 + 1] =
        baseY + Math.sin(t * WOBBLE_SPEED + offsets[i]) * WOBBLE_AMPLITUDE
    }
    positionAttr.needsUpdate = true
  })

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.024}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
