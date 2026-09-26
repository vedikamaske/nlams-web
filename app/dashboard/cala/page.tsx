"use client";

import { useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";
import CALASidebar from "@/components/dashboard/cala/CALASidebar";
import CALAHeader from "@/components/dashboard/cala/CALAHeader";
import CALAKpiCards from "@/components/dashboard/cala/CALAKpiCards";
import CALACasesByStageChart from "@/components/dashboard/cala/CALACasesByStageChart";
import CALALandAreaDonut from "@/components/dashboard/cala/CALALandAreaDonut";
import CALACasesLocationMap from "@/components/dashboard/cala/CALACasesLocationMap";
import CALARecentCasesTable from "@/components/dashboard/cala/CALARecentCasesTable";
import CALAPendingActionsPanel from "@/components/dashboard/cala/CALAPendingActionsPanel";
import CALASystemActivityPanel from "@/components/dashboard/cala/CALASystemActivityPanel";

export default function CALADashboardPage() {
  const { roles, loading } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const isCALA = roles.some((r) => r.code === "CALA");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EEF5FB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#0B3A68] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-[#102F50]">Loading CALA Dashboard...</p>
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
          <h2 className="text-xl font-extrabold text-[#102F50] mb-2">CALA Access Restricted</h2>
          <p className="text-xs text-slate-600 mb-6">
            This dashboard is exclusively for users with the{" "}
            <code className="bg-slate-100 px-1.5 py-0.5 rounded text-red-600 font-mono">CALA</code>{" "}
            (Competent Authority for Land Acquisition) role.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B3A68] text-white text-xs font-semibold rounded-xl hover:bg-[#082D4A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portal Login</span>
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
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          <CALAKpiCards />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-4 min-h-[300px]">
              <CALACasesByStageChart />
            </div>
            <div className="lg:col-span-4 min-h-[300px]">
              <CALALandAreaDonut />
            </div>
            <div className="lg:col-span-4 min-h-[300px]">
              <CALACasesLocationMap />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-5">
              <CALARecentCasesTable />
            </div>
            <div className="lg:col-span-4">
              <CALAPendingActionsPanel />
            </div>
            <div className="lg:col-span-3">
              <CALASystemActivityPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
