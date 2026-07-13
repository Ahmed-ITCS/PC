"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";

const logos = [
  "Acme Corp", "Skybridge", "NovaTech", "Cascadia",
  "Meridian",  "Apex Labs", "Solaris",  "Vertice",
];

const techStack = [
  "Next.js", "TypeScript", "AWS", "Kubernetes",
  "PostgreSQL", "Terraform", "Go", "React",
  "Python", "Docker",
];

const allLogos = [...logos, ...logos, ...logos, ...logos];
const allTech  = [...techStack, ...techStack, ...techStack, ...techStack];

export function TrustBar() {
  return (
    <section
      className="relative py-12 border-y border-[#E2E8F0] bg-white overflow-hidden"
      aria-label="Trusted by companies"
    >
      {/* Fades */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #FFFFFF, transparent)" }}
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #FFFFFF, transparent)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 mb-7 flex justify-center">
        <SectionLabel>Trusted by 50+ teams worldwide</SectionLabel>
      </div>

      {/* Row 1 — client logos left */}
      <div className="relative z-10 flex overflow-hidden mb-3" aria-label="Client names">
        <div
          className="flex gap-10 shrink-0"
          style={{ animation: "marquee var(--marquee-duration, 40s) linear infinite" }}
        >
          {allLogos.map((name, i) => (
            <div
              key={i}
              className="flex items-center px-5 py-2 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-[#94A3B8] text-sm font-semibold whitespace-nowrap tracking-wide hover:border-[#CBD5E1] hover:text-[#64748B] transition-colors duration-300"
              style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — tech stack right */}
      <div className="relative z-10 flex overflow-hidden" aria-label="Technologies we use">
        <div
          className="flex gap-10 shrink-0"
          style={{ animation: "marqueeReverse var(--marquee-duration, 40s) linear infinite" }}
        >
          {allTech.map((name, i) => (
            <div
              key={i}
              className="flex items-center px-5 py-2 rounded-lg border border-[#E2E8F0] bg-[#F1F5F9] text-[#475569] text-xs font-bold whitespace-nowrap tracking-[0.15em] uppercase hover:text-[#0F172A] hover:border-[#CBD5E1] transition-colors duration-300"
              style={{ fontFamily: "var(--font-mono), JetBrains Mono, monospace" }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
