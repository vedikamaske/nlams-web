"use client";

import { useState, useEffect } from "react";
import { X, Loader2, User, Mail, Phone, Briefcase, Shield, Building2, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";
import { apiClient } from "@/lib/apiClient";

interface Role {
  id: string;
  code: string;
  name: string;
}

interface Organization {
  id: string;
  name: string;
  code: string;
}

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const INITIAL_FORM = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  phone: "",
  designation: "",
  password: "",
  confirmPassword: "",
  roleCode: "",
  organizationId: "",
};

export default function CreateUserModal({ isOpen, onClose, onSuccess }: CreateUserModalProps) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [roles, setRoles] = useState<Role[]>([]);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setForm(INITIAL_FORM);
    setError(null);
    setSuccess(false);
    loadReferenceData();
  }, [isOpen]);

  const loadReferenceData = async () => {
    setLoading(true);
    try {
      const [rolesRes, orgsRes] = await Promise.all([
        apiClient<Role[]>("/admin/roles"),
        apiClient<Organization[]>("/admin/organizations"),
      ]);
      if (rolesRes.success && rolesRes.data) setRoles(rolesRes.data);
      if (orgsRes.success && orgsRes.data) setOrganizations(orgsRes.data);
    } catch {
      setError("Failed to load reference data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiClient("/admin/users", {
        method: "POST",
        body: JSON.stringify({
          firstName: form.firstName,
          middleName: form.middleName || undefined,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone || undefined,
          designation: form.designation || undefined,
          password: form.password,
          roleCode: form.roleCode,
          organizationId: form.organizationId || undefined,
        }),
      });

      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 1500);
      } else {
        setError(res.error || "Failed to create user. Please check the details and try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(11,30,54,0.55)", backdropFilter: "blur(4px)" }}>
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
              <User className="w-4.5 h-4.5 text-blue-600" style={{ width: 18, height: 18 }} />
            </div>
            <div>
              <h2 className="text-[15px] font-bold text-[#0B1E36]">Create New User Account</h2>
              <p className="text-[11px] text-slate-400">Provision access and assign role to a new officer</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer text-slate-400 hover:text-slate-600">
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-[#2563EB]" />
              <span className="ml-2 text-sm text-slate-500">Loading reference data...</span>
            </div>
          ) : success ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-[15px] font-bold text-[#0B1E36]">Account Created Successfully</h3>
              <p className="text-[12px] text-slate-400 text-center">The user can now log in using their email and password.</p>
            </div>
          ) : (
            <form id="create-user-form" onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
                  <span>{error}</span>
                </div>
              )}

              {/* Name Row */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#102F50] mb-1">First Name <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input name="firstName" required value={form.firstName} onChange={handleChange}
                      placeholder="Rajesh"
                      className="w-full pl-8 pr-3 py-2 text-[12px] border border-slate-200 rounded-xl outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#102F50] mb-1">Middle Name</label>
                  <input name="middleName" value={form.middleName} onChange={handleChange}
                    placeholder="Kumar"
                    className="w-full px-3 py-2 text-[12px] border border-slate-200 rounded-xl outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition-all" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#102F50] mb-1">Last Name <span className="text-red-500">*</span></label>
                  <input name="lastName" required value={form.lastName} onChange={handleChange}
                    placeholder="Sharma"
                    className="w-full px-3 py-2 text-[12px] border border-slate-200 rounded-xl outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition-all" />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#102F50] mb-1">Official Email <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input name="email" type="email" required value={form.email} onChange={handleChange}
                      placeholder="lrb@sankalp.com"
                      className="w-full pl-8 pr-3 py-2 text-[12px] border border-slate-200 rounded-xl outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#102F50] mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                      placeholder="+91 9876543210"
                      className="w-full pl-8 pr-3 py-2 text-[12px] border border-slate-200 rounded-xl outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition-all" />
                  </div>
                </div>
              </div>

              {/* Designation */}
              <div>
                <label className="block text-[11px] font-bold text-[#102F50] mb-1">Designation / Job Title</label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                  <input name="designation" value={form.designation} onChange={handleChange}
                    placeholder="e.g. Land Acquisition Officer, Project Director"
                    className="w-full pl-8 pr-3 py-2 text-[12px] border border-slate-200 rounded-xl outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition-all" />
                </div>
              </div>

              {/* Role & Organization */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#102F50] mb-1">Assign Role <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <select name="roleCode" required value={form.roleCode} onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 text-[12px] border border-slate-200 rounded-xl outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition-all appearance-none bg-white cursor-pointer">
                      <option value="">-- Select Role --</option>
                      {roles.map((r) => (
                        <option key={r.id} value={r.code}>{r.name} ({r.code})</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#102F50] mb-1">Organization</label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <select name="organizationId" value={form.organizationId} onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 text-[12px] border border-slate-200 rounded-xl outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition-all appearance-none bg-white cursor-pointer">
                      <option value="">-- Select Organization --</option>
                      {organizations.map((o) => (
                        <option key={o.id} value={o.id}>{o.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Password */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#102F50] mb-1">Password <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input name="password" type={showPassword ? "text" : "password"} required value={form.password} onChange={handleChange}
                      placeholder="Min 8 characters"
                      className="w-full px-3 pr-9 py-2 text-[12px] border border-slate-200 rounded-xl outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition-all" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#102F50] mb-1">Confirm Password <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input name="confirmPassword" type={showConfirmPassword ? "text" : "password"} required value={form.confirmPassword} onChange={handleChange}
                      placeholder="Re-enter password"
                      className="w-full px-3 pr-9 py-2 text-[12px] border border-slate-200 rounded-xl outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition-all" />
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer">
                      {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-[10.5px] text-slate-400 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
                The user will receive their credentials. They should change their password after first login.
              </p>
            </form>
          )}
        </div>

        {/* Footer */}
        {!success && !loading && (
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 shrink-0 bg-slate-50/50">
            <button onClick={onClose} className="px-4 py-2 text-[12px] font-semibold text-slate-600 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer">
              Cancel
            </button>
            <button form="create-user-form" type="submit" disabled={submitting}
              className="flex items-center gap-2 px-5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] disabled:bg-slate-300 text-white text-[12px] font-bold rounded-xl transition-colors cursor-pointer shadow-sm">
              {submitting ? (<><Loader2 className="w-3.5 h-3.5 animate-spin" /> Creating...</>) : "Create User Account"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
