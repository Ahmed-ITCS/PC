"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  hologramVertexShader,
  hologramFragmentShader,
} from "../shaders/index";

interface HologramMaterialProps {
  color?: string;
  opacity?: number;
  scanSpeed?: number;
  fresnelPower?: number;
  wobbleAmount?: number;
}

export function useHologramMaterial({
  color = "#0891B2",
  opacity = 0.5,
  scanSpeed = 2.0,
  fresnelPower = 2.5,
  wobbleAmount = 0.02,
}: HologramMaterialProps = {}) {
  const ref = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: opacity },
      uScanSpeed: { value: scanSpeed },
      uFresnelPower: { value: fresnelPower },
      uWobbleAmount: { value: wobbleAmount },
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
        vertexShader: hologramVertexShader,
        fragmentShader: hologramFragmentShader,
        uniforms,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.NormalBlending,
      }),
    [uniforms]
  );

  return { ref, material };
}
