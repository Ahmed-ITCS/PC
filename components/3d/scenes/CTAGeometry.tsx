"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "../useScrollStore";

export function CTAGeometry() {
  const torusRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const sp = useScrollStore.getState().scrollProgress;
    // visible in 75-100% scroll range
    const opacity = Math.max(0, Math.min(1, (sp - 0.75) * 8));

    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.2;
      torusRef.current.rotation.y = t * 0.35;
      (torusRef.current.material as THREE.MeshStandardMaterial).opacity = opacity * 0.5;
      (torusRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.5 + Math.sin(t * 1.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      <mesh ref={torusRef}>
        <torusKnotGeometry args={[1.5, 0.35, 80, 12]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.1}
          transparent
          opacity={0.5}
          wireframe
        />
      </mesh>
    </group>
  );
}
