"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface AmbientParticlesProps {
  count?: number;
  spread?: number;
  color?: string;
  size?: number;
  opacity?: number;
  speed?: number;
  quality?: "high" | "medium" | "low";
}

export function AmbientParticles({
  count = 600,
  spread = 14,
  color = "#0891B2",
  size = 0.02,
  opacity = 0.3,
  speed = 0.12,
  quality = "high",
}: AmbientParticlesProps) {
  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  const actualCount = quality === "low" ? Math.floor(count * 0.2) : quality === "medium" ? Math.floor(count * 0.5) : count;

  const { positions, velocities, phases } = useMemo(() => {
    const positions = new Float32Array(actualCount * 3);
    const velocities = new Float32Array(actualCount * 3);
    const phases = new Float32Array(actualCount);

    for (let i = 0; i < actualCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * spread * 2;
      positions[i3 + 1] = (Math.random() - 0.5) * spread * 2;
      positions[i3 + 2] = (Math.random() - 0.5) * spread * 1.5;
      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.001;
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, velocities, phases };
  }, [actualCount, spread]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const posAttr = ref.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < actualCount; i++) {
      const i3 = i * 3;
      arr[i3] += velocities[i3] + Math.sin(t * speed + phases[i]) * 0.001;
      arr[i3 + 1] += velocities[i3 + 1] + Math.cos(t * speed * 0.7 + phases[i]) * 0.001;
      arr[i3 + 2] += velocities[i3 + 2];

      if (Math.abs(arr[i3]) > spread) arr[i3] *= -0.9;
      if (Math.abs(arr[i3 + 1]) > spread) arr[i3 + 1] *= -0.9;
      if (Math.abs(arr[i3 + 2]) > spread * 0.75) arr[i3 + 2] *= -0.9;
    }

    posAttr.needsUpdate = true;

    if (materialRef.current) {
      materialRef.current.opacity = opacity * (0.7 + Math.sin(t * 0.5) * 0.3);
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        color={color}
        size={size}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
