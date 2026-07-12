"use client";

import { SectionLabel } from "@/components/ui/SectionLabel";

const logos = [
  "Acme Corp",
  "Skybridge",
  "NovaTech",
  "Cascadia",
  "Meridian",
  "Apex Labs",
  "Solaris",
  "Vertice",
];

const techStack = [
  "Next.js",
  "TypeScript",
  "AWS",
  "Kubernetes",
  "PostgreSQL",
  "Terraform",
  "Go",
  "React",
  "Python",
  "Docker",
];

const allLogos = [...logos, ...logos, ...logos, ...logos];
const allTech = [...techStack, ...techStack, ...techStack, ...techStack];

export function TrustBar() {
  return (
    <section
      className="relative py-12 border-y border-[#0A1B2E]/8 bg-[#D4EEF5]/60 overflow-hidden"
      aria-label="Trusted by companies"
    >
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #D4EEF5, transparent)" }}
        aria-hidden="true"
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #D4EEF5, transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-7 flex justify-center">
        <SectionLabel>Trusted by 50+ teams worldwide</SectionLabel>
      </div>

      {/* Row 1 — client logos (left to right) */}
      <div className="flex overflow-hidden mb-3" aria-label="Client names">
        <div
          className="flex gap-12 shrink-0"
          style={{ animation: "marquee var(--marquee-duration, 40s) linear infinite" }}
        >
          {allLogos.map((name, i) => (
            <div
              key={i}
              className="flex items-center px-6 py-2.5 rounded-lg border border-[#0A1B2E]/10 bg-white/50 backdrop-blur-sm text-[#0A1B2E]/45 text-base font-semibold whitespace-nowrap tracking-wide hover:border-[#00d4ff]/25 hover:text-[#0A1B2E]/70 transition-colors duration-300"
              style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>

      {/* Row 2 — tech stack (right to left) */}
      <div className="flex overflow-hidden" aria-label="Technologies we use">
        <div
          className="flex gap-12 shrink-0"
          style={{ animation: "marqueeReverse var(--marquee-duration, 40s) linear infinite" }}
        >
          {allTech.map((name, i) => (
            <div
              key={i}
              className="flex items-center px-6 py-2.5 rounded-lg border border-[#00d4ff]/15 bg-[#00d4ff]/[0.04] text-[#00d4ff]/60 text-base font-semibold whitespace-nowrap tracking-widest uppercase hover:text-[#00d4ff]/80 transition-colors duration-300"
              style={{ fontFamily: "var(--font-mono), JetBrains Mono, monospace", fontSize: "0.75rem" }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
