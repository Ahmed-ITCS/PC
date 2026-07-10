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
      className="relative py-14 border-y border-white/5 bg-[#080e1e]/60 overflow-hidden"
      aria-label="Trusted by companies"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-6">
        <p className="text-center text-white/30 text-xs font-semibold tracking-widest uppercase">
          Trusted by forward-thinking teams
        </p>
      </div>
      {/* Gradient masks */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, #080e1e, transparent)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to left, #080e1e, transparent)",
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
              className="flex items-center px-5 py-2 rounded-lg border border-white/10 bg-white/[0.04] backdrop-blur-sm text-white/35 text-sm font-semibold whitespace-nowrap tracking-wide hover:border-[#00d4ff]/15 hover:text-white/50 transition-colors duration-300"
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
