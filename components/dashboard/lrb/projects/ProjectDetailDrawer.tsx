"use client";

import { useState } from "react";
import {
  X,
  Building2,
  MapPin,
  FileText,
  GitBranch,
  MessageSquareWarning,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Send,
  Layers,
} from "lucide-react";
import { LRBProject } from "@/lib/lrbProjectsData";

interface ProjectDetailDrawerProps {
  project: LRBProject | null;
  isOpen: boolean;
  onClose: () => void;
  onRespondClarification?: (projectId: string, clarificationId: string, response: string) => void;
}

export default function ProjectDetailDrawer({
  project,
  isOpen,
  onClose,
  onRespondClarification,
}: ProjectDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "land" | "gis" | "documents" | "clarifications" | "workflow" | "activities"
  >("overview");

  const [responseText, setResponseText] = useState("");
  const [activeClrId, setActiveClrId] = useState<string | null>(null);

  if (!isOpen || !project) return null;

  const handleSendResponse = (clrId: string) => {
    if (!responseText.trim()) return;
    if (onRespondClarification) {
      onRespondClarification(project.id, clrId, responseText);
    }
    setResponseText("");
    setActiveClrId(null);
  };

  const getStatusBadge = (status: LRBProject["status"]) => {
    const config = {
      Draft: "bg-slate-100 text-slate-700 border-slate-200",
      "Under PIA Review": "bg-amber-50 text-amber-800 border-amber-200",
      "Clarification Required": "bg-rose-50 text-rose-800 border-rose-200",
      "In Routing": "bg-purple-50 text-purple-800 border-purple-200",
      Registered: "bg-emerald-50 text-emerald-800 border-emerald-200",
      Returned: "bg-red-50 text-red-800 border-red-200",
    };
    return (
      <span
        className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-semibold border ${
          config[status] || "bg-slate-100 text-slate-700"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        {/* Right Slide-Over Panel */}
        <div className="w-screen max-w-3xl bg-white shadow-2xl border-l border-slate-200 flex flex-col transform transition-transform duration-300 ease-in-out">
          {/* Drawer Header */}
          <div className="bg-[#0B1E36] text-white px-6 py-5 flex items-center justify-between border-b border-[#1A3354] shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300 font-bold shrink-0">
                <Building2 className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10.5px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-200 border border-blue-400/30">
                    {project.projectCode}
                  </span>
                  {getStatusBadge(project.status)}
                </div>
                <h2 className="text-base font-bold text-white tracking-tight mt-0.5 line-clamp-1">
                  {project.projectName}
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Close Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Tabs Bar */}
          <div className="bg-slate-50 border-b border-slate-200 px-5 flex items-center gap-1 overflow-x-auto scrollbar-none shrink-0">
            {[
              { id: "overview", label: "Overview", icon: Building2 },
              { id: "land", label: `Land (${project.totalLandArea} Ha)`, icon: MapPin },
              { id: "gis", label: "GIS", icon: Layers },
              { id: "documents", label: `Docs (${project.documents.length})`, icon: FileText },
              { id: "clarifications", label: `Queries (${project.clarifications.length})`, icon: MessageSquareWarning },
              { id: "workflow", label: "Workflow", icon: GitBranch },
              { id: "activities", label: "Audit Log", icon: Clock },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3.5 py-3 text-[12px] font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "border-[#2563EB] text-[#2563EB] bg-white"
                      : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Drawer Content Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC]">
            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                    <p className="text-[10.5px] font-medium text-slate-400">Total Land Required</p>
                    <p className="text-base font-bold text-[#0B1E36] mt-0.5">{project.totalLandArea} Ha</p>
                    <p className="text-[10px] text-slate-400">{project.totalParcels} Parcels</p>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                    <p className="text-[10.5px] font-medium text-slate-400">Estimated Cost</p>
                    <p className="text-base font-bold text-[#0B1E36] mt-0.5">₹ {project.estimatedCost} Cr</p>
                    <p className="text-[10px] text-slate-400">Priority: {project.priority}</p>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                    <p className="text-[10.5px] font-medium text-slate-400">Current Stage</p>
                    <p className="text-[11.5px] font-bold text-amber-700 mt-0.5 line-clamp-2">{project.currentStage}</p>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                    <p className="text-[10.5px] font-medium text-slate-400">Last Updated</p>
                    <p className="text-base font-bold text-[#0B1E36] mt-0.5">{project.lastUpdated}</p>
                  </div>
                </div>

                <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs space-y-3 text-xs">
                  <h3 className="font-bold text-[#0B1E36] uppercase tracking-wider text-[11px] border-b border-slate-100 pb-2">
                    Project Classification & Objective
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-[12px]">
                    <div>
                      <span className="text-slate-400 font-medium">Type:</span> <span className="font-semibold text-slate-800">{project.projectType}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">Category:</span> <span className="font-semibold text-slate-800">{project.category}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">Public Purpose:</span> <span className="font-semibold text-slate-800">{project.publicPurpose}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">PIA Agency:</span> <span className="font-semibold text-slate-800">{project.piaAgency}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-100 text-[12px]">
                    <p className="text-slate-400 font-medium">Description:</p>
                    <p className="text-slate-700 mt-0.5 leading-relaxed">{project.description}</p>
                  </div>
                </div>

                <div className="bg-white p-4.5 rounded-xl border border-slate-200 shadow-2xs space-y-3 text-xs">
                  <h3 className="font-bold text-[#0B1E36] uppercase tracking-wider text-[11px] border-b border-slate-100 pb-2">
                    Requiring Body Contact Details
                  </h3>
                  <div className="space-y-2 text-[12px]">
                    <p><span className="text-slate-400 font-medium">Organization:</span> <strong className="text-slate-800">{project.organizationName}</strong></p>
                    <p><span className="text-slate-400 font-medium">Department:</span> <span className="text-slate-700">{project.department}</span></p>
                    <p><span className="text-slate-400 font-medium">Authorized Officer:</span> <span className="text-slate-700">{project.authorizedOfficer}</span></p>
                    <p><span className="text-slate-400 font-medium">Contact:</span> <span className="text-slate-700">{project.contactNumber} ({project.officialEmail})</span></p>
                  </div>
                </div>
              </div>
            )}

            {/* LAND TAB */}
            {activeTab === "land" && (
              <div className="space-y-4 text-xs">
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 font-bold text-[#0B1E36]">
                    Land Schedule Breakdown ({project.locations.length} Locations)
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-slate-100 border-b border-slate-200 text-slate-500 text-[10.5px] uppercase">
                        <tr>
                          <th className="py-2.5 px-3">Location</th>
                          <th className="py-2.5 px-3">Type</th>
                          <th className="py-2.5 px-3">Area (Ha)</th>
                          <th className="py-2.5 px-3">Parcels</th>
                          <th className="py-2.5 px-3">Purpose</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-[11.5px]">
                        {project.locations.map((loc) => (
                          <tr key={loc.id}>
                            <td className="py-2.5 px-3 font-semibold text-[#0B1E36]">{loc.village}, {loc.district}</td>
                            <td className="py-2.5 px-3 text-slate-600">{loc.landType}</td>
                            <td className="py-2.5 px-3 font-bold text-blue-700">{loc.area}</td>
                            <td className="py-2.5 px-3 text-slate-600">{loc.parcelCount}</td>
                            <td className="py-2.5 px-3 text-slate-600">{loc.purpose}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* GIS TAB */}
            {activeTab === "gis" && (
              <div className="space-y-4 text-xs">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                  <h3 className="font-bold text-[#0B1E36] text-[12px]">Spatial Corridor Vector Specs</h3>
                  <div className="h-60 rounded-xl bg-slate-900 border border-slate-700 p-4 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
                    <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-blue-300 bg-slate-800/80 p-2 rounded">
                      <span>Corridor: {project.alignmentLengthKm || 42.5} km</span>
                      <span className="text-emerald-400 font-bold">● KML Loaded</span>
                    </div>
                    <div className="relative z-10 flex items-center justify-center my-auto">
                      <div className="w-3/4 h-1 bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.9)]"></div>
                    </div>
                    <div className="relative z-10 text-[11px] text-slate-300 bg-slate-800/80 p-2 rounded flex justify-between">
                      <span>ROW: 60m Width</span>
                      <span>Affected Parcels: {project.totalParcels}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* DOCUMENTS TAB */}
            {activeTab === "documents" && (
              <div className="space-y-3 text-xs">
                <div className="bg-white rounded-xl border border-slate-200 shadow-2xs divide-y divide-slate-100">
                  {project.documents.map((doc) => (
                    <div key={doc.id} className="p-3.5 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-[#0B1E36] text-[12px]">{doc.name}</p>
                        <p className="text-[10.5px] text-slate-400">{doc.category} • {doc.fileSize} • Uploaded: {doc.uploadDate}</p>
                      </div>
                      <span className="text-[10.5px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {doc.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CLARIFICATIONS TAB */}
            {activeTab === "clarifications" && (
              <div className="space-y-4 text-xs">
                {project.clarifications.length === 0 ? (
                  <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs text-center text-slate-400">
                    No active clarifications required.
                  </div>
                ) : (
                  project.clarifications.map((clr) => (
                    <div key={clr.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {clr.raisedBy} ({clr.authorityRole})
                        </span>
                        <span className="text-slate-400">{clr.date}</span>
                      </div>
                      <p className="text-slate-800 font-medium text-[12px] bg-slate-50 p-3 rounded-lg border border-slate-100">
                        Q: {clr.question}
                      </p>
                      {clr.response && (
                        <p className="text-blue-900 font-medium text-[12px] bg-blue-50 p-3 rounded-lg border border-blue-100">
                          A: {clr.response}
                        </p>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* WORKFLOW TAB */}
            {activeTab === "workflow" && (
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4 text-xs">
                <h3 className="font-bold text-[#0B1E36] text-[12px]">Workflow Stage Timeline</h3>
                <div className="space-y-3 border-l-2 border-slate-200 pl-4">
                  {project.workflow.map((w) => (
                    <div key={w.id} className="relative">
                      <div className="absolute -left-[21px] top-0.5 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white"></div>
                      <p className="font-bold text-[#0B1E36] text-[12px]">{w.stepName}</p>
                      <p className="text-[10.5px] text-slate-400">Authority: {w.authority} | Status: <span className="font-semibold text-blue-700">{w.status}</span></p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* AUDIT LOG TAB */}
            {activeTab === "activities" && (
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3 text-xs">
                <h3 className="font-bold text-[#0B1E36] text-[12px]">Audit Trail Log</h3>
                <div className="divide-y divide-slate-100">
                  {project.activities.map((a) => (
                    <div key={a.id} className="py-2.5">
                      <p className="font-semibold text-slate-800 text-[12px]">{a.action}</p>
                      <p className="text-[10.5px] text-slate-400">{a.user} • {a.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between shrink-0 text-xs">
            <span className="text-slate-500 font-medium">Ref Code: <strong className="font-mono text-blue-700">{project.projectCode}</strong></span>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl cursor-pointer transition-colors"
            >
              Close Drawer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}