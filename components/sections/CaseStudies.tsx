"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { TextReveal } from "@/components/ui/TextReveal";

const caseStudies = [
  {
    client: "Narrato",
    tagline: "Story Collaboration Platform",
    description:
      "Real-time collaborative writing platform for editorial teams. Rebuilt on Next.js with operational transforms and event-sourced audit log.",
    stats: "40% faster page loads · 99.9% uptime",
    stack: ["Next.js", "Node.js", "PostgreSQL", "AWS"],
    color: "#0891B2",
  },
  {
    client: "AirDrive",
    tagline: "P2P Car Rental Marketplace",
    description:
      "Extracted payment microservice in Go, migrated frontend to React/Next.js, redesigned cloud infrastructure on GCP with auto-scaling.",
    stats: "Zero double-bookings · 3× throughput",
    stack: ["React", "Go", "GCP", "Stripe"],
    color: "#6366F1",
  },
  {
    client: "UniFix",
    tagline: "Study Abroad Platform",
    description:
      "Multi-tenant SaaS with encrypted document management, automated workflows, and SOC 2-readiness built in from day one.",
    stats: "85% admin time reduction · 5000+ students",
    stack: ["Next.js", "Python", "AWS", "Datadog"],
    color: "#059669",
  },
];

export function CaseStudies() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="py-section section-padding"
      ref={ref}
      aria-labelledby="case-studies-heading"
    >
      <div className="container-max">
        <div className="flex items-end justify-between mb-16">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#0891B2] mb-4 font-medium">
              Case Studies
            </p>
            <TextReveal
              as="h2"
              className="text-display-md"
            >
              Client outcomes
            </TextReveal>
          </div>

          <motion.a
            href="/case-studies"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:flex items-center gap-2 text-sm text-[#4A6580] hover:text-[#0891B2] transition-colors group"
          >
            All case studies
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>

        <div className="space-y-4">
          {caseStudies.map((cs, i) => (
            <motion.a
              key={cs.client}
              href="/contact"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group flex flex-col md:flex-row md:items-center gap-6 md:gap-12 p-6 md:p-8 rounded-2xl border border-[#0F2A44]/6 hover:border-[#0891B2]/15 hover:bg-white/50 transition-all duration-300"
              data-cursor="View"
            >
              {/* Left: Project name */}
              <div className="md:w-1/4">
                <h3
                  className="text-2xl md:text-3xl font-bold transition-colors duration-300 group-hover:text-[#0891B2]"
                  style={{
                    fontFamily: "var(--font-syne), Syne, sans-serif",
                    color: cs.color,
                  }}
                >
                  {cs.client}
                </h3>
                <p className="text-sm text-[#4A6580] mt-1">{cs.tagline}</p>
              </div>

              {/* Center: Description */}
              <div className="md:w-2/4">
                <p className="text-[#4A6580] text-sm leading-relaxed">
                  {cs.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {cs.stack.map((t, j) => (
                    <motion.span
                      key={t}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{
                        duration: 0.3,
                        delay: 0.5 + i * 0.15 + j * 0.05,
                      }}
                      className="text-xs text-[#8BA3B8]"
                    >
                      {t}
                      {j < cs.stack.length - 1 ? " ·" : ""}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Right: Stats + arrow */}
              <div className="md:w-1/4 flex items-center justify-between md:flex-col md:items-end gap-2">
                <p className="text-xs text-[#8BA3B8] font-medium text-right">
                  {cs.stats}
                </p>
                <ArrowUpRight className="w-5 h-5 text-[#0891B2] opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
