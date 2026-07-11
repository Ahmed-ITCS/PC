"use client";

import { useRef, useMemo, MutableRefObject } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "../useScrollStore";

// ── Orbiting torus rings ────────────────────────────────────────────
const RINGS = [
  { radius: 3.6, tube: 0.012, speed: 0.22 },
  { radius: 5.0, tube: 0.009, speed: -0.15 },
  { radius: 6.4, tube: 0.007, speed: 0.11 },
];

function TorusRings({ opacity }: { opacity: MutableRefObject<number> }) {
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(() => {
    const sp = useScrollStore.getState().scrollProgress;
    const speedMul = 1 + sp * 1.5;
    const o = opacity.current;

    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.rotation.x += RINGS[i].speed * 0.01 * speedMul;
      mesh.rotation.y += RINGS[i].speed * 0.007 * speedMul;
      mesh.rotation.z += RINGS[i].speed * 0.004 * speedMul;
      (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, o * 0.45);
    });
  });

  return (
    <>
      {RINGS.map((ring, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }}>
          <torusGeometry args={[ring.radius, ring.tube, 8, 120]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.45} />
        </mesh>
      ))}
    </>
  );
}

// ── Floating octahedra ──────────────────────────────────────────────
function FloatingOctahedra({ opacity }: { opacity: MutableRefObject<number> }) {
  const data = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => {
      const theta = (i / 10) * Math.PI * 2;
      const phi = Math.acos(2 * (i / 10) - 1);
      const r = 2.8 + (i % 3) * 0.7;
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        phase: i * 0.63,
        size: 0.09 + (i % 4) * 0.04,
        speed: 0.3 + (i % 3) * 0.15,
      };
    }), []);

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock, pointer }) => {
    const t = clock.getElapsedTime();
    const o = opacity.current;
    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const d = data[i];
      mesh.position.set(
        d.x + pointer.x * 0.25,
        d.y + Math.sin(t * d.speed + d.phase) * 0.22,
        d.z + pointer.y * 0.25
      );
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.008;
      (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, o * 0.5);
    });
  });

  return (
    <>
      {data.map((d, i) => (
        <mesh key={i} ref={(el) => { meshRefs.current[i] = el; }} position={[d.x, d.y, d.z]}>
          <octahedronGeometry args={[d.size, 0]} />
          <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.5} />
        </mesh>
      ))}
    </>
  );
}

// ── Central icosahedron ─────────────────────────────────────────────
function CoreShape({ opacity }: { opacity: MutableRefObject<number> }) {
  const solidRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const sp = useScrollStore.getState().scrollProgress;
    const o = opacity.current;
    if (!solidRef.current || !wireRef.current) return;

    solidRef.current.rotation.x += 0.003 + pointer.y * 0.001;
    solidRef.current.rotation.y += 0.005 + pointer.x * 0.002;
    solidRef.current.rotation.z += 0.001;

    const s = (1 + sp * 0.3) * o;
    solidRef.current.scale.setScalar(Math.max(0, s));
    wireRef.current.rotation.copy(solidRef.current.rotation);
    wireRef.current.scale.setScalar(Math.max(0, s * 1.01));

    (solidRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
      0.55 + Math.sin(t * 1.2) * 0.12;
    (wireRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, o * 0.18);
  });

  return (
    <>
      <mesh ref={solidRef}>
        <icosahedronGeometry args={[1.6, 4]} />
        <meshStandardMaterial
          color="#00d4ff"
          emissive="#00d4ff"
          emissiveIntensity={0.55}
          metalness={0.85}
          roughness={0.08}
        />
      </mesh>
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[1.6, 4]} />
        <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.18} />
      </mesh>
    </>
  );
}

// ── Grid plane ──────────────────────────────────────────────────────
function GridPlane({ opacity }: { opacity: MutableRefObject<number> }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const scrollY = useScrollStore.getState().scrollY;
    ref.current.position.y = -3.5 + scrollY * -0.006;
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      Math.max(0, opacity.current * 0.07);

    const geo = ref.current.geometry as THREE.PlaneGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      arr[i + 2] =
        Math.sin(arr[i] * 0.5 + t * 0.6) * 0.22 +
        Math.sin(arr[i + 1] * 0.4 + t * 0.5) * 0.18;
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -3.5, -2]}>
      <planeGeometry args={[22, 22, 28, 28]} />
      <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.07} />
    </mesh>
  );
}

// ── Root export — all hero geometry in one group ────────────────────
export function HeroGeometry() {
  const opacityRef = useRef(1);

  useFrame(() => {
    const sp = useScrollStore.getState().scrollProgress;
    // Fade out as user scrolls past hero (first ~25% of page)
    opacityRef.current = Math.max(0, 1 - sp * 6);
  });

  return (
    <group>
      <GridPlane opacity={opacityRef} />
      <TorusRings opacity={opacityRef} />
      <FloatingOctahedra opacity={opacityRef} />
      <CoreShape opacity={opacityRef} />
    </group>
  );
}
