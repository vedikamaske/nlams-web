"use client";

import { ArrowRight } from "lucide-react";

const roles = [
  { name: "System Admin", code: "SYSTEM_ADMIN", users: 4 },
  { name: "Central Govt.", code: "CENTRAL_MINISTRY", users: 12 },
  { name: "State Govt.", code: "STATE_GOVERNMENT", users: 18 },
  { name: "District Collector", code: "DISTRICT_COLLECTOR", users: 14 },
  { name: "LAO", code: "LAO", users: 24 },
  { name: "CALA", code: "CALA", users: 28 },
  { name: "PIA", code: "PIA", users: 48 },
  { name: "LRB", code: "LRB", users: 36 },
];

const totalUsers = roles.reduce((sum, r) => sum + r.users, 0);

export default function AssignedRolesTable() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-bold text-[#0B1E36]">Assigned Roles</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">
            {roles.length} roles · {totalUsers} total assignments
          </p>
        </div>
        <a
          href="#roles"
          className="text-[12px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 transition-colors no-underline shrink-0"
        >
          <span>Manage</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[340px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="pb-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Role Name
              </th>
              <th className="pb-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wide">
                Code
              </th>
              <th className="pb-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wide text-center">
                Users
              </th>
              <th className="pb-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wide text-right">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr
                key={role.code}
                className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors"
              >
                <td className="py-2.5 text-[12px] font-semibold text-[#0B1E36] whitespace-nowrap">
                  {role.name}
                </td>
                <td className="py-2.5 text-slate-400 font-mono text-[10px] whitespace-nowrap">
                  {role.code}
                </td>
                <td className="py-2.5 text-center font-bold text-[#0B1E36] text-[12px]">
                  {role.users}
                </td>
                <td className="py-2.5 text-right">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
