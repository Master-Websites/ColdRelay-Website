import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Domain Age Checker — Is Your Domain Old Enough for Cold Email?",
  description:
    "Check when a domain was registered and whether it's ready for cold email. Shows registration date, registrar, nameservers, and cold email readiness. Free tool.",
  alternates: { canonical: "https://coldrelay.com/tools/domain-age-checker" },
  openGraph: {
    type: "website",
    url: "https://coldrelay.com/tools/domain-age-checker",
    title: "Domain Age Checker | ColdRelay",
    description:
      "Check domain registration date, age, registrar, and cold email readiness. Free RDAP-based lookup tool.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay Domain Age Checker" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
