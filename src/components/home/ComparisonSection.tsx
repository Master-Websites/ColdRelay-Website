"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";

const rows = [
  { label: "Mailboxes per domain", cr: "100-150", google: "2", ms: "2-5" },
  { label: "Domains for 1,000 mailboxes", cr: "7-10", google: "500", ms: "200-500" },
  { label: "Domain cost for 1,000 mailboxes", cr: "~$150/yr", google: "~$7,500/yr", ms: "~$3,000-7,500/yr" },
  { label: "Price per mailbox", cr: "$1.00 (as low as $0.55)", google: "$7.00", ms: "$6.00" },
  { label: "Dedicated IPs", cr: "yes", google: "no", ms: "no" },
  { label: "Isolated tenant", cr: "yes", google: "no", ms: "no" },
  { label: "Auto DNS", cr: "yes", google: "no", ms: "no" },
  { label: "Setup time", cr: "2-4 hours", google: "Days", ms: "Days" },
  { label: "Inbox guarantee", cr: "99% or refund", google: "None", ms: "None" },
  { label: "Built for cold email", cr: "yes", google: "no", ms: "no" },
];

function CellValue({ val, isHighlight }: { val: string; isHighlight?: boolean }) {
  if (val === "yes") {
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#4A73D5]/20">
        <svg className="w-3 h-3 text-[#4A73D5]" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
      </span>
    );
  }
  if (val === "no") {
    return (
      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/[0.04]">
        <svg className="w-3 h-3 text-white/20" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </span>
    );
  }
  return (
    <span className={isHighlight ? "text-[#6B8FE6] font-bold" : "text-white/50"}>
      {val}
    </span>
  );
}

export function ComparisonSection() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] overflow-hidden" id="comparison">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A73D5]/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-4">
              <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              <span className="text-sm text-white/60 font-medium">
                The comparison
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              ColdRelay vs Google vs Microsoft
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  <th className="text-left p-4 sm:p-5 text-white/40 font-medium w-[30%]" />
                  <th className="p-4 sm:p-5 text-center bg-[#4A73D5]/[0.04] border-l border-white/[0.06]">
                    <span className="text-[#4A73D5] font-bold">ColdRelay</span>
                  </th>
                  <th className="p-4 sm:p-5 text-center border-l border-white/[0.06]">
                    <span className="text-white/40 font-semibold">Google Workspace</span>
                  </th>
                  <th className="p-4 sm:p-5 text-center border-l border-white/[0.06]">
                    <span className="text-white/40 font-semibold">Microsoft 365</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-b border-white/[0.04] ${
                      i % 2 === 0 ? "bg-white/[0.01]" : ""
                    }`}
                  >
                    <td className="p-4 sm:p-5 text-white/60 font-medium">
                      {row.label}
                    </td>
                    <td className="p-4 sm:p-5 text-center bg-[#4A73D5]/[0.04] border-l border-white/[0.06]">
                      <CellValue val={row.cr} isHighlight />
                    </td>
                    <td className="p-4 sm:p-5 text-center border-l border-white/[0.06]">
                      <CellValue val={row.google} />
                    </td>
                    <td className="p-4 sm:p-5 text-center border-l border-white/[0.06]">
                      <CellValue val={row.ms} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.25}>
          <p className="mt-8 text-center text-sm text-white/40 max-w-2xl mx-auto">
            <strong className="text-white/60">Bottom line:</strong> Google and
            Microsoft are email providers. ColdRelay is{" "}
            <span className="text-[#4A73D5] font-bold">cold email infrastructure</span>.
            Built from the ground up for one thing: getting your cold emails
            into the primary inbox at scale.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
