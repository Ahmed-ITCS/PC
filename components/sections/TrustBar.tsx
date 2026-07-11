"use client";

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

const allLogos = [...logos, ...logos, ...logos, ...logos];

export function TrustBar() {
  return (
    <section
      className="relative py-14 border-y border-[#0F2A44]/6 overflow-hidden"
      aria-label="Trusted by companies"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-6">
        <p className="text-center text-[#8BA3B8] text-xs font-semibold tracking-widest uppercase">
          Trusted by forward-thinking teams
        </p>
      </div>
      {/* Gradient masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, #F0F7FA, transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left, #F0F7FA, transparent)",
        }}
        aria-hidden="true"
      />

      <div className="flex overflow-hidden">
        <div
          className="flex gap-8 shrink-0"
          style={{ animation: "marquee 40s linear infinite" }}
          aria-label="Client names"
        >
          {allLogos.map((name, i) => (
            <div
              key={i}
              className="flex items-center px-5 py-2 rounded-lg border border-[#0F2A44]/8 bg-white/50 backdrop-blur-sm text-[#8BA3B8] text-sm font-semibold whitespace-nowrap tracking-wide hover:border-[#0891B2]/20 hover:text-[#4A6580] transition-colors duration-300"
              style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
