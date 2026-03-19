"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import Head from "next/head";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type CheckStatus = "pass" | "warn" | "fail" | "loading" | "idle";

interface CheckResult {
  id: string;
  label: string;
  status: CheckStatus;
  summary: string;
  details: string;
  score: number; // 0-20 per check (5 checks = 100 max)
}

/* ------------------------------------------------------------------ */
/*  DNS Google API helper                                              */
/* ------------------------------------------------------------------ */

interface DnsAnswer {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

interface DnsResponse {
  Status: number;
  Answer?: DnsAnswer[];
}

async function dnsLookup(domain: string, type: string): Promise<DnsResponse> {
  const res = await fetch(
    `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`,
    { headers: { Accept: "application/dns-json" } }
  );
  if (!res.ok) throw new Error(`DNS lookup failed: ${res.status}`);
  return res.json();
}

/* ------------------------------------------------------------------ */
/*  Check logic                                                        */
/* ------------------------------------------------------------------ */

function extractDomain(input: string): string {
  let s = input.trim().toLowerCase();
  // If it looks like an email, take the domain part
  if (s.includes("@")) {
    s = s.split("@").pop() || s;
  }
  // Strip protocol
  s = s.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  return s;
}

async function checkSPF(domain: string): Promise<CheckResult> {
  const base: CheckResult = {
    id: "spf",
    label: "SPF Record",
    status: "fail",
    summary: "",
    details: "",
    score: 0,
  };
  try {
    const data = await dnsLookup(domain, "TXT");
    const txtRecords = (data.Answer || []).map((a) => a.data.replace(/"/g, ""));
    const spf = txtRecords.find((r) => r.startsWith("v=spf1"));
    if (!spf) {
      base.summary = "No SPF record found";
      base.details =
        "Your domain has no SPF record. This means receiving servers can't verify which mail servers are authorized to send on your behalf. Most providers will mark your email as suspicious.";
      return base;
    }
    // Check for ~all (soft fail) vs -all (hard fail) vs ?all (neutral)
    if (spf.includes("-all")) {
      base.status = "pass";
      base.summary = "SPF record configured with strict policy (-all)";
      base.details = `Record: ${spf}`;
      base.score = 20;
    } else if (spf.includes("~all")) {
      base.status = "pass";
      base.summary = "SPF record found with soft fail (~all)";
      base.details = `Record: ${spf}. Consider using -all for stricter enforcement.`;
      base.score = 16;
    } else if (spf.includes("+all")) {
      base.status = "warn";
      base.summary = "SPF record allows all senders (+all)";
      base.details = `Record: ${spf}. +all allows anyone to send on your behalf — this is dangerous and hurts deliverability.`;
      base.score = 5;
    } else {
      base.status = "warn";
      base.summary = "SPF record found but policy is weak";
      base.details = `Record: ${spf}`;
      base.score = 12;
    }
  } catch {
    base.summary = "Could not query SPF records";
    base.details = "DNS lookup failed. The domain may not exist or DNS is unreachable.";
  }
  return base;
}

async function checkDKIM(domain: string): Promise<CheckResult> {
  const base: CheckResult = {
    id: "dkim",
    label: "DKIM Configuration",
    status: "fail",
    summary: "",
    details: "",
    score: 0,
  };
  // Common DKIM selectors to probe
  const selectors = ["default", "google", "selector1", "selector2", "dkim", "mail", "k1", "s1", "s2"];
  try {
    let found = false;
    let foundSelector = "";
    for (const sel of selectors) {
      const data = await dnsLookup(`${sel}._domainkey.${domain}`, "TXT");
      const records = (data.Answer || []).map((a) => a.data.replace(/"/g, ""));
      const dkimRec = records.find((r) => r.includes("v=DKIM1") || r.includes("p="));
      if (dkimRec) {
        found = true;
        foundSelector = sel;
        base.details = `Selector: ${sel} — ${dkimRec.slice(0, 120)}${dkimRec.length > 120 ? "…" : ""}`;
        break;
      }
      // Check for CNAME (common with Google Workspace, Microsoft 365)
      const cnameData = await dnsLookup(`${sel}._domainkey.${domain}`, "CNAME");
      if (cnameData.Answer && cnameData.Answer.length > 0) {
        found = true;
        foundSelector = sel;
        base.details = `Selector: ${sel} — CNAME → ${cnameData.Answer[0].data}`;
        break;
      }
    }
    if (found) {
      base.status = "pass";
      base.summary = `DKIM record found (selector: ${foundSelector})`;
      base.score = 20;
    } else {
      base.status = "warn";
      base.summary = "No DKIM record found for common selectors";
      base.details =
        "Checked common selectors (default, google, selector1, selector2, dkim, mail, k1, s1, s2). DKIM may use a custom selector we didn't probe.";
      base.score = 5;
    }
  } catch {
    base.summary = "Could not query DKIM records";
    base.details = "DNS lookup failed.";
  }
  return base;
}

async function checkDMARC(domain: string): Promise<CheckResult> {
  const base: CheckResult = {
    id: "dmarc",
    label: "DMARC Policy",
    status: "fail",
    summary: "",
    details: "",
    score: 0,
  };
  try {
    const data = await dnsLookup(`_dmarc.${domain}`, "TXT");
    const records = (data.Answer || []).map((a) => a.data.replace(/"/g, ""));
    const dmarc = records.find((r) => r.startsWith("v=DMARC1"));
    if (!dmarc) {
      base.summary = "No DMARC record found";
      base.details =
        "Without DMARC, mailbox providers can't enforce SPF/DKIM alignment. This significantly hurts trust and deliverability.";
      return base;
    }
    const policyMatch = dmarc.match(/;\s*p=(\w+)/);
    const policy = policyMatch ? policyMatch[1] : "none";
    if (policy === "reject") {
      base.status = "pass";
      base.summary = "DMARC set to reject — strongest policy";
      base.score = 20;
    } else if (policy === "quarantine") {
      base.status = "pass";
      base.summary = "DMARC set to quarantine";
      base.score = 17;
    } else {
      base.status = "warn";
      base.summary = "DMARC set to none — monitoring only";
      base.score = 10;
    }
    base.details = `Record: ${dmarc}`;
  } catch {
    base.summary = "Could not query DMARC records";
    base.details = "DNS lookup failed.";
  }
  return base;
}

async function checkMX(domain: string): Promise<CheckResult> {
  const base: CheckResult = {
    id: "mx",
    label: "MX Records",
    status: "fail",
    summary: "",
    details: "",
    score: 0,
  };
  try {
    const data = await dnsLookup(domain, "MX");
    const mxRecords = (data.Answer || []).filter((a) => a.type === 15);
    if (mxRecords.length === 0) {
      base.summary = "No MX records found";
      base.details =
        "Your domain has no mail exchange records. Emails cannot be received, and many providers penalize domains that can't receive mail.";
      return base;
    }
    const mxList = mxRecords.map((r) => r.data).join(", ");
    if (mxRecords.length >= 2) {
      base.status = "pass";
      base.summary = `${mxRecords.length} MX records found (redundancy ✓)`;
      base.score = 20;
    } else {
      base.status = "pass";
      base.summary = "1 MX record found";
      base.score = 16;
    }
    base.details = `Records: ${mxList}`;
  } catch {
    base.summary = "Could not query MX records";
    base.details = "DNS lookup failed.";
  }
  return base;
}

async function checkBlocklistAndReputation(domain: string): Promise<CheckResult> {
  const base: CheckResult = {
    id: "reputation",
    label: "Domain Reputation",
    status: "pass",
    summary: "",
    details: "",
    score: 0,
  };
  try {
    // Check if the domain resolves (A record exists)
    const aData = await dnsLookup(domain, "A");
    const hasA = (aData.Answer || []).length > 0;

    // Check for a BIMI record (brand indicators)
    const bimiData = await dnsLookup(`default._bimi.${domain}`, "TXT");
    const hasBimi = (bimiData.Answer || []).some((a) => a.data.includes("v=BIMI1"));

    // Check for MTA-STS
    const mtsData = await dnsLookup(`_mta-sts.${domain}`, "TXT");
    const hasMtaSts = (mtsData.Answer || []).some((a) => a.data.includes("v=STSv1"));

    let score = 10;
    const bonuses: string[] = [];

    if (hasA) {
      score += 4;
      bonuses.push("Domain resolves (A record ✓)");
    }
    if (hasBimi) {
      score += 3;
      bonuses.push("BIMI record found ✓");
    }
    if (hasMtaSts) {
      score += 3;
      bonuses.push("MTA-STS configured ✓");
    }

    if (score >= 17) {
      base.status = "pass";
      base.summary = "Domain reputation signals look strong";
    } else if (score >= 12) {
      base.status = "pass";
      base.summary = "Domain reputation is acceptable";
    } else {
      base.status = "warn";
      base.summary = "Limited reputation signals found";
    }
    base.score = Math.min(score, 20);
    base.details = bonuses.length > 0 ? bonuses.join(" · ") : "Basic domain presence verified.";
  } catch {
    base.status = "warn";
    base.summary = "Could not fully assess domain reputation";
    base.details = "Some checks failed. The domain may be very new or DNS is unreachable.";
    base.score = 8;
  }
  return base;
}

/* ------------------------------------------------------------------ */
/*  Score ring component                                                */
/* ------------------------------------------------------------------ */

function ScoreRing({ score, animate }: { score: number; animate: boolean }) {
  const [displayed, setDisplayed] = useState(0);
  const circumference = 2 * Math.PI * 54;

  useEffect(() => {
    if (!animate) return;
    let frame: number;
    const duration = 1500;
    const start = performance.now();
    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(score * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [score, animate]);

  const color =
    displayed >= 80
      ? "#22c55e"
      : displayed >= 60
        ? "#eab308"
        : displayed >= 40
          ? "#f97316"
          : "#ef4444";

  const offset = circumference - (circumference * displayed) / 100;

  return (
    <div className="relative w-44 h-44 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r="54"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
          fill="none"
        />
        <motion.circle
          cx="60"
          cy="60"
          r="54"
          stroke={color}
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animate ? offset : circumference}
          style={{
            transition: "stroke-dashoffset 1.5s cubic-bezier(0.25,0.4,0.25,1), stroke 0.5s",
            filter: `drop-shadow(0 0 8px ${color}40)`,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold tabular-nums" style={{ color }}>
          {displayed}
        </span>
        <span className="text-xs text-white/40 mt-1 font-medium tracking-wider uppercase">
          / 100
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Check card component                                                */
/* ------------------------------------------------------------------ */

const statusIcon: Record<CheckStatus, string> = {
  pass: "✅",
  warn: "⚠️",
  fail: "❌",
  loading: "⏳",
  idle: "⬜",
};

const statusColor: Record<CheckStatus, string> = {
  pass: "border-green-500/20 bg-green-500/[0.04]",
  warn: "border-yellow-500/20 bg-yellow-500/[0.04]",
  fail: "border-red-500/20 bg-red-500/[0.04]",
  loading: "border-white/10 bg-white/[0.02]",
  idle: "border-white/[0.06] bg-white/[0.02]",
};

function CheckCard({ result, index }: { result: CheckResult; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={`rounded-2xl border p-5 backdrop-blur-sm cursor-pointer transition-all hover:border-white/20 ${statusColor[result.status]}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-xl flex-shrink-0">{statusIcon[result.status]}</span>
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-white">{result.label}</h3>
            <p className="text-xs text-white/50 mt-0.5 truncate">{result.summary}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs font-mono text-white/40">{result.score}/20</span>
          <svg
            className={`w-4 h-4 text-white/30 transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>
      <AnimatePresence>
        {expanded && result.details && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-xs text-white/40 mt-3 pt-3 border-t border-white/[0.06] leading-relaxed break-all">
              {result.details}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ data                                                            */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "What does this email deliverability test check?",
    a: "Our free tool checks your domain's SPF, DKIM, and DMARC records using real DNS lookups via Google's public DNS API. It also validates MX records and checks additional reputation signals like BIMI and MTA-STS. Each check contributes to your overall deliverability score out of 100.",
  },
  {
    q: "Is this tool really free?",
    a: "Yes, 100% free with no signup required. We use Google's public DNS resolution API to perform real-time lookups on your domain's DNS records. There are no limits on how many domains you can test.",
  },
  {
    q: "What is a good email deliverability score?",
    a: "A score of 80-100 means your domain's email authentication is well configured. 60-79 is acceptable but has room for improvement. Below 60 indicates significant issues that are likely causing your emails to land in spam or be rejected.",
  },
  {
    q: "What is SPF and why does it matter?",
    a: "SPF (Sender Policy Framework) is a DNS TXT record that specifies which mail servers are authorized to send email for your domain. Without SPF, receiving servers have no way to verify legitimate senders, making your emails more likely to be flagged as spam.",
  },
  {
    q: "What is DKIM and how does it work?",
    a: "DKIM (DomainKeys Identified Mail) adds a digital signature to your outgoing emails. The receiving server verifies this signature against a public key published in your DNS records. This proves the email hasn't been tampered with in transit.",
  },
  {
    q: "What is DMARC and do I need it?",
    a: "DMARC (Domain-based Message Authentication, Reporting & Conformance) tells receiving servers what to do when SPF or DKIM checks fail. It's essential for protecting your domain from spoofing and improving inbox placement. Google and Yahoo now require DMARC for bulk senders.",
  },
  {
    q: "Why are MX records important for deliverability?",
    a: "MX (Mail Exchange) records specify which servers receive email for your domain. Even if you only send email, having valid MX records signals to other mail servers that your domain is legitimate and properly configured.",
  },
  {
    q: "How can ColdRelay help fix my deliverability?",
    a: "ColdRelay automatically configures SPF, DKIM, DMARC, and MX records for every domain you set up. We provide dedicated IPs, automatic DNS management, and real-time monitoring to maintain 99% inbox placement — no manual DNS configuration needed.",
  },
];

/* ------------------------------------------------------------------ */
/*  Main page component                                                */
/* ------------------------------------------------------------------ */

export default function EmailDeliverabilityTestPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<CheckResult[] | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [animateScore, setAnimateScore] = useState(false);
  const [testedDomain, setTestedDomain] = useState("");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const runTest = useCallback(async () => {
    const domain = extractDomain(input);
    if (!domain || !domain.includes(".")) return;

    setLoading(true);
    setResults(null);
    setTotalScore(0);
    setAnimateScore(false);
    setTestedDomain(domain);

    // Run all checks in parallel
    const [spf, dkim, dmarc, mx, reputation] = await Promise.all([
      checkSPF(domain),
      checkDKIM(domain),
      checkDMARC(domain),
      checkMX(domain),
      checkBlocklistAndReputation(domain),
    ]);

    const allResults = [spf, dkim, dmarc, mx, reputation];
    const score = allResults.reduce((sum, r) => sum + r.score, 0);

    setResults(allResults);
    setTotalScore(score);
    setLoading(false);

    // Trigger score animation after a brief pause
    setTimeout(() => {
      setAnimateScore(true);
      // Scroll to results
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, [input]);

  const scoreLabel =
    totalScore >= 80
      ? "Excellent"
      : totalScore >= 60
        ? "Good"
        : totalScore >= 40
          ? "Needs Work"
          : "Poor";

  const scoreDescription =
    totalScore >= 80
      ? "Your domain's email authentication is well configured. Most emails should reach the inbox."
      : totalScore >= 60
        ? "Your setup is decent but has gaps. Fixing the warnings below will improve inbox placement."
        : totalScore >= 40
          ? "Several issues detected. Your emails are likely landing in spam for many recipients."
          : "Critical issues found. Your emails are very likely being rejected or landing in spam.";

  return (
    <>
      {/* ── Hero / Input ── */}
      <section className="pt-16 sm:pt-24 pb-12 sm:pb-16 relative overflow-hidden">
        {/* Subtle gradient bg */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#4A73D5]/[0.06] rounded-full blur-[120px]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[#4A73D5]/20 bg-[#4A73D5]/10 px-3 py-1 mb-6">
              <span className="text-xs font-medium tracking-wide uppercase text-[#6B8FE6]">
                Free Tool
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight font-bold mb-5">
              Email Deliverability Test
            </h1>
            <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl mx-auto mb-10">
              Check your SPF, DKIM, DMARC, and MX records in seconds. Get a deliverability score
              and find out what&apos;s keeping your emails out of the inbox.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-lg mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") runTest();
                }}
                placeholder="Enter domain or email (e.g. example.com)"
                className="flex-1 rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all"
              />
              <button
                onClick={runTest}
                disabled={loading || !input.trim()}
                className="rounded-xl bg-[#4A73D5] hover:bg-[#5A83E5] disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20 hover:shadow-[#4A73D5]/30 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="opacity-25"
                      />
                      <path
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                        fill="currentColor"
                        className="opacity-75"
                      />
                    </svg>
                    Testing…
                  </>
                ) : (
                  "Test Deliverability"
                )}
              </button>
            </div>
            <p className="text-xs text-white/30 mt-3">
              No signup required · Uses real DNS lookups · 100% free
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Results ── */}
      <AnimatePresence>
        {results && (
          <motion.section
            ref={resultsRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="pb-16 sm:pb-24"
          >
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Score card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8 sm:p-10 mb-8 text-center"
              >
                <p className="text-sm text-white/40 mb-4 font-mono">{testedDomain}</p>
                <ScoreRing score={totalScore} animate={animateScore} />
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <h2 className="text-xl font-bold text-white mt-6">{scoreLabel}</h2>
                  <p className="text-sm text-white/50 mt-2 max-w-md mx-auto leading-relaxed">
                    {scoreDescription}
                  </p>
                </motion.div>
              </motion.div>

              {/* Individual checks */}
              <div className="space-y-3">
                {results.map((result, i) => (
                  <CheckCard key={result.id} result={result} index={i} />
                ))}
              </div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-10 rounded-2xl border border-[#4A73D5]/20 bg-[#4A73D5]/[0.04] p-8 sm:p-10 text-center"
              >
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                  Fix Your Deliverability with ColdRelay
                </h3>
                <p className="text-sm text-white/50 mb-6 max-w-lg mx-auto leading-relaxed">
                  Auto DNS configuration, dedicated IPs, and real-time monitoring. Stop landing in
                  spam — ColdRelay guarantees 99% inbox placement.
                </p>
                <a
                  href="https://app.coldrelay.com/auth/register"
                  className="inline-flex items-center gap-2 rounded-full bg-[#4A73D5] hover:bg-[#5A83E5] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20 hover:shadow-[#4A73D5]/30 transition-all"
                >
                  Get Started Free →
                </a>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── How It Works ── */}
      <section className="py-16 sm:py-24 border-t border-white/[0.06]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-12">
            How the Deliverability Test Works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "Enter Your Domain",
                desc: "Type any domain or email address. We extract the domain and start real-time DNS lookups.",
              },
              {
                icon: "⚡",
                title: "Real DNS Analysis",
                desc: "We query Google's public DNS for SPF, DKIM, DMARC, and MX records — no simulation, real data.",
              },
              {
                icon: "📊",
                title: "Get Your Score",
                desc: "Each check contributes to your score out of 100. See exactly what's configured and what's missing.",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#4A73D5]/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
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
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm text-white/50 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-16 sm:py-20 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#4A73D5]/20 bg-[#4A73D5]/[0.04] p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              Stop Guessing. Start Delivering.
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              ColdRelay automatically configures SPF, DKIM, DMARC, and MX records for every
              domain. Dedicated IPs, real-time monitoring, 99% inbox placement guaranteed.
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
