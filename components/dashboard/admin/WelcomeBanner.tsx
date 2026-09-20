"use client";

import { useAuth } from "@/lib/useAuth";

export default function WelcomeBanner() {
  const { user } = useAuth();
  const displayName = user
    ? `${user.firstName} ${user.lastName}`
    : "Sankalp Administrator";

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#EBF3FB] via-[#E6F0F9] to-[#DFECF8] border border-[#CDE1F2] p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
      {/* Parliament Line Art Watermark Vector SVG Background */}
      <div className="absolute right-32 bottom-0 top-0 opacity-20 pointer-events-none hidden lg:block w-96">
        <svg viewBox="0 0 500 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <path d="M50 180H450M70 180V120H430V180M100 120V80H400V120M200 80V40C200 25 300 25 300 40V80M250 15V25" stroke="#0B3A68" strokeWidth="2" strokeLinecap="round" />
          <circle cx="250" cy="40" r="15" stroke="#0B3A68" strokeWidth="2" />
          {/* Columns */}
          <line x1="120" y1="120" x2="120" y2="180" stroke="#0B3A68" strokeWidth="2" />
          <line x1="150" y1="120" x2="150" y2="180" stroke="#0B3A68" strokeWidth="2" />
          <line x1="180" y1="120" x2="180" y2="180" stroke="#0B3A68" strokeWidth="2" />
          <line x1="210" y1="120" x2="210" y2="180" stroke="#0B3A68" strokeWidth="2" />
          <line x1="240" y1="120" x2="240" y2="180" stroke="#0B3A68" strokeWidth="2" />
          <line x1="270" y1="120" x2="270" y2="180" stroke="#0B3A68" strokeWidth="2" />
          <line x1="300" y1="120" x2="300" y2="180" stroke="#0B3A68" strokeWidth="2" />
          <line x1="330" y1="120" x2="330" y2="180" stroke="#0B3A68" strokeWidth="2" />
          <line x1="360" y1="120" x2="360" y2="180" stroke="#0B3A68" strokeWidth="2" />
          <line x1="390" y1="120" x2="390" y2="180" stroke="#0B3A68" strokeWidth="2" />
        </svg>
      </div>

      {/* Text Left */}
      <div className="z-10 max-w-xl">
        <p className="text-xs sm:text-sm font-semibold text-[#5D7085] tracking-wide">
          Welcome back,
        </p>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#102F50] tracking-tight mt-0.5">
          {displayName}
        </h2>
        <p className="text-xs sm:text-sm text-[#5D7085] font-medium mt-1">
          Manage users, roles, organizations and platform configuration.
        </p>
      </div>

      {/* Quote Block Right (Matching screenshot) */}
      <div className="z-10 bg-white/70 backdrop-blur-xs border border-[#CDE1F2] rounded-xl p-4 max-w-xs text-center shadow-xs self-stretch md:self-auto flex flex-col justify-center">
        <div className="flex justify-center mb-1 text-[#0B3A68]/40">
          <span className="text-2xl font-serif leading-none font-bold">“</span>
        </div>
        <p className="text-xs font-semibold text-[#102F50] italic leading-snug">
          Transparent Land Governance for a Progressive India
        </p>
        <div className="w-12 h-0.5 bg-[#0B3A68]/30 mx-auto my-2" />
        <p className="text-[11px] font-bold text-[#0B3A68]">Sankalp</p>
      </div>
    </div>
  );
}
