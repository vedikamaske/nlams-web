"use client";

import RoleDashboardView from "@/components/dashboard/RoleDashboardView";

export default function FieldOfficerDashboardPage() {
  return (
    <RoleDashboardView
      roleCode="FIELD_OFFICER"
      title="Field Officer Operations Portal"
      description="Field verification, ground surveys, GIS boundary checks, and task execution."
    />
  );
}
