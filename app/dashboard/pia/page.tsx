"use client";

import RoleDashboardView from "@/components/dashboard/RoleDashboardView";

export default function PIADashboardPage() {
  return (
    <RoleDashboardView
      roleCode="PIA"
      title="Project Implementing Agency (PIA) Portal"
      description="Project execution, proposal review, acquisition requests, and progress tracking."
    />
  );
}
