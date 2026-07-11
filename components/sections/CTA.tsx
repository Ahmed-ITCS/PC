"use client";

import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";

export function CTA() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      aria-labelledby="cta-heading"
    >
      <div className="container-max section-padding">
        <FadeIn>
          <div className="relative rounded-2xl overflow-hidden border border-[#0F2A44]/10 bg-gradient-to-br from-[#E8F1F5] to-[#F0F7FA]">
            <div
              className="absolute inset-0 bg-grid-pattern bg-grid-lg opacity-10"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col items-center text-center gap-6 py-16 md:py-20 px-6 md:px-12">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0891B2]/10 border border-[#0891B2]/20">
                <Shield
                  className="w-7 h-7 text-[#0891B2]"
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

              <p className="text-[#4A6580] text-lg max-w-xl text-balance">
                Tell us about your project and we&apos;ll respond within one
                business day with a scoping plan.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm bg-[#0891B2] text-white hover:bg-[#0891B2]/90 transition-all duration-200 shadow-[0_4px_20px_rgba(8,145,178,0.25)] hover:shadow-[0_4px_28px_rgba(8,145,178,0.35)]"
                >
                  Start a Project
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border border-[#0F2A44]/10 text-[#4A6580] hover:border-[#0F2A44]/15 hover:text-[#0F2A44] hover:bg-[#0F2A44]/4 transition-all duration-200"
                >
                  Explore Services
                </Link>
              </div>

              <p className="text-[#8BA3B8] text-xs mt-2">
                No commitment required. Free 30-minute scoping call.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
