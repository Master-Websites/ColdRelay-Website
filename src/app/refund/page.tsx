import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "ColdRelay refund policy. Our commitment to fair and transparent service.",
  alternates: { canonical: "https://coldrelay.com/refund" },
};

export default function RefundPolicy() {
  return (
    <section className="pt-32 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="font-nacelle text-3xl font-semibold text-white mb-8">Refund Policy</h1>
        <div className="space-y-8 text-gray-300 leading-relaxed">

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">General Information</h2>
            <p>At ColdRelay, we are dedicated to delivering exceptional email outreach services and support. However, we recognize that there may be instances where customers encounter issues. This refund policy outlines the conditions under which a refund may be issued and cases where refunds cannot be granted.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Non-Eligible Refunds</h2>
            <p>Refunds are NOT provided in the following situations:</p>
            <div className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Domain Purchases</h3>
                <p>All domain purchases are final. Domains cannot be refunded, but we can transfer ownership to the customer upon request.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">Non-adherence to Best Practices</h3>
                <p>Refunds will not be issued if the customer&apos;s misuse of email practices results in a decline in email or domain reputation. Misuse includes, but is not limited to, failing to use personalization or spintax, sending spam emails, using spam trigger words, or including excessive or disreputable links.</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Eligibility for Refund</h2>
            <p>Customers may be eligible for a refund of their most recent subscription payment if the following condition is met:</p>
            <div className="mt-3 p-4 rounded-lg border border-[#1e293b] bg-[#0f172a]">
              <p><strong className="text-white">Service Unavailability:</strong> If the email accounts were unusable for more than 14 days during a monthly billing cycle. &quot;Unusable&quot; refers to email accounts achieving less than 95% warm-up scores or significant technical issues preventing email delivery, which ColdRelay could not resolve promptly.</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Refund Process</h2>
            <p>To request a refund, eligible customers should contact our customer support team at <a href="mailto:support@coldrelay.com" className="text-[#4A73D5] hover:underline">support@coldrelay.com</a>. Once the request is reviewed and approved, the refund will be processed within one to two business days.</p>
            <p className="mt-3">By adhering to this policy, both ColdRelay and its customers can maintain a fair and transparent relationship focused on delivering high-quality service.</p>
          </div>

          <div className="pt-4 border-t border-[#1e293b]">
            <p className="text-sm text-gray-400">Last updated: March 2026</p>
          </div>

        </div>
      </div>
    </section>
  );
}
