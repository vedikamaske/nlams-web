"use client";

import RoleDashboardView from "@/components/dashboard/RoleDashboardView";

export default function StateGovernmentDashboardPage() {
  return (
    <RoleDashboardView
      roleCode="STATE_GOVERNMENT"
      title="State Government Portal"
      description="State-wide land acquisition monitoring, revenue coordination, and district progress tracking."
    />
  );
}
