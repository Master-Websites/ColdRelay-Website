import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";

const tools = [
  { name: "Instantly", initial: "I" },
  { name: "Smartlead", initial: "S" },
  { name: "Lemlist", initial: "L" },
  { name: "EmailBison", initial: "E" },
  { name: "Clay", initial: "C" },
];

export function LogoBar() {
  return (
    <Section className="py-12 sm:py-16 md:py-20">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <Badge variant="brand" className="text-xs">
            Works with your favorite tools
          </Badge>
          <h2 className="text-lg font-semibold text-white/80 sm:text-xl">
            Plug ColdRelay into your existing cold email stack
          </h2>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="flex items-center gap-2.5 text-sm font-medium text-white/50 hover:text-white/70 transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08]">
                <span className="text-xs font-bold text-white/40">
                  {tool.initial}
                </span>
              </div>
              <span>{tool.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
