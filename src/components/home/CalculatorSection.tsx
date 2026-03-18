"use client";

import dynamic from "next/dynamic";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const Calculator = dynamic(() => import("@/components/Calculator"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-3xl bg-white/[0.02] border border-white/[0.06] animate-pulse" />
  ),
});

export function CalculatorSection() {
  return (
    <section className="relative py-24 sm:py-32" id="calculator">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#4A73D5]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#4A73D5]/20 bg-[#4A73D5]/5 px-4 py-1.5 mb-6 backdrop-blur-sm">
              <span className="text-sm font-medium text-[#6B8FE6]">
                Transparent pricing
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Calculate your{" "}
              <span className="gradient-text">exact cost</span>
            </h2>
            <p className="mt-4 text-lg text-white/50">
              No hidden fees. No surprises. Slide to see what you&apos;ll pay at any scale.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <Calculator
            blue="#4A73D5"
            blue2="#6B8FE6"
          />
        </ScrollReveal>
      </div>
    </section>
  );
}
