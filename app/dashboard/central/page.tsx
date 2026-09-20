"use client";

import RoleDashboardView from "@/components/dashboard/RoleDashboardView";

export default function CentralMinistryDashboardPage() {
  return (
    <RoleDashboardView
      roleCode="CENTRAL_MINISTRY"
      title="Central Ministry Dashboard"
      description="National-level land acquisition oversight, inter-state monitoring, and policy compliance."
    />
  );
}
