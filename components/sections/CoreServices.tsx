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
    badgeColor: "bg-[rgba(0,212,255,0.1)] text-[#00D4FF] border-[rgba(0,212,255,0.22)]",
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
    accentColor: "#00D4FF",
    gemColor: "#00d4ff",
  },
  {
    icon: Cloud,
    badge: "Enterprise Grade",
    badgeColor: "bg-[rgba(124,58,237,0.12)] text-[#A78BFA] border-[rgba(124,58,237,0.25)]",
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
    accentColor: "#7C3AED",
    gemColor: "#7c3aed",
  },
  {
    icon: Layers,
    badge: "Complete Solution",
    badgeColor: "bg-[rgba(16,185,129,0.1)] text-emerald-400 border-[rgba(16,185,129,0.22)]",
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
    accentColor: "#10B981",
    gemColor: "#34d399",
  },
];

export function CoreServices() {
  return (
    <section
      id="core-services"
      className="relative py-24 md:py-32 overflow-hidden bg-[#F8FAFC]"
      aria-labelledby="core-services-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid-lg opacity-40" aria-hidden="true" />
      <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-glow-accent blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="relative z-10 container-max section-padding">
        <FadeIn className="flex flex-col items-center text-center gap-5 mb-16">
          <SectionLabel>Core Services</SectionLabel>
          <h2
            id="core-services-heading"
            className="text-display-lg font-bold text-balance max-w-3xl text-[#0F172A] font-display tracking-[-0.03em]"
          >
            Everything You Need to{" "}
            <span className="gradient-text">Ship With Confidence</span>
          </h2>
          <p className="text-[#475569] text-lg max-w-2xl text-balance">
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
                    className={`group/card relative flex flex-col gap-5 rounded-2xl border p-7 h-full transition-all duration-300 ${
                      svc.featured
                        ? "border-accent/40 ring-1 ring-accent/20 bg-white shadow-card hover:shadow-card-hover hover:-translate-y-1"
                        : "border-[#E2E8F0] bg-white hover:border-[#CBD5E1] hover:shadow-card-hover hover:-translate-y-1"
                    }`}
                  >
                    {/* Subtle accent glow on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(3,105,161,0.06) 0%, transparent 70%)" }}
                      aria-hidden="true"
                    />

                    {/* Badge */}
                    <span
                      className={
                        svc.featured
                          ? "self-start px-3 py-1 rounded-full text-[10px] font-semibold bg-accent text-white"
                          : "self-start px-3 py-1 rounded-full text-xs font-semibold border bg-[#F1F5F9] text-accent border-[#E2E8F0]"
                      }
                    >
                      {svc.badge}
                    </span>

                    {/* Icon */}
                    <div
                      className={`flex items-center justify-center w-14 h-14 rounded-xl border ${
                        svc.featured ? "bg-accent text-white border-transparent" : "bg-[#F1F5F9] text-accent border-[#E2E8F0]"
                      }`}
                    >
                      <Icon className="w-7 h-7" aria-hidden="true" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-3">
                      <h3
                        className="text-[#0F172A] font-bold text-xl leading-snug font-display tracking-[-0.02em]"
                      >
                        {svc.title}
                      </h3>
                      <p className="text-[#475569] text-sm leading-relaxed">
                        {svc.description}
                      </p>
                    </div>

                    {/* Feature bullets */}
                    <ul className="space-y-2.5" role="list">
                      {svc.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-[#475569]">
                          <Check
                            className="w-4 h-4 shrink-0 mt-0.5 text-accent"
                            aria-hidden="true"
                          />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href={svc.href}
                      className="group mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors duration-150 hover:text-accent-hover"
                      aria-label={`Learn more about ${svc.title}`}
                    >
                      Learn More
                      <ArrowRight
                        className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                        aria-hidden="true"
                      />
                    </Link>
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
