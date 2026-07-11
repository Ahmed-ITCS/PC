"use client";

import { PortalGateway } from "../geometric/PortalGateway";

export function CaseStudiesScene() {
  return (
    <group position={[0, -16, 0]}>
      <PortalGateway position={[-3.5, 0, -3]} color="#00d4ff" scale={0.9} />
      <PortalGateway position={[0, 0.5, -4]} color="#7c3aed" scale={0.85} />
      <PortalGateway position={[3.5, 0, -3]} color="#34d399" scale={0.9} />
    </group>
  );
}
