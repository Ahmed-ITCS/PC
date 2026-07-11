"use client";

import { useRef } from "react";
import Link from "next/link";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  "aria-label"?: string;
}

export function MagneticButton({
  children,
  className = "",
  strength = 0.4,
  href,
  onClick,
  type = "button",
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const innerRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    if (innerRef.current) {
      innerRef.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      innerRef.current.style.transition = "transform 0.1s ease-out";
    }
  };

  const handleMouseLeave = () => {
    if (innerRef.current) {
      innerRef.current.style.transform = "translate(0, 0)";
      innerRef.current.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
    }
  };

  const inner = (
    <span ref={innerRef} className="inline-flex items-center gap-2 relative z-10">
      {children}
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        data-magnetic
        className={`relative inline-flex items-center justify-center ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        aria-label={ariaLabel}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type={type}
      data-magnetic
      className={`relative inline-flex items-center justify-center ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {inner}
    </button>
  );
}
