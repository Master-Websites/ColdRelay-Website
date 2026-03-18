import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "ColdRelay is building the default infrastructure choice for cold email globally. Learn about our mission and team.",
  alternates: { canonical: "https://coldrelay.com/about" },
};

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#4A73D5]/8 rounded-full blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Building the infrastructure layer
            <br />
            <span className="gradient-text">cold email deserves</span>
          </h1>
          <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto">
            Cold email is one of the most powerful growth channels in B2B. But the
            infrastructure behind it has been broken for years. We&apos;re fixing that.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 text-white/60 leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">The Problem</h2>
            <p>
              Every outbound team knows the pain. You set up Google Workspace accounts at
              $6-7 per mailbox per month. You&apos;re sharing infrastructure with millions of
              other users. One bad neighbor gets your IP blacklisted. Your carefully crafted
              campaigns go straight to spam.
            </p>
            <p className="mt-4">
              Or you go the reseller route at $3/mailbox — still expensive at scale, still
              shared infrastructure, still fragile. The tools you use to send (Instantly,
              Smartlead) are excellent. But the infrastructure underneath? It&apos;s been an
              afterthought.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Solution</h2>
            <p>
              ColdRelay is the infrastructure layer. We handle everything underneath your
              sending platform: domains, mailboxes, DNS records, dedicated IPs, and isolated
              Azure tenants. All set up automatically in 2-4 hours.
            </p>
            <p className="mt-4">
              Every customer gets their own dedicated environment. Your own IPs. Your own
              Azure tenant. Your own servers. No shared risk. No cross-contamination. Just
              clean, reliable infrastructure purpose-built for cold email at scale.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">The Numbers</h2>
            <p>
              Starting at $1.00/mailbox per month — dropping to $0.55/mailbox at volume.
              That&apos;s up to 95% cheaper than Google Workspace. At 1,000 mailboxes,
              you&apos;re paying $700/month instead of $7,000.
            </p>
            <p className="mt-4">
              We&apos;ve helped teams contact 641,000+ prospects in a single campaign with
              3.3% positive reply rates. That&apos;s the kind of scale that turns cold email
              from a gamble into a predictable pipeline.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
            <p>
              We&apos;re building ColdRelay to become the default infrastructure choice for
              cold email globally. Every team running serious outbound should have access to
              enterprise-grade infrastructure at a fraction of the cost.
            </p>
            <p className="mt-4">
              Volume negates luck. The more at-bats you have, the more predictable your
              results. ColdRelay gives you the infrastructure to swing as many times as you
              need.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mt-24 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-center mb-12">
          What we believe
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Infrastructure matters",
              description:
                "The best sending tool in the world can't overcome bad infrastructure. We build the foundation that makes everything else work.",
            },
            {
              title: "Isolation is non-negotiable",
              description:
                "Shared infrastructure means shared risk. Every ColdRelay customer gets their own dedicated environment. Period.",
            },
            {
              title: "Scale should be affordable",
              description:
                "Enterprise-grade cold email infrastructure shouldn't require an enterprise budget. We make world-class infrastructure accessible to everyone.",
            },
          ].map((value, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {value.title}
              </h3>
              <p className="text-sm text-white/50 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Ready to upgrade your infrastructure?
        </h2>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://app.coldrelay.com/auth/register"
            className="inline-flex items-center gap-2 rounded-full bg-[#4A73D5] hover:bg-[#5A83E5] px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#4A73D5]/25 hover:shadow-[#4A73D5]/40 hover:brightness-110 transition-all hover:-translate-y-0.5"
          >
            Get Started
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 py-3.5 text-base font-medium text-white/70 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}
