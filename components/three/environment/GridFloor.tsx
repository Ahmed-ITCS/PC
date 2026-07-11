"use client";

import { useGridFloorMaterial } from "../materials/GridFloorMaterial";

export function GridFloor() {
  const { material } = useGridFloorMaterial({
    color: "#00d4ff",
    fadeDistance: 25.0,
    lineThickness: 1.0,
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} material={material}>
      <planeGeometry args={[100, 100, 1, 1]} />
    </mesh>
  );
}
