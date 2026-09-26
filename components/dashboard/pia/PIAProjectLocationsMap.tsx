"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Layers, Folder, AreaChart } from "lucide-react";

const projectPins = [
  { id: 1, x: 195, y: 140, label: "North-West Corridor", color: "#2563EB" },
  { id: 5, x: 175, y: 220, label: "Mumbai-Nagpur Expressway", color: "#2563EB" },
  { id: 3, x: 235, y: 200, label: "Nagpur Industrial Corridor", color: "#2563EB" },
  { id: 2, x: 225, y: 290, label: "Hyderabad Metro Phase-2", color: "#2563EB" },
  { id: 4, x: 275, y: 250, label: "Vijayawada Bypass Road", color: "#2563EB" },
];

const summaryMetrics = [
  { icon: Folder, label: "Total Projects", value: "18" },
  { icon: MapPin, label: "States Covered", value: "8" },
  { icon: Layers, label: "Districts", value: "26" },
  { icon: AreaChart, label: "Total Land Area", value: "2,850 ha" },
];

export default function PIAProjectLocationsMap() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-[15px] font-bold text-[#0B1E36]">Project Locations</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Geographic distribution of assigned projects
          </p>
        </div>
        <Link
          href="/dashboard/pia/technical-review/gis"
          className="text-[12px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 no-underline transition-colors shrink-0"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Map & Summary Row */}
      <div className="flex gap-4 flex-1 items-center">
        {/* India Map Canvas */}
        <div className="flex-1 relative bg-[#F0F6FF] rounded-xl overflow-hidden min-h-[175px] flex items-center justify-center p-2">
          <svg viewBox="0 0 400 420" className="w-full h-full max-h-[190px]">
            {/* India Map Outline */}
            <path
              d="M180,20 L200,18 L220,22 L240,30 L255,28 L270,35 L280,45 L285,60 L290,75 L295,90 L298,108 L300,125 L295,140 L290,155 L285,168 L280,180 L275,195 L268,210 L260,225 L252,240 L245,255 L240,270 L235,285 L228,298 L220,310 L212,325 L205,340 L198,355 L190,368 L183,380 L178,390 L175,400 L172,390 L168,378 L162,365 L156,350 L150,337 L143,322 L135,308 L128,295 L120,282 L113,268 L108,254 L105,240 L100,226 L97,212 L95,198 L93,184 L90,170 L87,155 L83,140 L78,125 L75,110 L75,95 L78,80 L82,67 L88,56 L95,47 L105,40 L118,35 L130,30 L145,25 L160,20 L180,20 Z"
              fill="#DBEAFE"
              stroke="#93C5FD"
              strokeWidth="1.5"
            />
            <path
              d="M175,180 L265,175 L268,220 L260,240 L235,250 L200,245 L175,230 Z"
              fill="#BFDBFE"
              stroke="#93C5FD"
              strokeWidth="0.8"
              opacity="0.6"
            />

            {/* Pins */}
            {projectPins.map((pin) => (
              <g key={pin.id} className="cursor-pointer group">
                <circle cx={pin.x} cy={pin.y} r="10" fill={pin.color} opacity="0.18" />
                <circle cx={pin.x} cy={pin.y} r="7" fill={pin.color} stroke="white" strokeWidth="1.5" />
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

        {/* Floating Right Stats */}
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
