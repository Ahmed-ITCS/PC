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
      className="border-t border-white/5 bg-[#080e1e] mt-0"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container-max section-padding py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand col */}
          <div className="lg:col-span-2 space-y-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 group"
              aria-label="PentaCipher home"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/20">
                <Shield className="w-4 h-4 text-[#00d4ff]" aria-hidden="true" />
              </div>
              <span
                className="text-white font-semibold text-base"
                style={{ fontFamily: "var(--font-syne), Syne, sans-serif" }}
              >
                PentaCipher
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
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
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/8 text-white/40 hover:text-[#00d4ff] hover:border-[#00d4ff]/30 hover:bg-[#00d4ff]/5 transition-all duration-200"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="space-y-4">
              <h3 className="text-white/80 text-sm font-semibold tracking-wide uppercase text-xs">
                {category}
              </h3>
              <ul className="space-y-2.5" role="list">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/45 hover:text-white/80 text-sm transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} PentaCipher. All rights reserved.
          </p>
          <p className="text-white/30 text-xs flex items-center gap-1.5">
            <Shield className="w-3 h-3 text-[#00d4ff]/50" aria-hidden="true" />
            Security-first. Always.
          </p>
        </div>
      </div>
    </footer>
  );
}
