"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export function RevealText({
  text,
  className = "",
  delay = 0,
}: RevealTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <h1 className="flex flex-wrap">
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
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </h1>
    </div>
  );
}
