import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Cold Email Tools — Calculators, DNS Checks, Generators & More",
  description:
    "16 free tools for cold email professionals. Mailbox calculator, ROI calculator, blacklist checker, MX lookup, SPF/DKIM/DMARC generators, deliverability test, warmup scheduler, signature generator, domain reputation checker, email sequence builder, CAN-SPAM checker, and more.",
  alternates: { canonical: "https://coldrelay.com/tools" },
  openGraph: {
    type: "website",
    url: "https://coldrelay.com/tools",
    title: "Free Cold Email Tools | ColdRelay",
    description:
      "16 free tools for cold email professionals. Calculators, DNS checks, generators, and deliverability tools — no signup required.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay Tools" }],
  },
};

const tools = [
  {
    slug: "mailbox-calculator",
    title: "Mailbox Sizing Calculator",
    description:
      "Calculate how many mailboxes and domains you need for your cold email volume. Compare ColdRelay pricing vs Google Workspace and Microsoft 365.",
    icon: "🔢",
    badge: null,
    category: "Calculators",
  },
  {
    slug: "cold-email-roi-calculator",
    title: "Cold Email ROI Calculator",
    description:
      "Estimate your cold email return on investment. Input volume, reply rate, meeting rate, close rate, and deal value to see projected revenue.",
    icon: "💰",
    badge: null,
    category: "Calculators",
  },
  {
    slug: "warmup-schedule-generator",
    title: "Warmup Schedule Generator",
    description:
      "Generate a 30-day warmup calendar for your mailboxes. See the day-by-day volume ramp and warmup vs cold email split.",
    icon: "🔥",
    badge: "New",
    category: "Calculators",
  },
  {
    slug: "blacklist-checker",
    title: "Email Blacklist Checker",
    description:
      "Check if your domain or IP is listed on major email blocklists (DNSBLs). Instant results across 12+ blacklists used by Gmail, Outlook, and Yahoo.",
    icon: "🛡️",
    badge: null,
    category: "Deliverability",
  },
  {
    slug: "domain-reputation-checker",
    title: "Domain Reputation Checker",
    description:
      "Check your domain's email authentication records — SPF, DKIM, DMARC, MX, A, and BIMI — and get a reputation score from 0 to 100.",
    icon: "⭐",
    badge: "New",
    category: "Deliverability",
  },
  {
    slug: "mx-lookup",
    title: "MX Record Lookup",
    description:
      "Look up MX records for any domain. See mail server priorities, detect the email provider, and verify email routing configuration.",
    icon: "🔍",
    badge: null,
    category: "DNS Tools",
  },
  {
    slug: "email-deliverability-test",
    title: "Email Deliverability Test",
    description:
      "Check your SPF, DKIM, DMARC, and MX records. Get a deliverability score out of 100 with actionable recommendations.",
    icon: "📧",
    badge: "Popular",
    category: "DNS Tools",
  },
  {
    slug: "spf-generator",
    title: "SPF Record Generator",
    description:
      "Generate a valid SPF record for your domain. Add authorized senders, IPs, and includes with a visual builder.",
    icon: "✅",
    badge: null,
    category: "DNS Tools",
  },
  {
    slug: "dkim-generator",
    title: "DKIM Record Generator",
    description:
      "Generate DKIM DNS records for your domain. Set the selector, key size, and get the TXT record ready to publish.",
    icon: "🔑",
    badge: null,
    category: "DNS Tools",
  },
  {
    slug: "dmarc-generator",
    title: "DMARC Record Generator",
    description:
      "Build a DMARC policy for your domain. Choose your policy level, set reporting addresses, and generate the DNS record.",
    icon: "🛡️",
    badge: null,
    category: "DNS Tools",
  },
  {
    slug: "cold-email-template-generator",
    title: "Cold Email Template Generator",
    description:
      "Generate proven cold email templates for different industries and use cases. Personalize with your company details and start sending.",
    icon: "✉️",
    badge: null,
    category: "Content",
  },
  {
    slug: "email-sequence-builder",
    title: "Email Sequence Builder",
    description:
      "Generate a complete cold email sequence — initial email plus follow-ups with optimal timing. Customized for your product, audience, and tone.",
    icon: "📋",
    badge: "New",
    category: "Content",
  },
  {
    slug: "subject-line-generator",
    title: "Subject Line Generator",
    description:
      "Generate high-converting subject lines for cold email. Test different approaches — curiosity, personalization, urgency, and more.",
    icon: "💡",
    badge: null,
    category: "Content",
  },
  {
    slug: "spintax-generator",
    title: "Spintax Generator & Previewer",
    description:
      "Paste your email with spintax syntax, see total unique variations, preview random outputs, and highlight spintax segments.",
    icon: "🔄",
    badge: null,
    category: "Content",
  },
  {
    slug: "email-signature-generator",
    title: "Email Signature Generator",
    description:
      "Create a clean, professional HTML email signature. Multiple styles — minimal, professional, bold — with live preview and one-click copy.",
    icon: "✍️",
    badge: "New",
    category: "Content",
  },
  {
    slug: "can-spam-checker",
    title: "CAN-SPAM Compliance Checker",
    description:
      "Check if your cold emails comply with the CAN-SPAM Act. Interactive checklist with scoring, compliance status, and requirement explanations.",
    icon: "⚖️",
    badge: "New",
    category: "Compliance",
  },
];

const categories = ["Calculators", "Deliverability", "DNS Tools", "Content", "Compliance"];

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
            {tools.length} free tools to plan, test, validate, and optimize your cold email
            infrastructure. No signup required.
          </p>
        </div>
      </section>

      <hr className="border-white/[0.06] max-w-5xl mx-auto" />

      {categories.map((category) => {
        const categoryTools = tools.filter((t) => t.category === category);
        return (
          <section key={category} className="py-12 sm:py-16 border-b border-white/[0.04] last:border-0">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-lg font-semibold text-white/40 uppercase tracking-wider mb-6">
                {category}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryTools.map((tool) => (
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
                    <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-[#6B8FE6] transition-colors">
                      {tool.title}
                    </h3>
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
        );
      })}

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#4A73D5]/20 bg-[#4A73D5]/[0.04] p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              Tools Are Great. Automation Is Better.
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              Stop manually checking DNS, monitoring blocklists, and managing mailboxes. ColdRelay
              automates your entire cold email infrastructure — from domain setup to deliverability
              monitoring.
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
