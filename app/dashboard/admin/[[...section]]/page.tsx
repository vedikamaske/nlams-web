"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import AdminSidebar from "@/components/dashboard/admin/AdminSidebar";
import AdminHeader from "@/components/dashboard/admin/AdminHeader";
import KpiCards from "@/components/dashboard/admin/KpiCards";
import UsersByRoleChart from "@/components/dashboard/admin/UsersByRoleChart";
import UserStatusChart from "@/components/dashboard/admin/UserStatusChart";
import RecentAccessRequests from "@/components/dashboard/admin/RecentAccessRequests";
import AssignedRolesTable from "@/components/dashboard/admin/AssignedRolesTable";
import OrganizationsTable from "@/components/dashboard/admin/OrganizationsTable";
import SystemActivityLog from "@/components/dashboard/admin/SystemActivityLog";
import ProfileManagement from "@/components/dashboard/admin/ProfileManagement";
import AccessRequestsPanel from "@/components/dashboard/admin/AccessRequestsPanel";
import { ShieldAlert, ArrowLeft, Construction } from "lucide-react";
import Link from "next/link";

function slugToSectionId(slug?: string): string {
  if (!slug) return "dashboard";
  const mapped: Record<string, string> = {
    "profile-management": "profile_management",
    "access-requests": "access_requests",
    "org-management": "org_management",
    "jurisdiction": "jurisdiction",
    "policy": "policy",
    "system-activity": "system_activity",
    "audit-logs": "audit_logs",
    "reports": "reports",
    "help": "help",
  };
  return mapped[slug] || slug.replace(/-/g, "_");
}

export default function AdminDashboardPage() {
  const { roles, loading } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const params = useParams();

  const sectionArray = params?.section;
  const rawSlug = Array.isArray(sectionArray) ? sectionArray[0] : (sectionArray as string | undefined);
  const activeSection = slugToSectionId(rawSlug);

  const isSystemAdmin = roles.some((r) => r.code === "SYSTEM_ADMIN");

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EEF5FB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#0B3A68] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-[#102F50]">Verifying System Administrator Context...</p>
        </div>
      </div>
    );
  }

  if (!isSystemAdmin) {
    return (
      <div className="min-h-screen bg-[#EEF5FB] flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#CBDCE9] shadow-2xl text-center">
          <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-[#102F50] mb-2">System Admin Access Restricted</h2>
          <p className="text-xs text-slate-600 mb-6">
            You are authenticated, but your profile lacks the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-red-600 font-mono">SYSTEM_ADMIN</code> authorization role required for this console.
          </p>
          <Link href="/login" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0B3A68] text-white text-xs font-semibold rounded-xl hover:bg-[#082D4A] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portal Login</span>
          </Link>
        </div>
      </div>
    );
  }

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="space-y-5">
            <KpiCards />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-5 min-h-[340px]"><UsersByRoleChart /></div>
              <div className="lg:col-span-3 min-h-[340px]"><UserStatusChart /></div>
              <div className="lg:col-span-4 min-h-[340px]"><RecentAccessRequests /></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              <div className="lg:col-span-5 min-h-[360px]"><AssignedRolesTable /></div>
              <div className="lg:col-span-4 min-h-[360px]"><OrganizationsTable /></div>
              <div className="lg:col-span-3 min-h-[360px]"><SystemActivityLog /></div>
            </div>
          </div>
        );

      case "profile_management":
        return <ProfileManagement />;

      case "access_requests":
        return <AccessRequestsPanel />;

      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center">
              <Construction className="w-7 h-7 text-slate-400" />
            </div>
            <div className="text-center">
              <h3 className="text-[15px] font-bold text-[#0B1E36]">Module Under Development</h3>
              <p className="text-[12px] text-slate-400 mt-1">This section will be available in a future release.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#F4F8FC] font-sans overflow-hidden">
      <AdminSidebar
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        activeSection={activeSection}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-4 sm:p-5">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}