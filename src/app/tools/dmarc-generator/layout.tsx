import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free DMARC Record Generator — Create DMARC TXT Records Instantly",
  description:
    "Generate a valid DMARC record for your domain. Choose your policy, enter a reporting email, and get the complete DMARC TXT record for your DNS.",
  alternates: {
    canonical: "https://coldrelay.com/tools/dmarc-generator",
  },
  openGraph: {
    type: "website",
    url: "https://coldrelay.com/tools/dmarc-generator",
    title: "Free DMARC Record Generator — Create DMARC TXT Records Instantly | ColdRelay",
    description:
      "Generate a valid DMARC record for your domain. Choose your policy, enter a reporting email, and get the complete DMARC TXT record.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay DMARC Record Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free DMARC Record Generator — Create DMARC TXT Records Instantly | ColdRelay",
    description:
      "Generate a valid DMARC record for your domain. Choose your DMARC policy and get the complete DNS record.",
    images: ["/og-image.png"],
  },
};

export default function DMARCGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DMARC Record Generator",
    url: "https://coldrelay.com/tools/dmarc-generator",
    description:
      "Free tool to generate valid DMARC TXT records. Configure policy, reporting, subdomain handling, and advanced options for complete email authentication.",
    applicationCategory: "Utility",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: "ColdRelay",
      url: "https://coldrelay.com",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a DMARC record?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DMARC (Domain-based Message Authentication, Reporting & Conformance) is a DNS TXT record that tells receiving mail servers how to handle emails that fail SPF and DKIM authentication. It also lets you receive reports about who is sending email on behalf of your domain.",
        },
      },
      {
        "@type": "Question",
        name: "What DMARC policy should I use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start with p=none to monitor without affecting delivery. Once you confirm all legitimate email passes SPF/DKIM, move to p=quarantine (sends failures to spam), then p=reject (blocks failures completely). For cold email, many senders use p=none or p=quarantine during warmup, then upgrade to p=reject.",
        },
      },
      {
        "@type": "Question",
        name: "Do Google and Yahoo require DMARC?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Since February 2024, Google and Yahoo require all bulk senders (5,000+ emails/day) to have a DMARC record. Even for lower-volume senders, having DMARC significantly improves deliverability and protects your domain from spoofing.",
        },
      },
      {
        "@type": "Question",
        name: "What are DMARC aggregate reports (rua)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DMARC aggregate reports are XML files sent to the email address specified in your rua tag. They contain data about who sent email using your domain, whether it passed or failed authentication, and which IPs were used. These reports help you identify unauthorized senders and fix authentication issues.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between rua and ruf in DMARC?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The rua tag specifies where to send aggregate reports (daily summaries of authentication results). The ruf tag specifies where to send forensic reports (individual failure details). Forensic reports contain more detail but are rarely sent by major providers due to privacy concerns. Most setups only need rua.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
