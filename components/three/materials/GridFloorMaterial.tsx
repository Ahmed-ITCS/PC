"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  gridFloorVertexShader,
  gridFloorFragmentShader,
} from "../shaders/index";

interface GridFloorMaterialProps {
  color?: string;
  fadeDistance?: number;
  lineThickness?: number;
}

export function useGridFloorMaterial({
  color = "#0891B2",
  fadeDistance = 20.0,
  lineThickness = 1.0,
}: GridFloorMaterialProps = {}) {
  const ref = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uGridColor: { value: new THREE.Color(color) },
      uFadeDistance: { value: fadeDistance },
      uLineThickness: { value: lineThickness },
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
        vertexShader: gridFloorVertexShader,
        fragmentShader: gridFloorFragmentShader,
        uniforms,
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    [uniforms]
  );

  return { ref, material };
}
