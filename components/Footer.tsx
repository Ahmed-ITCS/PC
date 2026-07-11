"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const footerLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function Footer() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer
      className="border-t border-[#0F2A44]/6"
      role="contentinfo"
      aria-label="Site footer"
      ref={ref}
    >
      <div className="container-max section-padding py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group"
              aria-label="PentaCipher home"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-300">
                <img src="/logo.jpeg" alt="PentaCipher" className="w-full h-full object-contain" />
              </div>
              <span
                className="text-[#0F2A44] font-semibold text-base"
                style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
              >
                PentaCipher
              </span>
            </Link>
          </motion.div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={link.href}
                  className="text-[#8BA3B8] hover:text-[#0F2A44] hover:underline hover:underline-offset-4 text-sm transition-all duration-300"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 pt-8 border-t border-[#0F2A44]/6"
        >
          <p className="text-[#8BA3B8] text-xs">
            © {new Date().getFullYear()} PentaCipher. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
