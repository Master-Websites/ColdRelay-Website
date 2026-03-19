export default function Workflows() {
  const googlePains = [
    "2 mailboxes per domain",
    "$7/mailbox/month",
    "Manual DNS for every domain",
    "2-4 week warmup period",
    "Shared IPs with spammers",
    "Spreadsheets to track passwords",
  ];

  const coldrelayBenefits = [
    "150 mailboxes per domain",
    "As low as $0.55/mailbox",
    "Auto DNS in minutes",
    "Send from day 1",
    "Dedicated IPs, your reputation",
    "One dashboard for everything",
  ];

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="pb-12 md:pb-20">
          {/* Section header */}
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-16">
            <div className="inline-flex items-center gap-3 pb-3 before:h-px before:w-8 before:bg-linear-to-r before:from-transparent before:to-[#7B9BE0]/50 after:h-px after:w-8 after:bg-linear-to-l after:from-transparent after:to-[#7B9BE0]/50">
              <span className="inline-flex bg-linear-to-r from-[#4A73D5] to-[#7B9BE0] bg-clip-text text-transparent">
                The Problem
              </span>
            </div>
            <h2 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,#e5e7eb,#7B9BE0,#f9fafb,#93AADF,#e5e7eb)] bg-[length:200%_auto] bg-clip-text pb-4 font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
              You didn&apos;t sign up to be an IT admin.
            </h2>
            <p className="text-lg text-[#7B9BE0]/65">
              But here you are. Creating your 30th Google Workspace. Manually adding DKIM records at 2am. Keeping a spreadsheet of 100 passwords. Waiting 4 weeks for domains to warm up while your competitors are already sending.
            </p>
          </div>

          {/* Comparison */}
          <div className="grid gap-8 md:grid-cols-2" data-aos="fade-up">
            {/* Google/Outlook Pain */}
            <div className="relative rounded-2xl bg-gray-900/50 p-6 md:p-8 border border-[#374151]">
              <h3 className="mb-6 font-nacelle text-xl font-semibold text-gray-200">
                <span className="text-red-400">Google / Outlook</span>
              </h3>
              <ul className="space-y-4">
                {googlePains.map((pain, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#7B9BE0]/65">{pain}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ColdRelay Benefits */}
            <div className="relative rounded-2xl bg-[#4A73D5]/5 p-6 md:p-8 border border-[#4A73D5]/30">
              <h3 className="mb-6 font-nacelle text-xl font-semibold text-gray-200">
                <span className="text-[#4A73D5]">ColdRelay</span>
              </h3>
              <ul className="space-y-4">
                {coldrelayBenefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="mt-0.5 h-5 w-5 shrink-0 text-[#4A73D5]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    <span className="text-[#7B9BE0]/65">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
