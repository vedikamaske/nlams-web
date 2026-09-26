"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, MoreVertical } from "lucide-react";

const projects = [
  {
    id: "P-101",
    name: "Mumbai-Nagpur Expressway",
    type: "Highway",
    location: "Maharashtra",
    landRequired: "320 ha",
    stage: "Under Review",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    id: "P-102",
    name: "Hyderabad Metro Phase-2",
    type: "Urban Infra",
    location: "Telangana",
    landRequired: "150 ha",
    stage: "Pending Review",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    id: "P-103",
    name: "Nagpur Industrial Corridor",
    type: "Industrial",
    location: "Maharashtra",
    landRequired: "280 ha",
    stage: "Clarification",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    id: "P-104",
    name: "Vijayawada Bypass Road",
    type: "Highway",
    location: "Andhra Pradesh",
    landRequired: "420 ha",
    stage: "Technical Review",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "P-105",
    name: "Pune Ring Road",
    type: "Highway",
    location: "Maharashtra",
    landRequired: "220 ha",
    stage: "Ready for Routing",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
];

export default function PIARecentProjectsTable() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-[15px] font-bold text-[#0B1E36]">Recent Assigned Projects</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Latest projects assigned to your agency
          </p>
        </div>
        <Link
          href="/dashboard/pia/projects/assigned"
          className="text-[12px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 no-underline transition-colors shrink-0"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-2.5 px-3">Project Name</th>
              <th className="py-2.5 px-3">Type</th>
              <th className="py-2.5 px-3">Location</th>
              <th className="py-2.5 px-3">Land Required</th>
              <th className="py-2.5 px-3">Stage</th>
              <th className="py-2.5 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/60 transition-colors group">
                <td className="py-3 px-3">
                  <p className="text-[12.5px] font-semibold text-[#0B1E36] truncate max-w-[170px]">{p.name}</p>
                </td>
                <td className="py-3 px-3 text-[12px] text-slate-600 font-medium">{p.type}</td>
                <td className="py-3 px-3 text-[12px] text-slate-600">{p.location}</td>
                <td className="py-3 px-3 text-[12px] font-bold text-[#0B1E36]">{p.landRequired}</td>
                <td className="py-3 px-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${p.badge}`}>
                    {p.stage}
                  </span>
                </td>
                <td className="py-3 px-3 text-center">
                  <button className="p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-slate-400 hover:text-slate-600">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
