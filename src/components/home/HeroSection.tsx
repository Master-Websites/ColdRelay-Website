import { ArrowRightIcon, StarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Glow from "@/components/ui/glow";
import { Section } from "@/components/ui/section";

export function HeroSection() {
  return (
    <Section className="overflow-hidden pb-0 sm:pb-0 md:pb-0 relative">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-10">
          {/* Badge */}
          <Badge variant="outline" className="animate-fade-in">
            <span className="text-white/50">As low as</span>
            <span className="text-[#6B8FE6] font-bold">$0.55/mailbox</span>
          </Badge>

          {/* Headline */}
          <h1 className="animate-fade-in relative z-10 inline-block text-4xl leading-tight font-extrabold tracking-tight text-white sm:text-6xl sm:leading-tight md:text-7xl md:leading-tight">
            What would{" "}
            <span className="gradient-text-static">100,000</span> more cold
            emails do to your pipeline?
          </h1>

          {/* Subheadline */}
          <p className="text-md animate-fade-in relative z-10 max-w-[740px] font-medium text-white/60 text-balance sm:text-xl">
            Advanced Azure cold email infrastructure. 150 mailboxes per domain —
            not 2. Auto DNS. Auto warmup. 99% inbox guaranteed. Ready in hours,
            not weeks.
          </p>

          {/* CTAs */}
          <div className="animate-fade-in relative z-10 flex flex-col sm:flex-row justify-center gap-4">
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

          {/* Social proof */}
          <div className="animate-fade-in flex items-center gap-2 text-sm text-white/50">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className="size-4 fill-[#4A73D5] text-[#4A73D5]"
                />
              ))}
            </div>
            <span>Trusted by 200+ outbound teams</span>
          </div>
        </div>
      </div>

      {/* Glow effect */}
      <div className="relative mt-16 w-full">
        <Glow variant="top" />
      </div>
    </Section>
  );
}
