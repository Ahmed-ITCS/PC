"use client";

import { ReactNode, Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ScrollControls, Scroll, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
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
import { WebGLFallback } from "./WebGLFallback";
import { useQuality, QualityTier } from "./hooks/useQuality";

function Scene3D({ quality }: { quality: QualityTier }) {
  return (
    <>
      <color attach="background" args={["#04070f"]} />
      <fog attach="fog" args={["#04070f", 10, 35]} />

      <CameraRig />
      <SceneLighting />

      {/* Persistent environment */}
      <GridFloor />
      <AmbientParticles
        count={quality === "low" ? 100 : quality === "medium" ? 300 : 600}
        spread={14}
        speed={0.12}
        opacity={0.4}
        size={0.02}
        quality={quality}
      />

      {/* Section scenes */}
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

function LoadingFallback() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#04070f]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-2 border-[#00d4ff]/30 border-t-[#00d4ff] rounded-full animate-spin" />
        <p className="text-[#00d4ff]/60 text-sm font-medium tracking-wide">
          Loading 3D Experience...
        </p>
      </div>
    </div>
  );
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

  if (!mounted) {
    return <LoadingFallback />;
  }

  return (
    <WebGLFallback>
      <div className="fixed inset-0 z-0">
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
      </div>

      {/* Scrollable HTML content */}
      <div className="relative z-10">
        <Suspense fallback={<LoadingFallback />}>
          <ScrollControls pages={9} damping={0.25} distance={1.2}>
            <Scroll html>
              {children}
            </Scroll>
          </ScrollControls>
        </Suspense>
      </div>
    </WebGLFallback>
  );
}
