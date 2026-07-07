"use client";

import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { GlowOrb } from "@/components/ui/GlowOrb";

export function CTA() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <div className="container-max section-padding">
        <FadeIn>
          <div className="relative rounded-2xl overflow-hidden border border-[#00d4ff]/12 bg-gradient-to-br from-[#0d1529] to-[#080e1e]">
            {/* Inner glow */}
            <GlowOrb className="-top-20 left-1/2 -translate-x-1/2" size="lg" opacity={0.08} />
            <div
              className="absolute inset-0 bg-grid-pattern bg-grid-lg opacity-40"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col items-center text-center gap-6 py-16 md:py-20 px-6 md:px-12">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#00d4ff]/10 border border-[#00d4ff]/20">
                <Shield
                  className="w-7 h-7 text-[#00d4ff]"
                  aria-hidden="true"
                />
              </div>

              <h2
                id="cta-heading"
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance max-w-3xl"
                style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
              >
                Ready to Build Something{" "}
                <span className="gradient-text">Secure & Scalable?</span>
              </h2>

              <p className="text-white/50 text-lg max-w-xl text-balance">
                Tell us about your project and we&apos;ll respond within one
                business day with a scoping plan.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-[#00d4ff] text-[#04070f] hover:bg-[#00d4ff]/90 transition-all duration-200 shadow-[0_0_24px_rgba(0,212,255,0.3)] hover:shadow-[0_0_32px_rgba(0,212,255,0.45)]"
                >
                  Start a Project
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border border-white/10 text-white/70 hover:border-white/20 hover:text-white hover:bg-white/5 transition-all duration-200"
                >
                  Explore Services
                </Link>
              </div>

              <p className="text-white/25 text-xs mt-2">
                No commitment required. Free 30-minute scoping call.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
