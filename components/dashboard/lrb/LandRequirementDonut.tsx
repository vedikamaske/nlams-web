"use client";

import { ArrowRight } from "lucide-react";

const segments = [
  { label: "Highway", hectares: 520, pct: 41, color: "#2563EB" },
  { label: "Railway", hectares: 320, pct: 26, color: "#7C3AED" },
  { label: "Industrial", hectares: 180, pct: 14, color: "#10B981" },
  { label: "Urban Infra", hectares: 150, pct: 12, color: "#F59E0B" },
  { label: "Other", hectares: 80, pct: 6, color: "#94A3B8" },
];

const total = 1250;
const cx = 80;
const cy = 80;
const r = 65;
const innerR = 42;

function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

export default function LandRequirementDonut() {
  let startAngle = 0;
  const arcs = segments.map((seg) => {
    const sweep = (seg.pct / 100) * 360;
    const arc = { ...seg, startAngle, endAngle: startAngle + sweep };
    startAngle += sweep;
    return arc;
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-bold text-[#0B1E36]">Land Requirement Overview</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Total land requirement across all projects</p>
        </div>
        <a href="#" className="text-[12px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 no-underline transition-colors shrink-0">
          View All <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="flex items-center gap-5 flex-1">
        {/* Donut SVG */}
        <div className="relative shrink-0">
          <svg width="160" height="160" viewBox="0 0 160 160">
            {arcs.map((arc, i) => {
              const outerPath = describeArc(cx, cy, r, arc.startAngle, arc.endAngle);
              const innerStart = polarToCartesian(cx, cy, innerR, arc.endAngle);
              const innerEnd = polarToCartesian(cx, cy, innerR, arc.startAngle);
              const largeArc = arc.endAngle - arc.startAngle <= 180 ? "0" : "1";
              const fullPath = `${outerPath} L ${innerStart.x} ${innerStart.y} A ${innerR} ${innerR} 0 ${largeArc} 1 ${innerEnd.x} ${innerEnd.y} Z`;
              return (
                <path key={i} d={fullPath} fill={arc.color} className="transition-all hover:opacity-80 cursor-pointer" stroke="white" strokeWidth="2" />
              );
            })}
            {/* Center text */}
            <text x={cx} y={cy - 8} textAnchor="middle" fill="#0B1E36" fontSize="20" fontWeight="800">{total.toLocaleString()}</text>
            <text x={cx} y={cy + 8} textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="600">Hectares</text>
            <text x={cx} y={cy + 20} textAnchor="middle" fill="#64748B" fontSize="9">Total Requirement</text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2.5 flex-1">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                <span className="text-[12px] text-slate-600 font-medium truncate">{seg.label}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[12px] font-bold text-[#0B1E36]">{seg.hectares} ha</span>
                <span className="text-[11px] text-slate-400">({seg.pct}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
