import Link from "next/link";
import Image from "next/image";
import {
  Footer,
  FooterBottom,
  FooterColumn,
  FooterContent,
} from "@/components/ui/footer";

const columns = [
  {
    title: "Product",
    links: [
      { text: "Features", href: "/features" },
      { text: "Pricing", href: "/pricing" },
      { text: "Get Started", href: "https://app.coldrelay.com/auth/register", external: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { text: "Blog", href: "/blog" },
      { text: "Guides", href: "/guides" },
      { text: "Compare", href: "/compare" },
      { text: "Use Cases", href: "/use-cases" },
      { text: "Resources", href: "/resources" },
    ],
  },
  {
    title: "Company",
    links: [
      { text: "About", href: "/about" },
      { text: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { text: "Privacy Policy", href: "/privacy" },
      { text: "Terms of Service", href: "/terms" },
    ],
  },
];

export function FooterSection() {
  return (
    <footer className="w-full px-4 bg-[#0a0a0a] border-t border-white/[0.06] relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#4A73D5]/30 to-transparent" />
      <div className="mx-auto max-w-7xl">
        <Footer>
          <FooterContent>
            <FooterColumn className="col-span-2 sm:col-span-3 md:col-span-1">
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src="/logo.svg"
                  alt="ColdRelay"
                  width={120}
                  height={28}
                  className="h-6 w-auto brightness-0 invert opacity-70"
                />
              </Link>
              <p className="text-sm text-white/40 max-w-xs">
                Cold email infrastructure that actually delivers. Set up at
                scale, send with confidence.
              </p>
            </FooterColumn>
            {columns.map((column) => (
              <FooterColumn key={column.title}>
                <h3 className="text-sm font-semibold text-white/80 pt-1">
                  {column.title}
                </h3>
                {column.links.map((link) =>
                  "external" in link && link.external ? (
                    <a
                      key={link.text}
                      href={link.href}
                      className="text-sm text-white/40 hover:text-[#6B8FE6] transition-colors"
                    >
                      {link.text}
                    </a>
                  ) : (
                    <Link
                      key={link.text}
                      href={link.href}
                      className="text-sm text-white/40 hover:text-[#6B8FE6] transition-colors"
                    >
                      {link.text}
                    </Link>
                  )
                )}
              </FooterColumn>
            ))}
          </FooterContent>
          <FooterBottom>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span>© {new Date().getFullYear()} ColdRelay. All rights reserved.</span>
              <span className="hidden sm:inline text-white/15">·</span>
              <Link href="/contact" className="hover:text-[#6B8FE6] transition-colors">
                Contact Us
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com/coldrelay"
                className="text-white/30 hover:text-[#4A73D5] transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/coldrelay"
                className="text-white/30 hover:text-[#4A73D5] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
