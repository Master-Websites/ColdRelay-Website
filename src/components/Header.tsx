"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Navbar,
  NavbarLeft,
  NavbarRight,
} from "@/components/ui/navbar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

const resourceLinks = [
  { href: "/blog", label: "Blog" },
  { href: "/guides", label: "Guides" },
  { href: "/compare", label: "Compare" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/resources", label: "Resources" },
];

export function Header() {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    <header className="sticky top-0 z-50 -mb-4 px-4 pb-4">
      <div className="absolute left-0 h-24 w-full bg-[#0a0a0a]/80 backdrop-blur-xl" />
      <div className="relative mx-auto max-w-7xl">
        <Navbar>
          <NavbarLeft>
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="ColdRelay"
                width={140}
                height={32}
                className="h-7 w-auto brightness-0 invert"
                priority
              />
            </Link>
            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-1 ml-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
                >
                  {link.label}
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
                  className="px-3 py-2 text-sm font-medium text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04] flex items-center gap-1"
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                >
                  Resources
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`} />
                </button>
                {resourcesOpen && (
                  <div className="absolute top-full left-0 mt-1 w-48 rounded-xl bg-[#141414] border border-white/[0.08] shadow-xl shadow-black/40 overflow-hidden py-1 animate-fade-in">
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
                  </div>
                )}
              </div>
            </nav>
          </NavbarLeft>
          <NavbarRight>
            <a
              href="https://app.coldrelay.com/auth/login"
              className="hidden text-sm font-medium text-white/60 hover:text-white transition-colors md:block"
            >
              Log in
            </a>
            <Button asChild className="hidden md:inline-flex rounded-full">
              <a href="https://app.coldrelay.com/auth/register">
                Get Started
              </a>
            </Button>
            {/* Mobile menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0 md:hidden">
                  <Menu className="size-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <nav className="grid gap-6 text-lg font-medium mt-8">
                  <Link href="/" className="flex items-center gap-2">
                    <Image
                      src="/logo.svg"
                      alt="ColdRelay"
                      width={120}
                      height={28}
                      className="h-6 w-auto brightness-0 invert"
                    />
                  </Link>
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  {resourceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                  <a
                    href="https://app.coldrelay.com/auth/register"
                    className="mt-4 block text-center rounded-full bg-[#4A73D5] px-4 py-2.5 text-sm font-semibold text-white"
                  >
                    Get Started →
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </NavbarRight>
        </Navbar>
      </div>
    </header>
  );
}
