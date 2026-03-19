"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

interface SubjectLine {
  text: string;
  style: string;
  styleColor: string;
}

/* ------------------------------------------------------------------ */
/*  Subject line generation                                             */
/* ------------------------------------------------------------------ */

function generateSubjectLines(
  product: string,
  role: string,
  emailGoal: string
): SubjectLine[] {
  const p = product.trim() || "your solution";
  const r = role.trim() || "decision-makers";
  const g = emailGoal.trim() || "connect";

  return [
    // Question style
    {
      text: `Quick question about ${r}'s outbound strategy?`,
      style: "Question",
      styleColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    {
      text: `Are you still handling ${g} manually?`,
      style: "Question",
      styleColor: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    },
    // Curiosity style
    {
      text: `This changed how ${r} approach cold email`,
      style: "Curiosity",
      styleColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    {
      text: `The reason most ${r} get ignored (and how to fix it)`,
      style: "Curiosity",
      styleColor: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    },
    // Direct style
    {
      text: `${p} for ${r} — ${g}`,
      style: "Direct",
      styleColor: "text-[#7B9BE0] bg-[#4A73D5]/10 border-[#4A73D5]/20",
    },
    {
      text: `15 min to show how ${p} helps with ${g}`,
      style: "Direct",
      styleColor: "text-[#7B9BE0] bg-[#4A73D5]/10 border-[#4A73D5]/20",
    },
    // Personalized style
    {
      text: `{{First Name}}, saw your team is scaling ${g}`,
      style: "Personalized",
      styleColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    {
      text: `For {{Company}} — a better way to handle ${g}`,
      style: "Personalized",
      styleColor: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    },
    // Number-based style
    {
      text: `3x more replies: how ${r} use ${p}`,
      style: "Number-based",
      styleColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
    {
      text: `${r} are saving 10+ hours/week on ${g}`,
      style: "Number-based",
      styleColor: "text-rose-400 bg-rose-500/10 border-rose-500/20",
    },
  ];
}

/* ------------------------------------------------------------------ */
/*  Tips                                                                */
/* ------------------------------------------------------------------ */

const tips = [
  "Keep subject lines under 50 characters — they display fully on mobile.",
  "Use the recipient's first name or company for instant personalization.",
  "Questions outperform statements. They trigger curiosity and engagement.",
  "Avoid ALL CAPS, excessive punctuation (!!!), and spam trigger words.",
  "Lowercase subject lines feel casual and human — they stand out in busy inboxes.",
  "A/B test at least 2-3 subject lines per campaign to find what resonates.",
  "Match the subject line to the email body. Clickbait kills trust.",
  "Numbers and specifics (\"3x\", \"10 hours\") increase open rates by up to 20%.",
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "What's the ideal subject line length?",
    a: "Between 30-50 characters is the sweet spot. Subject lines under 50 characters have the highest open rates because they display fully on both desktop and mobile. Anything over 60 characters risks being cut off, especially on smartphones.",
  },
  {
    q: "Should I use emojis in cold email subject lines?",
    a: "Generally, no. While emojis can work for marketing emails, they tend to hurt open rates in cold B2B outreach. They can feel unprofessional and may trigger spam filters. Stick to clean, text-only subject lines for cold email.",
  },
  {
    q: "How many subject lines should I test?",
    a: "Test 2-3 variations per campaign. This gives you enough data to identify what works without splitting your audience too thin. Run each variant on at least 100 recipients for statistically meaningful results.",
  },
  {
    q: "Do personalized subject lines really work better?",
    a: "Yes. Subject lines containing the recipient's first name or company name see 20-30% higher open rates. But don't overdo it — one personalization token is enough. Using both name and company can feel creepy rather than personal.",
  },
  {
    q: "Should my subject line match my email body?",
    a: "Absolutely. Misleading subject lines may get opens but destroy trust and hurt reply rates. Your subject line should accurately preview what the email is about. Think of it as a promise to the reader.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function SubjectLineGeneratorPage() {
  const [product, setProduct] = useState("");
  const [role, setRole] = useState("");
  const [emailGoal, setEmailGoal] = useState("");
  const [results, setResults] = useState<SubjectLine[] | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const handleGenerate = useCallback(() => {
    if (!product.trim() && !role.trim()) return;
    setResults(generateSubjectLines(product, role, emailGoal));
  }, [product, role, emailGoal]);

  const copyLine = (idx: number) => {
    if (!results) return;
    navigator.clipboard.writeText(results[idx].text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

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
            name: "Cold Email Subject Line Generator",
            url: "https://coldrelay.com/tools/subject-line-generator",
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
            Cold Email Subject Line Generator
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            Generate 10 high-converting subject lines in different styles. Questions, curiosity hooks,
            direct pitches, personalized lines, and number-based angles.
          </p>
        </div>
      </section>

      {/* Generator */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8"
          >
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-2">
                Your Product / Service
              </label>
              <input
                type="text"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                placeholder="e.g. ColdRelay, email infrastructure platform"
                className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-2">
                Target Role / Audience
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. SDR managers, agency founders, VP of Sales"
                className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium text-white/70 mb-2">
                Email Goal
              </label>
              <input
                type="text"
                value={emailGoal}
                onChange={(e) => setEmailGoal(e.target.value)}
                placeholder="e.g. book a demo, get a reply, share a case study"
                className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!product.trim() && !role.trim()}
              className="w-full rounded-xl bg-[#4A73D5] hover:bg-[#5A83E5] disabled:opacity-40 disabled:cursor-not-allowed px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20 hover:shadow-[#4A73D5]/30 transition-all"
            >
              Generate 10 Subject Lines
            </button>
          </motion.div>

          {/* Results */}
          <AnimatePresence>
            {results && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="mt-8 space-y-3"
              >
                <h3 className="text-lg font-semibold text-white mb-4">
                  Your Subject Lines
                </h3>
                {results.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 flex items-center gap-4"
                  >
                    <span className="text-xs font-mono text-white/30 w-5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white/80 font-medium truncate">{line.text}</p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span
                          className={`inline-flex text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full border ${line.styleColor}`}
                        >
                          {line.style}
                        </span>
                        <span className="text-xs text-white/30 font-mono">
                          {line.text.length} chars
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => copyLine(i)}
                      className="flex-shrink-0 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white transition-all"
                    >
                      {copiedIdx === i ? "Copied ✓" : "Copy"}
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 sm:py-24 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Subject Line Best Practices
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {tips.map((tip, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <span className="text-[#6B8FE6] text-sm font-bold mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-white/60 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>
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
              Subject Lines Won&apos;t Help If You&apos;re In Spam
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              Even the best subject lines are worthless if your emails never reach the inbox.
              ColdRelay handles domains, DNS, mailboxes, and dedicated IPs so you land where it
              matters.
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
