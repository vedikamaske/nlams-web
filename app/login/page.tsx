"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/useAuth";
import { apiClient } from "@/lib/apiClient";
import { AuthApplicationContext, AuthRole } from "@/lib/types/auth";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  ArrowRight,
  Settings,
  Building2,
  Landmark,
  UserCheck,
  Users,
  Briefcase,
  User,
  BarChart3,
  Check,
  ShieldAlert,
  ArrowLeft,
  AlertTriangle,
} from "lucide-react";

// Stakeholder Roles matching login-page UI reference
const STAKEHOLDER_ROLES = [
  {
    id: "system_admin",
    code: "SYSTEM_ADMIN",
    label: "System Admin",
    icon: Settings,
    description: "System administration & access controls",
  },
  {
    id: "central_ministry",
    code: "CENTRAL_MINISTRY",
    label: "Central Ministry",
    icon: Building2,
    description: "National oversight & policy governance",
  },
  {
    id: "state_government",
    code: "STATE_GOVERNMENT",
    label: "State Government",
    icon: Landmark,
    description: "State level acquisition monitoring",
  },
  {
    id: "district_collector",
    code: "DISTRICT_COLLECTOR",
    label: "District Collector",
    icon: UserCheck,
    description: "District level land administration",
  },
  {
    id: "lao_cala",
    code: "LAO", // Also matches CALA
    label: "LAO / CALA",
    icon: Users,
    description: "Land Acquisition Officer / Competent Authority",
  },
  {
    id: "pia_lrb",
    code: "PIA", // Also matches LRB
    label: "PIA / LRB",
    icon: Briefcase,
    description: "Project Implementing Agency / Board",
  },
  {
    id: "field_officer",
    code: "FIELD_OFFICER",
    label: "Field Officer",
    icon: User,
    description: "On-ground survey & verification",
  },
  {
    id: "rr_authority",
    code: "RR_AUTHORITY",
    label: "R&R Authority",
    icon: Users,
    description: "Rehabilitation & Resettlement Authority",
  },
  {
    id: "policy_maker",
    code: "POLICY_MAKER",
    label: "Policy Maker",
    icon: BarChart3,
    description: "Analytics & strategic decision making",
  },
];

// Zod Schema for Login Validation
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Please enter your Official Email ID.")
    .email("Please enter a valid email address."),
  password: z.string().min(1, "Please enter your Password."),
  selectedRoleId: z.string().min(1, "Please select your Official Role."),
});

export default function LoginPage() {
  const router = useRouter();
  const { fetchUserContext, isAuthenticated, setActiveRole } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");

  const [showPassword, setShowPassword] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Multiple roles modal selection state
  const [availableUserRoles, setAvailableUserRoles] = useState<AuthRole[]>([]);
  const [showRoleSelectModal, setShowRoleSelectModal] = useState(false);

  const roleDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        roleDropdownRef.current &&
        !roleDropdownRef.current.contains(event.target as Node)
      ) {
        setIsRoleDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Auto fetch context if needed
    }
  }, [isAuthenticated]);

  const selectedRoleObj = STAKEHOLDER_ROLES.find(
    (r) => r.id === selectedRoleId
  );
  const SelectedRoleIcon = selectedRoleObj ? selectedRoleObj.icon : UserCheck;

  // Map role code to authorized dashboard path
  const getDashboardPath = (roleCode: string): string => {
    switch (roleCode) {
      case "SYSTEM_ADMIN":
        return "/dashboard/admin";
      case "CENTRAL_MINISTRY":
        return "/dashboard/central";
      case "STATE_GOVERNMENT":
        return "/dashboard/state";
      case "DISTRICT_COLLECTOR":
        return "/dashboard/collector";
      case "LAO":
        return "/dashboard/lao";
      case "CALA":
        return "/dashboard/cala";
      case "PIA":
        return "/dashboard/pia";
      case "LRB":
        return "/dashboard/lrb";
      case "FIELD_OFFICER":
        return "/dashboard/field-officer";
      case "RR_AUTHORITY":
        return "/dashboard/rr-authority";
      case "POLICY_MAKER":
        return "/dashboard/policy-maker";
      default:
        return "/dashboard/admin";
    }
  };

  const handleSuccessfulAuthContext = (context: AuthApplicationContext) => {
    const assignedRoles = context.roles;

    if (!assignedRoles || assignedRoles.length === 0) {
      setErrorMessage(
        "Your account is authenticated, but no active Sankalp roles are assigned to your profile."
      );
      setIsLoading(false);
      return;
    }

    // Role mismatch check between UI dropdown selection and backend assigned roles
    const selectedUiCode = selectedRoleObj?.code;
    const isMatchingRole = assignedRoles.some((r) => {
      if (selectedUiCode === "LAO") return r.code === "LAO" || r.code === "CALA";
      if (selectedUiCode === "PIA") return r.code === "PIA" || r.code === "LRB";
      return r.code === selectedUiCode;
    });

    if (!isMatchingRole) {
      setWarningMessage(
        `Selected UI role (${selectedRoleObj?.label}) does not match your assigned Sankalp access. Proceeding with your authoritative backend role (${assignedRoles[0].name}).`
      );
    }

    if (assignedRoles.length > 1) {
      setAvailableUserRoles(assignedRoles);
      setShowRoleSelectModal(true);
      setIsLoading(false);
      return;
    }

    // Single role redirect
    const targetRole = assignedRoles[0];
    setActiveRole(targetRole);
    setSuccessMessage(
      `Authenticated as ${targetRole.name}! Redirecting to dashboard...`
    );

    setTimeout(() => {
      router.push(getDashboardPath(targetRole.code));
    }, 800);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setWarningMessage("");
    setSuccessMessage("");

    // Validate inputs with Zod
    const validationResult = loginSchema.safeParse({
      email,
      password,
      selectedRoleId,
    });

    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0]?.message;
      setErrorMessage(firstError || "Invalid login input.");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Supabase Auth signInWithPassword
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError || !authData.session) {
        setIsLoading(false);
        setErrorMessage(
          authError?.message === "Invalid login credentials"
            ? "Invalid email or password."
            : authError?.message || "Authentication failed."
        );
        return;
      }

      // 2. Query Express backend GET /api/v1/me with Supabase Access Token
      const res = await apiClient<AuthApplicationContext>("/me");

      if (!res.success || !res.data) {
        setIsLoading(false);
        setErrorMessage(
          res.error ||
            "Your account is authenticated, but Sankalp access has not been provisioned."
        );
        return;
      }

      // 3. Update AuthProvider state
      await fetchUserContext();

      // 4. Handle role evaluation and routing
      handleSuccessfulAuthContext(res.data);
    } catch (err) {
      console.error("Login process error:", err);
      setIsLoading(false);
      setErrorMessage(
        "Network connection error while connecting to Sankalp servers."
      );
    }
  };

  // Google OAuth Login
  const handleGoogleLogin = async () => {
    setErrorMessage("");
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/login`,
        },
      });

      if (error) {
        setErrorMessage(error.message);
      }
    } catch (err) {
      console.error("Google OAuth error:", err);
      setErrorMessage("Failed to initiate Google authentication.");
    }
  };

  return (
    <div className="relative h-screen w-full bg-[#EEF5FB] flex flex-col items-center justify-center p-3 sm:p-6 lg:p-8 font-sans overflow-hidden">
      {/* Very Top Right: Back to Home link */}
      <div className="absolute top-3 right-3 sm:top-5 sm:right-6 lg:top-6 lg:right-8 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#0B3A68] hover:text-[#082D4A] transition-colors bg-white/95 hover:bg-white backdrop-blur px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border border-[#D8E3EE] shadow-sm no-underline"
          style={{ textDecoration: "none" }}
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Back to home</span>
        </Link>
      </div>

      {/* Main Card Container */}
      <div className="w-full max-w-[1100px] max-h-[calc(100vh-60px)] sm:max-h-[calc(100vh-70px)] bg-white rounded-2xl sm:rounded-3xl border border-[#D8E3EE] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 flex-1 lg:flex-none">
        {/* ── LEFT PANEL: Full Illustration ──────────────── */}
        <div className="lg:col-span-6 relative w-full h-full min-h-[240px] sm:min-h-[300px] lg:min-h-full border-b lg:border-b-0 lg:border-r border-[#D2E4F2] overflow-hidden bg-[#E5F2FA]">
          <Image
            src="/images/login-illustration.png"
            alt="NLAMS Login Illustration"
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* ── RIGHT PANEL: Stakeholder Login Form ─────────────── */}
        <div className="lg:col-span-6 bg-white p-5 sm:p-8 lg:p-10 flex flex-col justify-between relative overflow-y-auto">
          {/* Form Content */}
          <div className="max-w-[420px] w-full mx-auto my-auto py-1">
            {/* Header Titles */}
            <div className="text-center mb-5 sm:mb-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102F50] tracking-tight">
                Welcome to NLAMS
              </h1>
              <p className="text-[#5D7085] text-xs sm:text-sm font-medium mt-1">
                Sign in to access the official portal
              </p>
            </div>

            {/* Error / Warning / Success Feedback */}
            {errorMessage && (
              <div className="mb-4 p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {warningMessage && (
              <div className="mb-4 p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{warningMessage}</span>
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
              {/* Field 1: Official Email ID */}
              <div>
                <label className="block text-xs font-bold text-[#102F50] mb-1">
                  Official Email ID <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center rounded-xl border border-[#CBDCE9] bg-white transition-all focus-within:border-[#0B3A68] focus-within:ring-2 focus-within:ring-[#0B3A68]/15 shadow-xs">
                  <Mail className="w-4 h-4 text-[#8EA3B7] ml-3 shrink-0" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.name@gov.in"
                    className="w-full py-2.5 px-2.5 text-xs sm:text-sm text-[#102F50] bg-transparent outline-none placeholder:text-[#9FB1C3] font-medium"
                    required
                  />
                </div>
              </div>

              {/* Field 2: Password */}
              <div>
                <label className="block text-xs font-bold text-[#102F50] mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center rounded-xl border border-[#CBDCE9] bg-white transition-all focus-within:border-[#0B3A68] focus-within:ring-2 focus-within:ring-[#0B3A68]/15 shadow-xs">
                  <Lock className="w-4 h-4 text-[#8EA3B7] ml-3 shrink-0" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full py-2.5 px-2.5 text-xs sm:text-sm text-[#102F50] bg-transparent outline-none placeholder:text-[#9FB1C3] font-medium"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="mr-3 text-[#8EA3B7] hover:text-[#5D7085] transition-colors p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Field 3: Official Role Dropdown */}
              <div>
                <label className="block text-xs font-bold text-[#102F50] mb-1">
                  Official Role <span className="text-red-500">*</span>
                </label>
                <div className="relative" ref={roleDropdownRef}>
                  {/* Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                    className="w-full flex items-center justify-between rounded-xl border border-[#CBDCE9] bg-white px-3 py-2.5 text-xs sm:text-sm transition-all focus:outline-none focus:border-[#0B3A68] focus:ring-2 focus:ring-[#0B3A68]/15 cursor-pointer shadow-xs text-left"
                    aria-haspopup="listbox"
                    aria-expanded={isRoleDropdownOpen}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <SelectedRoleIcon className="w-4 h-4 text-[#8EA3B7] shrink-0" />
                      {selectedRoleObj ? (
                        <span className="font-semibold text-[#102F50] truncate">
                          {selectedRoleObj.label}
                        </span>
                      ) : (
                        <span className="text-[#9FB1C3] font-medium truncate">
                          Select your role
                        </span>
                      )}
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8EA3B7] shrink-0 transition-transform duration-200 ${
                        isRoleDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Options Box */}
                  {isRoleDropdownOpen && (
                    <div
                      className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#CBDCE9] rounded-2xl shadow-2xl z-50 py-1 max-h-60 overflow-y-auto animate-in fade-in zoom-in-95 duration-100"
                      role="listbox"
                    >
                      {STAKEHOLDER_ROLES.map((role) => {
                        const IconComponent = role.icon;
                        const isSelected = selectedRoleId === role.id;
                        return (
                          <button
                            key={role.id}
                            type="button"
                            onClick={() => {
                              setSelectedRoleId(role.id);
                              setIsRoleDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm transition-colors text-left cursor-pointer ${
                              isSelected
                                ? "bg-[#EBF3FB] text-[#0B3A68] font-bold"
                                : "hover:bg-[#F4F8FD] text-[#102F50] font-medium"
                            }`}
                            role="option"
                            aria-selected={isSelected}
                          >
                            <div className="flex items-center gap-2.5">
                              <IconComponent
                                className={`w-4 h-4 shrink-0 ${
                                  isSelected
                                    ? "text-[#0B3A68]"
                                    : "text-[#5D7085]"
                                }`}
                              />
                              <span className="truncate">{role.label}</span>
                            </div>
                            {isSelected && (
                              <Check className="w-4 h-4 text-[#0B3A68] shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#1B8354] hover:bg-[#156B44] active:bg-[#125B39] text-white font-semibold py-2.5 sm:py-3 px-5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer text-xs sm:text-sm mt-1.5 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Authenticating & Resolving...
                  </span>
                ) : (
                  <>
                    <span>Sign In to Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Google OAuth Secondary Option */}
            <div className="mt-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full border border-[#CBDCE9] hover:bg-slate-50 text-[#102F50] font-semibold py-2 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>

            {/* Bottom Footer Section */}
            <div className="mt-4 sm:mt-5">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E2E8F0]" />
                </div>
                <div className="relative bg-white px-3 text-[10.5px] sm:text-xs font-semibold text-[#8FA4B8]">
                  New to NLAMS?
                </div>
              </div>

              <div className="mt-2 sm:mt-3 text-center">
                <Link
                  href="/apply-access"
                  className="inline-flex items-center gap-1.5 text-[#1B8354] hover:text-[#13633F] font-bold text-xs transition-colors cursor-pointer"
                >
                  <span>Apply for Access</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Footer note */}
          <div className="mt-3 text-center text-[10px] text-[#8FA4B8] shrink-0">
            National Land Acquisition & Management System &copy; {new Date().getFullYear()} Government of India
          </div>
        </div>
      </div>

      {/* Multiple Roles Selection Modal */}
      {showRoleSelectModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-[#CBDCE9] shadow-2xl">
            <h3 className="text-lg font-bold text-[#102F50]">
              Select Working Context
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Your profile has multiple active Sankalp roles assigned. Select the role context to open:
            </p>
            <div className="space-y-2 mb-6">
              {availableUserRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    setActiveRole(role);
                    setShowRoleSelectModal(false);
                    router.push(getDashboardPath(role.code));
                  }}
                  className="w-full p-3 rounded-xl border border-[#CBDCE9] hover:border-[#0B3A68] hover:bg-[#F4F8FD] text-left transition-all flex items-center justify-between cursor-pointer"
                >
                  <div>
                    <p className="text-xs font-bold text-[#102F50]">
                      {role.name}
                    </p>
                    <p className="text-[10px] text-slate-500">{role.code}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#0B3A68]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
