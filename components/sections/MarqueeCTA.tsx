const words = ["SECURE", "SCALABLE", "SHIP IT", "ON TIME", "ZERO BREACHES", "SECURE"];
const allWords = [...words, ...words];

export function MarqueeCTA() {
  return (
    <section
      className="relative py-6 border-y border-[#E2E8F0] overflow-hidden"
      style={{ background: "#F8FAFC" }}
      aria-hidden="true"
    >
      {/* Fades */}
      <div
        className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #F8FAFC, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #F8FAFC, transparent)" }}
      />

      {/* Glow line */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[rgba(3,105,161,0.15)] to-transparent" />
      </div>

      <div className="flex overflow-hidden select-none">
        <div
          className="flex items-center shrink-0"
          style={{ animation: "marquee var(--marquee-duration, 30s) linear infinite" }}
        >
          {allWords.map((word, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-0 font-bold tracking-widest uppercase whitespace-nowrap"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontFamily: "var(--font-syne), Syne, sans-serif",
                color: "transparent",
                WebkitTextStroke: "1px #CBD5E1",
              }}
            >
              {word}
              <span
                className="mx-6 md:mx-10 font-light text-accent"
                style={{ WebkitTextStroke: "0px" }}
              >·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
