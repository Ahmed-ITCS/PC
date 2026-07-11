import Link from "next/link";
import { Shield, GitBranch, Link2, AtSign, Mail } from "lucide-react";

const footerLinks = {
  Services: [
    { href: "/services#fullstack", label: "Full-Stack Development" },
    { href: "/services#devops", label: "DevOps & Infrastructure" },
    { href: "/services#security", label: "Security Audits" },
    { href: "/services#consulting", label: "Technical Consulting" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

const socials = [
  { href: "https://github.com/pentacipher", label: "GitHub", Icon: GitBranch },
  { href: "https://linkedin.com/company/pentacipher", label: "LinkedIn", Icon: Link2 },
  { href: "https://twitter.com/pentacipher", label: "Twitter / X", Icon: AtSign },
  { href: "mailto:hello@pentacipher.com", label: "Email", Icon: Mail },
];

export function Footer() {
  return (
    <footer
      className="relative border-t border-[#0F2A44]/6 mt-0 overflow-hidden backdrop-blur-sm"
      role="contentinfo"
      aria-label="Site footer"
      style={{ background: "rgba(232, 241, 245, 0.7)" }}
    >
      {/* Subtle gradient top accent */}
      <div className="absolute top-0 inset-x-0 h-px shimmer-border" aria-hidden="true" />
      <div className="container-max section-padding py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand col */}
          <div className="lg:col-span-2 space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group"
              aria-label="PentaCipher home"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#0891B2]/10 border border-[#0891B2]/20">
                <Shield className="w-4 h-4 text-[#0891B2]" aria-hidden="true" />
              </div>
              <span
                className="text-[#0F2A44] font-semibold text-base"
                style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
              >
                PentaCipher
              </span>
            </Link>
            <p className="text-[#4A6580] text-sm leading-relaxed max-w-xs">
              Security-first software development and DevOps consultancy. We help
              agencies, startups, and enterprises ship with confidence.
            </p>
            <div className="flex items-center gap-3">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-[#0F2A44]/8 text-[#8BA3B8] hover:text-[#0891B2] hover:border-[#0891B2]/25 hover:bg-[#0891B2]/5 hover:scale-110 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-[#0F2A44] text-sm font-semibold tracking-wide uppercase text-xs">
                {category}
              </h3>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#8BA3B8] hover:text-[#0F2A44] text-sm transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-[#0F2A44]/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#8BA3B8] text-xs">
            © {new Date().getFullYear()} PentaCipher. All rights reserved.
          </p>
          <p className="text-[#8BA3B8] text-xs flex items-center gap-1.5 italic">
            <Shield className="w-3 h-3 text-[#0891B2]/70" aria-hidden="true" />
            <span className="text-[#0891B2]/70">Security-first.</span> Always.
          </p>
        </div>
      </div>
    </footer>
  );
}
