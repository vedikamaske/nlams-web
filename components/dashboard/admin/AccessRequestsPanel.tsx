"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/apiClient";
import { Inbox, Clock, CheckCircle2, XCircle, RefreshCw, MessageSquare, User, Building2, Mail, Phone } from "lucide-react";

interface AccessRequest {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  organizationName?: string;
  reason?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  reviewComment?: string;
  reviewer?: { firstName: string; lastName: string } | null;
  reviewedAt?: string;
  createdAt: string;
}

const statusConfig = {
  PENDING: { label: "Pending", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", icon: Clock },
  APPROVED: { label: "Approved", bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", icon: CheckCircle2 },
  REJECTED: { label: "Rejected", bg: "bg-red-50", text: "text-red-700", border: "border-red-200", icon: XCircle },
};

export default function AccessRequestsPanel() {
  const [requests, setRequests] = useState<AccessRequest[]>([]);
  const [filter, setFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("PENDING");
  const [loading, setLoading] = useState(false);
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const params = filter !== "ALL" ? `?status=${filter}` : "";
      const res = await apiClient<AccessRequest[]>(`/admin/access-requests${params}`);
      if (res.success && res.data) setRequests(res.data);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => { fetchRequests(); }, [fetchRequests]);

  const handleReview = async (requestId: string, status: "APPROVED" | "REJECTED") => {
    setSubmittingReview(true);
    try {
      const res = await apiClient(`/admin/access-requests/${requestId}/review`, {
        method: "PATCH",
        body: JSON.stringify({ status, reviewComment }),
      });
      if (res.success) {
        setReviewingId(null);
        setReviewComment("");
        fetchRequests();
      }
    } finally {
      setSubmittingReview(false);
    }
  };

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  const pendingCount = requests.filter(r => r.status === "PENDING").length;

  return (
    <div className="flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-[17px] font-bold text-[#0B1E36] flex items-center gap-2">
            <Inbox className="w-5 h-5 text-[#2563EB]" />
            Access Requests
            {pendingCount > 0 && (
              <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded-full">{pendingCount} pending</span>
            )}
          </h2>
          <p className="text-[11.5px] text-slate-400 mt-0.5">Review and process access requests from /apply-access submissions</p>
        </div>
        <button onClick={fetchRequests} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer border border-slate-200" title="Refresh">
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl w-fit">
        {(["ALL", "PENDING", "APPROVED", "REJECTED"] as const).map((tab) => (
          <button key={tab} onClick={() => setFilter(tab)}
            className={`px-3.5 py-1.5 text-[12px] font-semibold rounded-lg transition-all cursor-pointer ${filter === tab ? "bg-white text-[#0B1E36] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}>
            {tab.charAt(0) + tab.slice(1).toLowerCase()}
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="space-y-3">
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-sm text-slate-400">Loading requests...</div>
        ) : requests.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center">
            <Inbox className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-[13px] font-semibold text-slate-400">No {filter !== "ALL" ? filter.toLowerCase() : ""} requests</p>
            <p className="text-[11px] text-slate-300 mt-1">Access requests from /apply-access will appear here</p>
          </div>
        ) : (
          requests.map((req) => {
            const st = statusConfig[req.status];
            const StatusIcon = st.icon;
            const isReviewing = reviewingId === req.id;

            return (
              <div key={req.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-white text-[12px] font-bold shrink-0">
                        {req.fullName.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[13.5px] font-bold text-[#0B1E36]">{req.fullName}</p>
                        <p className="text-[11px] text-slate-400">{formatDate(req.createdAt)}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold border ${st.bg} ${st.text} ${st.border} shrink-0`}>
                      <StatusIcon className="w-3 h-3" />
                      {st.label}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center gap-1.5 text-[11.5px] text-slate-600">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{req.email}</span>
                    </div>
                    {req.phone && (
                      <div className="flex items-center gap-1.5 text-[11.5px] text-slate-600">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{req.phone}</span>
                      </div>
                    )}
                    {req.organizationName && (
                      <div className="flex items-center gap-1.5 text-[11.5px] text-slate-600 col-span-2">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{req.organizationName}</span>
                      </div>
                    )}
                  </div>

                  {req.reason && (
                    <div className="flex items-start gap-1.5 text-[11.5px] text-slate-600 bg-slate-50 rounded-lg px-3 py-2 mb-3">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="italic">{req.reason}</span>
                    </div>
                  )}

                  {req.status === "PENDING" && (
                    <div>
                      {isReviewing ? (
                        <div className="space-y-2">
                          <textarea value={reviewComment} onChange={(e) => setReviewComment(e.target.value)}
                            placeholder="Add a review comment (optional)..."
                            rows={2} className="w-full px-3 py-2 text-[11.5px] border border-slate-200 rounded-xl outline-none focus:border-[#2563EB] resize-none" />
                          <div className="flex items-center gap-2">
                            <button onClick={() => handleReview(req.id, "APPROVED")} disabled={submittingReview}
                              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[12px] font-bold rounded-xl transition-colors cursor-pointer">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                            </button>
                            <button onClick={() => handleReview(req.id, "REJECTED")} disabled={submittingReview}
                              className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-[12px] font-bold rounded-xl transition-colors cursor-pointer">
                              <XCircle className="w-3.5 h-3.5" /> Reject
                            </button>
                            <button onClick={() => { setReviewingId(null); setReviewComment(""); }}
                              className="px-4 py-2 text-slate-600 text-[12px] font-semibold hover:bg-slate-100 rounded-xl transition-colors cursor-pointer">Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <button onClick={() => setReviewingId(req.id)}
                          className="flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[12px] font-bold rounded-xl transition-colors cursor-pointer shadow-sm">
                          <User className="w-3.5 h-3.5" /> Review Request
                        </button>
                      )}
                    </div>
                  )}

                  {req.status !== "PENDING" && (
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <User className="w-3 h-3" />
                      Reviewed by {req.reviewer ? `${req.reviewer.firstName} ${req.reviewer.lastName}` : "Administrator"}
                      {req.reviewedAt && ` on ${formatDate(req.reviewedAt)}`}
                      {req.reviewComment && <span className="italic ml-1">— "{req.reviewComment}"</span>}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
