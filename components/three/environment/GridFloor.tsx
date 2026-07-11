"use client";

import { useGridFloorMaterial } from "../materials/GridFloorMaterial";

export function GridFloor() {
  const { material } = useGridFloorMaterial({
    color: "#0891B2",
    fadeDistance: 25.0,
    lineThickness: 0.8,
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} material={material}>
      <planeGeometry args={[100, 100, 1, 1]} />
    </mesh>
  );
}
