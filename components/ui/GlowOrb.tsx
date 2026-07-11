"use client";

import { motion } from "framer-motion";

interface GlowOrbProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  opacity?: number;
}

const sizeMap = {
  sm: "w-48 h-48",
  md: "w-80 h-80",
  lg: "w-[500px] h-[500px]",
  xl: "w-[800px] h-[800px]",
};

export function GlowOrb({
  className = "",
  size = "lg",
  color = "#0891B2",
  opacity = 0.04,
}: GlowOrbProps) {
  return (
    <motion.div
      className={`absolute rounded-full pointer-events-none blur-3xl ${sizeMap[size]} ${className}`}
      style={{
        background: color,
        opacity,
      }}
      animate={{
        opacity: [opacity, opacity * 1.5, opacity],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      aria-hidden="true"
    />
  );
}
