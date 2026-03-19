import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { LogoBar } from "@/components/home/LogoBar";
import { GoogleOutlookPainSection } from "@/components/home/GoogleOutlookPainSection";
import { WhyNotGoogleSection } from "@/components/home/WhyNotGoogleSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { CalculatorSection } from "@/components/home/CalculatorSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { ComparisonSection } from "@/components/home/ComparisonSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { CTASection } from "@/components/home/CTASection";
import { BlogPreviewSection } from "@/components/home/BlogPreviewSection";

export const metadata: Metadata = {
  title: "ColdRelay — Cold Email Infrastructure That Actually Delivers",
  description:
    "Set up domains, mailboxes, DNS, and dedicated IPs for cold email at scale. 95% cheaper than Google/Outlook. 99% inbox placement guaranteed.",
  alternates: { canonical: "https://coldrelay.com" },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoBar />
      <GoogleOutlookPainSection />
      <WhyNotGoogleSection />
      <HowItWorksSection />
      <CalculatorSection />
      <FeaturesSection />
      <ComparisonSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <BlogPreviewSection />
    </>
  );
}
