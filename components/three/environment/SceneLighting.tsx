"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function SceneLighting() {
  const keyLightRef = useRef<THREE.PointLight>(null);
  const fillLightRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();

    if (keyLightRef.current) {
      keyLightRef.current.position.x = 3 + Math.sin(t * 0.3) * 0.5 + pointer.x * 1.5;
      keyLightRef.current.position.y = 3 + Math.cos(t * 0.2) * 0.3;
      keyLightRef.current.intensity = 1.2 + Math.sin(t * 0.8) * 0.2;
    }

    if (fillLightRef.current) {
      fillLightRef.current.position.x = -3 + Math.cos(t * 0.25) * 0.5;
      fillLightRef.current.position.y = -2 + Math.sin(t * 0.15) * 0.3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.15} color="#0a1628" />
      <pointLight
        ref={keyLightRef}
        position={[3, 3, 5]}
        intensity={1.2}
        color="#00d4ff"
        distance={30}
        decay={2}
      />
      <pointLight
        ref={fillLightRef}
        position={[-3, -2, 3]}
        intensity={0.5}
        color="#7c3aed"
        distance={25}
        decay={2}
      />
      <pointLight
        position={[0, 8, 0]}
        intensity={0.3}
        color="#00d4ff"
        distance={40}
        decay={2}
      />
    </>
  );
}
