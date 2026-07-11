"use client";

import { useState, useEffect } from "react";

export type QualityTier = "high" | "medium" | "low";

interface QualityState {
  tier: QualityTier;
  isMobile: boolean;
  hasWebGL2: boolean;
  dpr: [number, number];
}

function detectQuality(): QualityState {
  if (typeof window === "undefined") {
    return { tier: "medium", isMobile: true, hasWebGL2: false, dpr: [1, 1.5] };
  }

  const canvas = document.createElement("canvas");
  const hasWebGL2 = !!canvas.getContext("webgl2");
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ||
    (window.matchMedia("(pointer: coarse)").matches && window.matchMedia("(hover: none)").matches);

  let tier: QualityTier;
  let dpr: [number, number];

  if (isMobile || !hasWebGL2) {
    tier = "medium";
    dpr = [1, 1.5];
  } else {
    tier = "high";
    dpr = [1, 2];
  }

  // Check for low-end via renderer info if available
  try {
    const testCanvas = document.createElement("canvas");
    const gl = testCanvas.getContext("webgl2") || testCanvas.getContext("webgl");
    if (gl) {
      const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
      if (debugInfo) {
        const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
        const lowEndKeywords = ["swiftshader", "llvmpipe", "software", "mesa", "intel"];
        if (lowEndKeywords.some((kw) => renderer.toLowerCase().includes(kw))) {
          tier = "low";
          dpr = [1, 1];
        }
      }
    }
  } catch {
    // ignore
  }

  return { tier, isMobile, hasWebGL2, dpr };
}

export function useQuality(): QualityState {
  const [quality, setQuality] = useState<QualityState>({
    tier: "medium",
    isMobile: true,
    hasWebGL2: false,
    dpr: [1, 1.5],
  });

  useEffect(() => {
    setQuality(detectQuality());
  }, []);

  return quality;
}
