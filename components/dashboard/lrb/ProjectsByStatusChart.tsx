"use client";

import { ArrowRight } from "lucide-react";

const statusData = [
  { label: "Draft", count: 4, color: "#3B82F6", lightColor: "#EFF6FF" },
  { label: "Under PIA Review", count: 5, color: "#7C3AED", lightColor: "#F5F3FF" },
  { label: "Clarification Required", count: 3, color: "#F59E0B", lightColor: "#FFFBEB" },
  { label: "In Routing", count: 3, color: "#10B981", lightColor: "#ECFDF5" },
  { label: "Registered", count: 2, color: "#06B6D4", lightColor: "#ECFEFF" },
];

const maxCount = 5;
const chartHeight = 160;
const barWidth = 36;

export default function ProjectsByStatusChart() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col h-full">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-[15px] font-bold text-[#0B1E36]">Projects by Status</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Distribution of your projects across different stages</p>
        </div>
        <a href="#" className="text-[12px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 no-underline transition-colors shrink-0">
          View All <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Bar Chart */}
      <div className="flex-1 flex items-end justify-around gap-2 pt-4 pb-2">
        {statusData.map((item) => {
          const heightPct = (item.count / maxCount) * chartHeight;
          return (
            <div key={item.label} className="flex flex-col items-center gap-1.5 flex-1">
              {/* Count label */}
              <span className="text-[13px] font-bold text-[#0B1E36]">{item.count}</span>
              {/* Bar */}
              <div
                className="w-full rounded-t-lg transition-all duration-700 relative group"
                style={{ height: `${heightPct}px`, backgroundColor: item.color, minWidth: barWidth, maxWidth: 48 }}
              >
                {/* Tooltip on hover */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0B1E36] text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {item.label}: {item.count}
                </div>
              </div>
              {/* X-Axis label */}
              <span className="text-[9.5px] font-medium text-slate-500 text-center leading-tight">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Y-axis guides */}
      <div className="flex items-center justify-between mt-2 px-1">
        {[0, 2, 4, 6, 8].map((v) => (
          <span key={v} className="text-[9px] text-slate-300">{v}</span>
        ))}
      </div>
    </div>
  );
}
