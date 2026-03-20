import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Email Deliverability Test — Check SPF, DKIM, DMARC | ColdRelay",
  description:
    "Test your email deliverability for free. Check SPF, DKIM, DMARC, MX records, and domain reputation. Get a deliverability score and fix issues instantly.",
  alternates: {
    canonical: "https://coldrelay.com/tools/email-deliverability-test",
  },
  openGraph: {
    type: "website",
    url: "https://coldrelay.com/tools/email-deliverability-test",
    title: "Free Email Deliverability Test — Check SPF, DKIM, DMARC | ColdRelay",
    description:
      "Test your email deliverability for free. Check SPF, DKIM, DMARC, MX records, and domain reputation. Get a deliverability score and fix issues instantly.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay Email Deliverability Test" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Email Deliverability Test — Check SPF, DKIM, DMARC | ColdRelay",
    description:
      "Test your email deliverability for free. Check SPF, DKIM, DMARC, MX records, and domain reputation.",
    images: ["/og-image.png"],
  },
};

export default function EmailDeliverabilityTestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Email Deliverability Test",
    url: "https://coldrelay.com/tools/email-deliverability-test",
    description:
      "Free tool to test email deliverability by checking SPF, DKIM, DMARC, and MX records. Get a score out of 100.",
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
        name: "What does this email deliverability test check?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our free tool checks your domain's SPF, DKIM, and DMARC records using real DNS lookups via Google's public DNS API. It also validates MX records and checks additional reputation signals like BIMI and MTA-STS. Each check contributes to your overall deliverability score out of 100.",
        },
      },
      {
        "@type": "Question",
        name: "Is this tool really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, 100% free with no signup required. We use Google's public DNS resolution API to perform real-time lookups on your domain's DNS records. There are no limits on how many domains you can test.",
        },
      },
      {
        "@type": "Question",
        name: "What is a good email deliverability score?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A score of 80-100 means your domain's email authentication is well configured. 60-79 is acceptable but has room for improvement. Below 60 indicates significant issues that are likely causing your emails to land in spam or be rejected.",
        },
      },
      {
        "@type": "Question",
        name: "What is SPF and why does it matter?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SPF (Sender Policy Framework) is a DNS TXT record that specifies which mail servers are authorized to send email for your domain. Without SPF, receiving servers have no way to verify legitimate senders, making your emails more likely to be flagged as spam.",
        },
      },
      {
        "@type": "Question",
        name: "What is DKIM and how does it work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DKIM (DomainKeys Identified Mail) adds a digital signature to your outgoing emails. The receiving server verifies this signature against a public key published in your DNS records. This proves the email hasn't been tampered with in transit.",
        },
      },
      {
        "@type": "Question",
        name: "What is DMARC and do I need it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DMARC (Domain-based Message Authentication, Reporting & Conformance) tells receiving servers what to do when SPF or DKIM checks fail. It's essential for protecting your domain from spoofing and improving inbox placement. Google and Yahoo now require DMARC for bulk senders.",
        },
      },
      {
        "@type": "Question",
        name: "Why are MX records important for deliverability?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "MX (Mail Exchange) records specify which servers receive email for your domain. Even if you only send email, having valid MX records signals to other mail servers that your domain is legitimate and properly configured.",
        },
      },
      {
        "@type": "Question",
        name: "How can ColdRelay help fix my deliverability?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ColdRelay automatically configures SPF, DKIM, DMARC, and MX records for every domain you set up. We provide dedicated IPs, automatic DNS management, and real-time monitoring to maintain 99% inbox placement — no manual DNS configuration needed.",
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
