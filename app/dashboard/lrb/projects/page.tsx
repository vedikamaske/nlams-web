"use client";

import { useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";
import LRBSidebar from "@/components/dashboard/lrb/LRBSidebar";
import LRBHeader from "@/components/dashboard/lrb/LRBHeader";
import MyProjectsView from "@/components/dashboard/lrb/projects/MyProjectsView";

export default function MyProjectsPage() {
  const { roles, loading } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const isLRB = roles.some((r) => r.code === "LRB");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EEF5FB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#0B3A68] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-[#102F50]">Loading Projects...</p>
        </div>
      </div>
    );
  }

  if (!isLRB) {
    return (
      <div className="min-h-screen bg-[#EEF5FB] flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#CBDCE9] shadow-2xl text-center">
          <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-[#102F50] mb-2">Access Restricted</h2>
          <p className="text-xs text-slate-600 mb-6">LRB authorization required.</p>
          <Link href="/login" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B3A68] text-white text-xs font-semibold rounded-xl">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Login</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F4F8FC] font-sans overflow-hidden">
      <LRBSidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)} />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <LRBHeader />
        <main className="flex-1 overflow-y-auto p-4 sm:p-5">
          <MyProjectsView />
        </main>
      </div>
    </div>
  );
}