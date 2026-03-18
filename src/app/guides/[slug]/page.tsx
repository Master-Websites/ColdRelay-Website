import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getGuideBySlug,
  getAllGuideSlugs,
  slugToTitle,
} from "@/lib/seo-pages";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getGuideBySlug(slug);
  if (!page) return {};

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `https://coldrelay.com/guides/${page.slug}` },
    openGraph: {
      type: "article",
      url: `https://coldrelay.com/guides/${page.slug}`,
      title: `${page.title} | ColdRelay`,
      description: page.description,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const page = getGuideBySlug(slug);
  if (!page) notFound();

  const { sections, faqs, relatedPages } = page;

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: page.title,
    description: page.description,
    step: sections.steps.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.content,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://coldrelay.com" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://coldrelay.com/guides" },
      { "@type": "ListItem", position: 3, name: page.title, item: `https://coldrelay.com/guides/${page.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Header */}
      <section className="pt-32 sm:pt-40 pb-8 sm:pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-[#6B8FE6] transition-colors mb-8"
          >
            ← All Guides
          </Link>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#4A73D5]/20 bg-[#4A73D5]/10 px-3 py-1 mb-6">
            <span className="text-xs font-medium tracking-wide uppercase text-[#6B8FE6]">Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight font-bold mb-5">
            {page.title}
          </h1>
          <p className="text-base sm:text-lg text-white/60 leading-relaxed mb-4">{page.description}</p>
          <p className="text-xs text-white/30">
            Last updated:{" "}
            {new Date(page.lastUpdated).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </section>

      <hr className="border-white/[0.06] max-w-4xl mx-auto" />

      {/* Content */}
      <article className="py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Intro */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
              {sections.intro.title}
            </h2>
            {sections.intro.content.split("\n\n").map((para, i) => (
              <p key={i} className="text-base sm:text-lg text-white/70 leading-relaxed mb-6">
                {para}
              </p>
            ))}
          </section>

          {/* Steps */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">
              Step-by-Step Guide
            </h2>
            <div className="space-y-8">
              {sections.steps.map((step, i) => (
                <div key={i} className="relative pl-12">
                  <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-[#4A73D5] text-white font-bold text-sm flex items-center justify-center shadow-lg shadow-[#4A73D5]/20">
                    {i + 1}
                  </div>
                  {i < sections.steps.length - 1 && (
                    <div className="absolute left-[15px] top-10 bottom-[-16px] w-px bg-gradient-to-b from-[#4A73D5]/30 to-transparent" />
                  )}
                  <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                  {step.content.split("\n\n").map((para, j) => (
                    <p key={j} className="text-sm text-white/60 leading-relaxed mb-4">
                      {para}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </section>

          {/* Common Mistakes */}
          <section className="rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
              {sections.mistakes.title}
            </h2>
            <ul className="space-y-4">
              {sections.mistakes.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500/20 text-red-400 text-xs flex items-center justify-center mt-0.5">
                    ✕
                  </span>
                  <p className="text-sm text-white/70 leading-relaxed">{item}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Summary */}
          <section className="rounded-2xl border border-[#4A73D5]/20 bg-[#4A73D5]/[0.04] p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
              {sections.summary.title}
            </h2>
            {sections.summary.content.split("\n\n").map((para, i) => (
              <p key={i} className="text-base sm:text-lg text-white/70 leading-relaxed mb-4">
                {para}
              </p>
            ))}
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-2xl border border-white/[0.03] bg-white/[0.02] p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related */}
          {(relatedPages.guides.length > 0 ||
            relatedPages.comparisons.length > 0 ||
            relatedPages.resources.length > 0) && (
            <section>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-8">
                Related Resources
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {relatedPages.guides.map((s) => (
                  <Link key={s} href={`/guides/${s}`} className="group block rounded-2xl border border-white/[0.03] bg-white/[0.02] p-5 hover:border-[#4A73D5]/30 hover:bg-[#4A73D5]/[0.03] transition-all">
                    <span className="text-xs font-medium text-[#6B8FE6] uppercase tracking-wide">Guide</span>
                    <h3 className="text-sm font-medium text-white mt-2 group-hover:text-[#6B8FE6] transition-colors line-clamp-2">{slugToTitle(s)}</h3>
                  </Link>
                ))}
                {relatedPages.resources.map((s) => (
                  <Link key={s} href={`/resources/${s}`} className="group block rounded-2xl border border-white/[0.03] bg-white/[0.02] p-5 hover:border-[#4A73D5]/30 hover:bg-[#4A73D5]/[0.03] transition-all">
                    <span className="text-xs font-medium text-[#6B8FE6] uppercase tracking-wide">Resource</span>
                    <h3 className="text-sm font-medium text-white mt-2 group-hover:text-[#6B8FE6] transition-colors line-clamp-2">{slugToTitle(s)}</h3>
                  </Link>
                ))}
                {relatedPages.comparisons.map((s) => (
                  <Link key={s} href={`/compare/${s}`} className="group block rounded-2xl border border-white/[0.03] bg-white/[0.02] p-5 hover:border-[#4A73D5]/30 hover:bg-[#4A73D5]/[0.03] transition-all">
                    <span className="text-xs font-medium text-emerald-400 uppercase tracking-wide">Comparison</span>
                    <h3 className="text-sm font-medium text-white mt-2 group-hover:text-[#6B8FE6] transition-colors line-clamp-2">{slugToTitle(s)}</h3>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>

      {/* CTA */}
      <section className="py-12 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#4A73D5]/20 bg-[#4A73D5]/[0.04] p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-4">
              Skip the Manual Setup — Let ColdRelay Handle It
            </h2>
            <p className="text-base text-white/50 mb-8 max-w-xl mx-auto">
              Automated domain purchases, DNS configuration, mailbox creation, and deliverability monitoring. Ready in 2–4 hours.
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
