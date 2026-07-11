"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={shouldReduceMotion ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)", opacity: 0 }}
        animate={shouldReduceMotion ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)", opacity: 1 }}
        exit={shouldReduceMotion ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)", opacity: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.2 : 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
