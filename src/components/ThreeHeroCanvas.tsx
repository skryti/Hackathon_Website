import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

// Subtle Floating Geometric Shape for Periphery Accents
function FloatingShape({
  position,
  color,
  shapeType,
  scale = 1,
  speed = 1.2,
}: {
  position: [number, number, number];
  color: string;
  shapeType: 'icosahedron' | 'torus' | 'octahedron' | 'box';
  scale?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005 * speed;
      meshRef.current.rotation.y += 0.008 * speed;
      // Slight mouse react
      meshRef.current.position.x = position[0] + state.pointer.x * 0.4;
      meshRef.current.position.y = position[1] + state.pointer.y * 0.4;
    }
  });

  return (
    <Float speed={speed * 1.5} rotationIntensity={1} floatIntensity={1.5} position={position}>
      <mesh ref={meshRef} scale={scale}>
        {shapeType === 'icosahedron' && <icosahedronGeometry args={[0.9, 0]} />}
        {shapeType === 'torus' && <torusGeometry args={[0.7, 0.22, 16, 32]} />}
        {shapeType === 'octahedron' && <octahedronGeometry args={[0.85, 0]} />}
        {shapeType === 'box' && <boxGeometry args={[0.8, 0.8, 0.8]} />}

        <MeshDistortMaterial
          color={color}
          distort={0.2}
          speed={1.5}
          roughness={0.25}
          metalness={0.7}
          emissive={color}
          emissiveIntensity={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

// Subtle Particle Constellation Field
function ParticleConstellation({ isDark }: { isDark: boolean }) {
  const count = 140;
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const googleColors = [
      new THREE.Color('#4285F4'), // Blue
      new THREE.Color('#EA4335'), // Red
      new THREE.Color('#FBBC05'), // Yellow
      new THREE.Color('#34A853'), // Green
    ];

    for (let i = 0; i < count; i++) {
      // Disperse more towards edges so center stays readable
      const angle = Math.random() * Math.PI * 2;
      const radius = 3 + Math.random() * 9;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * (radius * 0.6);
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;

      const randomColor = googleColors[Math.floor(Math.random() * googleColors.length)];
      col[i * 3] = randomColor.r;
      col[i * 3 + 1] = randomColor.g;
      col[i * 3 + 2] = randomColor.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      // Gentle mouse parallax
      pointsRef.current.position.x = THREE.MathUtils.lerp(
        pointsRef.current.position.x,
        state.pointer.x * 0.8,
        0.04
      );
      pointsRef.current.position.y = THREE.MathUtils.lerp(
        pointsRef.current.position.y,
        state.pointer.y * 0.8,
        0.04
      );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={isDark ? 0.08 : 0.1}
        vertexColors
        transparent
        opacity={isDark ? 0.6 : 0.45}
        sizeAttenuation
      />
    </points>
  );
}

export const ThreeHeroCanvas: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden"
      style={{
        maskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 95%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 80% at 50% 50%, black 40%, transparent 95%)',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={isDark ? 0.7 : 0.9} />
        <directionalLight position={[8, 8, 5]} intensity={1.5} />
        <pointLight position={[-8, -6, -2]} color="#4285F4" intensity={1} />
        <pointLight position={[8, -6, 2]} color="#EA4335" intensity={1} />

        <ParticleConstellation isDark={isDark} />

        {/* 4 Google Floating Shapes positioned on the outer perimeter to NEVER occlude center text or buttons */}
        {/* Top-Left: Google Blue Icosahedron */}
        <FloatingShape position={[-6.2, 2.2, -3]} color="#4285F4" shapeType="icosahedron" scale={0.75} speed={1.1} />
        
        {/* Top-Right: Google Red Torus */}
        <FloatingShape position={[6.4, 2.3, -3.5]} color="#EA4335" shapeType="torus" scale={0.8} speed={1.3} />
        
        {/* Bottom-Left: Google Yellow Octahedron */}
        <FloatingShape position={[-6.5, -2.6, -2.5]} color="#FBBC05" shapeType="octahedron" scale={0.7} speed={0.9} />
        
        {/* Bottom-Right: Google Green Cube */}
        <FloatingShape position={[6.6, -2.5, -3]} color="#34A853" shapeType="box" scale={0.7} speed={1.2} />
      </Canvas>
    </div>
  );
};
