"use client";

import { useState, useEffect, Component, ReactNode } from "react";

class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function FallbackScene() {
  return (
    <div className="absolute inset-0 bg-[#F0F7FA]">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(8,145,178,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "linear-gradient(rgba(8,145,178,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
}

export function WebGLFallback({ children }: { children: ReactNode }) {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);

  if (supported === null) return <FallbackScene />;
  if (!supported) return <FallbackScene />;

  return (
    <WebGLErrorBoundary fallback={<FallbackScene />}>
      {children}
    </WebGLErrorBoundary>
  );
}
