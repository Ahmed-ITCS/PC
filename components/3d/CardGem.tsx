"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

function Gem({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.6 + pointer.y * 0.5;
    ref.current.rotation.y = t * 0.8 + pointer.x * 0.5;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.6 + Math.sin(t * 2) * 0.25;
  });

  return (
    <mesh ref={ref}>
      <octahedronGeometry args={[0.7, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.6}
        metalness={0.9}
        roughness={0.05}
      />
    </mesh>
  );
}

function GemWire({ color }: { color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.6 + pointer.y * 0.5;
    ref.current.rotation.y = t * 0.8 + pointer.x * 0.5;
  });

  return (
    <mesh ref={ref} scale={1.08}>
      <octahedronGeometry args={[0.7, 0]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.25} />
    </mesh>
  );
}

function Scene({ color }: { color: string }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[2, 2, 2]} intensity={2} color={color} />
      <pointLight position={[-2, -1, 1]} intensity={0.6} color="#7c3aed" />
      <Gem color={color} />
      <GemWire color={color} />
      <EffectComposer>
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.9} intensity={1.5} radius={0.7} />
      </EffectComposer>
    </>
  );
}

interface CardGemProps {
  color?: string;
}

export function CardGem({ color = "#00d4ff" }: CardGemProps) {
  return (
    <div
      className="absolute top-3 right-3 w-16 h-16 pointer-events-none opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene color={color} />
      </Canvas>
    </div>
  );
}
