"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";

const navLinks = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#04070f]/80 backdrop-blur-2xl border-b border-white/8 shadow-[0_4px_48px_rgba(0,0,0,0.5)]"
            : "bg-transparent"
        }`}
      >
        <nav
          className="container-max section-padding flex items-center justify-between h-16 md:h-18"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00d4ff] rounded-lg"
            aria-label="PentaCipher home"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/20 group-hover:bg-[#00d4ff]/15 group-hover:border-[#00d4ff]/40 transition-all duration-200">
              <Shield className="w-4 h-4 text-[#00d4ff]" aria-hidden="true" />
              <div className="absolute inset-0 rounded-lg bg-[#00d4ff]/5 blur-sm group-hover:bg-[#00d4ff]/10 transition-all duration-200" />
            </div>
            <span
              className="text-white font-semibold text-base tracking-tight"
              style={{ fontFamily: "var(--font-display, Syne, sans-serif)" }}
            >
              PentaCipher
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#00d4ff] ${
                  pathname === link.href
                    ? "text-[#00d4ff] border-b-2 border-[#00d4ff] rounded-none pb-[6px]"
                    : "text-white/60 hover:text-white hover:bg-white/5 border-b-2 border-transparent pb-[6px]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="btn-primary text-[#04070f] bg-[#00d4ff] hover:bg-[#00d4ff]/90 font-semibold"
            >
              Start a Project
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors focus-visible:ring-2 focus-visible:ring-[#00d4ff]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-[#04070f]/98 backdrop-blur-xl pt-16 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col gap-1 p-6 flex-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center px-4 py-3.5 rounded-xl text-lg font-medium transition-all ${
                      pathname === link.href
                        ? "text-[#00d4ff] bg-[#00d4ff]/10"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.06 }}
                className="mt-4"
              >
                <Link
                  href="/contact"
                  className="flex items-center justify-center px-6 py-4 rounded-xl text-lg font-semibold bg-[#00d4ff] text-[#04070f] hover:bg-[#00d4ff]/90 transition-all"
                >
                  Start a Project
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
