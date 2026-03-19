"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/Header";
import CruipHeader from "@/components/v1/header";

export function ConditionalHeader() {
  const pathname = usePathname();
  
  // Use the Cruip-style header on the homepage
  if (pathname === "/") {
    return <CruipHeader />;
  }
  
  // Use the existing header on all other pages
  return <Header />;
}
