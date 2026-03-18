"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="relative bg-[#111111] border-b border-white/[0.06] py-2.5 px-4 text-center text-sm"
    >
      <div className="flex items-center justify-center gap-2 text-white/60">
        <span className="inline-flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4A73D5] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4A73D5]" />
          </span>
          <span className="font-medium">
            Cold email infrastructure starting at{" "}
            <span className="text-white font-bold">$1/mailbox</span>. Volume
            discounts down to{" "}
            <span className="text-[#6B8FE6] font-bold">$0.55</span>.
          </span>
        </span>
        <a
          href="#calculator"
          className="inline-flex items-center gap-1 text-[#4A73D5] hover:text-[#6B8FE6] font-semibold transition-colors"
        >
          Calculate your cost
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg>
        </a>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors p-1"
        aria-label="Close announcement"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </motion.div>
  );
}
