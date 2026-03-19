"use client";

import { useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Checklist items                                                     */
/* ------------------------------------------------------------------ */

const CHECKLIST = [
  {
    id: "spf",
    label: "SPF Record Configured",
    description: "Your domain has a valid SPF record that authorizes your sending IPs.",
    help: "SPF tells receiving servers which IPs are allowed to send email on behalf of your domain. Without it, your emails are far more likely to be flagged as suspicious.",
  },
  {
    id: "dkim",
    label: "DKIM Signing Enabled",
    description: "Outgoing emails are signed with DKIM to prove authenticity.",
    help: "DKIM adds a cryptographic signature to your emails that proves they weren't altered in transit. Major providers like Gmail and Outlook check for this.",
  },
  {
    id: "dmarc",
    label: "DMARC Policy Published",
    description: "A DMARC record is published with at least a 'none' policy.",
    help: "DMARC ties SPF and DKIM together and tells receiving servers what to do when authentication fails. Even a 'none' policy improves deliverability.",
  },
  {
    id: "warmup",
    label: "Domain Properly Warmed Up",
    description: "The domain has been gradually warmed up over 2-4 weeks.",
    help: "New domains need to build reputation by slowly increasing sending volume. Jumping to high volume immediately triggers spam filters.",
  },
  {
    id: "dedicated-ip",
    label: "Dedicated Sending IP",
    description: "Emails are sent from a dedicated IP (not shared with unknown senders).",
    help: "Shared IPs mean your reputation is affected by other senders. A dedicated IP gives you full control over your sender reputation.",
  },
  {
    id: "bounce",
    label: "Low Bounce Rate (<2%)",
    description: "Your email list has been verified and bounces are below 2%.",
    help: "High bounce rates signal to providers that you're sending to unverified or purchased lists — a major spam indicator. Keep bounces under 2%.",
  },
  {
    id: "blocklist",
    label: "No Blocklist Flags",
    description: "Your domain and sending IPs are not on any major blocklists.",
    help: "Being listed on blocklists like Spamhaus, Barracuda, or SpamCop means many providers will reject your emails outright. Check regularly.",
  },
  {
    id: "unsubscribe",
    label: "Proper Unsubscribe Mechanism",
    description: "Emails include a working unsubscribe link or opt-out mechanism.",
    help: "Having a clear unsubscribe option reduces spam complaints. Gmail and Yahoo now require a one-click unsubscribe header for bulk senders.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function getGrade(score: number): { letter: string; color: string; bg: string } {
  if (score >= 88) return { letter: "A+", color: "text-emerald-400", bg: "bg-emerald-500" };
  if (score >= 75) return { letter: "A", color: "text-emerald-400", bg: "bg-emerald-500" };
  if (score >= 63) return { letter: "B", color: "text-[#6B8FE6]", bg: "bg-[#4A73D5]" };
  if (score >= 50) return { letter: "C", color: "text-yellow-400", bg: "bg-yellow-500" };
  if (score >= 38) return { letter: "D", color: "text-orange-400", bg: "bg-orange-500" };
  return { letter: "F", color: "text-red-400", bg: "bg-red-500" };
}

function getPlacementEstimate(score: number): string {
  if (score >= 88) return "90-99%";
  if (score >= 75) return "75-90%";
  if (score >= 63) return "60-75%";
  if (score >= 50) return "40-60%";
  if (score >= 38) return "20-40%";
  return "Below 20%";
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "What is inbox placement rate?",
    a: "Inbox placement rate is the percentage of your emails that land in the recipient's primary inbox (not spam, promotions, or blocked). It's the most important metric for cold email success — if your emails don't reach the inbox, nothing else matters.",
  },
  {
    q: "Is this a real inbox placement test?",
    a: "This is an educational assessment tool that estimates your likely inbox placement based on best practices. A real inbox placement test requires sending actual emails to seed accounts and checking where they land. ColdRelay includes real inbox placement testing as part of its deliverability monitoring.",
  },
  {
    q: "What's a good inbox placement rate for cold email?",
    a: "Top cold email senders achieve 85-95% inbox placement. Anything below 70% means a significant portion of your outreach is wasted. The items in this checklist are the primary factors that determine your placement rate.",
  },
  {
    q: "How often should I check my inbox placement?",
    a: "For active cold email campaigns, check weekly at minimum. Your placement rate can change rapidly based on sending patterns, complaints, and blocklist status. Continuous monitoring is ideal — which is why ColdRelay automates this.",
  },
  {
    q: "Which factor has the biggest impact on inbox placement?",
    a: "Authentication (SPF, DKIM, DMARC) is the foundation — without it, nothing else matters. After that, domain warmup and bounce rate have the biggest impact. A fully authenticated, warmed-up domain with clean lists will have excellent placement.",
  },
];

/* ------------------------------------------------------------------ */
/*  Schema                                                              */
/* ------------------------------------------------------------------ */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      name: "Inbox Placement Tester",
      url: "https://coldrelay.com/tools/inbox-placement-tester",
      applicationCategory: "Email Tool",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Estimate your email inbox placement rate based on an 8-point deliverability checklist. Score your cold email setup and get actionable recommendations.",
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function InboxPlacementTester() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [showResults, setShowResults] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const toggle = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setShowResults(false);
  };

  const score = checked.size * 12.5;
  const grade = getGrade(score);
  const placement = getPlacementEstimate(score);
  const missing = CHECKLIST.filter((item) => !checked.has(item.id));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1 text-xs text-white/40 hover:text-white/60 transition-colors mb-8"
          >
            ← All Tools
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4A73D5]/20 bg-[#4A73D5]/10 px-3 py-1 mb-6">
            <span className="text-xs font-medium tracking-wide uppercase text-[#6B8FE6]">
              Free Tool
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight font-bold mb-5">
            Inbox Placement Tester
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl">
            Score your cold email setup against 8 critical deliverability factors. Each item is
            worth 12.5 points — see your estimated inbox placement rate and what to fix.
          </p>
        </div>
      </section>

      <hr className="border-white/[0.06] max-w-4xl mx-auto" />

      {/* Checklist */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white mb-2">Deliverability Checklist</h2>
            <p className="text-sm text-white/40 mb-6">
              Check each item that applies to your current email setup.
            </p>
            <div className="space-y-3">
              {CHECKLIST.map((item) => (
                <label
                  key={item.id}
                  className={`flex items-start gap-4 rounded-xl border p-4 cursor-pointer transition-all ${
                    checked.has(item.id)
                      ? "border-emerald-500/30 bg-emerald-500/[0.04]"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1]"
                  }`}
                >
                  <div className="pt-0.5">
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        checked.has(item.id)
                          ? "border-emerald-500 bg-emerald-500"
                          : "border-white/20"
                      }`}
                    >
                      {checked.has(item.id) && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked.has(item.id)}
                      onChange={() => toggle(item.id)}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white">{item.label}</div>
                    <div className="text-xs text-white/40 mt-0.5">{item.description}</div>
                  </div>
                  <div className="text-xs text-white/20 flex-shrink-0">12.5 pts</div>
                </label>
              ))}
            </div>

            <button
              onClick={() => setShowResults(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#4A73D5] hover:bg-[#5A83E5] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20 transition-all"
            >
              Calculate Score
            </button>
          </div>
        </div>
      </section>

      {/* Results */}
      {showResults && (
        <section className="pb-12 sm:pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Score Card */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur p-8 sm:p-10 text-center">
              <div className="text-xs text-white/40 uppercase tracking-wider mb-4">
                Your Deliverability Score
              </div>
              <div className="relative w-32 h-32 mx-auto mb-6">
                <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-white/[0.06]"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={`${(score / 100) * 327} 327`}
                    strokeLinecap="round"
                    className={grade.color}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-3xl font-bold ${grade.color}`}>{score}</span>
                  <span className="text-xs text-white/30">/100</span>
                </div>
              </div>
              <div className={`text-2xl font-bold ${grade.color} mb-2`}>Grade: {grade.letter}</div>
              <div className="text-sm text-white/50">
                Estimated Inbox Placement: <span className="text-white font-semibold">{placement}</span>
              </div>
              <div className="text-xs text-white/30 mt-2">
                {checked.size}/8 items checked
              </div>
            </div>

            {/* Missing items */}
            {missing.length > 0 && (
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-white mb-4">
                  🔧 Items to Fix ({missing.length})
                </h3>
                <div className="space-y-4">
                  {missing.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-red-500/10 bg-red-500/[0.03] p-4"
                    >
                      <div className="text-sm font-medium text-red-400 mb-1">✗ {item.label}</div>
                      <p className="text-xs text-white/50">{item.help}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {score === 100 && (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 sm:p-8 text-center">
                <div className="text-3xl mb-3">🎉</div>
                <h3 className="text-lg font-semibold text-emerald-400 mb-2">Perfect Score!</h3>
                <p className="text-sm text-white/50">
                  Your setup checks all the boxes. Keep monitoring to maintain this level of
                  deliverability.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

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
              Get 99% Inbox Placement with ColdRelay
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              ColdRelay handles every item on this checklist automatically — SPF, DKIM, DMARC,
              warmup, dedicated IPs, bounce management, blocklist monitoring, and compliance. You
              just write the emails.
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
