import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { CoreServices } from "@/components/sections/CoreServices";
import { WhoWeHelp } from "@/components/sections/WhoWeHelp";
import { ProblemsWeSolve } from "@/components/sections/ProblemsWeSolve";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Stats } from "@/components/sections/Stats";
import { MarqueeCTA } from "@/components/sections/MarqueeCTA";
import { CTA } from "@/components/sections/CTA";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: {
    absolute: "PentaCipher — Security-First Software & DevOps Consultancy",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CoreServices />
      <WhoWeHelp />
      <ProblemsWeSolve />
      <CaseStudies />
      <WhyChooseUs />
      <Stats />
      <MarqueeCTA />
      <CTA />
      <ContactSection />
    </>
  );
}
