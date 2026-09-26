"use client";

import { useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { ShieldAlert, ArrowLeft, Construction } from "lucide-react";
import Link from "next/link";
import CALASidebar from "@/components/dashboard/cala/CALASidebar";
import CALAHeader from "@/components/dashboard/cala/CALAHeader";

export default function CALAPlaceholderPage() {
  const { roles, loading } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const isCALA = roles.some((r) => r.code === "CALA");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EEF5FB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#0B3A68] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-[#102F50]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isCALA) {
    return (
      <div className="min-h-screen bg-[#EEF5FB] flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#CBDCE9] shadow-2xl text-center">
          <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-[#102F50] mb-2">Access Restricted</h2>
          <p className="text-xs text-slate-600 mb-6">CALA authorization required.</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B3A68] text-white text-xs font-semibold rounded-xl"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Login</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F4F8FC] font-sans overflow-hidden">
      <CALASidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <CALAHeader />
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center">
              <Construction className="w-7 h-7 text-slate-400" />
            </div>
            <div className="text-center">
              <h3 className="text-[15px] font-bold text-[#0B1E36]">Module Under Development</h3>
              <p className="text-[12px] text-slate-400 mt-1">
                This section will be available in a future release.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
