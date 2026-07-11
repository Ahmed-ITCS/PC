import type { Metadata } from "next";
import {
  Code2,
  GitMerge,
  Cloud,
  Database,
  ShieldCheck,
  BarChart3,
  ArrowRight,
  Check,
} from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { GlowOrb } from "@/components/ui/GlowOrb";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom software development, DevOps & infrastructure, cloud solutions, data engineering, security & compliance, and monitoring & support — built security-first by PentaCipher.",
};

const services = [
  {
    id: "custom-software",
    icon: Code2,
    title: "Custom Software Development",
    tagline: "Production-ready apps built for scale and security",
    description:
      "We design and build web applications, APIs, and data-driven platforms from the ground up — or step in to accelerate an existing codebase. Our engineers make deliberate architectural choices that prevent the technical debt most teams inherit.",
    tags: ["React", "Next.js", "Node.js", "Python", "Go", "PostgreSQL", "GraphQL"],
    features: [
      "Full-stack web applications and SaaS platforms",
      "REST, GraphQL, and gRPC API design and development",
      "Authentication, RBAC, and multi-tenancy",
      "End-to-end automated testing suites",
    ],
    featured: false,
  },
  {
    id: "devops",
    icon: GitMerge,
    title: "DevOps & Infrastructure",
    tagline: "Pipelines, orchestration, and zero-downtime deployments",
    description:
      "We automate everything from code commit to production — so your team spends time building features, not fighting deployments. Our DevOps engagements start with your biggest friction point and systematically eliminate it.",
    tags: ["Kubernetes", "Terraform", "GitHub Actions", "Docker", "Helm", "ArgoCD"],
    features: [
      "CI/CD pipelines with automated security and quality gates",
      "Kubernetes orchestration (EKS, GKE, AKS) with Helm charts",
      "Infrastructure-as-code with Terraform and Pulumi",
      "Blue-green and canary deployment strategies",
    ],
    featured: false,
  },
  {
    id: "cloud",
    icon: Cloud,
    title: "Cloud Solutions",
    tagline: "Multi-cloud architecture designed for scale and cost efficiency",
    description:
      "Whether you're migrating from legacy infrastructure, optimising an existing cloud footprint, or building cloud-native from day one — we design solutions that scale with your business without surprising you with bills.",
    tags: ["AWS", "GCP", "Azure", "Serverless", "CDN", "Cost Optimisation"],
    features: [
      "Cloud architecture design and migration planning",
      "Multi-region, high-availability deployments",
      "Serverless and edge compute implementations",
      "FinOps and cloud cost optimisation reviews",
    ],
    featured: false,
  },
  {
    id: "data",
    icon: Database,
    title: "Data Engineering",
    tagline: "Pipelines, warehouses, and analytics infrastructure",
    description:
      "Good decisions require reliable data. We build ingestion pipelines, data warehouses, and analytics platforms that give your team a single source of truth — with the governance and lineage tracking that regulated industries require.",
    tags: ["dbt", "Airflow", "Snowflake", "BigQuery", "Kafka", "Spark"],
    features: [
      "ELT/ETL data pipeline design and implementation",
      "Data warehouse and lakehouse architecture",
      "Real-time streaming data with Kafka / Kinesis",
      "Data quality monitoring and lineage tracking",
    ],
    featured: false,
  },
  {
    id: "security",
    icon: ShieldCheck,
    title: "Security & Compliance",
    tagline: "Security built in — not bolted on",
    description:
      "Security is not a sprint at the end of the project. We embed security engineers into the build process, conduct threat modelling before architecture is finalised, and deliver systems that pass audits because they were designed to.",
    tags: ["OWASP", "SAST/DAST", "SOC 2", "Zero Trust", "Vault", "Pen Testing"],
    features: [
      "Threat modelling and attack surface analysis",
      "OWASP Top 10 and SAST/DAST tooling integration",
      "Secrets management with HashiCorp Vault / AWS Secrets Manager",
      "SOC 2 Type II and ISO 27001 readiness preparation",
    ],
    featured: true,
  },
  {
    id: "monitoring",
    icon: BarChart3,
    title: "Monitoring & Support",
    tagline: "Observability, SRE, and 24/7 incident response",
    description:
      "You can't improve what you can't measure. We instrument your systems end-to-end, define SLOs that align with business outcomes, and staff on-call coverage so incidents are resolved before they become customer crises.",
    tags: ["Datadog", "OpenTelemetry", "Grafana", "PagerDuty", "SLOs", "Chaos Engineering"],
    features: [
      "Distributed tracing with OpenTelemetry / Jaeger",
      "Custom dashboards, alerting, and error budget tracking",
      "Incident response runbooks and game-day exercises",
      "Retainer-based 24/7 on-call engineering support",
    ],
    featured: false,
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-32 pb-20 overflow-hidden"
        aria-label="Services hero"
      >
        <div
          className="absolute inset-0 bg-grid-pattern bg-grid-lg opacity-100"
          aria-hidden="true"
        />
        <GlowOrb className="-top-40 left-1/2 -translate-x-1/2" size="xl" opacity={0.05} />
        <div className="relative z-10 container-max section-padding text-center flex flex-col items-center gap-6">
          <FadeIn>
            <SectionLabel>Our Services</SectionLabel>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance max-w-4xl"
              style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
            >
              Technical Excellence,{" "}
              <span className="gradient-text">Delivered End-to-End</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[#4A6580] text-lg max-w-2xl text-balance">
              Six practice areas that cover every layer of the stack — from
              architecture through deployment, security, and operations.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 md:py-16 pb-8" aria-label="Service details">
        <div className="container-max section-padding space-y-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <FadeIn key={service.id} delay={i * 0.05}>
                <article
                  id={service.id}
                  className={`relative rounded-2xl border p-8 md:p-10 scroll-mt-24 transition-all duration-300 ${
                    service.featured
                      ? "border-[#0891B2]/25 bg-gradient-to-br from-[#0891B2]/5 to-[#E8F1F5]/80"
                      : "border-[#0F2A44]/6 bg-[#E8F1F5]/50 hover:border-[#0F2A44]/10"
                  }`}
                >
                  {service.featured && (
                    <div className="absolute top-6 right-6">
                      <span className="tag">Core Differentiator</span>
                    </div>
                  )}

                  <div className="grid md:grid-cols-[1fr_1.6fr] gap-8 items-start">
                    {/* Left column */}
                    <div className="space-y-5">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#0891B2]/10 border border-[#0891B2]/20">
                          <Icon className="w-6 h-6 text-[#0891B2]" aria-hidden="true" />
                        </div>
                        <div>
                          <h2
                            className="text-xl md:text-2xl font-bold text-[#0F2A44] leading-tight"
                            style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                          >
                            {service.title}
                          </h2>
                          <p className="text-[#0891B2]/60 text-sm mt-0.5">{service.tagline}</p>
                        </div>
                      </div>

                      <p className="text-[#4A6580] text-base leading-relaxed">
                        {service.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-[#0F2A44]/4 border border-[#0F2A44]/8 text-[#4A6580] text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        href="/contact"
                        className="group inline-flex items-center gap-2 text-sm text-[#0891B2] font-medium hover:text-[#0891B2]/80 transition-colors"
                        aria-label={`Discuss ${service.title} with PentaCipher`}
                      >
                        Discuss this service
                        <ArrowRight
                          className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                          aria-hidden="true"
                        />
                      </Link>
                    </div>

                    {/* Right column — feature bullets */}
                    <div className="rounded-xl border border-[#0F2A44]/5 bg-[#E8F1F5]/40 p-6">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-[#4A6580] mb-4">
                        What&apos;s included
                      </p>
                      <ul className="space-y-3" role="list">
                        {service.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-3 text-sm text-[#4A6580] leading-relaxed">
                            <div
                              className="flex items-center justify-center w-4 h-4 rounded-full bg-[#0891B2]/15 border border-[#0891B2]/25 shrink-0 mt-0.5"
                              aria-hidden="true"
                            >
                              <Check className="w-2.5 h-2.5 text-[#0891B2]" />
                            </div>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* Closing CTA band */}
      <section className="py-16 md:py-20 border-t border-[#0F2A44]/5" aria-label="Start your project">
        <div className="container-max section-padding">
          <FadeIn>
            <div className="relative rounded-2xl border border-[#0891B2]/15 bg-gradient-to-br from-[#E8F1F5] to-[#E8F1F5] overflow-hidden">
              <div
                className="absolute inset-0 bg-glow-cyan opacity-60"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-grid-pattern bg-grid-lg opacity-30"
                aria-hidden="true"
              />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 px-8 md:px-12 py-10 md:py-12">
                <div className="text-center md:text-left space-y-2">
                  <h2
                    className="text-2xl md:text-3xl font-bold text-[#0F2A44]"
                    style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                  >
                    Ready to get started?
                  </h2>
                  <p className="text-[#4A6580]">
                    Free 30-minute scoping call. No commitment required.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-[#0891B2] text-[#F0F7FA] hover:bg-[#0891B2]/90 transition-all duration-200 shadow-[0_0_24px_rgba(8,145,178,0.3)] hover:shadow-[0_0_36px_rgba(8,145,178,0.5)] whitespace-nowrap"
                  >
                    Start Your Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border border-[#0F2A44]/10 text-[#4A6580] hover:border-[#0F2A44]/20 hover:text-[#0F2A44] hover:bg-[#0F2A44]/5 transition-all duration-200 whitespace-nowrap"
                  >
                    Schedule Consultation
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
