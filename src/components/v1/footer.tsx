export default function Footer() {
  return (
    <footer>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 justify-between gap-12 py-8 sm:grid-rows-[auto_auto] md:grid-cols-4 md:grid-rows-[auto_auto] md:py-12 lg:grid-cols-[repeat(4,minmax(0,140px))_1fr] lg:grid-rows-1 xl:gap-20">
          {/* Product */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-gray-400 transition hover:text-[#4A73D5]" href="#features">
                  Features
                </a>
              </li>
              <li>
                <a className="text-gray-400 transition hover:text-[#4A73D5]" href="#calculator">
                  Pricing
                </a>
              </li>
              <li>
                <a className="text-gray-400 transition hover:text-[#4A73D5]" href="#faq">
                  FAQ
                </a>
              </li>
              <li>
                <a className="text-gray-400 transition hover:text-[#4A73D5]" href="https://app.coldrelay.com/auth/register">
                  Get Started
                </a>
              </li>
            </ul>
          </div>
          {/* Free Tools */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">Free Tools</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-gray-400 transition hover:text-[#4A73D5]" href="/tools/email-deliverability-test">
                  Deliverability Test
                </a>
              </li>
              <li>
                <a className="text-gray-400 transition hover:text-[#4A73D5]" href="/tools/spf-generator">
                  SPF Generator
                </a>
              </li>
              <li>
                <a className="text-gray-400 transition hover:text-[#4A73D5]" href="/tools/dkim-generator">
                  DKIM Generator
                </a>
              </li>
              <li>
                <a className="text-gray-400 transition hover:text-[#4A73D5]" href="/tools/dmarc-generator">
                  DMARC Generator
                </a>
              </li>
              <li>
                <a className="text-gray-400 transition hover:text-[#4A73D5]" href="/tools">
                  All Tools →
                </a>
              </li>
            </ul>
          </div>
          {/* Resources */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="text-gray-400 transition hover:text-[#4A73D5]" href="/blog">
                  Blog
                </a>
              </li>
              <li>
                <a className="text-gray-400 transition hover:text-[#4A73D5]" href="/compare">
                  Compare
                </a>
              </li>
              <li>
                <a className="text-gray-400 transition hover:text-[#4A73D5]" href="/guides">
                  Guides
                </a>
              </li>
              <li>
                <a className="text-gray-400 transition hover:text-[#4A73D5]" href="/use-cases">
                  Use Cases
                </a>
              </li>
            </ul>
          </div>
          {/* Compatible With */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-200">Compatible With</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-400">Instantly</span></li>
              <li><span className="text-gray-400">Smartlead</span></li>
              <li><span className="text-gray-400">Lemlist</span></li>
              <li><span className="text-gray-400">EmailBison</span></li>
              <li><span className="text-gray-400">Any IMAP/SMTP</span></li>
            </ul>
          </div>
          {/* Logo + Legal */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:text-right">
            <div className="mb-3">
              <img src="/coldrelay-logo-white.svg" alt="ColdRelay" className="h-6 lg:ml-auto" />
            </div>
            <div className="text-sm">
              <p className="mb-3 text-gray-400">
                © {new Date().getFullYear()} ColdRelay
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-gray-400 lg:justify-end">
                <a className="transition hover:text-[#4A73D5]" href="/terms">Terms</a>
                <span className="text-gray-700">·</span>
                <a className="transition hover:text-[#4A73D5]" href="/privacy">Privacy</a>
                <span className="text-gray-700">·</span>
                <a className="transition hover:text-[#4A73D5]" href="/refund">Refund Policy</a>
              </div>
              <ul className="mt-3 inline-flex gap-1">
                <li>
                  <a className="flex items-center justify-center text-[#4A73D5] transition hover:text-[#7B9BE0]" href="https://twitter.com/coldrelay" aria-label="Twitter">
                    <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="m13.063 9 3.495 4.475L20.601 9h2.454l-5.359 5.931L24 23h-4.938l-3.866-4.893L10.771 23H8.316l5.735-6.342L8 9h5.063Zm-.74 1.347h-1.457l8.875 11.232h1.36l-8.778-11.232Z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a className="flex items-center justify-center text-[#4A73D5] transition hover:text-[#7B9BE0]" href="https://linkedin.com/company/coldrelay" aria-label="LinkedIn">
                    <svg className="h-8 w-8 fill-current" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7zM12.7 21.6h-2.3V13h2.4v8.6h-.1zM11.6 12c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 9.6h-2.4v-4.2c0-1-.4-1.7-1.3-1.7-.7 0-1.1.5-1.3 1-.1.1-.1.3-.1.5v4.4H14V13h2.3v1.2c.3-.5.9-1.2 2.2-1.2 1.6 0 2.8 1 2.8 3.2v5.4h.3z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
