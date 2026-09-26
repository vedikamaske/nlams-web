"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/lib/useAuth";
import { useRouter } from "next/navigation";
import { LogOut, ChevronDown, UserCircle2, Shield } from "lucide-react";

export default function CALAHeader() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = user ? `${user.firstName} ${user.lastName}`.trim() : "Suresh Kumar";
  const initials = user
    ? `${user.firstName?.[0] ?? "S"}${user.lastName?.[0] ?? "K"}`.toUpperCase()
    : "SK";

  return (
    <header className="h-16 bg-white border-b border-[#E2E8F0] px-6 flex items-center justify-between shadow-sm sticky top-0 z-20 shrink-0">
      {/* Left - Title */}
      <div>
        <h1 className="text-[17px] font-bold text-[#0B1E36] tracking-tight leading-tight">
          CALA Dashboard
        </h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Role Pill */}
        <div className="hidden md:flex items-center gap-1.5 bg-[#EEF5FF] text-[#0a2e61] text-[11px] font-semibold px-3 py-1.5 rounded-full">
          <span>CALA - Medak District</span>
        </div>

        <div className="hidden md:block w-px h-6 bg-slate-200" />

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer outline-none border border-transparent hover:border-slate-200"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#2563EB] flex items-center justify-center shrink-0 shadow-sm">
              <span className="text-white text-[11px] font-bold tracking-wide">{initials}</span>
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-[13.5px] font-semibold text-[#0B1E36] leading-tight">{displayName}</p>
              <p className="text-[10.5px] text-slate-400">Competent Authority for LA (CALA)</p>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 hidden sm:block transition-transform duration-200 ${
                profileOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-[#E2E8F0] rounded-2xl shadow-xl py-2 z-50 text-xs">
              <div className="px-4 py-3 border-b border-slate-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#2563EB] flex items-center justify-center shrink-0">
                    <span className="text-white text-[13px] font-bold">{initials}</span>
                  </div>
                  <div>
                    <p className="font-bold text-[#0B1E36] text-[12px]">{displayName}</p>
                    <p className="text-[10px] text-slate-400">{user?.email || "cala.medak@sankalp.gov.in"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full w-fit">
                  <Shield className="w-3 h-3" />
                  <span className="text-[10px] font-semibold">CALA – Medak District</span>
                </div>
              </div>
              <a
                href="#profile"
                className="flex items-center gap-2.5 px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition-colors no-underline"
              >
                <UserCircle2 className="w-4 h-4 text-slate-400" />
                <span className="font-medium">My Profile</span>
              </a>
              <button
                onClick={() => {
                  logout().then(() => router.push("/login"));
                }}
                className="w-full text-left flex items-center gap-2.5 px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors cursor-pointer border-t border-slate-100"
              >
                <LogOut className="w-4 h-4 text-red-400" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
