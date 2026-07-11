"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SlideRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "left" | "right" | "up" | "down";
  once?: boolean;
}

export function SlideReveal({
  children,
  className = "",
  delay = 0,
  direction = "left",
  once = true,
}: SlideRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const clipFrom = {
    left: "inset(0 100% 0 0)",
    right: "inset(0 0 0 100%)",
    up: "inset(100% 0 0 0)",
    down: "inset(0 0 100% 0)",
  };

  const clipTo = {
    left: "inset(0 0% 0 0)",
    right: "inset(0 0 0 0%)",
    up: "inset(0% 0 0 0)",
    down: "inset(0 0 0% 0)",
  };

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: clipFrom[direction] }}
        animate={
          isInView
            ? { clipPath: clipTo[direction] }
            : { clipPath: clipFrom[direction] }
        }
        transition={{
          duration: 0.7,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
