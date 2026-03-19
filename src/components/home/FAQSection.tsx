"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/components/ui/section";

const faqItems = [
  {
    question: "How is ColdRelay different from Google Workspace or Microsoft 365?",
    answer:
      "Google and Outlook limit you to 2 mailboxes per domain and charge $6–7/mailbox. ColdRelay uses Azure infrastructure to give you 100–150 mailboxes per domain at as low as $0.55/mailbox. We also auto-configure DNS, provide dedicated IPs, and handle warmup — all built specifically for cold email at scale.",
  },
  {
    question: "How long does it take to set up?",
    answer:
      "Most setups are fully operational within 2–4 hours. We handle domain configuration, DNS records (SPF, DKIM, DMARC), mailbox provisioning, and warmup initiation. You'll receive SMTP/IMAP credentials ready to plug into your sending tool.",
  },
  {
    question: "What sending tools does ColdRelay work with?",
    answer:
      "ColdRelay works with any cold email tool that supports SMTP/IMAP — including Instantly, Smartlead, Lemlist, EmailBison, and Clay. We provide standard email credentials that plug into any platform.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We charge per mailbox per month with volume discounts. 1–199 mailboxes: $1.00/each. 200–999: $0.85/each. 1,000–4,999: $0.70/each. 5,000+: $0.55/each. No setup fees. No long-term contracts. Cancel anytime.",
  },
  {
    question: "What does the 99% inbox guarantee mean?",
    answer:
      "We guarantee 99% inbox placement on properly configured accounts with good sending practices. If your deliverability drops below this threshold due to our infrastructure, we'll credit your account. This guarantee applies to accounts following our recommended sending guidelines.",
  },
  {
    question: "Do I need technical knowledge to get started?",
    answer:
      "No. We handle all the technical setup — domains, DNS, mailbox creation, IP allocation, and warmup. You just tell us your volume needs and we deliver ready-to-use credentials. Our onboarding team helps you configure your sending tool.",
  },
  {
    question: "Can I scale up or down?",
    answer:
      "Yes. You can add or remove mailboxes at any time. Pricing tiers adjust automatically — as you scale up, your per-mailbox cost goes down. There are no penalties for scaling down.",
  },
];

export function FAQSection() {
  return (
    <Section>
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-8">
        <h2 className="text-center text-3xl font-extrabold text-white tracking-tight sm:text-5xl">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>
                <p className="max-w-[640px] text-balance">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
