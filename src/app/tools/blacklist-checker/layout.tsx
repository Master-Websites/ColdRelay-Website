import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Email Blacklist Checker — Is Your Domain or IP Blacklisted?",
  description:
    "Check if your domain or IP address is listed on major email blocklists (DNSBLs). Instant results across 10+ blacklists. Free tool for cold email deliverability.",
  alternates: { canonical: "https://coldrelay.com/tools/blacklist-checker" },
  openGraph: {
    type: "website",
    url: "https://coldrelay.com/tools/blacklist-checker",
    title: "Email Blacklist Checker | ColdRelay",
    description:
      "Check if your domain or IP is on email blocklists. Instant DNSBL lookups across 10+ blacklists. Free tool.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay Blacklist Checker" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
