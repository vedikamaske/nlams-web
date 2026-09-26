"use client";

import { useState } from "react";
import { useAuth } from "@/lib/useAuth";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import Link from "next/link";
import LRBSidebar from "@/components/dashboard/lrb/LRBSidebar";
import LRBHeader from "@/components/dashboard/lrb/LRBHeader";
import LRBKpiCards from "@/components/dashboard/lrb/LRBKpiCards";
import ProjectsByStatusChart from "@/components/dashboard/lrb/ProjectsByStatusChart";
import LandRequirementDonut from "@/components/dashboard/lrb/LandRequirementDonut";
import ProjectLocationsMap from "@/components/dashboard/lrb/ProjectLocationsMap";
import RecentProjectsTable from "@/components/dashboard/lrb/RecentProjectsTable";
import PendingActionsPanel from "@/components/dashboard/lrb/PendingActionsPanel";
import SystemActivityPanel from "@/components/dashboard/lrb/SystemActivityPanel";

export default function LRBDashboardPage() {
  const { roles, loading } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const isLRB = roles.some((r) => r.code === "LRB");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EEF5FB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#0B3A68] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-[#102F50]">Loading LRB Dashboard...</p>
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
          <h2 className="text-xl font-extrabold text-[#102F50] mb-2">LRB Access Restricted</h2>
          <p className="text-xs text-slate-600 mb-6">
            This dashboard is exclusively for users with the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-red-600 font-mono">LRB</code> role.
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
      <LRBSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <LRBHeader />

        {/* Dashboard Scroll Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
          {/* KPI Cards */}
          <LRBKpiCards />

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Projects by Status Bar Chart */}
            <div className="lg:col-span-4 min-h-[300px]">
              <ProjectsByStatusChart />
            </div>

            {/* Land Requirement Donut */}
            <div className="lg:col-span-4 min-h-[300px]">
              <LandRequirementDonut />
            </div>

            {/* Project Locations Map */}
            <div className="lg:col-span-4 min-h-[300px]">
              <ProjectLocationsMap />
            </div>
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Recent Projects Table */}
            <div className="lg:col-span-5">
              <RecentProjectsTable />
            </div>

            {/* Pending Actions */}
            <div className="lg:col-span-4">
              <PendingActionsPanel />
            </div>

            {/* System Activity */}
            <div className="lg:col-span-3">
              <SystemActivityPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
