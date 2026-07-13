interface PentaCipherLogoProps {
  size?: number;
  className?: string;
}

export function PentaCipherIcon({ size = 36, className = "" }: PentaCipherLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Pentagon background — deep navy */}
      <polygon
        points="20,3 35.2,13.2 29.5,32.5 10.5,32.5 4.8,13.2"
        fill="#0F172A"
      />
      {/* Stylised C — accent blue, opens to the right */}
      <path
        d="M 29 14 A 10 10 0 1 0 29 26"
        stroke="#0EA5E9"
        strokeWidth="3.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

interface LogoTextProps {
  className?: string;
  /** "dark" for use on light backgrounds, "light" for use on dark backgrounds */
  variant?: "dark" | "light";
}

export function PentaCipherLogoText({ className = "", variant = "dark" }: LogoTextProps) {
  const pentaColor = variant === "dark" ? "#0F172A" : "#ffffff";
  return (
    <div className={`flex flex-col leading-none ${className}`}>
      <span
        className="font-bold text-sm"
        style={{
          fontFamily: "var(--font-syne), Syne, sans-serif",
          color: pentaColor,
          letterSpacing: "-0.01em",
        }}
      >
        Penta
      </span>
      <span
        className="text-[10px] tracking-[0.18em] uppercase"
        style={{
          fontFamily: "var(--font-syne), Syne, sans-serif",
          fontWeight: 500,
          color: "#0369A1",
        }}
      >
        Cipher
      </span>
    </div>
  );
}
