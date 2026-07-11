"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { TiltCard } from "@/components/ui/TiltCard";

const projects = [
  {
    title: "FinSecure",
    category: "Fintech Platform",
    year: "2024",
    color: "#0891B2",
    description: "End-to-end banking platform with SOC 2 compliance",
  },
  {
    title: "MedVault",
    category: "HealthTech",
    year: "2024",
    color: "#0E7490",
    description: "HIPAA-compliant patient data management system",
  },
  {
    title: "CloudScale",
    category: "DevOps Automation",
    year: "2023",
    color: "#6366F1",
    description: "Multi-cloud infrastructure orchestration for enterprise",
  },
];

export function Showcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-section section-padding" ref={ref} aria-label="Showcase">
      <div className="container-max">
        <div className="flex items-end justify-between mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-[#0891B2] mb-4 font-medium">
              Selected Work
            </p>
            <h2 className="text-display-md">
              Recent projects
            </h2>
          </motion.div>

          <motion.a
            href="/case-studies"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:flex items-center gap-2 text-sm text-[#4A6580] hover:text-[#0891B2] transition-colors group"
          >
            View all work
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.a
              key={project.title}
              href="/case-studies"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{
                duration: 0.7,
                delay: 0.1 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="block"
              data-cursor="View"
            >
              <TiltCard glareColor={project.color} intensity={10}>
                <div className="group relative aspect-[4/5] rounded-2xl overflow-hidden">
                  {/* Gradient background */}
                  <div
                    className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}18 0%, ${project.color}08 100%)`,
                    }}
                  />

                  {/* Subtle grid pattern */}
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage: `linear-gradient(${project.color} 1px, transparent 1px), linear-gradient(90deg, ${project.color} 1px, transparent 1px)`,
                      backgroundSize: "40px 40px",
                    }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <motion.span
                        initial={{ opacity: 0, y: -8 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
                        transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
                        className="text-xs uppercase tracking-[0.15em] text-[#4A6580] font-medium"
                      >
                        {project.category}
                      </motion.span>
                      <span className="text-xs text-[#4A6580]/60">{project.year}</span>
                    </div>

                    <div>
                      <motion.h3
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                        className="text-3xl md:text-4xl font-bold mb-3 transition-colors duration-300"
                        style={{
                          fontFamily: "var(--font-syne), Syne, sans-serif",
                          color: project.color,
                        }}
                      >
                        {project.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 8 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                        transition={{ duration: 0.5, delay: 0.6 + i * 0.15 }}
                        className="text-sm text-[#4A6580] max-w-[280px] leading-relaxed"
                      >
                        {project.description}
                      </motion.p>

                      <motion.div
                        className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.15em] font-medium opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                        style={{ color: project.color }}
                      >
                        View case study
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Border on hover */}
                  <div
                    className="absolute inset-0 rounded-2xl border border-transparent transition-colors duration-300 group-hover:border-current"
                    style={{ color: `${project.color}20` }}
                  />
                </div>
              </TiltCard>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
