"use client";

import RoleDashboardView from "@/components/dashboard/RoleDashboardView";

export default function DistrictCollectorDashboardPage() {
  return (
    <RoleDashboardView
      roleCode="DISTRICT_COLLECTOR"
      title="District Collector Administration"
      description="District land acquisition oversight, notifications, scrutiny, and SLA monitoring."
    />
  );
}
