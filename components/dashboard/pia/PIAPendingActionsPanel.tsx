"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, FileText, MessageSquare, MapPin, CheckCircle2, FileCheck } from "lucide-react";

const priorityConfig = {
  High: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200" },
  Medium: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  Low: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
};

const actions = [
  {
    id: 1,
    icon: FileText,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    title: "Review DPR document",
    project: "Nagpur Industrial Corridor",
    time: "2 hours ago",
    priority: "High" as const,
  },
  {
    id: 2,
    icon: MessageSquare,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Respond to LRB clarification",
    project: "Hyderabad Metro Phase-2",
    time: "5 hours ago",
    priority: "High" as const,
  },
  {
    id: 3,
    icon: MapPin,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    title: "Validate alignment data",
    project: "Mumbai-Nagpur Expressway",
    time: "1 day ago",
    priority: "Medium" as const,
  },
  {
    id: 4,
    icon: CheckCircle2,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    title: "Verify land requirement",
    project: "Vijayawada Bypass Road",
    time: "1 day ago",
    priority: "Medium" as const,
  },
  {
    id: 5,
    icon: FileCheck,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Review additional document",
    project: "Pune Ring Road",
    time: "2 days ago",
    priority: "Low" as const,
  },
];

export default function PIAPendingActionsPanel() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-[15px] font-bold text-[#0B1E36]">Pending Actions</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Items requiring your attention
          </p>
        </div>
        <Link
          href="/dashboard/pia/clarifications"
          className="text-[12px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 no-underline transition-colors shrink-0"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* List */}
      <div className="space-y-2.5 flex-1">
        {actions.map((item) => {
          const Icon = item.icon;
          const pri = priorityConfig[item.priority];
          return (
            <div
              key={item.id}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/70 hover:bg-slate-100/60 border border-slate-100 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.iconBg}`}>
                  <Icon className={`w-4 h-4 ${item.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-[#0B1E36] truncate">{item.title}</p>
                  <p className="text-[10.5px] text-slate-400 truncate">{item.project}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] text-slate-400">{item.time}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${pri.bg} ${pri.text} ${pri.border}`}>
                  {item.priority}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
