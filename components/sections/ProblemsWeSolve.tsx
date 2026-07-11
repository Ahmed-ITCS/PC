"use client";

import {
  HeartHandshake,
  UserMinus,
  Timer,
  ShieldAlert,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TextReveal } from "@/components/ui/TextReveal";

const problems = [
  {
    icon: HeartHandshake,
    title: "Keep Clients Happy",
    bullets: [
      "On-time delivery with weekly visibility",
      "Clean, handoff-ready codebases",
      "Proactive communication — no surprises",
    ],
  },
  {
    icon: UserMinus,
    title: "Avoid Hiring Overhead",
    bullets: [
      "Skip recruitment and benefits costs",
      "Scale capacity up or down instantly",
      "Senior talent without headcount",
    ],
  },
  {
    icon: Timer,
    title: "Deliver On Time",
    bullets: [
      "Scope and timeline agreed before work begins",
      "Two-week sprints with live demos",
      "Risk flagged early — never as an excuse",
    ],
  },
  {
    icon: ShieldAlert,
    title: "Reduce Technical Risk",
    bullets: [
      "Security-first architecture",
      "Automated testing catches regressions",
      "Architecture reviews prevent regret",
    ],
  },
  {
    icon: TrendingUp,
    title: "Scale Rapidly",
    bullets: [
      "Infrastructure designed for 10× traffic",
      "Feature-flag driven releases",
      "Observability built in from day one",
    ],
  },
  {
    icon: Trophy,
    title: "Ensure Success",
    bullets: [
      "100% project completion rate",
      "Full documentation and runbooks",
      "Optional ongoing SRE retainer",
    ],
  },
];

export function ProblemsWeSolve() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-section" aria-labelledby="problems-heading" ref={ref}>
      <div className="container-max section-padding">
        <div className="mb-20">
          <TextReveal
            as="h2"
            className="text-display-lg max-w-3xl"
          >
            The challenges we&apos;re{" "}
            <span className="gradient-text">built to solve.</span>
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {problems.map((problem, i) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group/card space-y-4 rounded-2xl p-6 -m-6 hover:bg-white/60 hover:shadow-card hover:-translate-y-1 active:scale-[0.98] transition-all duration-300"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + i * 0.1,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="group-hover/card:rotate-[360deg] transition-transform duration-700"
                >
                  <Icon className="w-5 h-5 text-[#0891B2]" aria-hidden="true" />
                </motion.div>
                <h3
                  className="text-[#0F2A44] font-semibold text-base group-hover/card:text-[#0891B2] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                >
                  {problem.title}
                </h3>
                <ul className="space-y-2" role="list">
                  {problem.bullets.map((b, j) => (
                    <motion.li
                      key={b}
                      initial={{ opacity: 0, x: -8 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3 + i * 0.1 + j * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="text-[#4A6580] text-sm leading-relaxed list-disc marker:text-[#0891B2]/40 pl-4"
                    >
                      {b}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
