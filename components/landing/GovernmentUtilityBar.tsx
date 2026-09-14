"use client";

import Image from "next/image";
import { Globe, CircleHelp, Accessibility } from "lucide-react";

export default function GovernmentUtilityBar() {
  return (
    <div className="w-full bg-[#0B2240] text-white" style={{ minHeight: "38px" }}>
      <div
        className="mx-auto flex items-center justify-between px-3.5 sm:px-6 lg:px-10"
        style={{ maxWidth: "1500px", minHeight: "38px" }}
      >
        {/* LEFT — Flag + system identity */}
        <div className="flex items-center gap-0 min-w-0">
          {/* Indian Flag */}
          <div className="relative shrink-0 mr-2" style={{ width: 20, height: 14 }}>
            <Image
              src="/images/indian-flag.jpg"
              alt="Indian National Flag"
              fill
              className="object-cover rounded-[1px]"
              sizes="20px"
            />
          </div>

          <span className="text-white font-semibold text-[11.5px] sm:text-[12.5px] whitespace-nowrap">
            SIH Prototype
          </span>

          {/* Divider */}
          <span
            className="mx-2 sm:mx-2.5 inline-block h-3.5 w-px bg-white/30 shrink-0"
            aria-hidden="true"
          />

          <span className="text-white/80 text-[11px] sm:text-[12px] whitespace-nowrap hidden sm:inline truncate">
            National Land Acquisition &amp; Management System
          </span>
        </div>

        {/* RIGHT — Utility controls */}
        <div className="flex items-center gap-0 shrink-0">
          {/* Font size controls */}
          <div className="hidden md:flex items-center gap-0.5 mr-1">
            <button
              className="px-1.5 py-1 text-white/80 hover:text-white text-[10px] leading-none transition-colors"
              aria-label="Decrease font size"
            >
              A<sup>-</sup>
            </button>
            <button
              className="px-1.5 py-1 text-white/90 hover:text-white text-[12px] leading-none font-semibold transition-colors"
              aria-label="Default font size"
            >
              A
            </button>
            <button
              className="px-1.5 py-1 text-white/80 hover:text-white text-[13px] leading-none transition-colors"
              aria-label="Increase font size"
            >
              A<sup>+</sup>
            </button>
          </div>

          {/* Divider */}
          <span
            className="hidden md:inline-block mx-2 h-3.5 w-px bg-white/30"
            aria-hidden="true"
          />

          {/* Accessibility */}
          <button
            className="hidden md:flex items-center gap-1 px-1.5 py-1 text-white/80 hover:text-white text-[12px] transition-colors"
            aria-label="Accessibility options"
          >
            <Accessibility className="w-3.5 h-3.5" />
            <span>Accessibility</span>
          </button>

          {/* Divider */}
          <span
            className="hidden md:inline-block mx-2 h-3.5 w-px bg-white/30"
            aria-hidden="true"
          />

          {/* Hindi / Language */}
          <button
            className="flex items-center gap-1 px-1.5 py-1 text-white/80 hover:text-white text-[12px] transition-colors"
            aria-label="Switch to Hindi"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>हिंदी</span>
          </button>

          {/* Divider */}
          <span
            className="mx-2 h-3.5 w-px bg-white/30 inline-block"
            aria-hidden="true"
          />

          {/* Help */}
          <button
            className="flex items-center gap-1 px-1.5 py-1 text-white/80 hover:text-white text-[12px] transition-colors"
            aria-label="Help and Support"
          >
            <CircleHelp className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Help &amp; Support</span>
          </button>
        </div>
      </div>
    </div>
  );
}
