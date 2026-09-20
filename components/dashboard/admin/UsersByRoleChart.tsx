"use client";

import { ArrowRight } from "lucide-react";

const roleData = [
  { code: "PIA", label: "PIA", count: 48, color: "#2563EB" },
  { code: "LRB", label: "LRB", count: 36, color: "#7C3AED" },
  { code: "CALA", label: "CALA", count: 28, color: "#0891B2" },
  { code: "LAO", label: "LAO", count: 24, color: "#059669" },
  { code: "DISTRICT_COLLECTOR", label: "District Collector", count: 18, color: "#D97706" },
  { code: "STATE_GOVERNMENT", label: "State Government", count: 14, color: "#DC2626" },
  { code: "CENTRAL_MINISTRY", label: "Central Ministry", count: 12, color: "#DB2777" },
  { code: "OTHER", label: "Other", count: 8, color: "#64748B" },
];

const maxCount = 48;

export default function UsersByRoleChart() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-[15px] font-bold text-[#0B1E36]">Users by Role</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Distribution across NLAMS roles</p>
        </div>
        <a
          href="#roles"
          className="text-[12px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 transition-colors no-underline"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Horizontal Bar Rows */}
      <div className="flex flex-col gap-3 flex-1 justify-center">
        {roleData.map((item) => {
          const widthPercent = Math.round((item.count / maxCount) * 100);
          return (
            <div key={item.code} className="flex items-center gap-3 group">
              {/* Label */}
              <span className="text-[12px] font-semibold text-slate-600 w-28 shrink-0 truncate">
                {item.label}
              </span>

              {/* Bar track */}
              <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: `${widthPercent}%`,
                    backgroundColor: item.color,
                  }}
                />
              </div>

              {/* Count */}
              <span
                className="text-[12px] font-bold w-7 text-right shrink-0"
                style={{ color: item.color }}
              >
                {item.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
