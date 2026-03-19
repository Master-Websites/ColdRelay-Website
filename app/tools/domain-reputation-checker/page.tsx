"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

interface DnsCheck {
  name: string;
  key: string;
  status: "pass" | "fail" | "warn" | "checking";
  value: string;
  points: number;
  maxPoints: number;
  recommendation: string;
}

/* ------------------------------------------------------------------ */
/*  DNS query helper via dns.google                                     */
/* ------------------------------------------------------------------ */

async function queryDNS(
  name: string,
  type: string
): Promise<{ answers: { data: string }[]; ok: boolean }> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    const res = await fetch(
      `https://dns.google/resolve?name=${encodeURIComponent(name)}&type=${type}`,
      { signal: controller.signal }
    );
    clearTimeout(timer);
    if (!res.ok) return { answers: [], ok: false };
    const data = await res.json();
    if (data.Answer && data.Answer.length > 0) {
      return {
        answers: data.Answer.map((a: { data: string }) => ({ data: a.data })),
        ok: true,
      };
    }
    return { answers: [], ok: true };
  } catch {
    return { answers: [], ok: false };
  }
}

/* ------------------------------------------------------------------ */
/*  Check functions                                                     */
/* ------------------------------------------------------------------ */

async function checkSPF(domain: string): Promise<DnsCheck> {
  const { answers } = await queryDNS(domain, "TXT");
  const spf = answers.find((a) => a.data.includes("v=spf1"));
  if (spf) {
    const hasAll = spf.data.includes("-all");
    return {
      name: "SPF Record",
      key: "spf",
      status: hasAll ? "pass" : "warn",
      value: spf.data.replace(/"/g, ""),
      points: hasAll ? 20 : 12,
      maxPoints: 20,
      recommendation: hasAll
        ? "SPF is properly configured with strict policy."
        : 'SPF found but consider using "-all" instead of "~all" for stricter enforcement.',
    };
  }
  return {
    name: "SPF Record",
    key: "spf",
    status: "fail",
    value: "Not found",
    points: 0,
    maxPoints: 20,
    recommendation: "Add an SPF record to authorize your sending servers. This is critical for deliverability.",
  };
}

async function checkDKIM(domain: string): Promise<DnsCheck> {
  const selectors = ["default", "google", "selector1", "selector2", "k1", "mail", "dkim", "s1", "s2"];
  for (const sel of selectors) {
    const { answers } = await queryDNS(`${sel}._domainkey.${domain}`, "TXT");
    const dkim = answers.find((a) => a.data.includes("v=DKIM1") || a.data.includes("p="));
    if (dkim) {
      return {
        name: "DKIM Record",
        key: "dkim",
        status: "pass",
        value: `Found (selector: ${sel})`,
        points: 20,
        maxPoints: 20,
        recommendation: `DKIM is configured with selector "${sel}". Emails will be cryptographically signed.`,
      };
    }
  }
  return {
    name: "DKIM Record",
    key: "dkim",
    status: "fail",
    value: "Not found (checked common selectors)",
    points: 0,
    maxPoints: 20,
    recommendation: "Set up DKIM signing for your domain. This authenticates your emails and significantly improves deliverability.",
  };
}

async function checkDMARC(domain: string): Promise<DnsCheck> {
  const { answers } = await queryDNS(`_dmarc.${domain}`, "TXT");
  const dmarc = answers.find((a) => a.data.includes("v=DMARC1"));
  if (dmarc) {
    const val = dmarc.data.replace(/"/g, "");
    const hasReject = val.includes("p=reject");
    const hasQuarantine = val.includes("p=quarantine");
    const isStrict = hasReject || hasQuarantine;
    return {
      name: "DMARC Record",
      key: "dmarc",
      status: isStrict ? "pass" : "warn",
      value: val,
      points: isStrict ? 20 : 10,
      maxPoints: 20,
      recommendation: isStrict
        ? "DMARC is configured with an enforcement policy. Excellent."
        : 'DMARC is set to "none" (monitoring only). Consider upgrading to "quarantine" or "reject" for better protection.',
    };
  }
  return {
    name: "DMARC Record",
    key: "dmarc",
    status: "fail",
    value: "Not found",
    points: 0,
    maxPoints: 20,
    recommendation: "Add a DMARC record to protect your domain from spoofing and improve email authentication.",
  };
}

async function checkMX(domain: string): Promise<DnsCheck> {
  const { answers } = await queryDNS(domain, "MX");
  if (answers.length > 0) {
    const mxList = answers.map((a) => a.data).join(", ");
    return {
      name: "MX Records",
      key: "mx",
      status: "pass",
      value: mxList,
      points: 15,
      maxPoints: 15,
      recommendation: `${answers.length} MX record${answers.length > 1 ? "s" : ""} found. Mail routing is configured.`,
    };
  }
  return {
    name: "MX Records",
    key: "mx",
    status: "fail",
    value: "Not found",
    points: 0,
    maxPoints: 15,
    recommendation: "No MX records found. This domain cannot receive email, which hurts sender credibility.",
  };
}

async function checkA(domain: string): Promise<DnsCheck> {
  const { answers } = await queryDNS(domain, "A");
  if (answers.length > 0) {
    return {
      name: "A Record",
      key: "a",
      status: "pass",
      value: answers.map((a) => a.data).join(", "),
      points: 10,
      maxPoints: 10,
      recommendation: "Domain resolves to an IP address. Website is reachable.",
    };
  }
  return {
    name: "A Record",
    key: "a",
    status: "warn",
    value: "Not found",
    points: 0,
    maxPoints: 10,
    recommendation: "No A record found. Having a website on your sending domain improves credibility with email providers.",
  };
}

async function checkBIMI(domain: string): Promise<DnsCheck> {
  const { answers } = await queryDNS(`default._bimi.${domain}`, "TXT");
  const bimi = answers.find((a) => a.data.includes("v=BIMI1"));
  if (bimi) {
    return {
      name: "BIMI Record",
      key: "bimi",
      status: "pass",
      value: bimi.data.replace(/"/g, ""),
      points: 15,
      maxPoints: 15,
      recommendation: "BIMI is configured. Your brand logo will appear next to emails in supported clients.",
    };
  }
  return {
    name: "BIMI Record",
    key: "bimi",
    status: "warn",
    value: "Not found",
    points: 0,
    maxPoints: 15,
    recommendation: "Consider adding BIMI to display your brand logo in email clients. Requires DMARC with enforcement.",
  };
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                 */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "What is domain reputation?",
    a: "Domain reputation is a score that email providers assign to your domain based on sending patterns, authentication records, complaint rates, and engagement metrics. A higher reputation means better inbox placement for your emails.",
  },
  {
    q: "How does DNS authentication affect deliverability?",
    a: "SPF, DKIM, and DMARC work together to prove that emails from your domain are legitimate. Without these records, email providers are more likely to flag your messages as spam or reject them outright. Proper authentication is the foundation of email deliverability.",
  },
  {
    q: "What is a BIMI record?",
    a: "BIMI (Brand Indicators for Message Identification) lets you display your brand logo next to your emails in supported email clients like Gmail and Apple Mail. It requires a DMARC policy set to quarantine or reject, plus a verified brand logo.",
  },
  {
    q: "Why is my score low even though I have SPF and DKIM?",
    a: "A low score could mean your policies aren't strict enough (e.g., SPF with ~all instead of -all, DMARC with p=none), you're missing records like DMARC or BIMI, or your domain doesn't have a website (A record). Each factor contributes to your overall reputation.",
  },
  {
    q: "How often should I check my domain reputation?",
    a: "Check after any DNS changes and at least monthly during active campaigns. DNS misconfigurations can happen silently — a deleted SPF record or expired DKIM key can tank your deliverability overnight. ColdRelay monitors this continuously for you.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function DomainReputationCheckerPage() {
  const [domain, setDomain] = useState("");
  const [checks, setChecks] = useState<DnsCheck[]>([]);
  const [checking, setChecking] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const runCheck = async () => {
    const d = domain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!d) return;
    setChecking(true);
    setChecks([]);

    const results = await Promise.all([
      checkSPF(d),
      checkDKIM(d),
      checkDMARC(d),
      checkMX(d),
      checkA(d),
      checkBIMI(d),
    ]);

    setChecks(results);
    setChecking(false);
  };

  const score = checks.reduce((s, c) => s + c.points, 0);
  const maxScore = checks.reduce((s, c) => s + c.maxPoints, 0);
  const pct = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;

  const scoreColor =
    pct >= 80 ? "text-emerald-400" : pct >= 50 ? "text-yellow-400" : "text-red-400";
  const scoreBorder =
    pct >= 80 ? "border-emerald-500/20 bg-emerald-500/[0.06]" : pct >= 50 ? "border-yellow-500/20 bg-yellow-500/[0.06]" : "border-red-500/20 bg-red-500/[0.06]";
  const scoreLabel =
    pct >= 80 ? "Excellent" : pct >= 60 ? "Good" : pct >= 40 ? "Needs Work" : "Poor";

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
            name: "Domain Reputation Checker",
            url: "https://coldrelay.com/tools/domain-reputation-checker",
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
            Domain Reputation Checker
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            Check your domain&apos;s email authentication records and get a reputation score from 0-100.
            SPF, DKIM, DMARC, MX, A record, and BIMI — all in one check.
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
            <label className="block text-sm font-medium text-white/70 mb-2">
              Enter Your Domain
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runCheck()}
                placeholder="example.com"
                className="flex-1 rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all"
              />
              <button
                onClick={runCheck}
                disabled={checking || !domain.trim()}
                className="rounded-xl bg-[#4A73D5] hover:bg-[#5A83E5] disabled:opacity-40 disabled:cursor-not-allowed px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20 hover:shadow-[#4A73D5]/30 transition-all whitespace-nowrap"
              >
                {checking ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Checking…
                  </span>
                ) : (
                  "Check Reputation"
                )}
              </button>
            </div>
          </motion.div>

          {/* Results */}
          <AnimatePresence>
            {checks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8"
              >
                {/* Score */}
                <div className={`rounded-2xl border p-8 text-center mb-6 ${scoreBorder}`}>
                  <p className="text-xs text-white/40 uppercase tracking-wider mb-2">Reputation Score</p>
                  <p className={`text-6xl font-bold ${scoreColor}`}>{pct}</p>
                  <p className="text-sm text-white/50 mt-2">{scoreLabel} — {score}/{maxScore} points</p>
                </div>

                {/* Individual checks */}
                <div className="space-y-3">
                  {checks.map((check, i) => (
                    <motion.div
                      key={check.key}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.08 }}
                      className={`rounded-xl border p-5 ${
                        check.status === "pass"
                          ? "border-emerald-500/15 bg-emerald-500/[0.03]"
                          : check.status === "warn"
                            ? "border-yellow-500/15 bg-yellow-500/[0.03]"
                            : "border-red-500/15 bg-red-500/[0.03]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-white">{check.name}</span>
                            <span
                              className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full ${
                                check.status === "pass"
                                  ? "text-emerald-400 bg-emerald-500/10"
                                  : check.status === "warn"
                                    ? "text-yellow-400 bg-yellow-500/10"
                                    : "text-red-400 bg-red-500/10"
                              }`}
                            >
                              {check.status === "pass" ? "✓ Pass" : check.status === "warn" ? "⚠ Warning" : "✗ Missing"}
                            </span>
                          </div>
                          <p className="text-xs text-white/30 mt-1 break-all">{check.value}</p>
                        </div>
                        <span className="text-xs text-white/40 whitespace-nowrap">
                          {check.points}/{check.maxPoints} pts
                        </span>
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed mt-2">
                        {check.recommendation}
                      </p>
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
              ColdRelay Protects Your Domain Reputation
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              ColdRelay automatically configures SPF, DKIM, and DMARC for every domain. Continuous
              monitoring ensures your records stay valid and your reputation stays high.
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
