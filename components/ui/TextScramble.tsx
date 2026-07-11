"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#";

interface TextScrambleProps {
  text: string;
  className?: string;
  trigger?: "inview" | "hover" | "always";
  duration?: number;
  delay?: number;
}

export function TextScramble({
  text,
  className = "",
  trigger = "inview",
  duration = 800,
  delay = 0,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(trigger === "always" ? "" : text);
  const ref = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const hasRun = useRef(false);

  const scramble = (delayMs = 0) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const totalFrames = Math.ceil(duration / 16);
    let frame = 0;

    const start = () => {
      const tick = () => {
        const resolved = Math.floor((frame / totalFrames) * text.length);
        const result = text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < resolved) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
        setDisplay(result);
        frame++;
        if (frame <= totalFrames) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setDisplay(text);
        }
      };
      rafRef.current = requestAnimationFrame(tick);
    };

    if (delayMs > 0) {
      setTimeout(start, delayMs);
    } else {
      start();
    }
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    if (trigger === "always") {
      scramble(delay);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  useEffect(() => {
    if (trigger === "inview" && isInView && !hasRun.current) {
      hasRun.current = true;
      scramble(delay);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, trigger]);

  const handleMouseEnter = () => {
    if (trigger === "hover") scramble();
  };

  return (
    <span
      ref={ref}
      className={className}
      onMouseEnter={handleMouseEnter}
      aria-label={text}
    >
      {display}
    </span>
  );
}
