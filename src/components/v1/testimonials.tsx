const testimonials = [
  {
    quote: "641K+ prospects, 3.3% reply rate",
    name: "Agency Founder",
    detail: "1,000+ mailboxes",
    initials: "AF",
  },
  {
    quote: "Saved $4,200/month switching from Google",
    name: "B2B SaaS Growth Lead",
    detail: "600 mailboxes",
    initials: "GL",
  },
  {
    quote: "Setup took 3 hours. Everything automatic.",
    name: "Agency Owner",
    detail: "500 mailboxes",
    initials: "AO",
  },
  {
    quote: "Hit 97% inbox on day one",
    name: "Sales Ops Manager",
    detail: "300 mailboxes",
    initials: "SM",
  },
];

export default function Testimonials() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,rgba(148,163,184,0.25),transparent)1] md:py-20">
        {/* Section header */}
        <div className="mx-auto max-w-3xl pb-12 text-center">
          <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,#e5e7eb,#7B9BE0,#f9fafb,#93AADF,#e5e7eb)] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
            Real results from real teams
          </h2>
          <p className="text-lg text-[#7B9BE0]/65">
            Outbound teams switch to ColdRelay and never look back.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="mx-auto grid max-w-sm gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <article
              key={i}
              className="relative rounded-2xl bg-linear-to-br from-gray-900/50 via-gray-800/25 to-gray-900/50 p-6 backdrop-blur-xs border border-[#374151]"
              data-aos="fade-up"
              data-aos-delay={i * 100}
            >
              <div className="flex flex-col gap-4">
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="h-4 w-4 fill-[#4A73D5]"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                {/* Quote */}
                <p className="text-[#7B9BE0]/80 font-medium text-lg before:content-['\u201C'] after:content-['\u201D']">
                  {t.quote}
                </p>
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#4A73D5]/20 text-sm font-semibold text-[#4A73D5]">
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-200">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.detail}</div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
