"use client";

import RoleDashboardView from "@/components/dashboard/RoleDashboardView";

export default function RRAuthorityDashboardPage() {
  return (
    <RoleDashboardView
      roleCode="RR_AUTHORITY"
      title="R&R Authority Portal"
      description="Rehabilitation & Resettlement plan approval, beneficiary tracking, and entitlement monitoring."
    />
  );
}
