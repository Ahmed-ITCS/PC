import Link from "next/link";
import { GitBranch, Link2, AtSign, Mail } from "lucide-react";
import { PentaCipherIcon, PentaCipherLogoText } from "@/components/ui/PentaCipherLogo";

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
      className="relative border-t border-[#0A1B2E]/10 bg-[#0A1B2E] mt-0 overflow-hidden"
      role="contentinfo"
      aria-label="Site footer"
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
              <div className="group-hover:scale-105 transition-transform duration-200">
                <PentaCipherIcon size={36} />
              </div>
              <PentaCipherLogoText variant="light" />
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
                  className="flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-white/40 hover:text-[#00d4ff] hover:border-[#00d4ff]/30 hover:bg-[#00d4ff]/5 hover:scale-110 transition-all duration-200"
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

        <div className="mt-12 pt-8 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} PentaCipher. All rights reserved.
          </p>
          <p className="text-white/30 text-xs flex items-center gap-1.5 italic">
            <PentaCipherIcon size={12} />
            <span className="text-[#00d4ff]/50">Security-first.</span> Always.
          </p>
        </div>
      </div>
    </footer>
  );
}
