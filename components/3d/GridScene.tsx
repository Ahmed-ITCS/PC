"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BOX_COLORS = [
  "#00d4ff", "#7c3aed", "#34d399", "#f59e0b",
  "#00d4ff", "#7c3aed", "#34d399", "#f59e0b",
];

const AXES = [
  new THREE.Vector3(1, 0.5, 0.2).normalize(),
  new THREE.Vector3(0.3, 1, 0.4).normalize(),
  new THREE.Vector3(0.6, 0.2, 1).normalize(),
  new THREE.Vector3(1, 1, 0).normalize(),
  new THREE.Vector3(0, 1, 0.8).normalize(),
  new THREE.Vector3(0.8, 0.3, 0.5).normalize(),
  new THREE.Vector3(0.5, 0.8, 0.3).normalize(),
  new THREE.Vector3(1, 0.2, 0.9).normalize(),
];

function Boxes({ animate }: { animate: boolean }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const progress = useRef(0);

  const positions = useMemo<[number, number, number][]>(() => [
    [-5.25, 1.1, 0], [-1.75, 1.1, 0], [1.75, 1.1, 0], [5.25, 1.1, 0],
    [-5.25, -1.1, 0], [-1.75, -1.1, 0], [1.75, -1.1, 0], [5.25, -1.1, 0],
  ], []);

  useFrame(({ clock }, delta) => {
    if (!animate) return;
    progress.current = Math.min(1, progress.current + delta * 0.6);

    const t = clock.getElapsedTime();
    const scrollY =
      typeof window !== "undefined"
        ? (window as unknown as { scrollY: number }).scrollY
        : 0;
    const speedMul = 1 + scrollY * 0.0002;

    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const delay = i * 0.08;
      const p = Math.max(0, progress.current - delay);
      const ease = 1 - Math.pow(1 - Math.min(1, p * 2), 3);
      mesh.scale.setScalar(ease * 0.55);

      const axis = AXES[i];
      mesh.rotateOnAxis(axis, 0.008 * speedMul);

      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.3 + Math.sin(t * 0.8 + i) * 0.15;
    });
  });

  return (
    <>
      {positions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          position={pos}
          scale={0}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={BOX_COLORS[i]}
            emissive={BOX_COLORS[i]}
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.15}
            wireframe={false}
          />
        </mesh>
      ))}
      {positions.map((pos, i) => (
        <mesh key={`w-${i}`} position={pos} scale={0.56}>
          <boxGeometry args={[1, 1, 1]} />
          <meshBasicMaterial color={BOX_COLORS[i]} wireframe transparent opacity={0.2} />
        </mesh>
      ))}
    </>
  );
}

function Scene({ animate }: { animate: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.12) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 4, 4]} intensity={2} color="#00d4ff" />
      <pointLight position={[0, -3, 2]} intensity={1} color="#7c3aed" />
      <Boxes animate={animate} />
    </group>
  );
}

export function GridScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.15 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: 160 }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene animate={animate} />
      </Canvas>
    </div>
  );
}
