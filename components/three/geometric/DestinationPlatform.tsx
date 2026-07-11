"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useCyberMaterial } from "../materials/CyberMaterial";

interface DestinationPlatformProps {
  position?: [number, number, number];
  color?: string;
  radius?: number;
}

export function DestinationPlatform({
  position = [0, 0, 0],
  color = "#0891B2",
  radius = 3,
}: DestinationPlatformProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const beaconRef = useRef<THREE.Mesh>(null);
  const col = useMemo(() => new THREE.Color(color), [color]);

  const { material } = useCyberMaterial({
    color,
    gridSize: 4.0,
    noiseScale: 2.0,
    displacement: 0.02,
    opacity: 0.6,
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = Math.sin(t * 0.8) * 0.5 + 0.5;

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.15;
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = 0.12 + pulse * 0.1;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.1;
      (ring2Ref.current.material as THREE.MeshBasicMaterial).opacity = 0.08 + pulse * 0.08;
    }

    if (beaconRef.current) {
      beaconRef.current.scale.setScalar(1 + pulse * 0.3);
      (beaconRef.current.material as THREE.MeshBasicMaterial).opacity = 0.1 + pulse * 0.15;
    }
  });

  return (
    <group position={position}>
      {/* Hexagonal platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} material={material}>
        <circleGeometry args={[radius, 6]} />
      </mesh>

      {/* Concentric rings */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <torusGeometry args={[radius * 0.7, 0.015, 8, 48]} />
        <meshBasicMaterial color={col} transparent opacity={0.15} depthWrite={false} blending={THREE.NormalBlending} />
      </mesh>

      <mesh ref={ring2Ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <torusGeometry args={[radius * 1.1, 0.01, 8, 48]} />
        <meshBasicMaterial color={col} transparent opacity={0.1} depthWrite={false} blending={THREE.NormalBlending} />
      </mesh>

      {/* Central beacon */}
      <mesh ref={beaconRef} position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial color={col} transparent opacity={0.15} depthWrite={false} blending={THREE.NormalBlending} />
      </mesh>

      <pointLight position={[0, 1, 0]} intensity={0.8} color={color} distance={8} decay={2} />
    </group>
  );
}
