"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Types                                                               */
/* ------------------------------------------------------------------ */

type SignatureStyle = "minimal" | "professional" | "bold";

interface SignatureData {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  linkedin: string;
}

/* ------------------------------------------------------------------ */
/*  Signature HTML generators                                           */
/* ------------------------------------------------------------------ */

function generateMinimal(d: SignatureData): string {
  const lines: string[] = [];
  lines.push(`<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#333333;line-height:1.5;">`);
  lines.push(`  <tr><td style="padding-bottom:4px;"><strong style="font-size:14px;color:#111111;">${d.name}</strong></td></tr>`);
  if (d.title || d.company) {
    const titleLine = [d.title, d.company].filter(Boolean).join(" · ");
    lines.push(`  <tr><td style="color:#666666;font-size:12px;">${titleLine}</td></tr>`);
  }
  lines.push(`  <tr><td style="padding-top:8px;border-top:1px solid #e0e0e0;margin-top:8px;">`);
  const contacts: string[] = [];
  if (d.email) contacts.push(`<a href="mailto:${d.email}" style="color:#4A73D5;text-decoration:none;font-size:12px;">${d.email}</a>`);
  if (d.phone) contacts.push(`<span style="font-size:12px;color:#666666;">${d.phone}</span>`);
  lines.push(`    ${contacts.join(' &nbsp;|&nbsp; ')}`);
  lines.push(`  </td></tr>`);
  if (d.website || d.linkedin) {
    const links: string[] = [];
    if (d.website) links.push(`<a href="${d.website.startsWith('http') ? d.website : 'https://' + d.website}" style="color:#4A73D5;text-decoration:none;font-size:12px;">${d.website.replace(/^https?:\/\//, '')}</a>`);
    if (d.linkedin) links.push(`<a href="${d.linkedin.startsWith('http') ? d.linkedin : 'https://' + d.linkedin}" style="color:#4A73D5;text-decoration:none;font-size:12px;">LinkedIn</a>`);
    lines.push(`  <tr><td style="padding-top:2px;">${links.join(' &nbsp;|&nbsp; ')}</td></tr>`);
  }
  lines.push(`</table>`);
  return lines.join('\n');
}

function generateProfessional(d: SignatureData): string {
  const lines: string[] = [];
  lines.push(`<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;font-size:13px;color:#333333;">`);
  lines.push(`  <tr>`);
  lines.push(`    <td style="padding-right:16px;border-right:3px solid #4A73D5;">`);
  lines.push(`      <table cellpadding="0" cellspacing="0" border="0">`);
  lines.push(`        <tr><td style="padding-bottom:2px;"><strong style="font-size:15px;color:#111111;">${d.name}</strong></td></tr>`);
  if (d.title) lines.push(`        <tr><td style="font-size:12px;color:#4A73D5;font-weight:600;">${d.title}</td></tr>`);
  if (d.company) lines.push(`        <tr><td style="font-size:12px;color:#888888;">${d.company}</td></tr>`);
  lines.push(`      </table>`);
  lines.push(`    </td>`);
  lines.push(`    <td style="padding-left:16px;vertical-align:top;">`);
  lines.push(`      <table cellpadding="0" cellspacing="0" border="0" style="font-size:12px;color:#666666;line-height:1.8;">`);
  if (d.phone) lines.push(`        <tr><td>📞 ${d.phone}</td></tr>`);
  if (d.email) lines.push(`        <tr><td>✉️ <a href="mailto:${d.email}" style="color:#4A73D5;text-decoration:none;">${d.email}</a></td></tr>`);
  if (d.website) lines.push(`        <tr><td>🌐 <a href="${d.website.startsWith('http') ? d.website : 'https://' + d.website}" style="color:#4A73D5;text-decoration:none;">${d.website.replace(/^https?:\/\//, '')}</a></td></tr>`);
  if (d.linkedin) lines.push(`        <tr><td>💼 <a href="${d.linkedin.startsWith('http') ? d.linkedin : 'https://' + d.linkedin}" style="color:#4A73D5;text-decoration:none;">LinkedIn Profile</a></td></tr>`);
  lines.push(`      </table>`);
  lines.push(`    </td>`);
  lines.push(`  </tr>`);
  lines.push(`</table>`);
  return lines.join('\n');
}

function generateBold(d: SignatureData): string {
  const lines: string[] = [];
  lines.push(`<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;background-color:#111111;border-radius:8px;padding:16px;" bgcolor="#111111">`);
  lines.push(`  <tr><td style="padding:16px;">`);
  lines.push(`    <table cellpadding="0" cellspacing="0" border="0">`);
  lines.push(`      <tr><td style="padding-bottom:8px;"><strong style="font-size:18px;color:#ffffff;letter-spacing:0.5px;">${d.name}</strong></td></tr>`);
  if (d.title || d.company) {
    const titleLine = [d.title, d.company].filter(Boolean).join(" — ");
    lines.push(`      <tr><td style="font-size:13px;color:#4A73D5;font-weight:600;padding-bottom:12px;">${titleLine}</td></tr>`);
  }
  lines.push(`      <tr><td style="border-top:2px solid #4A73D5;padding-top:12px;">`);
  lines.push(`        <table cellpadding="0" cellspacing="0" border="0" style="font-size:12px;color:#cccccc;line-height:1.8;">`);
  if (d.phone) lines.push(`          <tr><td>${d.phone}</td></tr>`);
  if (d.email) lines.push(`          <tr><td><a href="mailto:${d.email}" style="color:#4A73D5;text-decoration:none;">${d.email}</a></td></tr>`);
  if (d.website) lines.push(`          <tr><td><a href="${d.website.startsWith('http') ? d.website : 'https://' + d.website}" style="color:#4A73D5;text-decoration:none;">${d.website.replace(/^https?:\/\//, '')}</a></td></tr>`);
  if (d.linkedin) lines.push(`          <tr><td><a href="${d.linkedin.startsWith('http') ? d.linkedin : 'https://' + d.linkedin}" style="color:#4A73D5;text-decoration:none;">LinkedIn →</a></td></tr>`);
  lines.push(`        </table>`);
  lines.push(`      </td></tr>`);
  lines.push(`    </table>`);
  lines.push(`  </td></tr>`);
  lines.push(`</table>`);
  return lines.join('\n');
}

function generateSignatureHTML(d: SignatureData, style: SignatureStyle): string {
  switch (style) {
    case "minimal": return generateMinimal(d);
    case "professional": return generateProfessional(d);
    case "bold": return generateBold(d);
  }
}

/* ------------------------------------------------------------------ */
/*  FAQ                                                                 */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "Why do I need an HTML email signature?",
    a: "An HTML email signature adds professionalism to your cold emails and builds trust with recipients. It includes clickable links to your website and social profiles, making it easy for prospects to learn more about you and your company.",
  },
  {
    q: "Will this signature work in Gmail and Outlook?",
    a: "Yes. The generated HTML uses table-based layout and inline styles — the most compatible format for email clients. It works in Gmail, Outlook, Apple Mail, Yahoo Mail, and most modern email clients.",
  },
  {
    q: "Should I include images in my cold email signature?",
    a: "For cold email, it's best to keep signatures text-based with minimal HTML. Images can trigger spam filters and increase email size. Our generator creates clean, lightweight signatures optimized for deliverability.",
  },
  {
    q: "How do I add this signature to my email client?",
    a: "Copy the HTML code, then go to your email client's signature settings. In Gmail: Settings → General → Signature → paste the HTML. In Outlook: File → Options → Mail → Signatures → paste. Most clients accept HTML signatures directly.",
  },
  {
    q: "What makes a good cold email signature?",
    a: "Keep it short — name, title, company, and one or two contact methods. Avoid quotes, banners, or promotional images. A clean signature signals professionalism without distracting from your email's message.",
  },
];

const styles: { key: SignatureStyle; label: string; desc: string }[] = [
  { key: "minimal", label: "Minimal", desc: "Clean and compact" },
  { key: "professional", label: "Professional", desc: "Two-column with accent" },
  { key: "bold", label: "Bold", desc: "Dark background, standout" },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function EmailSignatureGeneratorPage() {
  const [data, setData] = useState<SignatureData>({
    name: "",
    title: "",
    company: "",
    phone: "",
    email: "",
    website: "",
    linkedin: "",
  });
  const [style, setStyle] = useState<SignatureStyle>("professional");
  const [generated, setGenerated] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const update = (key: keyof SignatureData, value: string) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const handleGenerate = () => {
    if (!data.name.trim()) return;
    setGenerated(generateSignatureHTML(data, style));
    setCopied(false);
  };

  const handleCopy = () => {
    if (!generated) return;
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            name: "Email Signature Generator",
            url: "https://coldrelay.com/tools/email-signature-generator",
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
            Email Signature Generator
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            Create a clean, professional HTML email signature in seconds. Multiple styles, live
            preview, and one-click copy.
          </p>
        </div>
      </section>

      {/* Generator */}
      <section className="pb-16 sm:pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-6 sm:p-8"
          >
            {/* Input fields */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {([
                ["name", "Full Name *", "John Smith"],
                ["title", "Job Title", "Head of Sales"],
                ["company", "Company", "Acme Inc."],
                ["phone", "Phone", "+1 (555) 123-4567"],
                ["email", "Email", "john@acme.com"],
                ["website", "Website", "acme.com"],
                ["linkedin", "LinkedIn URL", "linkedin.com/in/johnsmith"],
              ] as const).map(([key, label, placeholder]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-white/70 mb-2">{label}</label>
                  <input
                    type="text"
                    value={data[key]}
                    onChange={(e) => update(key, e.target.value)}
                    placeholder={placeholder}
                    className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all"
                  />
                </div>
              ))}
            </div>

            {/* Style selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-3">Style</label>
              <div className="grid grid-cols-3 gap-3">
                {styles.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setStyle(s.key)}
                    className={`rounded-xl border p-3 text-center transition-all ${
                      style === s.key
                        ? "border-[#4A73D5]/40 bg-[#4A73D5]/10"
                        : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]"
                    }`}
                  >
                    <p className={`text-sm font-medium ${style === s.key ? "text-[#6B8FE6]" : "text-white"}`}>
                      {s.label}
                    </p>
                    <p className="text-xs text-white/40 mt-1">{s.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!data.name.trim()}
              className="w-full sm:w-auto rounded-xl bg-[#4A73D5] hover:bg-[#5A83E5] disabled:opacity-40 disabled:cursor-not-allowed px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20 hover:shadow-[#4A73D5]/30 transition-all"
            >
              Generate Signature
            </button>
          </motion.div>

          {/* Preview + HTML */}
          <AnimatePresence>
            {generated && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-8 space-y-6"
              >
                {/* Live preview */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
                  <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider mb-4">Preview</h3>
                  <div className="bg-white rounded-lg p-6">
                    <div dangerouslySetInnerHTML={{ __html: generated }} />
                  </div>
                </div>

                {/* HTML code */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium text-white/40 uppercase tracking-wider">HTML Code</h3>
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-2 rounded-lg bg-white/[0.06] border border-white/[0.1] px-4 py-2 text-xs font-medium text-white/70 hover:text-white hover:bg-white/[0.1] transition-all"
                    >
                      {copied ? "✓ Copied!" : "Copy HTML"}
                    </button>
                  </div>
                  <pre className="rounded-xl bg-black/30 border border-white/[0.06] p-4 overflow-x-auto text-xs text-white/60 leading-relaxed max-h-[300px] overflow-y-auto">
                    <code>{generated}</code>
                  </pre>
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
              Professional Emails Deserve Professional Infrastructure
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              A great signature is just the start. ColdRelay gives you the domains, mailboxes, DNS,
              and warmup to make sure your cold emails actually land in the inbox.
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
