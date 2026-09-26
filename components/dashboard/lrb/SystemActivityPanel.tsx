"use client";

import { ArrowRight, Plus, Upload, Send, MessageSquare, CheckCircle2 } from "lucide-react";

const activityConfig = {
  created: { icon: Plus, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
  uploaded: { icon: Upload, iconBg: "bg-blue-50", iconColor: "text-blue-600" },
  submitted: { icon: Send, iconBg: "bg-purple-50", iconColor: "text-purple-600" },
  clarification: { icon: MessageSquare, iconBg: "bg-amber-50", iconColor: "text-amber-600" },
  registered: { icon: CheckCircle2, iconBg: "bg-green-50", iconColor: "text-green-600" },
};

const activities = [
  { id: 1, type: "created" as const, title: "Project draft created", subtitle: "Pune Ring Road", time: "2 hours ago" },
  { id: 2, type: "uploaded" as const, title: "Document uploaded", subtitle: "Nashik Industrial Corridor", time: "5 hours ago" },
  { id: 3, type: "submitted" as const, title: "Proposal submitted", subtitle: "Vidarbha Railway Line", time: "1 day ago" },
  { id: 4, type: "clarification" as const, title: "Clarification received from PIA", subtitle: "Nagpur Metro Expansion", time: "1 day ago" },
  { id: 5, type: "registered" as const, title: "Project registered", subtitle: "Amravati Bypass Road", time: "2 days ago" },
];

export default function SystemActivityPanel() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col h-full">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-[15px] font-bold text-[#0B1E36]">System Activity</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Recent activities on your projects</p>
        </div>
        <a href="#" className="text-[12px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 no-underline transition-colors shrink-0">
          View All <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="mt-4 flex flex-col gap-3 flex-1">
        {activities.map((activity, idx) => {
          const cfg = activityConfig[activity.type];
          const Icon = cfg.icon;
          return (
            <div key={activity.id} className="flex items-start gap-3 group">
              {/* Timeline line */}
              <div className="flex flex-col items-center shrink-0">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${cfg.iconBg}`}>
                  <Icon className={`${cfg.iconColor}`} style={{ width: 15, height: 15 }} />
                </div>
                {idx < activities.length - 1 && <div className="w-px flex-1 bg-slate-100 mt-1" style={{ minHeight: 12 }} />}
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0 pb-1">
                <p className="text-[12.5px] font-semibold text-[#0B1E36] truncate">{activity.title}</p>
                <p className="text-[11px] text-slate-400 truncate">{activity.subtitle}</p>
              </div>
              <span className="text-[10.5px] text-slate-400 shrink-0">{activity.time}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
