"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderOpen,
  Inbox,
  BookOpen,
  Layers,
  Map,
  MapPin,
  ClipboardList,
  Bell,
  FileText,
  MessagesSquare,
  CheckSquare,
  GitBranch,
  BarChart3,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Scale,
  CreditCard,
} from "lucide-react";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  children?: { id: string; label: string; icon: React.ElementType; href: string }[];
}

const menuItems: SidebarItem[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, href: "/dashboard/cala" },
  {
    id: "acquisition_cases",
    label: "Acquisition Cases",
    icon: FolderOpen,
    children: [
      { id: "assigned_cases", label: "Assigned Cases", icon: Inbox, href: "/dashboard/cala/cases/assigned" },
      { id: "pending_cases", label: "Pending Cases", icon: ClipboardList, href: "/dashboard/cala/cases/pending" },
      { id: "case_registry", label: "Case Registry", icon: BookOpen, href: "/dashboard/cala/cases/registry" },
    ],
  },
  {
    id: "land_parcels",
    label: "Land & Parcels",
    icon: Layers,
    children: [
      { id: "affected_parcels", label: "Affected Parcels", icon: MapPin, href: "/dashboard/cala/land/parcels" },
      { id: "survey_details", label: "Survey & Land Details", icon: ClipboardList, href: "/dashboard/cala/land/survey" },
      { id: "gis_map", label: "GIS Map", icon: Map, href: "/dashboard/cala/land/gis" },
    ],
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    children: [
      { id: "draft_notifications", label: "Draft Notifications", icon: FileText, href: "/dashboard/cala/notifications/draft" },
      { id: "published_notifications", label: "Published Notifications", icon: Bell, href: "/dashboard/cala/notifications/published" },
    ],
  },
  {
    id: "compensation",
    label: "Compensation",
    icon: Scale,
    children: [
      { id: "compensation_assessment", label: "Compensation Assessment", icon: Scale, href: "/dashboard/cala/compensation/assessment" },
      { id: "payment_status", label: "Payment Status", icon: CreditCard, href: "/dashboard/cala/compensation/payment" },
    ],
  },
  { id: "documents", label: "Documents", icon: FileText, href: "/dashboard/cala/documents" },
  { id: "objections_hearings", label: "Objections & Hearings", icon: MessagesSquare, href: "/dashboard/cala/objections" },
  { id: "tasks_clarifications", label: "Tasks & Clarifications", icon: CheckSquare, href: "/dashboard/cala/tasks" },
  { id: "workflow", label: "Workflow Tracking", icon: GitBranch, href: "/dashboard/cala/workflow" },
  { id: "reports", label: "Reports", icon: BarChart3, href: "/dashboard/cala/reports" },
  { id: "help", label: "Help & Support", icon: HelpCircle, href: "/dashboard/cala/help" },
];

interface CALASidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function CALASidebar({ isCollapsed, onToggleCollapse }: CALASidebarProps) {
  const pathname = usePathname();
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(["acquisition_cases", "land_parcels", "notifications", "compensation"])
  );

  const getActiveItemFromPath = (path: string): string => {
    if (path === "/dashboard/cala/cases/assigned") return "assigned_cases";
    if (path === "/dashboard/cala/cases/pending") return "pending_cases";
    if (path === "/dashboard/cala/cases/registry") return "case_registry";
    if (path === "/dashboard/cala/land/parcels") return "affected_parcels";
    if (path === "/dashboard/cala/land/survey") return "survey_details";
    if (path === "/dashboard/cala/land/gis") return "gis_map";
    if (path === "/dashboard/cala/notifications/draft") return "draft_notifications";
    if (path === "/dashboard/cala/notifications/published") return "published_notifications";
    if (path === "/dashboard/cala/compensation/assessment") return "compensation_assessment";
    if (path === "/dashboard/cala/compensation/payment") return "payment_status";
    if (path === "/dashboard/cala/documents") return "documents";
    if (path === "/dashboard/cala/objections") return "objections_hearings";
    if (path === "/dashboard/cala/tasks") return "tasks_clarifications";
    if (path === "/dashboard/cala/workflow") return "workflow";
    if (path === "/dashboard/cala/reports") return "reports";
    if (path === "/dashboard/cala/help") return "help";
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
        <Link href="/dashboard/cala" className="flex items-center gap-3 overflow-hidden no-underline">
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
            <span className="text-xl font-bold text-white tracking-tight font-sans">Sankalp</span>
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
            const isActive =
              activeItem === item.id || item.children?.some((c) => c.id === activeItem);
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

      {/* Sidebar Collapse Toggle */}
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
