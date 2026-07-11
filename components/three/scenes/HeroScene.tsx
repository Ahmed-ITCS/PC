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

const ELECTRIC = new THREE.Color("#00d4ff");
const ELECTRIC_DIM = new THREE.Color("#00d4ff").multiplyScalar(0.3);

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
        ELECTRIC_DIM.r, ELECTRIC_DIM.g, ELECTRIC_DIM.b,
        ELECTRIC_DIM.r, ELECTRIC_DIM.g, ELECTRIC_DIM.b
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
    (ref.current.material as THREE.LineBasicMaterial).opacity = 0.15 + Math.sin(t * 0.7) * 0.08;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.2} depthWrite={false} />
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
      <CyberNodeInstances positions={nonCenterNodes} color="#00d4ff" size={0.06} />
      <CyberNode position={[0, 0, 0]} color="#00d4ff" isCenter />
    </group>
  );
}

export function HeroScene() {
  return (
    <group position={[0, -1, 0]}>
      <NetworkCluster />

      {/* Data streams flowing upward */}
      <DataStream position={[-4, 0, -3]} count={100} color="#00d4ff" speed={1.2} opacity={0.3} />
      <DataStream position={[4, 0, -3]} count={100} color="#7c3aed" speed={0.8} opacity={0.25} />
      <DataStream position={[0, 0, -5]} count={80} color="#00d4ff" speed={0.6} opacity={0.2} />

      {/* Orbiting rings */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[4, 0.015, 8, 64]} />
        <meshBasicMaterial color={ELECTRIC} transparent opacity={0.08} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[5.5, 0.01, 8, 64]} />
        <meshBasicMaterial color={ELECTRIC} transparent opacity={0.05} depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}
