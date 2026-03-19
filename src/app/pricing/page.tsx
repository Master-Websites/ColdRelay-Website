import type { Metadata } from "next";
import { PricingContent } from "./PricingContent";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "ColdRelay pricing starts at $1.00/mailbox per month. Volume discounts down to $0.55/mailbox. 95% cheaper than Google Workspace.",
  alternates: { canonical: "https://coldrelay.com/pricing" },
};

export default function PricingPage() {
  return <PricingContent />;
}
