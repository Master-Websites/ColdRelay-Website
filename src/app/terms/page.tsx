import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "ColdRelay terms of service. Rules and guidelines for using our platform.",
  alternates: { canonical: "https://coldrelay.com/terms" },
};

export default function TermsPage() {
  return (
    <div className="pt-8 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8">
          Terms of Service
        </h1>
        <p className="text-sm text-white/40 mb-8">Last updated: March 2026</p>

        <div className="prose">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using ColdRelay (&quot;the Service&quot;), you agree to be bound
            by these Terms of Service. If you do not agree, do not use the Service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            ColdRelay provides cold email infrastructure services, including domain
            management, mailbox provisioning, DNS configuration, and deliverability
            monitoring. The Service is intended for cold email outreach only.
          </p>

          <h2>3. Account Registration</h2>
          <p>
            You must provide accurate information when creating an account. You are
            responsible for maintaining the security of your account credentials
            and for all activity under your account.
          </p>

          <h2>4. Acceptable Use</h2>
          <p>You agree to use ColdRelay only for lawful cold email outreach. You must not:</p>
          <ul>
            <li>Send spam or unsolicited bulk email that violates applicable laws</li>
            <li>Violate CAN-SPAM, GDPR, or other applicable email regulations</li>
            <li>Send emails containing malware, phishing, or fraudulent content</li>
            <li>Use the Service for harassment or illegal purposes</li>
            <li>Attempt to circumvent our security measures or abuse our infrastructure</li>
          </ul>

          <h2>5. Pricing and Payment</h2>
          <p>
            Pricing is based on the number of mailboxes provisioned, billed monthly.
            Domain purchases are one-time costs. We reserve the right to adjust
            pricing with 30 days notice.
          </p>

          <h2>6. Deliverability Guarantee</h2>
          <p>
            We guarantee 95%+ deliverability for the first 14 days. If deliverability
            falls below this threshold due to our infrastructure (not your content or
            practices), you are entitled to a full refund for that period.
          </p>

          <h2>7. Service Level</h2>
          <p>
            We strive for 99.9% uptime but do not guarantee uninterrupted service.
            Scheduled maintenance will be communicated in advance when possible.
          </p>

          <h2>8. Termination</h2>
          <p>
            Either party may terminate this agreement at any time. We may suspend
            or terminate your account immediately if you violate these terms or
            our acceptable use policy.
          </p>

          <h2>9. Limitation of Liability</h2>
          <p>
            ColdRelay&apos;s liability is limited to the amount you paid for the Service
            in the 12 months preceding the claim. We are not liable for indirect,
            incidental, or consequential damages.
          </p>

          <h2>10. Changes to Terms</h2>
          <p>
            We may update these terms from time to time. Continued use of the Service
            after changes constitutes acceptance of the new terms.
          </p>

          <h2>11. Contact</h2>
          <p>
            For questions about these terms, contact us at{" "}
            <a href="mailto:legal@coldrelay.com">legal@coldrelay.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
