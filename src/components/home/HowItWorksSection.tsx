"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";

const steps = [
  {
    number: "1",
    title: "Enter your volume",
    desc: "Tell us how many emails per day you want to send. Our calculator tells you exactly how many mailboxes and domains you need. No guesswork. No surprise costs.",
    detail: "Calculate →",
  },
  {
    number: "2",
    title: "We build everything",
    desc: "Dedicated Azure tenant. Dedicated IPs. Domains purchased and configured. SPF, DKIM, DMARC — all automated. Mailboxes provisioned and warming. You touch nothing.",
    detail: "Automated setup",
  },
  {
    number: "3",
    title: "Connect and send",
    desc: "Grab your SMTP credentials. Plug them into Instantly, Smartlead, or whatever tool you use. Start sending. Hit 99% inbox.",
    detail: "Hit 99% inbox",
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden" id="how-it-works">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A73D5]/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-white/60 font-medium">
                Setup in 2-4 hours
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              From zero to inbox in{" "}
              <span className="gradient-text">3 steps.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={i} delay={i * 0.15}>
              <div className="spotlight-card group relative rounded-2xl bg-[#111111] border border-white/[0.06] hover:border-white/[0.12] p-8 pt-10 h-full transition-all duration-300 hover:-translate-y-1"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
                }}
              >
                <div className="relative z-10">
                  {/* Step number */}
                  <div className="w-8 h-8 rounded-full bg-[#4A73D5] flex items-center justify-center text-sm font-bold text-white mb-8">
                    {step.number}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/45 leading-relaxed mb-6">
                    {step.desc}
                  </p>

                  <div className="flex items-center gap-1.5 text-[#4A73D5] text-sm font-semibold">
                    {step.detail}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                    </svg>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
