import type { Metadata } from "next";
import { Inter, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pentacipher.com"),
  title: {
    default: "PentaCipher — Security-First Software & DevOps Consultancy",
    template: "%s | PentaCipher",
  },
  description:
    "PentaCipher helps digital agencies, startups, and enterprises ship secure software without an in-house technical team. Full-stack development, DevOps, and cloud infrastructure — security built in from day one.",
  keywords: [
    "software development consultancy",
    "DevOps consulting",
    "security-first development",
    "B2B software development",
    "cloud infrastructure",
    "secure software delivery",
    "technical team augmentation",
  ],
  authors: [{ name: "PentaCipher" }],
  creator: "PentaCipher",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pentacipher.com",
    siteName: "PentaCipher",
    title: "PentaCipher — Security-First Software & DevOps Consultancy",
    description:
      "Ship secure software without an in-house technical team. Full-stack development, DevOps, and cloud infrastructure.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PentaCipher — Security-First Software & DevOps Consultancy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PentaCipher — Security-First Software & DevOps Consultancy",
    description: "Ship secure software without an in-house technical team.",
    images: ["/og-image.png"],
    creator: "@pentacipher",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased bg-[#04070f] text-[#e8edf5] font-[family-name:var(--font-inter)]">
        <Navbar />
        <main><PageTransition>{children}</PageTransition></main>
        <Footer />
      </body>
    </html>
  );
}
