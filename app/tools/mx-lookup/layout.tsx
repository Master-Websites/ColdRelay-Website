import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MX Record Lookup — Check Mail Server Records for Any Domain",
  description:
    "Look up MX (Mail Exchange) records for any domain. See mail server priorities, verify email routing, and understand your DNS configuration. Free tool.",
  alternates: { canonical: "https://coldrelay.com/tools/mx-lookup" },
  openGraph: {
    type: "website",
    url: "https://coldrelay.com/tools/mx-lookup",
    title: "MX Record Lookup | ColdRelay",
    description:
      "Check MX records for any domain. See mail server priorities and verify email routing. Free DNS lookup tool.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay MX Record Lookup" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
