"use client";

import { useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";
import PIASidebar from "@/components/dashboard/pia/PIASidebar";
import PIAHeader from "@/components/dashboard/pia/PIAHeader";
import PIAKpiCards from "@/components/dashboard/pia/PIAKpiCards";
import PIAProjectsByStageChart from "@/components/dashboard/pia/PIAProjectsByStageChart";
import PIALandRequirementDonut from "@/components/dashboard/pia/PIALandRequirementDonut";
import PIAProjectLocationsMap from "@/components/dashboard/pia/PIAProjectLocationsMap";
import PIARecentProjectsTable from "@/components/dashboard/pia/PIARecentProjectsTable";
import PIAPendingActionsPanel from "@/components/dashboard/pia/PIAPendingActionsPanel";
import PIASystemActivityPanel from "@/components/dashboard/pia/PIASystemActivityPanel";

export default function PIADashboardPage() {
  const { roles, loading } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const isPIA = roles.some((r) => r.code === "PIA");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EEF5FB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#0B3A68] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-[#102F50]">Loading PIA Dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isPIA) {
    return (
      <div className="min-h-screen bg-[#EEF5FB] flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#CBDCE9] shadow-2xl text-center">
          <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-[#102F50] mb-2">PIA Access Restricted</h2>
          <p className="text-xs text-slate-600 mb-6">
            This dashboard is exclusively for users with the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-red-600 font-mono">PIA</code> (Project Implementation Agency) role.
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
      {/* Collapsible Sidebar */}
      <PIASidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <PIAHeader />

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* Top KPI Cards Row */}
          <PIAKpiCards />

          {/* Middle Row (3 Cards: Bar Chart, Donut Chart, Map) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-4 min-h-[300px]">
              <PIAProjectsByStageChart />
            </div>
            <div className="lg:col-span-4 min-h-[300px]">
              <PIALandRequirementDonut />
            </div>
            <div className="lg:col-span-4 min-h-[300px]">
              <PIAProjectLocationsMap />
            </div>
          </div>

          {/* Bottom Row (3 Columns: Table, Pending Actions, System Activity) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            <div className="lg:col-span-5">
              <PIARecentProjectsTable />
            </div>
            <div className="lg:col-span-4">
              <PIAPendingActionsPanel />
            </div>
            <div className="lg:col-span-3">
              <PIASystemActivityPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
