"use client";

import { ReactNode, Suspense, useState, useEffect, lazy } from "react";
import { useQuality } from "./hooks/useQuality";

const LazyScene = lazy(() =>
  import("./ThreeCanvas").then((m) => ({ default: m.ThreeCanvas }))
);

function CSSBackground() {
  return (
    <div className="fixed inset-0 z-0 bg-[#F0F7FA] overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(8,145,178,0.06) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(8,145,178,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.04) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.04] blur-3xl"
        style={{
          background: "radial-gradient(circle, #0891B2 0%, transparent 70%)",
          top: "10%",
          left: "20%",
          animation: "orbFloat1 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03] blur-3xl"
        style={{
          background: "radial-gradient(circle, #6366F1 0%, transparent 70%)",
          bottom: "20%",
          right: "15%",
          animation: "orbFloat2 25s ease-in-out infinite",
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-[0.03] blur-3xl"
        style={{
          background: "radial-gradient(circle, #0D9488 0%, transparent 70%)",
          top: "50%",
          left: "60%",
          animation: "orbFloat3 18s ease-in-out infinite",
        }}
      />
    </div>
  );
}

interface ScrollCanvasProps {
  children: ReactNode;
}

export function ScrollCanvas({ children }: ScrollCanvasProps) {
  const qualityState = useQuality();
  const [webglOk, setWebglOk] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const ok = !!(c.getContext("webgl2") || c.getContext("webgl"));
      setWebglOk(ok);
    } catch {
      setWebglOk(false);
    }
  }, []);

  return (
    <>
      <CSSBackground />
      {webglOk && (
        <Suspense fallback={null}>
          <LazyScene quality={qualityState} />
        </Suspense>
      )}
      <div className="relative z-10">{children}</div>
    </>
  );
}
