"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TextReveal } from "@/components/ui/TextReveal";

const services = [
  {
    number: "01",
    title: "Secure MVP Development",
    description:
      "Go from concept to production-ready product with security baked in at every layer.",
    features: [
      "Full-stack React + Next.js build",
      "OWASP-compliant architecture",
      "CI/CD with automated security scans",
    ],
    href: "/services",
  },
  {
    number: "02",
    title: "Cloud Deployment & Hardening",
    description:
      "Production-grade cloud infrastructure with hardened databases, automated failover, and zero-downtime deploys.",
    features: [
      "AWS / GCP / Azure multi-region",
      "Encryption at rest & in transit",
      "Auto-scaling Kubernetes with Terraform",
    ],
    href: "/services",
  },
  {
    number: "03",
    title: "End-to-End Product Development",
    description:
      "Your entire technical function — from first commit through launch, scaling, and ongoing operations.",
    features: [
      "Discovery, architecture, build & deploy",
      "Dedicated team in your workflow",
      "Post-launch SRE and support",
    ],
    href: "/services",
  },
];

export function CoreServices() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="core-services" className="py-section" aria-labelledby="core-services-heading" ref={ref}>
      <div className="container-max section-padding">
        <div className="mb-20">
          <TextReveal
            as="h2"
            className="text-display-lg max-w-3xl"
          >
            Everything you need to{" "}
            <span className="gradient-text">ship with confidence.</span>
          </TextReveal>
        </div>

        <div className="space-y-0 divide-y divide-[#0F2A44]/8">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group/row py-10 md:py-14 flex flex-col md:flex-row md:items-start gap-6 md:gap-12 border-l-2 border-transparent hover:border-[#0891B2] hover:bg-[#0891B2]/[0.02] hover:pl-5 active:bg-[#0891B2]/[0.02] transition-all duration-300"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15, type: "spring" }}
                className="text-[#0891B2] font-mono text-sm mt-1 shrink-0 group-hover/row:scale-110 transition-transform duration-300"
              >
                {svc.number}
              </motion.span>
              <div className="flex-1 grid md:grid-cols-2 gap-6 md:gap-12">
                <div className="space-y-3">
                  <h3
                    className="text-display-sm"
                    style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                  >
                    {svc.title}
                  </h3>
                  <p className="text-[#4A6580] text-lg leading-relaxed">
                    {svc.description}
                  </p>
                </div>
                <div className="space-y-2">
                  {svc.features.map((f, j) => (
                    <motion.div
                      key={f}
                      initial={{ opacity: 0, x: 12 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
                      transition={{
                        duration: 0.4,
                        delay: 0.4 + i * 0.15 + j * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="text-[#4A6580] text-sm flex items-center gap-2"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : { scale: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.5 + i * 0.15 + j * 0.08,
                          type: "spring",
                          stiffness: 300,
                        }}
                        className="w-1 h-1 rounded-full bg-[#0891B2] shrink-0"
                      />
                      {f}
                    </motion.div>
                  ))}
                </div>
              </div>
              <Link
                href={svc.href}
                className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-[#0891B2] shrink-0 mt-1"
                aria-label={`Learn more about ${svc.title}`}
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
