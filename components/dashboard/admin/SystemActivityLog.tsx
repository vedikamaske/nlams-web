"use client";

import {
  UserPlus,
  FileText,
  CheckCircle,
  Shield,
  Ban,
  ArrowRight,
} from "lucide-react";

const activities = [
  {
    id: "1",
    title: "New user registered",
    detail: "rahul.sharma@gov.in",
    time: "2h ago",
    icon: UserPlus,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    dot: "#22C55E",
  },
  {
    id: "2",
    title: "Access request submitted",
    detail: "Anjali Patil (CALA)",
    time: "5h ago",
    icon: FileText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    dot: "#2563EB",
  },
  {
    id: "3",
    title: "User approved",
    detail: "Vikram Kulkarni (LRB)",
    time: "1d ago",
    icon: CheckCircle,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    dot: "#22C55E",
  },
  {
    id: "4",
    title: "Role assigned",
    detail: "LAO → Priya Singh",
    time: "1d ago",
    icon: Shield,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    dot: "#9333EA",
  },
  {
    id: "5",
    title: "User suspended",
    detail: "temp.user@gov.in",
    time: "2d ago",
    icon: Ban,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    dot: "#EF4444",
  },
];

export default function SystemActivityLog() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-bold text-[#0B1E36]">System Activity</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Recent platform events</p>
        </div>
        <a
          href="#activity"
          className="text-[12px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 transition-colors no-underline shrink-0"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Timeline */}
      <div className="flex flex-col gap-3 flex-1">
        {activities.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex gap-3">
              {/* Icon + connector */}
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center ${item.iconBg}`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.iconColor}`} />
                </div>
                {idx < activities.length - 1 && (
                  <div className="w-px flex-1 bg-slate-100 mt-1 mb-0" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pb-3">
                <p className="text-[12px] font-bold text-[#0B1E36] leading-tight">
                  {item.title}
                </p>
                <p className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5 truncate">
                  {item.detail}
                </p>
                <span className="text-[10px] text-slate-300 font-medium mt-0.5 block">
                  {item.time}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
