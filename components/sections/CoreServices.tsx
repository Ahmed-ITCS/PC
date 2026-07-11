"use client";

import Link from "next/link";
import { Shield, Cloud, Layers, Check, ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TiltCard } from "@/components/ui/TiltCard";

const services = [
  {
    icon: Shield,
    badge: "Most Popular",
    badgeColor: "bg-[#0891B2]/10 text-[#0891B2] border-[#0891B2]/25",
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
    badgeColor: "bg-violet-500/10 text-violet-600 border-violet-400/25",
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
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-400/25",
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
      style={{ background: "transparent" }}
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
          <p className="text-[#4A6580] text-lg max-w-2xl text-balance">
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
                      ? "border-[#0891B2]/20 bg-gradient-to-b from-[#0891B2]/5 via-white/80 to-white/60 shadow-[0_16px_48px_rgba(15,42,68,0.06)]"
                      : "border-[#0F2A44]/8 bg-white/70 hover:border-[#0891B2]/15 hover:shadow-[0_16px_48px_rgba(15,42,68,0.06)]"
                  }`}
                >
                  {/* Badge */}
                  <span
                    className={`self-start px-3 py-1 rounded-full text-xs font-semibold border ${svc.badgeColor}`}
                  >
                    {svc.badge}
                  </span>

                  {/* Icon */}
                  <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-[#0891B2]/10 border border-[#0891B2]/20">
                    <Icon className="w-7 h-7 text-[#0891B2]" aria-hidden="true" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <h3
                      className="text-[#0F2A44] font-bold text-xl leading-snug"
                      style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                    >
                      {svc.title}
                    </h3>
                    <p className="text-[#4A6580] text-sm leading-relaxed">
                      {svc.description}
                    </p>
                  </div>

                  {/* Feature bullets */}
                  <ul className="space-y-2.5" role="list">
                    {svc.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-[#4A6580]">
                        <Check
                          className="w-4 h-4 text-[#0891B2] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={svc.href}
                    className="group mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-[#0891B2]/70 hover:text-[#0891B2] transition-colors duration-150"
                    aria-label={`Learn more about ${svc.title}`}
                  >
                    Learn More
                    <ArrowRight
                      className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                      aria-hidden="true"
                    />
                  </Link>

                  {/* Featured top line */}
                  {svc.featured && (
                    <div
                      className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-[#0891B2]/30 to-transparent"
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
