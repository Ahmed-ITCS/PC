"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "../useScrollStore";

export function GridGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const positions: [number, number, number][] = [
    [-4, 2, -4], [-2, 0, -5], [0, 2.5, -4], [2, -0.5, -5],
    [-3, -2, -4], [1, -2, -5], [4, 1, -4], [-1, 1, -6],
  ];

  const colors = ["#00d4ff", "#7c3aed", "#34d399", "#00d4ff", "#7c3aed", "#34d399", "#00d4ff", "#7c3aed"];

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const sp = useScrollStore.getState().scrollProgress;
    // visible in 50-75% scroll range
    const opacity = Math.max(0, Math.min(1, (sp - 0.5) * 8) * Math.min(1, (0.75 - sp) * 8));

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.rotation.x = t * (0.2 + i * 0.05);
      mesh.rotation.y = t * (0.3 + i * 0.04);
      (mesh.material as THREE.MeshStandardMaterial).opacity = opacity * 0.6;
      (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity =
        0.3 + Math.sin(t * 0.8 + i) * 0.1;
    });
  });

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} ref={(el) => { meshRefs.current[i] = el; }} position={pos}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial
            color={colors[i]}
            emissive={colors[i]}
            emissiveIntensity={0.3}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}
