export interface LandParcelLocation {
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

export interface ProjectDocument {
  id: string;
  category: string;
  name: string;
  fileName: string;
  fileSize: string;
  uploadDate: string;
  required: boolean;
  status: "Uploaded" | "Validated" | "Pending";
}

export interface ClarificationItem {
  id: string;
  date: string;
  raisedBy: string;
  authorityRole: string;
  question: string;
  status: "OPEN" | "RESOLVED";
  response?: string;
  responseDate?: string;
}

export interface WorkflowTimelineStep {
  id: string;
  stepName: string;
  authority: string;
  status: "COMPLETED" | "IN_PROGRESS" | "PENDING" | "ACTION_REQUIRED";
  completedDate?: string;
  remarks?: string;
}

export interface LRBProject {
  id: string;
  projectCode: string;
  projectName: string;
  projectType: string;
  category: string;
  publicPurpose: string;
  description: string;

  // Requiring Body
  organizationName: string;
  department: string;
  authorizedOfficer: string;
  officialEmail: string;
  contactNumber: string;

  // Details
  objective: string;
  piaAgency: string;
  estimatedCost: number; // in Cr
  startDate: string;
  completionDate: string;
  priority: "High" | "Medium" | "Low" | "Urgent";
  additionalDetails?: string;

  // Land Requirement
  totalLandArea: number; // in Hectares
  totalParcels: number;
  locations: LandParcelLocation[];

  // Spatial / GIS
  coordinatesCount?: number;
  alignmentLengthKm?: number;
  hasGisData: boolean;

  // Status & Stage
  status: "Draft" | "Under PIA Review" | "Clarification Required" | "In Routing" | "Registered" | "Returned";
  currentStage: string;
  lastUpdated: string;
  submittedOn?: string;

  // Documents & Workflows
  documents: ProjectDocument[];
  clarifications: ClarificationItem[];
  workflow: WorkflowTimelineStep[];
  activities: { id: string; date: string; user: string; action: string }[];
}

export const initialProjects: LRBProject[] = [
  {
    id: "PRJ-2026-NH44-EXP",
    projectCode: "PRJ-2026-NH44-EXP",
    projectName: "NH-44 Hyderabad-Nagpur Highway Widening Phase IV",
    projectType: "National Highway",
    category: "Central Sector Project",
    publicPurpose: "Transport Infrastructure",
    description: "4-lane to 6-lane expansion of NH-44 corridor connecting Medak and Kamareddy districts for heavy commercial transit.",
    organizationName: "National Highways Authority of India (NHAI)",
    department: "Land Acquisition Wing - RO Hyderabad",
    authorizedOfficer: "Sahil Sharma (Deputy Manager - LA)",
    officialEmail: "lrb@sankalp.com",
    contactNumber: "+91 98765 43210",
    objective: "De-congest freight bottleneck between Medak bypass and Kamareddy industrial area.",
    piaAgency: "NHAI Regional Office Telangana",
    estimatedCost: 1250,
    startDate: "2026-11-01",
    completionDate: "2028-12-31",
    priority: "High",
    additionalDetails: "Includes 2 major river bridges and 4 flyovers requiring additional ROW buffer.",
    totalLandArea: 145.8,
    totalParcels: 230,
    locations: [
      { id: "loc-1", state: "Telangana", district: "Medak", tehsil: "Toopran", village: "Malkapur", landType: "Private Agricultural", area: 85.2, unit: "Hectares", parcelCount: 140, purpose: "Right of Way 60m" },
      { id: "loc-2", state: "Telangana", district: "Kamareddy", tehsil: "Bhiknoor", village: "Rameshwarpally", landType: "Government / Forest", area: 60.6, unit: "Hectares", parcelCount: 90, purpose: "Toll Plaza & Service Road" },
    ],
    coordinatesCount: 184,
    alignmentLengthKm: 42.5,
    hasGisData: true,
    status: "Under PIA Review",
    currentStage: "Technical Validation by PIA",
    lastUpdated: "2026-09-24",
    submittedOn: "2026-09-20",
    documents: [
      { id: "doc-1", category: "Project Proposal", name: "Detailed Project Feasibility Report.pdf", fileName: "DPR_NH44_Ph4.pdf", fileSize: "14.2 MB", uploadDate: "2026-09-18", required: true, status: "Validated" },
      { id: "doc-2", category: "Administrative Approval", name: "MoRTH Admin Approval Sanction.pdf", fileName: "MoRTH_Sanction_2026.pdf", fileSize: "4.8 MB", uploadDate: "2026-09-19", required: true, status: "Validated" },
      { id: "doc-3", category: "Alignment Document", name: "Proposed 60m ROW Alignment KML.kml", fileName: "NH44_Alignment_v2.kml", fileSize: "2.1 MB", uploadDate: "2026-09-20", required: true, status: "Uploaded" },
    ],
    clarifications: [
      { id: "clr-1", date: "2026-09-22", raisedBy: "PIA Technical Desk", authorityRole: "Project Implementing Agency", question: "Please clarify whether 60.6 Ha in Bhiknoor involves Reserved Forest land or Govt Poramboke.", status: "RESOLVED", response: "It is un-reserved Revenue Poramboke land as confirmed by Tahsildar Bhiknoor.", responseDate: "2026-09-23" }
    ],
    workflow: [
      { id: "wf-1", stepName: "Proposal Drafted", authority: "Land Requiring Body", status: "COMPLETED", completedDate: "2026-09-18", remarks: "Draft compiled with preliminary alignment" },
      { id: "wf-2", stepName: "Proposal Submitted to PIA", authority: "Land Requiring Body", status: "COMPLETED", completedDate: "2026-09-20", remarks: "Submitted for technical validation" },
      { id: "wf-3", stepName: "Technical Review & GIS Check", authority: "Project Implementing Agency", status: "IN_PROGRESS", remarks: "GIS parcel boundary overlay under verification" },
      { id: "wf-4", stepName: "Statutory Routing Engine", authority: "SANKALP Automated Engine", status: "PENDING" },
      { id: "wf-5", stepName: "Competent Authority Registration", authority: "CALA / Collectorate", status: "PENDING" },
    ],
    activities: [
      { id: "act-1", date: "2026-09-20 14:30", user: "Sahil Sharma (LRB)", action: "Submitted proposal to PIA for technical review" },
      { id: "act-2", date: "2026-09-23 11:15", user: "Sahil Sharma (LRB)", action: "Responded to clarification regarding forest classification" },
    ]
  },
  {
    id: "PRJ-2026-RLY-HYD",
    projectCode: "PRJ-2026-RLY-HYD",
    projectName: "Hyderabad Regional Ring Rail Corridor Line 2",
    projectType: "Railway Corridor",
    category: "Central Sector Project",
    publicPurpose: "Transport Infrastructure",
    description: "New semi-high speed rail link connecting Sangareddy to Ranga Reddy district for industrial freight and commuter transit.",
    organizationName: "South Central Railway (Ministry of Railways)",
    department: "Construction Organization - Secunderabad",
    authorizedOfficer: "Sahil Sharma (Deputy Manager - LA)",
    officialEmail: "lrb@sankalp.com",
    contactNumber: "+91 98765 43210",
    objective: "Provide direct rail connectivity to NIMZ Zaheerabad and Outer Ring Road nodes.",
    piaAgency: "RVNL / SCR Construction Wing",
    estimatedCost: 3400,
    startDate: "2027-01-15",
    completionDate: "2029-06-30",
    priority: "Urgent",
    totalLandArea: 280.5,
    totalParcels: 410,
    locations: [
      { id: "loc-3", state: "Telangana", district: "Sangareddy", tehsil: "Patancheru", village: "Isnapur", landType: "Private Agricultural", area: 180.0, unit: "Hectares", parcelCount: 260, purpose: "Main Rail Corridor 45m" },
      { id: "loc-4", state: "Telangana", district: "Ranga Reddy", tehsil: "Shankarpally", village: "Mokila", landType: "Abadi / Commercial", area: 100.5, unit: "Hectares", parcelCount: 150, purpose: "Freight Yard & Station Complex" },
    ],
    coordinatesCount: 310,
    alignmentLengthKm: 68.0,
    hasGisData: true,
    status: "Registered",
    currentStage: "Section 11 Preliminary Notification Prepared",
    lastUpdated: "2026-09-25",
    submittedOn: "2026-08-15",
    documents: [
      { id: "doc-4", category: "Project Proposal", name: "Railway DPR & Feasibility.pdf", fileName: "SCR_DPR_2026.pdf", fileSize: "22.5 MB", uploadDate: "2026-08-10", required: true, status: "Validated" },
      { id: "doc-5", category: "Land Requirement Statement", name: "Schedule of Parcels Sangareddy.pdf", fileName: "Parcels_Schedule_SCR.pdf", fileSize: "8.1 MB", uploadDate: "2026-08-12", required: true, status: "Validated" },
    ],
    clarifications: [],
    workflow: [
      { id: "wf-6", stepName: "Proposal Drafted", authority: "Land Requiring Body", status: "COMPLETED", completedDate: "2026-08-10" },
      { id: "wf-7", stepName: "PIA Technical Approval", authority: "Project Implementing Agency", status: "COMPLETED", completedDate: "2026-08-25" },
      { id: "wf-8", stepName: "Statutory Routing Engine", authority: "SANKALP Engine", status: "COMPLETED", completedDate: "2026-08-28", remarks: "Routed to CALA Railway Land Acquisition" },
      { id: "wf-9", stepName: "Project Registered", authority: "Competent Authority", status: "COMPLETED", completedDate: "2026-09-01" },
    ],
    activities: [
      { id: "act-3", date: "2026-09-01 10:00", user: "CALA Railway Office", action: "Project registered and assigned Registration ID RLY-HYD-2026-09" }
    ]
  },
  {
    id: "PRJ-2026-IND-PRK",
    projectCode: "PRJ-2026-IND-PRK",
    projectName: "Zaheerabad NIMZ Industrial Smart City Phase I",
    projectType: "Industrial Corridor",
    category: "State Mega Infrastructure",
    publicPurpose: "Industrial Corridor",
    description: "Acquisition of 520 Hectares for National Investment & Manufacturing Zone smart city node in Zaheerabad.",
    organizationName: "Telangana State Industrial Infrastructure Corp (TSIIC)",
    department: "Special Projects Cell",
    authorizedOfficer: "Sahil Sharma (Deputy Manager - LA)",
    officialEmail: "lrb@sankalp.com",
    contactNumber: "+91 98765 43210",
    objective: "Establish automobile and defence manufacturing clusters.",
    piaAgency: "TSIIC Head Office",
    estimatedCost: 1850,
    startDate: "2026-12-01",
    completionDate: "2028-08-31",
    priority: "High",
    totalLandArea: 520.0,
    totalParcels: 850,
    locations: [
      { id: "loc-5", state: "Telangana", district: "Sangareddy", tehsil: "Zaheerabad", village: "Didgi", landType: "Private Agricultural", area: 320.0, unit: "Hectares", parcelCount: 510, purpose: "Industrial Zone A" },
      { id: "loc-6", state: "Telangana", district: "Sangareddy", tehsil: "Zaheerabad", village: "Kohir", landType: "Government / Waste", area: 200.0, unit: "Hectares", parcelCount: 340, purpose: "Logistics Hub & Substation" },
    ],
    hasGisData: false,
    status: "Draft",
    currentStage: "Draft Proposal Preparation",
    lastUpdated: "2026-09-26",
    documents: [
      { id: "doc-6", category: "Project Proposal", name: "NIMZ Master Plan & Layout.pdf", fileName: "NIMZ_MasterPlan.pdf", fileSize: "18.0 MB", uploadDate: "2026-09-25", required: true, status: "Uploaded" }
    ],
    clarifications: [],
    workflow: [
      { id: "wf-10", stepName: "Proposal Drafted", authority: "Land Requiring Body", status: "IN_PROGRESS", remarks: "Pending final GIS parcel polygon upload" }
    ],
    activities: [
      { id: "act-4", date: "2026-09-26 09:15", user: "Sahil Sharma (LRB)", action: "Created project draft PRJ-2026-IND-PRK" }
    ]
  },
  {
    id: "PRJ-2026-SOL-MGA",
    projectCode: "PRJ-2026-SOL-MGA",
    projectName: "Nalgonda Mega Solar Renewable Energy Park",
    projectType: "Solar Power Park",
    category: "Public-Private Partnership (PPP)",
    publicPurpose: "Renewable Energy",
    description: "500 MW solar photo-voltaic power park acquisition in Nalgonda district under Green Energy Corridor.",
    organizationName: "Solar Energy Corporation of India (SECI)",
    department: "Land & Project Approval Division",
    authorizedOfficer: "Sahil Sharma (Deputy Manager - LA)",
    officialEmail: "lrb@sankalp.com",
    contactNumber: "+91 98765 43210",
    objective: "Generate 500MW clean solar power to feed Telangana State Grid.",
    piaAgency: "TSREDCO / SECI Joint Cell",
    estimatedCost: 620,
    startDate: "2026-10-15",
    completionDate: "2027-09-30",
    priority: "Medium",
    totalLandArea: 95.0,
    totalParcels: 120,
    locations: [
      { id: "loc-7", state: "Telangana", district: "Nalgonda", tehsil: "Miryalaguda", village: "Topugutta", landType: "Government / Waste", area: 95.0, unit: "Hectares", parcelCount: 120, purpose: "Solar PV Panel Arrays" }
    ],
    coordinatesCount: 96,
    hasGisData: true,
    status: "Clarification Required",
    currentStage: "Pending LRB Clarification on Forest Parcel",
    lastUpdated: "2026-09-23",
    submittedOn: "2026-09-12",
    documents: [
      { id: "doc-7", category: "Project Proposal", name: "SECI Solar DPR.pdf", fileName: "SECI_Solar_DPR.pdf", fileSize: "9.4 MB", uploadDate: "2026-09-10", required: true, status: "Validated" }
    ],
    clarifications: [
      { id: "clr-2", date: "2026-09-22", raisedBy: "PIA Technical Cell", authorityRole: "Project Implementing Agency", question: "Northern 15 Hectares appears adjacent to Forest Reserve buffer. Provide NOC from DFO Nalgonda.", status: "OPEN" }
    ],
    workflow: [
      { id: "wf-11", stepName: "Proposal Drafted", authority: "Land Requiring Body", status: "COMPLETED", completedDate: "2026-09-10" },
      { id: "wf-12", stepName: "Submitted to PIA", authority: "Land Requiring Body", status: "COMPLETED", completedDate: "2026-09-12" },
      { id: "wf-13", stepName: "PIA Technical Review", authority: "Project Implementing Agency", status: "ACTION_REQUIRED", remarks: "Clarification requested regarding DFO Forest NOC" }
    ],
    activities: [
      { id: "act-5", date: "2026-09-22 16:40", user: "PIA Technical Cell", action: "Raised clarification request regarding Forest NOC" }
    ]
  },
  {
    id: "PRJ-2026-MET-P3",
    projectCode: "PRJ-2026-MET-P3",
    projectName: "Hyderabad Airport Express Metro Line Extension",
    projectType: "Urban Metro Rail",
    category: "State Mega Infrastructure",
    publicPurpose: "Transport Infrastructure",
    description: "31km elevated & underground metro rail line from Mindspace Gachibowli to RGIA Shamshabad Airport.",
    organizationName: "Hyderabad Metro Rail Limited (HMRL)",
    department: "Land Acquisition & Rehabilitation Cell",
    authorizedOfficer: "Sahil Sharma (Deputy Manager - LA)",
    officialEmail: "lrb@sankalp.com",
    contactNumber: "+91 98765 43210",
    objective: "Provide fast 20-minute airport connectivity.",
    piaAgency: "HMRL Project Cell",
    estimatedCost: 2800,
    startDate: "2026-11-15",
    completionDate: "2028-10-31",
    priority: "Urgent",
    totalLandArea: 32.4,
    totalParcels: 65,
    locations: [
      { id: "loc-8", state: "Telangana", district: "Ranga Reddy", tehsil: "Rajendranagar", village: "Shamshabad", landType: "Commercial / Govt", area: 32.4, unit: "Hectares", parcelCount: 65, purpose: "Metro Station Piers & Viaduct" }
    ],
    coordinatesCount: 140,
    alignmentLengthKm: 31.0,
    hasGisData: true,
    status: "In Routing",
    currentStage: "Routing Engine Authority Determination",
    lastUpdated: "2026-09-25",
    submittedOn: "2026-09-15",
    documents: [
      { id: "doc-8", category: "Project Proposal", name: "HMRL Phase 3 Metro DPR.pdf", fileName: "HMRL_Phase3_DPR.pdf", fileSize: "31.2 MB", uploadDate: "2026-09-14", required: true, status: "Validated" }
    ],
    clarifications: [],
    workflow: [
      { id: "wf-14", stepName: "Proposal Drafted", authority: "Land Requiring Body", status: "COMPLETED", completedDate: "2026-09-14" },
      { id: "wf-15", stepName: "Submitted to PIA", authority: "Land Requiring Body", status: "COMPLETED", completedDate: "2026-09-15" },
      { id: "wf-16", stepName: "PIA Technical Validation", authority: "Project Implementing Agency", status: "COMPLETED", completedDate: "2026-09-24" },
      { id: "wf-17", stepName: "Routing Engine Determination", authority: "SANKALP Routing Engine", status: "IN_PROGRESS", remarks: "Determining LAO jurisdiction for Shamshabad" }
    ],
    activities: [
      { id: "act-6", date: "2026-09-24 17:00", user: "PIA Technical Cell", action: "Validated proposal technical specs and forwarded to Routing Engine" }
    ]
  }
];