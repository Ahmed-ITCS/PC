"use client";

import { ArrowRight } from "lucide-react";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { ClipReveal } from "@/components/ui/ClipReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { CTAAccent } from "@/components/3d/CTAAccent";

export function CTA() {
  return (
    <section
      className="relative py-32 md:py-44 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      {/* 3D torus knot accent */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <CTAAccent />
      </div>

      {/* Glow */}
      <GlowOrb className="-top-20 left-1/2 -translate-x-1/2" size="xl" opacity={0.07} />
      <div
        className="absolute inset-0 bg-grid-pattern bg-grid-lg opacity-20"
        aria-hidden="true"
      />

      <div className="relative z-10 container-max section-padding flex flex-col items-center text-center gap-10">

        <ClipReveal delay={0.05}>
          <h2
            id="cta-heading"
            className="font-bold text-balance max-w-4xl"
            style={{
              fontFamily: "var(--font-syne), Syne, sans-serif",
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
          <p className="text-white/45 text-xl max-w-lg text-balance leading-relaxed">
            Tell us about your project and we&apos;ll respond within one
            business day with a scoping plan.
          </p>
        </ClipReveal>

        <ClipReveal delay={0.32}>
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <MagneticButton
              href="/contact"
              className="px-12 py-5 rounded-xl font-bold text-lg bg-[#00d4ff] text-[#04070f] shadow-[0_0_48px_rgba(0,212,255,0.4)] hover:shadow-[0_0_72px_rgba(0,212,255,0.6)] transition-shadow duration-300"
            >
              Start a Project
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </MagneticButton>

            <MagneticButton
              href="/services"
              strength={0.25}
              className="px-10 py-4 rounded-xl font-semibold text-sm border border-white/10 text-white/60 hover:border-white/25 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              Explore Services
            </MagneticButton>
          </div>
        </ClipReveal>

        <p className="text-white/20 text-xs">
          No commitment required. Free 30-minute scoping call.
        </p>
      </div>
    </section>
  );
}
