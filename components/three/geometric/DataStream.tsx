"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface DataStreamProps {
  count?: number;
  position?: [number, number, number];
  spread?: [number, number, number];
  color?: string;
  speed?: number;
  opacity?: number;
  size?: number;
}

export function DataStream({
  count = 150,
  position = [0, 0, 0],
  spread = [3, 10, 3],
  color = "#00d4ff",
  speed = 1.0,
  opacity = 0.5,
  size = 0.03,
}: DataStreamProps) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  const { positions: posArray, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * spread[0];
      positions[i3 + 1] = (Math.random() - 0.5) * spread[1];
      positions[i3 + 2] = (Math.random() - 0.5) * spread[2];
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, phases };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const posAttr = ref.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Flow upward
      arr[i3 + 1] += speed * 0.02;
      // Subtle X drift
      arr[i3] += Math.sin(t * 0.5 + phases[i]) * 0.002;

      // Wrap vertically
      if (arr[i3 + 1] > spread[1] / 2) {
        arr[i3 + 1] = -spread[1] / 2;
      }
    }

    posAttr.needsUpdate = true;

    if (matRef.current) {
      matRef.current.opacity = opacity * (0.6 + Math.sin(t * 0.3) * 0.4);
    }
  });

  return (
    <points ref={ref} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[posArray, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
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
