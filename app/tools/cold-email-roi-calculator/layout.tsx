import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cold Email ROI Calculator — Calculate Your Revenue & Return on Investment",
  description:
    "Estimate your cold email ROI. Input your volume, reply rate, meeting rate, close rate, and deal value to see projected monthly revenue vs infrastructure cost. Free tool.",
  alternates: { canonical: "https://coldrelay.com/tools/cold-email-roi-calculator" },
  openGraph: {
    type: "website",
    url: "https://coldrelay.com/tools/cold-email-roi-calculator",
    title: "Cold Email ROI Calculator | ColdRelay",
    description:
      "Calculate your cold email return on investment. See projected revenue, meetings, and deals. Free tool.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay ROI Calculator" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
