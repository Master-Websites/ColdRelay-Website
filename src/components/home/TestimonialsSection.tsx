const testimonials = [
  {
    quote:
      "We contacted 641,000+ prospects over 12 weeks and saw a 3.3% positive reply rate. ColdRelay's infrastructure handled the volume without a single deliverability issue.",
    author: "Agency founder",
    role: "1,000+ mailboxes",
    metric: "641K+ prospects reached",
  },
  {
    quote:
      "Switching from Google Workspace to ColdRelay saved us thousands per month. Same deliverability, fraction of the cost. The dedicated IPs make all the difference.",
    author: "B2B SaaS Growth Lead",
    role: "500+ mailboxes",
    metric: "95%+ inbox placement",
  },
  {
    quote:
      "Setup took 3 hours. DNS, DKIM, SPF, DMARC — everything was configured automatically. We were sending the same day we signed up.",
    author: "Outbound Agency Owner",
    role: "200+ mailboxes",
    metric: "3-hour setup to sending",
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Trusted by{" "}
            <span className="gradient-text">outbound teams</span>
          </h2>
          <p className="mt-4 text-lg text-white/50">
            Teams running serious cold email volume rely on ColdRelay infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 flex flex-col"
            >
              {/* Metric badge */}
              <div className="inline-flex self-start items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/5 px-3 py-1 mb-4">
                <span className="text-xs font-medium text-teal-400">
                  {t.metric}
                </span>
              </div>

              <blockquote className="text-white/70 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-4 pt-4 border-t border-white/[0.06]">
                <div className="font-semibold text-white text-sm">{t.author}</div>
                <div className="text-xs text-white/40">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
