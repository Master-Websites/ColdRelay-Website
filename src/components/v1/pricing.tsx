"use client";

import { useState } from "react";

const tiers = [
  { range: "50–149", price: "$1.00", popular: false },
  { range: "150–499", price: "$0.85", popular: false },
  { range: "500–999", price: "$0.70", popular: true },
  { range: "1,000+", price: "$0.55", popular: false },
];

export default function Pricing() {
  const [mailboxes, setMailboxes] = useState(150);

  const getPrice = (count: number) => {
    if (count >= 1000) return 0.55;
    if (count >= 500) return 0.70;
    if (count >= 150) return 0.85;
    return 1.00;
  };

  const price = getPrice(mailboxes);
  const total = (mailboxes * price).toFixed(0);
  const googleCost = (mailboxes * 7).toFixed(0);
  const savings = (mailboxes * 7 - mailboxes * price).toFixed(0);

  return (
    <section id="calculator" className="relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,rgba(148,163,184,0.25),transparent)1] md:py-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-16">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-[#7B9BE0]/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-[#7B9BE0]/50">
              <span className="inline-flex bg-linear-to-r from-[#4A73D5] to-[#7B9BE0] bg-clip-text text-transparent">
                Simple Pricing
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,#e5e7eb,#7B9BE0,#f9fafb,#93AADF,#e5e7eb)] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              Pay per mailbox. No surprises.
            </h2>
            <p className="text-lg text-gray-300">
              The more mailboxes you add, the less you pay. Starting at $50/month.
            </p>
          </div>

          {/* Pricing tiers */}
          <div className="mx-auto grid max-w-sm gap-6 sm:max-w-none sm:grid-cols-2 lg:grid-cols-4 pb-12 md:pb-16">
            {tiers.map((tier, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-6 text-center ${
                  tier.popular
                    ? "bg-[#4A73D5]/10 border border-[#4A73D5]/30"
                    : "bg-gray-900/50 border border-[#374151]"
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-[#4A73D5] px-3 py-0.5 text-xs font-medium text-white">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-sm text-gray-400 mb-2">{tier.range} mailboxes</div>
                <div className="text-3xl font-nacelle font-semibold text-white mb-1">{tier.price}</div>
                <div className="text-sm text-gray-400">per mailbox/mo</div>
              </div>
            ))}
          </div>

          {/* Calculator */}
          <div className="mx-auto max-w-xl" data-aos="fade-up">
            <div className="relative rounded-2xl bg-gray-900/50 p-8 border border-[#374151]">
              <h3 className="text-center font-nacelle text-lg font-semibold text-gray-200 mb-6">
                Cost Calculator
              </h3>
              <div className="mb-6">
                <label className="block text-sm text-gray-400 mb-2">
                  How many mailboxes? <span className="text-white font-semibold">{mailboxes}</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="50"
                  value={mailboxes}
                  onChange={(e) => setMailboxes(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer bg-gray-700 accent-[#4A73D5]"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>50</span>
                  <span>500</span>
                  <span>1,000</span>
                  <span>2,000</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-nacelle font-semibold text-[#4A73D5]">${total}</div>
                  <div className="text-xs text-gray-400">ColdRelay/mo</div>
                </div>
                <div>
                  <div className="text-2xl font-nacelle font-semibold text-red-400">${googleCost}</div>
                  <div className="text-xs text-gray-400">Google/mo</div>
                </div>
                <div>
                  <div className="text-2xl font-nacelle font-semibold text-[#7B9BE0]">${savings}</div>
                  <div className="text-xs text-gray-400">You save/mo</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
