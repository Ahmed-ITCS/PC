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
      className="relative py-12 border-y border-white/5 bg-[#080e1e]/60 overflow-hidden"
      aria-label="Trusted by companies"
    >
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #080e1e, transparent)" }}
        aria-hidden="true"
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #080e1e, transparent)" }}
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
              className="flex items-center px-6 py-2.5 rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur-sm text-white/35 text-base font-semibold whitespace-nowrap tracking-wide hover:border-[#00d4ff]/15 hover:text-white/50 transition-colors duration-300"
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
              className="flex items-center px-6 py-2.5 rounded-lg border border-[#00d4ff]/8 bg-[#00d4ff]/[0.03] text-[#00d4ff]/30 text-base font-semibold whitespace-nowrap tracking-widest uppercase hover:text-[#00d4ff]/50 transition-colors duration-300"
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
