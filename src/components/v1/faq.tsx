"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How is $1/mailbox possible?",
    a: "We use Azure infrastructure at scale, not consumer email providers. By building purpose-built cold email infrastructure (not repurposed Google Workspace), we eliminate the overhead and pass the savings to you. No per-seat licensing — just infrastructure costs.",
  },
  {
    q: "What's the 99% inbox guarantee?",
    a: "We guarantee 99% inbox placement on properly configured campaigns. If your emails aren't landing in the inbox, we'll fix the issue or refund your money. We monitor deliverability continuously and proactively resolve problems.",
  },
  {
    q: "How many mailboxes per domain?",
    a: "Up to 150 mailboxes per domain. Compare that to Google Workspace's limit of 2 per domain for cold outreach before you start getting flagged. More mailboxes per domain means fewer domains to manage.",
  },
  {
    q: "What tools work with ColdRelay?",
    a: "ColdRelay works with all major cold email tools including Instantly, Smartlead, Saleshandy, Lemlist, and any tool that supports IMAP/SMTP. Just plug in your credentials and start sending.",
  },
  {
    q: "Is there a minimum order?",
    a: "Yes — the minimum is 50 mailboxes at $1.00/mailbox ($50/month). Most teams start with 150-500 mailboxes and scale up from there as campaigns prove out.",
  },
  {
    q: "How long does setup take?",
    a: "2-4 hours from signup to sending. DNS records are configured automatically, mailboxes are provisioned instantly, and warmup begins immediately. No manual configuration required.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,--theme(--color-slate-400/.25),transparent)1] md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center">
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),#7B9BE0,var(--color-gray-50),#93AADF,var(--color-gray-200))] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Frequently asked questions
            </h2>
          </div>

          {/* FAQ items */}
          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="relative rounded-2xl bg-gray-900/50 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]"
              >
                <button
                  className="relative z-10 flex w-full items-center justify-between px-6 py-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-nacelle font-semibold text-gray-200">
                    {faq.q}
                  </span>
                  <svg
                    className={`ml-4 h-5 w-5 shrink-0 text-[#4A73D5] transition-transform ${open === i ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                {open === i && (
                  <div className="relative z-10 px-6 pb-5">
                    <p className="text-[#7B9BE0]/65">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
