"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Shield, Cloud, Layers, Check, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TiltCard } from "@/components/ui/TiltCard";

const services = [
  {
    icon: Shield,
    badge: "Most Popular",
    badgeColor: "bg-[#00d4ff]/15 text-[#00d4ff] border-[#00d4ff]/30",
    title: "Secure MVP Development",
    description:
      "Go from concept to production-ready product with security baked in at every layer — not bolted on after.",
    features: [
      "Full-stack React + Node.js or Next.js build",
      "OWASP-compliant architecture from day one",
      "CI/CD pipeline with automated security scans",
      "Staged rollout with feature flags",
    ],
    href: "/services",
    featured: false,
  },
  {
    icon: Cloud,
    badge: "Enterprise Grade",
    badgeColor: "bg-violet-500/15 text-violet-300 border-violet-400/25",
    title: "Cloud Deployment & Database Hardening",
    description:
      "Production-grade cloud infrastructure with hardened databases, automated failover, and zero-downtime deployments.",
    features: [
      "AWS / GCP / Azure multi-region setup",
      "Postgres / MongoDB encryption at rest & transit",
      "Auto-scaling Kubernetes with Terraform IaC",
      "Continuous compliance monitoring",
    ],
    href: "/services",
    featured: true,
  },
  {
    icon: Layers,
    badge: "Complete Solution",
    badgeColor: "bg-emerald-500/15 text-emerald-300 border-emerald-400/25",
    title: "End-to-End Product Development",
    description:
      "Your entire technical function — from first commit through launch, scaling, and ongoing operations.",
    features: [
      "Discovery, architecture, build & deploy",
      "Dedicated team embedded in your workflow",
      "Weekly demos, transparent milestone billing",
      "Post-launch SRE and support retainer",
    ],
    href: "/services",
    featured: false,
  },
];

export function CoreServices() {
  return (
    <section
      id="core-services"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="core-services-heading"
    >
      <div className="container-max section-padding">
        <FadeIn className="flex flex-col items-center text-center gap-5 mb-16">
          <SectionLabel>Core Services</SectionLabel>
          <h2
            id="core-services-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance max-w-3xl"
            style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
          >
            Everything You Need to{" "}
            <span className="gradient-text">Ship With Confidence</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl text-balance">
            Three flagship engagements designed around how modern companies
            actually need to move — fast, secure, and without hiring overhead.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <FadeIn key={svc.title} delay={i * 0.1} direction="up">
                <TiltCard className="h-full rounded-2xl">
                <div
                  className={`relative flex flex-col gap-5 rounded-2xl border p-7 h-full ${
                    svc.featured
                      ? "border-[#00d4ff]/25 bg-gradient-to-b from-[#00d4ff]/5 via-[#0d1529]/80 to-[#0d1529]/60 shadow-[0_0_0_1px_rgba(0,212,255,0.1),0_16px_48px_rgba(0,0,0,0.35)]"
                      : "border-white/6 bg-[#0d1529]/50 hover:border-[#00d4ff]/15 hover:shadow-[0_0_0_1px_rgba(0,212,255,0.08),0_16px_48px_rgba(0,0,0,0.3)]"
                  }`}
                >
                  {/* Badge */}
                  <span
                    className={`self-start px-3 py-1 rounded-full text-xs font-semibold border ${svc.badgeColor}`}
                  >
                    {svc.badge}
                  </span>

                  {/* Icon */}
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/25 shadow-[0_0_16px_rgba(0,212,255,0.1)]">
                    <Icon className="w-7 h-7 text-[#00d4ff]" aria-hidden="true" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <h3
                      className="text-white font-bold text-xl leading-snug"
                      style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                    >
                      {svc.title}
                    </h3>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  {/* Feature bullets */}
                  <ul className="space-y-2.5" role="list">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-white/60">
                        <Check
                          className="w-4 h-4 text-[#00d4ff]/70 shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={svc.href}
                    className="group mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-[#00d4ff]/70 hover:text-[#00d4ff] transition-colors duration-150"
                    aria-label={`Learn more about ${svc.title}`}
                  >
                    Learn More
                    <ArrowRight
                      className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  </Link>

                  {/* Featured glow line */}
                  {svc.featured && (
                    <motion.div
                      className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-[#00d4ff]/60 to-transparent"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      aria-hidden="true"
                    />
                  )}
                </div>
                </TiltCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
