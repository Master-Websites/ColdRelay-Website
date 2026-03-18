"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";

const googleOutlookPains = [
  "$7 per mailbox",
  "Manual DNS setup for EVERY domain",
  "2-4 weeks warmup before you can send",
  "Phone verification limits account creation",
  "One bad domain burns your entire workspace",
  "Resellers sell cheaper but accounts get nuked, IPs flagged, you own nothing",
];

const coldrelayBenefits = [
  "$1/mailbox (as low as $0.55 at volume)",
  "Auto DNS. Auto warmup. Auto everything.",
  "Send from day 1",
  "100-150 mailboxes per domain",
  "You own your infrastructure",
  "Start with 50 mailboxes for $50/month",
];

export function GoogleOutlookPainSection() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden" id="google-outlook-pain">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A73D5]/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <span className="text-sm text-white/60 font-medium">
                The real problem
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              You didn&apos;t sign up to be{" "}
              <span className="gradient-text">an IT admin.</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-base sm:text-lg text-white/50 leading-relaxed">
              But here you are. Creating your 30th Google/Outlook workspace. Manually
              adding DKIM records at 2am. Keeping a spreadsheet of 100 passwords.
              Waiting 4 weeks for domains to warm up while your competitors are
              already sending.
            </p>
          </div>
        </ScrollReveal>

        {/* Side-by-side comparison */}
        <ScrollReveal delay={0.2}>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Google/Outlook reality */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white/80">
                  Google/Outlook reality
                </h3>
              </div>
              <div className="space-y-4">
                {googleOutlookPains.map((pain, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 mt-0.5 text-red-400/60 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-white/50 leading-relaxed">{pain}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ColdRelay */}
            <div className="rounded-2xl bg-[#4A73D5]/[0.06] border border-[#4A73D5]/20 p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-[#4A73D5]/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#6B8FE6]" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-[#6B8FE6]">
                  ColdRelay
                </h3>
              </div>
              <div className="space-y-4">
                {coldrelayBenefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 mt-0.5 text-[#4A73D5] flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-white/70 leading-relaxed font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
