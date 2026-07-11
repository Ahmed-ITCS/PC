"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface OrbitSystemProps {
  centerPosition?: [number, number, number];
  count?: number;
  radius?: number;
  color?: string;
  dotSize?: number;
  speed?: number;
}

export function OrbitSystem({
  centerPosition = [0, 0, 0],
  count = 8,
  radius = 3,
  color = "#0891B2",
  dotSize = 0.08,
  speed = 0.2,
}: OrbitSystemProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const temp = useMemo(() => new THREE.Object3D(), []);
  const col = useMemo(() => new THREE.Color(color), [color]);

  const orbitData = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        angle: (i / count) * Math.PI * 2,
        speed: speed * (0.8 + Math.random() * 0.4),
        yOffset: (Math.random() - 0.5) * 1.0,
        orbitRadius: radius * (0.7 + Math.random() * 0.6),
        wobble: Math.random() * 0.3,
      })),
    [count, radius, speed]
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const data = orbitData[i];
      const angle = data.angle + t * data.speed;
      const x = Math.cos(angle) * data.orbitRadius;
      const z = Math.sin(angle) * data.orbitRadius;
      const y = data.yOffset + Math.sin(t * 0.5 + i) * data.wobble;

      temp.position.set(
        centerPosition[0] + x,
        centerPosition[1] + y,
        centerPosition[2] + z
      );
      temp.scale.setScalar(0.8 + Math.sin(t * 1.5 + i) * 0.2);
      temp.updateMatrix();
      meshRef.current.setMatrixAt(i, temp.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[dotSize, 12, 12]} />
      <meshStandardMaterial
        color={col}
        emissive={col}
        emissiveIntensity={0.3}
        roughness={0.3}
        metalness={0.5}
      />
    </instancedMesh>
  );
}
