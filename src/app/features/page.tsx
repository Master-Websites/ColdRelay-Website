import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Dedicated IPs, isolated Azure tenants, auto DNS setup, deliverability monitoring, blocklist protection — everything your cold email infrastructure needs.",
  alternates: { canonical: "https://coldrelay.com/features" },
};

const mainFeatures = [
  {
    title: "Dedicated IPs Per Customer",
    description:
      "Every ColdRelay customer gets their own dedicated IP addresses. Your sending reputation is completely isolated — no one else's behavior can affect your deliverability.",
    details: [
      "Complete IP isolation from other customers",
      "Build and maintain your own sender reputation",
      "No shared infrastructure risk",
      "Full control over your sending footprint",
    ],
  },
  {
    title: "Isolated Azure Tenants",
    description:
      "Each customer operates within their own dedicated Azure tenant. This isn't shared hosting — it's fully isolated infrastructure that ensures maximum deliverability and security.",
    details: [
      "Separate Azure tenant per customer",
      "Azure Communication Services for sending",
      "Enterprise-grade security and compliance",
      "Zero cross-contamination risk",
    ],
  },
  {
    title: "Automated DNS Configuration",
    description:
      "DKIM, SPF, DMARC — all configured automatically when you add a domain. No manual DNS records, no missed steps, no configuration errors that tank your deliverability.",
    details: [
      "DKIM signing configured automatically",
      "SPF records set up correctly",
      "DMARC policy deployed",
      "All records verified before sending begins",
    ],
  },
  {
    title: "Deliverability Monitoring",
    description:
      "Daily placement testing across major providers. Know exactly where your emails are landing — inbox, spam, or promotions — and catch issues before they affect campaigns.",
    details: [
      "Daily inbox placement testing",
      "Provider-by-provider breakdown",
      "Automated alerts for placement drops",
      "Historical deliverability tracking",
    ],
  },
  {
    title: "Blocklist Protection",
    description:
      "Automated monitoring across major blocklists. If any of your IPs or domains appear on a blocklist, we detect it immediately and begin remediation.",
    details: [
      "Real-time blocklist monitoring",
      "Automated detection and alerting",
      "Guided remediation process",
      "Proactive reputation management",
    ],
  },
  {
    title: "2-4 Hour Automated Setup",
    description:
      "From domain purchase to sending-ready in hours, not weeks. Our automated pipeline handles server provisioning, DNS configuration, and mailbox creation with zero manual steps.",
    details: [
      "Fully automated end-to-end setup",
      "Domain purchase through our platform",
      "Server provisioning on Linode",
      "Mail-in-a-Box installation and configuration",
    ],
  },
];

const additionalFeatures = [
  {
    title: "Volume Scaling",
    description: "Scale from 50 to 5,000+ mailboxes. Each domain supports 100-150 mailboxes with up to 4 emails/day per mailbox.",
  },
  {
    title: "Little to No Warmup",
    description: "Our infrastructure is ready to send from day one. Minimal warmup required compared to traditional providers.",
  },
  {
    title: "24/7 Live Support",
    description: "Round-the-clock support from our team. Questions about setup, deliverability, or scaling — we're always available.",
  },
  {
    title: "Deliverability Consultant",
    description: "Larger customers get a dedicated 1:1 deliverability consultant to optimize campaigns and maintain inbox placement.",
  },
  {
    title: "Cold Email Scripts",
    description: "Plug-and-play cold email scripts included. Tested templates designed for high reply rates across industries.",
  },
  {
    title: "Outbound Community Access",
    description: "Join our community of outbound professionals. Share strategies, get feedback, and learn from top performers.",
  },
  {
    title: "Sending Platform Compatible",
    description: "Works seamlessly with Instantly.ai, Smartlead, EmailBison, NuMail, and other major sending platforms.",
  },
  {
    title: "Deliverability Guarantee",
    description: "95%+ deliverability guaranteed. If we fall below in your first 14 days, you get a full refund.",
  },
];

export default function FeaturesPage() {
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
              Purpose-built for cold email
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Every feature designed for{" "}
            <span className="gradient-text">deliverability</span>
          </h1>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
            From dedicated IPs to automated DNS — every component of ColdRelay
            exists to get your cold emails into the primary inbox.
          </p>
        </div>
      </section>

      {/* Main features */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
        {mainFeatures.map((feature, i) => (
          <div
            key={i}
            className={`flex flex-col md:flex-row gap-8 items-start ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <div className="flex-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
                {feature.title}
              </h2>
              <p className="text-white/50 leading-relaxed mb-6">
                {feature.description}
              </p>
              <ul className="space-y-3">
                {feature.details.map((detail, j) => (
                  <li key={j} className="flex items-center gap-3">
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
                    <span className="text-sm text-white/70">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 h-full flex items-center justify-center min-h-[200px]">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/10 to-green-500/10 mb-4">
                    <svg
                      className="w-8 h-8 text-teal-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-white/40">{feature.title}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Additional features grid */}
      <section className="mt-24 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            And much more
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {additionalFeatures.map((feature, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all"
            >
              <h3 className="text-sm font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-xs text-white/40 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          See it in action
        </h2>
        <p className="mt-4 text-white/50">
          Set up your first domain in under 4 hours. No credit card required.
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
