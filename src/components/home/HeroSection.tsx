"use client";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-br from-teal-500/10 via-green-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/5 px-4 py-1.5 mb-8 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-sm font-medium text-teal-400">
            95% cheaper than Google Workspace
          </span>
        </div>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] animate-fade-in-up"
          style={{ animationDelay: "0.1s", animationFillMode: "both" }}
        >
          Cold Email Infrastructure
          <br />
          <span className="gradient-text">That Actually Delivers</span>
        </h1>

        {/* Subheadline */}
        <p
          className="mt-6 text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          Domains, mailboxes, DNS, dedicated IPs — all set up automatically in 2-4 hours. 
          Scale from 50 to 5,000+ mailboxes with 95%+ deliverability guaranteed.
        </p>

        {/* CTA buttons */}
        <div
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.3s", animationFillMode: "both" }}
        >
          <a
            href="https://app.coldrelay.com/auth/register"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-500 to-green-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-500/25 hover:shadow-teal-500/40 hover:brightness-110 transition-all hover:-translate-y-0.5"
          >
            Start Sending Today
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
            </svg>
          </a>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-8 py-3.5 text-base font-medium text-white/70 hover:text-white hover:bg-white/[0.06] hover:border-white/20 transition-all"
          >
            View Pricing
          </a>
        </div>

        {/* Stats */}
        <div
          className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-8 animate-fade-in-up"
          style={{ animationDelay: "0.4s", animationFillMode: "both" }}
        >
          {[
            { value: "95%+", label: "Deliverability" },
            { value: "$0.55", label: "Per mailbox/mo" },
            { value: "2-4hr", label: "Setup time" },
            { value: "5,000+", label: "Mailbox capacity" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-extrabold gradient-text">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-white/40">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
