"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useHologramMaterial } from "../materials/HologramMaterial";

interface PortalGatewayProps {
  position: [number, number, number];
  color?: string;
  scale?: number;
}

export function PortalGateway({
  position,
  color = "#0891B2",
  scale = 1,
}: PortalGatewayProps) {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  const col = useMemo(() => new THREE.Color(color), [color]);

  const { material } = useHologramMaterial({
    color,
    opacity: 0.4,
    scanSpeed: 2.0,
    fresnelPower: 3.0,
    wobbleAmount: 0.015,
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = Math.sin(t * 1.0 + phase) * 0.5 + 0.5;

    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.15 + phase) * 0.05;
    }

    if (innerRef.current) {
      innerRef.current.rotation.z = t * 0.5;
      const s = 0.8 + pulse * 0.4;
      innerRef.current.scale.setScalar(s);
      (innerRef.current.material as THREE.MeshBasicMaterial).opacity = 0.08 + pulse * 0.12;
    }

    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.3;
      ringRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Outer arch */}
      <mesh material={material}>
        <torusGeometry args={[1.2, 0.08, 16, 48, Math.PI]} />
      </mesh>

      {/* Inner portal plane */}
      <mesh ref={innerRef}>
        <circleGeometry args={[1.0, 32]} />
        <meshBasicMaterial
          color={col}
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </mesh>

      {/* Orbiting ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[1.4, 0.02, 8, 48]} />
        <meshBasicMaterial
          color={col}
          transparent
          opacity={0.15}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </mesh>

      {/* Center glow */}
      <pointLight position={[0, 0, 0]} intensity={0.8} color={color} distance={5} decay={2} />
    </group>
  );
}
