import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "ColdRelay refund policy. 99% inbox placement guarantee or your money back.",
  alternates: { canonical: "https://coldrelay.com/refund" },
};

export default function RefundPolicy() {
  return (
    <section className="pt-32 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="font-nacelle text-3xl font-semibold text-white mb-8">Refund Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-gray-300">
          <p className="text-sm text-gray-400">Last updated: March 2026</p>

          <h2 className="text-xl font-semibold text-white mt-8">99% Inbox Placement Guarantee</h2>
          <p>ColdRelay guarantees 99% inbox placement when you follow our sending best practices outlined in the ColdRelay application. If your emails are not landing in the primary inbox at 99%+ within 14 days of proper warmup, we will diagnose and fix the issue at no cost. If we cannot resolve the deliverability issue, you are entitled to a full refund of your most recent monthly payment.</p>

          <h2 className="text-xl font-semibold text-white mt-8">Eligibility for Refund</h2>
          <p>To be eligible for a refund under our inbox placement guarantee, you must:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Have followed the sending best practices outlined in the ColdRelay application</li>
            <li>Have allowed a minimum of 14 days for domain warmup</li>
            <li>Not have exceeded the recommended daily sending limits per mailbox</li>
            <li>Have properly configured your sending tool (Instantly, Smartlead, etc.) according to our guidelines</li>
            <li>Not have sent content that violates CAN-SPAM or other anti-spam regulations</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8">How to Request a Refund</h2>
          <p>To request a refund, contact our support team at <a href="mailto:support@coldrelay.com" className="text-[#4A73D5] hover:underline">support@coldrelay.com</a> with:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Your account email address</li>
            <li>A description of the deliverability issue</li>
            <li>Screenshots or data showing inbox placement rates</li>
            <li>Confirmation that you followed the best practices outlined in the app</li>
          </ul>

          <h2 className="text-xl font-semibold text-white mt-8">Refund Processing</h2>
          <p>Approved refunds will be processed within 5-10 business days and returned to the original payment method. Refunds apply to the most recent monthly billing cycle only.</p>

          <h2 className="text-xl font-semibold text-white mt-8">Domain Purchases</h2>
          <p>Domain purchases ($15/domain) are non-refundable as domains are registered and configured immediately upon purchase. However, domains remain yours and can be transferred to another provider if you choose to cancel your ColdRelay subscription.</p>

          <h2 className="text-xl font-semibold text-white mt-8">Cancellation</h2>
          <p>You may cancel your ColdRelay subscription at any time. Cancellation takes effect at the end of your current billing cycle. No partial refunds are given for unused time within a billing period.</p>

          <h2 className="text-xl font-semibold text-white mt-8">Contact Us</h2>
          <p>For any questions about this refund policy, please contact us at <a href="mailto:support@coldrelay.com" className="text-[#4A73D5] hover:underline">support@coldrelay.com</a>.</p>
        </div>
      </div>
    </section>
  );
}
