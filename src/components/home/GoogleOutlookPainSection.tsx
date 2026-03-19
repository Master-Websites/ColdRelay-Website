import { XIcon, CheckIcon, AlertTriangleIcon, ShieldIcon } from "lucide-react";
import { Section } from "@/components/ui/section";

const painPoints = [
  "2 mailboxes per domain limit",
  "Shared IPs with millions of spammers",
  "$7/mailbox/month at scale",
  "Manual DNS setup per domain",
  "Account bans for cold outreach",
  "No dedicated infrastructure",
];

const benefits = [
  "150 mailboxes per domain",
  "Dedicated IPs on isolated tenants",
  "As low as $0.55/mailbox/month",
  "Automatic DNS configuration",
  "Built specifically for cold email",
  "Enterprise-grade deliverability",
];

export function GoogleOutlookPainSection() {
  return (
    <Section className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A73D5]/20 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
            <AlertTriangleIcon className="w-4 h-4 text-white/40" />
            <span className="text-sm text-white/60 font-medium">
              The problem
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            You didn&apos;t sign up to be an IT admin
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-2xl mx-auto">
            Google and Outlook were built for business email, not cold outreach
            at scale. Here&apos;s what that means for your team.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Pain side */}
          <div className="rounded-2xl border border-red-500/10 bg-red-500/[0.02] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-red-500/10">
                <XIcon className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Google / Outlook
              </h3>
            </div>
            <ul className="space-y-4">
              {painPoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-5 h-5 rounded-full bg-red-500/10 flex items-center justify-center">
                      <XIcon className="w-3 h-3 text-red-400" />
                    </div>
                  </div>
                  <span className="text-white/60 text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Benefits side */}
          <div className="rounded-2xl border border-[#4A73D5]/20 bg-[#4A73D5]/[0.03] p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#4A73D5]/10">
                <ShieldIcon className="w-5 h-5 text-[#4A73D5]" />
              </div>
              <h3 className="text-xl font-bold text-white">ColdRelay</h3>
            </div>
            <ul className="space-y-4">
              {benefits.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-5 h-5 rounded-full bg-[#4A73D5]/10 flex items-center justify-center">
                      <CheckIcon className="w-3 h-3 text-[#4A73D5]" />
                    </div>
                  </div>
                  <span className="text-white/70 text-sm">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}
