"use client";

import { useMemo } from "react";

export type DeviceTier = "high" | "medium" | "low";

export function getDeviceTier(): DeviceTier {
  if (typeof window === "undefined") return "high";
  if (/mobile|android|iphone|ipad/i.test(navigator.userAgent)) return "low";
  if (window.innerWidth < 1024) return "medium";
  return "high";
}

export function useDeviceTier(): DeviceTier {
  return useMemo(() => getDeviceTier(), []);
}
