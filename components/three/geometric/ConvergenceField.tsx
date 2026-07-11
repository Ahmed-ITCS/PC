"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ConvergenceFieldProps {
  position?: [number, number, number];
  count?: number;
  color?: string;
  sphereRadius?: number;
  size?: number;
}

export function ConvergenceField({
  position = [0, 0, 0],
  count = 300,
  color = "#0891B2",
  sphereRadius = 2.5,
  size = 0.035,
}: ConvergenceFieldProps) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);
  const progressRef = useRef(0);

  const col = useMemo(() => new THREE.Color(color), [color]);

  const { scattered, target } = useMemo(() => {
    const scattered = new Float32Array(count * 3);
    const target = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Scattered positions
      scattered[i3] = (Math.random() - 0.5) * 16;
      scattered[i3 + 1] = (Math.random() - 0.5) * 8;
      scattered[i3 + 2] = (Math.random() - 0.5) * 6;

      // Target: sphere distribution
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = sphereRadius * (0.6 + Math.random() * 0.4);
      target[i3] = r * Math.sin(phi) * Math.cos(theta);
      target[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      target[i3 + 2] = r * Math.cos(phi);
    }

    return { scattered, target };
  }, [count, sphereRadius]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();

    // Oscillate convergence: converge -> scatter -> converge
    progressRef.current = (Math.sin(t * 0.3) * 0.5 + 0.5);
    const progress = progressRef.current;

    const posAttr = ref.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3] = scattered[i3] + (target[i3] - scattered[i3]) * progress;
      arr[i3 + 1] = scattered[i3 + 1] + (target[i3 + 1] - scattered[i3 + 1]) * progress;
      arr[i3 + 2] = scattered[i3 + 2] + (target[i3 + 2] - scattered[i3 + 2]) * progress;

      // Add wobble
      arr[i3] += Math.sin(t * 0.5 + i * 0.1) * 0.02 * (1 - progress);
      arr[i3 + 1] += Math.cos(t * 0.4 + i * 0.15) * 0.02 * (1 - progress);
    }

    posAttr.needsUpdate = true;

    if (matRef.current) {
      matRef.current.opacity = 0.4 + progress * 0.3;
    }
  });

  return (
    <points ref={ref} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[scattered.slice(), 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        color={col}
        size={size}
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}
