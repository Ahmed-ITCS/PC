"use client";

interface MarqueeProps {
  items: string[];
  className?: string;
  speed?: number;
}

export function Marquee({ items, className = "", speed = 30 }: MarqueeProps) {
  return (
    <div
      className={`group/marquee overflow-hidden ${className}`}
      aria-hidden="true"
      onMouseEnter={(e) => {
        const track = e.currentTarget.querySelector(".marquee-track") as HTMLElement;
        if (track) track.style.animationPlayState = "paused";
      }}
      onMouseLeave={(e) => {
        const track = e.currentTarget.querySelector(".marquee-track") as HTMLElement;
        if (track) track.style.animationPlayState = "running";
      }}
    >
      <div
        className="marquee-track flex whitespace-nowrap"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          width: "max-content",
        }}
      >
        {/* First set */}
        {items.map((item, i) => (
          <span
            key={`a-${i}`}
            className="inline-flex items-center gap-6 px-6 text-sm md:text-base text-[#4A6580]/60 font-medium hover:text-[#0F2A44] hover:scale-105 transition-all duration-200 cursor-default"
          >
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2]/30 flex-shrink-0 group-hover/marquee:bg-[#0891B2]/50 transition-colors" />
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {items.map((item, i) => (
          <span
            key={`b-${i}`}
            className="inline-flex items-center gap-6 px-6 text-sm md:text-base text-[#4A6580]/60 font-medium hover:text-[#0F2A44] hover:scale-105 transition-all duration-200 cursor-default"
          >
            <span>{item}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#0891B2]/30 flex-shrink-0 group-hover/marquee:bg-[#0891B2]/50 transition-colors" />
          </span>
        ))}
      </div>
    </div>
  );
}
