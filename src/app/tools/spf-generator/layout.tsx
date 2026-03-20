import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free SPF Record Generator — Create SPF TXT Records Instantly",
  description:
    "Generate a valid SPF record for your domain in seconds. Select your email provider, enter your domain, and get the correct SPF TXT record to add to your DNS.",
  alternates: {
    canonical: "https://coldrelay.com/tools/spf-generator",
  },
  openGraph: {
    type: "website",
    url: "https://coldrelay.com/tools/spf-generator",
    title: "Free SPF Record Generator — Create SPF TXT Records Instantly | ColdRelay",
    description:
      "Generate a valid SPF record for your domain in seconds. Select your email provider, enter your domain, and get the correct SPF TXT record.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "ColdRelay SPF Record Generator" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free SPF Record Generator — Create SPF TXT Records Instantly | ColdRelay",
    description:
      "Generate a valid SPF record for your domain in seconds. Select your email provider and get the correct SPF TXT record.",
    images: ["/og-image.png"],
  },
};

export default function SPFGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SPF Record Generator",
    url: "https://coldrelay.com/tools/spf-generator",
    description:
      "Free tool to generate valid SPF TXT records for any email provider. Supports Google Workspace, Microsoft 365, Zoho, and custom configurations.",
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
        name: "What is an SPF record?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SPF (Sender Policy Framework) is a DNS TXT record that specifies which mail servers are authorized to send email on behalf of your domain. It helps receiving servers verify that incoming mail from your domain comes from a server you've approved, reducing spoofing and improving deliverability.",
        },
      },
      {
        "@type": "Question",
        name: "How do I add an SPF record to my domain?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Log in to your domain registrar or DNS hosting provider (like Cloudflare, GoDaddy, or Namecheap). Navigate to DNS settings, create a new TXT record with the host set to @ (or your domain), and paste the generated SPF value. Save and allow up to 48 hours for propagation.",
        },
      },
      {
        "@type": "Question",
        name: "What does ~all vs -all mean in SPF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The ~all qualifier is a soft fail — it tells receivers that servers not listed may still send mail but should be treated with suspicion. The -all qualifier is a hard fail — it tells receivers to reject mail from unlisted servers. For cold email, ~all is generally recommended as it's less likely to cause delivery issues during warmup.",
        },
      },
      {
        "@type": "Question",
        name: "Can I have multiple SPF records?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. You should only have one SPF record per domain. Having multiple SPF records causes authentication failures. If you use multiple email providers, combine all their include statements into a single SPF record. Our generator lets you add multiple providers to create one unified record.",
        },
      },
      {
        "@type": "Question",
        name: "What is the SPF 10 DNS lookup limit?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SPF records are limited to 10 DNS lookups (include, a, mx, ptr, exists, and redirect mechanisms all count). Exceeding this limit causes SPF to return a permanent error (permerror), which effectively means no SPF protection. Our generator warns you when you're approaching this limit.",
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
