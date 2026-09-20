"use client";

import { Users, UserCheck, Clock, UserX, TrendingUp, TrendingDown } from "lucide-react";

const stats = [
  {
    id: "total_users",
    title: "Total Users",
    value: "248",
    trend: "+12%",
    trendLabel: "from last month",
    isPositive: true,
    icon: Users,
    accentColor: "#2563EB",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    trendColor: "text-emerald-600 bg-emerald-50",
  },
  {
    id: "active_users",
    title: "Active Users",
    value: "216",
    trend: "+8%",
    trendLabel: "from last month",
    isPositive: true,
    icon: UserCheck,
    accentColor: "#059669",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    trendColor: "text-emerald-600 bg-emerald-50",
  },
  {
    id: "pending_requests",
    title: "Pending Requests",
    value: "18",
    trend: "+3",
    trendLabel: "awaiting approval",
    isPositive: false,
    icon: Clock,
    accentColor: "#D97706",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    trendColor: "text-amber-600 bg-amber-50",
  },
  {
    id: "suspended_users",
    title: "Suspended Users",
    value: "14",
    trend: "+2",
    trendLabel: "from last month",
    isPositive: false,
    icon: UserX,
    accentColor: "#DC2626",
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    trendColor: "text-red-600 bg-red-50",
  },
];

export default function KpiCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const TrendIcon = stat.isPositive ? TrendingUp : TrendingDown;
        return (
          <div
            key={stat.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden group"
          >
            {/* Top accent bar */}
            <div
              className="h-1 w-full"
              style={{ backgroundColor: stat.accentColor }}
            />

            <div className="p-5">
              {/* Icon + Title row */}
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
                  {stat.title}
                </p>
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${stat.iconBg}`}
                >
                  <Icon className={`w-4.5 h-4.5 ${stat.iconColor}`} style={{ width: 18, height: 18 }} />
                </div>
              </div>

              {/* Value */}
              <p
                className="text-4xl font-extrabold tracking-tight leading-none"
                style={{ color: "#0B1E36" }}
              >
                {stat.value}
              </p>

              {/* Trend */}
              <div className="flex items-center gap-1.5 mt-3">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${stat.trendColor}`}
                >
                  <TrendIcon style={{ width: 11, height: 11 }} />
                  {stat.trend}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {stat.trendLabel}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
