import { Section } from "@/components/ui/section";

const stats = [
  {
    label: "deliverability",
    value: "95",
    suffix: "%+",
    description: "inbox placement rate across all clients",
  },
  {
    label: "lowest price",
    value: "$0.55",
    description: "per mailbox/month at scale",
  },
  {
    label: "setup time",
    value: "2-4",
    suffix: "hr",
    description: "from signup to sending",
  },
  {
    label: "capacity",
    value: "5,000",
    suffix: "+",
    description: "mailboxes managed and growing",
  },
];

export function StatsSection() {
  return (
    <Section>
      <div className="mx-auto max-w-[960px]">
        <div className="grid grid-cols-2 gap-12 sm:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-start gap-3 text-left"
            >
              <div className="text-white/40 text-sm font-semibold uppercase tracking-wider">
                {item.label}
              </div>
              <div className="flex items-baseline gap-1">
                <div className="text-4xl font-extrabold text-white drop-shadow-[0_0_24px_rgba(74,115,213,0.3)] sm:text-5xl md:text-6xl">
                  {item.value}
                </div>
                {item.suffix && (
                  <div className="text-xl font-bold text-[#4A73D5]">
                    {item.suffix}
                  </div>
                )}
              </div>
              <div className="text-white/40 text-sm font-medium">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
