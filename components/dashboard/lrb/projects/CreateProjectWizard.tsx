"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/useAuth";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Save,
  Send,
  Building2,
  MapPin,
  Layers,
  FileText,
  CheckCircle2,
  Plus,
  Trash2,
  Upload,
  AlertCircle,
  Search,
  FileCheck,
  Edit,
} from "lucide-react";

interface LandLocationItem {
  id: string;
  state: string;
  district: string;
  tehsil: string;
  village: string;
  landType: string;
  area: number;
  unit: string;
  parcelCount: number;
  purpose: string;
}

interface DocumentItem {
  id: string;
  category: string;
  name: string;
  fileName: string;
  fileSize: string;
  required: boolean;
  status: "Uploaded" | "Validated";
}

export default function CreateProjectWizard() {
  const router = useRouter();
  const { user } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedProjectId, setGeneratedProjectId] = useState("");

  const [projectName, setProjectName] = useState("");
  const [projectCode, setProjectCode] = useState("PRJ-2026-NV-009");
  const [projectType, setProjectType] = useState("National Highway");
  const [category, setCategory] = useState("Central Sector Project");
  const [publicPurpose, setPublicPurpose] = useState("Transport Infrastructure");
  const [description, setDescription] = useState("");

  const [orgName, setOrgName] = useState((user as any)?.organization?.name || "National Highways Authority of India (NHAI)");
  const [department, setDepartment] = useState("Land Acquisition & Environmental Cell");
  const [officerName, setOfficerName] = useState(user ? `${user.firstName} ${user.lastName}`.trim() : "Sahil Sharma");
  const [officerEmail, setOfficerEmail] = useState(user?.email || "lrb@sankalp.com");
  const [officerPhone, setOfficerPhone] = useState(user?.phone || "+91 98765 43210");

  const [objective, setObjective] = useState("");
  const [piaAgency, setPiaAgency] = useState("NHAI Regional Office Telangana");
  const [estimatedCost, setEstimatedCost] = useState("");
  const [startDate, setStartDate] = useState("2026-11-01");
  const [completionDate, setCompletionDate] = useState("2028-12-31");
  const [priority, setPriority] = useState("High");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [locations, setLocations] = useState<LandLocationItem[]>([
    {
      id: "loc-init-1",
      state: "Telangana",
      district: "Medak",
      tehsil: "Toopran",
      village: "Malkapur",
      landType: "Private Agricultural",
      area: 85.5,
      unit: "Hectares",
      parcelCount: 140,
      purpose: "Main ROW 60m Width",
    },
  ]);

  const [newLocState, setNewLocState] = useState("Telangana");
  const [newLocDistrict, setNewLocDistrict] = useState("Kamareddy");
  const [newLocTehsil, setNewLocTehsil] = useState("Bhiknoor");
  const [newLocVillage, setNewLocVillage] = useState("Rameshwarpally");
  const [newLocType, setNewLocType] = useState("Government / Forest");
  const [newLocArea, setNewLocArea] = useState("60.0");
  const [newLocParcels, setNewLocParcels] = useState("90");
  const [newLocPurpose, setNewLocPurpose] = useState("Toll Plaza & Service Road");

  const [alignmentLength, setAlignmentLength] = useState("42.5");
  const [kmlFileName, setKmlFileName] = useState("NH44_Proposed_Alignment_v1.kml");

  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: "doc-1",
      category: "Project Proposal & Justification",
      name: "Detailed Project Feasibility & Justification Note.pdf",
      fileName: "DPR_Justification.pdf",
      fileSize: "14.2 MB",
      required: true,
      status: "Validated",
    },
    {
      id: "doc-2",
      category: "Administrative Approval",
      name: "Administrative Approval & Budgetary Sanction.pdf",
      fileName: "Admin_Sanction_2026.pdf",
      fileSize: "4.8 MB",
      required: true,
      status: "Validated",
    },
    {
      id: "doc-3",
      category: "Alignment Document",
      name: "Index Map & Proposed Alignment Vector KML",
      fileName: "NH44_Alignment_v1.kml",
      fileSize: "2.1 MB",
      required: true,
      status: "Uploaded",
    },
  ]);

  const totalLandArea = locations.reduce((sum, l) => sum + (Number(l.area) || 0), 0);
  const totalParcelsCount = locations.reduce((sum, l) => sum + (Number(l.parcelCount) || 0), 0);

  const stepsList = [
    { num: 1, title: "Project Information" },
    { num: 2, title: "Requiring Body" },
    { num: 3, title: "Project Details" },
    { num: 4, title: "Land Requirement" },
    { num: 5, title: "Alignment & GIS" },
    { num: 6, title: "Documents" },
    { num: 7, title: "Review & Submit" },
  ];

  const handleAddLocation = () => {
    if (!newLocDistrict || !newLocVillage || !newLocArea) return;
    const item: LandLocationItem = {
      id: `loc-${Date.now()}`,
      state: newLocState,
      district: newLocDistrict,
      tehsil: newLocTehsil,
      village: newLocVillage,
      landType: newLocType,
      area: parseFloat(newLocArea) || 0,
      unit: "Hectares",
      parcelCount: parseInt(newLocParcels) || 0,
      purpose: newLocPurpose || "Right of Way",
    };
    setLocations([...locations, item]);
    setNewLocVillage("");
    setNewLocArea("");
    setNewLocParcels("");
  };

  const handleRemoveLocation = (id: string) => {
    setLocations(locations.filter((l) => l.id !== id));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    const file = e.target.files[0];
    const newDoc: DocumentItem = {
      id: `doc-${Date.now()}`,
      category: "Supporting Documents",
      name: file.name,
      fileName: file.name,
      fileSize: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      required: false,
      status: "Uploaded",
    };
    setDocuments([...documents, newDoc]);
  };

  const handleSaveDraft = () => {
    alert(`Draft saved successfully for project ${projectCode}`);
  };

  const handleNext = () => {
    if (currentStep < 7) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFinalSubmit = () => {
    setShowConfirmModal(false);
    setGeneratedProjectId(projectCode);
    setIsSubmitted(true);
  };
  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center font-sans space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-[#0B1E36]">Project Proposal Submitted Successfully!</h1>
          <p className="text-xs text-slate-500 mt-1">
            Your proposal has been registered and forwarded to the Project Implementing Agency (PIA) for technical validation.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm max-w-lg mx-auto text-left space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-400 font-medium">Proposal Reference ID:</span>
            <span className="font-mono font-bold text-blue-700 text-sm">{generatedProjectId}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-400 font-medium">Project Name:</span>
            <span className="font-semibold text-slate-800">{projectName || "Nagpur-Vijayawada Corridor"}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-400 font-medium">Status:</span>
            <span className="px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
              Submitted for PIA Review
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 font-medium">Target PIA Agency:</span>
            <span className="font-semibold text-slate-800">{piaAgency}</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            onClick={() => router.push("/dashboard/lrb/projects")}
            className="px-5 py-2.5 bg-[#0B3A68] text-white text-xs font-semibold rounded-xl hover:bg-[#082D4A] cursor-pointer"
          >
            Go to My Projects
          </button>
          <button
            onClick={() => router.push("/dashboard/lrb/proposals")}
            className="px-5 py-2.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 cursor-pointer"
          >
            Track Proposals Status
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto font-sans pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-[#0B1E36]">Create New Land Acquisition Project Proposal</h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Primary project onboarding flow for Land Requiring Body (LRB)
          </p>
        </div>
        <button
          onClick={handleSaveDraft}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
        >
          <Save className="w-4 h-4 text-blue-600" />
          Save Draft
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-4 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[720px] relative">
          {stepsList.map((step) => {
            const isCompleted = currentStep > step.num;
            const isCurrent = currentStep === step.num;
            return (
              <div key={step.num} className="flex items-center gap-2 relative z-10">
                <button
                  onClick={() => isCompleted && setCurrentStep(step.num)}
                  disabled={!isCompleted}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    isCompleted
                      ? "bg-emerald-600 text-white cursor-pointer"
                      : isCurrent
                      ? "bg-[#2563EB] text-white ring-4 ring-blue-100 shadow-md"
                      : "bg-slate-100 text-slate-400 border border-slate-200"
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" /> : step.num}
                </button>
                <span
                  className={`text-xs font-semibold whitespace-nowrap ${
                    isCurrent ? "text-[#0B1E36]" : isCompleted ? "text-emerald-700" : "text-slate-400"
                  }`}
                >
                  {step.title}
                </span>
                {step.num < 7 && <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 ml-1" />}
              </div>
            );
          })}
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 space-y-6">
        {currentStep === 1 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-[#0B1E36] uppercase tracking-wider">Step 1 � Project Information</h2>
              <p className="text-xs text-slate-400 mt-0.5">Basic project identity and public purpose parameters</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5 md:col-span-2">
                <label className="font-semibold text-slate-700">Project Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. Nagpur-Vijayawada Economic Corridor Phase II"
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Project Code / File Reference</label>
                <input
                  type="text"
                  value={projectCode}
                  onChange={(e) => setProjectCode(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB] bg-slate-50 font-mono text-slate-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Project Type <span className="text-red-500">*</span></label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB]"
                >
                  <option value="National Highway">National Highway</option>
                  <option value="Railway Corridor">Railway Corridor</option>
                  <option value="Industrial Corridor">Industrial Corridor</option>
                  <option value="Solar Power Park">Solar Power Park</option>
                  <option value="Urban Metro Rail">Urban Metro Rail</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Project Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB]"
                >
                  <option value="Central Sector Project">Central Sector Project</option>
                  <option value="State Mega Infrastructure">State Mega Infrastructure</option>
                  <option value="Public-Private Partnership (PPP)">Public-Private Partnership (PPP)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Public Purpose Classification</label>
                <select
                  value={publicPurpose}
                  onChange={(e) => setPublicPurpose(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB]"
                >
                  <option value="Transport Infrastructure">Transport Infrastructure</option>
                  <option value="Defense & Security">Defense & Security</option>
                  <option value="Industrial Corridor">Industrial Corridor</option>
                  <option value="Renewable Energy">Renewable Energy</option>
                </select>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="font-semibold text-slate-700">Project Description & Scope</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Provide brief objective and necessity of land acquisition..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-[#0B1E36] uppercase tracking-wider">Step 2 � Requiring Body Details</h2>
              <p className="text-xs text-slate-400 mt-0.5">Pre-populated from your authenticated organization context</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5 md:col-span-2">
                <label className="font-semibold text-slate-700">Requiring Body Organization</label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB] bg-slate-50 font-semibold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Department / Administrative Division</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Authorized Officer Name</label>
                <input
                  type="text"
                  value={officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Official Contact Email</label>
                <input
                  type="email"
                  value={officerEmail}
                  onChange={(e) => setOfficerEmail(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Official Contact Phone</label>
                <input
                  type="text"
                  value={officerPhone}
                  onChange={(e) => setOfficerPhone(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>
          </div>
        )}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-[#0B1E36] uppercase tracking-wider">Step 3 � Project Execution & Implementation</h2>
              <p className="text-xs text-slate-400 mt-0.5">PIA agency, timeline estimates, and financial projections</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5 md:col-span-2">
                <label className="font-semibold text-slate-700">Project Objective & Strategic Rationale</label>
                <textarea
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  rows={2}
                  placeholder="Primary economic and social benefit of this project..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">PIA / Implementing Agency <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={piaAgency}
                  onChange={(e) => setPiaAgency(e.target.value)}
                  placeholder="e.g. NHAI Regional Office / RVNL Construction"
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Estimated Project Cost (? Crores)</label>
                <input
                  type="number"
                  value={estimatedCost}
                  onChange={(e) => setEstimatedCost(e.target.value)}
                  placeholder="e.g. 1250"
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Proposed Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Target Completion Date</label>
                <input
                  type="date"
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Project Priority</label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB]"
                >
                  <option value="Urgent">Urgent</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Additional Remarks / Environment Notes</label>
                <input
                  type="text"
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  placeholder="Special conditions or clearance notes..."
                  className="w-full p-2.5 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB]"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#0B1E36] uppercase tracking-wider">Step 4 � Land Requirement Schedule</h2>
                <p className="text-xs text-slate-400 mt-0.5">Specify affected land areas across villages and districts</p>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                Calculated Total: {totalLandArea} Hectares ({totalParcelsCount} Parcels)
              </span>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-3.5 text-xs text-blue-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Controlled Baseline Requirement</p>
                <p className="text-blue-700 mt-0.5">
                  This schedule forms the project's baseline requirement. Subsequent technical revisions by the PIA or Revenue Authorities will be tracked under controlled version history.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
              <p className="font-bold text-[#0B1E36]">Add Village / Location Entry</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div>
                  <label className="text-[11px] font-medium text-slate-500">State</label>
                  <input
                    type="text"
                    value={newLocState}
                    onChange={(e) => setNewLocState(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-500">District</label>
                  <input
                    type="text"
                    value={newLocDistrict}
                    onChange={(e) => setNewLocDistrict(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-500">Tehsil / Taluk</label>
                  <input
                    type="text"
                    value={newLocTehsil}
                    onChange={(e) => setNewLocTehsil(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-500">Village / Locality</label>
                  <input
                    type="text"
                    value={newLocVillage}
                    onChange={(e) => setNewLocVillage(e.target.value)}
                    placeholder="e.g. Malkapur"
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-500">Land Classification</label>
                  <select
                    value={newLocType}
                    onChange={(e) => setNewLocType(e.target.value)}
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-[#2563EB]"
                  >
                    <option value="Private Agricultural">Private Agricultural</option>
                    <option value="Government / Forest">Government / Forest</option>
                    <option value="Abadi / Habitation">Abadi / Habitation</option>
                    <option value="Industrial / Commercial">Industrial / Commercial</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-500">Area (Hectares)</label>
                  <input
                    type="number"
                    value={newLocArea}
                    onChange={(e) => setNewLocArea(e.target.value)}
                    placeholder="85.5"
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-500">Approx Parcels</label>
                  <input
                    type="number"
                    value={newLocParcels}
                    onChange={(e) => setNewLocParcels(e.target.value)}
                    placeholder="140"
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-medium text-slate-500">Specific Purpose</label>
                  <input
                    type="text"
                    value={newLocPurpose}
                    onChange={(e) => setNewLocPurpose(e.target.value)}
                    placeholder="e.g. ROW 60m"
                    className="w-full p-2 bg-white border border-slate-200 rounded-lg outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleAddLocation}
                  className="flex items-center gap-1.5 px-4 py-2 bg-[#0B3A68] text-white rounded-xl text-xs font-semibold hover:bg-[#082D4A] cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Location to Schedule
                </button>
              </div>
            </div>

            <div className="overflow-x-auto border border-slate-200 rounded-xl text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-500">
                  <tr>
                    <th className="py-2.5 px-3">Location</th>
                    <th className="py-2.5 px-3">Land Type</th>
                    <th className="py-2.5 px-3">Area (Ha)</th>
                    <th className="py-2.5 px-3">Parcels</th>
                    <th className="py-2.5 px-3">Purpose</th>
                    <th className="py-2.5 px-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {locations.map((loc) => (
                    <tr key={loc.id}>
                      <td className="py-2.5 px-3 font-semibold text-[#0B1E36]">
                        {loc.village}, {loc.tehsil}, {loc.district} ({loc.state})
                      </td>
                      <td className="py-2.5 px-3">{loc.landType}</td>
                      <td className="py-2.5 px-3 font-bold text-blue-700">{loc.area}</td>
                      <td className="py-2.5 px-3">{loc.parcelCount}</td>
                      <td className="py-2.5 px-3 text-slate-600">{loc.purpose}</td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={() => handleRemoveLocation(loc.id)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {currentStep === 5 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#0B1E36] uppercase tracking-wider">Step 5 � Spatial Alignment & GIS Workspace</h2>
                <p className="text-xs text-slate-400 mt-0.5">Interactive vector alignment drafting and KML/GeoJSON integration</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full">
                Proposed Spatial Overlay Mode
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Search Context</label>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Village, Survey No, or District..."
                      className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB]"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Corridor Alignment Length (km)</label>
                  <input
                    type="number"
                    value={alignmentLength}
                    onChange={(e) => setAlignmentLength(e.target.value)}
                    className="w-full p-2 border border-slate-200 rounded-xl outline-none focus:border-[#2563EB]"
                  />
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <label className="font-semibold text-slate-700">Vector File Upload (KML / GeoJSON)</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-blue-400 transition-colors cursor-pointer bg-slate-50">
                    <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                    <p className="font-semibold text-slate-700">{kmlFileName}</p>
                    <p className="text-[10.5px] text-slate-400">Click to replace KML alignment file</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-2 relative h-80 rounded-2xl bg-slate-900 border border-slate-700 overflow-hidden flex flex-col justify-between p-4 text-white">
                <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                <div className="relative z-10 flex items-center justify-between bg-slate-800/80 backdrop-blur-xs px-3 py-2 rounded-lg border border-slate-700/60 text-xs">
                  <span className="font-mono text-blue-300">Medak - Kamareddy Corridor Overlay</span>
                  <span className="text-emerald-400 font-bold">? KML Loaded</span>
                </div>

                <div className="relative z-10 flex items-center justify-center my-auto">
                  <div className="w-3/4 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 rounded-full relative shadow-[0_0_16px_rgba(59,130,246,0.9)]">
                    <div className="absolute -top-3 left-1/4 w-3.5 h-3.5 rounded-full bg-blue-400 border-2 border-white animate-ping"></div>
                    <div className="absolute -top-2 left-1/4 w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-white"></div>
                    <div className="absolute -top-2 left-3/4 w-3.5 h-3.5 rounded-full bg-purple-500 border-2 border-white"></div>
                  </div>
                </div>

                <div className="relative z-10 bg-slate-800/80 backdrop-blur-xs p-3 rounded-lg border border-slate-700/60 text-xs flex items-center justify-between">
                  <span>Alignment Specs: <strong>{alignmentLength} km</strong> Corridor</span>
                  <span>Buffer: <strong>60m ROW</strong></span>
                  <span>Affected Parcels: <strong>{totalParcelsCount}</strong></span>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 6 && (
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3">
              <h2 className="text-sm font-bold text-[#0B1E36] uppercase tracking-wider">Step 6 � Mandatory Project Documents</h2>
              <p className="text-xs text-slate-400 mt-0.5">Attach Feasibility DPR, Administrative Clearances, and Schedules</p>
            </div>

            <div className="border-2 border-dashed border-blue-200 bg-blue-50/40 rounded-2xl p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-xs font-bold text-[#0B1E36]">Drag and drop project files here, or browse</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Supports PDF, KML, DWG, ZIP up to 50MB</p>
              <label className="mt-3 inline-block px-4 py-2 bg-[#0B3A68] hover:bg-[#082D4A] text-white text-xs font-semibold rounded-xl cursor-pointer transition-colors">
                Browse Files
                <input type="file" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-bold text-[#0B1E36]">Attached Documents Checklist ({documents.length})</p>
              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
                {documents.map((doc) => (
                  <div key={doc.id} className="p-3.5 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600 shrink-0" />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-[#0B1E36]">{doc.name}</p>
                          {doc.required && (
                            <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                              Mandatory
                            </span>
                          )}
                        </div>
                        <p className="text-[10.5px] text-slate-400 mt-0.5">
                          Category: {doc.category} | Size: {doc.fileSize}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {currentStep === 7 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-[#0B1E36] uppercase tracking-wider">Step 7 � Read-Only Proposal Review</h2>
                <p className="text-xs text-slate-400 mt-0.5">Verify all proposal sections before final submission to the PIA</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Validation Complete
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-[#0B1E36]">1. Project Information</h3>
                  <p className="text-slate-600 mt-1 font-semibold">{projectName || "Nagpur-Vijayawada Economic Corridor Phase II"}</p>
                  <p className="text-slate-400 mt-0.5">Code: {projectCode} | Type: {projectType} | Public Purpose: {publicPurpose}</p>
                </div>
                <button onClick={() => setCurrentStep(1)} className="text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer">
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-[#0B1E36]">2. Requiring Body</h3>
                  <p className="text-slate-600 mt-1 font-semibold">{orgName}</p>
                  <p className="text-slate-400 mt-0.5">Officer: {officerName} | Email: {officerEmail}</p>
                </div>
                <button onClick={() => setCurrentStep(2)} className="text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer">
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-[#0B1E36]">3. Project Details & Timeline</h3>
                  <p className="text-slate-600 mt-1 font-semibold">PIA Agency: {piaAgency}</p>
                  <p className="text-slate-400 mt-0.5">Cost: ? {estimatedCost || "1250"} Cr | Dates: {startDate} to {completionDate}</p>
                </div>
                <button onClick={() => setCurrentStep(3)} className="text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer">
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-[#0B1E36]">4. Land Requirement Schedule</h3>
                  <p className="text-slate-600 mt-1 font-semibold">Total Area: {totalLandArea} Hectares across {locations.length} Locations</p>
                  <p className="text-slate-400 mt-0.5">Approx {totalParcelsCount} Land Parcels Affected</p>
                </div>
                <button onClick={() => setCurrentStep(4)} className="text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer">
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-[#0B1E36]">5 & 6. GIS Alignment & Mandatory Documents</h3>
                  <p className="text-slate-600 mt-1 font-semibold">KML Vector Loaded: {kmlFileName} ({alignmentLength} km)</p>
                  <p className="text-slate-400 mt-0.5">{documents.length} Documents Attached & Validated</p>
                </div>
                <button onClick={() => setCurrentStep(5)} className="text-blue-600 hover:underline font-semibold flex items-center gap-1 cursor-pointer">
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs text-blue-900 flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Authorization Statement</p>
                <p className="text-blue-700 mt-0.5">
                  Submitting this proposal forwards the baseline land requirement and alignment files to the Project Implementing Agency (PIA) for technical validation.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={handleBack}
          disabled={currentStep === 1}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 text-xs font-semibold disabled:opacity-40 cursor-pointer shadow-2xs"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveDraft}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 text-xs font-semibold cursor-pointer shadow-2xs"
          >
            Save Draft
          </button>

          {currentStep < 7 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-semibold rounded-xl cursor-pointer shadow-sm transition-colors"
            >
              Continue
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setShowConfirmModal(true)}
              className="flex items-center gap-1.5 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-md transition-colors"
            >
              <Send className="w-4 h-4" />
              Submit Proposal
            </button>
          )}
        </div>
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-[#0B1E36]">Confirm Proposal Submission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to submit proposal <strong className="font-mono text-blue-700">{projectCode}</strong> for Technical Review by <strong className="text-slate-800">{piaAgency}</strong>?
            </p>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-1">
              <p>� Total Land Requirement: <strong>{totalLandArea} Hectares</strong></p>
              <p>� Affected Parcels: <strong>{totalParcelsCount} Parcels</strong></p>
              <p>� Vector Alignment: <strong>{kmlFileName}</strong></p>
            </div>
            <div className="flex items-center gap-3 justify-end pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleFinalSubmit}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl cursor-pointer shadow-sm"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

