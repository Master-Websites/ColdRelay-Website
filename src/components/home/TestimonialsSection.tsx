"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";

const testimonials = [
  {
    quote:
      "641,000+ prospects contacted over 12 weeks. 3.3% positive reply rate. ColdRelay handled the volume without a single deliverability issue.",
    name: "Jake Brennan",
    title: "Founder & CEO",
    company: "ScaleOutbound",
    detail: "1,000+ mailboxes",
    color: "bg-blue-400",
    initials: "JB",
  },
  {
    quote:
      "We were spending $4,200/month on Google/Outlook for cold email. Switched to ColdRelay. Now we spend $600/month for the same volume. Same inbox rates.",
    name: "Sarah Whitfield",
    title: "Head of Growth",
    company: "PipelineForge",
    detail: "500+ mailboxes",
    color: "bg-purple-400",
    initials: "SW",
  },
  {
    quote:
      "Setup took 3 hours. Everything configured automatically. We were sending the same day we signed up. No more 2am DNS sessions.",
    name: "Alex Torres",
    title: "Agency Owner",
    company: "ReplyStack Agency",
    detail: "200+ mailboxes",
    color: "bg-green-400",
    initials: "AT",
  },
  {
    quote:
      "Tested ColdRelay against two other providers. ColdRelay hit 97% inbox on day one. The others took 2 weeks to stabilize. It's not even close.",
    name: "Eric Walsh",
    title: "Sales Ops Manager",
    company: "DealFlow.io",
    detail: "300+ mailboxes",
    color: "bg-orange-400",
    initials: "EW",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden" id="testimonials">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A73D5]/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              <span className="text-sm text-white/60 font-medium">
                Real results
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              <span className="flex items-center justify-center gap-2 mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </span>
              Trusted by 200+ outbound teams.{" "}
              <span className="gradient-text">Here&apos;s what they&apos;re saying.</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="spotlight-card rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] p-6 h-full transition-all duration-300 group"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
                }}
              >
                <div className="relative z-10">
                  {/* Quote */}
                  <svg className="w-8 h-8 text-[#4A73D5]/20 mb-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4.017v10H0z" />
                  </svg>
                  <p className="text-base text-white/70 leading-relaxed mb-6 font-medium">
                    &ldquo;{t.quote}&rdquo;
                  </p>

                  {/* Author with placeholder avatar */}
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-xs font-bold text-white/80`}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white/80">
                        {t.name}
                      </div>
                      <div className="text-xs text-white/40">
                        {t.title}, {t.company}
                      </div>
                      <div className="text-xs text-white/25 mt-0.5">{t.detail}</div>
                    </div>
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
