export default function HowItWorks() {
  return (
    <section className="relative">
      {/* CSS keyframe animations for the cards */}
      <style>{`
        @keyframes hw-pulse {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
        }
        @keyframes hw-spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes hw-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-20 md:py-28">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-[#4A73D5]/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-[#4A73D5]/50">
              <span className="inline-flex bg-linear-to-r from-[#4A73D5] to-[#7B9BE0] bg-clip-text text-transparent">
                How It Works
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,#e5e7eb,#7B9BE0,#f9fafb,#93AADF,#e5e7eb)] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              From zero to sending in 3 steps
            </h2>
            <p className="text-lg text-[#7B9BE0]/65">
              No DevOps. No DNS headaches. No waiting weeks.
            </p>
          </div>

          {/* Cards */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Card 1: Set Up in Minutes */}
            <div
              className="group relative rounded-2xl border border-[#374151] bg-[#111827] p-8 transition-all duration-300 hover:border-[#4A73D5]/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#4A73D5]/5"
              data-aos="fade-up"
            >
              {/* Illustration with blue glow — pulse animation */}
              <div className="relative mb-8 flex h-56 items-center justify-center">
                {/* Blue glow behind SVG */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-40 w-40 rounded-full bg-[#4A73D5]/10 blur-2xl" />
                </div>
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ animation: "hw-pulse 3s ease-in-out infinite" }}
                >
                  {/* Stacked config panels */}
                  <rect x="20" y="25" width="80" height="30" rx="6" fill="#1E293B" stroke="#374151" strokeWidth="1.5" />
                  <rect x="28" y="33" width="32" height="4" rx="2" fill="#4A73D5" opacity="0.6" />
                  <rect x="28" y="42" width="20" height="4" rx="2" fill="#374151" />
                  <circle cx="82" cy="40" r="6" fill="#4A73D5" opacity="0.2" />
                  <path d="M79.5 40L81 41.5L84.5 38" stroke="#4A73D5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="24" y="65" width="72" height="30" rx="6" fill="#1E293B" stroke="#374151" strokeWidth="1.5" />
                  <rect x="32" y="73" width="40" height="4" rx="2" fill="#4A73D5" opacity="0.4" />
                  <rect x="32" y="82" width="24" height="4" rx="2" fill="#374151" />
                  <circle cx="82" cy="80" r="6" fill="#4A73D5" opacity="0.2" />
                  <path d="M79.5 80L81 81.5L84.5 78" stroke="#4A73D5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              {/* Badge */}
              <div className="mb-3 inline-flex rounded-full border border-[#4A73D5]/20 bg-[#4A73D5]/10 px-3 py-1">
                <span className="text-xs font-medium text-[#7B9BE0]">Step 1</span>
              </div>

              <h3 className="mb-3 font-nacelle text-xl font-semibold text-white">
                Set Up in Minutes
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Tell us your volume. We calculate mailboxes and domains. One click and your infrastructure is building.
              </p>
            </div>

            {/* Card 2: Scale Without Limits */}
            <div
              className="group relative rounded-2xl border border-[#374151] bg-[#111827] p-8 transition-all duration-300 hover:border-[#4A73D5]/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#4A73D5]/5"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              {/* Illustration with blue glow — slow rotation on dial */}
              <div className="relative mb-8 flex h-56 items-center justify-center">
                {/* Blue glow behind SVG */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-40 w-40 rounded-full bg-[#4A73D5]/10 blur-2xl" />
                </div>
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                >
                  {/* Circular dial with numbers */}
                  <circle cx="60" cy="60" r="40" stroke="#374151" strokeWidth="1.5" fill="#1E293B" />
                  <circle cx="60" cy="60" r="32" stroke="#374151" strokeWidth="0.75" fill="none" />
                  {/* Scale marks — rotating slowly */}
                  <g style={{ animation: "hw-spin-slow 20s linear infinite", transformOrigin: "60px 60px" }}>
                    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => {
                      const rad = (angle * Math.PI) / 180;
                      const x1 = 60 + 36 * Math.cos(rad);
                      const y1 = 60 + 36 * Math.sin(rad);
                      const x2 = 60 + 40 * Math.cos(rad);
                      const y2 = 60 + 40 * Math.sin(rad);
                      return (
                        <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#4A73D5" strokeWidth="1.5" opacity="0.4" />
                      );
                    })}
                    {/* Indicator arc */}
                    <path d="M 26.1 80.5 A 40 40 0 1 1 93.9 80.5" stroke="#4A73D5" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.6" />
                  </g>
                  {/* Center number */}
                  <text x="60" y="56" textAnchor="middle" fill="#4A73D5" fontSize="20" fontWeight="600" fontFamily="sans-serif">5K+</text>
                  <text x="60" y="72" textAnchor="middle" fill="#6B7280" fontSize="9" fontFamily="sans-serif">MAILBOXES</text>
                </svg>
              </div>

              {/* Badge */}
              <div className="mb-3 inline-flex rounded-full border border-[#4A73D5]/20 bg-[#4A73D5]/10 px-3 py-1">
                <span className="text-xs font-medium text-[#7B9BE0]">Step 2</span>
              </div>

              <h3 className="mb-3 font-nacelle text-xl font-semibold text-white">
                Scale Without Limits
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Start with 50 mailboxes. Scale to 5,000+. Volume discounts kick in automatically. No new contracts.
              </p>
            </div>

            {/* Card 3: Connect & Send */}
            <div
              className="group relative rounded-2xl border border-[#374151] bg-[#111827] p-8 transition-all duration-300 hover:border-[#4A73D5]/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#4A73D5]/5"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              {/* Illustration with blue glow — float animation */}
              <div className="relative mb-8 flex h-56 items-center justify-center">
                {/* Blue glow behind SVG */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-40 w-40 rounded-full bg-[#4A73D5]/10 blur-2xl" />
                </div>
                <svg
                  width="200"
                  height="200"
                  viewBox="0 0 120 120"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="relative opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ animation: "hw-float 3s ease-in-out infinite" }}
                >
                  {/* Connection/integration icon */}
                  {/* Left node */}
                  <rect x="10" y="42" width="36" height="36" rx="8" fill="#1E293B" stroke="#374151" strokeWidth="1.5" />
                  <text x="28" y="64" textAnchor="middle" fill="#4A73D5" fontSize="10" fontWeight="600" fontFamily="sans-serif" opacity="0.8">SMTP</text>
                  {/* Right node */}
                  <rect x="74" y="42" width="36" height="36" rx="8" fill="#1E293B" stroke="#374151" strokeWidth="1.5" />
                  <circle cx="92" cy="56" r="3" fill="#4A73D5" opacity="0.6" />
                  <circle cx="86" cy="64" r="2" fill="#4A73D5" opacity="0.4" />
                  <circle cx="98" cy="64" r="2" fill="#4A73D5" opacity="0.4" />
                  {/* Connection arrow */}
                  <line x1="48" y1="60" x2="72" y2="60" stroke="#4A73D5" strokeWidth="2" strokeDasharray="4 3" opacity="0.6" />
                  <path d="M68 55L74 60L68 65" stroke="#4A73D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
                  {/* Signal waves */}
                  <path d="M92 34C96 34 100 37 100 42" stroke="#4A73D5" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
                  <path d="M92 28C100 28 106 35 106 42" stroke="#4A73D5" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" />
                </svg>
              </div>

              {/* Badge */}
              <div className="mb-3 inline-flex rounded-full border border-[#4A73D5]/20 bg-[#4A73D5]/10 px-3 py-1">
                <span className="text-xs font-medium text-[#7B9BE0]">Step 3</span>
              </div>

              <h3 className="mb-3 font-nacelle text-xl font-semibold text-white">
                Connect & Send
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Plug SMTP credentials into Instantly, Smartlead, or any tool. Your infrastructure is ready. Start sending.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
