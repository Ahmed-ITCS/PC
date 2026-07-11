"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  cyberVertexShader,
  cyberFragmentShader,
} from "../shaders/index";

interface CyberMaterialProps {
  color?: string;
  gridSize?: number;
  noiseScale?: number;
  displacement?: number;
  opacity?: number;
}

export function useCyberMaterial({
  color = "#00d4ff",
  gridSize = 8.0,
  noiseScale = 1.5,
  displacement = 0.05,
  opacity = 0.9,
}: CyberMaterialProps = {}) {
  const ref = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uGridSize: { value: gridSize },
      uNoiseScale: { value: noiseScale },
      uDisplacement: { value: displacement },
      uOpacity: { value: opacity },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: cyberVertexShader,
        fragmentShader: cyberFragmentShader,
        uniforms,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [uniforms]
  );

  return { ref, material };
}
