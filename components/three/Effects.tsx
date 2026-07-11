"use client";

import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Vignette,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

interface EffectsProps {
  quality?: "high" | "medium" | "low";
}

const chromaticOffset = new THREE.Vector2(0.001, 0.001);

function HighQualityEffects() {
  return (
    <>
      <Bloom
        intensity={1.5}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.8}
      />
      <ChromaticAberration
        offset={chromaticOffset}
        blendFunction={BlendFunction.NORMAL}
        radialModulation
        modulationOffset={0.5}
      />
      <Noise
        premultiply
        blendFunction={BlendFunction.ADD}
        opacity={0.08}
      />
      <Vignette
        eskil={false}
        offset={0.1}
        darkness={1.1}
        blendFunction={BlendFunction.NORMAL}
      />
    </>
  );
}

function MediumQualityEffects() {
  return (
    <>
      <Noise
        premultiply
        blendFunction={BlendFunction.ADD}
        opacity={0.04}
      />
      <Vignette
        eskil={false}
        offset={0.1}
        darkness={1.1}
        blendFunction={BlendFunction.NORMAL}
      />
    </>
  );
}

function LowQualityEffects() {
  return (
    <Vignette
      eskil={false}
      offset={0.1}
      darkness={1.1}
      blendFunction={BlendFunction.NORMAL}
    />
  );
}

export function Effects({ quality = "high" }: EffectsProps) {
  if (quality === "low") {
    return (
      <EffectComposer multisampling={0}>
        <LowQualityEffects />
      </EffectComposer>
    );
  }

  return (
    <EffectComposer multisampling={quality === "high" ? 4 : 2}>
      {quality === "high" ? <HighQualityEffects /> : <MediumQualityEffects />}
    </EffectComposer>
  );
}
