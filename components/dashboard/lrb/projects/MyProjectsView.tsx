"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FolderOpen,
  Plus,
  Search,
  RefreshCw,
  Clock,
  MoreVertical,
  Eye,
  Edit,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { LRBProject, initialProjects } from "@/lib/lrbProjectsData";
import ProjectDetailDrawer from "./ProjectDetailDrawer";

export default function MyProjectsView() {
  const [projects, setProjects] = useState<LRBProject[]>(initialProjects);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");

  const [selectedProject, setSelectedProject] = useState<LRBProject | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      !search ||
      p.projectName.toLowerCase().includes(search.toLowerCase()) ||
      p.projectCode.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || p.status === statusFilter;
    const matchesType = !typeFilter || p.projectType === typeFilter;
    const matchesLocation =
      !locationFilter ||
      p.locations.some(
        (loc) =>
          loc.district.toLowerCase().includes(locationFilter.toLowerCase()) ||
          loc.state.toLowerCase().includes(locationFilter.toLowerCase())
      );
    return matchesSearch && matchesStatus && matchesType && matchesLocation;
  });

  const totalPages = Math.ceil(filteredProjects.length / pageSize) || 1;
  const paginatedProjects = filteredProjects.slice((page - 1) * pageSize, page * pageSize);

  const totalCount = projects.length;
  const draftCount = projects.filter((p) => p.status === "Draft").length;
  const underReviewCount = projects.filter(
    (p) => p.status === "Under PIA Review" || p.status === "Clarification Required" || p.status === "In Routing"
  ).length;
  const registeredCount = projects.filter((p) => p.status === "Registered").length;

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
            <FolderOpen className="w-6 h-6 text-[#2563EB]" />
            My Projects
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage and track land acquisition projects initiated by your organization
          </p>
        </div>
        <Link
          href="/dashboard/lrb/projects/create"
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0B3A68] hover:bg-[#082D4A] text-white text-xs font-semibold rounded-xl transition-colors shadow-sm cursor-pointer no-underline"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Project</span>
        </Link>
      </div>

      {/* KPI Cards Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-[11.5px] font-medium text-slate-400">Total Projects</p>
          <p className="text-2xl font-bold text-[#0B1E36] mt-1">{totalCount}</p>
          <p className="text-[10.5px] text-slate-400 mt-1">Initiated by your LRB unit</p>
        </div>
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-[11.5px] font-medium text-slate-400">Draft Proposals</p>
          <p className="text-2xl font-bold text-slate-600 mt-1">{draftCount}</p>
          <p className="text-[10.5px] text-slate-400 mt-1">Pending submission</p>
        </div>
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-[11.5px] font-medium text-slate-400">Under Review / Routing</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">{underReviewCount}</p>
          <p className="text-[10.5px] text-slate-400 mt-1">PIA Technical Check & Engine</p>
        </div>
        <div className="bg-white p-4.5 rounded-2xl border border-slate-200 shadow-2xs">
          <p className="text-[11.5px] font-medium text-slate-400">Registered Projects</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">{registeredCount}</p>
          <p className="text-[10.5px] text-slate-400 mt-1">Statutory workflow ready</p>
        </div>
      </div>

      {/* Search & Filters Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 flex items-center justify-between gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by project name or ID..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl outline-none focus:border-[#2563EB] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl px-3 py-2 outline-none focus:border-[#2563EB] cursor-pointer"
          >
            <option value="">All Statuses</option>
            <option value="Draft">Draft</option>
            <option value="Under PIA Review">Under PIA Review</option>
            <option value="Clarification Required">Clarification Required</option>
            <option value="In Routing">In Routing</option>
            <option value="Registered">Registered</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl px-3 py-2 outline-none focus:border-[#2563EB] cursor-pointer"
          >
            <option value="">All Project Types</option>
            <option value="National Highway">National Highway</option>
            <option value="Railway Corridor">Railway Corridor</option>
            <option value="Industrial Corridor">Industrial Corridor</option>
            <option value="Solar Power Park">Solar Power Park</option>
            <option value="Urban Metro Rail">Urban Metro Rail</option>
          </select>

          <input
            type="text"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            placeholder="Filter Location..."
            className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium rounded-xl px-3 py-2 outline-none focus:border-[#2563EB] max-w-[160px]"
          />

          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("");
              setTypeFilter("");
              setLocationFilter("");
            }}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer border border-slate-200"
            title="Reset Filters"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10.5px]">
                <th className="py-3 px-4">Project Name & ID</th>
                <th className="py-3 px-4">Project Type</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Land Required</th>
                <th className="py-3 px-4">Current Stage</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedProjects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No projects found matching the criteria.
                  </td>
                </tr>
              ) : (
                paginatedProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50/70 transition-colors group">
                    <td className="py-3.5 px-4 max-w-[240px]">
                      <button
                        onClick={() => handleOpenDetail(project)}
                        className="font-bold text-[#0B1E36] hover:text-[#2563EB] text-[13px] line-clamp-1 text-left cursor-pointer transition-colors"
                      >
                        {project.projectName}
                      </button>
                      <span className="text-[10.5px] font-mono text-slate-400 font-medium">{project.projectCode}</span>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">{project.projectType}</td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {project.locations.map((l) => l.district).join(", ")} ({project.locations[0]?.state})
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-[#0B1E36]">{project.totalLandArea} Ha</span>
                      <p className="text-[10.5px] text-slate-400">{project.totalParcels} Parcels</p>
                    </td>
                    <td className="py-3.5 px-4 max-w-[180px]">
                      <span className="text-[12px] text-slate-600 font-medium line-clamp-2">{project.currentStage}</span>
                    </td>
                    <td className="py-3.5 px-4">{getStatusBadge(project.status)}</td>
                    <td className="py-3.5 px-4 text-slate-500">{project.lastUpdated}</td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenDetail(project)}
                          className="p-1.5 rounded-lg text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer"
                          title="View Project Information"
                        >
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <Link
                          href="/dashboard/lrb/projects/create"
                          className="p-1.5 rounded-lg text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors cursor-pointer no-underline"
                          title="Edit Project"
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

        {/* Table Footer / Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-slate-50 border-t border-slate-200 text-xs">
          <p className="text-slate-500 font-medium">
            Showing {Math.min((page - 1) * pageSize + 1, filteredProjects.length)} to{" "}
            {Math.min(page * pageSize, filteredProjects.length)} of {filteredProjects.length} projects
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