import { FileText, MapPin, IndianRupee, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  {
    icon: FileText,
    value: "128",
    label: "Projects",
    sublabel: "Illustrative prototype data",
  },
  {
    icon: MapPin,
    value: "12,480",
    label: "Parcels",
    sublabel: "Illustrative prototype data",
  },
  {
    icon: IndianRupee,
    value: "₹ 2,840 Cr",
    label: "Compensation (Est.)",
    sublabel: "Illustrative prototype data",
  },
  {
    icon: Users,
    value: "8,420",
    label: "Affected Families",
    sublabel: "Illustrative prototype data",
  },
];

export default function StatisticsStrip() {
  return (
    <section
      className="w-full bg-[#EAF3FB] border-b border-[#D8E3EE]"
      aria-label="Platform statistics"
    >
      <div
        className="mx-auto px-3.5 sm:px-6 lg:px-10 h-full"
        style={{ maxWidth: "1500px" }}
      >
        <div
          className="grid grid-cols-2 lg:grid-cols-4 h-full min-h-[96px] sm:min-h-[110px] lg:min-h-[120px]"
        >
          {stats.map(({ icon: Icon, value, label, sublabel }, index) => {
            const isRightBorderMobile = index % 2 === 0;
            const isBottomBorderMobile = index < 2;
            const isRightBorderDesktop = index < 3;

            return (
              <div
                key={label}
                className={cn(
                  "flex items-center gap-2.5 sm:gap-4 px-3 sm:px-6 lg:px-8 py-3.5 sm:py-5 lg:py-0",
                  isRightBorderMobile && "border-r border-[#C8D9EC]",
                  isBottomBorderMobile && "border-b border-[#C8D9EC] lg:border-b-0",
                  isRightBorderDesktop && "lg:border-r lg:border-[#C8D9EC]"
                )}
              >
                {/* Icon container */}
                <div
                  className="shrink-0 rounded-full bg-[#D5E9F5] flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 lg:w-[52px] lg:h-[52px]"
                  aria-hidden="true"
                >
                  <Icon
                    className="text-[#0B3A68] w-4 h-4 sm:w-5 sm:h-5 lg:w-[22px] lg:h-[22px]"
                  />
                </div>

                {/* Text */}
                <div className="min-w-0">
                  <p
                    className="font-bold text-[#0B3A68] leading-tight text-[18px] sm:text-[24px] lg:text-[28px] whitespace-nowrap"
                  >
                    {value}
                  </p>
                  <p className="text-[#102F50] font-semibold text-[11.5px] sm:text-[13px] lg:text-[14px] leading-tight mt-0.5 truncate">
                    {label}
                  </p>
                  <p className="text-[#5D7085] text-[9.5px] sm:text-[10.5px] lg:text-[11px] leading-tight mt-0.5 truncate">
                    {sublabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
