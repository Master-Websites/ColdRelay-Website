import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anti-Spam Policy",
  description: "ColdRelay Anti-Spam Policy. Our commitment to ethical and compliant email outreach.",
  alternates: { canonical: "https://coldrelay.com/anti-spam" },
};

export default function AntiSpam() {
  return (
    <section className="pt-32 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h1 className="font-nacelle text-3xl font-semibold text-white mb-8">Anti-Spam Policy</h1>
        <div className="space-y-8 text-gray-300 leading-relaxed">

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">General Information</h2>
            <p>At ColdRelay, we prioritize ethical and compliant email outreach. Our platform is designed to help users achieve effective B2B communication while strictly adhering to regulations like the CAN-SPAM Act and other relevant laws. We believe that ensuring high deliverability is a shared responsibility, and by maintaining these standards, we ensure the best experience for all users.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Compliance and User Responsibility</h2>
            <p>We expect all ColdRelay users to follow email marketing best practices and comply with legal guidelines. While we provide tools to assist in compliance, it is the responsibility of the user to ensure their campaigns meet all applicable regulations. Failure to comply may result in corrective actions, including potential account suspension. Our priority, however, is to work with users to improve their email practices and avoid any issues.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Improving Email Sending Behavior</h2>
            <p>If a user&apos;s sending behavior violates laws or ColdRelay&apos;s standards, we will engage with them directly, offering guidance and resources to help improve their email marketing strategies. Our aim is to foster a collaborative environment where users can continuously enhance their outreach efforts.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Prohibited Sending Purposes</h2>
            <p>To maintain compliance and deliverability, ColdRelay strictly prohibits the following types of email campaigns:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li><strong className="text-white">Phishing:</strong> Fraudulent emails pretending to be someone else for the purpose of deception.</li>
              <li><strong className="text-white">Illegal Activities:</strong> Promoting or facilitating illegal actions.</li>
              <li><strong className="text-white">Low Quality:</strong> Emails with high bounce or complaint rates.</li>
              <li><strong className="text-white">Malicious Content:</strong> Emails containing malware, viruses, or harmful code.</li>
              <li><strong className="text-white">Harassment:</strong> Intimidating or threatening emails targeting individuals or groups.</li>
              <li><strong className="text-white">Interference:</strong> Emails that could disrupt or impair ColdRelay&apos;s service or other platforms.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Prohibited Sending Content</h2>
            <p>ColdRelay does not permit emails containing:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li>Illegal products or services</li>
              <li>Content violating CAN-SPAM, GDPR, or other laws</li>
              <li>Pornography or explicit material</li>
              <li>Escort services</li>
              <li>Pharmaceutical products</li>
              <li>Gambling-related content</li>
              <li>Multi-level marketing schemes</li>
              <li>Get-rich-quick opportunities</li>
              <li>Credit repair or debt relief services</li>
              <li>Payday loans</li>
              <li>Social media like/follower selling services</li>
              <li>Content harmful to ColdRelay&apos;s reputation or deliverability</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Appropriate Mailing Lists</h2>
            <p>For all outreach campaigns to unsolicited recipients, users must ensure:</p>
            <ul className="list-disc ml-6 mt-3 space-y-2">
              <li>A valid company name and postal address are included.</li>
              <li>The reason for contact is clearly disclosed.</li>
              <li>A clear and easy-to-use opt-out option, which is processed within 7 days.</li>
              <li>The message adds value to the recipient.</li>
              <li>The recipient&apos;s company email address, not personal emails, is used.</li>
              <li>Full compliance with all applicable regulations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-3">Conclusion</h2>
            <p>ColdRelay is committed to supporting users in running ethical and successful email campaigns. By following these guidelines, users contribute to a healthier email ecosystem and ensure the best results from their outreach efforts. If you have questions or need assistance with your email practices, our team is always available to help.</p>
          </div>

          <div className="pt-4 border-t border-[#1e293b]">
            <p className="text-sm text-gray-400">For questions, contact us at <a href="mailto:support@coldrelay.com" className="text-[#4A73D5] hover:underline">support@coldrelay.com</a>.</p>
          </div>

        </div>
      </div>
    </section>
  );
}
