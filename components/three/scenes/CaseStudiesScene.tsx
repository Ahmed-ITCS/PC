"use client";

import { PortalGateway } from "../geometric/PortalGateway";

export function CaseStudiesScene() {
  return (
    <group position={[0, -16, 0]}>
      <PortalGateway position={[-3.5, 0, -3]} color="#0891B2" scale={0.9} />
      <PortalGateway position={[0, 0.5, -4]} color="#6366F1" scale={0.85} />
      <PortalGateway position={[3.5, 0, -3]} color="#0D9488" scale={0.9} />
    </group>
  );
}
