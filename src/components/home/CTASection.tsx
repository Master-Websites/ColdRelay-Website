export function CTASection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-br from-teal-500/10 via-green-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
          Ready to scale your
          <br />
          <span className="gradient-text">cold email infrastructure?</span>
        </h2>
        <p className="mt-6 text-lg text-white/50 max-w-2xl mx-auto">
          Join outbound teams sending millions of emails per month on infrastructure built for deliverability. 
          Set up in hours, not weeks.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://app.coldrelay.com/auth/register"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-green-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:brightness-110 transition-all hover:-translate-y-0.5"
          >
            Get Started — It&apos;s Free to Try
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 py-3.5 text-base font-medium text-white/70 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all"
          >
            Talk to Sales
          </a>
        </div>

        <p className="mt-6 text-sm text-white/30">
          No credit card required • 14-day deliverability guarantee • 24/7 support
        </p>
      </div>
    </section>
  );
}
