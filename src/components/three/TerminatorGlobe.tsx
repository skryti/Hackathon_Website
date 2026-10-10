import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../../context/ThemeContext'
import { usePointerNormalized } from '../../hooks/usePointerNormalized'
import { getThreeColors } from '../../lib/theme'
import vertexShader from './shaders/terminator.vert.glsl'
import fragmentShader from './shaders/terminator.frag.glsl'

interface TerminatorGlobeProps {
  detail?: number
  reducedMotion?: boolean
}

const AXIAL_TILT = THREE.MathUtils.degToRad(23.4)
const GLOBE_SPIN_SPEED = 0.055 // rad/s, Y axis
const LIGHT_SWEEP_SPEED = 0.018 // rad/s, independent of globe spin
const EDGE_WIDTH = 0.14
const THEME_LERP_SPEED = 1 / 0.42 // ~420ms settle, per spec theme transition

export function TerminatorGlobe({ detail = 2, reducedMotion = false }: TerminatorGlobeProps) {
  const { theme } = useTheme()
  const pointer = usePointerNormalized()

  const outerGroupRef = useRef<THREE.Group>(null)
  const spinGroupRef = useRef<THREE.Group>(null)
  const materialRef = useRef<THREE.ShaderMaterial>(null)
  const innerMaterialRef = useRef<THREE.MeshStandardMaterial>(null)

  const lightAngle = useRef(0)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uLightDir: { value: new THREE.Vector3(1, 0.15, 0) },
      uColorDay: { value: new THREE.Color() },
      uColorNight: { value: new THREE.Color() },
      uColorEdge: { value: new THREE.Color() },
      uEdgeWidth: { value: EDGE_WIDTH },
    }),
    [],
  )

  // Seed uniform colours immediately so the globe never flashes the
  // wrong palette before the first frame runs.
  useMemo(() => {
    const colors = getThreeColors(theme)
    uniforms.uColorDay.value.copy(colors.accent)
    uniforms.uColorNight.value.copy(colors.accent2)
    uniforms.uColorEdge.value.copy(colors.warning)
  }, [uniforms])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    uniforms.uTime.value = t

    // The light direction sweeps around Y independently of the globe's own
    // spin — this is what makes the terminator crawl across the surface.
    lightAngle.current += LIGHT_SWEEP_SPEED * delta
    uniforms.uLightDir.value.set(
      Math.cos(lightAngle.current),
      0.15,
      Math.sin(lightAngle.current),
    )

    // Tween uniform colours toward the current theme's palette.
    const target = getThreeColors(theme)
    const lerpAmt = Math.min(1, THEME_LERP_SPEED * delta)
    uniforms.uColorDay.value.lerp(target.accent, lerpAmt)
    uniforms.uColorNight.value.lerp(target.accent2, lerpAmt)
    uniforms.uColorEdge.value.lerp(target.warning, lerpAmt)
    if (innerMaterialRef.current) {
      innerMaterialRef.current.color.lerp(target.bg, lerpAmt)
    }

    if (spinGroupRef.current && !reducedMotion) {
      spinGroupRef.current.rotation.y += GLOBE_SPIN_SPEED * delta
    }

    if (outerGroupRef.current && !reducedMotion) {
      const p = pointer.current
      const targetY = p.x * 0.1
      const targetX = -p.y * 0.06
      outerGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        outerGroupRef.current.rotation.y,
        targetY,
        0.045,
      )
      outerGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        outerGroupRef.current.rotation.x,
        targetX,
        0.045,
      )
    }
  })

  return (
    <group ref={outerGroupRef}>
      <group ref={spinGroupRef} rotation={[0, 0, AXIAL_TILT]}>
        {/* Inner occluder — makes the wireframe read as a volume, not a cage. */}
        <mesh renderOrder={0}>
          <icosahedronGeometry args={[2.1, detail]} />
          <meshStandardMaterial
            ref={innerMaterialRef}
            flatShading
            transparent
            opacity={0.92}
            depthWrite
          />
        </mesh>

        {/* Terminator wireframe */}
        <mesh renderOrder={1}>
          <icosahedronGeometry args={[2.2, detail]} />
          <shaderMaterial
            ref={materialRef}
            vertexShader={vertexShader}
            fragmentShader={fragmentShader}
            uniforms={uniforms}
            wireframe
            wireframeLinewidth={0.9}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  )
}
