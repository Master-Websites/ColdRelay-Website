"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

const resourceLinks = [
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/guides", label: "Guides" },
  { href: "/compare", label: "Compare" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/resources", label: "Resources" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
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
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0a]/70 backdrop-blur-2xl border-b border-white/[0.06] shadow-lg shadow-black/20"
          : "bg-[#0a0a0a]"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image
              src="/logo.svg"
              alt="ColdRelay"
              width={140}
              height={32}
              className="h-7 w-auto brightness-0 invert transition-opacity group-hover:opacity-80"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04] group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#4A73D5] group-hover:w-4/5 transition-all duration-300 rounded-full" />
              </Link>
            ))}

            {/* Resources Dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="relative px-3 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04] group flex items-center gap-1"
                onClick={() => setResourcesOpen(!resourcesOpen)}
              >
                Resources
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#4A73D5] group-hover:w-4/5 transition-all duration-300 rounded-full" />
              </button>

              <AnimatePresence>
                {resourcesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full left-0 mt-1 w-48 rounded-xl bg-[#141414] border border-white/[0.08] shadow-xl shadow-black/40 overflow-hidden py-1"
                  >
                    {resourceLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors"
                        onClick={() => setResourcesOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://app.coldrelay.com/auth/login"
              className="text-sm font-medium text-white/60 hover:text-white transition-colors px-3 py-2"
            >
              Log in
            </a>
            <a
              href="https://app.coldrelay.com/auth/register"
              className="relative inline-flex items-center gap-2 rounded-full bg-[#4A73D5] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/25 hover:shadow-[#4A73D5]/40 hover:bg-[#5A83E5] transition-all duration-300 hover:-translate-y-[1px] group overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <svg
                className="w-4 h-4 relative z-10 transition-transform group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-[#4A73D5] to-[#6B8FE6] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-white/[0.06] bg-[#0a0a0a]/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="block px-3 py-2 text-base font-medium text-white/70 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Resources accordion */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
              >
                <button
                  className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-white/70 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
                  onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                >
                  Resources
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${mobileResourcesOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <AnimatePresence>
                  {mobileResourcesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 space-y-1 pb-1">
                        {resourceLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className="block px-3 py-2 text-sm font-medium text-white/50 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
                            onClick={() => {
                              setMobileOpen(false);
                              setMobileResourcesOpen(false);
                            }}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <div className="pt-3 border-t border-white/[0.06] space-y-2">
                <a
                  href="https://app.coldrelay.com/auth/login"
                  className="block px-3 py-2 text-base font-medium text-white/70 hover:text-white"
                >
                  Log in
                </a>
                <a
                  href="https://app.coldrelay.com/auth/register"
                  className="block text-center rounded-full bg-[#4A73D5] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#4A73D5]/20"
                >
                  Get Started →
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
