"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/apiClient";
import { UserPlus, Search, RefreshCw, Users, MoreVertical, Shield, Building2, CheckCircle2, XCircle, Clock, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import CreateUserModal from "./CreateUserModal";

interface UserRole {
  id: string;
  code: string;
  name: string;
}

interface AppUser {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  displayName: string;
  email: string;
  phone?: string;
  designation?: string;
  status: "ACTIVE" | "SUSPENDED" | "INACTIVE";
  organization?: { id: string; name: string; code: string } | null;
  roles: UserRole[];
  createdAt: string;
}

const statusConfig = {
  ACTIVE: { label: "Active", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  SUSPENDED: { label: "Suspended", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  INACTIVE: { label: "Inactive", bg: "bg-red-50", text: "text-red-700", border: "border-red-200" },
};

const roleStyleMap: Record<string, { bg: string; text: string; border: string }> = {
  SYSTEM_ADMIN: { bg: "bg-purple-50", text: "text-purple-800", border: "border-purple-200" },
  LRB_OFFICER: { bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-200" },
  LRB: { bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-200" },
  LAO_OFFICER: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200" },
  LAO: { bg: "bg-emerald-50", text: "text-emerald-800", border: "border-emerald-200" },
  REVENUE_OFFICER: { bg: "bg-cyan-50", text: "text-cyan-800", border: "border-cyan-200" },
  CALA: { bg: "bg-cyan-50", text: "text-cyan-800", border: "border-cyan-200" },
  COMPETENT_AUTHORITY: { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" },
  DEPARTMENT_ADMIN: { bg: "bg-indigo-50", text: "text-indigo-800", border: "border-indigo-200" },
  CITIZEN: { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-200" },
  AUDITOR: { bg: "bg-teal-50", text: "text-teal-800", border: "border-teal-200" },
};

const getRoleBadgeStyle = (code: string) => {
  return roleStyleMap[code] || { bg: "bg-sky-50", text: "text-sky-800", border: "border-sky-200" };
};

export default function ProfileManagement() {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [statusMenuId, setStatusMenuId] = useState<string | null>(null);

  const fetchUsers = useCallback(async (p = 1, q = search, r = selectedRole) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(p), limit: "10" });
      if (q) params.set("search", q);
      if (r) params.set("role", r);
      const res = await apiClient<{ users: AppUser[]; pagination: { total: number; totalPages: number } }>(`/admin/users?${params}`);
      if (res.success && res.data) {
        setUsers(res.data.users);
        setTotal(res.data.pagination.total);
        setTotalPages(res.data.pagination.totalPages);
        setPage(p);
      }
    } finally {
      setLoading(false);
    }
  }, [search, selectedRole]);

  useEffect(() => {
    fetchUsers(1, search, selectedRole);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers(1, search, selectedRole);
  };

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    fetchUsers(1, search, role);
  };

  const updateStatus = async (userId: string, status: string) => {
    setStatusMenuId(null);
    await apiClient(`/admin/users/${userId}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
    fetchUsers(page, search, selectedRole);
  };

  const getInitials = (u: AppUser) =>
    `${u.firstName?.[0] ?? ""}${u.lastName?.[0] ?? ""}`.toUpperCase();

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-[17px] font-bold text-[#0B1E36] flex items-center gap-2">
            <Users className="w-5 h-5 text-[#2563EB]" />
            Profile Management
          </h2>
          <p className="text-[11.5px] text-slate-400 mt-0.5">Create and manage officer accounts and role assignments</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0B3A68] hover:bg-[#082D4A] text-white text-[13px] font-semibold rounded-xl transition-colors shadow-sm cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          Create New Account
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Search & Filters Bar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3 flex-wrap">
          <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2">
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, email, designation..."
                className="w-full pl-9 pr-3 py-2 text-[12px] border border-slate-200 rounded-xl outline-none focus:border-[#2563EB] transition-all"
              />
            </div>
            <button type="submit" className="px-3.5 py-2 bg-[#0B3A68] text-white text-[12px] font-semibold rounded-xl cursor-pointer hover:bg-[#082D4A] transition-colors">Search</button>
          </form>

          {/* Role Filter & Refresh */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={selectedRole}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-[12px] font-medium rounded-xl px-3 py-2 pr-8 cursor-pointer outline-none focus:border-[#2563EB] transition-colors"
              >
                <option value="">All Roles</option>
                <option value="SYSTEM_ADMIN">System Admin</option>
                <option value="LRB_OFFICER">LRB Officer</option>
                <option value="LAO_OFFICER">LAO Officer</option>
                <option value="REVENUE_OFFICER">Revenue Officer</option>
                <option value="COMPETENT_AUTHORITY">Competent Authority</option>
                <option value="DEPARTMENT_ADMIN">Department Admin</option>
                <option value="CITIZEN">Citizen</option>
                <option value="AUDITOR">Auditor</option>
              </select>
              <Filter className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <button onClick={() => fetchUsers(page, search, selectedRole)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-slate-200" title="Refresh">
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left py-3 px-4 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Officer</th>
                <th className="text-left py-3 px-4 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Email</th>
                <th className="text-left py-3 px-4 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Roles</th>
                <th className="text-left py-3 px-4 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Organization</th>
                <th className="text-left py-3 px-4 text-[11px] font-semibold text-slate-400 uppercase tracking-wide">Status</th>
                <th className="py-3 px-4 text-[11px] font-semibold text-slate-400 uppercase tracking-wide text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr><td colSpan={6} className="py-12 text-center text-sm text-slate-400">Loading profile data...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={6} className="py-12 text-center text-sm text-slate-400">No profile records found matching criteria.</td></tr>
              ) : (
                users.map((user) => {
                  const st = statusConfig[user.status];
                  return (
                    <tr key={user.id} className="hover:bg-slate-50/60 transition-colors group">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1E3A5F] to-[#2563EB] flex items-center justify-center text-white text-[11px] font-bold shrink-0 shadow-xs">
                            {getInitials(user)}
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-[#0B1E36]">{user.displayName}</p>
                            {user.designation && <p className="text-[10.5px] text-slate-400">{user.designation}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[12px] text-slate-600">{user.email}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {user.roles.length === 0 ? (
                            <span className="text-[10.5px] text-slate-400">No roles</span>
                          ) : user.roles.map((r) => {
                            const badgeSt = getRoleBadgeStyle(r.code);
                            return (
                              <span key={r.id}
                                className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold border ${badgeSt.bg} ${badgeSt.text} ${badgeSt.border}`}>
                                <Shield className="w-2.5 h-2.5" />
                                {r.code}
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-[12px] text-slate-600">
                        <div className="flex items-center gap-1.5">
                          {user.organization ? (<><Building2 className="w-3.5 h-3.5 text-slate-400" /><span className="truncate max-w-[140px]">{user.organization.name}</span></>) : <span className="text-slate-300">-</span>}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10.5px] font-semibold border ${st.bg} ${st.text} ${st.border}`}>
                          {st.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center relative">
                        <div className="relative inline-block">
                          <button
                            onClick={() => setStatusMenuId(statusMenuId === user.id ? null : user.id)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer text-slate-400 hover:text-slate-600">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          {statusMenuId === user.id && (
                            <div className="absolute right-0 top-8 bg-white border border-slate-200 rounded-xl shadow-xl py-1.5 z-20 min-w-[140px]">
                              {["ACTIVE", "SUSPENDED", "INACTIVE"].filter(s => s !== user.status).map((s) => (
                                <button key={s} onClick={() => updateStatus(user.id, s)}
                                  className="w-full text-left px-3 py-2 text-[12px] font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer">
                                  Set {s.charAt(0) + s.slice(1).toLowerCase()}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100 bg-slate-50/50">
          <p className="text-[11.5px] text-slate-500 font-medium">
            {total > 0
              ? `Showing ${Math.min((page - 1) * 10 + 1, total)} to ${Math.min(page * 10, total)} of ${total} entries`
              : "No records to display"}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchUsers(page - 1, search, selectedRole)}
              disabled={page <= 1 || loading}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 disabled:opacity-40 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Previous
            </button>
            <span className="text-[12px] font-semibold text-slate-700 px-2">
              Page {page} of {totalPages || 1}
            </span>
            <button
              onClick={() => fetchUsers(page + 1, search, selectedRole)}
              disabled={page >= totalPages || loading}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-[12px] font-medium text-slate-600 disabled:opacity-40 hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1"
            >
              Next
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <CreateUserModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onSuccess={() => fetchUsers(1, search, selectedRole)} />
    </div>
  );
}