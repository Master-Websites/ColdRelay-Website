"use client";

import { useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type DomainInfo = {
  domain: string;
  creationDate: string | null;
  ageDays: number | null;
  registrar: string | null;
  nameservers: string[];
  status: string[];
  error: string | null;
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                             */
/* ------------------------------------------------------------------ */

function cleanDomain(input: string): string {
  let d = input.trim().toLowerCase();
  d = d.replace(/^https?:\/\//, "").replace(/\/.*$/, "").replace(/^www\./, "");
  return d;
}

function formatAge(days: number): string {
  if (days < 1) return "Less than a day";
  if (days < 7) return `${days} day${days === 1 ? "" : "s"}`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return `${weeks} week${weeks === 1 ? "" : "s"}, ${days % 7} day${days % 7 === 1 ? "" : "s"}`;
  }
  if (days < 365) {
    const months = Math.floor(days / 30);
    return `${months} month${months === 1 ? "" : "s"}, ${days % 30} day${days % 30 === 1 ? "" : "s"}`;
  }
  const years = Math.floor(days / 365);
  const remaining = days % 365;
  const months = Math.floor(remaining / 30);
  return `${years} year${years === 1 ? "" : "s"}, ${months} month${months === 1 ? "" : "s"}`;
}

function ageVerdict(days: number | null): { label: string; color: string; desc: string } {
  if (days === null) return { label: "Unknown", color: "text-white/40", desc: "" };
  if (days < 7)
    return {
      label: "Too New",
      color: "text-red-400",
      desc: "This domain is less than a week old. Sending cold email from it will almost certainly go to spam.",
    };
  if (days < 14)
    return {
      label: "Very New",
      color: "text-orange-400",
      desc: "Under 2 weeks old. Most cold email experts recommend waiting at least 2 weeks before sending.",
    };
  if (days < 30)
    return {
      label: "New",
      color: "text-yellow-400",
      desc: "2–4 weeks old. You can start light warmup, but avoid high-volume sending yet.",
    };
  if (days < 90)
    return {
      label: "Warming Up",
      color: "text-[#6B8FE6]",
      desc: "1–3 months old. Good age for active warmup and gradually ramping up cold email volume.",
    };
  return {
    label: "Established",
    color: "text-emerald-400",
    desc: "3+ months old. This domain has sufficient age for cold email sending at normal volumes.",
  };
}

/* ------------------------------------------------------------------ */
/*  RDAP lookup                                                         */
/* ------------------------------------------------------------------ */

async function lookupDomain(domain: string): Promise<DomainInfo> {
  try {
    const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain)}`, {
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      return { domain, creationDate: null, ageDays: null, registrar: null, nameservers: [], status: [], error: `RDAP lookup failed (HTTP ${res.status}). The TLD may not support RDAP queries.` };
    }
    const data = await res.json();

    // Creation date
    let creationDate: string | null = null;
    if (data.events) {
      const reg = data.events.find((e: { eventAction: string }) => e.eventAction === "registration");
      if (reg) creationDate = reg.eventDate;
    }

    let ageDays: number | null = null;
    if (creationDate) {
      ageDays = Math.floor((Date.now() - new Date(creationDate).getTime()) / 86400000);
    }

    // Registrar
    let registrar: string | null = null;
    if (data.entities) {
      const regEntity = data.entities.find(
        (e: { roles?: string[] }) => e.roles && e.roles.includes("registrar")
      );
      if (regEntity) {
        registrar =
          regEntity.vcardArray?.[1]?.find((v: string[]) => v[0] === "fn")?.[3] ||
          regEntity.handle ||
          null;
      }
    }

    // Nameservers
    const nameservers: string[] = (data.nameservers || []).map(
      (ns: { ldhName?: string }) => ns.ldhName || ""
    ).filter(Boolean);

    // Status
    const status: string[] = data.status || [];

    return { domain, creationDate, ageDays, registrar, nameservers, status, error: null };
  } catch (err) {
    return {
      domain,
      creationDate: null,
      ageDays: null,
      registrar: null,
      nameservers: [],
      status: [],
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "Why does domain age matter for cold email?",
    a: "Email providers track domain reputation over time. Brand new domains have no sending history, so providers treat them with suspicion. Sending cold emails from a freshly registered domain almost guarantees landing in spam. Industry best practice is to wait at least 2 weeks (ideally 4+) and warm up the domain before sending outbound campaigns.",
  },
  {
    q: "How old should my domain be before sending cold email?",
    a: "At minimum, 2 weeks old. For best results, wait 4-6 weeks while actively warming up the domain with genuine-looking email exchanges. Many experts recommend buying domains months in advance and letting them age while setting up DNS records.",
  },
  {
    q: "What is RDAP?",
    a: "RDAP (Registration Data Access Protocol) is the modern replacement for WHOIS. It provides structured, machine-readable data about domain registrations. This tool uses RDAP to look up the registration date and registrar information for your domain.",
  },
  {
    q: "Why can't I see the creation date for some domains?",
    a: "Not all TLDs (top-level domains) support RDAP queries, and some registrars redact creation date information for privacy. Country-code TLDs (.uk, .de, etc.) may have limited RDAP support. In these cases, try a traditional WHOIS lookup for more details.",
  },
  {
    q: "Should I buy aged domains for cold email?",
    a: "Buying pre-aged domains can help, but be cautious. Check the domain's history (Wayback Machine, blocklist checks) to ensure it wasn't previously used for spam. A clean 6-month-old domain is better than a 5-year-old domain with spam history.",
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
      name: "Domain Age Checker",
      url: "https://coldrelay.com/tools/domain-age-checker",
      applicationCategory: "Email Tool",
      operatingSystem: "Any",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      description:
        "Check how old a domain is and whether it's ready for cold email. Shows registration date, registrar, nameservers, and cold email readiness assessment.",
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

export default function DomainAgeChecker() {
  const [domain, setDomain] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DomainInfo | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const check = async () => {
    const d = cleanDomain(domain);
    if (!d) return;
    setLoading(true);
    setResult(null);
    const info = await lookupDomain(d);
    setResult(info);
    setLoading(false);
  };

  const verdict = result ? ageVerdict(result.ageDays) : null;

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
            Domain Age Checker
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl">
            Check when a domain was registered and whether it&apos;s old enough for cold email.
            Domain age is a critical factor in email deliverability — new domains get flagged as
            suspicious.
          </p>
        </div>
      </section>

      <hr className="border-white/[0.06] max-w-4xl mx-auto" />

      {/* Input */}
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
            <label className="block text-sm font-medium text-white/70 mb-3">
              Enter Domain
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                className="flex-1 rounded-xl bg-white/[0.04] border border-white/[0.08] px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40"
                placeholder="example.com"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && check()}
              />
              <button
                onClick={check}
                disabled={!domain.trim() || loading}
                className="rounded-full bg-[#4A73D5] hover:bg-[#5A83E5] disabled:opacity-40 disabled:cursor-not-allowed px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20 transition-all whitespace-nowrap"
              >
                {loading ? "Checking…" : "Check Age"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      {result && (
        <section className="pb-12 sm:pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {result.error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
                <p className="text-sm text-red-400">{result.error}</p>
              </div>
            )}

            {/* Age Card */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur p-6 sm:p-8 text-center">
              <div className="text-xs text-white/40 uppercase tracking-wider mb-3">Domain Age</div>
              <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                {result.ageDays !== null ? formatAge(result.ageDays) : "Unknown"}
              </div>
              {verdict && (
                <div className={`text-lg font-semibold ${verdict.color} mb-3`}>
                  {verdict.label}
                </div>
              )}
              {verdict?.desc && (
                <p className="text-sm text-white/50 max-w-lg mx-auto">{verdict.desc}</p>
              )}
              {result.creationDate && (
                <div className="mt-4 text-xs text-white/30">
                  Registered: {new Date(result.creationDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur p-6">
                <div className="text-xs text-white/40 uppercase tracking-wider mb-3">Registrar</div>
                <div className="text-sm text-white font-medium">
                  {result.registrar || <span className="text-white/20">Not available</span>}
                </div>
              </div>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur p-6">
                <div className="text-xs text-white/40 uppercase tracking-wider mb-3">Nameservers</div>
                {result.nameservers.length > 0 ? (
                  <ul className="space-y-1">
                    {result.nameservers.map((ns, i) => (
                      <li key={i} className="text-sm text-white font-mono">{ns}</li>
                    ))}
                  </ul>
                ) : (
                  <span className="text-sm text-white/20">Not available</span>
                )}
              </div>
            </div>

            {/* Recommendation box */}
            <div className="rounded-2xl border border-[#4A73D5]/20 bg-[#4A73D5]/[0.04] p-6 sm:p-8">
              <h3 className="text-lg font-semibold text-white mb-3">💡 Cold Email Recommendation</h3>
              <ul className="space-y-2 text-sm text-white/60">
                <li className="flex items-start gap-2">
                  <span className="text-[#6B8FE6] mt-0.5">•</span>
                  Wait at least <strong className="text-white">2 weeks</strong> after registration before sending any cold email
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6B8FE6] mt-0.5">•</span>
                  Spend weeks 2–4 <strong className="text-white">warming up</strong> the domain with gradual sending
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6B8FE6] mt-0.5">•</span>
                  Configure <strong className="text-white">SPF, DKIM, and DMARC</strong> on day one — don&apos;t wait
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#6B8FE6] mt-0.5">•</span>
                  Use a <strong className="text-white">secondary domain</strong> (not your primary brand) for cold outreach
                </li>
              </ul>
            </div>
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
              Let ColdRelay Handle Your Domain Setup
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              ColdRelay provisions aged, warmed-up mailboxes on dedicated domains with SPF, DKIM,
              and DMARC pre-configured. Skip the waiting — start sending from day one.
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
