"use client";

import { motion } from "framer-motion";
import { GradientMesh } from "@/components/animations/GradientMesh";
import { ParticleField } from "@/components/animations/ParticleField";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as const },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated gradient mesh background */}
      <GradientMesh />

      {/* Particle field */}
      <ParticleField />

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 gradient-divider" />

      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* Badge */}
        <motion.div variants={fadeUp}>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4A73D5]/20 bg-[#4A73D5]/5 px-4 py-1.5 mb-8 backdrop-blur-sm">
            <div className="relative w-2 h-2">
              <div className="absolute inset-0 rounded-full bg-[#4A73D5] animate-ping opacity-75" />
              <div className="relative w-2 h-2 rounded-full bg-[#6B8FE6]" />
            </div>
            <span className="text-sm font-medium text-[#6B8FE6]">
              95% cheaper than Google Workspace
            </span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]"
        >
          Cold Email Infrastructure
          <br />
          <span className="gradient-text">That Actually Delivers</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="mt-6 text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed"
        >
          Domains, mailboxes, DNS, dedicated IPs — all set up automatically in 2-4 hours.
          Scale from 50 to 5,000+ mailboxes with 95%+ deliverability guaranteed.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://app.coldrelay.com/auth/register"
            className="group relative inline-flex items-center gap-2 rounded-full bg-[#4A73D5] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#4A73D5]/25 hover:shadow-[#4A73D5]/40 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
          >
            <span className="relative z-10">Start Sending Today</span>
            <svg className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-[#4A73D5] to-[#6B8FE6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </a>
          <a
            href="/pricing"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 py-3.5 text-base font-medium text-white/70 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all backdrop-blur-sm"
          >
            View Pricing
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeUp}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm p-8"
        >
          <AnimatedCounter value="95%+" label="Deliverability" delay={0} />
          <AnimatedCounter value="$0.55" label="Per mailbox/mo" delay={0.1} />
          <AnimatedCounter value="2-4hr" label="Setup time" delay={0.2} />
          <AnimatedCounter value="5,000+" label="Mailbox capacity" delay={0.3} />
        </motion.div>
      </motion.div>
    </section>
  );
}
