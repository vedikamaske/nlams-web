"use client";

import { useAuth } from "@/lib/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { LogOut, Shield, User, Landmark } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, organization, activeRole, roles, setActiveRole, logout, loading, isAuthenticated, provisionError } =
    useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !isAuthenticated && !user) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#EEF5FB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#0B3A68] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-[#102F50]">
            Verifying Sankalp Credentials...
          </p>
        </div>
      </div>
    );
  }

  if (provisionError || !user) {
    return (
      <div className="min-h-screen bg-[#EEF5FB] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl p-6 border border-[#CBDCE9] shadow-xl text-center">
          <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-[#102F50] mb-2">Access Resticted</h2>
          <p className="text-xs text-slate-600 mb-6">
            {provisionError || "Your account is authenticated, but Sankalp access has not been provisioned."}
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/apply-access"
              className="px-4 py-2 bg-[#1B8354] text-white rounded-xl text-xs font-semibold hover:bg-[#156B44] transition-colors"
            >
              Apply for Access
            </Link>
            <button
              onClick={() => logout().then(() => router.push("/login"))}
              className="px-4 py-2 border border-[#CBDCE9] text-[#102F50] rounded-xl text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (pathname?.startsWith("/dashboard/admin")) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#EEF5FB] flex flex-col font-sans">
      {/* Shared Header Bar */}
      <header className="bg-[#102F50] text-white border-b border-[#1E4870] px-4 py-3 sm:px-8 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 text-white no-underline">
            <div className="w-8 h-8 rounded-lg bg-[#1B8354] flex items-center justify-center font-extrabold text-white text-sm shadow-xs">
              NL
            </div>
            <div>
              <h1 className="text-sm font-extrabold tracking-wide uppercase leading-none">
                Sankalp / NLAMS
              </h1>
              <p className="text-[10px] text-slate-300 font-medium">
                National Land Acquisition System
              </p>
            </div>
          </Link>
        </div>

        {/* User profile & Active Role badge */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 border-r border-[#1E4870] pr-4 text-right">
            <div>
              <p className="text-xs font-bold text-white">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 justify-end">
                <Landmark className="w-3 h-3" />
                {organization ? organization.name : "Government of India"}
              </p>
            </div>
          </div>

          {/* Role selector dropdown if multiple roles */}
          {roles.length > 1 ? (
            <select
              value={activeRole?.code || ""}
              onChange={(e) => {
                const found = roles.find((r) => r.code === e.target.value);
                if (found) setActiveRole(found);
              }}
              className="bg-[#1B436E] border border-[#2B5D92] text-xs font-bold text-white px-2.5 py-1.5 rounded-lg outline-none cursor-pointer"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.code}>
                  Role: {r.name}
                </option>
              ))}
            </select>
          ) : (
            <div className="bg-[#1B8354]/20 border border-[#1B8354]/40 px-3 py-1 rounded-full text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span>{activeRole?.name || roles[0]?.name || "Authorized User"}</span>
            </div>
          )}

          {/* Sign out button */}
          <button
            onClick={() => logout().then(() => router.push("/login"))}
            className="bg-[#1B436E] hover:bg-red-700/80 text-white p-2 rounded-lg transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto">
        {children}
      </main>
    </div>
  );
}
