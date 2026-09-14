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
      className="grid grid-cols-2 gap-x-3 gap-y-2.5 sm:flex sm:flex-wrap lg:flex-nowrap items-center sm:gap-x-6 md:gap-x-7 lg:gap-x-7 xl:gap-x-9 border-t border-white/15 pt-3 sm:border-0 sm:pt-0"
      role="list"
      aria-label="Platform capabilities"
    >
      {capabilities.map(({ icon: Icon, label }) => (
        <div
          key={label}
          role="listitem"
          className="flex items-center gap-2 sm:gap-2.5 text-white/90 min-w-0 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
        >
          <Icon
            className="shrink-0 text-[#6EDFF4] sm:text-white/85 w-4 h-4 sm:w-[18px] sm:h-[18px]"
            aria-hidden="true"
          />
          <span className="text-[11.5px] sm:text-[13px] lg:text-[13.5px] xl:text-[14px] font-medium leading-tight whitespace-nowrap">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
