"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { OrbitSystem } from "../geometric/OrbitSystem";

export function WhyScene() {
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const col = useMemo(() => new THREE.Color("#00d4ff"), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = Math.sin(t * 0.8) * 0.5 + 0.5;

    if (coreRef.current) {
      coreRef.current.rotation.x = t * 0.15;
      coreRef.current.rotation.y = t * 0.2;
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + pulse * 0.4);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.08 + pulse * 0.1;
    }
  });

  return (
    <group position={[0, -20, 0]}>
      {/* Central wireframe polyhedron */}
      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.5}>
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[0.5, 1]} />
          <meshStandardMaterial
            color={col}
            wireframe
            transparent
            opacity={0.4}
            emissive={col}
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      {/* Core glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial color={col} transparent opacity={0.1} depthWrite={false} />
      </mesh>

      {/* Orbiting reason nodes */}
      <OrbitSystem
        centerPosition={[0, 0, 0]}
        count={8}
        radius={3}
        color="#00d4ff"
        dotSize={0.08}
        speed={0.2}
      />

      <pointLight position={[0, 0, 0]} intensity={0.8} color="#00d4ff" distance={8} decay={2} />
    </group>
  );
}
