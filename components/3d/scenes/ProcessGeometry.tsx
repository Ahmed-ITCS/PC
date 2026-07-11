"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "../useScrollStore";

export function ProcessGeometry() {
  const groupRef = useRef<THREE.Group>(null);
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    const sp = useScrollStore.getState().scrollProgress;
    // visible in the 35-60% scroll range
    const opacity = Math.max(0, Math.min(1, (sp - 0.35) * 8) * Math.min(1, (0.6 - sp) * 8));

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.rotation.x = t * 0.3 + i * 0.8;
      mesh.rotation.y = t * 0.2 + i * 0.6;
      (mesh.material as THREE.MeshBasicMaterial).opacity = opacity * 0.35;
    });
  });

  const positions: [number, number, number][] = [
    [-5, 2, -4], [-3, -1, -5], [3, 1.5, -4], [5, -1.5, -5],
  ];

  return (
    <group ref={groupRef}>
      {positions.map((pos, i) => (
        <mesh key={i} ref={(el) => { meshRefs.current[i] = el; }} position={pos}>
          <octahedronGeometry args={[0.3 + i * 0.1, 0]} />
          <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.35} />
        </mesh>
      ))}
    </group>
  );
}
