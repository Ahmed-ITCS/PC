"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeIn } from "@/components/ui/FadeIn";
import { SectionLabel } from "@/components/ui/SectionLabel";

const testimonials = [
  {
    quote:
      "PentaCipher turned our chaotic deployment process into a polished CI/CD pipeline in under four weeks. Their security review caught three critical vulnerabilities our internal team had missed. Worth every penny.",
    author: "Sarah Chen",
    role: "CTO",
    company: "Skybridge Digital",
    initial: "S",
  },
  {
    quote:
      "We needed a full-stack team to build our SaaS platform from scratch — spec to production in 12 weeks. PentaCipher delivered on time, on budget, and with a codebase our engineers actually enjoy maintaining.",
    author: "Marcus Webb",
    role: "Founder & CEO",
    company: "NovaTech Solutions",
    initial: "M",
  },
  {
    quote:
      "The security-first approach isn't just marketing — they baked it into every PR. Our SOC 2 audit was the smoothest it's ever been. I wouldn't trust critical infrastructure to anyone else.",
    author: "Priya Sharma",
    role: "VP Engineering",
    company: "Meridian Financial",
    initial: "P",
  },
  {
    quote:
      "As a digital agency we've worked with five dev shops. PentaCipher is different — they communicate like a partner, not a vendor, and they push back on bad ideas before they become expensive mistakes.",
    author: "James O'Sullivan",
    role: "Director of Technology",
    company: "Cascadia Creative",
    initial: "J",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  const t = testimonials[current];

  return (
    <section
      className="relative py-24 md:py-32 bg-[#E8F1F5] overflow-hidden"
      aria-labelledby="testimonials-heading"
    >
      <div className="relative z-10 container-max section-padding">
        <FadeIn className="flex flex-col items-center text-center gap-5 mb-14">
          <SectionLabel>Client Voices</SectionLabel>
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl font-bold text-balance"
            style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
          >
            What Our Partners Say
          </h2>
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          <div className="relative rounded-2xl border border-[#0F2A44]/8 bg-white/70 backdrop-blur-sm p-8 md:p-12">
            {/* Quote icon */}
            <Quote
              className="w-10 h-10 text-[#0891B2]/15 mb-6"
              aria-hidden="true"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <blockquote>
                  <p className="text-[#0F2A44] text-lg md:text-xl leading-relaxed font-light italic mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="flex items-center gap-4">
                    <div
                      className="w-11 h-11 rounded-full bg-[#0891B2]/10 border border-[#0891B2]/20 flex items-center justify-center text-[#0891B2] font-bold text-base"
                      aria-hidden="true"
                    >
                      {t.initial}
                    </div>
                    <div>
                      <cite className="text-[#0F2A44] font-semibold text-sm not-italic">
                        {t.author}
                      </cite>
                      <p className="text-[#8BA3B8] text-xs mt-0.5">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#0F2A44]/6">
              <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Testimonial ${i + 1} of ${total}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-6 bg-[#0891B2]"
                        : "w-1.5 bg-[#0F2A44]/15 hover:bg-[#0F2A44]/25"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="p-2 rounded-lg border border-[#0F2A44]/8 text-[#8BA3B8] hover:text-[#0F2A44] hover:border-[#0F2A44]/20 hover:bg-[#F0F7FA] transition-all duration-150"
                >
                  <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="p-2 rounded-lg border border-[#0F2A44]/8 text-[#8BA3B8] hover:text-[#0F2A44] hover:border-[#0F2A44]/20 hover:bg-[#F0F7FA] transition-all duration-150"
                >
                  <ChevronRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
