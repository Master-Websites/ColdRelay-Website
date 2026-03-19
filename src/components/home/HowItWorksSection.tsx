import { GlobeIcon, MailIcon, RocketIcon } from "lucide-react";
import { Item, ItemDescription, ItemIcon, ItemTitle } from "@/components/ui/item";
import { Section } from "@/components/ui/section";

const steps = [
  {
    icon: <GlobeIcon className="size-5 stroke-[1.5]" />,
    title: "1. Tell us your volume",
    description:
      "Use our calculator to figure out how many mailboxes and domains you need. We handle the rest.",
  },
  {
    icon: <MailIcon className="size-5 stroke-[1.5]" />,
    title: "2. We set up everything",
    description:
      "Domains, DNS records, mailboxes, dedicated IPs, and warmup — all configured automatically in 2–4 hours.",
  },
  {
    icon: <RocketIcon className="size-5 stroke-[1.5]" />,
    title: "3. Start sending",
    description:
      "Connect to Instantly, Smartlead, or any sending tool. Your infrastructure is ready. Hit send.",
  },
];

export function HowItWorksSection() {
  return (
    <Section>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 sm:gap-16">
        <div className="text-center">
          <h2 className="text-3xl leading-tight font-extrabold text-white tracking-tight sm:text-5xl sm:leading-tight">
            Up and running in three steps
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-xl mx-auto">
            No IT team required. No DNS headaches. Just results.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-8">
          {steps.map((step) => (
            <Item
              key={step.title}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8"
            >
              <ItemIcon className="mb-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#4A73D5]/10">
                  {step.icon}
                </div>
              </ItemIcon>
              <ItemTitle className="text-lg">{step.title}</ItemTitle>
              <ItemDescription className="max-w-none text-base">
                {step.description}
              </ItemDescription>
            </Item>
          ))}
        </div>
      </div>
    </Section>
  );
}
