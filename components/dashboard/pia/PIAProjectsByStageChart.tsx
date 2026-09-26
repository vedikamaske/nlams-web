"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const stages = [
  { label: "Pending Review", count: 6, color: "#3B82F6" },
  { label: "Under Technical Review", count: 8, color: "#8B5CF6" },
  { label: "Clarification Sent", count: 3, color: "#F97316" },
  { label: "Ready for Routing", count: 4, color: "#10B981" },
  { label: "In Routing", count: 2, color: "#06B6D4" },
];

const maxCount = 10;
const chartHeight = 150;

export default function PIAProjectsByStageChart() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col h-full">
      {/* Card Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-[15px] font-bold text-[#0B1E36]">Projects by Stage</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Distribution of assigned projects across different stages
          </p>
        </div>
        <Link
          href="/dashboard/pia/projects/assigned"
          className="text-[12px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 no-underline transition-colors shrink-0"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Bar Chart Container */}
      <div className="flex-1 flex flex-col justify-end pt-4 pb-1">
        {/* Bars Container with Y-grid background */}
        <div className="relative flex items-end justify-around gap-2 h-[150px] border-b border-slate-200 px-2">
          {/* Y Axis Guide Lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none -left-2 right-0">
            {[10, 8, 6, 4, 2, 0].map((v) => (
              <div key={v} className="flex items-center w-full">
                <span className="text-[9px] text-slate-300 w-4 text-right pr-1">{v}</span>
                <div className="flex-1 border-b border-slate-100" />
              </div>
            ))}
          </div>

          {/* Bar Columns */}
          {stages.map((stage) => {
            const barH = (stage.count / maxCount) * chartHeight;
            return (
              <div key={stage.label} className="relative z-10 flex flex-col items-center flex-1 group">
                <span className="text-[12px] font-bold text-[#0B1E36] mb-1 group-hover:text-blue-600 transition-colors">
                  {stage.count}
                </span>
                <div
                  style={{ height: `${barH}px`, backgroundColor: stage.color }}
                  className="w-9 rounded-t-md transition-all duration-500 hover:opacity-90 cursor-pointer shadow-xs"
                />
              </div>
            );
          })}
        </div>

        {/* X Axis Labels */}
        <div className="flex justify-around gap-2 pt-2 px-2 text-center">
          {stages.map((stage) => (
            <div key={stage.label} className="flex-1 text-[10px] font-medium text-slate-500 leading-tight">
              {stage.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
