"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { supabase } from "@/lib/supabase";
import { apiClient } from "@/lib/apiClient";
import {
  AuthUser,
  AuthOrganization,
  AuthDepartment,
  AuthRole,
  AuthPermission,
  AuthJurisdiction,
  AuthDashboard,
  AuthApplicationContext,
} from "@/lib/types/auth";
import { Session } from "@supabase/supabase-js";

interface AuthContextType {
  session: Session | null;
  user: AuthUser | null;
  organization: AuthOrganization | null;
  department: AuthDepartment | null;
  roles: AuthRole[];
  permissions: AuthPermission[];
  jurisdictions: AuthJurisdiction[];
  dashboards: AuthDashboard[];
  activeRole: AuthRole | null;
  setActiveRole: (role: AuthRole | null) => void;
  loading: boolean;
  isAuthenticated: boolean;
  provisionError: string | null;
  fetchUserContext: () => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [organization, setOrganization] = useState<AuthOrganization | null>(null);
  const [department, setDepartment] = useState<AuthDepartment | null>(null);
  const [roles, setRoles] = useState<AuthRole[]>([]);
  const [permissions, setPermissions] = useState<AuthPermission[]>([]);
  const [jurisdictions, setJurisdictions] = useState<AuthJurisdiction[]>([]);
  const [dashboards, setDashboards] = useState<AuthDashboard[]>([]);
  const [activeRole, setActiveRole] = useState<AuthRole | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [provisionError, setProvisionError] = useState<string | null>(null);

  const fetchUserContext = useCallback(async (): Promise<boolean> => {
    try {
      setProvisionError(null);
      const res = await apiClient<AuthApplicationContext>("/me");

      if (res.success && res.data) {
        const {
          user: appUser,
          organization: appOrg,
          department: appDept,
          roles: appRoles,
          permissions: appPerms,
          jurisdictions: appJuris,
          dashboards: appDashboards,
        } = res.data;

        setUser(appUser);
        setOrganization(appOrg);
        setDepartment(appDept);
        setRoles(appRoles);
        setPermissions(appPerms);
        setJurisdictions(appJuris);
        setDashboards(appDashboards);

        if (appRoles.length > 0) {
          setActiveRole(appRoles[0]);
        } else {
          setActiveRole(null);
        }

        return true;
      } else {
        setUser(null);
        setRoles([]);
        setPermissions([]);
        setJurisdictions([]);
        setDashboards([]);
        setActiveRole(null);
        setProvisionError(
          res.error ||
            "Your account is authenticated, but Sankalp access has not been provisioned."
        );
        return false;
      }
    } catch (err) {
      console.error("Failed to fetch user context:", err);
      setProvisionError(
        "Network or server error while resolving application context."
      );
      return false;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      const {
        data: { session: initialSession },
      } = await supabase.auth.getSession();

      if (isMounted) {
        setSession(initialSession);
        if (initialSession) {
          await fetchUserContext();
        }
        setLoading(false);
      }
    }

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (isMounted) {
        setSession(newSession);
        if (newSession) {
          await fetchUserContext();
        } else {
          setUser(null);
          setRoles([]);
          setPermissions([]);
          setJurisdictions([]);
          setDashboards([]);
          setActiveRole(null);
          setProvisionError(null);
        }
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [fetchUserContext]);

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    setRoles([]);
    setPermissions([]);
    setJurisdictions([]);
    setDashboards([]);
    setActiveRole(null);
    setSession(null);
    setProvisionError(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        organization,
        department,
        roles,
        permissions,
        jurisdictions,
        dashboards,
        activeRole,
        setActiveRole,
        loading,
        isAuthenticated: !!user && !!session,
        provisionError,
        fetchUserContext,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
