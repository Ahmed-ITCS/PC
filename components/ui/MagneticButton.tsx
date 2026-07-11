"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  as?: "button" | "a";
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  as = "button",
  href,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 20, stiffness: 200, mass: 0.5 });
  const springY = useSpring(y, { damping: 20, stiffness: 200, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag = as === "a" ? motion.a : motion.button;

  return (
    <Tag
      ref={ref as never}
      href={as === "a" ? href : undefined}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ scale: { duration: 0.2 } }}
      {...(props as Record<string, unknown>)}
    >
      {children}
    </Tag>
  );
}
