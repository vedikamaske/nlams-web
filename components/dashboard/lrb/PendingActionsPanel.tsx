"use client";

import { ArrowRight, FileText, MessageSquare, FilePen, CheckSquare } from "lucide-react";

const priorityConfig = {
  High: { bg: "bg-red-50", text: "text-red-600", border: "border-red-200", dot: "bg-red-500" },
  Medium: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", dot: "bg-amber-500" },
  Low: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", dot: "bg-emerald-500" },
};

const actions = [
  {
    id: 1,
    icon: FileText,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "Provide alignment document",
    project: "Nashik Industrial Corridor",
    time: "2 hours ago",
    priority: "High" as const,
  },
  {
    id: 2,
    icon: MessageSquare,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    title: "Respond to clarification",
    project: "Nagpur Metro Expansion",
    time: "5 hours ago",
    priority: "Medium" as const,
  },
  {
    id: 3,
    icon: FilePen,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    title: "Review land requirement revision",
    project: "Vidarbha Railway Line",
    time: "1 day ago",
    priority: "Medium" as const,
  },
  {
    id: 4,
    icon: CheckSquare,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    title: "Approve draft proposal",
    project: "Pune Ring Road",
    time: "2 days ago",
    priority: "Low" as const,
  },
];

export default function PendingActionsPanel() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col h-full">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-[15px] font-bold text-[#0B1E36]">Pending Actions</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Items requiring your attention</p>
        </div>
        <a href="#" className="text-[12px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 no-underline transition-colors shrink-0">
          View All <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="mt-4 space-y-3 flex-1">
        {actions.map((action) => {
          const Icon = action.icon;
          const pri = priorityConfig[action.priority];
          return (
            <div key={action.id} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 hover:bg-slate-100/60 border border-slate-100 transition-colors cursor-pointer group">
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${action.iconBg}`}>
                <Icon className={`w-4.5 h-4.5 ${action.iconColor}`} style={{ width: 17, height: 17 }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12.5px] font-semibold text-[#0B1E36] truncate">{action.title}</p>
                <p className="text-[11px] text-slate-400 truncate mt-0.5">{action.project}</p>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                <span className="text-[10px] text-slate-400">{action.time}</span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${pri.bg} ${pri.text} ${pri.border}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${pri.dot}`} />
                  {action.priority}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
