import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { CalculatorSection } from "@/components/home/CalculatorSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = {
  title: "ColdRelay — Cold Email Infrastructure That Actually Delivers",
  description:
    "Set up domains, mailboxes, DNS, and dedicated IPs for cold email at scale. 95% cheaper than Google Workspace. 95%+ deliverability guaranteed.",
  alternates: { canonical: "https://coldrelay.com" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <CalculatorSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
