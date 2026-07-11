"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

function TorusKnot() {
  const ref = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.18 + pointer.y * 0.3;
    ref.current.rotation.y = t * 0.22 + pointer.x * 0.3;
    ref.current.rotation.z = t * 0.1;

    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.3 + Math.sin(t * 1.4) * 0.12;
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.32, 160, 12, 2, 3]} />
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#00d4ff"
        emissiveIntensity={0.3}
        metalness={0.9}
        roughness={0.06}
        wireframe={false}
      />
    </mesh>
  );
}

function TorusKnotWire() {
  const ref = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.18 + pointer.y * 0.3;
    ref.current.rotation.y = t * 0.22 + pointer.x * 0.3;
    ref.current.rotation.z = t * 0.1;
  });

  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.33, 80, 8, 2, 3]} />
      <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.1} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#00d4ff" />
      <pointLight position={[-3, -2, 2]} intensity={0.8} color="#7c3aed" />
      <TorusKnot />
      <TorusKnotWire />
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.1}
          luminanceSmoothing={0.9}
          intensity={1.2}
          radius={0.6}
        />
      </EffectComposer>
    </>
  );
}

export function CTAAccent() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        opacity: 0.18,
      }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
