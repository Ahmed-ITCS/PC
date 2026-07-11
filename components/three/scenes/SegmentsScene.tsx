"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ZONES = [
  { position: [-3, 0.5, -3] as [number, number, number], color: "#00d4ff", geometry: "octahedron" as const },
  { position: [3, 0.5, -3] as [number, number, number], color: "#7c3aed", geometry: "icosahedron" as const },
  { position: [-3, -0.5, -4] as [number, number, number], color: "#34d399", geometry: "tetrahedron" as const },
  { position: [3, -0.5, -4] as [number, number, number], color: "#f59e0b", geometry: "dodecahedron" as const },
];

function ZoneMarker({
  position,
  color,
  geometry,
}: {
  position: [number, number, number];
  color: string;
  geometry: "octahedron" | "icosahedron" | "tetrahedron" | "dodecahedron";
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const col = useMemo(() => new THREE.Color(color), [color]);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = Math.sin(t * 1.0 + phase) * 0.5 + 0.5;

    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003;
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + phase) * 0.2;
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + pulse * 0.4);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = 0.05 + pulse * 0.08;
    }
  });

  const geoEl = useMemo(() => {
    switch (geometry) {
      case "octahedron": return <octahedronGeometry args={[0.5, 0]} />;
      case "icosahedron": return <icosahedronGeometry args={[0.5, 1]} />;
      case "tetrahedron": return <tetrahedronGeometry args={[0.5, 0]} />;
      case "dodecahedron": return <dodecahedronGeometry args={[0.5, 0]} />;
    }
  }, [geometry]);

  return (
    <group position={position}>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.8, 12, 12]} />
        <meshBasicMaterial color={col} transparent opacity={0.06} depthWrite={false} />
      </mesh>
      <mesh ref={meshRef}>
        {geoEl}
        <meshStandardMaterial
          color={col}
          wireframe
          transparent
          opacity={0.35}
          emissive={col}
          emissiveIntensity={0.15}
        />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={0.4} color={color} distance={5} decay={2} />
    </group>
  );
}

export function SegmentsScene() {
  return (
    <group position={[0, -8, 0]}>
      {ZONES.map((zone, i) => (
        <ZoneMarker key={i} {...zone} />
      ))}
    </group>
  );
}
