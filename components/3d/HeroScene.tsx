"use client";

import { useRef, useMemo, Component, ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "./useScrollStore";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

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

// ── Icosahedron core ────────────────────────────────────────────────
function CoreShape() {
  const ref = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const sp = useScrollStore.getState().scrollProgress;

    ref.current.rotation.x += 0.003 + pointer.y * 0.0015;
    ref.current.rotation.y += 0.005 + pointer.x * 0.002;
    ref.current.rotation.z += 0.001;

    const s = 1 + sp * 0.35;
    ref.current.scale.setScalar(s);

    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.55 + Math.sin(t * 1.2) * 0.15;
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.6, 4]} />
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#00d4ff"
        emissiveIntensity={0.55}
        metalness={0.85}
        roughness={0.08}
        wireframe={false}
      />
    </mesh>
  );
}

// ── Wireframe icosahedron overlay ───────────────────────────────────
function CoreWireframe() {
  const ref = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!ref.current) return;
    const sp = useScrollStore.getState().scrollProgress;
    ref.current.rotation.x += 0.003 + pointer.y * 0.0015;
    ref.current.rotation.y += 0.005 + pointer.x * 0.002;
    ref.current.rotation.z += 0.001;
    const s = 1 + sp * 0.35;
    ref.current.scale.setScalar(s * 1.01);
  });

  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.6, 4]} />
      <meshBasicMaterial color="#00d4ff" wireframe opacity={0.18} transparent />
    </mesh>
  );
}

// ── Orbiting torus rings ────────────────────────────────────────────
const RINGS = [
  { radius: 3.8, tube: 0.012, speed: 0.22, axis: new THREE.Vector3(1, 0, 0) },
  { radius: 5.2, tube: 0.01, speed: -0.15, axis: new THREE.Vector3(0.5, 1, 0.5).normalize() },
  { radius: 6.8, tube: 0.008, speed: 0.11, axis: new THREE.Vector3(0, 1, 0.2).normalize() },
];

function TorusRings() {
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const { pointer } = useThree();

  useFrame(() => {
    const sp = useScrollStore.getState().scrollProgress;
    const speedMul = 1 + sp * 1.8;

    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const ring = RINGS[i];
      mesh.rotation.x += ring.speed * 0.01 * speedMul;
      mesh.rotation.y += ring.speed * 0.007 * speedMul + pointer.x * 0.001;
      mesh.rotation.z += ring.speed * 0.005 * speedMul;

      // Fade rings as hero scrolls away
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.45 - sp * 0.5);
    });
  });

  return (
    <>
      {RINGS.map((ring, i) => (
        <mesh key={i} ref={(el) => { refs.current[i] = el; }}>
          <torusGeometry args={[ring.radius, ring.tube, 8, 128]} />
          <meshBasicMaterial color="#00d4ff" transparent opacity={0.45} />
        </mesh>
      ))}
    </>
  );
}

// ── Floating octahedra ──────────────────────────────────────────────
function FloatingOctahedra() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  const data = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => {
      const theta = (i / 10) * Math.PI * 2;
      const phi = Math.acos(2 * (i / 10) - 1);
      const r = 2.8 + Math.random() * 2;
      return {
        x: r * Math.sin(phi) * Math.cos(theta),
        y: r * Math.sin(phi) * Math.sin(theta),
        z: r * Math.cos(phi),
        phase: Math.random() * Math.PI * 2,
        size: 0.08 + Math.random() * 0.14,
        speed: 0.3 + Math.random() * 0.4,
      };
    });
  }, []);

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const sp = useScrollStore.getState().scrollProgress;

    meshRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const d = data[i];
      mesh.position.set(
        d.x + pointer.x * 0.3,
        d.y + Math.sin(t * d.speed + d.phase) * 0.25,
        d.z + pointer.y * 0.3
      );
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.008;

      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.55 - sp * 0.6);
    });
  });

  return (
    <group ref={groupRef}>
      {data.map((d, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={[d.x, d.y, d.z]}
        >
          <octahedronGeometry args={[d.size, 0]} />
          <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

// ── Background grid plane ───────────────────────────────────────────
function GridPlane() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const scrollY = useScrollStore.getState().scrollY;
    ref.current.position.y = -3.5 + scrollY * -0.008;

    const geo = ref.current.geometry as THREE.PlaneGeometry;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      const x = arr[i];
      const y = arr[i + 1];
      arr[i + 2] = Math.sin(x * 0.5 + t * 0.6) * 0.25 + Math.sin(y * 0.4 + t * 0.5) * 0.2;
    }
    pos.needsUpdate = true;
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -3.5, -2]}>
      <planeGeometry args={[22, 22, 32, 32]} />
      <meshBasicMaterial
        color="#00d4ff"
        wireframe
        transparent
        opacity={0.06}
      />
    </mesh>
  );
}

// ── Scene root (lights + all geometry) ─────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[4, 4, 4]} intensity={2} color="#00d4ff" />
      <pointLight position={[-4, -3, -3]} intensity={0.8} color="#7c3aed" />
      <pointLight position={[0, 0, 6]} intensity={0.5} color="#ffffff" />

      <GridPlane />
      <TorusRings />
      <FloatingOctahedra />
      <CoreShape />
      <CoreWireframe />

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.85}
          intensity={1.4}
          radius={0.55}
        />
      </EffectComposer>
    </>
  );
}

// ── Public export ───────────────────────────────────────────────────
export function HeroScene() {
  return (
    <ErrorBoundary>
      <div
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <Canvas
          camera={{ position: [0, 0, 9], fov: 72 }}
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
