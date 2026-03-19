import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Glow from "@/components/ui/glow";
import { Section } from "@/components/ui/section";

export function CTASection() {
  return (
    <Section className="group relative overflow-hidden">
      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
        <h2 className="text-3xl leading-tight font-extrabold text-white tracking-tight sm:text-5xl sm:leading-tight">
          Ready to scale your outbound?
        </h2>
        <p className="text-lg text-white/50 max-w-xl">
          Join 200+ teams who ditched Google and Outlook for infrastructure that
          was actually built for cold email.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild className="rounded-full">
            <a href="https://app.coldrelay.com/auth/register">
              Start for $50/month
              <ArrowRightIcon className="size-4 ml-1" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild className="rounded-full">
            <a href="#calculator">
              Calculate your volume
            </a>
          </Button>
        </div>
      </div>
      <div className="absolute top-0 left-0 h-full w-full translate-y-[1rem] opacity-80 transition-all duration-500 ease-in-out group-hover:translate-y-[-2rem] group-hover:opacity-100">
        <Glow variant="bottom" />
      </div>
    </Section>
  );
}
