"use client";

import { ArrowRight } from "lucide-react";

const requests = [
  {
    id: "1",
    initials: "RS",
    name: "Rahul Sharma",
    role: "PIA",
    org: "Sharma Infra Ltd.",
    time: "2 hrs ago",
    status: "Pending",
    color: "#2563EB",
  },
  {
    id: "2",
    initials: "AP",
    name: "Anjali Patil",
    role: "CALA",
    org: "Maharashtra",
    time: "5 hrs ago",
    status: "Pending",
    color: "#7C3AED",
  },
  {
    id: "3",
    initials: "VK",
    name: "Vikram Kulkarni",
    role: "LRB",
    org: "Pune District",
    time: "1 day ago",
    status: "Pending",
    color: "#0891B2",
  },
  {
    id: "4",
    initials: "PS",
    name: "Priya Singh",
    role: "LAO",
    org: "Nashik",
    time: "1 day ago",
    status: "Pending",
    color: "#059669",
  },
  {
    id: "5",
    initials: "AM",
    name: "Arjun Mehta",
    role: "PIA",
    org: "Mehta Constructions",
    time: "2 days ago",
    status: "Approved",
    color: "#D97706",
  },
];

export default function RecentAccessRequests() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[15px] font-bold text-[#0B1E36]">Access Requests</h3>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5">Recent user access submissions</p>
        </div>
        <a
          href="#access-requests"
          className="text-[12px] font-semibold text-[#2563EB] hover:text-[#1D4ED8] flex items-center gap-1 transition-colors no-underline shrink-0"
        >
          <span>View All</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2 flex-1">
        {requests.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100"
          >
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold shrink-0"
              style={{ backgroundColor: item.color }}
            >
              {item.initials}
            </div>

            {/* Name + org */}
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-bold text-[#0B1E36] leading-tight truncate">
                {item.name}
                <span className="ml-1.5 text-[10px] font-semibold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full">
                  {item.role}
                </span>
              </p>
              <p className="text-[11px] text-slate-400 font-medium leading-tight mt-0.5 truncate">
                {item.org} · {item.time}
              </p>
            </div>

            {/* Status badge */}
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
                item.status === "Approved"
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
