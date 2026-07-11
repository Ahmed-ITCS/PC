"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface ClipRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "left" | "right";
}

const clipStart = {
  up: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};

export function ClipReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.75,
  direction = "up",
}: ClipRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ clipPath: clipStart[direction], opacity: 0 }}
      animate={
        isInView
          ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }
          : { clipPath: clipStart[direction], opacity: 0 }
      }
      transition={
        shouldReduceMotion
          ? { duration: 0 }
          : { duration, delay, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </motion.div>
  );
}
