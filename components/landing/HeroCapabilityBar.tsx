import { Layers, Settings, BarChart3, Users } from "lucide-react";

const capabilities = [
  { icon: Layers, label: "Integrated Land Data" },
  { icon: Settings, label: "Configurable Workflows" },
  { icon: BarChart3, label: "Real-time Monitoring" },
  { icon: Users, label: "Multi-level Governance" },
];

export default function HeroCapabilityBar() {
  return (
    <div
      className="flex flex-wrap items-center gap-x-8 gap-y-3 sm:gap-x-12"
      role="list"
      aria-label="Platform capabilities"
    >
      {capabilities.map(({ icon: Icon, label }) => (
        <div
          key={label}
          role="listitem"
          className="flex items-center gap-2.5 text-white/90"
        >
          <Icon
            className="shrink-0 text-white/80"
            style={{ width: 22, height: 22 }}
            aria-hidden="true"
          />
          <span className="text-[14.5px] font-medium leading-tight whitespace-nowrap">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
