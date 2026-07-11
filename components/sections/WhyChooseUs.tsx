"use client";

import {
  Zap,
  ShieldCheck,
  GraduationCap,
  Target,
  Clock,
  Award,
  Lightbulb,
  Handshake,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TextReveal } from "@/components/ui/TextReveal";

const reasons = [
  { icon: Zap, title: "Rapid Development", description: "Sprints start within two weeks. We move fast without cutting corners." },
  { icon: ShieldCheck, title: "Enterprise Security", description: "OWASP compliance, secrets management, and zero-trust by default." },
  { icon: GraduationCap, title: "Expert Team", description: "Senior engineers with 5–12 years of production experience." },
  { icon: Target, title: "Business-Focused", description: "Technical decisions aligned with your business outcomes." },
  { icon: Clock, title: "24/7 Support", description: "Critical issues get a response at any hour." },
  { icon: Award, title: "Proven Track Record", description: "100% completion rate. Zero security breaches." },
  { icon: Lightbulb, title: "Innovation First", description: "Emerging tech only when it genuinely adds value." },
  { icon: Handshake, title: "Dedicated Partnership", description: "A named team that knows your codebase and goals." },
];

export function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-section" aria-labelledby="why-choose-us-heading" ref={ref}>
      <div className="container-max section-padding">
        <div className="mb-20">
          <TextReveal
            as="h2"
            className="text-display-lg max-w-3xl"
          >
            Why clients{" "}
            <span className="gradient-text">come back every time.</span>
          </TextReveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group/card space-y-4 rounded-2xl p-5 -m-5 hover:bg-white/60 hover:shadow-subtle hover:-translate-y-1 active:scale-[0.98] transition-all duration-300"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : { scale: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + i * 0.08,
                    type: "spring",
                    stiffness: 300,
                  }}
                  className="w-10 h-10 rounded-xl bg-[#0891B2]/8 flex items-center justify-center group-hover/card:bg-[#0891B2] transition-all duration-300"
                >
                  <Icon className="w-5 h-5 text-[#0891B2] group-hover/card:text-white transition-colors duration-300" aria-hidden="true" />
                </motion.div>
                <h3
                  className="text-[#0F2A44] font-semibold text-base group-hover/card:text-[#0891B2] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
                >
                  {reason.title}
                </h3>
                <p className="text-[#4A6580] text-sm leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
