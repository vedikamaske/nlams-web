"use client";

import { ArrowRight, MoreVertical } from "lucide-react";

const statusConfig: Record<string, { label: string; bg: string; text: string; border: string }> = {
  "Under Review": { label: "Under Review", bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "Clarification": { label: "Clarification", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  "Draft": { label: "Draft", bg: "bg-slate-50", text: "text-slate-600", border: "border-slate-200" },
  "In Routing": { label: "In Routing", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  "Registered": { label: "Registered", bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
};

const projects = [
  { id: "P-2024-001", name: "Mumbai-Pune Expressway", type: "Highway", location: "Maharashtra", landRequired: "320 ha", status: "Under Review" },
  { id: "P-2024-002", name: "Nashik Industrial Corridor", type: "Industrial", location: "Maharashtra", landRequired: "150 ha", status: "Clarification" },
  { id: "P-2024-003", name: "Nagpur Metro Expansion", type: "Urban Infra", location: "Maharashtra", landRequired: "80 ha", status: "Draft" },
  { id: "P-2024-004", name: "Vidarbha Railway Line", type: "Railway", location: "Maharashtra", landRequired: "280 ha", status: "In Routing" },
  { id: "P-2024-005", name: "Pune Ring Road", type: "Highway", location: "Maharashtra", landRequired: "220 ha", status: "Registered" },
];

export default function RecentProjectsTable() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-[15px] font-bold text-[#0B1E36]">Recent Projects</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Your latest project proposals and their current status</p>
        </div>
        <a href="#" className="text-[12px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 no-underline transition-colors shrink-0">
          View All <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left py-2.5 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Project Name</th>
              <th className="text-left py-2.5 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Type</th>
              <th className="text-left py-2.5 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Location</th>
              <th className="text-left py-2.5 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Land Required</th>
              <th className="text-left py-2.5 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Status</th>
              <th className="py-2.5 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {projects.map((p) => {
              const st = statusConfig[p.status];
              return (
                <tr key={p.id} className="hover:bg-slate-50/60 transition-colors group">
                  <td className="py-3 px-3">
                    <p className="text-[13px] font-semibold text-[#0B1E36] truncate max-w-[180px]">{p.name}</p>
                    <p className="text-[10.5px] text-slate-400">{p.id}</p>
                  </td>
                  <td className="py-3 px-3 text-[12.5px] text-slate-600 font-medium">{p.type}</td>
                  <td className="py-3 px-3 text-[12.5px] text-slate-600">{p.location}</td>
                  <td className="py-3 px-3 text-[12.5px] font-semibold text-[#0B1E36]">{p.landRequired}</td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${st.bg} ${st.text} ${st.border}`}>
                      {st.label}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-slate-400 hover:text-slate-600">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
