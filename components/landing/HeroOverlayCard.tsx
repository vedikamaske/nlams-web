import { Route, Leaf } from "lucide-react";

/**
 * GIS floating card — NH-48 Expansion
 * Card and its connector pin are rendered as SEPARATE absolute elements
 * to avoid any double-rendering layout shifts from React StrictMode.
 */
export function GISCardNH48() {
  return (
    <>
      {/* The info card */}
      <div
        className="absolute hidden lg:block bg-white rounded-md shadow-lg border border-[#D8E3EE] px-3 py-2.5"
        style={{ top: "16%", right: "21%", width: 195, zIndex: 6 }}
        role="complementary"
        aria-label="GIS annotation: NH-48 Expansion"
      >
        <div className="flex items-start gap-2">
          <div
            className="shrink-0 bg-[#EAF8FA] rounded-md flex items-center justify-center mt-0.5"
            style={{ width: 30, height: 30 }}
            aria-hidden="true"
          >
            <Route className="w-4 h-4 text-[#0891B2]" />
          </div>
          <div className="min-w-0">
            <p className="text-[#0B3A68] font-bold text-[12.5px] leading-tight">
              NH-48 Expansion
            </p>
            <p className="text-[#5D7085] text-[11px] leading-tight mt-0.5">
              245.6 Ha &nbsp;|&nbsp; 12 Villages
            </p>
          </div>
        </div>
      </div>

      {/* Connector: vertical line + pin dot below the card */}
      <div
        className="absolute hidden lg:block"
        aria-hidden="true"
        style={{
          /* Position the connector below and near the center of the card */
          top: "calc(16% + 48px)",   /* card top + card height (~48px) */
          right: "calc(21% + 88px)", /* right of card + half card width */
          zIndex: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="bg-[#0891B2]/65"
          style={{ width: 1, height: 26 }}
        />
        <div
          className="rounded-full bg-[#0891B2] border-2 border-white shadow-sm"
          style={{ width: 10, height: 10 }}
        />
      </div>
    </>
  );
}

/**
 * GIS floating card — Acquisition Parcel
 * Card and connector are separate absolute elements.
 */
export function GISCardParcel() {
  return (
    <>
      {/* Connector: pin dot + vertical line above the card */}
      <div
        className="absolute hidden lg:block"
        aria-hidden="true"
        style={{
          bottom: "calc(18% + 94px)", /* card bottom + card height (~94px) */
          right: "calc(7% + 50px)",
          zIndex: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="rounded-full bg-[#0891B2] border-2 border-white shadow-sm"
          style={{ width: 10, height: 10 }}
        />
        <div
          className="bg-[#0891B2]/65"
          style={{ width: 1, height: 26 }}
        />
      </div>

      {/* The info card */}
      <div
        className="absolute hidden lg:block bg-white rounded-md shadow-lg border border-[#D8E3EE] px-3 py-2.5"
        style={{ bottom: "18%", right: "7%", width: 188, zIndex: 6 }}
        role="complementary"
        aria-label="GIS annotation: Acquisition Parcel"
      >
        <div className="flex items-start gap-2">
          <div
            className="shrink-0 bg-[#EAF8FA] rounded-md flex items-center justify-center mt-0.5"
            style={{ width: 30, height: 30 }}
            aria-hidden="true"
          >
            <Leaf className="w-4 h-4 text-[#0891B2]" />
          </div>
          <div className="min-w-0">
            <p className="text-[#0B3A68] font-bold text-[12px] leading-tight">
              Acquisition Parcel
            </p>
            <p className="text-[#5D7085] text-[11px] leading-tight mt-0.5">
              Survey No. 128/2
            </p>
            <p className="text-[#5D7085] text-[11px] leading-tight">
              Area: 3.4 Ha
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Translucent cyan GIS parcel polygon — SVG overlay.
 */
export function GISParcelPolygon() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
      aria-hidden="true"
      role="presentation"
      preserveAspectRatio="none"
      style={{ zIndex: 3 }}
    >
      <polygon
        points="60%,52% 71%,47% 77%,54% 75%,66% 63%,69% 58%,61%"
        fill="rgba(8,145,178,0.15)"
        stroke="#0891B2"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="60%" cy="52%" r="4" fill="#0891B2" opacity="0.80" />
      <circle cx="71%" cy="47%" r="4" fill="#0891B2" opacity="0.80" />
      <circle cx="77%" cy="54%" r="4" fill="#0891B2" opacity="0.80" />
      <circle cx="75%" cy="66%" r="4" fill="#0891B2" opacity="0.80" />
      <circle cx="63%" cy="69%" r="4" fill="#0891B2" opacity="0.80" />
      <circle cx="58%" cy="61%" r="4" fill="#0891B2" opacity="0.80" />
    </svg>
  );
}
