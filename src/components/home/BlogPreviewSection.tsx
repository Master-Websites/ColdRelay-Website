"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import Link from "next/link";

const posts = [
  {
    slug: "cold-email-infrastructure-guide",
    title: "The Complete Guide to Cold Email Infrastructure in 2025",
    date: "March 2025",
    excerpt:
      "Everything you need to know about setting up cold email infrastructure at scale — domains, mailboxes, DNS, IPs, and deliverability.",
  },
  {
    slug: "google-workspace-vs-cold-email",
    title: "Why Google/Outlook Is the Wrong Choice for Cold Email",
    date: "February 2025",
    excerpt:
      "Google/Outlook was built for business email. Here's why using it for cold outreach at scale is costing you thousands.",
  },
  {
    slug: "domain-warmup-best-practices",
    title: "Domain Warmup: Best Practices for Maximum Deliverability",
    date: "January 2025",
    excerpt:
      "How to properly warm up your cold email domains and mailboxes to hit 99% inbox placement from day one.",
  },
];

export function BlogPreviewSection() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden" id="blog">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A73D5]/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <span className="text-sm text-white/60 font-medium">
                Resources
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Cold email infrastructure insights
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] overflow-hidden transition-all duration-300 hover:-translate-y-1 h-full"
              >
                {/* Image placeholder */}
                <div className="h-48 bg-gradient-to-br from-[#4A73D5]/10 to-[#4A73D5]/5 flex items-center justify-center">
                  <svg className="w-12 h-12 text-[#4A73D5]/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                  </svg>
                </div>

                <div className="p-6">
                  <div className="text-xs text-white/30 font-medium mb-2">
                    {post.date}
                  </div>
                  <h3 className="text-base font-bold text-white/80 group-hover:text-white transition-colors mb-2 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-1.5 text-[#4A73D5] text-sm font-semibold">
                    Read more
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
