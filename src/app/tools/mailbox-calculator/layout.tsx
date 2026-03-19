import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cold Email Mailbox Calculator — How Many Mailboxes Do You Need?",
  description:
    "Calculate exactly how many mailboxes and domains you need for your cold email volume. Compare ColdRelay pricing vs Google Workspace and Outlook. Free tool.",
  alternates: { canonical: "https://coldrelay.com/tools/mailbox-calculator" },
  openGraph: {
    type: "website",
    url: "https://coldrelay.com/tools/mailbox-calculator",
    title: "Cold Email Mailbox Calculator | ColdRelay",
    description:
      "Calculate mailboxes and domains needed for your email volume. Compare costs across providers. Free tool.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay Mailbox Calculator" }],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
