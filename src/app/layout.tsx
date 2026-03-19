import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "ColdRelay — Cold Email Infrastructure That Actually Delivers",
    template: "%s | ColdRelay",
  },
  description:
    "Set up domains, mailboxes, DNS, and dedicated IPs for cold email at scale. 95% cheaper than Google/Outlook. 99% inbox placement guaranteed.",
  metadataBase: new URL("https://coldrelay.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://coldrelay.com",
    siteName: "ColdRelay",
    title: "ColdRelay — Cold Email Infrastructure That Actually Delivers",
    description:
      "Set up domains, mailboxes, DNS, and dedicated IPs for cold email at scale. 95% cheaper than Google/Outlook.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ColdRelay — Cold Email Infrastructure That Actually Delivers",
    description:
      "Cold email infrastructure at scale. 95% cheaper than Google/Outlook.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: "https://coldrelay.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ColdRelay",
    url: "https://coldrelay.com",
    logo: "https://coldrelay.com/logo.png",
    description:
      "Cold email infrastructure platform. Domains, mailboxes, DNS, and dedicated IPs at scale.",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "support@coldrelay.com",
    },
  };

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          defer
          data-domain="coldrelay.com"
          src="https://analytics.leadcart.io/js/script.js"
        />
        <Script id="posthog" strategy="afterInteractive">
          {`!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId setPersonProperties".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);posthog.init('phc_Wo3x5asFmVwHn19dTqAlu0U5OHsPZxJkRoB4RvxVVKW',{api_host:'https://us.i.posthog.com',person_profiles:'always'})`}
        </Script>
      </head>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-[#f4f4f5]">
        <AnnouncementBar />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
