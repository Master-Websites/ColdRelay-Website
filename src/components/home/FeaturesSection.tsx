import {
  ServerIcon,
  ShieldCheckIcon,
  ZapIcon,
  GlobeIcon,
  BarChart3Icon,
  HeadphonesIcon,
} from "lucide-react";
import { Item, ItemDescription, ItemIcon, ItemTitle } from "@/components/ui/item";
import { Section } from "@/components/ui/section";

const features = [
  {
    icon: <ServerIcon className="size-5 stroke-[1.5]" />,
    title: "150 Mailboxes per Domain",
    description:
      "Not 2. Azure infrastructure lets you pack 100–150 mailboxes per domain, cutting domain costs by 95%.",
  },
  {
    icon: <ShieldCheckIcon className="size-5 stroke-[1.5]" />,
    title: "Dedicated IPs & Isolation",
    description:
      "Your own IP addresses on isolated tenants. No shared reputation risk from other senders.",
  },
  {
    icon: <ZapIcon className="size-5 stroke-[1.5]" />,
    title: "Auto DNS Configuration",
    description:
      "SPF, DKIM, DMARC, and MX records set up automatically. No DNS zone files to edit manually.",
  },
  {
    icon: <GlobeIcon className="size-5 stroke-[1.5]" />,
    title: "Auto Warmup Built In",
    description:
      "Mailboxes are warmed up automatically from day one. 99% inbox placement guaranteed or your money back.",
  },
  {
    icon: <BarChart3Icon className="size-5 stroke-[1.5]" />,
    title: "Scale Without Limits",
    description:
      "From 100 to 20,000+ emails per day. Volume pricing gets cheaper as you grow — as low as $0.55/mailbox.",
  },
  {
    icon: <HeadphonesIcon className="size-5 stroke-[1.5]" />,
    title: "Priority Onboarding",
    description:
      "White-glove setup support. We help configure your sending tools and verify everything is dialed in.",
  },
];

export function FeaturesSection() {
  return (
    <Section>
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 sm:gap-16">
        <div className="text-center">
          <h2 className="text-3xl leading-tight font-extrabold text-white tracking-tight sm:text-5xl sm:leading-tight">
            Everything you need. Nothing you don&apos;t.
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-xl mx-auto">
            Built from the ground up for one thing: getting cold emails into the primary inbox.
          </p>
        </div>
        <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Item
              key={feature.title}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors"
            >
              <ItemTitle className="flex items-center gap-2 text-base">
                <ItemIcon>
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-[#4A73D5]/10">
                    {feature.icon}
                  </div>
                </ItemIcon>
                {feature.title}
              </ItemTitle>
              <ItemDescription className="max-w-none">
                {feature.description}
              </ItemDescription>
            </Item>
          ))}
        </div>
      </div>
    </Section>
  );
}
