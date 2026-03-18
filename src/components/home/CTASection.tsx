"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { motion } from "framer-motion";

const trustItems = [
  "No minimum order",
  "99% inbox guarantee",
  "Money-back promise",
  "Cancel anytime",
];

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden" id="cta">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A73D5]/[0.08] via-[#0a0a0a] to-[#4A73D5]/[0.04]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A73D5]/20 to-transparent" />

      {/* Decorative orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(74, 115, 213, 0.1) 0%, transparent 70%)",
          top: "50%",
          right: "-10%",
          transform: "translateY(-50%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Stop paying $7/mailbox for
            <br />
            infrastructure that wasn&apos;t{" "}
            <span className="gradient-text">built for cold email.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto">
            Starting at $1/mailbox. As low as $0.55 at scale. 99% inbox
            guaranteed. Setup in hours.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#calculator"
              className="group relative inline-flex items-center gap-2 rounded-xl bg-[#4A73D5] px-8 py-4 text-base font-semibold text-white shadow-lg shadow-[#4A73D5]/25 hover:shadow-[#4A73D5]/40 hover:bg-[#5A83E5] transition-all duration-300 hover:-translate-y-[1px] overflow-hidden"
            >
              <span className="relative z-10">Calculate your savings</span>
              <svg
                className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-[#4A73D5] to-[#6B8FE6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="mailto:sales@coldrelay.com"
              className="inline-flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.08] px-8 py-4 text-base font-semibold text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-300"
            >
              Talk to sales
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {trustItems.map((item, i) => (
              <div key={i} className="flex items-center gap-1.5 text-sm text-white/30">
                <svg
                  className="w-4 h-4 text-[#4A73D5]/60"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {item}
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
