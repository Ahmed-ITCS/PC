interface SectionNumberProps {
  number: string;
  className?: string;
}

export function SectionNumber({ number, className = "" }: SectionNumberProps) {
  return (
    <div
      aria-hidden="true"
      className={`absolute select-none pointer-events-none font-bold leading-none text-[#0F172A]/[0.035] ${className}`}
      style={{
        fontSize: "clamp(8rem, 20vw, 18rem)",
        fontFamily: "var(--font-syne), Syne, sans-serif",
      }}
    >
      {number}
    </div>
  );
}
