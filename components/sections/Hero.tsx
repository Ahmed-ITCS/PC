"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { RevealText } from "@/components/ui/RevealText";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function Hero() {
  return (
    <section
      className="min-h-screen flex flex-col justify-center pt-24 pb-16"
      aria-label="Hero"
    >
      <div className="container-max section-padding">
        <div className="max-w-[1000px]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <RevealText
              text="We build secure software that scales."
              className="text-display-xl"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-[#4A6580] text-xl md:text-2xl leading-relaxed max-w-2xl mt-8"
          >
            Security-first development for agencies, startups, and enterprises.
            Full-stack engineering, DevOps, and cloud infrastructure — built to last.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4 mt-12"
          >
            <MagneticButton as="a" href="/contact" className="btn-primary" strength={0.2}>
              Start a Project
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton as="a" href="/services" className="btn-secondary" strength={0.2}>
              View Services
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-[#0F2A44]/15 flex items-start justify-center p-1"
        >
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
            className="w-1 h-1.5 rounded-full bg-[#0891B2]"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
