"use client";

import { ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-section" aria-labelledby="cta-heading" ref={ref}>
      <div className="container-max section-padding">
        <div className="max-w-3xl">
          <TextReveal
            as="h2"
            className="text-display-lg"
          >
            Ready to build something{" "}
            <span className="gradient-text">secure & scalable?</span>
          </TextReveal>
          <motion.p
            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 16, filter: "blur(4px)" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#4A6580] text-xl mt-6 max-w-xl"
          >
            Tell us about your project and we&apos;ll respond within one
            business day with a scoping plan.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <MagneticButton as="a" href="/contact" className="btn-primary" strength={0.2}>
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton as="a" href="/services" className="btn-secondary" strength={0.2}>
              Explore Services
            </MagneticButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
