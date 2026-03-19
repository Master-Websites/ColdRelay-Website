import type { Metadata } from "next";
import AOSInit from "@/components/v1/aos-init";
import PageIllustration from "@/components/v1/page-illustration";
import Hero from "@/components/v1/hero-home";
import Features from "@/components/v1/features";
import Workflows from "@/components/v1/workflows";
import HowItWorks from "@/components/v1/how-it-works";
import Calculator from "@/components/Calculator";
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
        <section className="relative">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="py-12 md:py-20">
              {/* Section header */}
              <div className="mx-auto max-w-3xl pb-4 text-center md:pb-8">
                <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-[#4A73D5]/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-[#4A73D5]/50">
                  <span className="inline-flex bg-linear-to-r from-[#4A73D5] to-[#7B9BE0] bg-clip-text text-transparent">
                    Pricing
                  </span>
                </div>
                <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,#e5e7eb,#7B9BE0,#f9fafb,#93AADF,#e5e7eb)] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
                  Calculate Your Exact Cost
                </h2>
                <p className="text-lg text-[#7B9BE0]/65">
                  No hidden fees. Slide to see your price at any scale.
                </p>
              </div>
              <Calculator />
            </div>
          </div>
        </section>
        <Testimonials />
        <FAQ />
        <Cta />
      </div>
    </>
  );
}
