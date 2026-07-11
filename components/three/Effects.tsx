"use client";

import {
  EffectComposer,
  Vignette,
  Noise,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

interface EffectsProps {
  quality?: "high" | "medium" | "low";
}

function HighQualityEffects() {
  return (
    <>
      <Noise
        premultiply
        blendFunction={BlendFunction.ADD}
        opacity={0.02}
      />
      <Vignette
        eskil={false}
        offset={0.1}
        darkness={0.3}
        blendFunction={BlendFunction.NORMAL}
      />
    </>
  );
}

function MediumQualityEffects() {
  return (
    <Vignette
      eskil={false}
      offset={0.1}
      darkness={0.25}
      blendFunction={BlendFunction.NORMAL}
    />
  );
}

function LowQualityEffects() {
  return (
    <Vignette
      eskil={false}
      offset={0.1}
      darkness={0.2}
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
