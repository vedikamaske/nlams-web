"use client";

import { Folder, Clock, Bell, IndianRupee, TrendingUp } from "lucide-react";

const kpis = [
  {
    id: "assigned_cases",
    label: "Assigned Acquisition Cases",
    value: "12",
    trend: "+20%",
    trendLabel: "from last month",
    icon: Folder,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    trendColor: "text-emerald-600",
    trendBg: "bg-emerald-50",
    borderTop: "border-t-[3px] border-blue-500",
  },
  {
    id: "pending_action",
    label: "Pending for Action",
    value: "5",
    trend: "+25%",
    trendLabel: "from last month",
    icon: Clock,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    trendColor: "text-emerald-600",
    trendBg: "bg-emerald-50",
    borderTop: "border-t-[3px] border-amber-400",
  },
  {
    id: "notifications_progress",
    label: "Notifications in Progress",
    value: "3",
    trend: "+50%",
    trendLabel: "from last month",
    icon: Bell,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    trendColor: "text-emerald-600",
    trendBg: "bg-emerald-50",
    borderTop: "border-t-[3px] border-purple-500",
  },
  {
    id: "compensation_processing",
    label: "Compensation Processing",
    value: "4",
    trend: "+33%",
    trendLabel: "from last month",
    icon: IndianRupee,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    trendColor: "text-emerald-600",
    trendBg: "bg-emerald-50",
    borderTop: "border-t-[3px] border-emerald-500",
  },
];

export default function CALAKpiCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => {
        const Icon = kpi.icon;
        return (
          <div
            key={kpi.id}
            className={`bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden ${kpi.borderTop}`}
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11.5px] font-semibold text-slate-500 uppercase tracking-wide leading-tight">
                  {kpi.label}
                </p>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${kpi.iconBg}`}>
                  <Icon style={{ width: 18, height: 18 }} className={kpi.iconColor} />
                </div>
              </div>
              <p className="text-4xl font-extrabold tracking-tight leading-none text-[#0B1E36]">
                {kpi.value}
              </p>
              <div className="flex items-center gap-1.5 mt-3">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${kpi.trendColor} ${kpi.trendBg}`}
                >
                  <TrendingUp style={{ width: 11, height: 11 }} />
                  {kpi.trend}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">{kpi.trendLabel}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
