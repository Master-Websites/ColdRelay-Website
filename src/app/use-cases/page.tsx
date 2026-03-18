import type { Metadata } from "next";
import Link from "next/link";
import { getAllUseCases } from "@/lib/seo-pages";

export const metadata: Metadata = {
  title: "Cold Email Infrastructure Use Cases by Industry",
  description:
    "Discover how agencies, SaaS companies, recruiters, and more use ColdRelay to build scalable cold email infrastructure. Industry-specific guides and benchmarks.",
  alternates: { canonical: "https://coldrelay.com/use-cases" },
  openGraph: {
    type: "website",
    url: "https://coldrelay.com/use-cases",
    title: "Cold Email Infrastructure Use Cases | ColdRelay",
    description:
      "Industry-specific cold email infrastructure guides with benchmarks and best practices.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay Use Cases" }],
  },
};

export default function UseCasesPage() {
  const pages = getAllUseCases();

  return (
    <>
      <section className="pt-32 sm:pt-40 pb-12 sm:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 mb-6">
            <span className="text-xs font-medium tracking-wide uppercase text-cyan-400">Use Cases</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight font-bold mb-5">
            Cold Email Infrastructure for Every Industry
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl">
            Whether you&apos;re a lead gen agency running 5,000 mailboxes or a SaaS startup with 50, ColdRelay scales to your needs. Find your industry below.
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
                href={`/use-cases/${page.slug}`}
                className="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-cyan-400/30 hover:bg-cyan-400/[0.03] transition-all"
              >
                <span className="text-xs font-medium text-cyan-400 uppercase tracking-wide">
                  {page.industry}
                </span>
                <h2 className="text-lg font-semibold text-white mt-3 mb-3 group-hover:text-[#6B8FE6] transition-colors">
                  {page.title}
                </h2>
                <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
                  {page.description}
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-xs font-medium text-[#6B8FE6]/70 group-hover:text-[#6B8FE6] transition-colors">
                  Learn more →
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
              Your Industry Not Listed?
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              ColdRelay works for any business that needs cold email at scale. Get in touch and we&apos;ll show you how it fits your workflow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://app.coldrelay.com/auth/register"
                className="inline-flex items-center gap-2 rounded-full bg-[#4A73D5] hover:bg-[#5A83E5] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20 hover:shadow-[#4A73D5]/30 hover:brightness-110 transition-all uppercase tracking-wide"
              >
                Get Started →
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all uppercase tracking-wide"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
