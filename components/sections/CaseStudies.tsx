"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ExternalLink, Clock } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionNumber } from "@/components/ui/SectionNumber";
import { ClipReveal } from "@/components/ui/ClipReveal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

type CaseStudy = {
  client: string;
  tagline: string;
  challenge: string;
  solution: string;
  stats: { value: number; suffix: string; prefix?: string; label: string }[];
  stack: string[];
  timeline: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
};

const caseStudies: CaseStudy[] = [
  {
    client: "Narrato",
    tagline: "Story Collaboration Platform",
    challenge:
      "A content-tech startup needed a real-time collaborative writing platform for editorial teams — think Google Docs meets Notion, built for publishers. Their existing prototype couldn't handle concurrent edits and had no access-control model.",
    solution:
      "PentaCipher rebuilt the platform on a Next.js / Node.js stack with operational transforms for real-time collaboration, fine-grained RBAC, and an event-sourced audit log. Deployed to AWS with a zero-downtime blue-green pipeline.",
    stats: [
      { value: 40,  suffix: "%",    label: "Faster page loads" },
      { value: 99,  suffix: ".9%",  label: "Uptime SLA achieved" },
      { value: 12,  suffix: "wks",  label: "From spec to launch" },
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS ECS", "GitHub Actions"],
    timeline: "12 weeks",
    gradientFrom: "#00d4ff",
    gradientTo: "#0066cc",
    accentColor: "#00D4FF",
  },
  {
    client: "AirDrive",
    tagline: "P2P Car Rental Marketplace",
    challenge:
      "A mobility startup was scaling a peer-to-peer car rental marketplace across three cities. Their monolithic Rails app couldn't handle the transaction volume and payment flow was riddled with race conditions causing double-bookings.",
    solution:
      "PentaCipher extracted a payment and booking microservice in Go, implemented idempotent reservation logic, and migrated the frontend to a React / Next.js SPA. The cloud infrastructure was redesigned on GCP with auto-scaling and real-time availability sync.",
    stats: [
      { value: 0,   suffix: "",    label: "Double-bookings post-launch", prefix: "Zero" },
      { value: 3,   suffix: "×",   label: "Transaction throughput increase" },
      { value: 60,  suffix: "%",   label: "Infrastructure cost reduction" },
    ],
    stack: ["React", "Next.js", "Go", "PostgreSQL", "GCP GKE", "Stripe", "Terraform"],
    timeline: "16 weeks",
    gradientFrom: "#7c3aed",
    gradientTo: "#4f46e5",
    accentColor: "#A78BFA",
  },
  {
    client: "UniFix",
    tagline: "Study Abroad Platform",
    challenge:
      "An edtech company helping students navigate international university applications needed a unified platform to replace a tangle of spreadsheets and manual email workflows. Data security was critical given the volume of personal student documents.",
    solution:
      "PentaCipher built a multi-tenant SaaS platform with document management (encrypted at rest), automated status workflows, and a student-facing portal. SOC 2-readiness was built in from the start with full audit logging and secrets management via AWS Secrets Manager.",
    stats: [
      { value: 85,   suffix: "%",  label: "Reduction in admin time" },
      { value: 5000, suffix: "+",  label: "Students onboarded in month one" },
      { value: 100,  suffix: "%",  label: "SOC 2 audit pass rate" },
    ],
    stack: ["Next.js", "Python", "PostgreSQL", "AWS", "Vault", "Datadog"],
    timeline: "20 weeks",
    gradientFrom: "#059669",
    gradientTo: "#0d9488",
    accentColor: "#34D399",
  },
];

function MockupFrame({ client }: { client: string }) {
  return (
    <div
      className="relative rounded-xl overflow-hidden border border-[#E2E8F0] aspect-video bg-[#F8FAFC] shadow-card"
      aria-label={`${client} product mockup`}
    >
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid-lg opacity-40"
        aria-hidden="true"
      />
      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 h-8 bg-white border-b border-[#E2E8F0] flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#E2E8F0]" />
        </div>
        <div className="flex-1 h-4 rounded bg-[#F1F5F9] mx-4 max-w-40" />
      </div>
      {/* Content sketch */}
      <div className="absolute inset-0 top-8 flex items-center justify-center p-6">
        <div className="space-y-3 w-full max-w-xs">
          <div className="h-5 rounded-md w-2/3 bg-[#CBD5E1]" />
          <div className="h-3 rounded w-full bg-[#E2E8F0]" />
          <div className="h-3 rounded w-5/6 bg-[#E2E8F0]" />
          <div className="h-3 rounded w-4/6 bg-[#E2E8F0]" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[1,2,3].map((n) => (
              <div
                key={n}
                className="h-12 rounded-lg bg-white border border-[#E2E8F0]"
              />
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-3 right-3">
        <span className="text-[10px] text-[#94A3B8] font-mono">mockup</span>
      </div>
    </div>
  );
}

export function CaseStudies() {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="relative py-24 md:py-32 bg-[#F8FAFC] overflow-hidden"
      aria-labelledby="case-studies-heading"
    >
      <SectionNumber number="03" className="top-8 right-4 md:right-12" />
      <div className="absolute inset-0 bg-glow-accent opacity-60" aria-hidden="true" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#CBD5E1] to-transparent" aria-hidden="true" />

      <div className="relative z-10 container-max section-padding">
        <ClipReveal className="flex flex-col items-center text-center gap-5 mb-16">
          <SectionLabel>Case Studies</SectionLabel>
          <h2
            id="case-studies-heading"
            className="text-display-lg font-display font-bold leading-tight text-balance max-w-3xl text-[#0F172A]"
          >
            Real Projects,{" "}
            <span className="gradient-text">Measurable Results</span>
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl text-balance">
            A selection of recent engagements — each representing a distinct
            challenge, approach, and outcome.
          </p>
        </ClipReveal>

        <div className="space-y-0">
          {caseStudies.map((cs, i) => {
            const isActive = i === active;
            return (
              <div
                key={cs.client}
                className="border-t border-[#E2E8F0] last:border-b"
              >
                <button
                  onClick={() => setActive(i)}
                  className="w-full flex items-center gap-6 py-6 md:py-8 group text-left"
                  aria-expanded={isActive}
                  aria-controls={`case-study-${i}`}
                >
                  <span
                    className="shrink-0 font-bold font-mono text-sm md:text-base transition-colors duration-200"
                    style={{ color: isActive ? "var(--accent)" : "#94A3B8" }}
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>
                  <h3
                    className="flex-1 font-bold transition-all duration-400"
                    style={{
                      fontFamily: "var(--font-syne), Syne, sans-serif",
                      fontSize: isActive ? "clamp(2rem, 5vw, 4.5rem)" : "clamp(1.5rem, 3.5vw, 2.75rem)",
                      lineHeight: "1.0",
                      letterSpacing: "-0.025em",
                      transition: "font-size 0.4s cubic-bezier(0.22,1,0.36,1), color 0.3s",
                      color: isActive ? "#0F172A" : "#64748B",
                    }}
                  >
                    {cs.client}
                  </h3>
                  <span className="shrink-0 text-[#94A3B8] text-sm font-medium hidden md:block">
                    {cs.tagline}
                  </span>
                  <motion.span
                    animate={{ rotate: isActive ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="shrink-0 text-2xl font-light leading-none transition-colors duration-200"
                    style={{ color: isActive ? "var(--accent)" : "#94A3B8" }}
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      id={`case-study-${i}`}
                      key="content"
                      initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div className="pb-12 grid lg:grid-cols-2 gap-8 lg:gap-16">
                        {/* Left */}
                        <div className="space-y-8">
                          <div className="flex items-center gap-3 text-sm text-[#64748B]">
                            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                            {cs.timeline}
                            <span className="mx-1">·</span>
                            <span className="text-accent">{cs.tagline}</span>
                          </div>

                          <div className="space-y-5">
                            {[
                              { label: "Challenge", text: cs.challenge },
                              { label: "Solution",  text: cs.solution  },
                            ].map(({ label, text }) => (
                              <div key={label}>
                                <p className="text-[10px] font-bold uppercase tracking-widest mb-2 text-[#94A3B8]">
                                  {label}
                                </p>
                                <p className="text-[#475569] text-sm leading-relaxed">{text}</p>
                              </div>
                            ))}
                          </div>

                          {/* Stats */}
                          <div className="grid grid-cols-3 gap-4">
                            {cs.stats.map((stat) => (
                              <div
                                key={stat.label}
                                className="rounded-xl border border-[#E2E8F0] bg-white p-4 text-center"
                              >
                                <div
                                  className="text-2xl font-bold text-[#0F172A]"
                                  style={{
                                    fontFamily: "var(--font-syne), Syne, sans-serif",
                                  }}
                                  aria-label={`${stat.prefix ?? ""}${stat.value}${stat.suffix} ${stat.label}`}
                                >
                                  {stat.prefix ? stat.prefix : (
                                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                                  )}
                                </div>
                                <p className="text-[#64748B] text-[10px] mt-1 leading-tight">{stat.label}</p>
                              </div>
                            ))}
                          </div>

                          {/* Stack */}
                          <div>
                            <p className="text-[10px] font-bold uppercase tracking-widest mb-2.5 text-[#94A3B8]">
                              Tech Stack
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {cs.stack.map((t) => (
                                <span
                                  key={t}
                                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0]"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>

                          <a
                            href="/contact"
                            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-accent-hover"
                            aria-label={`Discuss a similar project to ${cs.client}`}
                          >
                            Discuss a Similar Project
                            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                          </a>
                        </div>

                        {/* Right — mockup */}
                        <motion.div
                          initial={shouldReduceMotion ? false : { clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                          animate={{ clipPath: "inset(0 0% 0 0)", opacity: 1 }}
                          transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                          className="flex items-center"
                        >
                          <div className="w-full">
                            <MockupFrame client={cs.client} />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
