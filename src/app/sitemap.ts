import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";
import { getAllComparisons, getAllGuides, getAllUseCases } from "@/lib/seo-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://coldrelay.com";
  const now = new Date();

  const staticPages = [
    { route: "", priority: 1.0, freq: "weekly" as const },
    { route: "/features", priority: 0.9, freq: "monthly" as const },
    { route: "/pricing", priority: 0.9, freq: "monthly" as const },
    { route: "/about", priority: 0.7, freq: "monthly" as const },
    { route: "/blog", priority: 0.8, freq: "weekly" as const },
    { route: "/compare", priority: 0.8, freq: "weekly" as const },
    { route: "/guides", priority: 0.8, freq: "weekly" as const },
    { route: "/use-cases", priority: 0.8, freq: "weekly" as const },
    { route: "/tools", priority: 0.8, freq: "monthly" as const },
    { route: "/privacy", priority: 0.3, freq: "yearly" as const },
    { route: "/terms", priority: 0.3, freq: "yearly" as const },
    { route: "/refund", priority: 0.3, freq: "yearly" as const },
    { route: "/anti-spam", priority: 0.3, freq: "yearly" as const },
  ].map((p) => ({
    url: `${baseUrl}${p.route}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));

  // Tools
  const tools = [
    "email-deliverability-test", "spf-generator", "dkim-generator", "dmarc-generator",
    "cold-email-template-generator", "subject-line-generator", "spintax-generator",
    "mailbox-calculator", "cold-email-roi-calculator", "blacklist-checker", "mx-lookup",
    "warmup-schedule-generator", "email-signature-generator", "domain-reputation-checker",
    "email-sequence-builder", "can-spam-checker", "email-header-analyzer",
    "domain-age-checker", "inbox-placement-tester", "ab-test-planner",
  ].map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Blog posts
  const blogPosts = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Comparison pages
  const comparePages = getAllComparisons().map((page) => ({
    url: `${baseUrl}/compare/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Guide pages
  const guidePages = getAllGuides().map((page) => ({
    url: `${baseUrl}/guides/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Use case pages
  const useCasePages = getAllUseCases().map((page) => ({
    url: `${baseUrl}/use-cases/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticPages,
    ...tools,
    ...blogPosts,
    ...comparePages,
    ...guidePages,
    ...useCasePages,
  ];
}
