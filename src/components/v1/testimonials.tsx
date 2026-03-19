"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const testimonials = [
  {
    quote:
      "We contacted 641,000+ prospects over 12 weeks and saw a 3.3% positive reply rate. ColdRelay\u2019s infrastructure handled the volume without a single deliverability issue.",
    name: "Jake Brennan",
    title: "CEO at ScaleOutbound",
    detail: "1,000+ mailboxes",
    initials: "JB",
  },
  {
    quote:
      "Switching from Google Workspace saved us $4,200/month. Same inbox rates. The dedicated IPs make all the difference.",
    name: "Sarah Chen",
    title: "VP Growth at PipelineForge",
    detail: "500+ mailboxes",
    initials: "SC",
  },
  {
    quote:
      "Setup took 3 hours. DNS, DKIM, SPF, DMARC \u2014 everything configured automatically. We were sending the same day.",
    name: "Marcus Rivera",
    title: "Founder at ReplyStack Agency",
    detail: "200+ mailboxes",
    initials: "MR",
  },
  {
    quote:
      "We tested ColdRelay against Mailreef and Hypertide. ColdRelay hit 97% inbox on day one. The others took 2 weeks to stabilize.",
    name: "Eric Walsh",
    title: "Sales Ops at DealFlow.io",
    detail: "300+ mailboxes",
    initials: "EW",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const total = testimonials.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  // Touch/swipe support
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  const t = testimonials[current];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="border-t py-12 [border-image:linear-gradient(to_right,transparent,rgba(148,163,184,0.25),transparent)1] md:py-20">
        {/* Section header */}
        <div className="mx-auto max-w-3xl pb-12 text-center">
          <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,#e5e7eb,#7B9BE0,#f9fafb,#93AADF,#e5e7eb)] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
            Real results from real teams
          </h2>
          <p className="text-lg text-gray-300">
            Outbound teams switch to ColdRelay and never look back.
          </p>
        </div>

        {/* Slider */}
        <div
          className="relative flex items-center gap-4 md:gap-8"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Prev button */}
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#374151] bg-[#111827] text-gray-400 transition-colors hover:border-[#4A73D5]/50 hover:text-white"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Testimonial card */}
          <div className="flex-1 rounded-2xl border border-[#374151] bg-[#111827] p-8 md:p-12">
            {/* Stars */}
            <div className="mb-6 flex gap-1">
              {[...Array(5)].map((_, j) => (
                <svg
                  key={j}
                  className="h-5 w-5 fill-amber-400"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="mb-8 text-xl leading-relaxed text-white md:text-2xl">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#4A73D5]/20 text-sm font-bold text-[#4A73D5]">
                {t.initials}
              </div>
              <div>
                <div className="font-semibold text-white">{t.name}</div>
                <div className="text-sm text-gray-400">
                  {t.title} &middot; {t.detail}
                </div>
              </div>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#374151] bg-[#111827] text-gray-400 transition-colors hover:border-[#4A73D5]/50 hover:text-white"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.5 5L12.5 10L7.5 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 bg-[#4A73D5]"
                  : "w-2.5 bg-[#374151] hover:bg-[#4A73D5]/40"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
