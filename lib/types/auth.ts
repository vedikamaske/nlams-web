export interface AuthUser {
  id: string;
  authUserId: string;
  employeeCode?: string | null;
  firstName: string;
  middleName?: string | null;
  lastName: string;
  displayName?: string | null;
  phone?: string | null;
  email: string;
  avatarUrl?: string | null;
  designation?: string | null;
  status: string;
  organizationId?: string | null;
  departmentId?: string | null;
}

export interface AuthOrganization {
  id: string;
  name: string;
  code: string;
  organizationType: string;
  description?: string | null;
  status: string;
}

export interface AuthDepartment {
  id: string;
  name: string;
  code: string;
  description?: string | null;
}

export interface AuthRole {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  organizationId?: string | null;
  jurisdictionId?: string | null;
}

export interface AuthPermission {
  id: string;
  code: string;
  name: string;
  resource: string;
  action: string;
  description?: string | null;
}

export interface AuthJurisdiction {
  id: string;
  type: string;
  name: string;
  code: string;
  stateCode?: string | null;
  districtCode?: string | null;
  scopeType?: string;
}

export interface AuthDashboard {
  id: string;
  code: string;
  name: string;
  description?: string | null;
  roleId?: string | null;
  layoutConfig?: unknown;
  widgets?: Array<{
    id: string;
    code: string;
    title: string;
    widgetType: string;
    dataSource: string;
    displayOrder: number;
    isVisible: boolean;
  }>;
}

export interface AuthApplicationContext {
  user: AuthUser;
  organization: AuthOrganization | null;
  department: AuthDepartment | null;
  roles: AuthRole[];
  permissions: AuthPermission[];
  jurisdictions: AuthJurisdiction[];
  dashboards: AuthDashboard[];
}
