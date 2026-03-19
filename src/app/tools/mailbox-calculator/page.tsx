"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Pricing tiers                                                       */
/* ------------------------------------------------------------------ */

const tiers = [
  { label: "Starter (1–49)", min: 1, max: 49, price: 1.0 },
  { label: "Growth (50–199)", min: 50, max: 199, price: 0.85 },
  { label: "Scale (200–499)", min: 200, max: 499, price: 0.7 },
  { label: "Enterprise (500+)", min: 500, max: Infinity, price: 0.55 },
];

function coldRelayMonthly(mailboxes: number): { tier: string; perMailbox: number; total: number } {
  const tier = tiers.find((t) => mailboxes >= t.min && mailboxes <= t.max) || tiers[tiers.length - 1];
  return { tier: tier.label, perMailbox: tier.price, total: mailboxes * tier.price };
}

const GOOGLE_PRICE = 7.2; // Google Workspace Business Starter per user/mo
const OUTLOOK_PRICE = 6.0; // Microsoft 365 Business Basic per user/mo

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "How many emails can I send per mailbox per day?",
    a: "Best practice for cold email is to send no more than 30-50 emails per mailbox per day. ColdRelay uses a conservative limit of ~30 emails per mailbox to maintain optimal deliverability. This calculator uses 4 emails per mailbox as a safe daily average accounting for warmup and ramp periods.",
  },
  {
    q: "Why do I need multiple domains?",
    a: "Sending cold email from your primary domain risks its reputation. Using dedicated sending domains protects your brand. We recommend no more than 2-3 mailboxes per domain for cold outreach, but this calculator assumes up to 150 mailboxes per domain as an upper bound for infrastructure planning.",
  },
  {
    q: "How much does ColdRelay cost compared to Google Workspace?",
    a: "ColdRelay starts at $1/mailbox/month for small volumes and drops to $0.55/mailbox/month at scale. Google Workspace costs $7.20/user/month and Microsoft 365 costs $6/user/month. At 100 mailboxes, ColdRelay saves you over $600/month compared to Google.",
  },
  {
    q: "What's included in ColdRelay's mailbox pricing?",
    a: "Every ColdRelay mailbox includes automated domain setup, DNS configuration (SPF, DKIM, DMARC), mailbox warmup, deliverability monitoring, and rotation — all managed for you. Google and Outlook charge extra or don't offer these features at all.",
  },
  {
    q: "Can I start small and scale up?",
    a: "Absolutely. Start with a few mailboxes on the Starter tier and scale to hundreds or thousands. ColdRelay automatically moves you to lower per-mailbox pricing as you grow. No contracts or commitments.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function MailboxCalculatorPage() {
  const [emailsPerDay, setEmailsPerDay] = useState(1000);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const results = useMemo(() => {
    const mailboxes = Math.ceil(emailsPerDay / 4);
    const domains = Math.ceil(mailboxes / 150);
    const cr = coldRelayMonthly(mailboxes);
    const google = mailboxes * GOOGLE_PRICE;
    const outlook = mailboxes * OUTLOOK_PRICE;
    return { mailboxes, domains, cr, google, outlook };
  }, [emailsPerDay]);

  const savingsVsGoogle = results.google - results.cr.total;
  const savingsVsOutlook = results.outlook - results.cr.total;

  return (
    <>
      {/* Schema */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Cold Email Mailbox Calculator",
            url: "https://coldrelay.com/tools/mailbox-calculator",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Any",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />

      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-12 sm:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#4A73D5]/[0.06] rounded-full blur-[120px]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1 text-xs text-white/40 hover:text-white/60 transition-colors mb-6"
          >
            ← All Tools
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4A73D5]/20 bg-[#4A73D5]/10 px-3 py-1 mb-6 ml-3">
            <span className="text-xs font-medium tracking-wide uppercase text-[#6B8FE6]">
              Free Tool
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight font-bold mb-5">
            Cold Email Mailbox Calculator
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            Find out exactly how many mailboxes and domains you need for your cold email volume —
            and see how much you&apos;ll save with ColdRelay vs Google Workspace or Outlook.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8"
          >
            {/* Slider */}
            <label className="block text-sm font-medium text-white/70 mb-2">
              Desired Emails Per Day
            </label>
            <div className="flex items-center gap-4 mb-2">
              <input
                type="range"
                min={100}
                max={20000}
                step={100}
                value={emailsPerDay}
                onChange={(e) => setEmailsPerDay(Number(e.target.value))}
                className="flex-1 h-2 rounded-full appearance-none cursor-pointer bg-white/[0.1] accent-[#4A73D5]"
              />
              <div className="min-w-[100px] rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-2 text-center">
                <span className="text-xl font-bold text-[#6B8FE6]">
                  {emailsPerDay.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex justify-between text-xs text-white/30 mb-8">
              <span>100/day</span>
              <span>20,000/day</span>
            </div>

            {/* Infrastructure needs */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <motion.div
                key={results.mailboxes}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-5"
              >
                <p className="text-xs text-white/40 mb-1">Mailboxes Needed</p>
                <p className="text-3xl font-bold text-white">{results.mailboxes.toLocaleString()}</p>
                <p className="text-xs text-white/30 mt-1">at ~4 emails/mailbox/day</p>
              </motion.div>
              <motion.div
                key={results.domains}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl bg-white/[0.04] border border-white/[0.06] p-5"
              >
                <p className="text-xs text-white/40 mb-1">Domains Needed</p>
                <p className="text-3xl font-bold text-white">{results.domains.toLocaleString()}</p>
                <p className="text-xs text-white/30 mt-1">at ~150 mailboxes/domain max</p>
              </motion.div>
            </div>

            {/* Cost comparison */}
            <h3 className="text-lg font-semibold text-white mb-4">Monthly Cost Comparison</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {/* ColdRelay */}
              <motion.div
                key={`cr-${results.cr.total}`}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="rounded-xl border-2 border-[#4A73D5]/40 bg-[#4A73D5]/[0.06] p-5 relative"
              >
                <div className="absolute -top-3 left-4 bg-[#4A73D5] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Best Value
                </div>
                <p className="text-xs text-[#6B8FE6] font-medium mb-1">ColdRelay</p>
                <p className="text-3xl font-bold text-white">
                  ${results.cr.total.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-white/40 mt-1">
                  ${results.cr.perMailbox.toFixed(2)}/mailbox · {results.cr.tier}
                </p>
              </motion.div>

              {/* Google */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                <p className="text-xs text-white/50 font-medium mb-1">Google Workspace</p>
                <p className="text-3xl font-bold text-white/60">
                  ${results.google.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-white/30 mt-1">${GOOGLE_PRICE.toFixed(2)}/user/month</p>
              </div>

              {/* Outlook */}
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5">
                <p className="text-xs text-white/50 font-medium mb-1">Microsoft 365</p>
                <p className="text-3xl font-bold text-white/60">
                  ${results.outlook.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                </p>
                <p className="text-xs text-white/30 mt-1">${OUTLOOK_PRICE.toFixed(2)}/user/month</p>
              </div>
            </div>

            {/* Savings callout */}
            <motion.div
              key={savingsVsGoogle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-6 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/20 p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                <div>
                  <p className="text-xs text-emerald-400/70 mb-0.5">You Save vs Google</p>
                  <p className="text-2xl font-bold text-emerald-400">
                    ${savingsVsGoogle.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
                  </p>
                </div>
                <div className="hidden sm:block w-px h-10 bg-emerald-500/20" />
                <div>
                  <p className="text-xs text-emerald-400/70 mb-0.5">You Save vs Outlook</p>
                  <p className="text-2xl font-bold text-emerald-400">
                    ${savingsVsOutlook.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/mo
                  </p>
                </div>
                <div className="hidden sm:block w-px h-10 bg-emerald-500/20" />
                <div>
                  <p className="text-xs text-emerald-400/70 mb-0.5">Annual Savings vs Google</p>
                  <p className="text-2xl font-bold text-emerald-400">
                    ${(savingsVsGoogle * 12).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/yr
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tier breakdown */}
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-white/70 mb-3">ColdRelay Pricing Tiers</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {tiers.map((t) => (
                  <div
                    key={t.label}
                    className={`rounded-xl border p-3 text-center transition-all ${
                      results.cr.tier === t.label
                        ? "border-[#4A73D5]/40 bg-[#4A73D5]/[0.08]"
                        : "border-white/[0.06] bg-white/[0.02]"
                    }`}
                  >
                    <p className="text-xs text-white/40 mb-1">{t.label}</p>
                    <p className="text-lg font-bold text-white">${t.price.toFixed(2)}</p>
                    <p className="text-[10px] text-white/30">/mailbox/mo</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-24 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
              >
                <button
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-3"
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                >
                  <span className="text-sm font-medium text-white">{faq.q}</span>
                  <svg
                    className={`w-4 h-4 text-white/30 flex-shrink-0 transition-transform ${faqOpen === i ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {faqOpen === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#4A73D5]/20 bg-[#4A73D5]/[0.04] p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              Ready to Scale Your Cold Email?
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              ColdRelay sets up your mailboxes, domains, DNS, and warmup automatically. Pay a
              fraction of what Google or Outlook charges — with better deliverability built in.
            </p>
            <a
              href="https://app.coldrelay.com/auth/register"
              className="inline-flex items-center gap-2 rounded-full bg-[#4A73D5] hover:bg-[#5A83E5] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20 hover:shadow-[#4A73D5]/30 hover:brightness-110 transition-all uppercase tracking-wide"
            >
              Get Started Free →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
