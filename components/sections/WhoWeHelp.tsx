"use client";

import { Building2, Rocket, Briefcase, Users } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TextReveal } from "@/components/ui/TextReveal";

const segments = [
  {
    icon: Building2,
    title: "Digital Agencies",
    challenges: [
      "Clients demand technical deliverables you don't have in-house",
      "Tight margins make hiring full-time engineers impractical",
      "Delivery delays threaten client relationships",
    ],
  },
  {
    icon: Rocket,
    title: "Growing Startups",
    challenges: [
      "Moving fast creates security and technical debt",
      "Hiring senior engineers at early-stage budgets is hard",
      "Scaling infrastructure without dedicated DevOps",
    ],
  },
  {
    icon: Briefcase,
    title: "Enterprise Businesses",
    challenges: [
      "Legacy systems blocking cloud-native architecture",
      "Compliance requirements slow development velocity",
      "Internal teams lack specialised DevOps expertise",
    ],
  },
  {
    icon: Users,
    title: "Consulting Firms",
    challenges: [
      "Advising on tech strategy without a delivery partner",
      "Client engagements expand beyond your staffing",
      "Technology recommendations need a vetted team",
    ],
  },
];

export function WhoWeHelp() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-section" aria-labelledby="who-we-help-heading" ref={ref}>
      <div className="container-max section-padding">
        <div className="mb-20">
          <TextReveal
            as="h2"
            className="text-display-lg max-w-3xl"
          >
            Built for teams that need to{" "}
            <span className="gradient-text">move without friction.</span>
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {segments.map((seg, i) => {
            const Icon = seg.icon;
            return (
              <motion.div
                key={seg.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group/card space-y-5 rounded-2xl p-6 -m-6 hover:bg-white/60 hover:shadow-subtle hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    initial={{ scale: 0, rotate: -45 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -45 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + i * 0.12,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="group-hover/card:scale-110 group-hover/card:rotate-6 transition-transform duration-300"
                  >
                    <Icon className="w-5 h-5 text-[#0891B2]" aria-hidden="true" />
                  </motion.div>
                  <h3
                    className="text-[#0F2A44] font-semibold text-lg group-hover/card:text-[#0891B2] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                  >
                    {seg.title}
                  </h3>
                </div>
                <ul className="space-y-3 pl-8" role="list">
                  {seg.challenges.map((c, j) => (
                    <motion.li
                      key={c}
                      initial={{ opacity: 0, x: -12 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.3 + i * 0.12 + j * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="text-[#4A6580] text-sm leading-relaxed list-disc marker:text-[#0891B2]/40"
                    >
                      {c}
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
