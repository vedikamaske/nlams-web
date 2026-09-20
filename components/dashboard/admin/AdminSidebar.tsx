"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Building2,
  MapPin,
  Settings,
  Activity,
  FileCheck,
  BarChart3,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export default function AdminSidebar({
  isCollapsed,
  onToggleCollapse,
}: AdminSidebarProps) {
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard/admin",
    },
    {
      id: "user_management",
      label: "User Management",
      icon: Users,
      href: "#user-management",
    },
    {
      id: "org_management",
      label: "Organization Management",
      icon: Building2,
      href: "#orgs",
    },
    {
      id: "jurisdiction",
      label: "Jurisdiction Management",
      icon: MapPin,
      href: "#jurisdiction",
    },
    {
      id: "policy",
      label: "Policy & Configuration",
      icon: Settings,
      href: "#policy",
    },
    {
      id: "system_activity",
      label: "System Activity",
      icon: Activity,
      href: "#activity",
    },
    {
      id: "audit_logs",
      label: "Audit Logs",
      icon: FileCheck,
      href: "#audit",
    },
    {
      id: "reports",
      label: "Reports & Analytics",
      icon: BarChart3,
      href: "#reports",
    },
    {
      id: "help",
      label: "Help & Support",
      icon: HelpCircle,
      href: "#help",
    },
  ];

  return (
    <aside
      className={`relative bg-[#0B1E36] text-slate-200 transition-all duration-300 flex flex-col z-30 shadow-xl select-none ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Sidebar Header with Logo & Title */}
      <div className="h-16 px-4 flex items-center border-b border-[#1A3354]">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="relative shrink-0 flex items-center justify-center">
            <Image
              src="/images/sankalp-white.png"
              alt="Sankalp Logo"
              width={isCollapsed ? 44 : 52}
              height={isCollapsed ? 44 : 52}
              className="object-contain transition-all duration-300"
              priority
            />
          </div>
          {!isCollapsed && (
            <span className="text-xl font-bold text-white tracking-tight font-sans">
              Sankalp
            </span>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => setActiveItem(item.id)}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] transition-all no-underline ${
                isActive
                  ? "bg-[#2563EB] text-white shadow-md font-semibold"
                  : "text-slate-300 hover:bg-[#162C4A] hover:text-white font-medium"
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle — centered vertically on the right edge */}
      <button
        onClick={onToggleCollapse}
        className="absolute top-1/12 -translate-y-1/2 -right-3.5 w-7 h-7 rounded-full bg-[#162D4D] hover:bg-[#203D66] border border-[#2B4C77] text-white flex items-center justify-center transition-all shadow-md cursor-pointer z-40"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? (
          <ChevronRight className="w-4 h-4 text-white" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-white" />
        )}
      </button>
    </aside>
  );
}
