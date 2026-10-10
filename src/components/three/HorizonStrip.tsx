import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useTheme } from '../../context/ThemeContext'
import { getThreeColors } from '../../lib/theme'

interface HorizonStripProps {
  reducedMotion?: boolean
}

const STRIP_Y = -3.4
const STRIP_WIDTH = 26
const STRIP_HEIGHT = 0.1
const BLOOM_HEIGHT = 3.4
const INTENSITY_LERP_SPEED = 1 / 0.42 // ~420ms settle

const stripVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const stripFragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uIntensity;
  varying vec2 vUv;

  void main() {
    vec3 color;
    if (vUv.x < 0.52) {
      color = mix(uColorA, uColorB, vUv.x / 0.52);
    } else {
      color = mix(uColorB, uColorC, (vUv.x - 0.52) / 0.48);
    }
    gl_FragColor = vec4(color * uIntensity, 1.0);
  }
`

const bloomVertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const bloomFragmentShader = /* glsl */ `
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uIntensity;
  varying vec2 vUv;

  void main() {
    vec3 color;
    if (vUv.x < 0.52) {
      color = mix(uColorA, uColorB, vUv.x / 0.52);
    } else {
      color = mix(uColorB, uColorC, (vUv.x - 0.52) / 0.48);
    }
    float falloff = pow(1.0 - vUv.y, 2.2);
    float alpha = falloff * 0.35 * uIntensity;
    gl_FragColor = vec4(color, alpha);
  }
`

export function HorizonStrip({ reducedMotion = false }: HorizonStripProps) {
  const { theme } = useTheme()

  const uniforms = useMemo(
    () => ({
      uColorA: { value: new THREE.Color() },
      uColorB: { value: new THREE.Color() },
      uColorC: { value: new THREE.Color() },
      uIntensity: { value: 1 },
    }),
    [],
  )

  const currentIntensity = useRef(1)

  useMemo(() => {
    const colors = getThreeColors(theme)
    uniforms.uColorA.value.copy(colors.accent2)
    uniforms.uColorB.value.copy(colors.accent)
    uniforms.uColorC.value.copy(colors.warning)
  }, [uniforms])

  useFrame((_state, delta) => {
    const colors = getThreeColors(theme)
    const lerpAmt = Math.min(1, INTENSITY_LERP_SPEED * delta)
    uniforms.uColorA.value.lerp(colors.accent2, lerpAmt)
    uniforms.uColorB.value.lerp(colors.accent, lerpAmt)
    uniforms.uColorC.value.lerp(colors.warning, lerpAmt)

    // Light mode ("dawn") doubles the intensity and warms the strip — the
    // toggle's visual payoff: the sun is coming up.
    const targetIntensity = theme === 'dawn' ? 2.0 : 1.0
    currentIntensity.current = THREE.MathUtils.lerp(
      currentIntensity.current,
      targetIntensity,
      reducedMotion ? 1 : lerpAmt,
    )
    uniforms.uIntensity.value = currentIntensity.current
  })

  return (
    <group position={[0, STRIP_Y, 0]}>
      <mesh>
        <planeGeometry args={[STRIP_WIDTH, STRIP_HEIGHT]} />
        <shaderMaterial
          vertexShader={stripVertexShader}
          fragmentShader={stripFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, BLOOM_HEIGHT / 2, -0.01]}>
        <planeGeometry args={[STRIP_WIDTH, BLOOM_HEIGHT]} />
        <shaderMaterial
          vertexShader={bloomVertexShader}
          fragmentShader={bloomFragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
    </group>
  )
}
