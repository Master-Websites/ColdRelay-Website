import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://coldrelay.com"),
  title: {
    default: "ColdRelay — Cold Email Infrastructure at Scale",
    template: "%s | ColdRelay",
  },
  description:
    "Automated cold email infrastructure. Domains, mailboxes, DNS, warmup, and deliverability monitoring — all managed for you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#09090B] text-white antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
