"use client";

import { ArrowRight, MapPin, Map, Building2, Layers } from "lucide-react";

// SVG India map coordinates for project markers (approximate)
const projectMarkers = [
  { id: 1, x: 245, y: 168, label: "Mumbai-Pune Expressway", state: "MH", color: "#2563EB" },
  { id: 2, x: 255, y: 178, label: "Nashik Industrial Corridor", state: "MH", color: "#7C3AED" },
  { id: 3, x: 240, y: 162, label: "Nagpur Metro Expansion", state: "MH", color: "#F59E0B" },
  { id: 4, x: 200, y: 185, label: "Vidarbha Railway Line", state: "MH", color: "#10B981" },
  { id: 5, x: 265, y: 190, label: "Pune Ring Road", state: "MH", color: "#06B6D4" },
];

const summaryStats = [
  { icon: Map, label: "Total Projects", value: "12", color: "text-blue-600" },
  { icon: MapPin, label: "States Covered", value: "5", color: "text-purple-600" },
  { icon: Building2, label: "Districts", value: "18", color: "text-amber-600" },
  { icon: Layers, label: "Total Land Area", value: "1,250 ha", color: "text-emerald-600" },
];

export default function ProjectLocationsMap() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col h-full">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-bold text-[#0B1E36]">Project Locations</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Geographic distribution of your projects</p>
        </div>
        <a href="#" className="text-[12px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 no-underline transition-colors shrink-0">
          View All <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="flex gap-4 flex-1">
        {/* India Map SVG */}
        <div className="flex-1 relative bg-[#F0F6FF] rounded-xl overflow-hidden min-h-[180px]">
          <svg viewBox="0 0 400 460" className="w-full h-full" style={{ maxHeight: 220 }}>
            {/* Simplified India outline */}
            <path
              d="M180,20 L200,18 L220,22 L240,30 L255,28 L270,35 L280,45 L285,60 L290,75 L295,90 L298,108 L300,125 L295,140 L290,155 L285,168 L280,180 L275,195 L268,210 L260,225 L252,240 L245,255 L240,270 L235,285 L228,298 L220,310 L212,325 L205,340 L198,355 L190,368 L183,380 L178,390 L175,400 L172,390 L168,378 L162,365 L156,350 L150,337 L143,322 L135,308 L128,295 L120,282 L113,268 L108,254 L105,240 L100,226 L97,212 L95,198 L93,184 L90,170 L87,155 L83,140 L78,125 L75,110 L75,95 L78,80 L82,67 L88,56 L95,47 L105,40 L118,35 L130,30 L145,25 L160,20 L180,20 Z"
              fill="#DBEAFE"
              stroke="#93C5FD"
              strokeWidth="1.5"
            />
            {/* State boundaries approximation */}
            <path d="M175,180 L265,175 L268,220 L260,240 L235,250 L200,245 L175,230 Z" fill="#BFDBFE" stroke="#93C5FD" strokeWidth="0.8" opacity="0.6" />

            {/* Project Markers */}
            {projectMarkers.map((m) => (
              <g key={m.id} className="cursor-pointer group">
                <circle cx={m.x} cy={m.y} r="10" fill={m.color} opacity="0.15" />
                <circle cx={m.x} cy={m.y} r="6" fill={m.color} />
                <text x={m.x} y={m.y + 1} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="7" fontWeight="bold">{m.id}</text>
              </g>
            ))}
          </svg>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-3 justify-center min-w-[130px]">
          {summaryStats.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 shrink-0 ${s.color}`} />
                <div>
                  <p className="text-[10.5px] text-slate-400 leading-none">{s.label}</p>
                  <p className="text-[13px] font-bold text-[#0B1E36] leading-tight">{s.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
