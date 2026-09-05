"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, ChevronDown, ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "#about", hasDropdown: false },
  { label: "Platform", href: "#platform", hasDropdown: true },
  { label: "How It Works", href: "#how-it-works", hasDropdown: false },
  { label: "GIS Explorer", href: "#gis", hasDropdown: false },
  { label: "Resources", href: "#resources", hasDropdown: true },
  { label: "Contact", href: "#contact", hasDropdown: false },
];

export default function MainNavigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-[#D8E3EE] shadow-sm">
      <div
        className="mx-auto flex items-center justify-between px-6 lg:px-10"
        style={{ maxWidth: "1500px", height: "90px" }}
      >
        {/* ── LEFT: Emblem + Brand ─────────────────────── */}
        <div className="flex items-center gap-0 shrink-0">
          {/* Government of India Emblem */}
          <a href="/" aria-label="NLAMS Home" className="flex items-center gap-3 no-underline" style={{ textDecoration: "none" }}>
            <div className="relative shrink-0" style={{ width: 64, height: 64 }}>
              <Image
                src="/images/government-of-india.png"
                alt="Government of India Emblem"
                fill
                className="object-contain"
                sizes="64px"
                priority
              />
            </div>

            {/* Brand text */}
            <div className="flex flex-col justify-center leading-tight">
              <span
                className="font-extrabold text-[#0B3A68] leading-none tracking-tight"
                style={{ fontSize: "36px" }}
              >
                NLAMS
              </span>
              <span
                className="text-[#0B3A68] font-medium leading-snug"
                style={{ fontSize: "11px", maxWidth: "165px" }}
              >
                National Land Acquisition
                <br />
                &amp; Management System
              </span>
            </div>
          </a>

          {/* Vertical divider after brand */}
          <div
            className="hidden lg:block mx-6 self-stretch w-px bg-[#D8E3EE]"
            aria-hidden="true"
          />
        </div>

        {/* ── CENTER: Navigation links (desktop) ──────── */}
        <nav
          className="hidden lg:flex items-center gap-0 flex-1"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={cn(
                "flex items-center gap-0.5 px-4 py-2 text-[14.5px] font-semibold text-[#102F50]",
                "hover:text-[#0B3A68] transition-colors whitespace-nowrap",
                "focus-visible:outline-2 focus-visible:outline-[#0B3A68] focus-visible:outline-offset-2 rounded"
              )}
              style={{ textDecoration: "none" }}
            >
              {item.label}
              {item.hasDropdown && (
                <ChevronDown className="w-3.5 h-3.5 text-[#5D7085] ml-0.5" aria-hidden="true" />
              )}
            </a>
          ))}
        </nav>

        {/* ── RIGHT: Search + Login ────────────────────── */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            className="p-2 text-[#5D7085] hover:text-[#0B3A68] transition-colors rounded-md focus-visible:outline-2 focus-visible:outline-[#0B3A68]"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <Button
            className={cn(
              "bg-[#0B3A68] text-white hover:bg-[#082D4A] border-0",
              "font-semibold text-[15px] rounded-lg gap-2",
              "h-auto py-[14px] px-6"
            )}
            style={{ minWidth: "185px" }}
            aria-label="Login to Portal"
          >
            Login to Portal
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Button>
        </div>

        {/* ── Mobile hamburger ────────────────────────── */}
        <button
          className="lg:hidden p-2 text-[#0B3A68] rounded-md focus-visible:outline-2 focus-visible:outline-[#0B3A68]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ── Mobile navigation panel ─────────────────── */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="lg:hidden border-t border-[#D8E3EE] bg-white"
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className="px-6 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between py-3 text-[15px] font-semibold text-[#102F50] border-b border-[#D8E3EE] last:border-0 hover:text-[#0B3A68] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
                {item.hasDropdown && (
                  <ChevronDown className="w-4 h-4 text-[#5D7085]" aria-hidden="true" />
                )}
              </a>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <Button
                className="w-full bg-[#0B3A68] text-white hover:bg-[#082D4A] border-0 font-semibold text-[15px] rounded-lg gap-2 h-12"
                aria-label="Login to Portal"
              >
                Login to Portal
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
