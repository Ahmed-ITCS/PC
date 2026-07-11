"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  dataStreamVertexShader,
  dataStreamFragmentShader,
} from "../shaders/index";

interface DataStreamMaterialProps {
  color?: string;
  speed?: number;
  opacity?: number;
}

export function useDataStreamMaterial({
  color = "#0891B2",
  speed = 1.0,
  opacity = 0.4,
}: DataStreamMaterialProps = {}) {
  const ref = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(color) },
      uSpeed: { value: speed },
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
        vertexShader: dataStreamVertexShader,
        fragmentShader: dataStreamFragmentShader,
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
      }),
    [uniforms]
  );

  return { ref, material };
}
