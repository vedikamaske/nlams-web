"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  MapPin,
  Settings,
  Activity,
  FileCheck,
  BarChart3,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Inbox,
} from "lucide-react";

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  activeSection: string;
}

export const menuItems = [
  { id: "dashboard", slug: "", label: "Dashboard", icon: LayoutDashboard },
  { id: "profile_management", slug: "profile-management", label: "Profile Management", icon: UserPlus },
  { id: "access_requests", slug: "access-requests", label: "Access Requests", icon: Inbox },
  { id: "org_management", slug: "org-management", label: "Organization Management", icon: Building2 },
  { id: "jurisdiction", slug: "jurisdiction", label: "Jurisdiction Management", icon: MapPin },
  { id: "policy", slug: "policy", label: "Policy & Configuration", icon: Settings },
  { id: "system_activity", slug: "system-activity", label: "System Activity", icon: Activity },
  { id: "audit_logs", slug: "audit-logs", label: "Audit Logs", icon: FileCheck },
  { id: "reports", slug: "reports", label: "Reports & Analytics", icon: BarChart3 },
  { id: "help", slug: "help", label: "Help & Support", icon: HelpCircle },
];

export default function AdminSidebar({
  isCollapsed,
  onToggleCollapse,
  activeSection,
}: AdminSidebarProps) {
  const router = useRouter();

  const handleNavigate = (slug: string) => {
    const targetPath = slug ? `/dashboard/admin/${slug}` : `/dashboard/admin`;
    router.push(targetPath);
  };

  return (
    <aside
      className={`relative bg-[#0B1E36] text-slate-200 transition-all duration-300 flex flex-col z-30 shadow-xl select-none ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Sidebar Header */}
      <div className="h-16 px-4 flex items-center border-b border-[#1A3354]">
        <Link href="/dashboard/admin" className="flex items-center gap-3 overflow-hidden no-underline">
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
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavigate(item.slug)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] transition-all cursor-pointer text-left ${
                isActive
                  ? "bg-[#2563EB] text-white shadow-md font-semibold"
                  : "text-slate-300 hover:bg-[#162C4A] hover:text-white font-medium"
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className="w-[18px] h-[18px] shrink-0" />
              {!isCollapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={onToggleCollapse}
        className="absolute top-1/12 -translate-y-1/2 -right-3.5 w-7 h-7 rounded-full bg-[#162D4D] hover:bg-[#203D66] border border-[#2B4C77] text-white flex items-center justify-center transition-all shadow-md cursor-pointer z-40"
        title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>
    </aside>
  );
}