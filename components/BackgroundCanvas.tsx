import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate random points in a sphere
function generateParticles(count = 2000) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const r = Math.random() * 10 + 2; // Radius
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;

    // Use gold/amber color mostly
    colors[i * 3] = 0.9;     // R
    colors[i * 3 + 1] = 0.7; // G
    colors[i * 3 + 2] = 0.2; // B
  }
  
  return { positions, colors };
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null!);
  const { positions, colors } = useMemo(() => generateParticles(1500), []);
  
  useFrame((state, delta) => {
    // Subtle rotation
    ref.current.rotation.x -= delta / 20;
    ref.current.rotation.y -= delta / 30;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#ffffff"
          vertexColors
          size={0.03}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

export function BackgroundCanvas() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-background">
      {/* Fog/Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-10" />
      
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <fog attach="fog" args={['#1a1d26', 5, 15]} />
        <ParticleField />
      </Canvas>
    </div>
  );
}
