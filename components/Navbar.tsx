"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { PentaCipherIcon, PentaCipherLogoText } from "@/components/ui/PentaCipherLogo";

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
            ? "bg-[#EBF6F9]/95 backdrop-blur-2xl border-b border-[#0A1B2E]/8 shadow-[0_4px_32px_rgba(10,27,46,0.08)]"
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
            <div className="group-hover:scale-105 transition-transform duration-200">
              <PentaCipherIcon size={36} />
            </div>
            <PentaCipherLogoText variant="dark" />
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
                    : "text-[#0A1B2E]/60 hover:text-[#0A1B2E] hover:bg-[#0A1B2E]/5 border-b-2 border-transparent pb-[6px]"
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
              className="btn-primary text-[#0A1B2E] bg-[#00d4ff] hover:bg-[#00d4ff]/90 font-semibold"
            >
              Start a Project
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-[#0A1B2E]/70 hover:text-[#0A1B2E] hover:bg-[#0A1B2E]/5 transition-colors focus-visible:ring-2 focus-visible:ring-[#00d4ff]"
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
            className="fixed inset-0 z-40 bg-[#EBF6F9]/98 backdrop-blur-xl pt-16 flex flex-col"
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
                        : "text-[#0A1B2E]/70 hover:text-[#0A1B2E] hover:bg-[#0A1B2E]/5"
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
                  className="flex items-center justify-center px-6 py-4 rounded-xl text-lg font-semibold bg-[#00d4ff] text-[#0A1B2E] hover:bg-[#00d4ff]/90 transition-all"
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
