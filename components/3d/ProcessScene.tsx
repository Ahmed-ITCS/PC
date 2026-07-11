"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "./useScrollStore";

const NODE_POSITIONS: [number, number, number][] = [
  [-4.5, 0, 0],
  [-1.5, 0, 0],
  [1.5, 0, 0],
  [4.5, 0, 0],
];

const NODE_COLORS = ["#00d4ff", "#7c3aed", "#34d399", "#00d4ff"];

function Nodes({ animate }: { animate: boolean }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const scales = useRef([0, 0, 0, 0]);

  useFrame((_, delta) => {
    if (!animate) return;
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const target = 1;
      const delay = i * 0.15;
      const elapsed = (scales.current[i] ?? 0) + delta;
      scales.current[i] = elapsed;
      const progress = Math.max(0, elapsed - delay);
      const s = Math.min(1, progress * 2);
      const ease = 1 - Math.pow(1 - s, 3);
      mesh.scale.setScalar(ease * target);
    });
  });

  return (
    <>
      {NODE_POSITIONS.map((pos, i) => (
        <group key={i} position={pos}>
          {/* Glow sphere */}
          <mesh>
            <sphereGeometry args={[0.45, 16, 16]} />
            <meshBasicMaterial color={NODE_COLORS[i]} transparent opacity={0.1} />
          </mesh>
          {/* Core node */}
          <mesh ref={(el) => { refs.current[i] = el; }} scale={0}>
            <sphereGeometry args={[0.22, 20, 20]} />
            <meshStandardMaterial
              color={NODE_COLORS[i]}
              emissive={NODE_COLORS[i]}
              emissiveIntensity={0.7}
              metalness={0.8}
              roughness={0.1}
            />
          </mesh>
          {/* Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.38, 0.012, 8, 40]} />
            <meshBasicMaterial color={NODE_COLORS[i]} transparent opacity={0.3} />
          </mesh>
        </group>
      ))}
    </>
  );
}

function ConnectingTubes() {
  const segments = useMemo(() => {
    return NODE_POSITIONS.slice(0, -1).map((posA, i) => {
      const posB = NODE_POSITIONS[i + 1];
      return [new THREE.Vector3(...posA), new THREE.Vector3(...posB)];
    });
  }, []);

  return (
    <>
      {segments.map((pts, i) => {
        const points = new Float32Array([
          pts[0].x, pts[0].y, pts[0].z,
          pts[1].x, pts[1].y, pts[1].z,
        ]);
        return (
          <lineSegments key={i}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[points, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color="#00d4ff" transparent opacity={0.2} />
          </lineSegments>
        );
      })}
    </>
  );
}

function PulseOrb({ sectionTop }: { sectionTop: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!ref.current) return;
    const scrollY = useScrollStore.getState().scrollY;
    const viewH = typeof window !== "undefined" ? window.innerHeight : 800;
    const sectionProgress = Math.max(
      0,
      Math.min(1, (scrollY - sectionTop + viewH * 0.5) / (viewH * 0.8))
    );

    const totalLen = 9; // from -4.5 to 4.5
    const x = -4.5 + sectionProgress * totalLen;
    ref.current.position.x = x;

    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.8 + Math.sin(Date.now() * 0.005) * 0.3;
  });

  return (
    <mesh ref={ref} position={[-4.5, 0, 0.3]}>
      <sphereGeometry args={[0.14, 16, 16]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#00d4ff"
        emissiveIntensity={1}
        metalness={0}
        roughness={0}
      />
    </mesh>
  );
}

function Scene({ animate, sectionTop }: { animate: boolean; sectionTop: number }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 3, 3]} intensity={1.5} color="#00d4ff" />
      <ConnectingTubes />
      <Nodes animate={animate} />
      <PulseOrb sectionTop={sectionTop} />
    </>
  );
}

export function ProcessScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);
  const [sectionTop, setSectionTop] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    setSectionTop(containerRef.current.getBoundingClientRect().top + window.scrollY);
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.2 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: 120 }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene animate={animate} sectionTop={sectionTop} />
      </Canvas>
    </div>
  );
}
