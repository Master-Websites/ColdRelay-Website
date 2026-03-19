"use client";

import dynamic from "next/dynamic";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const Calculator = dynamic(() => import("@/components/Calculator"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-96 rounded-2xl bg-white/[0.02] animate-pulse" />
  ),
});

export function CalculatorSection() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden" id="calculator">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A73D5]/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V13.5zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25V18zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V13.5zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007V18zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V18zm2.498-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V13.5zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
              </svg>
              <span className="text-sm text-white/60 font-medium">
                Transparent pricing
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Calculate your exact cost.{" "}
              <span className="gradient-text">Zero hidden fees.</span>
            </h2>
            <p className="mt-4 text-base text-white/45 max-w-xl mx-auto">
              Starting at $1/mailbox. As low as $0.55 at scale. Slide to see your price.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <Calculator />
        </ScrollReveal>
      </div>
    </section>
  );
}
