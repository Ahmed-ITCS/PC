"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { CyberNode, CyberNodeInstances } from "../geometric/CyberNode";
import { DataStream } from "../geometric/DataStream";

const NODES: [number, number, number][] = [
  [0, 2.8, 0],
  [2.4, 1.4, 1.2],
  [2.4, -1.4, -0.6],
  [0, -2.8, 0.8],
  [-2.4, -1.4, -0.6],
  [-2.4, 1.4, 1.2],
  [0, 0, 0],
  [3.5, 0, -1],
  [-3.5, 0, -1],
  [1.2, 3.2, -0.8],
  [-1.2, -3.2, 0.5],
  [0.6, -0.6, 2.5],
];

const CONNECTIONS: [number, number][] = [
  [6, 0], [6, 1], [6, 2], [6, 3], [6, 4], [6, 5],
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
  [0, 2], [1, 3], [2, 4], [3, 5],
  [1, 7], [4, 8], [0, 9], [3, 10], [6, 11],
];

const ACCENT = new THREE.Color("#0891B2");
const ACCENT_DIM = new THREE.Color("#0891B2").multiplyScalar(0.3);

function ConnectionLines() {
  const ref = useRef<THREE.LineSegments>(null);

  const { positions, colors } = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    for (const [a, b] of CONNECTIONS) {
      const pa = NODES[a];
      const pb = NODES[b];
      positions.push(...pa, ...pb);
      colors.push(
        ACCENT_DIM.r, ACCENT_DIM.g, ACCENT_DIM.b,
        ACCENT_DIM.r, ACCENT_DIM.g, ACCENT_DIM.b
      );
    }
    return {
      positions: new Float32Array(positions),
      colors: new Float32Array(colors),
    };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    (ref.current.material as THREE.LineBasicMaterial).opacity = 0.1 + Math.sin(t * 0.7) * 0.05;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.15} depthWrite={false} />
    </lineSegments>
  );
}

function NetworkCluster() {
  const group = useRef<THREE.Group>(null);

  const nonCenterNodes = useMemo(() => NODES.filter((_, i) => i !== 6), []);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.2 + pointer.x * 0.2;
    group.current.rotation.x = Math.sin(t * 0.15) * 0.15 + pointer.y * -0.15;
  });

  return (
    <group ref={group}>
      <ConnectionLines />
      <CyberNodeInstances positions={nonCenterNodes} color="#0891B2" size={0.06} />
      <CyberNode position={[0, 0, 0]} color="#0891B2" isCenter />
    </group>
  );
}

export function HeroScene() {
  return (
    <group position={[0, -1, 0]}>
      <NetworkCluster />

      {/* Data streams flowing upward */}
      <DataStream position={[-4, 0, -3]} count={80} color="#0891B2" speed={1.0} opacity={0.15} />
      <DataStream position={[4, 0, -3]} count={80} color="#6366F1" speed={0.7} opacity={0.12} />
      <DataStream position={[0, 0, -5]} count={60} color="#0891B2" speed={0.5} opacity={0.1} />

      {/* Orbiting rings */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[4, 0.015, 8, 64]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.04} depthWrite={false} blending={THREE.NormalBlending} />
      </mesh>
      <mesh rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[5.5, 0.01, 8, 64]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.03} depthWrite={false} blending={THREE.NormalBlending} />
      </mesh>
    </group>
  );
}
