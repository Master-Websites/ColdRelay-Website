import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "ColdRelay privacy policy. How we collect, use, and protect your data.",
  alternates: { canonical: "https://coldrelay.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-8">
          Privacy Policy
        </h1>
        <p className="text-sm text-white/40 mb-8">Last updated: March 2026</p>

        <div className="prose">
          <h2>1. Information We Collect</h2>
          <p>
            When you use ColdRelay, we collect information necessary to provide our
            services, including:
          </p>
          <ul>
            <li>Account information (name, email, company)</li>
            <li>Payment information (processed securely through our payment provider)</li>
            <li>Usage data (domains, mailboxes, sending activity)</li>
            <li>Technical data (IP address, browser type, device information)</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use your information to:</p>
          <ul>
            <li>Provide and maintain our email infrastructure services</li>
            <li>Process payments and manage your account</li>
            <li>Monitor deliverability and protect against blocklisting</li>
            <li>Communicate with you about your account and our services</li>
            <li>Improve our platform and develop new features</li>
          </ul>

          <h2>3. Data Sharing</h2>
          <p>
            We do not sell your personal information. We may share data with:
          </p>
          <ul>
            <li>Service providers who help us operate our platform (hosting, payment processing)</li>
            <li>Legal authorities when required by law</li>
          </ul>

          <h2>4. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect
            your data. Each customer&apos;s infrastructure is isolated in dedicated Azure
            tenants with dedicated IPs.
          </p>

          <h2>5. Data Retention</h2>
          <p>
            We retain your data for as long as your account is active or as needed to
            provide services. You can request deletion of your data at any time.
          </p>

          <h2>6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal data</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing of your data</li>
            <li>Export your data</li>
          </ul>

          <h2>7. Cookies</h2>
          <p>
            We use essential cookies to operate our platform and analytics cookies to
            understand usage patterns. You can control cookie settings through your
            browser.
          </p>

          <h2>8. Changes to This Policy</h2>
          <p>
            We may update this policy from time to time. We&apos;ll notify you of
            significant changes via email or through our platform.
          </p>

          <h2>9. Contact</h2>
          <p>
            For privacy-related inquiries, contact us at{" "}
            <a href="mailto:privacy@coldrelay.com">privacy@coldrelay.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
