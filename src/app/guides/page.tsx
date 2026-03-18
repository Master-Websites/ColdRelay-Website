import type { Metadata } from "next";
import Link from "next/link";
import { getAllGuides } from "@/lib/seo-pages";

export const metadata: Metadata = {
  title: "Cold Email Infrastructure Guides — Setup, Deliverability & Scaling",
  description:
    "Step-by-step guides on setting up cold email infrastructure, configuring SPF/DKIM/DMARC, warming domains, avoiding blacklists, and scaling your outbound.",
  alternates: { canonical: "https://coldrelay.com/guides" },
  openGraph: {
    type: "website",
    url: "https://coldrelay.com/guides",
    title: "Cold Email Infrastructure Guides | ColdRelay",
    description:
      "Expert how-to guides for building and managing cold email infrastructure at scale.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay Guides" }],
  },
};

export default function GuidesPage() {
  const pages = getAllGuides();

  return (
    <>
      <section className="pt-32 sm:pt-40 pb-12 sm:pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4A73D5]/20 bg-[#4A73D5]/10 px-3 py-1 mb-6">
            <span className="text-xs font-medium tracking-wide uppercase text-[#6B8FE6]">Guides</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight font-bold mb-5">
            Cold Email Infrastructure Guides
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed max-w-2xl">
            Everything you need to know about setting up, managing, and scaling cold email infrastructure. From DNS basics to advanced deliverability optimization.
          </p>
        </div>
      </section>

      <hr className="border-white/[0.06] max-w-5xl mx-auto" />

      <section className="py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-6">
            {pages.map((page) => (
              <Link
                key={page.slug}
                href={`/guides/${page.slug}`}
                className="group block rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:border-[#4A73D5]/30 hover:bg-[#4A73D5]/[0.03] transition-all"
              >
                <span className="text-xs font-medium text-[#6B8FE6] uppercase tracking-wide">How-To</span>
                <h2 className="text-lg font-semibold text-white mt-3 mb-3 group-hover:text-[#6B8FE6] transition-colors">
                  {page.title}
                </h2>
                <p className="text-sm text-white/50 leading-relaxed line-clamp-3">
                  {page.description}
                </p>
                <span className="inline-flex items-center gap-1 mt-4 text-xs font-medium text-[#6B8FE6]/70 group-hover:text-[#6B8FE6] transition-colors">
                  Read guide →
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
              Want Us to Handle the Setup?
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              ColdRelay automates everything in these guides — domain purchases, DNS, mailboxes, and monitoring. Ready in 2–4 hours.
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
