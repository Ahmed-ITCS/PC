"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const POSITION_POINTS = [
  new THREE.Vector3(0, 1.5, 7),
  new THREE.Vector3(1, 2, 8),
  new THREE.Vector3(-1, 2.5, 9),
  new THREE.Vector3(2, 3, 10),
  new THREE.Vector3(-1.5, 3.5, 9),
  new THREE.Vector3(0, 4, 11),
  new THREE.Vector3(1.5, 4.5, 10),
  new THREE.Vector3(0, 5, 8),
  new THREE.Vector3(0, 5.5, 7),
];

const LOOKAT_POINTS = [
  new THREE.Vector3(0, 0, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0, 2, 0),
  new THREE.Vector3(0, 3, 0),
  new THREE.Vector3(0, 4, 0),
  new THREE.Vector3(0, 5, 0),
  new THREE.Vector3(0, 6, 0),
  new THREE.Vector3(0, 7, 0),
  new THREE.Vector3(0, 8, 0),
];

const FOV_PATH = [55, 58, 60, 62, 58, 60, 62, 56, 52];

function getScrollOffset(): number {
  if (typeof window === "undefined") return 0;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  if (maxScroll <= 0) return 0;
  return Math.max(0, Math.min(1, window.scrollY / maxScroll));
}

export function CameraRig() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const smoothPos = useRef(new THREE.Vector3(0, 1.5, 7));
  const smoothLookAt = useRef(new THREE.Vector3(0, 0, 0));

  const posCurve = useMemo(
    () => new THREE.CatmullRomCurve3(POSITION_POINTS, false, "centripetal", 0.5),
    []
  );

  const lookAtCurve = useMemo(
    () => new THREE.CatmullRomCurve3(LOOKAT_POINTS, false, "centripetal", 0.5),
    []
  );

  useFrame(({ pointer }) => {
    mouseRef.current.x = pointer.x;
    mouseRef.current.y = pointer.y;
  });

  useFrame(() => {
    const offset = getScrollOffset();
    const cam = camera as THREE.PerspectiveCamera;

    const targetPos = posCurve.getPoint(offset);
    const targetLookAt = lookAtCurve.getPoint(offset);

    const rawIndex = offset * (FOV_PATH.length - 1);
    const idx = Math.min(Math.floor(rawIndex), FOV_PATH.length - 2);
    const t = rawIndex - idx;
    const targetFov = FOV_PATH[idx] + (FOV_PATH[idx + 1] - FOV_PATH[idx]) * t;
    cam.fov += (targetFov - cam.fov) * 0.05;
    cam.updateProjectionMatrix();

    smoothMouse.current.x += (mouseRef.current.x - smoothMouse.current.x) * 0.03;
    smoothMouse.current.y += (mouseRef.current.y - smoothMouse.current.y) * 0.03;

    const mx = smoothMouse.current.x * 0.4;
    const my = smoothMouse.current.y * 0.25;

    smoothPos.current.lerp(
      new THREE.Vector3(targetPos.x + mx, targetPos.y + my, targetPos.z),
      0.08
    );
    smoothLookAt.current.lerp(
      new THREE.Vector3(targetLookAt.x + mx * 0.3, targetLookAt.y + my * 0.3, targetLookAt.z),
      0.08
    );

    camera.position.copy(smoothPos.current);
    camera.lookAt(smoothLookAt.current);
  });

  return null;
}
