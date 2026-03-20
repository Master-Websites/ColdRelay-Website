"use client";

import { useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  FAQ data                                                            */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "What is a DMARC record?",
    a: "DMARC (Domain-based Message Authentication, Reporting & Conformance) is a DNS TXT record that tells receiving mail servers how to handle emails that fail SPF and DKIM authentication. It also lets you receive reports about who is sending email on behalf of your domain.",
  },
  {
    q: "What DMARC policy should I use?",
    a: "Start with p=none to monitor without affecting delivery. Once you confirm all legitimate email passes SPF/DKIM, move to p=quarantine (sends failures to spam), then p=reject (blocks failures completely). For cold email, many senders use p=none or p=quarantine during warmup, then upgrade to p=reject.",
  },
  {
    q: "Do Google and Yahoo require DMARC?",
    a: "Yes. Since February 2024, Google and Yahoo require all bulk senders (5,000+ emails/day) to have a DMARC record. Even for lower-volume senders, having DMARC significantly improves deliverability and protects your domain from spoofing.",
  },
  {
    q: "What are DMARC aggregate reports (rua)?",
    a: "DMARC aggregate reports are XML files sent to the email address specified in your rua tag. They contain data about who sent email using your domain, whether it passed or failed authentication, and which IPs were used. These reports help you identify unauthorized senders and fix authentication issues.",
  },
  {
    q: "What is the difference between rua and ruf in DMARC?",
    a: "The rua tag specifies where to send aggregate reports (daily summaries of authentication results). The ruf tag specifies where to send forensic reports (individual failure details). Forensic reports contain more detail but are rarely sent by major providers due to privacy concerns. Most setups only need rua.",
  },
];

/* ------------------------------------------------------------------ */
/*  Policy descriptions                                                */
/* ------------------------------------------------------------------ */

const policyInfo: Record<string, { label: string; desc: string; color: string }> = {
  none: {
    label: "None (Monitor Only)",
    desc: "No action taken on failures. Best for initial setup — lets you collect reports first.",
    color: "text-yellow-400",
  },
  quarantine: {
    label: "Quarantine",
    desc: "Failed emails go to spam. Good middle ground while you verify all legitimate senders pass.",
    color: "text-orange-400",
  },
  reject: {
    label: "Reject",
    desc: "Failed emails are blocked entirely. Strongest protection against spoofing.",
    color: "text-green-400",
  },
};

/* ------------------------------------------------------------------ */
/*  DMARC tag descriptions                                             */
/* ------------------------------------------------------------------ */

const tagDescriptions: Record<string, string> = {
  "v=DMARC1": "Protocol version — always DMARC1",
  p: "Policy — what to do with emails that fail authentication",
  sp: "Subdomain policy — overrides main policy for subdomains",
  rua: "Aggregate report URI — where to send daily summary reports",
  ruf: "Forensic report URI — where to send individual failure reports",
  pct: "Percentage — what % of failing emails to apply the policy to",
  adkim: "DKIM alignment mode — strict (s) or relaxed (r)",
  aspf: "SPF alignment mode — strict (s) or relaxed (r)",
  fo: "Failure reporting options — when to generate forensic reports",
};

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function DMARCGeneratorPage() {
  const [domain, setDomain] = useState("");
  const [policy, setPolicy] = useState<"none" | "quarantine" | "reject">("none");
  const [reportEmail, setReportEmail] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [subdomainPolicy, setSubdomainPolicy] = useState<"" | "none" | "quarantine" | "reject">("");
  const [percentage, setPercentage] = useState("100");
  const [enableForensic, setEnableForensic] = useState(false);
  const [forensicEmail, setForensicEmail] = useState("");
  const [adkim, setAdkim] = useState<"r" | "s">("r");
  const [aspf, setAspf] = useState<"r" | "s">("r");
  const [failureOption, setFailureOption] = useState<"0" | "1" | "d" | "s">("0");
  const [copied, setCopied] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  /* Build the DMARC record */
  const buildRecord = (): string | null => {
    if (!domain.trim()) return null;

    const parts: string[] = ["v=DMARC1"];

    parts.push(`p=${policy}`);

    if (subdomainPolicy) {
      parts.push(`sp=${subdomainPolicy}`);
    }

    if (reportEmail.trim()) {
      parts.push(`rua=mailto:${reportEmail.trim()}`);
    }

    if (enableForensic && forensicEmail.trim()) {
      parts.push(`ruf=mailto:${forensicEmail.trim()}`);
    }

    if (percentage !== "100" && percentage.trim()) {
      const pct = parseInt(percentage, 10);
      if (pct >= 0 && pct <= 100) {
        parts.push(`pct=${pct}`);
      }
    }

    if (adkim === "s") {
      parts.push("adkim=s");
    }

    if (aspf === "s") {
      parts.push("aspf=s");
    }

    if (enableForensic && failureOption !== "0") {
      parts.push(`fo=${failureOption}`);
    }

    return parts.join("; ");
  };

  const record = buildRecord();

  /* Parse tags for explanation */
  const parseTags = (): { tag: string; value: string; desc: string }[] => {
    if (!record) return [];
    return record.split("; ").map((part) => {
      const [tag, ...rest] = part.split("=");
      const value = rest.join("=");
      const desc = tagDescriptions[tag] || "";
      return { tag, value: value || tag, desc };
    });
  };

  const tags = parseTags();

  const copyToClipboard = () => {
    if (!record) return;
    navigator.clipboard.writeText(record);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
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
            DMARC Record Generator
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            Generate a complete DMARC TXT record for your domain. Configure your policy, reporting,
            and advanced options — then copy the record to your DNS.
          </p>
        </div>
      </section>

      {/* Generator */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8">
            {/* Domain input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-2">Your Domain</label>
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="example.com"
                className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all"
              />
            </div>

            {/* Policy selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-3">DMARC Policy</label>
              <div className="space-y-2">
                {(["none", "quarantine", "reject"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPolicy(p)}
                    className={`w-full rounded-xl border px-4 py-3 text-left transition-all ${
                      policy === p
                        ? "border-[#4A73D5]/50 bg-[#4A73D5]/10"
                        : "border-white/[0.08] bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <span className={`text-sm font-semibold ${policy === p ? "text-[#6B8FE6]" : "text-white/70"}`}>
                      {policyInfo[p].label}
                    </span>
                    <p className="text-xs text-white/40 mt-0.5">{policyInfo[p].desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Reporting email */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-2">
                Aggregate Report Email (rua)
              </label>
              <input
                type="email"
                value={reportEmail}
                onChange={(e) => setReportEmail(e.target.value)}
                placeholder="dmarc-reports@example.com"
                className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all"
              />
              <p className="text-xs text-white/30 mt-1">
                Receive daily reports about email authentication results for your domain
              </p>
            </div>

            {/* Advanced toggle */}
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-2 text-sm text-[#6B8FE6]/70 hover:text-[#6B8FE6] transition-colors mb-6"
            >
              <svg
                className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-90" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
              Advanced Options
            </button>

            {showAdvanced && (
              <div className="space-y-6 mb-6 pl-4 border-l-2 border-white/[0.06]">
                {/* Subdomain policy */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Subdomain Policy (sp)
                  </label>
                  <select
                    value={subdomainPolicy}
                    onChange={(e) => setSubdomainPolicy(e.target.value as "" | "none" | "quarantine" | "reject")}
                    className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all"
                  >
                    <option value="" className="bg-[#1a1a1a]">Same as main policy (default)</option>
                    <option value="none" className="bg-[#1a1a1a]">None (monitor)</option>
                    <option value="quarantine" className="bg-[#1a1a1a]">Quarantine</option>
                    <option value="reject" className="bg-[#1a1a1a]">Reject</option>
                  </select>
                </div>

                {/* Percentage */}
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    Policy Percentage (pct) — <span className="font-mono text-[#6B8FE6]">{percentage}%</span>
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                    className="w-full accent-[#4A73D5]"
                  />
                  <div className="flex justify-between text-xs text-white/30 mt-1">
                    <span>0%</span>
                    <span>100% (default)</span>
                  </div>
                  <p className="text-xs text-white/30 mt-1">
                    Gradually roll out your policy by applying it to a percentage of failing emails
                  </p>
                </div>

                {/* Alignment */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">DKIM Alignment</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setAdkim("r")}
                        className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                          adkim === "r"
                            ? "border-[#4A73D5]/50 bg-[#4A73D5]/10 text-[#6B8FE6]"
                            : "border-white/[0.08] bg-white/[0.02] text-white/60"
                        }`}
                      >
                        Relaxed
                      </button>
                      <button
                        onClick={() => setAdkim("s")}
                        className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                          adkim === "s"
                            ? "border-[#4A73D5]/50 bg-[#4A73D5]/10 text-[#6B8FE6]"
                            : "border-white/[0.08] bg-white/[0.02] text-white/60"
                        }`}
                      >
                        Strict
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">SPF Alignment</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setAspf("r")}
                        className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                          aspf === "r"
                            ? "border-[#4A73D5]/50 bg-[#4A73D5]/10 text-[#6B8FE6]"
                            : "border-white/[0.08] bg-white/[0.02] text-white/60"
                        }`}
                      >
                        Relaxed
                      </button>
                      <button
                        onClick={() => setAspf("s")}
                        className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                          aspf === "s"
                            ? "border-[#4A73D5]/50 bg-[#4A73D5]/10 text-[#6B8FE6]"
                            : "border-white/[0.08] bg-white/[0.02] text-white/60"
                        }`}
                      >
                        Strict
                      </button>
                    </div>
                  </div>
                </div>

                {/* Forensic reports */}
                <div>
                  <label className="flex items-center gap-2 cursor-pointer mb-2">
                    <input
                      type="checkbox"
                      checked={enableForensic}
                      onChange={(e) => setEnableForensic(e.target.checked)}
                      className="rounded border-white/20 bg-white/[0.06] text-[#4A73D5] focus:ring-[#4A73D5]/40"
                    />
                    <span className="text-sm text-white/60">Enable forensic reports (ruf)</span>
                  </label>
                  {enableForensic && (
                    <>
                      <input
                        type="email"
                        value={forensicEmail}
                        onChange={(e) => setForensicEmail(e.target.value)}
                        placeholder="dmarc-forensic@example.com"
                        className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all mb-2"
                      />
                      <div className="mt-2">
                        <label className="block text-xs text-white/50 mb-1">Failure reporting (fo)</label>
                        <select
                          value={failureOption}
                          onChange={(e) => setFailureOption(e.target.value as "0" | "1" | "d" | "s")}
                          className="w-full rounded-lg bg-white/[0.06] border border-white/[0.1] px-3 py-2 text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 transition-all"
                        >
                          <option value="0" className="bg-[#1a1a1a]">0 — Generate report if all checks fail (default)</option>
                          <option value="1" className="bg-[#1a1a1a]">1 — Generate report if any check fails</option>
                          <option value="d" className="bg-[#1a1a1a]">d — Generate report if DKIM fails</option>
                          <option value="s" className="bg-[#1a1a1a]">s — Generate report if SPF fails</option>
                        </select>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Generated record */}
            {record && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Your DMARC Record
                </label>
                <div className="rounded-xl bg-[#0a0a0a] border border-white/[0.1] p-4 relative">
                  <div className="mb-3">
                    <p className="text-xs text-white/40 mb-1 font-medium">DNS Record Type</p>
                    <p className="text-sm text-white font-mono">TXT</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs text-white/40 mb-1 font-medium">Host / Name</p>
                    <p className="text-sm text-white font-mono">_dmarc{domain.trim() ? `.${domain.trim()}` : ""}</p>
                  </div>
                  <div className="mb-4">
                    <p className="text-xs text-white/40 mb-1 font-medium">Value</p>
                    <code className="block text-sm text-[#6B8FE6] font-mono break-all leading-relaxed">
                      {record}
                    </code>
                  </div>
                  <button
                    onClick={copyToClipboard}
                    className="absolute top-3 right-3 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white transition-all"
                  >
                    {copied ? "Copied ✓" : "Copy"}
                  </button>

                  {/* Tag breakdown */}
                  {tags.length > 0 && (
                    <div className="border-t border-white/[0.06] pt-3 mt-1">
                      <p className="text-xs text-white/40 mb-2 font-medium">Record Breakdown</p>
                      <div className="space-y-1.5">
                        {tags.map((t, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs">
                            <code className="text-[#6B8FE6]/70 font-mono whitespace-nowrap flex-shrink-0">
                              {t.tag}={t.value}
                            </code>
                            {t.desc && (
                              <span className="text-white/30">— {t.desc}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Explanation */}
      <section className="py-16 sm:py-24 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is DMARC and Why Do You Need It?
          </h2>
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <p>
              <strong className="text-white/80">DMARC (Domain-based Message Authentication, Reporting & Conformance)</strong> is the final piece of the email authentication puzzle. While SPF specifies who can send email and DKIM verifies the email hasn&apos;t been tampered with, DMARC tells receiving servers what to do when those checks fail.
            </p>
            <p>
              Without DMARC, even if you have perfect SPF and DKIM records, receiving servers have no instructions on how to handle authentication failures. This means spoofers can still send emails pretending to be from your domain, and receiving servers may not act on it.
            </p>
            <h3 className="text-lg font-semibold text-white pt-4">DMARC Policies Explained</h3>
            <ul className="space-y-3 text-white/50">
              <li>
                <code className="text-[#6B8FE6]/80 bg-white/[0.04] px-1.5 py-0.5 rounded">p=none</code>
                <span className="ml-2">Monitor mode. No action taken on failures — you just receive reports. Start here.</span>
              </li>
              <li>
                <code className="text-[#6B8FE6]/80 bg-white/[0.04] px-1.5 py-0.5 rounded">p=quarantine</code>
                <span className="ml-2">Emails that fail are sent to spam/junk. A good middle step.</span>
              </li>
              <li>
                <code className="text-[#6B8FE6]/80 bg-white/[0.04] px-1.5 py-0.5 rounded">p=reject</code>
                <span className="ml-2">Emails that fail are blocked entirely. Maximum protection against spoofing.</span>
              </li>
            </ul>
            <h3 className="text-lg font-semibold text-white pt-4">Google &amp; Yahoo DMARC Requirements</h3>
            <p>
              Since February 2024, Google and Yahoo require all bulk email senders to have a published DMARC record. While the minimum requirement is <code className="text-[#6B8FE6]/80 bg-white/[0.04] px-1 rounded">p=none</code>, having any DMARC record is now mandatory for reliable email delivery. This applies to anyone sending more than 5,000 emails per day to Gmail or Yahoo users.
            </p>
            <h3 className="text-lg font-semibold text-white pt-4">Recommended DMARC Rollout</h3>
            <ol className="list-decimal list-inside space-y-2 text-white/50">
              <li>Start with <code className="text-[#6B8FE6]/80 bg-white/[0.04] px-1 rounded">p=none</code> and a reporting email to collect data</li>
              <li>Review aggregate reports for 2-4 weeks to identify all legitimate senders</li>
              <li>Fix any SPF/DKIM issues found in the reports</li>
              <li>Move to <code className="text-[#6B8FE6]/80 bg-white/[0.04] px-1 rounded">p=quarantine; pct=10</code> and gradually increase the percentage</li>
              <li>Once confident, move to <code className="text-[#6B8FE6]/80 bg-white/[0.04] px-1 rounded">p=reject</code> for full protection</li>
            </ol>
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
              Automate Your Email Authentication
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              ColdRelay configures DMARC, SPF, DKIM, and MX records automatically for every domain
              you set up. Real-time monitoring, dedicated IPs, and 99% inbox placement — starting at $50/month.
            </p>
            <a
              href="https://app.coldrelay.com/auth/register"
              className="inline-flex items-center gap-2 rounded-full bg-[#4A73D5] hover:bg-[#5A83E5] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20 hover:shadow-[#4A73D5]/30 hover:brightness-110 transition-all uppercase tracking-wide"
            >
              Start for $50/month →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
