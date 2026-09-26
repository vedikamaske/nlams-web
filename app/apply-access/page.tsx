"use client";

import Link from "next/link";
import { ArrowLeft, Send, Building2, ShieldAlert, Loader2 } from "lucide-react";
import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export default function ApplyAccessPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organizationName: "",
    reason: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/admin/access-requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || data.message || "Failed to submit request. Please try again.");
      } else {
        setSubmitted(true);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF5FB] flex flex-col items-center justify-center p-4 font-sans">
      <div className="w-full max-w-xl bg-white rounded-3xl border border-[#CBDCE9] p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-[#102F50]">
            <Building2 className="w-6 h-6 text-[#0B3A68]" />
            <h1 className="text-xl font-extrabold tracking-tight">Sankalp Access Request</h1>
          </div>
          <Link href="/login" className="text-xs font-semibold text-[#0B3A68] hover:text-[#082D4A] flex items-center gap-1 bg-[#EEF5FB] px-3 py-1.5 rounded-full border border-[#CBDCE9]">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Login</span>
          </Link>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Send className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-[#102F50]">Access Request Submitted</h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Your onboarding request has been registered in the Sankalp access registry. The System Administrator will review your request and provision your account.
            </p>
            <Link href="/login" className="inline-block mt-4 px-5 py-2.5 bg-[#0B3A68] text-white text-xs font-semibold rounded-xl hover:bg-[#082D4A] transition-colors">
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800 flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span>Official access is restricted to authorized government personnel and project implementing agency officers.</span>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#102F50] mb-1">Full Name <span className="text-red-500">*</span></label>
              <input type="text" required value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Officer Full Name"
                className="w-full px-3 py-2 text-xs border border-[#CBDCE9] rounded-xl outline-none focus:border-[#0B3A68] transition-colors" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#102F50] mb-1">Official Email ID <span className="text-red-500">*</span></label>
                <input type="email" required value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@gov.in"
                  className="w-full px-3 py-2 text-xs border border-[#CBDCE9] rounded-xl outline-none focus:border-[#0B3A68] transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#102F50] mb-1">Phone / Mobile Number</label>
                <input type="tel" value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 9876543210"
                  className="w-full px-3 py-2 text-xs border border-[#CBDCE9] rounded-xl outline-none focus:border-[#0B3A68] transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102F50] mb-1">Organization / Department <span className="text-red-500">*</span></label>
              <input type="text" required value={formData.organizationName}
                onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                placeholder="e.g. National Highways Authority of India (NHAI)"
                className="w-full px-3 py-2 text-xs border border-[#CBDCE9] rounded-xl outline-none focus:border-[#0B3A68] transition-colors" />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#102F50] mb-1">Reason for Access Request</label>
              <textarea rows={3} value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                placeholder="Specify your designated land acquisition duties or project role..."
                className="w-full px-3 py-2 text-xs border border-[#CBDCE9] rounded-xl outline-none focus:border-[#0B3A68] transition-colors resize-none" />
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-[#1B8354] hover:bg-[#156B44] disabled:bg-slate-300 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors shadow-sm cursor-pointer flex items-center justify-center gap-2">
              {loading ? (<><Loader2 className="w-3.5 h-3.5 animate-spin" /> Submitting...</>) : "Submit Official Access Request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
