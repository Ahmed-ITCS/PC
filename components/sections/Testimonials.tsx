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
    color: "#00D4FF",
  },
  {
    quote:
      "We needed a full-stack team to build our SaaS platform from scratch — spec to production in 12 weeks. PentaCipher delivered on time, on budget, and with a codebase our engineers actually enjoy maintaining.",
    author: "Marcus Webb",
    role: "Founder & CEO",
    company: "NovaTech Solutions",
    initial: "M",
    color: "#7C3AED",
  },
  {
    quote:
      "The security-first approach isn't just marketing — they baked it into every PR. Our SOC 2 audit was the smoothest it's ever been. I wouldn't trust critical infrastructure to anyone else.",
    author: "Priya Sharma",
    role: "VP Engineering",
    company: "Meridian Financial",
    initial: "P",
    color: "#10B981",
  },
  {
    quote:
      "As a digital agency we've worked with five dev shops. PentaCipher is different — they communicate like a partner, not a vendor, and they push back on bad ideas before they become expensive mistakes.",
    author: "James O'Sullivan",
    role: "Director of Technology",
    company: "Cascadia Creative",
    initial: "J",
    color: "#F59E0B",
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
      className="relative py-24 md:py-32 overflow-hidden bg-[#F8FAFC]"
      aria-labelledby="testimonials-heading"
    >
      <div className="relative z-10 container-max section-padding">
        <FadeIn className="flex flex-col items-center text-center gap-5 mb-14">
          <SectionLabel>Client Voices</SectionLabel>
          <h2
            id="testimonials-heading"
            className="text-3xl md:text-4xl font-bold text-balance text-[#0F172A]"
            style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
          >
            What Our Partners Say
          </h2>
        </FadeIn>

        <div className="max-w-3xl mx-auto">
          <div
            className="relative rounded-2xl border border-[#E2E8F0] bg-white p-8 md:p-12 overflow-hidden shadow-card"
          >
            {/* Top accent line */}
            <motion.div
              key={current}
              className="absolute inset-x-0 top-0 h-px rounded-t-2xl bg-accent/40"
              animate={{ opacity: [0, 1] }}
              transition={{ duration: 0.4 }}
              aria-hidden="true"
            />

            <Quote className="w-10 h-10 mb-6 text-accent/20" aria-hidden="true" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote>
                  <p className="text-[#475569] text-lg md:text-xl leading-relaxed font-light italic mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="flex items-center gap-4">
                    <div
                      className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-base shrink-0 bg-[#F1F5F9] border border-[#E2E8F0] text-accent"
                      aria-hidden="true"
                    >
                      {t.initial}
                    </div>
                    <div>
                      <cite className="text-[#0F172A] font-semibold text-sm not-italic">
                        {t.author}
                      </cite>
                      <p className="text-[#64748B] text-xs mt-0.5">
                        {t.role}, {t.company}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#E2E8F0]">
              <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
                {testimonials.map((t2, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    role="tab"
                    aria-selected={i === current}
                    aria-label={`Testimonial ${i + 1} of ${total}`}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === current ? "1.5rem" : "0.375rem",
                      background: i === current ? "#0369A1" : "#CBD5E1",
                    }}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                {[{ fn: prev, label: "Previous testimonial", Icon: ChevronLeft }, { fn: next, label: "Next testimonial", Icon: ChevronRight }].map(({ fn, label, Icon }) => (
                  <button
                    key={label}
                    onClick={fn}
                    aria-label={label}
                    className="p-2 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:border-[#CBD5E1] hover:bg-[#F8FAFC] transition-all duration-150"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
