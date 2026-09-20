"use client";

import { useAuth } from "@/lib/useAuth";
import {
  Building2,
  Landmark,
  ShieldCheck,
  Briefcase,
  FileText,
  Users,
  CheckCircle2,
  Layers,
} from "lucide-react";

interface RoleDashboardProps {
  roleCode: string;
  title: string;
  description: string;
}

export default function RoleDashboardView({
  roleCode,
  title,
  description,
}: RoleDashboardProps) {
  const { user, organization, department, permissions, dashboards, activeRole } =
    useAuth();

  const currentDashboard = dashboards.find(
    (d) => d.code === `${roleCode}_DASHBOARD` || d.roleId === activeRole?.id
  ) || dashboards[0];

  return (
    <div className="space-y-6">
      {/* Role Banner */}
      <div className="bg-white rounded-2xl border border-[#CBDCE9] p-6 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Authorized Sankalp Context: {roleCode}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#102F50]">{title}</h1>
          <p className="text-xs text-slate-500 mt-1">{description}</p>
        </div>

        <div className="bg-[#EEF5FB] rounded-xl p-3 border border-[#CBDCE9] text-xs space-y-1">
          <p className="font-semibold text-[#102F50] flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#0B3A68]" />
            Org: {organization?.name || "N/A"} ({organization?.code || "N/A"})
          </p>
          <p className="text-slate-600 flex items-center gap-1.5">
            <Landmark className="w-3.5 h-3.5 text-slate-500" />
            Dept: {department?.name || "General Administration"}
          </p>
        </div>
      </div>

      {/* Authorized Dashboard Overview Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-[#CBDCE9] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">
              Assigned Permissions
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-[#102F50]">
            {permissions.length}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Active backend permissions granted
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#CBDCE9] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">
              Available Dashboards
            </span>
            <Layers className="w-4 h-4 text-[#0B3A68]" />
          </div>
          <p className="text-3xl font-extrabold text-[#102F50]">
            {dashboards.length}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Configured UI dashboard perspectives
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-[#CBDCE9] p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase">
              User Status
            </span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-600 uppercase">
            {user?.status || "ACTIVE"}
          </p>
          <p className="text-[11px] text-slate-500 mt-1">
            Verified Supabase + Application Identity
          </p>
        </div>
      </div>

      {/* Dynamic Dashboard Widgets Section */}
      {currentDashboard && currentDashboard.widgets && currentDashboard.widgets.length > 0 ? (
        <div className="bg-white rounded-2xl border border-[#CBDCE9] p-6 shadow-sm">
          <h2 className="text-sm font-bold text-[#102F50] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-[#0B3A68]" />
            <span>Configured Widgets ({currentDashboard.name})</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentDashboard.widgets.map((widget) => (
              <div
                key={widget.id}
                className="p-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#0B3A68] transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-bold text-[#102F50]">
                    {widget.title}
                  </h3>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                    {widget.widgetType}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Source: {widget.dataSource}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-[#CBDCE9] p-8 shadow-sm text-center">
          <FileText className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-bold text-[#102F50]">
            Ready for Domain Module Integration
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
            Application user authorization context successfully established. Projects, parcels, tasks, and workflow engines will populate this dashboard in subsequent phases.
          </p>
        </div>
      )}
    </div>
  );
}
