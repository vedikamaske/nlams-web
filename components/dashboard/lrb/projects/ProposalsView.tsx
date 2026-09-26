"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ClipboardList,
  Search,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Edit,
  Plus,
} from "lucide-react";
import { LRBProject, initialProjects } from "@/lib/lrbProjectsData";
import ProjectDetailDrawer from "./ProjectDetailDrawer";

export default function ProposalsView() {
  const [projects, setProjects] = useState<LRBProject[]>(initialProjects);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [search, setSearch] = useState("");

  const [selectedProject, setSelectedProject] = useState<LRBProject | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const tabs = [
    { id: "All", label: "All Proposals" },
    { id: "Draft", label: "Draft" },
    { id: "Under PIA Review", label: "Under PIA Review" },
    { id: "Clarification Required", label: "Clarification Required" },
    { id: "Submitted", label: "Submitted" },
    { id: "Returned", label: "Returned" },
    { id: "Registered", label: "Registered / Completed" },
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      !search ||
      p.projectName.toLowerCase().includes(search.toLowerCase()) ||
      p.projectCode.toLowerCase().includes(search.toLowerCase());
    
    if (!matchesSearch) return false;

    if (activeTab === "All") return true;
    if (activeTab === "Submitted") return p.status !== "Draft";
    if (activeTab === "Registered") return p.status === "Registered";
    return p.status === activeTab;
  });

  const totalPages = Math.ceil(filteredProjects.length / pageSize) || 1;
  const paginatedProjects = filteredProjects.slice((page - 1) * pageSize, page * pageSize);

  const handleOpenDetail = (project: LRBProject) => {
    setSelectedProject(project);
    setIsDrawerOpen(true);
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
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10.5px] font-semibold border ${
          config[status] || "bg-slate-100 text-slate-700 border-slate-200"
        }`}
      >
        {status === "Registered" && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
        {status === "Under PIA Review" && <Clock className="w-3 h-3 text-amber-600 animate-pulse" />}
        {status === "Clarification Required" && <AlertCircle className="w-3 h-3 text-rose-600" />}
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-xl font-bold text-[#0B1E36] flex items-center gap-2">
            <ClipboardList className="w-6 h-6 text-[#2563EB]" />
            Project Proposals Workspace
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Track project proposals through technical review, PIA validation, and project registration
          </p>
        </div>
        <Link
          href="/dashboard/lrb/projects/create"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0B3A68] hover:bg-[#082D4A] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm cursor-pointer no-underline"
        >
          <Plus className="w-4 h-4" />
          <span>New Proposal</span>
        </Link>
      </div>

      {/* Tabs Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-2 flex items-center gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const count =
            tab.id === "All"
              ? projects.length
              : tab.id === "Submitted"
              ? projects.filter((p) => p.status !== "Draft").length
              : tab.id === "Registered"
              ? projects.filter((p) => p.status === "Registered").length
              : projects.filter((p) => p.status === tab.id).length;

          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setPage(1);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-[#2563EB] text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Search & Notice Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 flex items-center justify-between gap-4 flex-wrap">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search proposals by project title or reference code..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-[#2563EB]"
          />
        </div>
        <div className="text-xs text-slate-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          <span>Note: Proposal status reflects technical review state by PIA before statutory registration.</span>
        </div>
      </div>

      {/* Main Proposals Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10.5px]">
                <th className="py-3 px-4">Project Name & Proposal ID</th>
                <th className="py-3 px-4">Project Type</th>
                <th className="py-3 px-4">Land Required</th>
                <th className="py-3 px-4">Submitted On</th>
                <th className="py-3 px-4">Current Review Stage</th>
                <th className="py-3 px-4">Proposal Status</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedProjects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No proposals found matching tab "{activeTab}".
                  </td>
                </tr>
              ) : (
                paginatedProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 max-w-[220px]">
                      <button
                        onClick={() => handleOpenDetail(project)}
                        className="font-bold text-[#0B1E36] hover:text-[#2563EB] text-[13px] line-clamp-1 text-left cursor-pointer transition-colors"
                      >
                        {project.projectName}
                      </button>
                      <span className="text-[10.5px] font-mono text-slate-400 font-medium">{project.projectCode}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">{project.projectType}</td>
                    <td className="py-3.5 px-4 font-bold text-[#0B1E36]">{project.totalLandArea} Ha</td>
                    <td className="py-3.5 px-4 text-slate-600">{project.submittedOn || "Draft (Not Submitted)"}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-medium max-w-[180px]">
                      <span className="line-clamp-2">{project.currentStage}</span>
                    </td>
                    <td className="py-3.5 px-4">{getStatusBadge(project.status)}</td>
                    <td className="py-3.5 px-4 text-slate-500">{project.lastUpdated}</td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenDetail(project)}
                          className="p-1.5 rounded-lg text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
                          title="View Proposal Details"
                        >
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <Link
                          href="/dashboard/lrb/projects/create"
                          className="p-1.5 rounded-lg text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors cursor-pointer no-underline"
                          title="Edit Proposal"
                        >
                          <Edit className="w-4 h-4 text-slate-600" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-t border-slate-200 text-xs">
          <p className="text-slate-500 font-medium">
            Showing {Math.min((page - 1) * pageSize + 1, filteredProjects.length)} to{" "}
            {Math.min(page * pageSize, filteredProjects.length)} of {filteredProjects.length} proposals
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page <= 1}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 hover:bg-slate-100 font-medium cursor-pointer"
            >
              Previous
            </button>
            <span className="font-semibold text-slate-700 px-1">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages}
              className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 hover:bg-slate-100 font-medium cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Project Detail Right-Side Drawer */}
      <ProjectDetailDrawer
        project={selectedProject}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}