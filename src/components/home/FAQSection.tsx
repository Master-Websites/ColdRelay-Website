"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

const faqs = [
  {
    q: "How is $1/mailbox possible?",
    a: "We built our own provisioning layer on Azure. No reselling. No middlemen. Our infrastructure handles 100-150 mailboxes per domain instead of 2. That efficiency is why our costs are 95% lower than Google — and we pass it to you.",
  },
  {
    q: "What does the 99% inbox placement guarantee mean?",
    a: "Follow our sending best practices (outlined in the ColdRelay app). If you're not hitting 99% inbox placement within 14 days of proper warmup, we diagnose and fix it free. If we can't resolve it, you get a full refund.",
  },
  {
    q: "How many mailboxes can I put on one domain?",
    a: "100-150 per domain. Compare that to Google Workspace where you get 2 mailboxes per domain. That's why you need 500 domains on Google but only 8 on ColdRelay for the same 1,000 mailboxes.",
  },
  {
    q: "What sending tools work with ColdRelay?",
    a: "All of them. Instantly, Smartlead, Salesforge, Woodpecker, QuickMail, Lemlist, Apollo — anything that accepts SMTP credentials.",
  },
  {
    q: "Is there a minimum order?",
    a: "No. Start with 25 mailboxes ($25/mo). Scale to 5,000+ as you grow. Volume discounts kick in automatically.",
  },
  {
    q: "What are the volume discounts?",
    a: "$1.00/mailbox (1-199), $0.85 (200-999), $0.70 (1,000-4,999), $0.55 (5,000+). The more you scale, the less you pay.",
  },
  {
    q: "How long does setup take?",
    a: "2-4 hours. Fully automated. Domains purchased, DNS configured, mailboxes provisioned, warmup started.",
  },
  {
    q: "Can I bring my own domains?",
    a: "Yes. Use your own domains or purchase through us at $15/domain/year.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-2xl border transition-colors duration-200 ${
        open
          ? "bg-white/[0.03] border-white/[0.08]"
          : "bg-transparent border-white/[0.06] hover:border-white/[0.1]"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-white/70 pr-4">
          {faq.q}
        </span>
        <motion.svg
          className="w-5 h-5 text-white/30 flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </motion.svg>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 text-sm text-white/45 leading-relaxed">
              {faq.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQSection() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden" id="faq">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A73D5]/20 to-transparent" />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
              <span className="text-sm text-white/60 font-medium">
                Questions
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Everything you need to know.
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <FAQItem faq={faq} index={i} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <div className="mt-10 text-center text-sm text-white/30">
            Looking for something else?{" "}
            <a
              href="mailto:support@coldrelay.com"
              className="text-[#4A73D5] hover:text-[#6B8FE6] font-medium transition-colors"
            >
              support@coldrelay.com
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
