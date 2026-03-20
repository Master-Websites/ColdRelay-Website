"use client";

import { useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Provider presets                                                    */
/* ------------------------------------------------------------------ */

interface Provider {
  id: string;
  label: string;
  includes: string[];
  lookups: number;
}

const providers: Provider[] = [
  { id: "google", label: "Google Workspace", includes: ["include:_spf.google.com"], lookups: 3 },
  { id: "microsoft", label: "Microsoft 365", includes: ["include:spf.protection.outlook.com"], lookups: 2 },
  { id: "zoho", label: "Zoho Mail", includes: ["include:zoho.com"], lookups: 1 },
  { id: "sendgrid", label: "SendGrid", includes: ["include:sendgrid.net"], lookups: 1 },
  { id: "mailgun", label: "Mailgun", includes: ["include:mailgun.org"], lookups: 1 },
  { id: "amazonses", label: "Amazon SES", includes: ["include:amazonses.com"], lookups: 1 },
  { id: "custom", label: "Custom", includes: [], lookups: 0 },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                            */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "What is an SPF record?",
    a: "SPF (Sender Policy Framework) is a DNS TXT record that specifies which mail servers are authorized to send email on behalf of your domain. It helps receiving servers verify that incoming mail from your domain comes from a server you've approved, reducing spoofing and improving deliverability.",
  },
  {
    q: "How do I add an SPF record to my domain?",
    a: "Log in to your domain registrar or DNS hosting provider (like Cloudflare, GoDaddy, or Namecheap). Navigate to DNS settings, create a new TXT record with the host set to @ (or your domain), and paste the generated SPF value. Save and allow up to 48 hours for propagation.",
  },
  {
    q: "What does ~all vs -all mean in SPF?",
    a: "The ~all qualifier is a soft fail — it tells receivers that servers not listed may still send mail but should be treated with suspicion. The -all qualifier is a hard fail — it tells receivers to reject mail from unlisted servers. For cold email, ~all is generally recommended as it's less likely to cause delivery issues during warmup.",
  },
  {
    q: "Can I have multiple SPF records?",
    a: "No. You should only have one SPF record per domain. Having multiple SPF records causes authentication failures. If you use multiple email providers, combine all their include statements into a single SPF record. Our generator lets you add multiple providers to create one unified record.",
  },
  {
    q: "What is the SPF 10 DNS lookup limit?",
    a: "SPF records are limited to 10 DNS lookups (include, a, mx, ptr, exists, and redirect mechanisms all count). Exceeding this limit causes SPF to return a permanent error (permerror), which effectively means no SPF protection. Our generator warns you when you're approaching this limit.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function SPFGeneratorPage() {
  const [domain, setDomain] = useState("");
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [customInclude, setCustomInclude] = useState("");
  const [qualifier, setQualifier] = useState<"~all" | "-all">("~all");
  const [useIp4, setUseIp4] = useState(false);
  const [ip4, setIp4] = useState("");
  const [copied, setCopied] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const toggleProvider = (id: string) => {
    setSelectedProviders((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  /* Build the SPF record */
  const buildRecord = (): string | null => {
    if (!domain.trim()) return null;

    const parts: string[] = ["v=spf1"];

    selectedProviders.forEach((id) => {
      const prov = providers.find((p) => p.id === id);
      if (prov && prov.id !== "custom") {
        parts.push(...prov.includes);
      }
    });

    if (selectedProviders.includes("custom") && customInclude.trim()) {
      customInclude
        .split(/[\s,]+/)
        .filter(Boolean)
        .forEach((inc) => {
          if (!inc.startsWith("include:")) {
            parts.push(`include:${inc}`);
          } else {
            parts.push(inc);
          }
        });
    }

    if (useIp4 && ip4.trim()) {
      ip4
        .split(/[\s,]+/)
        .filter(Boolean)
        .forEach((ip) => {
          parts.push(`ip4:${ip}`);
        });
    }

    parts.push(qualifier);
    return parts.join(" ");
  };

  const record = buildRecord();

  const totalLookups = selectedProviders.reduce((sum, id) => {
    const prov = providers.find((p) => p.id === id);
    return sum + (prov?.lookups || 0);
  }, 0) + (selectedProviders.includes("custom") && customInclude.trim()
    ? customInclude.split(/[\s,]+/).filter(Boolean).length
    : 0);

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
            SPF Record Generator
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            Generate a valid SPF TXT record for your domain. Select your email provider, customize
            settings, and copy the record to your DNS.
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

            {/* Provider selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-3">
                Email Providers <span className="text-white/40 font-normal">(select all that apply)</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {providers.map((prov) => (
                  <button
                    key={prov.id}
                    onClick={() => toggleProvider(prov.id)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                      selectedProviders.includes(prov.id)
                        ? "border-[#4A73D5]/50 bg-[#4A73D5]/10 text-[#6B8FE6]"
                        : "border-white/[0.08] bg-white/[0.02] text-white/60 hover:border-white/20"
                    }`}
                  >
                    {prov.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom include */}
            {selectedProviders.includes("custom") && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Custom Include Domains
                </label>
                <input
                  type="text"
                  value={customInclude}
                  onChange={(e) => setCustomInclude(e.target.value)}
                  placeholder="mail.example.com, other.provider.com"
                  className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all"
                />
                <p className="text-xs text-white/30 mt-1">Separate multiple domains with commas</p>
              </div>
            )}

            {/* IP4 */}
            <div className="mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useIp4}
                  onChange={(e) => setUseIp4(e.target.checked)}
                  className="rounded border-white/20 bg-white/[0.06] text-[#4A73D5] focus:ring-[#4A73D5]/40"
                />
                <span className="text-sm text-white/60">Add IP addresses (ip4)</span>
              </label>
              {useIp4 && (
                <input
                  type="text"
                  value={ip4}
                  onChange={(e) => setIp4(e.target.value)}
                  placeholder="203.0.113.0/24, 198.51.100.5"
                  className="w-full mt-2 rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all"
                />
              )}
            </div>

            {/* Qualifier */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-2">Failure Policy</label>
              <div className="flex gap-3">
                <button
                  onClick={() => setQualifier("~all")}
                  className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                    qualifier === "~all"
                      ? "border-[#4A73D5]/50 bg-[#4A73D5]/10 text-[#6B8FE6]"
                      : "border-white/[0.08] bg-white/[0.02] text-white/60 hover:border-white/20"
                  }`}
                >
                  <span className="block font-semibold">~all</span>
                  <span className="block text-xs mt-0.5 opacity-60">Soft fail (recommended)</span>
                </button>
                <button
                  onClick={() => setQualifier("-all")}
                  className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                    qualifier === "-all"
                      ? "border-[#4A73D5]/50 bg-[#4A73D5]/10 text-[#6B8FE6]"
                      : "border-white/[0.08] bg-white/[0.02] text-white/60 hover:border-white/20"
                  }`}
                >
                  <span className="block font-semibold">-all</span>
                  <span className="block text-xs mt-0.5 opacity-60">Hard fail (strict)</span>
                </button>
              </div>
            </div>

            {/* Lookup warning */}
            {totalLookups > 0 && (
              <div className={`rounded-xl px-4 py-3 mb-6 text-xs ${
                totalLookups > 10
                  ? "bg-red-500/10 border border-red-500/20 text-red-400"
                  : totalLookups > 7
                    ? "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400"
                    : "bg-white/[0.03] border border-white/[0.06] text-white/50"
              }`}>
                DNS lookups: <span className="font-mono font-semibold">{totalLookups}/10</span>
                {totalLookups > 10 && " — Exceeds the SPF 10-lookup limit!"}
                {totalLookups > 7 && totalLookups <= 10 && " — Approaching the 10-lookup limit."}
              </div>
            )}

            {/* Generated record */}
            {record && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Your SPF Record
                </label>
                <div className="rounded-xl bg-[#0a0a0a] border border-white/[0.1] p-4 relative group">
                  <div className="mb-3">
                    <p className="text-xs text-white/40 mb-1 font-medium">DNS Record Type</p>
                    <p className="text-sm text-white font-mono">TXT</p>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs text-white/40 mb-1 font-medium">Host / Name</p>
                    <p className="text-sm text-white font-mono">@</p>
                  </div>
                  <div>
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
            What Is SPF and Why Does It Matter?
          </h2>
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <p>
              <strong className="text-white/80">SPF (Sender Policy Framework)</strong> is one of the three pillars of email authentication, alongside DKIM and DMARC. It&apos;s a DNS TXT record that tells receiving mail servers which IP addresses and servers are allowed to send email on behalf of your domain.
            </p>
            <p>
              When an email arrives at a recipient&apos;s server, the server checks the SPF record of the sending domain. If the sending server&apos;s IP matches one of the authorized sources listed in the SPF record, the email passes SPF authentication. If it doesn&apos;t match, the email may be rejected, quarantined, or flagged as spam — depending on your policy.
            </p>
            <p>
              For cold email senders, SPF is non-negotiable. Without a properly configured SPF record, your emails will consistently land in spam or be outright rejected. Google, Microsoft, and Yahoo all check SPF as part of their filtering algorithms.
            </p>
            <h3 className="text-lg font-semibold text-white pt-4">How SPF Works</h3>
            <ol className="list-decimal list-inside space-y-2 text-white/50">
              <li>You publish an SPF record in your domain&apos;s DNS (TXT record at @)</li>
              <li>The record lists authorized senders using <code className="text-[#6B8FE6]/80 bg-white/[0.04] px-1 rounded">include:</code>, <code className="text-[#6B8FE6]/80 bg-white/[0.04] px-1 rounded">ip4:</code>, and <code className="text-[#6B8FE6]/80 bg-white/[0.04] px-1 rounded">ip6:</code> mechanisms</li>
              <li>When someone receives an email from your domain, their server looks up your SPF record</li>
              <li>The server checks if the sending IP matches any authorized source</li>
              <li>Based on the qualifier (<code className="text-[#6B8FE6]/80 bg-white/[0.04] px-1 rounded">~all</code> or <code className="text-[#6B8FE6]/80 bg-white/[0.04] px-1 rounded">-all</code>), it decides what to do with unauthorized senders</li>
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
              Skip the Manual DNS Setup
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              ColdRelay sets up SPF, DKIM, DMARC, and MX records automatically for every domain.
              Dedicated IPs, real-time monitoring, and 99% inbox placement — starting at $50/month.
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
