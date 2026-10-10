import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { GOOGLE_COLORS } from '../../lib/theme'

interface FloatingShapesProps {
  reducedMotion?: boolean
}

export function FloatingShapes({ reducedMotion = false }: FloatingShapesProps) {
  const groupRef = useRef<THREE.Group>(null)

  // References for individual shapes to animate rotation
  const torusRef = useRef<THREE.Mesh>(null)
  const cubeRef = useRef<THREE.Mesh>(null)
  const icosahedronRef = useRef<THREE.Mesh>(null)
  const octahedronRef = useRef<THREE.Mesh>(null)
  const sphereRingRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (reducedMotion) return

    const t = state.clock.elapsedTime
    const pointer = state.pointer

    // Parallax reaction to mouse movements / gyroscope
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.45,
        delta * 2.5,
      )
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.35,
        delta * 2.5,
      )
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        pointer.x * 0.6,
        delta * 2.0,
      )
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        pointer.y * 0.5,
        delta * 2.0,
      )
    }

    // Google Blue Torus: floating on upper-left
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.8
      torusRef.current.rotation.y += delta * 0.5
      torusRef.current.position.y = 1.8 + Math.sin(t * 1.2) * 0.25
    }

    // Google Red Cube: floating on bottom-right
    if (cubeRef.current) {
      cubeRef.current.rotation.x += delta * 0.6
      cubeRef.current.rotation.z += delta * 0.7
      cubeRef.current.position.y = -1.6 + Math.cos(t * 1.1) * 0.2
    }

    // Google Yellow Icosahedron: floating on upper-right
    if (icosahedronRef.current) {
      icosahedronRef.current.rotation.y += delta * 0.9
      icosahedronRef.current.rotation.z += delta * 0.4
      icosahedronRef.current.position.y = 1.5 + Math.sin(t * 1.4 + 1) * 0.22
    }

    // Google Green Octahedron / Knot: floating on bottom-left
    if (octahedronRef.current) {
      octahedronRef.current.rotation.y += delta * 0.7
      octahedronRef.current.rotation.x += delta * 0.5
      octahedronRef.current.position.y = -1.4 + Math.sin(t * 1.3 + 2) * 0.2
    }

    // Central cybernetic orbit ring
    if (sphereRingRef.current) {
      sphereRingRef.current.rotation.z += delta * 0.3
      sphereRingRef.current.rotation.x = Math.sin(t * 0.5) * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      {/* 1. Google Blue Torus (#4285F4) */}
      <mesh ref={torusRef} position={[-3.2, 1.8, -0.8]}>
        <torusGeometry args={[0.7, 0.22, 24, 48]} />
        <meshStandardMaterial
          color={GOOGLE_COLORS.blue}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
          emissive={GOOGLE_COLORS.blue}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* 2. Google Red Cube (#EA4335) */}
      <mesh ref={cubeRef} position={[3.2, -1.6, -0.5]}>
        <boxGeometry args={[0.9, 0.9, 0.9]} />
        <meshStandardMaterial
          color={GOOGLE_COLORS.red}
          roughness={0.25}
          metalness={0.7}
          emissive={GOOGLE_COLORS.red}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* 3. Google Yellow Icosahedron (#FBBC05) */}
      <mesh ref={icosahedronRef} position={[3.0, 1.6, -1.0]}>
        <icosahedronGeometry args={[0.75, 0]} />
        <meshStandardMaterial
          color={GOOGLE_COLORS.yellow}
          roughness={0.2}
          metalness={0.85}
          emissive={GOOGLE_COLORS.yellow}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* 4. Google Green Octahedron (#34A853) */}
      <mesh ref={octahedronRef} position={[-2.9, -1.5, -0.6]}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color={GOOGLE_COLORS.green}
          roughness={0.25}
          metalness={0.75}
          emissive={GOOGLE_COLORS.green}
          emissiveIntensity={0.25}
        />
      </mesh>

      {/* 5. Glowing Central Cyber Orbit Ring */}
      <mesh ref={sphereRingRef} position={[0, 0, -2.5]}>
        <torusGeometry args={[3.8, 0.04, 16, 100]} />
        <meshBasicMaterial
          color={GOOGLE_COLORS.blue}
          transparent
          opacity={0.4}
        />
      </mesh>
    </group>
  )
}
