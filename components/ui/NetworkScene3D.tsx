"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODES: [number, number, number][] = [
  [0, 2.8, 0],
  [2.4, 1.4, 1.2],
  [2.4, -1.4, -0.6],
  [0, -2.8, 0.8],
  [-2.4, -1.4, -0.6],
  [-2.4, 1.4, 1.2],
  [0, 0, 0],
  // extra scatter nodes for fullscreen fill
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
  [7, 2], [8, 5], [9, 1], [10, 4], [11, 0],
];

const ELECTRIC = new THREE.Color("#00d4ff");
const ELECTRIC_DIM = new THREE.Color("#00d4ff").multiplyScalar(0.35);

function NodeMesh({ position, isCenter }: { position: [number, number, number]; isCenter: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const glow = useRef<THREE.Mesh>(null);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = Math.sin(t * 1.2 + phase) * 0.5 + 0.5;
    if (glow.current) {
      glow.current.scale.setScalar(1 + pulse * 0.6);
      (glow.current.material as THREE.MeshBasicMaterial).opacity = 0.08 + pulse * 0.12;
    }
    if (mesh.current && isCenter) {
      const ring = Math.sin(t * 0.9) * 0.5 + 0.5;
      (mesh.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.6 + ring * 0.6;
    }
  });

  return (
    <group position={position}>
      {/* glow sphere */}
      <mesh ref={glow}>
        <sphereGeometry args={[isCenter ? 0.32 : 0.2, 12, 12]} />
        <meshBasicMaterial color={ELECTRIC} transparent opacity={0.1} />
      </mesh>
      {/* core node */}
      <mesh ref={mesh}>
        <sphereGeometry args={[isCenter ? 0.12 : 0.07, 16, 16]} />
        <meshStandardMaterial
          color={ELECTRIC}
          emissive={ELECTRIC}
          emissiveIntensity={isCenter ? 0.9 : 0.5}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>
    </group>
  );
}

function ConnectionLines() {
  const ref = useRef<THREE.LineSegments>(null);

  const { positions, colors } = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    for (const [a, b] of CONNECTIONS) {
      const pa = NODES[a];
      const pb = NODES[b];
      positions.push(...pa, ...pb);
      colors.push(ELECTRIC_DIM.r, ELECTRIC_DIM.g, ELECTRIC_DIM.b);
      colors.push(ELECTRIC_DIM.r, ELECTRIC_DIM.g, ELECTRIC_DIM.b);
    }
    return { positions: new Float32Array(positions), colors: new Float32Array(colors) };
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const mat = ref.current.material as THREE.LineBasicMaterial;
    mat.opacity = 0.18 + Math.sin(t * 0.7) * 0.1;
  });

  return (
    <lineSegments ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <lineBasicMaterial vertexColors transparent opacity={0.22} />
    </lineSegments>
  );
}

function NetworkGroup() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock, pointer }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.25 + pointer.x * 0.3;
    group.current.rotation.x = Math.sin(t * 0.18) * 0.18 + pointer.y * -0.2;
  });

  return (
    <group ref={group}>
      <ConnectionLines />
      {NODES.map((pos, i) => (
        <NodeMesh key={i} position={pos} isCenter={i === 6} />
      ))}

    </group>
  );
}

export function NetworkScene3D() {
  return (
    <div className="absolute inset-0 w-full h-full" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 70 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[3, 3, 3]} intensity={1.2} color="#00d4ff" />
        <pointLight position={[-3, -2, -3]} intensity={0.5} color="#7c3aed" />
        <NetworkGroup />
      </Canvas>
    </div>
  );
}
