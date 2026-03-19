import type { Metadata } from "next";
import AOSInit from "@/components/v1/aos-init";
import PageIllustration from "@/components/v1/page-illustration";
import Hero from "@/components/v1/hero-home";
import Features from "@/components/v1/features";
import Workflows from "@/components/v1/workflows";
import HowItWorks from "@/components/v1/how-it-works";
import Pricing from "@/components/v1/pricing";
import Testimonials from "@/components/v1/testimonials";
import FAQ from "@/components/v1/faq";
import Cta from "@/components/v1/cta";

export const metadata: Metadata = {
  title: "ColdRelay — Cold Email Infrastructure That Actually Delivers",
  description:
    "Set up domains, mailboxes, DNS, and dedicated IPs for cold email at scale. 95% cheaper than Google/Outlook. 99% inbox placement guaranteed.",
  alternates: { canonical: "https://coldrelay.com" },
};

export default function HomePage() {
  return (
    <>
      <AOSInit />
      <div className="relative flex grow flex-col">
        <PageIllustration />
        <Hero />
        <Features />
        <Workflows />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Cta />
      </div>
    </>
  );
}
