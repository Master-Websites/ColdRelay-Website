import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Header Analyzer — Parse SPF, DKIM, DMARC & Routing",
  description:
    "Paste raw email headers and instantly analyze SPF, DKIM, DMARC authentication results, trace routing hops, and extract key fields. Free tool for cold email deliverability.",
  alternates: { canonical: "https://coldrelay.com/tools/email-header-analyzer" },
  openGraph: {
    type: "website",
    url: "https://coldrelay.com/tools/email-header-analyzer",
    title: "Email Header Analyzer | ColdRelay",
    description:
      "Analyze raw email headers — SPF, DKIM, DMARC authentication, routing hops, and key fields. Free online tool.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay Email Header Analyzer" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
