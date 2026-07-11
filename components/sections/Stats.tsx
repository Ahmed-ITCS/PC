"use client";

import { useInView, motion } from "framer-motion";
import { useRef } from "react";
import { CountUp } from "@/components/ui/CountUp";

const stats = [
  {
    value: 100,
    suffix: "%",
    label: "Project Completion",
    description: "Every engagement delivered",
  },
  {
    value: 50,
    suffix: "+",
    label: "Happy Clients",
    description: "Agencies, startups & enterprises",
  },
  {
    value: 24,
    suffix: "/7",
    label: "Support",
    description: "On-call for active engagements",
  },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="py-section"
      aria-label="Company statistics"
      ref={ref}
    >
      <div className="container-max section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, filter: "blur(8px)", y: 20 }}
              animate={
                isInView
                  ? { opacity: 1, filter: "blur(0px)", y: 0 }
                  : { opacity: 0, filter: "blur(8px)", y: 20 }
              }
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group/stat text-center space-y-2 rounded-2xl p-6 -m-6 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300"
            >
              <div
                className="text-display-lg gradient-text group-hover/stat:drop-shadow-[0_0_12px_rgba(8,145,178,0.3)] transition-all duration-300"
                style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
              >
                {isInView && (
                  <CountUp
                    end={stat.value}
                    suffix={stat.suffix}
                    duration={2}
                  />
                )}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                className="text-[#0F2A44] font-semibold text-base tracking-wide group-hover/stat:text-[#0891B2] transition-colors duration-300"
              >
                {stat.label}
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                className="text-[#8BA3B8] text-sm"
              >
                {stat.description}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
