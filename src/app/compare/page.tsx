import type { Metadata } from "next";
import Link from "next/link";
import { getAllComparisons } from "@/lib/seo-pages";

export const metadata: Metadata = {
  title: "ColdRelay vs Competitors — Cold Email Infrastructure Comparisons",
  description:
    "See how ColdRelay compares to Google Workspace, Hypertide, Superwave, Inframail, and other cold email infrastructure providers. Feature-by-feature breakdowns.",
  alternates: { canonical: "https://coldrelay.com/compare" },
  openGraph: {
    type: "website",
    url: "https://coldrelay.com/compare",
    title: "ColdRelay vs Competitors | ColdRelay",
    description:
      "Feature-by-feature comparisons of ColdRelay against every major cold email infrastructure provider.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay Comparisons" }],
  },
};

export default function ComparePage() {
  const pages = getAllComparisons();

  return (
    <>
      <section className="pt-32 sm:pt-40 pb-12 sm:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4A73D5]/20 bg-[#4A73D5]/10 px-3 py-1 mb-6">
            <span className="text-xs font-medium tracking-wide uppercase text-[#6B8FE6]">Comparisons</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight font-bold mb-5">
            ColdRelay vs The Competition
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl">
            Detailed, honest comparisons so you can pick the right cold email infrastructure for your needs. We break down features, pricing, deliverability, and scale.
          </p>
        </div>
      </section>

      <hr className="border-white/[0.06] max-w-5xl mx-auto" />

      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <Link
                key={page.slug}
                href={`/compare/${page.slug}`}
                className="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-[#4A73D5]/30 hover:bg-[#4A73D5]/[0.03] transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#4A73D5]/10 flex items-center justify-center">
                    <span className="text-[#6B8FE6] font-bold text-sm">VS</span>
                  </div>
                  <h2 className="text-lg font-semibold text-white group-hover:text-[#6B8FE6] transition-colors">
                    {page.competitor}
                  </h2>
                </div>
                <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
                  {page.description}
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-xs font-medium text-[#6B8FE6]/70 group-hover:text-[#6B8FE6] transition-colors">
                  Read comparison →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#4A73D5]/20 bg-[#4A73D5]/[0.04] p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              Done Comparing? Try ColdRelay Free
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              Dedicated infrastructure, automated DNS, and 95%+ deliverability — starting at $0.55/mailbox/month.
            </p>
            <a
              href="https://app.coldrelay.com/auth/register"
              className="inline-flex items-center gap-2 rounded-full bg-[#4A73D5] hover:bg-[#5A83E5] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20 hover:shadow-[#4A73D5]/30 hover:brightness-110 transition-all uppercase tracking-wide"
            >
              Get Started →
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
