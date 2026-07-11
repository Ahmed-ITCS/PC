"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  as = "h2",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const Tag = motion[as as keyof typeof motion] as typeof motion.h2;

  const isString = typeof children === "string";

  if (isString) {
    const words = (children as string).split(" ");
    return (
      <div ref={ref} className={`overflow-hidden ${className}`}>
        <div className="flex flex-wrap">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.25em]"
              initial={{ y: "110%", rotate: 3 }}
              animate={
                isInView
                  ? { y: "0%", rotate: 0 }
                  : { y: "110%", rotate: 3 }
              }
              transition={{
                duration: 0.6,
                delay: delay + i * 0.04,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <Tag
        initial={{ clipPath: "inset(0 0 100% 0)" }}
        animate={
          isInView
            ? { clipPath: "inset(0 0 0% 0)" }
            : { clipPath: "inset(0 0 100% 0)" }
        }
        transition={{
          duration: 0.7,
          delay,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }}
      >
        {children}
      </Tag>
    </div>
  );
}
