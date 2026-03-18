"use client";

import { motion } from "framer-motion";
import { GradientMesh } from "@/components/animations/GradientMesh";
import { ParticleField } from "@/components/animations/ParticleField";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      <GradientMesh />
      <ParticleField />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
                <span className="text-xs font-semibold text-[#4A73D5] bg-[#4A73D5]/10 px-2 py-0.5 rounded-full">
                  💰
                </span>
                <span className="text-sm text-white/60 font-medium">
                  As low as $0.55/mailbox
                </span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05]"
            >
              <span className="text-white">What would </span>
              <span className="gradient-text">100,000 more</span>
              <br />
              <span className="text-white">cold emails do to</span>
              <br />
              <span className="text-white/80">your pipeline?</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-base sm:text-lg text-white/55 max-w-lg leading-relaxed"
            >
              Advanced Azure cold email infrastructure. 150 mailboxes per domain
              — not 2. Auto DNS. Auto warmup. 99% inbox guaranteed. Ready in
              hours, not weeks.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <a
                href="https://app.coldrelay.com/auth/register"
                className="group relative inline-flex items-center gap-2 rounded-xl bg-[#4A73D5] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/25 hover:shadow-[#4A73D5]/40 hover:bg-[#5A83E5] transition-all duration-300 hover:-translate-y-[1px] overflow-hidden"
              >
                <span className="relative z-10">Start for $50/month →</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#4A73D5] to-[#6B8FE6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
              <a
                href="#calculator"
                className="inline-flex items-center gap-2 rounded-xl bg-white/[0.04] border border-white/[0.08] px-6 py-3.5 text-sm font-semibold text-white/60 hover:text-white hover:bg-white/[0.06] transition-all duration-300"
              >
                Calculate your volume →
              </a>
            </motion.div>

            {/* Social proof — stars + trusted by */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex items-center gap-3"
            >
              {/* 5 stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-white/50 font-medium">
                Trusted by 200+ outbound teams
              </span>
            </motion.div>
          </div>

          {/* Right — product mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.08] p-6 shadow-2xl shadow-black/40">
              {/* Glow behind card */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#4A73D5]/10 to-transparent rounded-3xl blur-2xl" />

              {/* Mini dashboard mockup */}
              <div className="relative space-y-4">
                {/* Top bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#4A73D5]" />
                    <span className="text-sm font-semibold text-white/80">
                      ColdRelay Dashboard
                    </span>
                  </div>
                  <span className="text-xs text-white/30 font-mono">Live</span>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Mailboxes", value: "1,000", trend: "+12%" },
                    { label: "Domains", value: "8", trend: "Active" },
                    { label: "Inbox Rate", value: "98.7%", trend: "+2.1%" },
                  ].map((stat, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3"
                    >
                      <div className="text-xs text-white/40 mb-1">
                        {stat.label}
                      </div>
                      <div className="text-lg font-bold text-white">
                        {stat.value}
                      </div>
                      <div className="text-xs text-[#4A73D5] font-medium mt-0.5">
                        {stat.trend}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cost comparison mini */}
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                  <div className="text-xs text-white/40 mb-3 font-medium">
                    Monthly Cost Comparison (1,000 mailboxes)
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-white/50 w-28">Google/Outlook</span>
                      <div className="flex-1 h-6 bg-white/[0.03] rounded-md overflow-hidden">
                        <div
                          className="h-full bg-red-500/30 rounded-md flex items-center px-2"
                          style={{ width: "100%" }}
                        >
                          <span className="text-xs text-red-300 font-mono font-bold">
                            $7,000/mo
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-white/50 w-28">ColdRelay</span>
                      <div className="flex-1 h-6 bg-white/[0.03] rounded-md overflow-hidden">
                        <div
                          className="h-full bg-[#4A73D5]/40 rounded-md flex items-center px-2"
                          style={{ width: "10%" }}
                        >
                          <span className="text-xs text-[#6B8FE6] font-mono font-bold">
                            $700/mo
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-right text-xs">
                    <span className="text-[#4A73D5] font-bold">
                      Save $6,300/mo
                    </span>
                  </div>
                </div>

                {/* Sending tools row — Instantly, Smartlead, EmailBison */}
                <div className="flex items-center gap-2 text-xs text-white/30">
                  <span>Connected:</span>
                  <div className="flex gap-1.5">
                    {["Instantly", "Smartlead", "EmailBison"].map((tool) => (
                      <span
                        key={tool}
                        className="px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.06] text-white/40"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
