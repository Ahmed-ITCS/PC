"use client";

import { useRef, useMemo, Component, ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

class ErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const ACCENT = "#0369A1";
const ACCENT_LIGHT = "#38BDF8";

// ── Rotating wireframe core ─────────────────────────────────────────
function Core() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.x = t * 0.05 + pointer.y * 0.15;
    group.current.rotation.y = t * 0.08 + pointer.x * 0.2;
  });

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.22} />
      </mesh>
      <mesh scale={0.62}>
        <icosahedronGeometry args={[2.4, 0]} />
        <meshBasicMaterial color={ACCENT_LIGHT} wireframe transparent opacity={0.32} />
      </mesh>
    </group>
  );
}

// ── Soft orbiting nodes ─────────────────────────────────────────────
function Nodes() {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  const data = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => {
        const theta = (i / 14) * Math.PI * 2;
        const phi = Math.acos(2 * (i / 14) - 1);
        const r = 3.2 + Math.random() * 1.6;
        return {
          x: r * Math.sin(phi) * Math.cos(theta),
          y: r * Math.sin(phi) * Math.sin(theta),
          z: r * Math.cos(phi),
          phase: Math.random() * Math.PI * 2,
          size: 0.03 + Math.random() * 0.05,
          speed: 0.3 + Math.random() * 0.4,
        };
      }),
    []
  );

  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.03 + pointer.x * 0.1;
    }
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const d = data[i];
      mesh.position.y = d.y + Math.sin(t * d.speed + d.phase) * 0.2;
    });
  });

  return (
    <group ref={group}>
      {data.map((d, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[d.x, d.y, d.z]}
        >
          <sphereGeometry args={[d.size, 12, 12]} />
          <meshBasicMaterial color={ACCENT} transparent opacity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <Core />
      <Nodes />
    </>
  );
}

export function HeroScene() {
  return (
    <ErrorBoundary>
      <div className="absolute inset-0 w-full h-full" aria-hidden="true">
        <Canvas
          camera={{ position: [0, 0, 9], fov: 68 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
          style={{ background: "transparent", width: "100%", height: "100%" }}
        >
          <Scene />
        </Canvas>
      </div>
    </ErrorBoundary>
  );
}
