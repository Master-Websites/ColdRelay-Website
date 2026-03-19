"use client";

import { useState } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[#4A73D5]/20 bg-[#4A73D5]/5 p-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#4A73D5]/10 mb-4">
          <svg
            className="w-6 h-6 text-[#6B8FE6]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Message sent!</h3>
        <p className="text-white/50">
          We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/60 mb-1.5">
            Name
          </label>
          <input
            type="text"
            required
            className="w-full rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-[#4A73D5]/30 focus:ring-1 focus:ring-[#4A73D5]/20 transition-all"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/60 mb-1.5">
            Email
          </label>
          <input
            type="email"
            required
            className="w-full rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-[#4A73D5]/30 focus:ring-1 focus:ring-[#4A73D5]/20 transition-all"
            placeholder="you@company.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/60 mb-1.5">
          Company
        </label>
        <input
          type="text"
          className="w-full rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-[#4A73D5]/30 focus:ring-1 focus:ring-[#4A73D5]/20 transition-all"
          placeholder="Company name (optional)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/60 mb-1.5">
          How many emails/day are you looking to send?
        </label>
        <select className="w-full rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-white outline-none focus:border-[#4A73D5]/30 focus:ring-1 focus:ring-[#4A73D5]/20 transition-all">
          <option value="" className="bg-[#0a0a0a]">
            Select a range
          </option>
          <option value="100-500" className="bg-[#0a0a0a]">
            100–500 emails/day
          </option>
          <option value="500-1000" className="bg-[#0a0a0a]">
            500–1,000 emails/day
          </option>
          <option value="1000-3000" className="bg-[#0a0a0a]">
            1,000–3,000 emails/day
          </option>
          <option value="3000-10000" className="bg-[#0a0a0a]">
            3,000–10,000 emails/day
          </option>
          <option value="10000+" className="bg-[#0a0a0a]">
            10,000+ emails/day
          </option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/60 mb-1.5">
          Message
        </label>
        <textarea
          rows={4}
          required
          className="w-full rounded-xl border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-white placeholder:text-white/30 outline-none focus:border-[#4A73D5]/30 focus:ring-1 focus:ring-[#4A73D5]/20 transition-all resize-none"
          placeholder="Tell us about your needs..."
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-full bg-gradient-to-b from-[#4A73D5] to-[#3A5DB5] hover:brightness-110 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#4A73D5]/20 hover:shadow-[#4A73D5]/30 transition-all"
      >
        Send Message
      </button>
    </form>
  );
}
