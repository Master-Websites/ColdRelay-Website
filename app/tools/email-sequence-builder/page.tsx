"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type Tone = "professional" | "casual" | "direct" | "friendly";

interface EmailStep {
  label: string;
  delay: string;
  subject: string;
  body: string;
}

/* ------------------------------------------------------------------ */
/*  Sequence generation                                                 */
/* ------------------------------------------------------------------ */

const DELAYS = ["Day 1", "Day 3", "Day 7", "Day 14", "Day 21", "Day 30"];

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function generateSequence(
  product: string,
  audience: string,
  followUps: number,
  tone: Tone
): EmailStep[] {
  const p = product.trim() || "our solution";
  const a = audience.trim() || "decision-makers";
  const steps: EmailStep[] = [];

  // Tone-specific openers & closings
  const greetings: Record<Tone, string[]> = {
    professional: ["Hi {{firstName}},", "Hello {{firstName}},", "Dear {{firstName}},"],
    casual: ["Hey {{firstName}},", "Hi {{firstName}} 👋,", "Hey there,"],
    direct: ["{{firstName}},", "Hi {{firstName}},", "{{firstName}} —"],
    friendly: ["Hi {{firstName}}!", "Hey {{firstName}},", "Hope you're doing well, {{firstName}}!"],
  };

  const closings: Record<Tone, string[]> = {
    professional: ["Best regards", "Kind regards", "Best"],
    casual: ["Cheers", "Talk soon", "Best"],
    direct: ["— {{senderName}}", "Best", "Thanks"],
    friendly: ["Looking forward to hearing from you!", "Talk soon!", "Have a great day!"],
  };

  const signoff = (i: number) => closings[tone][i % closings[tone].length];
  const greeting = (i: number) => greetings[tone][i % greetings[tone].length];

  // Initial email
  steps.push({
    label: "Initial Email",
    delay: DELAYS[0],
    subject: tone === "casual"
      ? `Quick question about ${a}`
      : tone === "direct"
        ? `${capitalize(p)} for ${a}`
        : `Helping ${a} with ${p.toLowerCase().includes("help") ? p : p}`,
    body: `${greeting(0)}

I noticed you work with ${a} and wanted to reach out. We built ${p} specifically to help teams like yours.

${tone === "professional"
  ? `I'd love to share how we've helped similar organizations improve their results.`
  : tone === "casual"
    ? `Would love to chat about how this could help you out.`
    : tone === "direct"
      ? `Are you open to a quick 15-minute call this week?`
      : `I think you'd find it really interesting — would you be open to a quick chat?`}

Would {{day}} or {{day}} work for a brief call?

${signoff(0)}
{{senderName}}`,
  });

  // Follow-up templates
  const followUpTemplates: { subject: string; body: string }[] = [
    {
      subject: `Re: ${steps[0].subject}`,
      body: `${greeting(1)}

Just circling back on my last email. I know ${a} are busy, so I'll keep this short.

${p} has helped companies reduce their ${tone === "casual" ? "headaches" : "operational overhead"} significantly. Happy to share specifics.

Worth a quick chat?

${signoff(1)}
{{senderName}}`,
    },
    {
      subject: `${capitalize(a)} are seeing results with ${p}`,
      body: `${greeting(2)}

${tone === "professional"
  ? `I wanted to share a quick data point: our clients typically see measurable improvements within the first 30 days of using ${p}.`
  : tone === "casual"
    ? `Quick update — teams like yours are getting great results with ${p}. Thought you'd want to know.`
    : tone === "direct"
      ? `Teams similar to yours are using ${p} to drive results. The typical ROI is positive within 30 days.`
      : `Some exciting news — teams just like yours have been getting amazing results with ${p}!`}

Would it make sense to explore this for your team?

${signoff(2)}
{{senderName}}`,
    },
    {
      subject: `Should I close the loop?`,
      body: `${greeting(0)}

I've reached out a couple of times about ${p}. I completely understand if the timing isn't right.

${tone === "professional"
  ? `If this isn't a priority right now, no worries at all. I just don't want you to miss out if it could help.`
  : tone === "casual"
    ? `Totally get it if now's not the time. Just didn't want to let this slip if it could actually help.`
    : tone === "direct"
      ? `If this isn't relevant, just let me know and I'll stop following up.`
      : `No pressure at all! I just want to make sure you have the info if it could be useful.`}

Either way, happy to help whenever the time is right.

${signoff(1)}
{{senderName}}`,
    },
    {
      subject: `One last thing`,
      body: `${greeting(1)}

This will be my last follow-up. I respect your time and don't want to be a nuisance.

${tone === "professional"
  ? `If ${p} ever becomes relevant for ${a}, my door is always open.`
  : tone === "casual"
    ? `If you ever want to chat about ${p}, you know where to find me.`
    : tone === "direct"
      ? `When you're ready to explore ${p}, reach out. I'm here.`
      : `Whenever the timing feels right, I'd love to connect! No expiration date on this offer 😊`}

All the best,
{{senderName}}`,
    },
    {
      subject: `Breakup: ${p}`,
      body: `${greeting(2)}

I'll take the hint — now clearly isn't the right time. I'm removing you from my follow-up list.

If things change down the road and ${p} becomes relevant, feel free to reply to this thread anytime.

Wishing you and the team all the best.

${signoff(0)}
{{senderName}}`,
    },
  ];

  for (let i = 0; i < Math.min(followUps, 5); i++) {
    steps.push({
      label: `Follow-up ${i + 1}`,
      delay: DELAYS[i + 1] || `Day ${14 + i * 7}`,
      ...followUpTemplates[i],
    });
  }

  return steps;
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                 */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "How many follow-ups should a cold email sequence have?",
    a: "Research shows that 3-5 follow-ups is the sweet spot. Most positive replies come from follow-ups, not the initial email. After 5 follow-ups with no response, it's best to stop and try again in a few months with a different angle.",
  },
  {
    q: "What's the ideal delay between follow-ups?",
    a: "A common pattern is Day 1, Day 3, Day 7, Day 14, Day 21. Shorter gaps early on (when you're top of mind) and longer gaps later. Avoid following up daily — it comes across as aggressive and can trigger spam complaints.",
  },
  {
    q: "How long should cold emails be?",
    a: "Under 100 words for cold emails, under 75 for follow-ups. Short emails get higher reply rates because they respect the recipient's time and are easier to process on mobile devices. Get to the point fast.",
  },
  {
    q: "Should I use the same subject line for follow-ups?",
    a: "For the first 1-2 follow-ups, reply to the same thread (Re: original subject) to maintain context. For later follow-ups, a new subject line can re-engage prospects who ignored the original thread.",
  },
  {
    q: "What tone works best for cold email?",
    a: "It depends on your audience. B2B executives respond better to professional and direct tones. Startup founders and marketers often prefer casual. The key is to sound like a real person, not a marketing template.",
  },
];

const tones: { key: Tone; label: string; desc: string }[] = [
  { key: "professional", label: "Professional", desc: "Polished & business-appropriate" },
  { key: "casual", label: "Casual", desc: "Relaxed & conversational" },
  { key: "direct", label: "Direct", desc: "Straight to the point" },
  { key: "friendly", label: "Friendly", desc: "Warm & approachable" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function EmailSequenceBuilderPage() {
  const [product, setProduct] = useState("");
  const [audience, setAudience] = useState("");
  const [followUps, setFollowUps] = useState("3");
  const [tone, setTone] = useState<Tone>("professional");
  const [sequence, setSequence] = useState<EmailStep[] | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const handleGenerate = useCallback(() => {
    const f = Math.max(1, Math.min(5, parseInt(followUps) || 3));
    setSequence(generateSequence(product, audience, f, tone));
    setCopiedIdx(null);
    setCopiedAll(false);
  }, [product, audience, followUps, tone]);

  const copyOne = (idx: number) => {
    if (!sequence) return;
    const step = sequence[idx];
    const text = `Subject: ${step.subject}\n\n${step.body}`;
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  const copyAll = () => {
    if (!sequence) return;
    const text = sequence
      .map((s, i) => `--- ${s.label} (${s.delay}) ---\nSubject: ${s.subject}\n\n${s.body}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
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
            name: "Email Sequence Builder",
            url: "https://coldrelay.com/tools/email-sequence-builder",
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
            Email Sequence Builder
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            Generate a complete cold email sequence — initial email plus follow-ups with optimal
            timing. Customized for your product, audience, and tone.
          </p>
        </div>
      </section>

      {/* Builder */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8"
          >
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Product / Service
                </label>
                <input
                  type="text"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="e.g., ColdRelay email infrastructure"
                  className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="e.g., SaaS founders, sales leaders"
                  className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Follow-ups (1–5)
                </label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={followUps}
                  onChange={(e) => setFollowUps(e.target.value)}
                  className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/70 mb-3">Tone</label>
                <div className="grid grid-cols-2 gap-2">
                  {tones.map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setTone(t.key)}
                      className={`rounded-lg border px-3 py-2 text-left transition-all ${
                        tone === t.key
                          ? "border-[#4A73D5]/40 bg-[#4A73D5]/10"
                          : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]"
                      }`}
                    >
                      <p className={`text-xs font-medium ${tone === t.key ? "text-[#6B8FE6]" : "text-white"}`}>
                        {t.label}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              className="w-full sm:w-auto rounded-xl bg-[#4A73D5] hover:bg-[#5A83E5] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20 hover:shadow-[#4A73D5]/30 transition-all"
            >
              Generate Sequence
            </button>
          </motion.div>

          {/* Sequence output */}
          <AnimatePresence>
            {sequence && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8"
              >
                {/* Copy all */}
                <div className="flex justify-between items-center mb-4">
                  <p className="text-sm text-white/40">
                    {sequence.length} email{sequence.length > 1 ? "s" : ""} in sequence
                  </p>
                  <button
                    onClick={copyAll}
                    className="inline-flex items-center gap-2 rounded-lg bg-white/[0.06] border border-white/[0.1] px-4 py-2 text-xs font-medium text-white/70 hover:text-white hover:bg-white/[0.1] transition-all"
                  >
                    {copiedAll ? "✓ Copied All!" : "Copy All Emails"}
                  </button>
                </div>

                {/* Email steps */}
                <div className="space-y-4">
                  {sequence.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="rounded-2xl border border-white/[0.08] bg-white/[0.02] overflow-hidden"
                    >
                      {/* Step header */}
                      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded-full bg-[#4A73D5]/20 flex items-center justify-center text-xs font-bold text-[#6B8FE6]">
                            {i + 1}
                          </span>
                          <div>
                            <p className="text-sm font-medium text-white">{step.label}</p>
                            <p className="text-xs text-white/30">Send on {step.delay}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => copyOne(i)}
                          className="text-xs text-white/40 hover:text-white/70 transition-colors"
                        >
                          {copiedIdx === i ? "✓ Copied" : "Copy"}
                        </button>
                      </div>

                      {/* Email content */}
                      <div className="p-5">
                        <p className="text-xs text-white/30 mb-1">Subject:</p>
                        <p className="text-sm font-medium text-[#6B8FE6] mb-4">{step.subject}</p>
                        <pre className="text-sm text-white/70 whitespace-pre-wrap leading-relaxed font-sans">
                          {step.body}
                        </pre>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
              Send Sequences That Actually Get Replies
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              ColdRelay manages your entire sending infrastructure — domains, mailboxes, warmup,
              and rotation — so your carefully crafted sequences land in the inbox, not spam.
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
