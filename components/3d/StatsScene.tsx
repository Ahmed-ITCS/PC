"use client";

import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const BAR_DATA = [
  { color: "#00d4ff", targetH: 2.8, x: -3 },
  { color: "#7c3aed", targetH: 2.2, x: 0 },
  { color: "#34d399", targetH: 2.5, x: 3 },
];

function Bars({ animate }: { animate: boolean }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const progress = useRef(0);

  useFrame((_, delta) => {
    if (!animate) return;
    progress.current = Math.min(1, progress.current + delta * 0.8);
    const p = progress.current;
    const ease = 1 - Math.pow(1 - p, 3);

    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const target = BAR_DATA[i].targetH;
      const h = target * ease;
      mesh.scale.y = Math.max(0.01, h / target);
      mesh.position.y = -1.4 + h * 0.5 - target * 0.5;
    });
  });

  return (
    <>
      {BAR_DATA.map((bar, i) => (
        <mesh
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          position={[bar.x, -1.4, 0]}
          scale={[1, 0.01, 1]}
        >
          <boxGeometry args={[1.2, bar.targetH, 0.3]} />
          <meshStandardMaterial
            color={bar.color}
            emissive={bar.color}
            emissiveIntensity={0.4}
            metalness={0.6}
            roughness={0.2}
          />
        </mesh>
      ))}

      {/* Connecting lines at top */}
      {[0, 1].map((i) => {
        const a = BAR_DATA[i];
        const b = BAR_DATA[i + 1];
        const pts = new Float32Array([
          a.x + 0.6, a.targetH - 1.4, 0,
          b.x - 0.6, b.targetH - 1.4, 0,
        ]);
        return (
          <lineSegments key={i}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[pts, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color="#00d4ff" transparent opacity={0.25} />
          </lineSegments>
        );
      })}

      {/* Floating accent rings */}
      {BAR_DATA.map((bar, i) => (
        <mesh key={`ring-${i}`} position={[bar.x, 1.8, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.55, 0.015, 8, 32]} />
          <meshBasicMaterial color={bar.color} transparent opacity={0.35} />
        </mesh>
      ))}
    </>
  );
}

function Scene({ animate }: { animate: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.25) * 0.18;
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 4, 3]} intensity={2} color="#00d4ff" />
      <pointLight position={[-3, 2, 2]} intensity={1} color="#7c3aed" />
      <Bars animate={animate} />
    </group>
  );
}

export function StatsScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimate(true); },
      { threshold: 0.3 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ width: "100%", height: 180 }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene animate={animate} />
      </Canvas>
    </div>
  );
}
