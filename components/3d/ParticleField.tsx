"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "./useScrollStore";
import { DeviceTier } from "./useDeviceTier";

const COUNTS: Record<DeviceTier, number> = {
  high: 3000,
  medium: 1500,
  low: 500,
};

interface Props {
  tier: DeviceTier;
}

export function ParticleField({ tier }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const count = COUNTS[tier];

  const { basePositions, phases } = useMemo(() => {
    const basePositions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 8 + Math.random() * 14;
      basePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      basePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      basePositions[i * 3 + 2] = r * Math.cos(phi);
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { basePositions, phases };
  }, [count]);

  const animPositions = useRef(basePositions.slice());

  useEffect(() => {
    if (!pointsRef.current) return;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(animPositions.current, 3));
    pointsRef.current.geometry = geo;
  }, [count]);

  useFrame(({ clock }) => {
    if (!groupRef.current || !pointsRef.current) return;
    const t = clock.getElapsedTime();
    const scrollY = useScrollStore.getState().scrollY;

    groupRef.current.position.y = scrollY * -0.004;

    const pos = animPositions.current;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] =
        basePositions[i * 3 + 1] + Math.sin(t * 0.4 + phases[i]) * 0.4;
    }

    const attr = pointsRef.current.geometry?.attributes
      .position as THREE.BufferAttribute | undefined;
    if (attr) {
      attr.array.set(pos);
      attr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      <points ref={pointsRef}>
        <bufferGeometry />
        <pointsMaterial
          color="#00d4ff"
          size={0.035}
          sizeAttenuation
          transparent
          opacity={0.28}
          depthWrite={false}
        />
      </points>
    </group>
  );
}
