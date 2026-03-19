import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Cold Email Tools — Deliverability Tests, DNS Checks & More",
  description:
    "Free tools for cold email professionals. Test email deliverability, generate SPF, DKIM, and DMARC records, validate DNS, and optimize your outbound infrastructure.",
  alternates: { canonical: "https://coldrelay.com/tools" },
  openGraph: {
    type: "website",
    url: "https://coldrelay.com/tools",
    title: "Free Cold Email Tools | ColdRelay",
    description:
      "Free tools for cold email professionals. Test deliverability, generate DNS records, and optimize your infrastructure.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay Tools" }],
  },
};

const tools = [
  {
    slug: "email-deliverability-test",
    title: "Email Deliverability Test",
    description:
      "Check your SPF, DKIM, DMARC, and MX records. Get a deliverability score out of 100 with actionable recommendations.",
    icon: "📧",
    badge: "Popular",
  },
  {
    slug: "dmarc-generator",
    title: "DMARC Record Generator",
    description:
      "Generate a complete DMARC TXT record. Choose your policy, set up reporting, and configure advanced options like subdomain policy and alignment.",
    icon: "🛡️",
    badge: "New",
  },
  {
    slug: "spf-generator",
    title: "SPF Record Generator",
    description:
      "Create a valid SPF TXT record for your domain. Select your email providers, add IP addresses, and get the correct record to authorize your senders.",
    icon: "✅",
    badge: "New",
  },
  {
    slug: "dkim-generator",
    title: "DKIM Record Generator",
    description:
      "Generate a DKIM TXT record for email authentication. Select your provider, enter your selector, and get the DNS record format for your public key.",
    icon: "🔑",
    badge: "New",
  },
];

export default function ToolsPage() {
  return (
    <>
      <section className="pt-16 sm:pt-24 pb-12 sm:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4A73D5]/20 bg-[#4A73D5]/10 px-3 py-1 mb-6">
            <span className="text-xs font-medium tracking-wide uppercase text-[#6B8FE6]">
              Free Tools
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight font-bold mb-5">
            Cold Email Tools
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl">
            Free tools to test, validate, and optimize your cold email infrastructure. No signup
            required.
          </p>
        </div>
      </section>

      <hr className="border-white/[0.06] max-w-5xl mx-auto" />

      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-[#4A73D5]/30 hover:bg-[#4A73D5]/[0.03] transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#4A73D5]/10 flex items-center justify-center">
                    <span className="text-[#6B8FE6] text-lg">{tool.icon}</span>
                  </div>
                  {tool.badge && (
                    <span className="text-[10px] font-semibold tracking-wide uppercase text-[#4A73D5] bg-[#4A73D5]/10 px-2 py-0.5 rounded-full">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-semibold text-white mb-3 group-hover:text-[#6B8FE6] transition-colors">
                  {tool.title}
                </h2>
                <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
                  {tool.description}
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-xs font-medium text-[#6B8FE6]/70 group-hover:text-[#6B8FE6] transition-colors">
                  Use tool →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#4A73D5]/20 bg-[#4A73D5]/[0.04] p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              Want It All Automated?
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              These tools help you diagnose. ColdRelay fixes it automatically — domains, DNS,
              mailboxes, monitoring, and dedicated IPs. 99% inbox placement guaranteed.
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
