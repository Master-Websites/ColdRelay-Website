import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cold Email A/B Test Planner — Calculate Sample Sizes & Timelines",
  description:
    "Plan statistically valid A/B tests for cold email. Calculate sample sizes, significance thresholds, and timelines for subject lines, opening lines, CTAs, and send times. Free tool.",
  alternates: { canonical: "https://coldrelay.com/tools/ab-test-planner" },
  openGraph: {
    type: "website",
    url: "https://coldrelay.com/tools/ab-test-planner",
    title: "Cold Email A/B Test Planner | ColdRelay",
    description:
      "Plan A/B tests for cold email campaigns. Calculate sample sizes, significance thresholds, and methodology. Free tool.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay A/B Test Planner" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
