import { ChevronDown } from "lucide-react";

export default function ScrollIndicator() {
  return (
    <div className="w-full flex flex-col items-center py-5 bg-white" aria-hidden="true">
      {/* Mouse icon (SVG) */}
      <svg
        width="22"
        height="32"
        viewBox="0 0 22 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="text-[#5D7085]"
      >
        <rect
          x="1"
          y="1"
          width="20"
          height="30"
          rx="10"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
        <rect
          x="9.5"
          y="5"
          width="3"
          height="6"
          rx="1.5"
          fill="currentColor"
          opacity="0.6"
        />
      </svg>

      <p className="text-[#5D7085] text-[12px] font-medium tracking-wide mt-2 leading-none">
        Scroll to explore
      </p>

      <ChevronDown
        className="text-[#5D7085] mt-1.5"
        style={{ width: 16, height: 16 }}
        aria-hidden="true"
      />
    </div>
  );
}
