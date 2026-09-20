"use client";

const statusData = [
  { label: "Active", count: 216, percentage: 87, color: "#22C55E" },
  { label: "Pending", count: 18, percentage: 7, color: "#EAB308" },
  { label: "Suspended", count: 14, percentage: 6, color: "#EF4444" },
  { label: "Inactive", count: 7, percentage: 3, color: "#94A3B8" },
];

const total = 248;
const strokeWidth = 12;
const radius = 42;
const circumference = 2 * Math.PI * radius;

// Build segments
let accumulated = 0;
const segments = statusData.map((item) => {
  const pct = item.count / total;
  const dashArray = `${pct * circumference} ${circumference}`;
  const dashOffset = -(accumulated * circumference);
  accumulated += pct;
  return { ...item, dashArray, dashOffset };
});

export default function UserStatusChart() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-[15px] font-bold text-[#0B1E36]">User Status</h3>
        <p className="text-[11px] text-slate-400 font-medium mt-0.5">Current platform user breakdown</p>
      </div>

      {/* Donut centered */}
      <div className="flex items-center justify-center my-2">
        <div className="relative w-36 h-36 shrink-0">
          <svg
            className="w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >
            {/* Background track */}
            <circle
              cx="50" cy="50" r={radius}
              fill="transparent"
              stroke="#F1F5F9"
              strokeWidth={strokeWidth}
            />
            {segments.map((seg) => (
              <circle
                key={seg.label}
                cx="50" cy="50" r={radius}
                fill="transparent"
                stroke={seg.color}
                strokeWidth={strokeWidth}
                strokeDasharray={seg.dashArray}
                strokeDashoffset={seg.dashOffset}
                strokeLinecap="butt"
              />
            ))}
          </svg>
          {/* Center label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-extrabold text-[#0B1E36] leading-none">
              {total}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 mt-0.5">
              Total
            </span>
          </div>
        </div>
      </div>

      {/* Legend — 2-column grid below the donut */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        {statusData.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold text-[#0B1E36] leading-tight truncate">
                {item.label}
              </p>
              <p className="text-[10px] text-slate-400 font-medium leading-tight">
                {item.count} · {item.percentage}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
