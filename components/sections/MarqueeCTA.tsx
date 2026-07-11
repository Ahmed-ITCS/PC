const words = ["SECURE", "SCALABLE", "SHIP IT", "ON TIME", "ZERO BREACHES", "SECURE"];
const allWords = [...words, ...words];

export function MarqueeCTA() {
  return (
    <section
      className="relative py-6 border-y border-white/5 overflow-hidden"
      aria-hidden="true"
    >
      {/* Left fade */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #04070f, transparent)" }}
      />
      {/* Right fade */}
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #04070f, transparent)" }}
      />

      <div className="flex overflow-hidden select-none">
        <div
          className="flex items-center shrink-0 gap-0"
          style={{ animation: "marquee var(--marquee-duration, 30s) linear infinite" }}
        >
          {allWords.map((word, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-0 text-[#00d4ff]/70 font-bold tracking-widest uppercase whitespace-nowrap"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontFamily: "var(--font-syne), Syne, sans-serif",
              }}
            >
              {word}
              <span className="mx-6 md:mx-10 text-[#00d4ff]/20 font-light">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
