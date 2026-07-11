"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SPHERE_COUNT = 120;
const SPHERES = 3;
const SPHERE_RADIUS = 1.5;

function StatSphere({ index }: { index: number }) {
  const ref = useRef<THREE.Points>(null);
  const matRef = useRef<THREE.PointsMaterial>(null);

  const angle = (index / SPHERES) * Math.PI * 2 - Math.PI / 2;
  const xOffset = Math.cos(angle) * 3.5;

  const { scattered, target } = useMemo(() => {
    const scattered = new Float32Array(SPHERE_COUNT * 3);
    const target = new Float32Array(SPHERE_COUNT * 3);

    for (let i = 0; i < SPHERE_COUNT; i++) {
      const i3 = i * 3;
      scattered[i3] = (Math.random() - 0.5) * 12;
      scattered[i3 + 1] = (Math.random() - 0.5) * 6;
      scattered[i3 + 2] = (Math.random() - 0.5) * 8;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = SPHERE_RADIUS * (0.5 + Math.random() * 0.5);
      target[i3] = r * Math.sin(phi) * Math.cos(theta);
      target[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      target[i3 + 2] = r * Math.cos(phi);
    }

    return { scattered, target };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const p = Math.min(1, Math.max(0, (t - 0.5) * 0.5)); // converge over time

    const posAttr = ref.current.geometry.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < SPHERE_COUNT; i++) {
      const i3 = i * 3;
      arr[i3] = scattered[i3] + (target[i3] - scattered[i3]) * p + xOffset;
      arr[i3 + 1] = scattered[i3 + 1] + (target[i3 + 1] - scattered[i3 + 1]) * p;
      arr[i3 + 2] = scattered[i3 + 2] + (target[i3 + 2] - scattered[i3 + 2]) * p;

      arr[i3] += Math.sin(t * 0.5 + i * 0.1) * 0.01 * (1 - p);
      arr[i3 + 1] += Math.cos(t * 0.4 + i * 0.15) * 0.01 * (1 - p);
    }

    posAttr.needsUpdate = true;

    if (matRef.current) {
      matRef.current.opacity = 0.3 + p * 0.35;
    }
  });

  const colors = useMemo(() => ["#00d4ff", "#7c3aed", "#34d399"], []);
  const col = useMemo(() => new THREE.Color(colors[index % colors.length]), [colors, index]);

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[scattered.slice(), 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        color={col}
        size={0.04}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function StatsScene() {
  return (
    <group position={[0, -24, 0]}>
      {Array.from({ length: SPHERES }, (_, i) => (
        <StatSphere key={i} index={i} />
      ))}

      {/* Ring halos */}
      <mesh position={[-3.5, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[SPHERE_RADIUS + 0.3, 0.01, 8, 48]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.1} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[SPHERE_RADIUS + 0.3, 0.01, 8, 48]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.1} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[3.5, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[SPHERE_RADIUS + 0.3, 0.01, 8, 48]} />
        <meshBasicMaterial color="#34d399" transparent opacity={0.1} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>

      <pointLight position={[0, 0, 3]} intensity={0.8} color="#00d4ff" distance={12} decay={2} />
    </group>
  );
}
