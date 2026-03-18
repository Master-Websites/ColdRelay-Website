"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const testimonials = [
  {
    quote:
      "We contacted 641,000+ prospects over 12 weeks and saw a 3.3% positive reply rate. ColdRelay's infrastructure handled the volume without a single deliverability issue.",
    author: "Agency founder",
    role: "1,000+ mailboxes",
    metric: "641K+ prospects reached",
  },
  {
    quote:
      "Switching from Google Workspace to ColdRelay saved us thousands per month. Same deliverability, fraction of the cost. The dedicated IPs make all the difference.",
    author: "B2B SaaS Growth Lead",
    role: "500+ mailboxes",
    metric: "95%+ inbox placement",
  },
  {
    quote:
      "Setup took 3 hours. DNS, DKIM, SPF, DMARC — everything was configured automatically. We were sending the same day we signed up.",
    author: "Outbound Agency Owner",
    role: "200+ mailboxes",
    metric: "3-hour setup to sending",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 gradient-divider" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Trusted by{" "}
              <span className="gradient-text">outbound teams</span>
            </h2>
            <p className="mt-4 text-lg text-white/50">
              Teams running serious cold email volume rely on ColdRelay infrastructure.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 flex flex-col backdrop-blur-sm hover:border-[#4A73D5]/20 transition-colors duration-300 h-full group"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4A73D5]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Metric badge */}
                  <div className="inline-flex self-start items-center gap-2 rounded-full border border-[#4A73D5]/20 bg-[#4A73D5]/5 px-3 py-1 mb-4">
                    <span className="text-xs font-medium text-[#6B8FE6]">
                      {t.metric}
                    </span>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-[#4A73D5]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="text-white/70 text-sm leading-relaxed flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>

                  <div className="mt-4 pt-4 border-t border-white/[0.06]">
                    <div className="font-semibold text-white text-sm">{t.author}</div>
                    <div className="text-xs text-white/40">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
