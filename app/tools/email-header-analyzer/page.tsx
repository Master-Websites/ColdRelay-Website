"use client";

import { useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type AuthResult = {
  spf: string | null;
  dkim: string | null;
  dmarc: string | null;
};

type ParsedHeaders = {
  from: string;
  to: string;
  subject: string;
  date: string;
  returnPath: string;
  messageId: string;
  auth: AuthResult;
  receivedHops: string[];
  raw: Record<string, string[]>;
};

/* ------------------------------------------------------------------ */
/*  Parser                                                              */
/* ------------------------------------------------------------------ */

function parseHeaders(raw: string): ParsedHeaders {
  // Unfold continuation lines (lines starting with whitespace are continuations)
  const unfolded = raw.replace(/\r?\n(?=[ \t])/g, " ");
  const lines = unfolded.split(/\r?\n/);

  const headers: Record<string, string[]> = {};
  for (const line of lines) {
    const match = line.match(/^([A-Za-z0-9-]+):\s*(.*)/);
    if (match) {
      const key = match[1].toLowerCase();
      const value = match[2].trim();
      if (!headers[key]) headers[key] = [];
      headers[key].push(value);
    }
  }

  const get = (k: string) => (headers[k] ? headers[k][0] : "");

  // Parse Authentication-Results
  const authResults = headers["authentication-results"] || [];
  const authText = authResults.join(" ");

  const spfMatch = authText.match(/spf\s*=\s*(\w+)/i);
  const dkimMatch = authText.match(/dkim\s*=\s*(\w+)/i);
  const dmarcMatch = authText.match(/dmarc\s*=\s*(\w+)/i);

  // Parse Received headers (earliest first = reverse of appearance order)
  const received = (headers["received"] || []).slice().reverse();

  return {
    from: get("from"),
    to: get("to"),
    subject: get("subject"),
    date: get("date"),
    returnPath: get("return-path"),
    messageId: get("message-id"),
    auth: {
      spf: spfMatch ? spfMatch[1].toLowerCase() : null,
      dkim: dkimMatch ? dkimMatch[1].toLowerCase() : null,
      dmarc: dmarcMatch ? dmarcMatch[1].toLowerCase() : null,
    },
    receivedHops: received,
    raw: headers,
  };
}

function statusColor(value: string | null): string {
  if (!value) return "text-white/40 bg-white/[0.04]";
  if (value === "pass") return "text-emerald-400 bg-emerald-500/10";
  if (value === "fail" || value === "softfail" || value === "permerror" || value === "temperror")
    return "text-red-400 bg-red-500/10";
  if (value === "neutral" || value === "none")
    return "text-yellow-400 bg-yellow-500/10";
  return "text-white/60 bg-white/[0.04]";
}

function statusLabel(value: string | null): string {
  if (!value) return "Not found";
  return value.toUpperCase();
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "What are email headers?",
    a: "Email headers are metadata attached to every email that describe how the message was routed, who sent it, authentication results, and more. They're like a postal stamp trail — each server that handles the email adds its own header.",
  },
  {
    q: "How do I find raw email headers?",
    a: "In Gmail: Open the email → click the three dots → 'Show original'. In Outlook: Open the email → File → Properties → 'Internet headers'. In Apple Mail: View → Message → All Headers. Copy the entire header block and paste it into this tool.",
  },
  {
    q: "What do SPF, DKIM, and DMARC mean?",
    a: "SPF (Sender Policy Framework) verifies that the sending server is authorized to send on behalf of the domain. DKIM (DomainKeys Identified Mail) verifies the email wasn't tampered with using a cryptographic signature. DMARC (Domain-based Message Authentication, Reporting, and Conformance) ties SPF and DKIM together with a policy for handling failures.",
  },
  {
    q: "Why does authentication matter for cold email?",
    a: "Email providers like Gmail and Outlook use SPF, DKIM, and DMARC results to decide whether to deliver your email to the inbox, spam, or reject it entirely. Failing any of these checks dramatically reduces your deliverability. For cold email, passing all three is non-negotiable.",
  },
  {
    q: "What are Received headers?",
    a: "Each mail server that handles your email adds a 'Received' header. Reading them in order shows you the exact route your email took from sender to recipient. This is useful for diagnosing delivery delays and identifying suspicious relays.",
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
      name: "Email Header Analyzer",
      url: "https://coldrelay.com/tools/email-header-analyzer",
      applicationCategory: "Email Tool",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Paste raw email headers and instantly analyze SPF, DKIM, DMARC authentication results, routing hops, and key header fields. Free online tool.",
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

export default function EmailHeaderAnalyzer() {
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<ParsedHeaders | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const analyze = () => {
    if (!input.trim()) return;
    setParsed(parseHeaders(input));
  };

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
            Email Header Analyzer
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl">
            Paste raw email headers to inspect SPF, DKIM, and DMARC authentication, trace the
            routing path, and extract key fields like From, To, Subject, and Message-ID.
          </p>
        </div>
      </section>

      <hr className="border-white/[0.06] max-w-4xl mx-auto" />

      {/* Input */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
            <label className="block text-sm font-medium text-white/70 mb-3">
              Paste Raw Email Headers
            </label>
            <textarea
              className="w-full h-48 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-white font-mono placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 resize-y"
              placeholder={"Delivered-To: example@gmail.com\nReceived: from ...\nAuthentication-Results: ..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={analyze}
              disabled={!input.trim()}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#4A73D5] hover:bg-[#5A83E5] disabled:opacity-40 disabled:cursor-not-allowed px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20 transition-all"
            >
              Analyze Headers
            </button>
          </div>
        </div>
      </section>

      {/* Results */}
      {parsed && (
        <section className="pb-12 sm:pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            {/* Key Fields */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white mb-6">Key Fields</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { label: "From", value: parsed.from },
                  { label: "To", value: parsed.to },
                  { label: "Subject", value: parsed.subject },
                  { label: "Date", value: parsed.date },
                  { label: "Return-Path", value: parsed.returnPath },
                  { label: "Message-ID", value: parsed.messageId },
                ].map((field) => (
                  <div key={field.label} className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4">
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-1.5">
                      {field.label}
                    </div>
                    <div className="text-sm text-white break-all font-mono">
                      {field.value || <span className="text-white/20">Not found</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Authentication */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-white mb-6">Authentication Results</h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {(["spf", "dkim", "dmarc"] as const).map((check) => (
                  <div
                    key={check}
                    className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-5 text-center"
                  >
                    <div className="text-xs text-white/40 uppercase tracking-wider mb-3">
                      {check.toUpperCase()}
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 text-sm font-semibold px-3 py-1.5 rounded-full ${statusColor(parsed.auth[check])}`}
                    >
                      {parsed.auth[check] === "pass" && "✓ "}
                      {(parsed.auth[check] === "fail" || parsed.auth[check] === "softfail") && "✗ "}
                      {statusLabel(parsed.auth[check])}
                    </span>
                  </div>
                ))}
              </div>
              {(!parsed.auth.spf && !parsed.auth.dkim && !parsed.auth.dmarc) && (
                <p className="text-sm text-white/40 mt-4">
                  No Authentication-Results header found. Make sure you pasted the full headers
                  including the authentication results added by the receiving server.
                </p>
              )}
            </div>

            {/* Email Route */}
            {parsed.receivedHops.length > 0 && (
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur p-6 sm:p-8">
                <h2 className="text-lg font-semibold text-white mb-6">
                  Email Route ({parsed.receivedHops.length} hops)
                </h2>
                <div className="space-y-3">
                  {parsed.receivedHops.map((hop, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 flex items-start gap-4"
                    >
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4A73D5]/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-[#6B8FE6]">{i + 1}</span>
                      </div>
                      <p className="text-xs text-white/60 font-mono leading-relaxed break-all">
                        {hop}
                      </p>
                    </div>
                  ))}
                </div>
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
              Stop Guessing. Start Landing in the Inbox.
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              ColdRelay automatically configures SPF, DKIM, and DMARC for every mailbox you create.
              No DNS headaches, no manual setup — just emails that land.
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
