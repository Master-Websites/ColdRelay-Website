"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";

const comparisonRows = [
  {
    label: "Mailboxes per domain",
    google: "2",
    coldrelay: "100-150",
    highlight: true,
  },
  {
    label: "Domains for 1,000 mailboxes",
    google: "500",
    coldrelay: "7-10",
    highlight: true,
  },
  {
    label: "Domain cost ($15/yr each)",
    google: "$7,500/yr",
    coldrelay: "$105-150/yr",
    highlight: false,
  },
  {
    label: "Mailbox cost per month",
    google: "$7/mailbox = $7,000/mo",
    coldrelay: "$1/mailbox = $1,000/mo",
    highlight: false,
  },
  {
    label: "Total year 1 cost",
    google: "$91,500",
    coldrelay: "$12,150",
    highlight: true,
  },
  {
    label: "You save",
    google: "—",
    coldrelay: "$79,350/yr",
    highlight: true,
  },
];

export function DomainMathSection() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden" id="domain-math">
      {/* Gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A73D5]/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-white/60 font-medium">
                The real cost of cold email
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              You&apos;re spending thousands on
              <br />
              <span className="gradient-text">domains you don&apos;t need.</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Stats counters */}
        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <AnimatedCounter value="500" label="Google domains for 1K mailboxes" delay={0} />
            <AnimatedCounter value="8" label="ColdRelay domains for 1K mailboxes" delay={0.1} />
            <AnimatedCounter value="$79,350" label="Saved per year at 1K mailboxes" delay={0.2} />
            <AnimatedCounter value="$36,990" label="Domain savings alone at 5K+" delay={0.3} />
          </div>
        </ScrollReveal>

        {/* Comparison table */}
        <ScrollReveal delay={0.2}>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-3 border-b border-white/[0.06]">
              <div className="p-4 sm:p-6 text-sm font-medium text-white/40" />
              <div className="p-4 sm:p-6 text-center border-l border-white/[0.06]">
                <div className="text-sm font-semibold text-white/40">
                  Google Workspace
                </div>
              </div>
              <div className="p-4 sm:p-6 text-center border-l border-white/[0.06] bg-[#4A73D5]/[0.04]">
                <div className="text-sm font-semibold text-[#4A73D5]">
                  ColdRelay
                </div>
              </div>
            </div>

            {/* Rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 ${
                  i < comparisonRows.length - 1 ? "border-b border-white/[0.06]" : ""
                } ${row.highlight ? "bg-white/[0.01]" : ""}`}
              >
                <div className="p-4 sm:p-6 text-sm font-medium text-white/60">
                  {row.label}
                </div>
                <div className="p-4 sm:p-6 text-center text-sm text-white/40 border-l border-white/[0.06]">
                  {row.google}
                </div>
                <div
                  className={`p-4 sm:p-6 text-center text-sm font-bold border-l border-white/[0.06] bg-[#4A73D5]/[0.04] ${
                    row.highlight ? "text-[#6B8FE6]" : "text-white/70"
                  }`}
                >
                  {row.coldrelay}
                </div>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Subtext */}
        <ScrollReveal delay={0.3}>
          <div className="mt-8 text-center">
            <p className="text-sm text-white/40 max-w-2xl mx-auto">
              That&apos;s not a typo.{" "}
              <span className="text-white/60 font-semibold">
                You save $79,000 per year
              </span>{" "}
              at 1,000 mailboxes. And that&apos;s before volume discounts kick in.
            </p>
            <p className="mt-3 text-sm text-white/30">
              <strong className="text-white/50">At scale (5,000+ mailboxes):</strong>{" "}
              Google: 2,500 domains × $15 = $37,500 in domains alone. ColdRelay:
              34-50 domains × $15 = $510.{" "}
              <span className="text-[#4A73D5] font-bold">
                Domain savings alone: $36,990/yr
              </span>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
