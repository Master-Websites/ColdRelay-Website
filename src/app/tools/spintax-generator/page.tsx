"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Spintax parser                                                      */
/* ------------------------------------------------------------------ */

/** Parse spintax segments from text. Supports {OPTION1|OPTION2|OPTION3} and {{OPTION1|OPTION2|OPTION3}} */
function findSpintaxSegments(text: string): { start: number; end: number; options: string[] }[] {
  const segments: { start: number; end: number; options: string[] }[] = [];
  // Match both {{...}} and {...} patterns with pipe-separated options
  const regex = /\{\{([^{}]+?)\}\}|\{([^{}]+?)\}/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    const inner = match[1] || match[2];
    const options = inner.split("|").map((s) => s.trim());
    if (options.length > 1) {
      segments.push({ start: match.index, end: match.index + match[0].length, options });
    }
  }
  return segments;
}

/** Count total unique variations */
function countVariations(text: string): number {
  const segments = findSpintaxSegments(text);
  if (segments.length === 0) return 1;
  return segments.reduce((total, seg) => total * seg.options.length, 1);
}

/** Generate a single random variation */
function generateVariation(text: string): string {
  return text.replace(/\{\{([^{}]+?)\}\}|\{([^{}]+?)\}/g, (_match, g1, g2) => {
    const inner: string = g1 || g2;
    const options = inner.split("|").map((s) => s.trim());
    if (options.length <= 1) return _match;
    return options[Math.floor(Math.random() * options.length)];
  });
}

/** Highlight spintax segments in text, returning React elements */
function highlightSpintax(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  const regex = /\{\{([^{}]+?)\}\}|\{([^{}]+?)\}/g;
  let lastIdx = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    const inner = match[1] || match[2];
    const options = inner.split("|").map((s) => s.trim());

    if (match.index > lastIdx) {
      parts.push(<span key={key++}>{text.slice(lastIdx, match.index)}</span>);
    }

    if (options.length > 1) {
      parts.push(
        <span
          key={key++}
          className="inline bg-[#4A73D5]/20 text-[#6B8FE6] rounded px-1 font-medium"
        >
          {match[0]}
        </span>
      );
    } else {
      parts.push(<span key={key++}>{match[0]}</span>);
    }

    lastIdx = match.index + match[0].length;
  }

  if (lastIdx < text.length) {
    parts.push(<span key={key++}>{text.slice(lastIdx)}</span>);
  }

  return parts;
}

/* ------------------------------------------------------------------ */
/*  Tips                                                                */
/* ------------------------------------------------------------------ */

const tips = [
  "Use spintax for the opening line — it has the most impact on uniqueness detection.",
  "Create 3-5 options per spintax group for meaningful variation.",
  "Keep variations natural. Every option should read well in context.",
  "Don't spintax proper nouns, personalization tokens, or your CTA.",
  "Combine spintax with mail merge variables ({{First Name}}) for maximum uniqueness.",
  "Test all variations before sending — one bad option can hurt your entire campaign.",
  "Use spintax in subject lines too for better deliverability at scale.",
  "Aim for at least 50+ unique variations per email to avoid duplicate content filters.",
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "What is spintax?",
    a: "Spintax (spin syntax) is a way to create multiple variations of text using a simple markup format. You wrap alternative phrases in curly braces separated by pipes: {Hello|Hi|Hey}. Email tools randomly pick one option per send, making each email unique and reducing spam filter triggers.",
  },
  {
    q: "Why should I use spintax in cold emails?",
    a: "Email providers like Google and Microsoft detect when identical emails are sent in bulk and flag them as spam. Spintax creates unique variations of each email, helping you bypass duplicate content detection and maintain high deliverability rates.",
  },
  {
    q: "What's the difference between {curly} and {{double curly}} syntax?",
    a: "Both work the same way for spintax. Some email platforms use single curly braces {option1|option2} while others use double curly braces {{option1|option2}}. This tool supports both formats. Check your email platform's documentation to see which format it expects.",
  },
  {
    q: "How many spintax variations do I need?",
    a: "For campaigns over 100 emails per day, aim for at least 50-100 unique variations. For larger campaigns (500+ per day), you'll want 500+ variations. The more variations, the less likely email providers will flag your messages as bulk/duplicate content.",
  },
  {
    q: "Can I nest spintax inside spintax?",
    a: "Some advanced email platforms support nested spintax like {Hello {there|friend}|Hi|Hey}, but most tools only support single-level spintax. This previewer handles single-level spintax. If you need nested support, check your specific email tool's documentation.",
  },
];

/* ------------------------------------------------------------------ */
/*  Example template                                                    */
/* ------------------------------------------------------------------ */

const exampleText = `{Hey|Hi|Hello} {{First Name}},

{I noticed|I saw|I came across} your {company|team|organization} is {scaling|growing|expanding} its outbound efforts.

{We built|We created|We developed} {a platform|a tool|a solution} that {handles|manages|automates} cold email infrastructure — {domains, DNS, and mailboxes|the entire technical setup|everything from domains to dedicated IPs}.

{Would you be open to|Are you interested in|Can I show you} a {quick|brief|15-minute} {chat|call|demo}?

{Best|Cheers|Thanks},
{{Sender Name}}`;

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function SpintaxGeneratorPage() {
  const [text, setText] = useState("");
  const [previews, setPreviews] = useState<string[]>([]);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const segmentCount = findSpintaxSegments(text).length;
  const totalVariations = text.trim() ? countVariations(text) : 0;

  const generatePreviews = useCallback(() => {
    if (!text.trim()) return;
    const newPreviews: string[] = [];
    for (let i = 0; i < 5; i++) {
      newPreviews.push(generateVariation(text));
    }
    setPreviews(newPreviews);
  }, [text]);

  const loadExample = () => {
    setText(exampleText);
    setPreviews([]);
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
            name: "Spintax Generator & Previewer",
            url: "https://coldrelay.com/tools/spintax-generator",
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
            Spintax Generator & Previewer
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            Paste your email with spintax syntax, see how many unique variations you can create, and
            preview random outputs. Perfect for scaling cold email without triggering spam filters.
          </p>
        </div>
      </section>

      {/* Editor */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8"
          >
            <div className="flex items-center justify-between mb-4">
              <label className="block text-sm font-medium text-white/70">
                Your Email with Spintax
              </label>
              <button
                onClick={loadExample}
                className="text-xs text-[#6B8FE6]/70 hover:text-[#6B8FE6] transition-colors"
              >
                Load example →
              </button>
            </div>

            <textarea
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                setPreviews([]);
              }}
              rows={12}
              placeholder={`Paste your email with spintax here...\n\nExample: {Hey|Hi|Hello} {{First Name}},\n\n{I noticed|I saw} your team is {scaling|growing} outbound...`}
              className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all font-mono leading-relaxed resize-y"
            />

            {/* Stats */}
            {text.trim() && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 flex flex-wrap gap-4"
              >
                <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-3 flex-1 min-w-[140px]">
                  <p className="text-xs text-white/40 mb-1">Spintax Segments</p>
                  <p className="text-2xl font-bold text-[#6B8FE6]">{segmentCount}</p>
                </div>
                <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-4 py-3 flex-1 min-w-[140px]">
                  <p className="text-xs text-white/40 mb-1">Unique Variations</p>
                  <p className="text-2xl font-bold text-[#6B8FE6]">
                    {totalVariations > 999999
                      ? `${(totalVariations / 1000000).toFixed(1)}M`
                      : totalVariations > 999
                        ? `${(totalVariations / 1000).toFixed(1)}K`
                        : totalVariations.toLocaleString()}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Highlighted preview */}
            {text.trim() && segmentCount > 0 && (
              <div className="mt-6">
                <p className="text-xs text-white/40 mb-2 font-medium">
                  Highlighted Spintax Segments
                </p>
                <div className="rounded-xl bg-[#0a0a0a] border border-white/[0.1] p-4 text-sm text-white/70 leading-relaxed whitespace-pre-wrap font-mono">
                  {highlightSpintax(text)}
                </div>
              </div>
            )}

            {/* Generate previews button */}
            <button
              onClick={generatePreviews}
              disabled={!text.trim() || segmentCount === 0}
              className="w-full mt-6 rounded-xl bg-[#4A73D5] hover:bg-[#5A83E5] disabled:opacity-40 disabled:cursor-not-allowed px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20 hover:shadow-[#4A73D5]/30 transition-all"
            >
              {previews.length > 0 ? "Generate More Previews" : "Generate 5 Random Previews"}
            </button>
          </motion.div>

          {/* Previews */}
          <AnimatePresence>
            {previews.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="mt-8 space-y-4"
              >
                <h3 className="text-lg font-semibold text-white">Random Previews</h3>
                {previews.map((preview, i) => (
                  <motion.div
                    key={`${i}-${preview.slice(0, 20)}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 relative"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-white/30 font-mono">
                        Variation #{i + 1}
                      </span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(preview);
                        }}
                        className="rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white transition-all"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">
                      {preview}
                    </p>
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
            Tips for Using Spintax Effectively
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
              Spintax Alone Won&apos;t Save Your Deliverability
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              Unique content helps, but you also need proper infrastructure — dedicated IPs, warmed
              mailboxes, and authenticated domains. ColdRelay handles all of it automatically.
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
