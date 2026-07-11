"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "../useScrollStore";

function Bar({ x, color, phase }: { x: number; color: string; phase: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const scaleY = 0.5 + Math.abs(Math.sin(t * 0.6 + phase)) * 1.5;
    ref.current.scale.y = scaleY;
    (ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      0.4 + Math.sin(t * 1.2 + phase) * 0.2;
  });

  return (
    <mesh ref={ref} position={[x, 0, 0]}>
      <boxGeometry args={[0.25, 2, 0.25]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
        metalness={0.6}
        roughness={0.2}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

export function StatsGeometry() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const sp = useScrollStore.getState().scrollProgress;
    // visible in the 25-50% scroll range
    const opacity = Math.max(0, Math.min(1, (sp - 0.25) * 8) * Math.min(1, (0.5 - sp) * 8));
    groupRef.current.traverse((obj) => {
      if ((obj as THREE.Mesh).material) {
        ((obj as THREE.Mesh).material as THREE.MeshStandardMaterial).opacity = opacity * 0.7;
      }
    });
  });

  return (
    <group ref={groupRef} position={[4, -1, -3]}>
      <Bar x={-1.2} color="#00d4ff" phase={0} />
      <Bar x={0} color="#7c3aed" phase={1.2} />
      <Bar x={1.2} color="#34d399" phase={2.4} />
    </group>
  );
}
