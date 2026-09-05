import { FileText, MapPin, IndianRupee, Users } from "lucide-react";

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
      style={{ minHeight: "120px" }}
    >
      <div
        className="mx-auto px-6 lg:px-10 h-full"
        style={{ maxWidth: "1500px" }}
      >
        <div
          className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#C8D9EC] h-full"
          style={{ minHeight: "120px" }}
        >
          {stats.map(({ icon: Icon, value, label, sublabel }, index) => (
            <div
              key={label}
              className="flex items-center gap-4 px-6 lg:px-8 py-5 lg:py-0"
            >
              {/* Icon container */}
              <div
                className="shrink-0 rounded-full bg-[#D5E9F5] flex items-center justify-center"
                style={{ width: 52, height: 52 }}
                aria-hidden="true"
              >
                <Icon
                  className="text-[#0B3A68]"
                  style={{ width: 22, height: 22 }}
                />
              </div>

              {/* Text */}
              <div className="min-w-0">
                <p
                  className="font-bold text-[#0B3A68] leading-tight"
                  style={{ fontSize: "28px" }}
                >
                  {value}
                </p>
                <p className="text-[#102F50] font-semibold text-[14px] leading-tight mt-0.5">
                  {label}
                </p>
                <p className="text-[#5D7085] text-[11px] leading-tight mt-0.5">
                  {sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
