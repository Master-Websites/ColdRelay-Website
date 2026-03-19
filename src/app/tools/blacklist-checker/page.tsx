"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Blacklists to check                                                 */
/* ------------------------------------------------------------------ */

const BLACKLISTS = [
  { name: "Spamhaus ZEN", zone: "zen.spamhaus.org", description: "Industry-standard combined blocklist" },
  { name: "Spamhaus DBL", zone: "dbl.spamhaus.org", description: "Domain Block List" },
  { name: "Barracuda", zone: "b.barracudacentral.org", description: "Barracuda reputation blocklist" },
  { name: "SpamCop", zone: "bl.spamcop.net", description: "SpamCop blocking list" },
  { name: "SORBS", zone: "dnsbl.sorbs.net", description: "Spam and relay blocking" },
  { name: "UCEPROTECT L1", zone: "dnsbl-1.uceprotect.net", description: "Single IP blocking" },
  { name: "UCEPROTECT L2", zone: "dnsbl-2.uceprotect.net", description: "Network-level blocking" },
  { name: "Composite BL", zone: "cbl.abuseat.org", description: "Composite Blocking List" },
  { name: "PSBL", zone: "psbl.surriel.com", description: "Passive Spam Block List" },
  { name: "Mailspike", zone: "bl.mailspike.net", description: "Mailspike blocking list" },
  { name: "JustSpam", zone: "dnsbl.justspam.org", description: "JustSpam DNS blocklist" },
  { name: "Truncate", zone: "truncate.gbudb.net", description: "GBUdb truncate list" },
];

type CheckResult = {
  name: string;
  zone: string;
  description: string;
  status: "clean" | "listed" | "error" | "timeout";
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

/** Reverse an IP for DNSBL lookup (1.2.3.4 → 4.3.2.1) */
function reverseIP(ip: string): string {
  return ip.split(".").reverse().join(".");
}

function isIPv4(input: string): boolean {
  return /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(input);
}

/** Query dns.google for A record existence */
async function checkDNSBL(query: string, zone: string): Promise<"clean" | "listed" | "error" | "timeout"> {
  const lookup = isIPv4(query) ? `${reverseIP(query)}.${zone}` : `${query}.${zone}`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(
      `https://dns.google/resolve?name=${encodeURIComponent(lookup)}&type=A`,
      { signal: controller.signal }
    );
    clearTimeout(timer);
    if (!res.ok) return "error";
    const data = await res.json();
    // NXDOMAIN or no answers = clean; answers with 127.x.x.x = listed
    if (data.Answer && data.Answer.length > 0) {
      const hasListing = data.Answer.some(
        (a: { data?: string }) => a.data && a.data.startsWith("127.")
      );
      return hasListing ? "listed" : "clean";
    }
    return "clean";
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError") return "timeout";
    return "error";
  }
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "What is an email blacklist?",
    a: "An email blacklist (or blocklist/DNSBL) is a real-time database of IP addresses and domains that have been reported for sending spam. Email servers check these lists when receiving messages — if your IP or domain is listed, your emails may be blocked or sent to spam.",
  },
  {
    q: "How do I get removed from a blacklist?",
    a: "Each blacklist has its own delisting process. Most require you to submit a removal request and prove you've fixed the underlying issue (compromised server, poor list hygiene, etc.). Some lists automatically delist after a period of no spam activity. ColdRelay monitors blacklists 24/7 and handles delisting for your sending infrastructure.",
  },
  {
    q: "Why is my domain listed even if I haven't sent spam?",
    a: "Shared IP addresses (common with cheap hosting), inherited domain reputation, or DNS misconfigurations can cause false listings. This is why dedicated sending infrastructure with proper authentication (SPF, DKIM, DMARC) is critical for cold email.",
  },
  {
    q: "How often should I check my blacklist status?",
    a: "For active cold email campaigns, check at least weekly. Listings can happen at any time and the sooner you catch them, the less impact on your deliverability. ColdRelay automates this with continuous monitoring and instant alerts.",
  },
  {
    q: "Does this tool check all blacklists?",
    a: "This tool checks 12 of the most commonly used and impactful email blacklists. There are hundreds of smaller lists, but these cover the ones that major email providers (Gmail, Outlook, Yahoo) actually reference when filtering mail.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function BlacklistCheckerPage() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<CheckResult[]>([]);
  const [checking, setChecking] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const runCheck = async () => {
    const query = input.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!query) return;
    setChecking(true);
    setResults([]);

    const newResults: CheckResult[] = [];
    // Check all in parallel
    const promises = BLACKLISTS.map(async (bl) => {
      const status = await checkDNSBL(query, bl.zone);
      return { name: bl.name, zone: bl.zone, description: bl.description, status };
    });

    const settled = await Promise.all(promises);
    newResults.push(...settled);
    setResults(newResults);
    setChecking(false);
  };

  const listedCount = results.filter((r) => r.status === "listed").length;
  const cleanCount = results.filter((r) => r.status === "clean").length;

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
            name: "Email Blacklist Checker",
            url: "https://coldrelay.com/tools/blacklist-checker",
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
            Email Blacklist Checker
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            Check if your domain or IP address is listed on major email blocklists. Get instant
            results across {BLACKLISTS.length} DNSBLs used by Gmail, Outlook, and Yahoo.
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
              Enter a Domain or IP Address
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runCheck()}
                placeholder="example.com or 192.168.1.1"
                className="flex-1 rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all"
              />
              <button
                onClick={runCheck}
                disabled={checking || !input.trim()}
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
                  "Check Now"
                )}
              </button>
            </div>
          </motion.div>

          {/* Results */}
          <AnimatePresence>
            {results.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8"
              >
                {/* Summary */}
                <div className="flex gap-4 mb-6">
                  <div
                    className={`flex-1 rounded-xl border p-4 text-center ${
                      listedCount === 0
                        ? "border-emerald-500/20 bg-emerald-500/[0.06]"
                        : "border-red-500/20 bg-red-500/[0.06]"
                    }`}
                  >
                    <p className="text-xs text-white/40 mb-1">Status</p>
                    <p
                      className={`text-lg font-bold ${
                        listedCount === 0 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {listedCount === 0 ? "✓ All Clear" : `⚠ Listed on ${listedCount} blocklist${listedCount > 1 ? "s" : ""}`}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 text-center min-w-[100px]">
                    <p className="text-xs text-white/40 mb-1">Clean</p>
                    <p className="text-lg font-bold text-emerald-400">{cleanCount}/{BLACKLISTS.length}</p>
                  </div>
                </div>

                {/* Individual results */}
                <div className="space-y-2">
                  {results.map((result, i) => (
                    <motion.div
                      key={result.zone}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className={`rounded-xl border p-4 flex items-center justify-between gap-3 ${
                        result.status === "listed"
                          ? "border-red-500/20 bg-red-500/[0.04]"
                          : result.status === "clean"
                            ? "border-white/[0.06] bg-white/[0.02]"
                            : "border-yellow-500/20 bg-yellow-500/[0.04]"
                      }`}
                    >
                      <div>
                        <p className="text-sm font-medium text-white">{result.name}</p>
                        <p className="text-xs text-white/30">{result.description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        {result.status === "clean" && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full">
                            ✓ Clean
                          </span>
                        )}
                        {result.status === "listed" && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-red-400 bg-red-500/10 px-3 py-1.5 rounded-full">
                            ✗ Listed
                          </span>
                        )}
                        {result.status === "error" && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-400 bg-yellow-500/10 px-3 py-1.5 rounded-full">
                            ? Error
                          </span>
                        )}
                        {result.status === "timeout" && (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-yellow-400 bg-yellow-500/10 px-3 py-1.5 rounded-full">
                            ⏱ Timeout
                          </span>
                        )}
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
              ColdRelay Monitors Blocklists 24/7 For You
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              Don&apos;t wait until your emails bounce. ColdRelay continuously monitors your sending
              domains and IPs across all major blocklists, alerting you instantly if a listing is
              detected.
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
