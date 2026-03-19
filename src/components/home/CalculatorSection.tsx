import { Section } from "@/components/ui/section";
import Calculator from "@/components/Calculator";

export function CalculatorSection() {
  return (
    <Section id="calculator" className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Calculate your setup
          </h2>
          <p className="mt-4 text-lg text-white/50 max-w-xl mx-auto">
            See exactly what you need and what it costs. No hidden fees.
          </p>
        </div>
        <Calculator />
      </div>
    </Section>
  );
}
