import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free DKIM Record Generator — Create DKIM TXT Records Instantly",
  description:
    "Generate a valid DKIM record for your domain. Enter your domain and selector to get the correct DKIM TXT record format for your DNS configuration.",
  alternates: {
    canonical: "https://coldrelay.com/tools/dkim-generator",
  },
  openGraph: {
    type: "website",
    url: "https://coldrelay.com/tools/dkim-generator",
    title: "Free DKIM Record Generator — Create DKIM TXT Records Instantly | ColdRelay",
    description:
      "Generate a valid DKIM record for your domain. Enter your domain and selector to get the correct DKIM TXT record format.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay DKIM Record Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free DKIM Record Generator — Create DKIM TXT Records Instantly | ColdRelay",
    description:
      "Generate a valid DKIM record for your domain. Enter your domain and selector to get the correct DKIM TXT record.",
    images: ["/og-image.png"],
  },
};

export default function DKIMGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "DKIM Record Generator",
    url: "https://coldrelay.com/tools/dkim-generator",
    description:
      "Free tool to generate valid DKIM TXT records for email authentication. Supports all email providers and custom selectors.",
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
        name: "What is a DKIM record?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DKIM (DomainKeys Identified Mail) is an email authentication method that uses cryptographic signatures to verify that an email was sent by an authorized server and hasn't been modified in transit. The public key is published as a DNS TXT record, while the private key is used by the sending server to sign outgoing emails.",
        },
      },
      {
        "@type": "Question",
        name: "What is a DKIM selector?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A DKIM selector is a string used to locate the DKIM public key in DNS. The full DNS lookup is selector._domainkey.yourdomain.com. Different email providers use different selectors — for example, Google Workspace uses 'google', Microsoft 365 uses 'selector1' and 'selector2', and you can create custom selectors.",
        },
      },
      {
        "@type": "Question",
        name: "How do I find my DKIM selector?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Check your email provider's documentation or look at the DKIM-Signature header in a sent email. The 's=' tag contains your selector. Common selectors: Google uses 'google', Microsoft uses 'selector1'/'selector2', Amazon SES uses a unique alphanumeric string.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need to generate my own DKIM keys?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most email providers (Google Workspace, Microsoft 365, etc.) generate DKIM keys for you. You just need to add their provided CNAME or TXT record to your DNS. If you run your own mail server, you'll need to generate a key pair — our tool helps you create the DNS record format for the public key.",
        },
      },
      {
        "@type": "Question",
        name: "What key size should I use for DKIM?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use a 2048-bit RSA key. While 1024-bit keys still work, they're considered weak and some providers may flag them. Most modern email providers default to 2048-bit keys. Our generator creates the record format for 2048-bit keys.",
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
