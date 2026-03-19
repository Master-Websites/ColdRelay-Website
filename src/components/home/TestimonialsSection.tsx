import { StarIcon } from "lucide-react";
import { Section } from "@/components/ui/section";

const testimonials = [
  {
    quote:
      "We went from 500 to 5,000 emails/day in a week. ColdRelay handled the entire setup — domains, DNS, warmup. Our reply rate doubled.",
    name: "Sarah K.",
    role: "Head of Growth, B2B SaaS",
  },
  {
    quote:
      "The cost savings alone made it a no-brainer. We were spending $7/mailbox on Google. Now it's $0.70. That's 90% less for better deliverability.",
    name: "Marcus R.",
    role: "Founder, Lead Gen Agency",
  },
  {
    quote:
      "I've tried every cold email infrastructure out there. ColdRelay is the only one that actually delivers on the promise of hands-off setup.",
    name: "James L.",
    role: "VP Sales, Enterprise Tech",
  },
];

export function TestimonialsSection() {
  return (
    <Section className="relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A73D5]/20 to-transparent" />

      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Trusted by outbound teams
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-xl mx-auto">
            See what teams are saying about ColdRelay infrastructure.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 flex flex-col gap-6"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="size-4 fill-[#4A73D5] text-[#4A73D5]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/70 text-sm leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author */}
              <div>
                <div className="text-white font-semibold text-sm">{t.name}</div>
                <div className="text-white/40 text-xs">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
