import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spintax Generator & Previewer — Create Unique Email Variations Free",
  description:
    "Paste your email with spintax syntax, see total unique variations, preview random outputs, and highlight spintax segments. Free tool for cold email at scale.",
  alternates: { canonical: "https://coldrelay.com/tools/spintax-generator" },
  openGraph: {
    type: "website",
    url: "https://coldrelay.com/tools/spintax-generator",
    title: "Spintax Generator & Previewer | ColdRelay",
    description:
      "Create unique email variations with spintax. Preview random outputs and count total combinations. Free tool.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay Spintax Generator" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
