"use client";

import { ReactNode, Suspense, useState, useEffect, Component } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import { CameraRig } from "./CameraRig";
import { Effects } from "./Effects";
import { GridFloor } from "./environment/GridFloor";
import { AmbientParticles } from "./environment/AmbientParticles";
import { SceneLighting } from "./environment/SceneLighting";
import { HeroScene } from "./scenes/HeroScene";
import { ServicesScene } from "./scenes/ServicesScene";
import { SegmentsScene } from "./scenes/SegmentsScene";
import { ProblemsScene } from "./scenes/ProblemsScene";
import { CaseStudiesScene } from "./scenes/CaseStudiesScene";
import { WhyScene } from "./scenes/WhyScene";
import { StatsScene } from "./scenes/StatsScene";
import { ContactScene } from "./scenes/ContactScene";
import { useQuality, QualityTier } from "./hooks/useQuality";

function Scene3D({ quality }: { quality: QualityTier }) {
  return (
    <>
      <color attach="background" args={["#04070f"]} />
      <fog attach="fog" args={["#04070f", 10, 35]} />

      <CameraRig />
      <SceneLighting />

      <GridFloor />
      <AmbientParticles
        count={quality === "low" ? 100 : quality === "medium" ? 300 : 600}
        spread={14}
        speed={0.12}
        opacity={0.4}
        size={0.02}
        quality={quality}
      />

      <HeroScene />
      <ServicesScene />
      <SegmentsScene />
      <ProblemsScene />
      <CaseStudiesScene />
      <WhyScene />
      <StatsScene />
      <ContactScene />

      <Effects quality={quality} />
    </>
  );
}

function FallbackScene() {
  return (
    <div className="absolute inset-0 bg-[#04070f]">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(0,212,255,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}

class CanvasErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.warn("3D Canvas error (falling back to 2D):", error.message);
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

interface ScrollCanvasProps {
  children: ReactNode;
}

export function ScrollCanvas({ children }: ScrollCanvasProps) {
  const qualityState = useQuality();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {/* 3D Canvas — fixed behind everything, independent of HTML */}
      <div className="fixed inset-0 z-0">
        <CanvasErrorBoundary fallback={<FallbackScene />}>
          {mounted && (
            <Canvas
              camera={{ position: [0, 1.5, 7], fov: 55 }}
              gl={{
                antialias: qualityState.tier !== "low",
                alpha: false,
                powerPreference: qualityState.isMobile ? "low-power" : "high-performance",
              }}
              dpr={qualityState.dpr}
              style={{ width: "100%", height: "100%" }}
              performance={{ min: 0.5 }}
            >
              <AdaptiveDpr />
              <AdaptiveEvents />
              <Suspense fallback={null}>
                <Scene3D quality={qualityState.tier} />
              </Suspense>
            </Canvas>
          )}
        </CanvasErrorBoundary>
      </div>

      {/* HTML content — always renders, uses native scroll, drives CameraRig via window.scrollY */}
      <div className="relative z-10">
        {children}
      </div>
    </>
  );
}
