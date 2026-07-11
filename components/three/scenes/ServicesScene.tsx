"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ServicePillar } from "../geometric/ServicePillar";

export function ServicesScene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      child.position.y = Math.sin(t * 0.3 + i * 1.5) * 0.15;
    });
  });

  return (
    <group ref={groupRef} position={[0, -4, 0]}>
      <ServicePillar position={[-3, 0, -2]} color="#0891B2" height={3.5} radius={0.35} />
      <ServicePillar position={[0, 0.5, -3]} color="#6366F1" height={3} radius={0.3} />
      <ServicePillar position={[3, 0, -2]} color="#0D9488" height={3.2} radius={0.32} />
    </group>
  );
}
