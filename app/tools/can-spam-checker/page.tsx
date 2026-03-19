"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Compliance requirements                                             */
/* ------------------------------------------------------------------ */

interface Requirement {
  id: string;
  label: string;
  description: string;
  weight: number;
  critical: boolean;
}

const requirements: Requirement[] = [
  {
    id: "unsubscribe",
    label: "Unsubscribe link included",
    description:
      "Every commercial email must include a clear, conspicuous mechanism to opt out of future messages. The unsubscribe link must be easy to find and use — no hidden links or multi-step processes.",
    weight: 20,
    critical: true,
  },
  {
    id: "address",
    label: "Physical postal address included",
    description:
      "Your email must contain a valid physical postal address. This can be a current street address, a PO Box registered with the US Postal Service, or a private mailbox registered with a commercial mail receiving agency.",
    weight: 20,
    critical: true,
  },
  {
    id: "subject",
    label: "Subject line accurately reflects content",
    description:
      "The subject line must not be deceptive or misleading about the content of the message. It should give the recipient a reasonable indication of what the email contains.",
    weight: 15,
    critical: true,
  },
  {
    id: "headers",
    label: "No deceptive headers (From, To, Reply-To)",
    description:
      'The "From," "To," "Reply-To," and routing information must accurately identify the person or business who sent the message. Forging header information is a violation of CAN-SPAM.',
    weight: 15,
    critical: true,
  },
  {
    id: "ad-disclosure",
    label: "Email identified as an advertisement",
    description:
      "If your message is an ad, you must clearly and conspicuously disclose that. There's flexibility in how to do this, but recipients should be able to identify the message as an advertisement.",
    weight: 15,
    critical: false,
  },
  {
    id: "opt-out",
    label: "Opt-out requests honored within 10 business days",
    description:
      "You must honor opt-out requests within 10 business days. You cannot charge a fee, require additional personal information, or make the recipient take any step other than sending a reply email or visiting a single web page to opt out.",
    weight: 15,
    critical: true,
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ                                                                 */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "What is CAN-SPAM?",
    a: "The CAN-SPAM Act (Controlling the Assault of Non-Solicited Pornography And Marketing Act) is a US law that sets rules for commercial email messages. It gives recipients the right to stop receiving emails and establishes penalties for violations — up to $50,120 per email.",
  },
  {
    q: "Does CAN-SPAM apply to cold emails?",
    a: "Yes. CAN-SPAM applies to all commercial email messages — including cold outreach. Any email whose primary purpose is to advertise or promote a product, service, or commercial website is covered, regardless of whether the recipient opted in.",
  },
  {
    q: "What are the penalties for CAN-SPAM violations?",
    a: "Each individual email in violation of the CAN-SPAM Act is subject to penalties of up to $50,120. The FTC actively enforces these rules, and ISPs also use compliance as a factor in email filtering decisions.",
  },
  {
    q: "Is CAN-SPAM the only law I need to worry about?",
    a: "No. If you email recipients in Europe, GDPR applies. Canada has CASL, and other countries have their own regulations. CAN-SPAM is the US standard, but international senders should also comply with local laws in their recipients' countries.",
  },
  {
    q: "Do I need an unsubscribe link in every cold email?",
    a: "Yes, under CAN-SPAM. Every commercial email must include a clear opt-out mechanism. Most cold email platforms add this automatically. Not including one is both a legal risk and a deliverability red flag.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function CanSpamCheckerPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
    setShowResults(false);
  };

  const handleCheck = () => setShowResults(true);

  const totalPoints = requirements.reduce((s, r) => s + r.weight, 0);
  const earnedPoints = requirements.reduce(
    (s, r) => s + (checked[r.id] ? r.weight : 0),
    0
  );
  const pct = Math.round((earnedPoints / totalPoints) * 100);

  const criticalMissing = requirements.filter(
    (r) => r.critical && !checked[r.id]
  );

  const status: "compliant" | "needs-work" | "non-compliant" =
    pct === 100
      ? "compliant"
      : criticalMissing.length === 0
        ? "needs-work"
        : criticalMissing.length <= 2
          ? "needs-work"
          : "non-compliant";

  const statusConfig = {
    compliant: {
      label: "✓ Compliant",
      color: "text-emerald-400",
      border: "border-emerald-500/20 bg-emerald-500/[0.06]",
      desc: "Your email meets all CAN-SPAM requirements. You're good to send.",
    },
    "needs-work": {
      label: "⚠ Needs Work",
      color: "text-yellow-400",
      border: "border-yellow-500/20 bg-yellow-500/[0.06]",
      desc: "Your email is missing some requirements. Address the items below before sending.",
    },
    "non-compliant": {
      label: "✗ Non-Compliant",
      color: "text-red-400",
      border: "border-red-500/20 bg-red-500/[0.06]",
      desc: "Your email has critical compliance gaps. Fix these immediately to avoid legal issues and deliverability problems.",
    },
  };

  const cfg = statusConfig[status];

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
            name: "CAN-SPAM Compliance Checker",
            url: "https://coldrelay.com/tools/can-spam-checker",
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
            CAN-SPAM Compliance Checker
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            Check if your cold emails comply with the CAN-SPAM Act. Go through the checklist,
            get your compliance score, and understand each requirement.
          </p>
        </div>
      </section>

      {/* Checker */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8"
          >
            <p className="text-sm text-white/50 mb-6">
              Check each requirement that your email currently meets:
            </p>
            <div className="space-y-4">
              {requirements.map((req) => (
                <label
                  key={req.id}
                  className={`flex items-start gap-4 rounded-xl border p-4 cursor-pointer transition-all ${
                    checked[req.id]
                      ? "border-emerald-500/20 bg-emerald-500/[0.04]"
                      : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]"
                  }`}
                >
                  <div className="flex-shrink-0 pt-0.5">
                    <input
                      type="checkbox"
                      checked={!!checked[req.id]}
                      onChange={() => toggle(req.id)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                        checked[req.id]
                          ? "border-emerald-500 bg-emerald-500"
                          : "border-white/20 bg-transparent"
                      }`}
                    >
                      {checked[req.id] && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-white">{req.label}</span>
                      {req.critical && (
                        <span className="text-[10px] font-semibold tracking-wide uppercase text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed">{req.description}</p>
                  </div>
                </label>
              ))}
            </div>

            <button
              onClick={handleCheck}
              className="w-full sm:w-auto mt-6 rounded-xl bg-[#4A73D5] hover:bg-[#5A83E5] px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20 hover:shadow-[#4A73D5]/30 transition-all"
            >
              Check Compliance
            </button>
          </motion.div>

          {/* Results */}
          {showResults && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8"
            >
              {/* Score card */}
              <div className={`rounded-2xl border p-8 text-center mb-6 ${cfg.border}`}>
                <p className={`text-4xl font-bold ${cfg.color} mb-2`}>{cfg.label}</p>
                <p className="text-lg text-white/70 mb-1">
                  Score: <span className="font-bold">{pct}%</span> ({earnedPoints}/{totalPoints} points)
                </p>
                <p className="text-sm text-white/40 mt-3 max-w-md mx-auto">{cfg.desc}</p>
              </div>

              {/* Missing items */}
              {pct < 100 && (
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                  <h3 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-4">
                    Missing Requirements
                  </h3>
                  <div className="space-y-3">
                    {requirements
                      .filter((r) => !checked[r.id])
                      .map((req) => (
                        <div
                          key={req.id}
                          className={`rounded-xl border p-4 ${
                            req.critical
                              ? "border-red-500/15 bg-red-500/[0.03]"
                              : "border-yellow-500/15 bg-yellow-500/[0.03]"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`text-sm font-medium ${req.critical ? "text-red-400" : "text-yellow-400"}`}>
                              {req.critical ? "✗" : "⚠"} {req.label}
                            </span>
                          </div>
                          <p className="text-xs text-white/40">{req.description}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {pct === 100 && (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] p-6 text-center">
                  <p className="text-emerald-400 font-medium">
                    🎉 All requirements met! Your email is CAN-SPAM compliant.
                  </p>
                </div>
              )}
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
              Stay Compliant at Scale with ColdRelay
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              ColdRelay builds compliance into your infrastructure — automatic unsubscribe handling,
              proper headers, and deliverability monitoring. Focus on outreach, not regulations.
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
