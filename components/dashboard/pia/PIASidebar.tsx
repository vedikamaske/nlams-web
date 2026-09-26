"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  FolderOpen,
  ClipboardList,
  FileSearch,
  CheckSquare,
  Map,
  Layers,
  FileText,
  MessageSquareWarning,
  GitBranch,
  Bell,
  BarChart3,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  children?: { id: string; label: string; icon: React.ElementType; href: string }[];
}

const menuItems: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/pia" },
  {
    id: "projects",
    label: "Projects",
    icon: FolderKanban,
    children: [
      { id: "assigned_projects", label: "Assigned Projects", icon: FolderOpen, href: "/dashboard/pia/projects/assigned" },
      { id: "project_proposals", label: "Project Proposals", icon: ClipboardList, href: "/dashboard/pia/projects/proposals" },
    ],
  },
  {
    id: "technical_review",
    label: "Technical Review",
    icon: FileSearch,
    children: [
      { id: "pending_review", label: "Pending Review", icon: CheckSquare, href: "/dashboard/pia/technical-review/pending" },
      { id: "gis_validation", label: "GIS / Alignment Validation", icon: Map, href: "/dashboard/pia/technical-review/gis" },
      { id: "land_validation", label: "Land Requirement Validation", icon: Layers, href: "/dashboard/pia/technical-review/land" },
    ],
  },
  { id: "documents", label: "Documents", icon: FileText, href: "/dashboard/pia/documents" },
  { id: "clarifications", label: "Clarifications & Actions", icon: MessageSquareWarning, href: "/dashboard/pia/clarifications" },
  { id: "workflow", label: "Workflow Tracking", icon: GitBranch, href: "/dashboard/pia/workflow" },
  { id: "notifications", label: "Notifications", icon: Bell, href: "/dashboard/pia/notifications" },
  { id: "reports", label: "Reports", icon: BarChart3, href: "/dashboard/pia/reports" },
  { id: "help", label: "Help & Support", icon: HelpCircle, href: "/dashboard/pia/help" },
];

interface PIASidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function PIASidebar({ isCollapsed, onToggleCollapse }: PIASidebarProps) {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(["projects", "technical_review"]));

  const getActiveItemFromPath = (path: string) => {
    if (path === "/dashboard/pia/projects/assigned" || path === "/dashboard/pia/projects") return "assigned_projects";
    if (path === "/dashboard/pia/projects/proposals" || path === "/dashboard/pia/proposals") return "project_proposals";
    if (path === "/dashboard/pia/technical-review/pending") return "pending_review";
    if (path === "/dashboard/pia/technical-review/gis") return "gis_validation";
    if (path === "/dashboard/pia/technical-review/land") return "land_validation";
    if (path === "/dashboard/pia/documents") return "documents";
    if (path === "/dashboard/pia/clarifications") return "clarifications";
    if (path === "/dashboard/pia/workflow") return "workflow";
    if (path === "/dashboard/pia/notifications") return "notifications";
    if (path === "/dashboard/pia/reports") return "reports";
    if (path === "/dashboard/pia/help") return "help";
    return "dashboard";
  };

  const activeItem = getActiveItemFromPath(pathname);

  const toggleGroup = (id: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <aside
      className={`relative bg-[#0B1E36] text-slate-200 transition-all duration-300 flex flex-col z-30 shadow-xl select-none ${
        isCollapsed ? "w-[72px]" : "w-64"
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center border-b border-[#1A3354] shrink-0">
        <Link href="/dashboard/pia" className="flex items-center gap-3 overflow-hidden no-underline">
          <div className="relative shrink-0">
            <Image
              src="/images/sankalp-white.png"
              alt="Sankalp"
              width={isCollapsed ? 38 : 44}
              height={isCollapsed ? 38 : 44}
              className="object-contain transition-all duration-300"
              priority
            />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold text-white tracking-tight font-sans">
              Sankalp
            </span>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav
        className="flex-1 py-3 px-2.5 overflow-y-auto"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="space-y-0.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id || item.children?.some((c) => c.id === activeItem);
            const isExpanded = expandedGroups.has(item.id);
            const hasChildren = !!item.children?.length;

            if (hasChildren) {
              return (
                <div key={item.id}>
                  <button
                    onClick={() => {
                      if (!isCollapsed) toggleGroup(item.id);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#162C4A] text-white font-semibold"
                        : "text-slate-400 hover:bg-[#162C4A] hover:text-white font-medium"
                    }`}
                    title={isCollapsed ? item.label : undefined}
                  >
                    <Icon className="w-[18px] h-[18px] shrink-0" />
                    {!isCollapsed && (
                      <>
                        <span className="truncate flex-1 text-left">{item.label}</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 shrink-0 text-slate-500 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </>
                    )}
                  </button>

                  {!isCollapsed && isExpanded && (
                    <div className="mt-0.5 ml-3 pl-3 border-l border-[#1A3354] space-y-0.5">
                      {item.children!.map((child) => {
                        const ChildIcon = child.icon;
                        const isChildActive = activeItem === child.id;
                        return (
                          <Link
                            key={child.id}
                            href={child.href}
                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12.5px] transition-all no-underline ${
                              isChildActive
                                ? "bg-[#2563EB] text-white font-semibold shadow-xs"
                                : "text-slate-400 hover:bg-[#162C4A] hover:text-white font-medium"
                            }`}
                          >
                            <ChildIcon className="w-3.5 h-3.5 shrink-0" />
                            <span className="truncate">{child.label}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={item.id}
                href={item.href!}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] transition-all no-underline ${
                  isActive
                    ? "bg-[#2563EB] text-white shadow-md font-semibold"
                    : "text-slate-400 hover:bg-[#162C4A] hover:text-white font-medium"
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className="w-[18px] h-[18px] shrink-0" />
                {!isCollapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Sidebar Collapse Toggle Button */}
      <button
        onClick={onToggleCollapse}
        className="absolute top-14 -right-3.5 w-7 h-7 rounded-full bg-[#162D4D] hover:bg-[#203D66] border border-[#2B4C77] text-white flex items-center justify-center transition-all shadow-md cursor-pointer z-40"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}
