import Image from "next/image";

const features = [
  {
    title: "150 Mailboxes Per Domain",
    description: "Google gives you 2. We give you 150. Do the math.",
    icon: (
      <svg className="mb-3 h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4h16v16H4V4z" stroke="#4A73D5" strokeWidth="2" />
        <path d="M4 4l8 6 8-6" stroke="#4A73D5" strokeWidth="2" />
        <path d="M8 12h8M8 15h5" stroke="#4A73D5" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "Dedicated IPs",
    description: "Your reputation is yours alone. No shared pools.",
    icon: (
      <svg className="mb-3 h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" stroke="#4A73D5" strokeWidth="2" />
        <path d="M12 12l9-5M12 12v10M12 12L3 7" stroke="#4A73D5" strokeWidth="2" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "Auto DNS Setup",
    description: "SPF, DKIM, DMARC configured in minutes. Not hours.",
    icon: (
      <svg className="mb-3 h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="#4A73D5" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" stroke="#4A73D5" strokeWidth="2" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "99% Inbox Guarantee",
    description: "Or your money back. We mean it.",
    icon: (
      <svg className="mb-3 h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#4A73D5" strokeWidth="2" />
        <path d="M9 12l2 2 4-4" stroke="#4A73D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "Send From Day 1",
    description: "No 2-week warmup wait. Start immediately.",
    icon: (
      <svg className="mb-3 h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#4A73D5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "2-4 Hour Setup",
    description: "From signup to sending. Fully automated.",
    icon: (
      <svg className="mb-3 h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="10" stroke="#4A73D5" strokeWidth="2" />
        <path d="M12 6v6l4 2" stroke="#4A73D5" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section id="features" className="relative">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-10 -mt-20 -translate-x-1/2"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src="/images/blurred-shape-gray.svg"
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -mb-80 -translate-x-[120%] opacity-50"
        aria-hidden="true"
      >
        <Image
          className="max-w-none"
          src="/images/blurred-shape.svg"
          width={760}
          height={668}
          alt="Blurred shape"
        />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,rgba(148,163,184,0.25),transparent)1] md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-4 text-center md:pb-12">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-[#7B9BE0]/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-[#7B9BE0]/50">
              <span className="inline-flex bg-linear-to-r from-[#4A73D5] to-[#7B9BE0] bg-clip-text text-transparent">
                Cold Email Infrastructure
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,#e5e7eb,#7B9BE0,#f9fafb,#93AADF,#e5e7eb)] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Everything you need to scale outbound
            </h2>
            <p className="text-lg text-gray-300">
              Built specifically for cold email. Not repurposed from consumer tools.
            </p>
          </div>
          {/* Items */}
          <div className="mx-auto grid max-w-sm gap-12 sm:max-w-none sm:grid-cols-2 md:gap-x-14 md:gap-y-16 lg:grid-cols-3">
            {features.map((feature, index) => (
              <article key={index}>
                {feature.icon}
                <h3 className="mb-1 font-nacelle text-[1rem] font-semibold text-gray-200">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
