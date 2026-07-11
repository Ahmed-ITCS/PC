"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { DestinationPlatform } from "../geometric/DestinationPlatform";

function CalmParticles() {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  const { positions, phases } = useMemo(() => {
    const count = 80;
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 6;
      positions[i3 + 2] = (Math.random() - 0.5) * 8;
      phases[i] = Math.random() * Math.PI * 2;
    }

    return { positions, phases };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const posAttr = ref.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < 80; i++) {
      const i3 = i * 3;
      arr[i3] += Math.sin(t * 0.2 + phases[i]) * 0.001;
      arr[i3 + 1] += Math.cos(t * 0.15 + phases[i]) * 0.0005;
    }

    posAttr.needsUpdate = true;

    if (matRef.current) {
      matRef.current.opacity = 0.3 * (0.8 + Math.sin(t * 0.3) * 0.2);
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        color="#00d4ff"
        size={0.025}
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function ContactScene() {
  return (
    <group position={[0, -28, 0]}>
      <DestinationPlatform position={[0, -1, 0]} color="#00d4ff" radius={3} />
      <CalmParticles />
    </group>
  );
}
