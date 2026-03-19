"use client";


import Spotlight from "./spotlight";

const steps = [
  {
    image: "/images/workflow-01.png",
    badge: "Set Up in Minutes",
    description:
      "Tell us your volume. We calculate mailboxes and domains. One click and your infrastructure is building. No manual DNS. No spreadsheets.",
  },
  {
    image: "/images/workflow-02.png",
    badge: "Scale Without Limits",
    description:
      "Start with 50 mailboxes. Scale to 5,000+. Volume discounts kick in automatically. No new contracts. No waiting.",
  },
  {
    image: "/images/workflow-03.png",
    badge: "Connect & Send",
    description:
      "Plug SMTP credentials into Instantly, Smartlead, or any tool. Your infrastructure is ready. Start sending from day one.",
  },
];

export default function HowItWorks() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-gradient-to-r before:from-transparent before:to-[#7B9BE0]/50 after:h-px after:w-8 after:bg-gradient-to-l after:from-transparent after:to-[#7B9BE0]/50">
              <span className="inline-flex bg-gradient-to-r from-[#4A73D5] to-[#7B9BE0] bg-clip-text text-transparent">
                From Zero to Sending
              </span>
            </div>
            <h2
              className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,#e5e7eb,#7B9BE0,#f9fafb,#93AADF,#e5e7eb)] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl"
            >
              Three steps. Four hours. Done.
            </h2>
            <p className="text-lg text-gray-300">
              Simple and fast. No onboarding calls, no manual configuration, no weeks of waiting. Just infrastructure that works.
            </p>
          </div>

          {/* Spotlight cards */}
          <Spotlight className="group mx-auto grid max-w-sm items-start gap-6 lg:max-w-none lg:grid-cols-3">
            {steps.map((step, index) => (
              <a
                key={index}
                className="group/card relative h-full overflow-hidden rounded-2xl bg-[#1f2937] p-px before:pointer-events-none before:absolute before:-left-40 before:-top-40 before:z-10 before:h-80 before:w-80 before:translate-x-[var(--mouse-x)] before:translate-y-[var(--mouse-y)] before:rounded-full before:bg-[#4A73D5]/80 before:opacity-0 before:blur-3xl before:transition-opacity before:duration-500 after:pointer-events-none after:absolute after:-left-48 after:-top-48 after:z-30 after:h-64 after:w-64 after:translate-x-[var(--mouse-x)] after:translate-y-[var(--mouse-y)] after:rounded-full after:bg-[#4A73D5] after:opacity-0 after:blur-3xl after:transition-opacity after:duration-500 hover:after:opacity-20 group-hover:before:opacity-100"
                href="#0"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="relative z-20 h-full overflow-hidden rounded-[inherit] bg-[#030712] after:absolute after:inset-0 after:bg-gradient-to-br after:from-[#111827]/50 after:via-[#1f2937]/25 after:to-[#111827]/50">
                  {/* Arrow */}
                  <div
                    className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-[#374151]/50 bg-[#1f2937]/65 text-gray-200 opacity-0 transition-opacity group-hover/card:opacity-100"
                    aria-hidden="true"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width={9} height={8} fill="none">
                      <path fill="#F4F4F5" d="m4.92 8-.787-.763 2.733-2.68H0V3.443h6.866L4.133.767 4.92 0 9 4 4.92 8Z" />
                    </svg>
                  </div>
                  {/* Image */}
                  <img
                    className="inline-flex w-full"
                    src={step.image}
                    width={350}
                    height={288}
                    alt={step.badge}
                  />
                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-3">
                      <span className="rounded-full border border-[#374151] bg-[#1f2937]/40 px-2.5 py-0.5 text-xs font-normal">
                        <span className="bg-gradient-to-r from-[#4A73D5] to-[#7B9BE0] bg-clip-text text-transparent">
                          {step.badge}
                        </span>
                      </span>
                    </div>
                    <p className="text-gray-300">{step.description}</p>
                  </div>
                </div>
              </a>
            ))}
          </Spotlight>
        </div>
      </div>
    </section>
  );
}
