"use client";

import { useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type TestType = "subject-line" | "opening-line" | "cta" | "send-time";

type PlanResult = {
  samplePerVariant: number;
  totalSample: number;
  remaining: number;
  significanceThreshold: string;
  estimatedDays: number;
  methodology: string;
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

const TEST_TYPES: { value: TestType; label: string; metric: string; baseRate: number }[] = [
  { value: "subject-line", label: "Subject Line", metric: "Open Rate", baseRate: 0.35 },
  { value: "opening-line", label: "Opening Line", metric: "Reply Rate", baseRate: 0.05 },
  { value: "cta", label: "Call to Action", metric: "Click/Reply Rate", baseRate: 0.04 },
  { value: "send-time", label: "Send Time", metric: "Open Rate", baseRate: 0.35 },
];

/**
 * Calculate minimum sample size per variant for detecting a minimum detectable effect
 * Using simplified formula: n = (Z_α/2 + Z_β)² × 2p(1-p) / δ²
 * With 95% confidence (Z=1.96) and 80% power (Z=0.84)
 */
function calculateSample(baseRate: number, mde: number = 0.05): number {
  const z_alpha = 1.96; // 95% confidence
  const z_beta = 0.84; // 80% power
  const p = baseRate;
  const delta = mde; // minimum detectable effect (absolute)
  const n = Math.ceil(((z_alpha + z_beta) ** 2 * 2 * p * (1 - p)) / (delta ** 2));
  return Math.max(n, 50); // minimum 50 per variant
}

function calculatePlan(
  testType: TestType,
  listSize: number,
  dailySendRate: number = 50
): PlanResult {
  const config = TEST_TYPES.find((t) => t.value === testType)!;
  const samplePerVariant = calculateSample(config.baseRate);
  const totalSample = samplePerVariant * 2;
  const remaining = Math.max(0, listSize - totalSample);
  const estimatedDays = Math.ceil(totalSample / dailySendRate);

  let methodology: string;
  switch (testType) {
    case "subject-line":
      methodology =
        "Send Variant A and B to equal random segments. Measure open rates after 48 hours. The subject line with the higher open rate wins. Send the winner to the remaining list.";
      break;
    case "opening-line":
      methodology =
        "Send both variants with the same subject line. Measure reply rates after 5-7 days (including follow-up time). The opening with more replies wins.";
      break;
    case "cta":
      methodology =
        "Send both variants with the same subject and opening. Measure click-through or reply rate depending on your CTA type. Allow 5-7 days for results.";
      break;
    case "send-time":
      methodology =
        "Send the same email at two different times/days. Measure open rates after 48 hours for each send. The time slot with higher opens wins.";
      break;
  }

  return {
    samplePerVariant,
    totalSample,
    remaining,
    significanceThreshold: "95% confidence, 80% power",
    estimatedDays,
    methodology,
  };
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "What should I A/B test first in cold email?",
    a: "Start with subject lines — they have the highest impact since they determine whether your email gets opened at all. Once you have a winning subject line, test opening lines, then CTAs. Test one variable at a time to get clean results.",
  },
  {
    q: "How many emails do I need for a valid A/B test?",
    a: "It depends on the metric you're measuring. For open rates (subject lines), you typically need 200-500 per variant. For reply rates, you may need 500-2,000+ per variant because reply rates are lower and require larger samples to detect meaningful differences.",
  },
  {
    q: "What is statistical significance?",
    a: "Statistical significance means the difference between your variants is unlikely to be due to random chance. A 95% confidence level (the industry standard) means there's only a 5% probability the result is a fluke. Don't call a winner too early — wait for significance.",
  },
  {
    q: "Can I test more than two variants?",
    a: "Yes, but it increases the sample size needed. For cold email, stick to two variants (A/B) rather than multivariate tests. Your list sizes are typically limited, and two-variant tests give you clean, actionable results faster.",
  },
  {
    q: "How long should I wait before declaring a winner?",
    a: "For subject line tests (open rate), wait at least 48 hours. For reply rate tests, wait 5-7 days to account for delayed responses and follow-ups. Never declare a winner after just a few hours — you'll get skewed results from timezone effects.",
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
      name: "Cold Email A/B Test Planner",
      url: "https://coldrelay.com/tools/ab-test-planner",
      applicationCategory: "Email Tool",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Plan statistically valid A/B tests for cold email campaigns. Calculate sample sizes, significance thresholds, and estimated timelines for subject lines, opening lines, CTAs, and send times.",
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

export default function ABTestPlanner() {
  const [testType, setTestType] = useState<TestType>("subject-line");
  const [variantA, setVariantA] = useState("");
  const [variantB, setVariantB] = useState("");
  const [listSize, setListSize] = useState("");
  const [result, setResult] = useState<PlanResult | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const plan = () => {
    const size = parseInt(listSize) || 1000;
    setResult(calculatePlan(testType, size));
  };

  const config = TEST_TYPES.find((t) => t.value === testType)!;

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
            Cold Email A/B Test Planner
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl">
            Plan statistically valid A/B tests for your cold email campaigns. Enter your variants
            and list size to get sample sizes, timelines, and methodology recommendations.
          </p>
        </div>
      </section>

      <hr className="border-white/[0.06] max-w-4xl mx-auto" />

      {/* Input */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8 space-y-6">
            {/* Test type */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-3">
                What are you testing?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {TEST_TYPES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => {
                      setTestType(t.value);
                      setResult(null);
                    }}
                    className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                      testType === t.value
                        ? "border-[#4A73D5] bg-[#4A73D5]/10 text-[#6B8FE6]"
                        : "border-white/[0.08] bg-white/[0.02] text-white/50 hover:border-white/[0.12]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Variants */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Variant A
                </label>
                <textarea
                  className="w-full h-24 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 resize-none"
                  placeholder={testType === "subject-line" ? "Quick question about {{company}}" : testType === "send-time" ? "Tuesday 9am EST" : "Your variant A text…"}
                  value={variantA}
                  onChange={(e) => setVariantA(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Variant B
                </label>
                <textarea
                  className="w-full h-24 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 resize-none"
                  placeholder={testType === "subject-line" ? "{{firstName}}, saw your recent post" : testType === "send-time" ? "Thursday 2pm EST" : "Your variant B text…"}
                  value={variantB}
                  onChange={(e) => setVariantB(e.target.value)}
                />
              </div>
            </div>

            {/* List size */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Total List Size
              </label>
              <input
                type="number"
                className="w-full sm:w-64 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40"
                placeholder="1000"
                value={listSize}
                onChange={(e) => setListSize(e.target.value)}
              />
            </div>

            <button
              onClick={plan}
              className="inline-flex items-center gap-2 rounded-full bg-[#4A73D5] hover:bg-[#5A83E5] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20 transition-all"
            >
              Generate Test Plan
            </button>
          </div>
        </div>
      </section>

      {/* Results */}
      {result && (
        <section className="pb-12 sm:pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Variants Preview */}
            {(variantA || variantB) && (
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-white mb-4">Your Test</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-[#4A73D5]/20 bg-[#4A73D5]/[0.04] p-4">
                    <div className="text-xs text-[#6B8FE6] uppercase tracking-wider mb-2 font-semibold">
                      Variant A
                    </div>
                    <p className="text-sm text-white">{variantA || "—"}</p>
                  </div>
                  <div className="rounded-xl border border-[#4A73D5]/20 bg-[#4A73D5]/[0.04] p-4">
                    <div className="text-xs text-[#6B8FE6] uppercase tracking-wider mb-2 font-semibold">
                      Variant B
                    </div>
                    <p className="text-sm text-white">{variantB || "—"}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white mb-6">Test Plan</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 text-center">
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                    Sample Per Variant
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {result.samplePerVariant.toLocaleString()}
                  </div>
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 text-center">
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                    Total Test Emails
                  </div>
                  <div className="text-2xl font-bold text-white">
                    {result.totalSample.toLocaleString()}
                  </div>
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 text-center">
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                    Winner Gets Remaining
                  </div>
                  <div className="text-2xl font-bold text-emerald-400">
                    {result.remaining.toLocaleString()}
                  </div>
                </div>
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 text-center">
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                    Est. Days to Complete
                  </div>
                  <div className="text-2xl font-bold text-[#6B8FE6]">
                    {result.estimatedDays}
                  </div>
                </div>
              </div>

              {/* Warnings */}
              {result.totalSample > (parseInt(listSize) || 1000) && (
                <div className="mt-4 rounded-xl border border-yellow-500/20 bg-yellow-500/[0.04] p-4">
                  <p className="text-sm text-yellow-400">
                    ⚠️ Your list ({(parseInt(listSize) || 1000).toLocaleString()}) is smaller than
                    the recommended test sample ({result.totalSample.toLocaleString()}). Results may
                    not reach statistical significance. Consider testing with a larger list or
                    accepting directional (not conclusive) results.
                  </p>
                </div>
              )}
            </div>

            {/* Methodology */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white mb-4">Methodology</h2>
              <div className="space-y-4">
                <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                  <div className="text-xs text-white/40 uppercase tracking-wider mb-2">
                    Testing: {config.label}
                  </div>
                  <div className="text-xs text-white/40 mb-2">
                    Primary Metric: <span className="text-white">{config.metric}</span>
                  </div>
                  <div className="text-xs text-white/40 mb-2">
                    Significance: <span className="text-white">{result.significanceThreshold}</span>
                  </div>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{result.methodology}</p>

                <div className="rounded-xl bg-[#4A73D5]/[0.04] border border-[#4A73D5]/20 p-4">
                  <h4 className="text-sm font-semibold text-[#6B8FE6] mb-2">
                    📋 Step-by-Step Process
                  </h4>
                  <ol className="space-y-2 text-sm text-white/60">
                    <li className="flex items-start gap-2">
                      <span className="text-[#6B8FE6] font-bold flex-shrink-0">1.</span>
                      Randomly split {result.totalSample.toLocaleString()} contacts into two equal groups
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#6B8FE6] font-bold flex-shrink-0">2.</span>
                      Send Variant A to Group 1 ({result.samplePerVariant.toLocaleString()} contacts)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#6B8FE6] font-bold flex-shrink-0">3.</span>
                      Send Variant B to Group 2 ({result.samplePerVariant.toLocaleString()} contacts)
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#6B8FE6] font-bold flex-shrink-0">4.</span>
                      Wait {testType === "subject-line" || testType === "send-time" ? "48 hours" : "5-7 days"} for results to stabilize
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#6B8FE6] font-bold flex-shrink-0">5.</span>
                      Compare {config.metric.toLowerCase()} between variants
                    </li>
                    {result.remaining > 0 && (
                      <li className="flex items-start gap-2">
                        <span className="text-[#6B8FE6] font-bold flex-shrink-0">6.</span>
                        Send the winning variant to the remaining {result.remaining.toLocaleString()} contacts
                      </li>
                    )}
                  </ol>
                </div>
              </div>
            </div>
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
              A/B Test Automatically with ColdRelay
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              ColdRelay has built-in A/B testing that automatically splits your campaigns, tracks
              results, and sends the winning variant to the rest of your list. No manual work
              required.
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
