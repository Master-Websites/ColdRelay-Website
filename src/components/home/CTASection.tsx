"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export function CTASection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Top divider */}
      <div className="absolute top-0 left-0 right-0 gradient-divider" />

      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 w-[800px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(74, 115, 213, 0.12) 0%, rgba(74, 115, 213, 0.04) 40%, transparent 70%)",
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating dots */}
      {[
        { top: "15%", left: "10%", size: 6, delay: 0 },
        { top: "25%", right: "15%", size: 4, delay: 1 },
        { bottom: "20%", left: "20%", size: 5, delay: 2 },
        { bottom: "30%", right: "10%", size: 3, delay: 0.5 },
        { top: "40%", left: "5%", size: 4, delay: 1.5 },
        { top: "60%", right: "8%", size: 5, delay: 2.5 },
      ].map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#4A73D5]/20"
          style={{
            width: dot.size,
            height: dot.size,
            top: dot.top,
            left: dot.left,
            right: dot.right,
            bottom: dot.bottom,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <ScrollReveal>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to scale your
            <br />
            <span className="gradient-text">cold email infrastructure?</span>
          </motion.h2>
          <motion.p
            className="mt-6 text-lg text-white/50 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Join outbound teams sending millions of emails per month on infrastructure built for deliverability.
            Set up in hours, not weeks.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a
              href="https://app.coldrelay.com/auth/register"
              className="group relative inline-flex items-center gap-2 rounded-full bg-[#4A73D5] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#4A73D5]/25 hover:shadow-[#4A73D5]/40 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
            >
              <span className="relative z-10">Get Started — It&apos;s Free to Try</span>
              <svg className="w-5 h-5 relative z-10 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-[#4A73D5] to-[#6B8FE6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </a>
            <a
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 py-3.5 text-base font-medium text-white/70 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all backdrop-blur-sm"
            >
              Talk to Sales
            </a>
          </motion.div>

          <motion.p
            className="mt-6 text-sm text-white/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            No credit card required • 14-day deliverability guarantee • 24/7 support
          </motion.p>
        </div>
      </ScrollReveal>
    </section>
  );
}
