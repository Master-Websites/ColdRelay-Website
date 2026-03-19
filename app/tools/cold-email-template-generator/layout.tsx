import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cold Email Template Generator — Free Outreach Sequences",
  description:
    "Generate proven cold email templates in seconds. Get an initial outreach email plus two follow-ups — customized for your product, audience, goal, and tone. Free, no signup required.",
  alternates: { canonical: "https://coldrelay.com/tools/cold-email-template-generator" },
  openGraph: {
    type: "website",
    url: "https://coldrelay.com/tools/cold-email-template-generator",
    title: "Cold Email Template Generator | ColdRelay",
    description:
      "Generate proven cold email sequences in seconds. Initial outreach + 2 follow-ups customized for your product and audience.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay Cold Email Template Generator" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
