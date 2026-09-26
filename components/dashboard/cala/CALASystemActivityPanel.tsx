"use client";

import { ArrowRight, Folder, FileText, MessageSquare, IndianRupee, Calendar } from "lucide-react";

const activities = [
  {
    id: 1,
    icon: Folder,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    title: "New case assigned from Routing Engine",
    project: "Medak Industrial Corridor",
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: FileText,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    title: "Draft notification created",
    project: "NH-44 Medak Expansion",
    time: "5 hours ago",
  },
  {
    id: 3,
    icon: MessageSquare,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
    title: "Clarification sent to PIA",
    project: "Hyderabad Metro Phase-2",
    time: "1 day ago",
  },
  {
    id: 4,
    icon: IndianRupee,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    title: "Compensation assessment completed",
    project: "Regional Railway Line",
    time: "1 day ago",
  },
  {
    id: 5,
    icon: Calendar,
    iconBg: "bg-rose-50",
    iconColor: "text-rose-600",
    title: "Hearing date scheduled",
    project: "Medak Bypass Road",
    time: "2 days ago",
  },
];

export default function CALASystemActivityPanel() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-[15px] font-bold text-[#0B1E36]">System Activity</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Recent activities in Medak district
          </p>
        </div>
        <a
          href="#"
          className="text-[12px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 no-underline transition-colors shrink-0"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Activity List */}
      <div className="space-y-3 flex-1">
        {activities.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex items-start gap-2.5">
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${item.iconBg}`}>
                <Icon className={`w-3.5 h-3.5 ${item.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-semibold text-[#0B1E36] leading-tight truncate">
                  {item.title}
                </p>
                <p className="text-[10.5px] text-slate-400 truncate mt-0.5">{item.project}</p>
              </div>
              <span className="text-[10px] text-slate-400 shrink-0 mt-0.5">{item.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
