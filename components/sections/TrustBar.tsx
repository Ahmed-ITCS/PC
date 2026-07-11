"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Marquee } from "@/components/ui/Marquee";

const logos = [
  "Acme Corp",
  "Skybridge",
  "NovaTech",
  "Cascadia",
  "Meridian",
  "Apex Labs",
  "Solaris",
  "Vertice",
];

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      className="py-16 border-y border-[#0F2A44]/6 overflow-hidden"
      aria-label="Trusted by companies"
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-7xl mx-auto px-6 md:px-12 mb-8"
      >
        <p className="text-center text-[#8BA3B8] text-xs font-semibold tracking-widest uppercase">
          Trusted by forward-thinking teams
        </p>
      </motion.div>

      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #F0F7FA, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #F0F7FA, transparent)" }}
        aria-hidden="true"
      />

      <Marquee items={logos} speed={40} />
    </section>
  );
}
