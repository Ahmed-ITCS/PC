"use client";

import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import { ParticleField } from "./scenes/ParticleField";
import { HeroGeometry } from "./scenes/HeroGeometry";
import { StatsGeometry } from "./scenes/StatsGeometry";
import { ProcessGeometry } from "./scenes/ProcessGeometry";
import { GridGeometry } from "./scenes/GridGeometry";
import { CTAGeometry } from "./scenes/CTAGeometry";
import { ScenePostProcessing } from "./scenes/ScenePostProcessing";
import { useScrollStore } from "./useScrollStore";
import { useDeviceTier } from "./useDeviceTier";

function ScrollSync() {
  const setScrollY = useScrollStore((s) => s.setScrollY);
  const setActiveSection = useScrollStore((s) => s.setActiveSection);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrollY(y);

      // Track which section is in view for 3D scene switching
      const sections = [
        { id: "hero", el: document.getElementById("section-hero") },
        { id: "stats", el: document.getElementById("section-stats") },
        { id: "process", el: document.getElementById("section-process") },
        { id: "why", el: document.getElementById("section-why") },
        { id: "cta", el: document.getElementById("section-cta") },
      ];
      const viewMid = y + window.innerHeight * 0.5;
      for (const s of sections) {
        if (!s.el) continue;
        const top = s.el.offsetTop;
        const bot = top + s.el.offsetHeight;
        if (viewMid >= top && viewMid < bot) {
          setActiveSection(s.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [setScrollY, setActiveSection]);

  return null;
}

export function GlobalCanvas() {
  const tier = useDeviceTier();

  return (
    <>
      <ScrollSync />
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <Canvas
          camera={{ position: [0, 0, 12], fov: 75 }}
          dpr={tier === "high" ? [1, 2] : [1, 1]}
          gl={{
            antialias: tier !== "low",
            alpha: true,
            powerPreference: "high-performance",
          }}
          style={{ background: "transparent" }}
        >
          <PerformanceMonitor onDecline={() => {}} />

          <ambientLight intensity={0.15} />
          <pointLight position={[4, 4, 4]} intensity={2} color="#00d4ff" />
          <pointLight position={[-4, -3, -3]} intensity={0.8} color="#7c3aed" />

          {/* Always-on background particles */}
          <ParticleField tier={tier} />

          {/* Hero geometry — visible near top of page */}
          <HeroGeometry />

          {/* Section geometries — fade in/out based on scroll */}
          <StatsGeometry />
          <ProcessGeometry />
          <GridGeometry />
          <CTAGeometry />

          {tier !== "low" && <ScenePostProcessing />}
        </Canvas>
      </div>
    </>
  );
}
