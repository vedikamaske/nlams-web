"use client";

import { ArrowRight, MapPin, Layers, Folder, AreaChart } from "lucide-react";

// Medak District case markers - placed within a stylized Telangana/Medak region
const casePins = [
  { id: 4, x: 195, y: 100, label: "NH-44 Medak Expansion" },
  { id: 3, x: 155, y: 160, label: "Medak Industrial Corridor" },
  { id: 2, x: 225, y: 170, label: "Hyderabad Metro Phase-2" },
  { id: 2, x: 195, y: 230, label: "Regional Railway Line" },
  { id: 1, x: 145, y: 270, label: "Medak Bypass Road" },
];

const summaryMetrics = [
  { icon: Folder, label: "Total Cases", value: "12" },
  { icon: MapPin, label: "Mandals Covered", value: "8" },
  { icon: Layers, label: "Villages Covered", value: "18" },
  { icon: AreaChart, label: "Total Land Area", value: "2,460 ha" },
];

export default function CALACasesLocationMap() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-[15px] font-bold text-[#0B1E36]">Cases by Location (Medak District)</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Geographic distribution of acquisition cases
          </p>
        </div>
        <a
          href="#"
          className="text-[12px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 no-underline transition-colors shrink-0"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Map & Summary Row */}
      <div className="flex gap-4 flex-1 items-center">
        {/* District Map Canvas */}
        <div className="flex-1 relative bg-[#F0F6FF] rounded-xl overflow-hidden min-h-[175px] flex items-center justify-center p-2">
          <svg viewBox="0 0 370 380" className="w-full h-full max-h-[200px]">
            {/* Stylized Medak district outline */}
            <path
              d="M100,60 L130,45 L170,50 L210,48 L245,55 L265,70 L275,90 L280,115 L275,140 L265,160 L258,180 L250,200 L240,220 L228,240 L215,258 L200,272 L185,280 L168,278 L152,270 L138,258 L125,242 L112,225 L100,205 L90,185 L84,165 L80,145 L82,125 L87,105 L95,85 Z"
              fill="#DBEAFE"
              stroke="#93C5FD"
              strokeWidth="1.5"
            />
            {/* Inner region highlight */}
            <path
              d="M140,120 L200,115 L230,140 L225,175 L195,185 L160,180 L138,158 Z"
              fill="#BFDBFE"
              stroke="#93C5FD"
              strokeWidth="0.8"
              opacity="0.5"
            />

            {/* Case Pins */}
            {casePins.map((pin, i) => (
              <g key={i} className="cursor-pointer group">
                <circle cx={pin.x} cy={pin.y} r="12" fill="#2563EB" opacity="0.15" />
                <circle cx={pin.x} cy={pin.y} r="8" fill="#2563EB" stroke="white" strokeWidth="1.5" />
                <text
                  x={pin.x}
                  y={pin.y + 0.5}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="white"
                  fontSize="7.5"
                  fontWeight="bold"
                >
                  {pin.id}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Right Stats */}
        <div className="flex flex-col gap-2.5 justify-center min-w-[130px]">
          {summaryMetrics.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-2">
                <Icon className="w-3.5 h-3.5 shrink-0 text-[#2563EB]" />
                <div className="min-w-0">
                  <p className="text-[10.5px] text-slate-400 leading-none">{item.label}</p>
                  <p className="text-[13px] font-bold text-[#0B1E36] leading-tight">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
