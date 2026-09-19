import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CommunityGlobeProps {
  reducedMotion?: boolean;
}

export const CommunityGlobe: React.FC<CommunityGlobeProps> = ({ reducedMotion = false }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Generate particle constellation
  const particleCount = 240;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const cols = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color('#3b82f6'); // Blue
    const color2 = new THREE.Color('#f59e0b'); // Amber
    const color3 = new THREE.Color('#10b981'); // Emerald
    const palette = [color1, color2, color3];

    for (let i = 0; i < particleCount; i++) {
      // Golden spiral distribution on sphere
      const phi = Math.acos(1 - 2 * (i + 0.5) / particleCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const pseudo = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      const radius = 2.4 + (Math.abs(pseudo) - 0.5) * 0.6;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = palette[i % palette.length];
      cols[i * 3] = chosenColor.r;
      cols[i * 3 + 1] = chosenColor.g;
      cols[i * 3 + 2] = chosenColor.b;
    }

    return [pos, cols];
  }, [particleCount]);

  // Satellite node positions (Education, Animal Care, Relief, Hope)
  const satellites = useMemo(() => [
    { label: 'Education', pos: [2.1, 0.8, 0.5], color: '#3b82f6' },
    { label: 'Animal Care', pos: [-1.8, -1.2, 0.9], color: '#f43f5e' },
    { label: 'Relief', pos: [0.6, 2.0, -1.0], color: '#f59e0b' },
    { label: 'Community', pos: [-1.2, 1.4, -1.5], color: '#10b981' }
  ], []);

  useFrame((state, delta) => {
    if (reducedMotion) return;

    // Smooth continuous auto-rotation
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
      
      // Gentle mouse parallax tilt
      const targetX = (state.pointer.x * Math.PI) / 8;
      const targetY = -(state.pointer.y * Math.PI) / 8;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetX * 0.5, 0.05);
    }

    // Counter-rotation of concentric orbit rings
    if (ring1Ref.current) ring1Ref.current.rotation.z += delta * 0.15;
    if (ring2Ref.current) ring2Ref.current.rotation.x -= delta * 0.12;

    // Floating breathing pulse on core
    if (coreRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Ethereal Core Sphere */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshStandardMaterial
          color="#1e3a8a"
          emissive="#2563eb"
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={0.8}
          wireframe={false}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Wireframe Geometric Shell */}
      <mesh>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial
          color="#60a5fa"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Orbit Ring 1 - Golden Latitude */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.0, 0.018, 16, 100]} />
        <meshStandardMaterial
          color="#f59e0b"
          emissive="#fbbf24"
          emissiveIntensity={0.6}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Orbit Ring 2 - Sky Blue Longitude */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[2.3, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Floating Constellation Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.065}
          vertexColors
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>

      {/* Satellite Community Nodes */}
      {satellites.map((sat, i) => (
        <group key={i} position={sat.pos as [number, number, number]}>
          <mesh>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial
              color={sat.color}
              emissive={sat.color}
              emissiveIntensity={0.8}
              roughness={0.1}
            />
          </mesh>
          {/* Halo ring around satellite node */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.22, 0.01, 8, 32]} />
            <meshBasicMaterial color={sat.color} transparent opacity={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
