"use client";

import { ArrowRight, MoreVertical } from "lucide-react";

const cases = [
  {
    id: "CA-2401",
    name: "NH-44 Medak Expansion",
    type: "Highway",
    location: "Medak",
    landArea: "320 ha",
    stage: "Case Received",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    id: "CA-2402",
    name: "Hyderabad Metro Phase-2",
    type: "Urban Infra",
    location: "Shankarampet",
    landArea: "150 ha",
    stage: "Notification",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    id: "CA-2403",
    name: "Medak Industrial Corridor",
    type: "Industrial",
    location: "Narsapur",
    landArea: "280 ha",
    stage: "Objections",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
  },
  {
    id: "CA-2404",
    name: "Regional Railway Line",
    type: "Railway",
    location: "Siddipet",
    landArea: "420 ha",
    stage: "Award Processing",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    id: "CA-2405",
    name: "Medak Bypass Road",
    type: "Highway",
    location: "Ramayampet",
    landArea: "95 ha",
    stage: "Compensation",
    badge: "bg-teal-50 text-teal-700 border-teal-200",
  },
];

export default function CALARecentCasesTable() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-[15px] font-bold text-[#0B1E36]">Recent Acquisition Cases</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            Latest cases assigned to your jurisdiction
          </p>
        </div>
        <a
          href="#"
          className="text-[12px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 no-underline transition-colors shrink-0"
        >
          View All <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Table */}
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-2.5 px-3">Case / Project Name</th>
              <th className="py-2.5 px-3">Type</th>
              <th className="py-2.5 px-3">Location</th>
              <th className="py-2.5 px-3">Land Area</th>
              <th className="py-2.5 px-3">Stage</th>
              <th className="py-2.5 px-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {cases.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50/60 transition-colors group">
                <td className="py-3 px-3">
                  <p className="text-[12.5px] font-semibold text-[#0B1E36] truncate max-w-[170px]">
                    {c.name}
                  </p>
                </td>
                <td className="py-3 px-3 text-[12px] text-slate-600 font-medium">{c.type}</td>
                <td className="py-3 px-3 text-[12px] text-slate-600">{c.location}</td>
                <td className="py-3 px-3 text-[12px] font-bold text-[#0B1E36]">{c.landArea}</td>
                <td className="py-3 px-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${c.badge}`}
                  >
                    {c.stage}
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
