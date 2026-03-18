import fs from "fs";
import path from "path";

const CONTENT_DIR = path.join(process.cwd(), "content");

/* ── Types ─────────────────────────────────────────────── */

export interface ComparisonPage {
  slug: string;
  competitor: string;
  competitorUrl: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: {
    overview: { coldrelay: string; competitor: string };
    featureComparison: Array<{
      feature: string;
      coldrelay: string;
      competitor: string;
      winner: "coldrelay" | "competitor" | "tie";
    }>;
    coldrelayWins: string;
    competitorWins: string;
    whoShouldChooseColdRelay: string;
    whoShouldChooseCompetitor: string;
    verdict: string;
  };
  faqs: Array<{ question: string; answer: string }>;
  relatedPages: RelatedPages;
}

export interface UseCasePage {
  slug: string;
  industry: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: {
    painPoints: { title: string; content: string };
    solution: { title: string; content: string };
    howItWorks: { title: string; steps: Array<{ title: string; content: string }> };
    benefits: { title: string; items: Array<{ title: string; content: string }> };
    metrics: {
      title: string;
      benchmarks: Array<{ metric: string; value: string; notes: string }>;
    };
  };
  faqs: Array<{ question: string; answer: string }>;
  relatedPages: RelatedPages;
}

export interface GuidePage {
  slug: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: {
    intro: { title: string; content: string };
    steps: Array<{ title: string; content: string }>;
    mistakes: { title: string; items: string[] };
    summary: { title: string; content: string };
  };
  faqs: Array<{ question: string; answer: string }>;
  relatedPages: RelatedPages;
}

export interface ResourcePage {
  slug: string;
  title: string;
  description: string;
  lastUpdated: string;
  sections: {
    intro: { title: string; content: string };
    items: Array<{ title: string; content: string }>;
    howToUse: { title: string; content: string };
  };
  faqs: Array<{ question: string; answer: string }>;
  relatedPages: RelatedPages;
}

interface RelatedPages {
  guides: string[];
  resources: string[];
  comparisons: string[];
  useCases: string[];
}

/* ── Helpers ───────────────────────────────────────────── */

function loadJsonFiles<T>(subdir: string): T[] {
  const dir = path.join(CONTENT_DIR, subdir);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((filename) => {
      const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
      return JSON.parse(raw) as T;
    });
}

function loadJsonBySlug<T>(subdir: string, slug: string): T | null {
  const filePath = path.join(CONTENT_DIR, subdir, `${slug}.json`);
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

/* ── Comparison pages ──────────────────────────────────── */

export function getAllComparisons(): ComparisonPage[] {
  return loadJsonFiles<ComparisonPage>("compare");
}
export function getComparisonBySlug(slug: string): ComparisonPage | null {
  return loadJsonBySlug<ComparisonPage>("compare", slug);
}
export function getAllComparisonSlugs(): string[] {
  return getAllComparisons().map((p) => p.slug);
}

/* ── Use-case pages ────────────────────────────────────── */

export function getAllUseCases(): UseCasePage[] {
  return loadJsonFiles<UseCasePage>("use-cases");
}
export function getUseCaseBySlug(slug: string): UseCasePage | null {
  return loadJsonBySlug<UseCasePage>("use-cases", slug);
}
export function getAllUseCaseSlugs(): string[] {
  return getAllUseCases().map((p) => p.slug);
}

/* ── Guide pages ───────────────────────────────────────── */

export function getAllGuides(): GuidePage[] {
  return loadJsonFiles<GuidePage>("guides");
}
export function getGuideBySlug(slug: string): GuidePage | null {
  return loadJsonBySlug<GuidePage>("guides", slug);
}
export function getAllGuideSlugs(): string[] {
  return getAllGuides().map((p) => p.slug);
}

/* ── Resource pages ────────────────────────────────────── */

export function getAllResources(): ResourcePage[] {
  return loadJsonFiles<ResourcePage>("resources");
}
export function getResourceBySlug(slug: string): ResourcePage | null {
  return loadJsonBySlug<ResourcePage>("resources", slug);
}
export function getAllResourceSlugs(): string[] {
  return getAllResources().map((p) => p.slug);
}

/* ── Utility ───────────────────────────────────────────── */

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function calculateReadingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 230);
}
