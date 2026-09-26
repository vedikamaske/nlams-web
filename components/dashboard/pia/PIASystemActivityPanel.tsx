"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, FolderPlus, FileUp, MessageSquareReply, CheckCircle, Send } from "lucide-react";

const activities = [
  {
    id: 1,
    icon: FolderPlus,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "New project assigned",
    subtitle: "Nagpur Industrial Corridor",
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: FileUp,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    title: "Document uploaded by LRB",
    subtitle: "Hyderabad Metro Phase-2",
    time: "5 hours ago",
  },
  {
    id: 3,
    icon: MessageSquareReply,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-600",
    title: "Clarification response received",
    subtitle: "Mumbai-Nagpur Expressway",
    time: "1 day ago",
  },
  {
    id: 4,
    icon: CheckCircle,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    title: "Technical validation completed",
    subtitle: "Pune Ring Road",
    time: "1 day ago",
  },
  {
    id: 5,
    icon: Send,
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    title: "Proposal marked ready for routing",
    subtitle: "Vijayawada Bypass Road",
    time: "2 days ago",
  },
];

export default function PIASystemActivityPanel() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-[15px] font-bold text-[#0B1E36]">System Activity</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Recent activities on assigned projects
          </p>
        </div>
        <Link
          href="/dashboard/pia/notifications"
          className="text-[12px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 no-underline transition-colors shrink-0"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Activity Timeline List */}
      <div className="flex flex-col gap-2.5 flex-1">
        {activities.map((activity, idx) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start gap-2.5 group">
              <div className="flex flex-col items-center shrink-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center ${activity.iconBg}`}>
                  <Icon className={`w-3.5 h-3.5 ${activity.iconColor}`} />
                </div>
                {idx < activities.length - 1 && (
                  <div className="w-px flex-1 bg-slate-100 mt-1" style={{ minHeight: 10 }} />
                )}
              </div>

              <div className="flex-1 min-w-0 pb-0.5">
                <p className="text-[12px] font-semibold text-[#0B1E36] truncate">{activity.title}</p>
                <p className="text-[10.5px] text-slate-400 truncate">{activity.subtitle}</p>
              </div>

              <span className="text-[10px] text-slate-400 shrink-0">{activity.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
