"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function coldRelayMonthlyCost(mailboxes: number): number {
  if (mailboxes >= 500) return mailboxes * 0.55;
  if (mailboxes >= 200) return mailboxes * 0.7;
  if (mailboxes >= 50) return mailboxes * 0.85;
  return mailboxes * 1.0;
}

function fmt(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 10_000) return `$${(n / 1_000).toFixed(0)}K`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "What reply rate should I expect from cold email?",
    a: "A well-crafted cold email campaign typically sees a 1-5% reply rate. Highly targeted campaigns with personalized messaging can achieve 5-15%. The quality of your list, offer, and copy all play a role. ColdRelay helps on the deliverability side — getting your emails into inboxes so your copy can do its job.",
  },
  {
    q: "How does cold email ROI compare to other channels?",
    a: "Cold email typically delivers one of the highest ROIs in B2B marketing. With infrastructure costs as low as $0.55/mailbox/month on ColdRelay, even a single closed deal can pay for months of outreach. Compare that to paid ads where cost-per-lead often exceeds $50-200.",
  },
  {
    q: "What's a realistic meeting-to-close rate?",
    a: "For B2B sales, a 10-30% close rate on meetings booked from cold outreach is common, depending on your product, pricing, and sales process. Higher-ticket products typically have longer sales cycles but larger deal values.",
  },
  {
    q: "How many emails per day should I send?",
    a: "Start with 500-1,000 emails per day and scale as you optimize. ColdRelay manages the infrastructure (mailboxes, domains, warmup) so you can focus on copy and targeting. Most successful campaigns run 2,000-10,000 emails per day across multiple mailbox accounts.",
  },
  {
    q: "Does this calculator account for all costs?",
    a: "This calculator focuses on email infrastructure cost (ColdRelay mailboxes). Your total cost may also include email sending tools (like Instantly, Smartlead), copywriting, and list building. ColdRelay handles the infrastructure layer at the lowest cost in the market.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function ColdEmailROICalculatorPage() {
  const [emailsPerDay, setEmailsPerDay] = useState(1000);
  const [replyRate, setReplyRate] = useState(3);
  const [meetingRate, setMeetingRate] = useState(25);
  const [closeRate, setCloseRate] = useState(20);
  const [dealValue, setDealValue] = useState(5000);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  const results = useMemo(() => {
    const monthlyEmails = emailsPerDay * 30;
    const replies = Math.round(monthlyEmails * (replyRate / 100));
    const meetings = Math.round(replies * (meetingRate / 100));
    const deals = Math.round(meetings * (closeRate / 100));
    const revenue = deals * dealValue;
    const mailboxes = Math.ceil(emailsPerDay / 4);
    const cost = coldRelayMonthlyCost(mailboxes);
    const roi = cost > 0 ? ((revenue - cost) / cost) * 100 : 0;
    return { monthlyEmails, replies, meetings, deals, revenue, mailboxes, cost, roi };
  }, [emailsPerDay, replyRate, meetingRate, closeRate, dealValue]);

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
            name: "Cold Email ROI Calculator",
            url: "https://coldrelay.com/tools/cold-email-roi-calculator",
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
            Cold Email ROI Calculator
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            See exactly how much revenue cold email can generate for your business. Input your
            numbers and watch the math work in your favor.
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
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Emails per day */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Emails Per Day
                </label>
                <input
                  type="range"
                  min={100}
                  max={20000}
                  step={100}
                  value={emailsPerDay}
                  onChange={(e) => setEmailsPerDay(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/[0.1] accent-[#4A73D5] mb-1"
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/30">100</span>
                  <span className="text-lg font-bold text-[#6B8FE6]">{emailsPerDay.toLocaleString()}</span>
                  <span className="text-xs text-white/30">20K</span>
                </div>
              </div>

              {/* Reply rate */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Reply Rate (%)
                </label>
                <input
                  type="range"
                  min={0.5}
                  max={20}
                  step={0.5}
                  value={replyRate}
                  onChange={(e) => setReplyRate(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/[0.1] accent-[#4A73D5] mb-1"
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/30">0.5%</span>
                  <span className="text-lg font-bold text-[#6B8FE6]">{replyRate}%</span>
                  <span className="text-xs text-white/30">20%</span>
                </div>
              </div>

              {/* Meeting rate */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Reply → Meeting Rate (%)
                </label>
                <input
                  type="range"
                  min={5}
                  max={80}
                  step={5}
                  value={meetingRate}
                  onChange={(e) => setMeetingRate(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/[0.1] accent-[#4A73D5] mb-1"
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/30">5%</span>
                  <span className="text-lg font-bold text-[#6B8FE6]">{meetingRate}%</span>
                  <span className="text-xs text-white/30">80%</span>
                </div>
              </div>

              {/* Close rate */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Meeting → Close Rate (%)
                </label>
                <input
                  type="range"
                  min={5}
                  max={60}
                  step={5}
                  value={closeRate}
                  onChange={(e) => setCloseRate(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-white/[0.1] accent-[#4A73D5] mb-1"
                />
                <div className="flex justify-between items-center">
                  <span className="text-xs text-white/30">5%</span>
                  <span className="text-lg font-bold text-[#6B8FE6]">{closeRate}%</span>
                  <span className="text-xs text-white/30">60%</span>
                </div>
              </div>

              {/* Deal value */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Average Deal Value ($)
                </label>
                <input
                  type="number"
                  min={100}
                  max={1000000}
                  value={dealValue}
                  onChange={(e) => setDealValue(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-lg font-bold text-[#6B8FE6] focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all"
                />
              </div>
            </div>

            {/* Calculate button */}
            <button
              onClick={() => setShowResults(true)}
              className="w-full mt-8 rounded-xl bg-[#4A73D5] hover:bg-[#5A83E5] px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20 hover:shadow-[#4A73D5]/30 transition-all uppercase tracking-wide"
            >
              Calculate My ROI
            </button>
          </motion.div>

          {/* Results */}
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              {/* Funnel */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                {[
                  { label: "Monthly Emails", value: results.monthlyEmails.toLocaleString(), color: "text-white" },
                  { label: "Replies", value: results.replies.toLocaleString(), color: "text-white" },
                  { label: "Meetings", value: results.meetings.toLocaleString(), color: "text-white" },
                  { label: "Deals Closed", value: results.deals.toLocaleString(), color: "text-[#6B8FE6]" },
                  { label: "Revenue", value: fmt(results.revenue), color: "text-emerald-400" },
                  { label: "Infra Cost", value: `$${results.cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, color: "text-white/60" },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-center"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">{item.label}</p>
                    <p className={`text-xl sm:text-2xl font-bold ${item.color}`}>{item.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* ROI highlight */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-6 sm:p-8 text-center"
              >
                <p className="text-xs uppercase tracking-wider text-emerald-400/60 mb-2">
                  Return on Investment
                </p>
                <p className="text-5xl sm:text-6xl font-bold text-emerald-400">
                  {results.roi > 999999
                    ? `${(results.roi / 1000).toFixed(0)}K`
                    : results.roi.toLocaleString(undefined, { maximumFractionDigits: 0 })}%
                </p>
                <p className="text-sm text-white/40 mt-3">
                  {fmt(results.revenue)} revenue on ${results.cost.toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo infrastructure
                </p>
              </motion.div>
            </motion.div>
          )}
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
              Start Generating That ROI Today
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              ColdRelay provides the infrastructure to power your cold email at scale — mailboxes
              from $0.55/mo, automated warmup, and deliverability monitoring included.
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
