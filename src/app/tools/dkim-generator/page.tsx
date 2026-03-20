"use client";

import { useState } from "react";
import Link from "next/link";

/* ------------------------------------------------------------------ */
/*  Provider presets                                                    */
/* ------------------------------------------------------------------ */

interface ProviderPreset {
  id: string;
  label: string;
  selector: string;
  recordType: "CNAME" | "TXT";
  hint: string;
}

const presets: ProviderPreset[] = [
  {
    id: "google",
    label: "Google Workspace",
    selector: "google",
    recordType: "TXT",
    hint: "Google generates the key in Admin Console → Apps → Gmail → Authenticate Email.",
  },
  {
    id: "microsoft",
    label: "Microsoft 365",
    selector: "selector1",
    recordType: "CNAME",
    hint: "Microsoft uses two CNAME records (selector1 and selector2). Enable DKIM in the Defender portal.",
  },
  {
    id: "zoho",
    label: "Zoho Mail",
    selector: "zmail",
    recordType: "TXT",
    hint: "Zoho generates the key in Mail Admin → Email Authentication → DKIM.",
  },
  {
    id: "custom",
    label: "Custom / Own Server",
    selector: "default",
    recordType: "TXT",
    hint: "Enter your selector and paste your public key below.",
  },
];

/* ------------------------------------------------------------------ */
/*  FAQ data                                                            */
/* ------------------------------------------------------------------ */

const faqs = [
  {
    q: "What is a DKIM record?",
    a: "DKIM (DomainKeys Identified Mail) is an email authentication method that uses cryptographic signatures to verify that an email was sent by an authorized server and hasn't been modified in transit. The public key is published as a DNS TXT record, while the private key is used by the sending server to sign outgoing emails.",
  },
  {
    q: "What is a DKIM selector?",
    a: "A DKIM selector is a string used to locate the DKIM public key in DNS. The full DNS lookup is selector._domainkey.yourdomain.com. Different email providers use different selectors — for example, Google Workspace uses 'google', Microsoft 365 uses 'selector1' and 'selector2'.",
  },
  {
    q: "How do I find my DKIM selector?",
    a: "Check your email provider's documentation or look at the DKIM-Signature header in a sent email. The 's=' tag contains your selector. Common selectors: Google uses 'google', Microsoft uses 'selector1'/'selector2', Amazon SES uses a unique alphanumeric string.",
  },
  {
    q: "Do I need to generate my own DKIM keys?",
    a: "Most email providers (Google Workspace, Microsoft 365, etc.) generate DKIM keys for you. You just need to add their provided CNAME or TXT record to your DNS. If you run your own mail server, you'll need to generate a key pair yourself.",
  },
  {
    q: "What key size should I use for DKIM?",
    a: "Use a 2048-bit RSA key. While 1024-bit keys still work, they're considered weak and some providers may flag them. Most modern email providers default to 2048-bit keys.",
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                           */
/* ------------------------------------------------------------------ */

export default function DKIMGeneratorPage() {
  const [domain, setDomain] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("google");
  const [selector, setSelector] = useState("google");
  const [publicKey, setPublicKey] = useState("");
  const [keyType, setKeyType] = useState<"rsa" | "ed25519">("rsa");
  const [copied, setCopied] = useState<"host" | "value" | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const currentPreset = presets.find((p) => p.id === selectedPreset) || presets[3];

  const handlePresetChange = (id: string) => {
    setSelectedPreset(id);
    const preset = presets.find((p) => p.id === id);
    if (preset) {
      setSelector(preset.selector);
    }
  };

  /* Build the DNS record */
  const hostname = domain.trim()
    ? `${selector.trim() || "default"}._domainkey.${domain.trim()}`
    : "";

  const buildValue = (): string => {
    if (selectedPreset === "microsoft") {
      return `${selector.trim() || "selector1"}._domainkey.${domain.trim().replace(/\./g, "-")}.onmicrosoft.com`;
    }

    const cleanKey = publicKey
      .replace(/-----BEGIN PUBLIC KEY-----/g, "")
      .replace(/-----END PUBLIC KEY-----/g, "")
      .replace(/\s+/g, "")
      .trim();

    if (cleanKey) {
      return `v=DKIM1; k=${keyType}; p=${cleanKey}`;
    }

    return `v=DKIM1; k=${keyType}; p=YOUR_PUBLIC_KEY_HERE`;
  };

  const recordValue = buildValue();
  const isCname = selectedPreset === "microsoft";

  const copyText = (text: string, which: "host" | "value") => {
    navigator.clipboard.writeText(text);
    setCopied(which);
    setTimeout(() => setCopied(null), 2000);
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
            DKIM Record Generator
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-xl mx-auto">
            Generate a valid DKIM TXT record for your domain. Select your email provider, enter your
            selector, and get the DNS record to authenticate your emails.
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

            {/* Provider preset */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-3">Email Provider</label>
              <div className="grid grid-cols-2 gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetChange(preset.id)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                      selectedPreset === preset.id
                        ? "border-[#4A73D5]/50 bg-[#4A73D5]/10 text-[#6B8FE6]"
                        : "border-white/[0.08] bg-white/[0.02] text-white/60 hover:border-white/20"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-white/30 mt-2">{currentPreset.hint}</p>
            </div>

            {/* Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/70 mb-2">DKIM Selector</label>
              <input
                type="text"
                value={selector}
                onChange={(e) => setSelector(e.target.value)}
                placeholder="default"
                className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all"
              />
              <p className="text-xs text-white/30 mt-1">
                The selector identifies which DKIM key to use (e.g., &quot;google&quot;, &quot;selector1&quot;, &quot;default&quot;)
              </p>
            </div>

            {/* Key type */}
            {selectedPreset !== "microsoft" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/70 mb-2">Key Type</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setKeyType("rsa")}
                    className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                      keyType === "rsa"
                        ? "border-[#4A73D5]/50 bg-[#4A73D5]/10 text-[#6B8FE6]"
                        : "border-white/[0.08] bg-white/[0.02] text-white/60 hover:border-white/20"
                    }`}
                  >
                    <span className="block font-semibold">RSA</span>
                    <span className="block text-xs mt-0.5 opacity-60">Most compatible</span>
                  </button>
                  <button
                    onClick={() => setKeyType("ed25519")}
                    className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                      keyType === "ed25519"
                        ? "border-[#4A73D5]/50 bg-[#4A73D5]/10 text-[#6B8FE6]"
                        : "border-white/[0.08] bg-white/[0.02] text-white/60 hover:border-white/20"
                    }`}
                  >
                    <span className="block font-semibold">Ed25519</span>
                    <span className="block text-xs mt-0.5 opacity-60">Modern (limited support)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Public key input (custom) */}
            {selectedPreset === "custom" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Public Key <span className="text-white/40 font-normal">(optional — paste your key)</span>
                </label>
                <textarea
                  value={publicKey}
                  onChange={(e) => setPublicKey(e.target.value)}
                  placeholder={"MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8A..."}
                  rows={4}
                  className="w-full rounded-xl bg-white/[0.06] border border-white/[0.1] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-[#4A73D5]/40 focus:border-[#4A73D5]/40 transition-all font-mono resize-none"
                />
                <p className="text-xs text-white/30 mt-1">
                  Paste the base64-encoded public key (with or without PEM headers)
                </p>
              </div>
            )}

            {/* Generated record */}
            {domain.trim() && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-white/70 mb-2">
                  Your DKIM Record
                </label>
                <div className="rounded-xl bg-[#0a0a0a] border border-white/[0.1] p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs text-white/40 mb-1 font-medium">DNS Record Type</p>
                      <p className="text-sm text-white font-mono">{isCname ? "CNAME" : "TXT"}</p>
                    </div>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-white/40 mb-1 font-medium">Host / Name</p>
                      <code className="block text-sm text-[#6B8FE6] font-mono break-all leading-relaxed">
                        {hostname}
                      </code>
                    </div>
                    <button
                      onClick={() => copyText(hostname, "host")}
                      className="flex-shrink-0 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white transition-all mt-4"
                    >
                      {copied === "host" ? "Copied ✓" : "Copy"}
                    </button>
                  </div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-white/40 mb-1 font-medium">Value</p>
                      <code className="block text-sm text-[#6B8FE6] font-mono break-all leading-relaxed">
                        {recordValue}
                      </code>
                    </div>
                    <button
                      onClick={() => copyText(recordValue, "value")}
                      className="flex-shrink-0 rounded-lg bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] px-3 py-1.5 text-xs font-medium text-white/60 hover:text-white transition-all mt-4"
                    >
                      {copied === "value" ? "Copied ✓" : "Copy"}
                    </button>
                  </div>
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
            What Is DKIM and How Does It Protect Your Emails?
          </h2>
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <p>
              <strong className="text-white/80">DKIM (DomainKeys Identified Mail)</strong> is an email authentication protocol that adds a digital signature to every outgoing email. This signature is verified by the receiving mail server using a public key published in your domain&apos;s DNS records.
            </p>
            <p>
              Think of DKIM as a wax seal on a letter. It proves two things: (1) the email was actually sent by someone authorized to use your domain, and (2) the email content wasn&apos;t modified in transit. If either check fails, the receiving server knows something is wrong.
            </p>
            <h3 className="text-lg font-semibold text-white pt-4">How DKIM Works</h3>
            <ol className="list-decimal list-inside space-y-2 text-white/50">
              <li>Your mail server signs each outgoing email with a private key</li>
              <li>The signature is added as a <code className="text-[#6B8FE6]/80 bg-white/[0.04] px-1 rounded">DKIM-Signature</code> header in the email</li>
              <li>The receiving server looks up the public key at <code className="text-[#6B8FE6]/80 bg-white/[0.04] px-1 rounded">selector._domainkey.yourdomain.com</code></li>
              <li>It uses the public key to verify the signature matches the email content</li>
              <li>If verification passes, the email is authenticated; if it fails, it may be flagged or rejected</li>
            </ol>
            <h3 className="text-lg font-semibold text-white pt-4">Why DKIM Matters for Cold Email</h3>
            <p>
              DKIM is critical for cold email because it directly impacts whether your messages reach the inbox. Google, Microsoft, and Yahoo all check DKIM as part of their spam filtering. Without valid DKIM, your emails will be treated with suspicion — even if your SPF and DMARC records are perfect.
            </p>
            <p>
              DKIM also enables DMARC alignment. For DMARC to pass via DKIM, the <code className="text-[#6B8FE6]/80 bg-white/[0.04] px-1 rounded">d=</code> domain in the DKIM signature must match the From domain. This is why setting up DKIM correctly is essential before configuring DMARC.
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
              DKIM Setup Made Automatic
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              ColdRelay generates DKIM keys, publishes DNS records, and rotates keys automatically.
              No manual DNS configuration needed — just connect your domains and start sending.
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
