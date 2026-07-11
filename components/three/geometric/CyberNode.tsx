"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CyberNodeProps {
  position: [number, number, number];
  color?: string;
  size?: number;
  isCenter?: boolean;
}

export function CyberNode({ position, color = "#00d4ff", size = 0.06, isCenter = false }: CyberNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  const col = useMemo(() => new THREE.Color(color), [color]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = Math.sin(t * 1.2 + phase) * 0.5 + 0.5;

    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + pulse * 0.6);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.06 + pulse * 0.1;
    }

    if (meshRef.current && isCenter) {
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6 + pulse * 0.6;
    }
  });

  const glowSize = isCenter ? 0.3 : 0.18;
  const coreSize = isCenter ? 0.1 : size;

  return (
    <group position={position}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[glowSize, 12, 12]} />
        <meshBasicMaterial color={col} transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <mesh ref={meshRef}>
        <sphereGeometry args={[coreSize, 16, 16]} />
        <meshStandardMaterial
          color={col}
          emissive={col}
          emissiveIntensity={isCenter ? 0.9 : 0.5}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
    </group>
  );
}

interface CyberNodeInstancesProps {
  positions: [number, number, number][];
  color?: string;
  size?: number;
}

export function CyberNodeInstances({ positions, color = "#00d4ff", size = 0.06 }: CyberNodeInstancesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const glowRef = useRef<THREE.InstancedMesh>(null);
  const temp = useMemo(() => new THREE.Object3D(), []);
  const col = useMemo(() => new THREE.Color(color), [color]);

  const phases = useMemo(() => positions.map(() => Math.random() * Math.PI * 2), [positions]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    for (let i = 0; i < positions.length; i++) {
      const pulse = Math.sin(t * 1.2 + phases[i]) * 0.5 + 0.5;
      const pos = positions[i];

      if (meshRef.current) {
        temp.position.set(pos[0], pos[1], pos[2]);
        temp.scale.setScalar(1);
        temp.updateMatrix();
        meshRef.current.setMatrixAt(i, temp.matrix);
      }

      if (glowRef.current) {
        temp.position.set(pos[0], pos[1], pos[2]);
        temp.scale.setScalar(1 + pulse * 0.6);
        temp.updateMatrix();
        glowRef.current.setMatrixAt(i, temp.matrix);
      }
    }

    if (meshRef.current) meshRef.current.instanceMatrix.needsUpdate = true;
    if (glowRef.current) glowRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <instancedMesh ref={glowRef} args={[undefined, undefined, positions.length]}>
        <sphereGeometry args={[0.18, 10, 10]} />
        <meshBasicMaterial color={col} transparent opacity={0.08} depthWrite={false} />
      </instancedMesh>
      <instancedMesh ref={meshRef} args={[undefined, undefined, positions.length]}>
        <sphereGeometry args={[size, 14, 14]} />
        <meshStandardMaterial color={col} emissive={col} emissiveIntensity={0.5} roughness={0.2} metalness={0.6} />
      </instancedMesh>
    </>
  );
}
