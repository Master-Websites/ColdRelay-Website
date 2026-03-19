import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inbox Placement Tester — Score Your Email Deliverability",
  description:
    "Estimate your inbox placement rate based on an 8-point deliverability checklist. Score your cold email setup out of 100 and get actionable recommendations. Free tool.",
  alternates: { canonical: "https://coldrelay.com/tools/inbox-placement-tester" },
  openGraph: {
    type: "website",
    url: "https://coldrelay.com/tools/inbox-placement-tester",
    title: "Inbox Placement Tester | ColdRelay",
    description:
      "Score your email deliverability with an 8-point checklist. See estimated inbox placement rate and what to fix. Free tool.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay Inbox Placement Tester" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
