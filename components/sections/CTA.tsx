"use client";

import { ArrowRight } from "lucide-react";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { ClipReveal } from "@/components/ui/ClipReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function CTA() {
  return (
    <section
      className="relative py-32 md:py-44 overflow-hidden bg-white"
      aria-labelledby="cta-heading"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid-lg opacity-30" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-glow-accent opacity-60"
        aria-hidden="true"
      />

      <GlowOrb className="-top-20 left-1/2 -translate-x-1/2" size="xl" opacity={0.10} />

      {/* Horizontal accent lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#CBD5E1] to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#CBD5E1] to-transparent" aria-hidden="true" />

      <div className="relative z-10 container-max section-padding flex flex-col items-center text-center gap-10">

        <ClipReveal delay={0.05}>
          <h2
            id="cta-heading"
            className="font-display font-bold text-balance max-w-4xl text-[#0F172A]"
            style={{
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              lineHeight: "1.0",
              letterSpacing: "-0.03em",
            }}
          >
            Ready to build<br />
            <span className="gradient-text">something real?</span>
          </h2>
        </ClipReveal>

        <ClipReveal delay={0.2}>
          <p className="text-[#475569] text-xl max-w-lg text-balance leading-relaxed">
            Tell us about your project and we&apos;ll respond within one
            business day with a scoping plan.
          </p>
        </ClipReveal>

        <ClipReveal delay={0.32}>
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <MagneticButton
              href="/contact"
              className="px-12 py-5 rounded-xl font-bold text-lg bg-accent text-white shadow-accent hover:bg-accent-hover hover:shadow-accent-lg transition-all duration-200"
            >
              Start a Project
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </MagneticButton>

            <MagneticButton
              href="/services"
              strength={0.25}
              className="px-10 py-4 rounded-xl font-semibold text-sm border border-[#CBD5E1] text-[#334155] bg-white hover:border-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition-all duration-200"
            >
              Explore Services
            </MagneticButton>
          </div>
        </ClipReveal>

        <p className="text-[#94A3B8] text-xs tracking-wide">
          No commitment required · Free 30-minute scoping call
        </p>
      </div>
    </section>
  );
}
