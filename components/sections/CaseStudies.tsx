"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Clock } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
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
      { value: 40, suffix: "%", label: "Faster page loads" },
      { value: 99, suffix: ".9%", label: "Uptime SLA achieved" },
      { value: 12, suffix: "wks", label: "From spec to launch" },
    ],
    stack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "AWS ECS", "GitHub Actions"],
    timeline: "12 weeks",
    gradientFrom: "#00d4ff",
    gradientTo: "#0066cc",
    accentColor: "#00d4ff",
  },
  {
    client: "AirDrive",
    tagline: "P2P Car Rental Marketplace",
    challenge:
      "A mobility startup was scaling a peer-to-peer car rental marketplace across three cities. Their monolithic Rails app couldn't handle the transaction volume and payment flow was riddled with race conditions causing double-bookings.",
    solution:
      "PentaCipher extracted a payment and booking microservice in Go, implemented idempotent reservation logic, and migrated the frontend to a React / Next.js SPA. The cloud infrastructure was redesigned on GCP with auto-scaling and real-time availability sync.",
    stats: [
      { value: 0, suffix: "", label: "Double-bookings post-launch", prefix: "Zero" },
      { value: 3, suffix: "×", label: "Transaction throughput increase" },
      { value: 60, suffix: "%", label: "Infrastructure cost reduction" },
    ],
    stack: ["React", "Next.js", "Go", "PostgreSQL", "GCP GKE", "Stripe", "Terraform"],
    timeline: "16 weeks",
    gradientFrom: "#7c3aed",
    gradientTo: "#4f46e5",
    accentColor: "#a78bfa",
  },
  {
    client: "UniFix",
    tagline: "Study Abroad Platform",
    challenge:
      "An edtech company helping students navigate international university applications needed a unified platform to replace a tangle of spreadsheets and manual email workflows. Data security was critical given the volume of personal student documents.",
    solution:
      "PentaCipher built a multi-tenant SaaS platform with document management (encrypted at rest), automated status workflows, and a student-facing portal. SOC 2-readiness was built in from the start with full audit logging and secrets management via AWS Secrets Manager.",
    stats: [
      { value: 85, suffix: "%", label: "Reduction in admin time" },
      { value: 5000, suffix: "+", label: "Students onboarded in month one" },
      { value: 100, suffix: "%", label: "SOC 2 audit pass rate" },
    ],
    stack: ["Next.js", "Python", "PostgreSQL", "AWS", "Vault", "Datadog"],
    timeline: "20 weeks",
    gradientFrom: "#059669",
    gradientTo: "#0d9488",
    accentColor: "#34d399",
  },
];

function MockupFrame({
  gradientFrom,
  gradientTo,
  accentColor,
  client,
}: {
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  client: string;
}) {
  return (
    <div
      className="relative rounded-xl overflow-hidden border border-white/8 aspect-video bg-[#080e1e]"
      aria-label={`${client} product mockup`}
    >
      {/* Gradient mesh background */}
      <div
        className="absolute inset-0 opacity-25"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 30% 40%, ${gradientFrom}55 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 70% 60%, ${gradientTo}44 0%, transparent 60%)`,
        }}
        aria-hidden="true"
      />

      {/* Browser chrome */}
      <div className="absolute top-0 inset-x-0 h-8 bg-[#0d1529]/80 border-b border-white/5 flex items-center px-4 gap-2">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <div className="flex-1 h-4 rounded bg-white/5 mx-4 max-w-40" />
      </div>

      {/* Fake UI content */}
      <div className="absolute inset-0 top-8 flex items-center justify-center p-6">
        <div className="space-y-3 w-full max-w-xs">
          <div
            className="h-5 rounded-md w-2/3"
            style={{ background: `${accentColor}25` }}
          />
          <div className="h-3 rounded w-full bg-white/5" />
          <div className="h-3 rounded w-5/6 bg-white/5" />
          <div className="h-3 rounded w-4/6 bg-white/5" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-12 rounded-lg"
                style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}20` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* "Real screenshots coming" overlay */}
      <div className="absolute bottom-3 right-3">
        <span className="text-[10px] text-white/20 font-mono">mockup — real screenshots coming</span>
      </div>
    </div>
  );
}

export function CaseStudies() {
  const [current, setCurrent] = useState(0);
  const total = caseStudies.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const cs = caseStudies[current];

  return (
    <section
      className="relative py-24 md:py-32 bg-[#080e1e] overflow-hidden"
      aria-labelledby="case-studies-heading"
    >
      <div className="absolute inset-0 bg-glow-bottom opacity-50" aria-hidden="true" />

      <div className="relative z-10 container-max section-padding">
        <FadeIn className="flex flex-col items-center text-center gap-5 mb-16">
          <SectionLabel>Case Studies</SectionLabel>
          <h2
            id="case-studies-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance max-w-3xl"
            style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
          >
            Real Projects,{" "}
            <span className="gradient-text">Measurable Results</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl text-balance">
            A selection of recent engagements — each representing a distinct
            challenge, approach, and outcome.
          </p>
        </FadeIn>

        <div className="rounded-2xl border border-white/6 bg-[#0d1529]/50 overflow-hidden">
          {/* Slide nav header */}
          <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-white/5">
            <div className="flex items-center gap-3">
              {caseStudies.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`View ${c.client} case study`}
                  aria-current={i === current ? "true" : undefined}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    i === current
                      ? "bg-[#00d4ff]/15 text-[#00d4ff] border border-[#00d4ff]/30"
                      : "text-white/40 hover:text-white/70 hover:bg-white/5"
                  }`}
                >
                  {c.client}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Previous case study"
                className="p-1.5 rounded-lg border border-white/8 text-white/40 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-150"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
              </button>
              <button
                onClick={next}
                aria-label="Next case study"
                className="p-1.5 rounded-lg border border-white/8 text-white/40 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-150"
              >
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Case study content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 md:p-8 lg:p-10"
            >
              {/* Left */}
              <div className="space-y-6">
                {/* Client header */}
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h3
                      className="text-2xl md:text-3xl font-bold text-white"
                      style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                    >
                      {cs.client}
                    </h3>
                    <div className="flex items-center gap-1.5 text-white/35 text-xs">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      {cs.timeline}
                    </div>
                  </div>
                  <p className="text-[#00d4ff]/70 text-sm font-medium">{cs.tagline}</p>
                </div>

                {/* Challenge / Solution */}
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1.5">
                      Challenge
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-1.5">
                      Solution
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed">{cs.solution}</p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                  {cs.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-[#00d4ff]/12 bg-[#00d4ff]/4 p-3 text-center"
                    >
                      <div
                        className="text-xl md:text-2xl font-bold gradient-text"
                        style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                        aria-label={`${stat.prefix ?? ""}${stat.value}${stat.suffix} ${stat.label}`}
                      >
                        {stat.prefix ? (
                          stat.prefix
                        ) : (
                          <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                        )}
                      </div>
                      <p className="text-white/40 text-[10px] mt-1 leading-tight">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Tech stack */}
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-2.5">
                    Tech Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cs.stack.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-white/4 border border-white/8 text-white/45 text-xs font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="/contact"
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-[#00d4ff]/70 hover:text-[#00d4ff] transition-colors"
                  aria-label={`Discuss a similar project to ${cs.client}`}
                >
                  Discuss a Similar Project
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </a>
              </div>

              {/* Right — mockup */}
              <div className="flex items-center justify-center">
                <div className="w-full">
                  <MockupFrame
                    gradientFrom={cs.gradientFrom}
                    gradientTo={cs.gradientTo}
                    accentColor={cs.accentColor}
                    client={cs.client}
                  />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
