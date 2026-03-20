import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "ColdRelay Terms of Service. Read our terms and conditions for using ColdRelay cold email infrastructure.",
  alternates: { canonical: "https://coldrelay.com/terms" },
};

export default function Terms() {
  return (
    <section className="pt-32 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="font-nacelle text-3xl font-semibold text-white mb-8">Terms of Service</h1>
        <div className="space-y-8 text-gray-300 leading-relaxed">

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">General Information</h2>
            <p>Welcome to ColdRelay! We&apos;re excited to help you enhance your cold email outreach and scale your business.</p>
            <p className="mt-3">ColdRelay is a software service designed to help businesses generate and manage email accounts for cold outreach, streamlining your efforts to book more meetings and close deals.</p>
            <p className="mt-3">By using our services, you agree to comply with and be bound by the following terms and conditions. Please review them carefully, and feel free to reach out if you have any questions.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Introduction</h2>
            <p>Welcome to ColdRelay (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;). Please take a moment to carefully read through our Terms of Service (&quot;Terms&quot;, &quot;Terms of Service&quot;). These Terms govern your use of our services and website at ColdRelay.com.</p>
            <p className="mt-3">Our Privacy Policy also governs your use of ColdRelay and explains how we collect, safeguard, and disclose information. Please read it at our <a href="/privacy" className="text-[#4A73D5] hover:underline">Privacy Policy</a> page.</p>
            <p className="mt-3">Your agreement with us includes these Terms and our Privacy Policy (&quot;Agreements&quot;). By using our services, you acknowledge that you have read and understood these Agreements and agree to be bound by them.</p>
            <p className="mt-3">If you do not agree, you may not use our service. For assistance, contact us at <a href="mailto:support@coldrelay.com" className="text-[#4A73D5] hover:underline">support@coldrelay.com</a>.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Communications</h2>
            <p>By creating an account, you agree to subscribe to newsletters and other marketing materials. You may opt out at any time by following the unsubscribe instructions.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Purchases</h2>
            <p>When purchasing through ColdRelay, you may need to provide personal and payment information, including your credit card details. You warrant that all information you provide is accurate, and you authorize ColdRelay to charge your selected payment method. We use third-party payment providers, like Stripe, and your information is processed under our Privacy Policy.</p>
            <p className="mt-3">We reserve the right to refuse or cancel any order due to errors, fraud, or if your industry is prohibited (e.g., crypto or political activities).</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Subscriptions</h2>
            <p>ColdRelay offers subscription-based services, billed on either a monthly or annual basis. At the end of each billing cycle, subscriptions automatically renew under the same conditions unless canceled. You may cancel through your online account or by contacting support.</p>
            <p className="mt-3">A valid payment method is required for recurring payments. If automatic billing fails, ColdRelay will notify you to proceed manually.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Fee Changes</h2>
            <p>We may change our subscription fees at the end of the current billing cycle. You will receive advance notice of any fee changes. Continued use of the service constitutes acceptance of the new rates.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Refunds</h2>
            <p>Paid subscription fees are non-refundable, except when required by law. However, if you see a deliverability score lower than 95% within the first 14 days, you are eligible for a refund. See our <a href="/refund" className="text-[#4A73D5] hover:underline">Refund Policy</a> for full details.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Prohibited Uses</h2>
            <p>You may only use ColdRelay for lawful purposes and agree not to engage in any activity such as:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li>Sending spam or violating CAN-SPAM laws</li>
              <li>Phishing or fraudulent emails</li>
              <li>Sending malicious content like viruses</li>
              <li>Harassing or intimidating individuals</li>
              <li>Participating in illegal activities or prohibited industries (e.g., crypto, political)</li>
              <li>Interfering with the functionality of ColdRelay or its users</li>
            </ul>
            <p className="mt-3">Violations may result in account suspension or termination. To report violations, contact <a href="mailto:support@coldrelay.com" className="text-[#4A73D5] hover:underline">support@coldrelay.com</a>.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Analytics</h2>
            <p>We use third-party analytics services, including PostHog, to monitor and analyze the use of our service. We may also use tracking pixels for marketing purposes. These tools help us understand how users interact with ColdRelay so we can improve the experience.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Accounts</h2>
            <p>When creating an account, you must be 18 or older and provide accurate, complete information. You are responsible for safeguarding your account and password. Providing inaccurate or outdated information may result in account termination.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Service Usage</h2>
            <p>ColdRelay must be used for business purposes only, following best practices for email sending. Any violations of these guidelines may result in account suspension or termination.</p>
          </div>

          <div className="pt-4 border-t border-[#1e293b]">
            <p className="text-sm text-gray-400">For any questions about these Terms, contact us at <a href="mailto:support@coldrelay.com" className="text-[#4A73D5] hover:underline">support@coldrelay.com</a>.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
