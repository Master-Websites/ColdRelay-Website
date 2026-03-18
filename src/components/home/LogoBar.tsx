"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";

const tools = [
  "Instantly",
  "Smartlead",
  "Apollo",
  "Salesforge",
  "Woodpecker",
  "QuickMail",
  "Lemlist",
];

export function LogoBar() {
  return (
    <section className="relative border-y border-white/[0.06] bg-[#0a0a0a]">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-xs font-semibold text-white/30 tracking-widest uppercase mb-6">
            Works with every sending tool you already use
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {tools.map((tool) => (
              <div
                key={tool}
                className="text-base font-semibold text-white/20 hover:text-white/40 transition-colors duration-300 cursor-default"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
