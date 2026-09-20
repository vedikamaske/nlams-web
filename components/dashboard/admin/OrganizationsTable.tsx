"use client";

import { ArrowRight } from "lucide-react";

export default function OrganizationsTable() {
  const orgs = [
    { name: "Ministry of Rural Development", type: "Central Government", users: 12 },
    { name: "Government of Maharashtra", type: "State Government", users: 18 },
    { name: "Pune District Administration", type: "District", users: 14 },
    { name: "Sharma Infra Ltd.", type: "PIA", users: 8 },
    { name: "Mehta Constructions", type: "PIA", users: 6 },
    { name: "Satara R&R Authority", type: "LRB", users: 5 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#CBDCE9] p-5 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-[#102F50]">Organizations</h3>
        <a
          href="#orgs"
          className="text-xs font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Table */}
      <div className="overflow-x-auto my-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
              <th className="pb-2.5 font-bold">Organization Name</th>
              <th className="pb-2.5 font-bold">Type</th>
              <th className="pb-2.5 font-bold text-right">Users</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 font-medium">
            {orgs.map((org) => (
              <tr key={org.name} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-3 font-bold text-[#102F50]">{org.name}</td>
                <td className="py-3 text-slate-500 font-medium text-xs">
                  {org.type}
                </td>
                <td className="py-3 text-right font-bold text-[#102F50]">
                  {org.users}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
