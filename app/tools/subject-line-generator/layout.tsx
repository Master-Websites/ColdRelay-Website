import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cold Email Subject Line Generator — 10 High-Converting Lines Free",
  description:
    "Generate 10 cold email subject lines in different styles: questions, curiosity hooks, direct, personalized, and number-based. Character count included. Free, no signup.",
  alternates: { canonical: "https://coldrelay.com/tools/subject-line-generator" },
  openGraph: {
    type: "website",
    url: "https://coldrelay.com/tools/subject-line-generator",
    title: "Cold Email Subject Line Generator | ColdRelay",
    description:
      "Generate 10 cold email subject lines in 5 different styles. Free tool with character counts and copy buttons.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay Subject Line Generator" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
