"use client";

import dynamic from "next/dynamic";

const Calculator = dynamic(() => import("@/components/Calculator"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[600px] rounded-3xl bg-white/[0.02] animate-pulse" />
  ),
});

const tiers = [
  { range: "1–199", price: "$1.00", desc: "Per mailbox/month" },
  { range: "200–999", price: "$0.85", desc: "Per mailbox/month", popular: true },
  { range: "1,000–4,999", price: "$0.70", desc: "Per mailbox/month" },
  { range: "5,000+", price: "$0.55", desc: "Per mailbox/month" },
];

const comparison = [
  { provider: "Google Workspace", price: "$6.00–7.00", savings: "85–95%" },
  { provider: "Microsoft Outlook", price: "$6.00", savings: "83–91%" },
  { provider: "Third-party resellers", price: "~$3.00", savings: "67–82%" },
  { provider: "Hypertide", price: "$1,500 setup + $50/mo/domain", savings: "Significant" },
  { provider: "Mailreef", price: "$250+/month", savings: "Significant" },
  { provider: "ColdRelay", price: "$0.55–1.00", savings: "—", highlight: true },
];

const allFeatures = [
  "Dedicated IPs per customer",
  "Isolated Azure tenant",
  "Auto DNS configuration (DKIM, SPF, DMARC)",
  "Deliverability monitoring & testing",
  "Blocklist protection",
  "2-4 hour automated setup",
  "100–150 mailboxes per domain",
  "Up to 4 emails/day per mailbox",
  "24/7 live support",
  "$15/domain cost",
  "No setup fees",
  "95%+ deliverability guarantee",
  "14-day refund guarantee",
  "Access to Outbound Community",
  "Plug-and-play cold email scripts",
  "Works with Instantly, Smartlead, EmailBison",
];

export function PricingContent() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-teal-500/8 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/5 px-4 py-1.5 mb-6">
            <span className="text-sm font-medium text-teal-400">
              Simple volume-based pricing
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Pay less as you{" "}
            <span className="gradient-text">scale more</span>
          </h1>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
            No setup fees. No hidden costs. Just straightforward per-mailbox pricing that gets cheaper the more you use.
          </p>
        </div>
      </section>

      {/* Tier cards */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.range}
              className={`relative rounded-2xl border p-6 text-center transition-all ${
                tier.popular
                  ? "border-teal-500/30 bg-teal-500/5 glow-teal"
                  : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-teal-500 to-green-500 text-xs font-semibold text-white">
                  Most Popular
                </div>
              )}
              <div className="text-sm text-white/40 font-medium mb-2">
                {tier.range} mailboxes
              </div>
              <div className="text-4xl font-extrabold gradient-text">
                {tier.price}
              </div>
              <div className="text-sm text-white/40 mt-1">{tier.desc}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-white/30 mt-6">
          + $15/domain (one-time purchase) • Each domain supports 100–150 mailboxes
        </p>
      </section>

      {/* Calculator */}
      <section className="mt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Calculate your <span className="gradient-text">exact cost</span>
            </h2>
          </div>
          <Calculator />
        </div>
      </section>

      {/* Comparison table */}
      <section className="mt-24 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            How we compare to{" "}
            <span className="gradient-text">alternatives</span>
          </h2>
          <p className="mt-4 text-white/50">
            Per mailbox/month pricing comparison
          </p>
        </div>

        <div className="rounded-2xl border border-white/[0.06] overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                <th className="px-6 py-4 text-sm font-semibold text-white/70">
                  Provider
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-white/70">
                  Price
                </th>
                <th className="px-6 py-4 text-sm font-semibold text-white/70">
                  You Save
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => (
                <tr
                  key={i}
                  className={`border-b border-white/[0.04] ${
                    row.highlight
                      ? "bg-teal-500/5"
                      : ""
                  }`}
                >
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={
                        row.highlight
                          ? "font-bold gradient-text"
                          : "text-white/70"
                      }
                    >
                      {row.provider}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={
                        row.highlight
                          ? "font-bold text-white"
                          : "text-white/50"
                      }
                    >
                      {row.price}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={
                        row.highlight
                          ? "font-bold text-teal-400"
                          : "text-green-400/70"
                      }
                    >
                      {row.savings}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* All features */}
      <section className="mt-24 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Everything included at{" "}
            <span className="gradient-text">every tier</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {allFeatures.map((feature, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3"
            >
              <svg
                className="w-5 h-5 text-teal-400 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
              <span className="text-sm text-white/70">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Start scaling today
        </h2>
        <p className="mt-4 text-white/50">
          No setup fees. No credit card required. 14-day deliverability guarantee.
        </p>
        <div className="mt-8">
          <a
            href="https://app.coldrelay.com/auth/register"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-green-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:brightness-110 transition-all hover:-translate-y-0.5"
          >
            Get Started Free
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
