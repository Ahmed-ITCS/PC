"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 150;

export function ProblemsScene() {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);
  const progressRef = useRef(0);

  const { scattered, target } = useMemo(() => {
    const scattered = new Float32Array(PARTICLE_COUNT * 3);
    const target = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      scattered[i3] = (Math.random() - 0.5) * 14;
      scattered[i3 + 1] = (Math.random() - 0.5) * 6;
      scattered[i3 + 2] = (Math.random() - 0.5) * 8;

      const cols = 10;
      const row = Math.floor(i / cols);
      const col = i % cols;
      target[i3] = (col - cols / 2) * 0.6;
      target[i3 + 1] = (row - 3) * 0.6;
      target[i3 + 2] = Math.sin(col * 0.5) * 0.5;
    }

    return { scattered, target };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();

    progressRef.current = Math.sin(t * 0.25) * 0.5 + 0.5;
    const p = progressRef.current;

    const posAttr = ref.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      arr[i3] = scattered[i3] + (target[i3] - scattered[i3]) * p;
      arr[i3 + 1] = scattered[i3 + 1] + (target[i3 + 1] - scattered[i3 + 1]) * p;
      arr[i3 + 2] = scattered[i3 + 2] + (target[i3 + 2] - scattered[i3 + 2]) * p;

      arr[i3] += Math.sin(t * 2 + i * 0.3) * 0.03 * (1 - p);
      arr[i3 + 1] += Math.cos(t * 1.5 + i * 0.5) * 0.03 * (1 - p);
    }

    posAttr.needsUpdate = true;

    if (matRef.current) {
      matRef.current.opacity = 0.2 + p * 0.15;
    }
  });

  return (
    <group position={[0, -12, 0]}>
      <points ref={ref}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[scattered.slice(), 3]} />
        </bufferGeometry>
        <pointsMaterial
          ref={matRef}
          color="#0891B2"
          size={0.035}
          transparent
          opacity={0.3}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
    </group>
  );
}
