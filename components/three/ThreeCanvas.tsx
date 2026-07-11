"use client";

import { Suspense } from "react";
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
import { QualityTier } from "./hooks/useQuality";

function Scene3D({ quality }: { quality: QualityTier }) {
  return (
    <>
      <color attach="background" args={["#F0F7FA"]} />
      <fog attach="fog" args={["#F0F7FA", 10, 35]} />
      <CameraRig />
      <SceneLighting />
      <GridFloor />
      <AmbientParticles
        count={quality === "low" ? 80 : quality === "medium" ? 200 : 400}
        spread={14}
        speed={0.08}
        opacity={0.2}
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

export function ThreeCanvas({ quality }: { quality: import("./hooks/useQuality").QualityState }) {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 1.5, 7], fov: 55 }}
        gl={{
          antialias: quality.tier !== "low",
          alpha: false,
          powerPreference: quality.isMobile ? "low-power" : "high-performance",
        }}
        dpr={quality.dpr}
        style={{ width: "100%", height: "100%" }}
        performance={{ min: 0.5 }}
      >
        <AdaptiveDpr />
        <AdaptiveEvents />
        <Suspense fallback={null}>
          <Scene3D quality={quality.tier} />
        </Suspense>
      </Canvas>
    </div>
  );
}
