"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useHologramMaterial } from "../materials/HologramMaterial";

interface ServicePillarProps {
  position: [number, number, number];
  color?: string;
  height?: number;
  radius?: number;
  label?: string;
}

export function ServicePillar({
  position,
  color = "#00d4ff",
  height = 3,
  radius = 0.4,
}: ServicePillarProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { material } = useHologramMaterial({
    color,
    opacity: 0.5,
    scanSpeed: 1.5,
    fresnelPower: 2.0,
    wobbleAmount: 0.01,
  });

  const ringRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  const col = useMemo(() => new THREE.Color(color), [color]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = Math.sin(t * 0.8 + phase) * 0.5 + 0.5;

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.2 + phase) * 0.1;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.3;
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.15 + pulse * 0.15;
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + pulse * 0.3);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.04 + pulse * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Main pillar */}
      <mesh material={material}>
        <cylinderGeometry args={[radius * 0.8, radius, height, 6, 1, true]} />
      </mesh>

      {/* Core glow */}
      <mesh ref={glowRef}>
        <cylinderGeometry args={[radius * 0.3, radius * 0.3, height * 0.8, 8]} />
        <meshBasicMaterial color={col} transparent opacity={0.06} depthWrite={false} />
      </mesh>

      {/* Orbiting ring */}
      <mesh ref={ringRef} position={[0, 0, 0]}>
        <torusGeometry args={[radius * 1.5, 0.01, 8, 32]} />
        <meshBasicMaterial color={col} transparent opacity={0.2} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      {/* Top cap glow */}
      <pointLight position={[0, height / 2, 0]} intensity={0.5} color={color} distance={4} decay={2} />
    </group>
  );
}
