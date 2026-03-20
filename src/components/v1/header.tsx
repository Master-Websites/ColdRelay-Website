"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function CruipHeader() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const mobileNav = useRef<HTMLDivElement>(null);
  const hamburger = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resourceLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/guides", label: "Guides" },
    { href: "/compare", label: "Compare" },
    { href: "/use-cases", label: "Use Cases" },
    { href: "/resources", label: "Resources" },
  ];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on click outside
  useEffect(() => {
    const clickHandler = (e: MouseEvent) => {
      if (
        !mobileNavOpen ||
        !mobileNav.current ||
        !hamburger.current
      )
        return;
      if (
        !mobileNav.current.contains(e.target as Node) &&
        !hamburger.current.contains(e.target as Node)
      ) {
        setMobileNavOpen(false);
      }
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [mobileNavOpen]);

  // Close mobile nav on escape
  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, []);

  // Close resources dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setResourcesOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setResourcesOpen(false), 150);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-gray-900/90 backdrop-blur-sm border-b border-[#1e293b]/50"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Link
              href="/"
              className="inline-flex shrink-0 items-center"
              aria-label="ColdRelay"
            >
              <img src="/coldrelay-logo-white.svg" alt="ColdRelay" className="h-8" />
            </Link>
          </div>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/features"
              className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
            >
              Pricing
            </Link>

            {/* Resources Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
                onClick={() => setResourcesOpen(!resourcesOpen)}
              >
                Resources
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    resourcesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </button>

              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 rounded-xl bg-gray-900 border border-[#1e293b]/50 shadow-xl shadow-black/40 overflow-hidden py-1">
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/[0.06] transition-colors"
                      onClick={() => setResourcesOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/tools"
              className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
            >
              Tools
            </Link>
            <a
              href="https://outbound.community/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-sm text-gray-300 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
            >
              Community
            </a>
          </nav>

          {/* CTA buttons */}
          <ul className="hidden md:flex flex-1 items-center justify-end gap-3">
            <li>
              <a
                href="https://app.coldrelay.com/auth/login"
                className="rounded-full border border-[#374151] text-gray-300 px-4 py-2 text-sm font-medium hover:text-white hover:border-gray-500 transition-colors"
              >
                Sign In
              </a>
            </li>
            <li>
              <a
                href="https://app.coldrelay.com/auth/register"
                className="rounded-full bg-[#4A73D5] text-white px-4 py-2 text-sm font-medium hover:bg-[#3A5DB5] transition-colors"
              >
                Get Started
              </a>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            ref={hamburger}
            className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            aria-controls="mobile-nav"
            aria-expanded={mobileNavOpen}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <span className="sr-only">Menu</span>
            {mobileNavOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        ref={mobileNav}
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileNavOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-[#1e293b]/50 bg-gray-900/95 backdrop-blur-sm px-4 py-4 space-y-1">
          <Link
            href="/features"
            className="block px-3 py-2 text-base text-gray-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
            onClick={() => setMobileNavOpen(false)}
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="block px-3 py-2 text-base text-gray-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
            onClick={() => setMobileNavOpen(false)}
          >
            Pricing
          </Link>

          {/* Mobile Resources */}
          <div>
            <button
              className="flex items-center justify-between w-full px-3 py-2 text-base text-gray-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
              onClick={() => setResourcesOpen(!resourcesOpen)}
            >
              Resources
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  resourcesOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            {resourcesOpen && (
              <div className="pl-4 space-y-1 pb-1">
                {resourceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
                    onClick={() => {
                      setMobileNavOpen(false);
                      setResourcesOpen(false);
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/tools"
            className="block px-3 py-2 text-base text-gray-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
            onClick={() => setMobileNavOpen(false)}
          >
            Tools
          </Link>
          <a
            href="https://outbound.community/"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 text-base text-gray-300 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
            onClick={() => setMobileNavOpen(false)}
          >
            Community
          </a>

          <div className="pt-3 border-t border-[#1e293b]/50 space-y-2">
            <a
              href="https://app.coldrelay.com/auth/login"
              className="block px-3 py-2 text-base text-gray-300 hover:text-white"
            >
              Sign In
            </a>
            <a
              href="https://app.coldrelay.com/auth/register"
              className="block text-center rounded-full bg-[#4A73D5] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20"
            >
              Get Started →
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
