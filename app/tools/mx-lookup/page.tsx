"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type MXRecord = {
  priority: number;
  server: string;
  provider?: string;
};

/* ------------------------------------------------------------------ */
/*  Known provider detection                                            */
/* ------------------------------------------------------------------ */

function detectProvider(server: string): string | undefined {
  const s = server.toLowerCase();
  if (s.includes("google") || s.includes("gmail") || s.includes("aspmx")) return "Google Workspace";
  if (s.includes("outlook") || s.includes("microsoft") || s.includes("protection.outlook")) return "Microsoft 365";
  if (s.includes("zoho")) return "Zoho Mail";
  if (s.includes("protonmail") || s.includes("proton")) return "ProtonMail";
  if (s.includes("mimecast")) return "Mimecast";
  if (s.includes("barracuda")) return "Barracuda";
  if (s.includes("pphosted") || s.includes("proofpoint")) return "Proofpoint";
  if (s.includes("securemx") || s.includes("forcepoint")) return "Forcepoint";
  if (s.includes("messagelabs") || s.includes("symantec")) return "Symantec/Broadcom";
  if (s.includes("fastmail")) return "Fastmail";
  if (s.includes("yandex")) return "Yandex Mail";
  if (s.includes("secureserver") || s.includes("godaddy")) return "GoDaddy";
  if (s.includes("amazonaws") || s.includes("ses")) return "Amazon SES";
  if (s.includes("sendgrid")) return "SendGrid";
  if (s.includes("mailgun")) return "Mailgun";
  return undefined;
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "What are MX records?",
    a: "MX (Mail Exchange) records are DNS entries that specify which mail servers are responsible for receiving email on behalf of a domain. When someone sends an email to user@example.com, their email server looks up the MX records for example.com to find where to deliver the message.",
  },
  {
    q: "What does MX priority mean?",
    a: "MX priority (also called preference) is a number that determines the order in which mail servers should be tried. Lower numbers have higher priority. If the primary server (lowest priority number) is unavailable, email is routed to the next server with a higher number. This provides redundancy.",
  },
  {
    q: "Why do some domains have multiple MX records?",
    a: "Multiple MX records provide failover and load distribution. If the primary mail server is down, sending servers will try the backup servers in order of priority. Large organizations often use multiple MX records for redundancy and reliability.",
  },
  {
    q: "How do MX records affect cold email deliverability?",
    a: "MX records themselves don't directly affect sending deliverability, but they're part of your overall DNS health. For cold email, what matters most is that your sending domains have proper SPF, DKIM, and DMARC records — which ColdRelay configures automatically.",
  },
  {
    q: "Can I see what email provider a domain uses?",
    a: "Yes! MX records reveal the email provider. For example, if MX records point to google.com servers, the domain uses Google Workspace. This tool automatically detects common providers including Google, Microsoft, Zoho, ProtonMail, and more.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function MXLookupPage() {
  const [domain, setDomain] = useState("");
  const [records, setRecords] = useState<MXRecord[]>([]);
  const [looking, setLooking] = useState(false);
  const [error, setError] = useState("");
  const [queriedDomain, setQueriedDomain] = useState("");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const doLookup = async () => {
    const d = domain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!d) return;
    setLooking(true);
    setRecords([]);
    setError("");
    setQueriedDomain(d);

    try {
      const res = await fetch(
        `https://dns.google/resolve?name=${encodeURIComponent(d)}&type=MX`
      );
      if (!res.ok) {
        setError("DNS lookup failed. Please check the domain and try again.");
        setLooking(false);
        return;
      }
      const data = await res.json();

      if (!data.Answer || data.Answer.length === 0) {
        setError(`No MX records found for ${d}. This domain may not be configured to receive email.`);
        setLooking(false);
        return;
      }

      const mxRecords: MXRecord[] = data.Answer
        .filter((a: { type: number }) => a.type === 15) // MX type
        .map((a: { data: string }) => {
          const parts = a.data.trim().split(/\s+/);
          const priority = parseInt(parts[0], 10);
          const server = parts[1]?.replace(/\.$/, "") || "";
          return { priority, server, provider: detectProvider(server) };
        })
        .sort((a: MXRecord, b: MXRecord) => a.priority - b.priority);

      if (mxRecords.length === 0) {
        setError(`No MX records found for ${d}. The DNS response contained no mail exchange entries.`);
      } else {
        setRecords(mxRecords);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    }
    setLooking(false);
  };

  const detectedProvider = records.length > 0 ? records[0].provider : undefined;

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
            name: "MX Record Lookup",
            url: "https://coldrelay.com/tools/mx-lookup",
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
            MX Record Lookup
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            Look up MX (Mail Exchange) records for any domain. See which mail servers handle email
            delivery, their priorities, and detect the email provider.
          </p>
        </div>
      </section>

      {/* Lookup */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8"
          >
            <label className="block text-sm font-medium text-white/70 mb-2">
              Enter a Domain
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && doLookup()}
                placeholder="example.com"
                className="flex-1 rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all"
              />
              <button
                onClick={doLookup}
                disabled={looking || !domain.trim()}
                className="rounded-xl bg-[#4A73D5] hover:bg-[#5A83E5] disabled:opacity-40 disabled:cursor-not-allowed px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20 hover:shadow-[#4A73D5]/30 transition-all whitespace-nowrap"
              >
                {looking ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Looking up…
                  </span>
                ) : (
                  "Lookup MX"
                )}
              </button>
            </div>
          </motion.div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 rounded-xl border border-yellow-500/20 bg-yellow-500/[0.06] p-5 text-center"
            >
              <p className="text-sm text-yellow-400">{error}</p>
            </motion.div>
          )}

          {/* Results */}
          <AnimatePresence>
            {records.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8"
              >
                {/* Domain & provider */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                    <p className="text-xs text-white/40 mb-1">Domain</p>
                    <p className="text-lg font-bold text-white">{queriedDomain}</p>
                  </div>
                  <div className="flex-1 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">
                    <p className="text-xs text-white/40 mb-1">Email Provider</p>
                    <p className="text-lg font-bold text-[#6B8FE6]">
                      {detectedProvider || "Unknown / Custom"}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 min-w-[100px]">
                    <p className="text-xs text-white/40 mb-1">Records</p>
                    <p className="text-lg font-bold text-white">{records.length}</p>
                  </div>
                </div>

                {/* MX records table */}
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
                  <div className="grid grid-cols-[80px_1fr_auto] gap-4 px-5 py-3 border-b border-white/[0.06] text-xs text-white/40 uppercase tracking-wider">
                    <span>Priority</span>
                    <span>Mail Server</span>
                    <span>Provider</span>
                  </div>
                  {records.map((record, i) => (
                    <motion.div
                      key={record.server}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.06 }}
                      className={`grid grid-cols-[80px_1fr_auto] gap-4 px-5 py-4 items-center ${
                        i < records.length - 1 ? "border-b border-white/[0.04]" : ""
                      }`}
                    >
                      <span
                        className={`inline-flex items-center justify-center w-10 h-10 rounded-lg text-sm font-bold ${
                          i === 0
                            ? "bg-[#4A73D5]/20 text-[#6B8FE6]"
                            : "bg-white/[0.04] text-white/50"
                        }`}
                      >
                        {record.priority}
                      </span>
                      <span className="text-sm text-white font-mono break-all">{record.server}</span>
                      <span className="text-xs text-white/40">{record.provider || "—"}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Explanation */}
                <div className="mt-6 rounded-xl bg-white/[0.02] border border-white/[0.06] p-5">
                  <h3 className="text-sm font-semibold text-white mb-2">How to Read This</h3>
                  <ul className="space-y-2 text-sm text-white/50">
                    <li className="flex gap-2">
                      <span className="text-[#6B8FE6] font-bold">→</span>
                      <span>
                        <strong className="text-white/70">Priority {records[0]?.priority}</strong> is the
                        primary mail server. Email is delivered here first.
                      </span>
                    </li>
                    {records.length > 1 && (
                      <li className="flex gap-2">
                        <span className="text-[#6B8FE6] font-bold">→</span>
                        <span>
                          Higher priority numbers ({records.slice(1).map((r) => r.priority).join(", ")})
                          are backup servers used when the primary is unavailable.
                        </span>
                      </li>
                    )}
                    <li className="flex gap-2">
                      <span className="text-[#6B8FE6] font-bold">→</span>
                      <span>
                        {detectedProvider
                          ? `This domain uses ${detectedProvider} for email hosting.`
                          : "This domain uses a custom or less common email provider."}
                      </span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* What are MX records */}
      <section className="py-16 sm:py-24 border-t border-white/[0.06]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Are MX Records?
          </h2>
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <p>
              MX (Mail Exchange) records are a type of DNS record that tells the internet which mail
              servers are responsible for receiving email for a domain. Without MX records, a domain
              cannot receive email.
            </p>
            <p>
              When you send an email to <strong className="text-white/80">user@example.com</strong>,
              your email server performs a DNS lookup for MX records on{" "}
              <strong className="text-white/80">example.com</strong>. The DNS response lists one or
              more mail servers with priority values. Your server connects to the highest-priority
              (lowest number) server and delivers the message.
            </p>
            <p>
              For cold email, proper DNS configuration is critical. Your sending domains need
              correctly configured MX records along with SPF, DKIM, and DMARC records for optimal
              deliverability. ColdRelay handles all of this automatically when you create mailboxes.
            </p>
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
              Let ColdRelay Handle Your DNS
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              MX records, SPF, DKIM, DMARC — ColdRelay configures everything automatically when you
              create mailboxes. Focus on your outreach while we handle the infrastructure.
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
