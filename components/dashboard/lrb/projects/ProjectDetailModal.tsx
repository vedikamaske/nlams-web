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
  FileCheck,
  Calendar,
  Layers,
  Send,
  Download,
  Shield,
  Tag,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { LRBProject, ClarificationItem } from "@/lib/lrbProjectsData";

interface ProjectDetailModalProps {
  project: LRBProject | null;
  isOpen: boolean;
  onClose: () => void;
  onRespondClarification?: (projectId: string, clarificationId: string, response: string) => void;
}

export default function ProjectDetailModal({
  project,
  isOpen,
  onClose,
  onRespondClarification,
}: ProjectDetailModalProps) {
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
        className={`px-3 py-1 rounded-full text-[11px] font-semibold border ${
          config[status] || "bg-slate-100 text-slate-700"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl border border-slate-200 flex flex-col max-h-[92vh] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#0B1E36] text-white px-6 py-5 flex items-center justify-between border-b border-[#1A3354]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-300 font-bold shrink-0">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-blue-200 border border-blue-400/30">
                  {project.projectCode}
                </span>
                {getStatusBadge(project.status)}
              </div>
              <h2 className="text-lg font-bold text-white tracking-tight mt-1">{project.projectName}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Tabs Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 flex items-center gap-1 overflow-x-auto scrollbar-none">
          {[
            { id: "overview", label: "Project Overview", icon: Building2 },
            { id: "land", label: `Land Requirement (${project.totalLandArea} Ha)`, icon: MapPin },
            { id: "gis", label: "GIS & Alignment", icon: Layers },
            { id: "documents", label: `Documents (${project.documents.length})`, icon: FileText },
            { id: "clarifications", label: `Clarifications (${project.clarifications.length})`, icon: MessageSquareWarning },
            { id: "workflow", label: "Workflow Timeline", icon: GitBranch },
            { id: "activities", label: "Activity History", icon: Clock },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 text-[12.5px] font-semibold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "border-[#2563EB] text-[#2563EB] bg-white"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/50"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#F8FAFC]">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Summary Metrics Banner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <p className="text-[11px] font-medium text-slate-400">Total Land Required</p>
                  <p className="text-xl font-bold text-[#0B1E36] mt-1">{project.totalLandArea} Hectares</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{project.totalParcels} Approx Parcels</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <p className="text-[11px] font-medium text-slate-400">Estimated Project Cost</p>
                  <p className="text-xl font-bold text-[#0B1E36] mt-1">₹ {project.estimatedCost} Cr</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Priority: <span className="font-semibold text-blue-600">{project.priority}</span></p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <p className="text-[11px] font-medium text-slate-400">Current Stage</p>
                  <p className="text-xs font-bold text-amber-700 mt-1 line-clamp-2">{project.currentStage}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">PIA: {project.piaAgency}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
                  <p className="text-[11px] font-medium text-slate-400">Last Activity Date</p>
                  <p className="text-xl font-bold text-[#0B1E36] mt-1">{project.lastUpdated}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Submitted: {project.submittedOn || "Not Submitted"}</p>
                </div>
              </div>

              {/* Two Column Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Card: Project Specs */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Project Classification
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <p className="text-slate-400 font-medium">Project Type</p>
                      <p className="font-semibold text-[#0B1E36] mt-0.5">{project.projectType}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-medium">Category</p>
                      <p className="font-semibold text-[#0B1E36] mt-0.5">{project.category}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-medium">Public Purpose</p>
                      <p className="font-semibold text-[#0B1E36] mt-0.5">{project.publicPurpose}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-medium">Target Completion</p>
                      <p className="font-semibold text-[#0B1E36] mt-0.5">{project.completionDate}</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <p className="text-slate-400 font-medium text-xs">Description & Scope</p>
                    <p className="text-xs text-slate-700 leading-relaxed mt-1">{project.description}</p>
                  </div>
                </div>

                {/* Right Card: Requiring Body Info */}
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                    Requiring Body Details
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div>
                      <p className="text-slate-400 font-medium">Organization</p>
                      <p className="font-semibold text-[#0B1E36] text-[13px] mt-0.5">{project.organizationName}</p>
                    </div>
                    <div>
                      <p className="text-slate-400 font-medium">Department / Wing</p>
                      <p className="font-semibold text-slate-700 mt-0.5">{project.department}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                      <div>
                        <p className="text-slate-400 font-medium">Authorized Officer</p>
                        <p className="font-semibold text-slate-800 mt-0.5">{project.authorizedOfficer}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 font-medium">Official Contact</p>
                        <p className="font-semibold text-slate-800 mt-0.5">{project.contactNumber}</p>
                        <p className="text-slate-500 text-[11px]">{project.officialEmail}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LAND REQUIREMENT */}
          {activeTab === "land" && (
            <div className="space-y-5">
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-900">
                  <p className="font-semibold">Baseline Land Requirement Statement</p>
                  <p className="mt-0.5 text-blue-700">
                    This land schedule reflects the initial land requirement declared by the LRB. Formal revisions occur through PIA review and statutory survey validation.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-xs font-bold text-[#0B1E36] uppercase tracking-wider">
                    Schedule of Affected Locations ({project.locations.length} Entries)
                  </h3>
                  <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                    Total: {project.totalLandArea} Hectares
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[10.5px]">
                      <tr>
                        <th className="py-3 px-4">State & District</th>
                        <th className="py-3 px-4">Tehsil / Taluk</th>
                        <th className="py-3 px-4">Village</th>
                        <th className="py-3 px-4">Land Type</th>
                        <th className="py-3 px-4">Area (Ha)</th>
                        <th className="py-3 px-4">Parcels</th>
                        <th className="py-3 px-4">Purpose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {project.locations.map((loc) => (
                        <tr key={loc.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-semibold text-[#0B1E36]">{loc.state}, {loc.district}</td>
                          <td className="py-3 px-4 text-slate-700">{loc.tehsil}</td>
                          <td className="py-3 px-4 text-slate-700 font-medium">{loc.village}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded text-[10.5px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                              {loc.landType}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-blue-700">{loc.area}</td>
                          <td className="py-3 px-4 font-medium text-slate-700">{loc.parcelCount}</td>
                          <td className="py-3 px-4 text-slate-600">{loc.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GIS & ALIGNMENT */}
          {activeTab === "gis" && (
            <div className="space-y-5">
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-[#0B1E36] flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-600" />
                      Spatial Alignment & Parcel Boundary Map
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Proposed alignment vector overlays vs. Revenue Cadastral Boundaries
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      GIS Overlay Validated
                    </span>
                  </div>
                </div>

                {/* Simulated Interactive Map Workspace */}
                <div className="relative h-72 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden flex flex-col justify-between p-4 text-white">
                  <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
                  
                  {/* Map Header Overlay */}
                  <div className="relative z-10 flex items-center justify-between bg-slate-800/80 backdrop-blur-xs px-3 py-2 rounded-lg border border-slate-700/60 text-xs">
                    <span className="font-mono text-blue-300">EPSG:4326 (WGS84) | 17.3850° N, 78.4867° E</span>
                    <span className="text-[11px] text-slate-300">Vector Alignment Layer: ACTIVE</span>
                  </div>

                  {/* Simulated Line Diagram */}
                  <div className="relative z-10 flex items-center justify-center my-auto">
                    <div className="w-3/4 h-1 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 rounded-full relative shadow-[0_0_12px_rgba(59,130,246,0.8)]">
                      <div className="absolute -top-3 left-1/4 w-3 h-3 rounded-full bg-blue-400 border-2 border-white animate-ping"></div>
                      <div className="absolute -top-2 left-1/4 w-3 h-3 rounded-full bg-blue-500 border-2 border-white"></div>
                      <div className="absolute -top-2 left-3/4 w-3 h-3 rounded-full bg-purple-500 border-2 border-white"></div>
                    </div>
                  </div>

                  {/* Map Footer Spec Overlay */}
                  <div className="relative z-10 grid grid-cols-3 gap-2 bg-slate-800/80 backdrop-blur-xs p-2.5 rounded-lg border border-slate-700/60 text-center text-xs">
                    <div>
                      <p className="text-[10px] text-slate-400">Corridor Length</p>
                      <p className="font-bold text-white">{project.alignmentLengthKm || 42.5} km</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400">Buffer Width</p>
                      <p className="font-bold text-white">60 Meters (30m ROW)</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400">Vector Coordinates</p>
                      <p className="font-bold text-white">{project.coordinatesCount || 184} Nodes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: DOCUMENTS */}
          {activeTab === "documents" && (
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
                <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200">
                  <h3 className="text-xs font-bold text-[#0B1E36] uppercase tracking-wider">
                    Uploaded Project Documentation
                  </h3>
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  {project.documents.map((doc) => (
                    <div key={doc.id} className="p-4 flex items-center justify-between gap-3 hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-[#0B1E36]">{doc.name}</p>
                            {doc.required && (
                              <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                                Mandatory
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Category: <span className="font-medium text-slate-600">{doc.category}</span> | Size: {doc.fileSize} | Uploaded: {doc.uploadDate}
                          </p>
                        </div>
                      </div>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-semibold text-xs cursor-pointer transition-colors">
                        <Download className="w-3.5 h-3.5 text-blue-600" />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CLARIFICATIONS */}
          {activeTab === "clarifications" && (
            <div className="space-y-5">
              {project.clarifications.length === 0 ? (
                <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-xs text-slate-400">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  No outstanding clarifications raised for this project proposal.
                </div>
              ) : (
                project.clarifications.map((clr) => (
                  <div key={clr.id} className="bg-white rounded-xl border border-slate-200 shadow-2xs p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          {clr.raisedBy} ({clr.authorityRole})
                        </span>
                        <span className="text-xs text-slate-400">{clr.date}</span>
                      </div>
                      <span className={`text-[10.5px] font-bold px-2.5 py-0.5 rounded-full ${
                        clr.status === "RESOLVED" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200 animate-pulse"
                      }`}>
                        {clr.status}
                      </span>
                    </div>

                    <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-800">
                      <p className="font-semibold text-slate-500 text-[11px] mb-1">PIA Technical Query:</p>
                      <p className="font-medium text-slate-800">{clr.question}</p>
                    </div>

                    {clr.response ? (
                      <div className="bg-blue-50/60 p-3.5 rounded-xl border border-blue-100 text-xs text-blue-900">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-blue-700 text-[11px]">LRB Officer Response:</p>
                          <span className="text-[10.5px] text-blue-500">{clr.responseDate}</span>
                        </div>
                        <p>{clr.response}</p>
                      </div>
                    ) : (
                      <div className="pt-2">
                        {activeClrId === clr.id ? (
                          <div className="space-y-3">
                            <textarea
                              value={responseText}
                              onChange={(e) => setResponseText(e.target.value)}
                              placeholder="Provide detailed clarification / reference documents..."
                              className="w-full p-3 text-xs border border-slate-300 rounded-xl outline-none focus:border-blue-600 bg-white"
                              rows={3}
                            />
                            <div className="flex items-center gap-2 justify-end">
                              <button
                                onClick={() => setActiveClrId(null)}
                                className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={() => handleSendResponse(clr.id)}
                                className="flex items-center gap-1.5 px-4 py-1.5 bg-[#2563EB] text-white text-xs font-semibold rounded-lg hover:bg-blue-700 cursor-pointer"
                              >
                                <Send className="w-3.5 h-3.5" />
                                Submit Response to PIA
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setActiveClrId(clr.id)}
                            className="flex items-center gap-1.5 px-4 py-2 bg-[#0B3A68] text-white text-xs font-semibold rounded-xl hover:bg-[#082D4A] cursor-pointer"
                          >
                            <MessageSquareWarning className="w-4 h-4" />
                            Respond to Clarification
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 6: WORKFLOW TIMELINE */}
          {activeTab === "workflow" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-6">
              <h3 className="text-xs font-bold text-[#0B1E36] uppercase tracking-wider">
                End-to-End Land Acquisition Workflow Progress
              </h3>
              <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {project.workflow.map((step) => {
                  const isDone = step.status === "COMPLETED";
                  const isCurrent = step.status === "IN_PROGRESS" || step.status === "ACTION_REQUIRED";
                  return (
                    <div key={step.id} className="relative flex items-start gap-4">
                      <div
                        className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                          isDone
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : isCurrent
                            ? "bg-blue-600 border-blue-600 text-white animate-pulse"
                            : "bg-white border-slate-300 text-slate-400"
                        }`}
                      >
                        {isDone ? "✓" : ""}
                      </div>
                      <div className="bg-slate-50/70 p-3.5 rounded-xl border border-slate-200 flex-1 text-xs space-y-1">
                        <div className="flex items-center justify-between flex-wrap">
                          <p className="font-bold text-[#0B1E36] text-[13px]">{step.stepName}</p>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              isDone
                                ? "bg-emerald-50 text-emerald-700"
                                : isCurrent
                                ? "bg-blue-50 text-blue-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {step.status}
                          </span>
                        </div>
                        <p className="text-slate-400 text-[11px]">Responsible Authority: <span className="font-medium text-slate-600">{step.authority}</span></p>
                        {step.completedDate && <p className="text-slate-400 text-[10.5px]">Completed on: {step.completedDate}</p>}
                        {step.remarks && <p className="text-slate-700 bg-white p-2 rounded border border-slate-200 mt-2">{step.remarks}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 7: ACTIVITIES */}
          {activeTab === "activities" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
              <h3 className="text-xs font-bold text-[#0B1E36] uppercase tracking-wider">
                System Audit Log & Activity Trail
              </h3>
              <div className="divide-y divide-slate-100 text-xs">
                {project.activities.map((act) => (
                  <div key={act.id} className="py-3 flex items-start gap-3">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-slate-800">{act.action}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">By: <span className="text-slate-600 font-medium">{act.user}</span> • {act.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-xs text-slate-500">
            Project Ref: <span className="font-mono font-semibold">{project.projectCode}</span>
          </p>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            Close Detail View
          </button>
        </div>
      </div>
    </div>
  );
}