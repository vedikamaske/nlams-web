const fs = require(" fs\);
const path = require(\path\);

const target = path.join(process.cwd(), \components\, \dashboard\, \pia\, \PIARecentProjectsTable.tsx\);

const code = \use client\;

import React from \react\;
import Link from \next/link\;
import { ArrowRight, MoreVertical } from \lucide-react\;

interface ProjectRow {
 name: string;
 type: string;
 location: string;
 landRequired: string;
 stage: string;
 badgeStyle: string;
}

const projects: ProjectRow[] = [
 {
 name: \Mumbai-Nagpur Expressway\,
 type: \Highway\,
 location: \Maharashtra\,
 landRequired: \320 ha\,
 stage: \Under Review\,
 badgeStyle: \bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800\,
 },
 {
 name: \Hyderabad Metro Phase-2\,
 type: \Urban Infra\,
 location: \Telangana\,
 landRequired: \150 ha\,
 stage: \Pending Review\,
 badgeStyle: \bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800\,
 },
 {
 name: \Nagpur Industrial Corridor\,
 type: \Industrial\,
 location: \Maharashtra\,
 landRequired: \280 ha\,
 stage: \Clarification\,
 badgeStyle: \bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800\,
 },
 {
 name: \Vijayawada Bypass Road\,
 type: \Highway\,
 location: \Andhra Pradesh\,
 landRequired: \420 ha\,
 stage: \Technical Review\,
 badgeStyle: \bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800\,
 },
 {
 name: \Pune Ring Road\,
 type: \Highway\,
 location: \Maharashtra\,
 landRequired: \220 ha\,
 stage: \Ready for Routing\,
 badgeStyle: \bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800\,
 },
];

export function PIARecentProjectsTable() {
 return (
 <div className=\bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between h-full\>
 <div>
 <div className=\flex items-center justify-between mb-1\>
 <h3 className=\text-base font-bold text-slate-900 dark:text-white\>Recent Assigned Projects</h3>
 <Link
 href=\/dashboard/pia/projects/assigned\
 className=\text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center gap-1 transition-colors\
 >
 View All <ArrowRight className=\w-3.5 h-3.5\ />
 </Link>
 </div>
 <p className=\text-xs text-slate-500 dark:text-slate-400 mb-4\>
 Latest projects assigned to your agency
 </p>

 <div className=\overflow-x-auto\>
 <table className=\w-full text-left border-collapse\>
 <thead>
 <tr className=\border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider\>
 <th className=\pb-2.5 pt-1 pr-3\>Project Name</th>
 <th className=\pb-2.5 pt-1 px-3\>Type</th>
 <th className=\pb-2.5 pt-1 px-3\>Location</th>
 <th className=\pb-2.5 pt-1 px-3\>Land Required</th>
 <th className=\pb-2.5 pt-1 px-3\>Stage</th>
 <th className=\pb-2.5 pt-1 pl-3 text-right\>Action</th>
 </tr>
 </thead>
 <tbody className=\divide-y divide-slate-100 dark:divide-slate-800/60 text-xs\>
 {projects.map((proj) => (
 <tr key={proj.name} className=\hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors\>
 <td className=\py-3 pr-3 font-semibold text-slate-900 dark:text-white\>
 {proj.name}
 </td>
 <td className=\py-3 px-3 text-slate-600 dark:text-slate-400\>{proj.type}</td>
 <td className=\py-3 px-3 text-slate-600 dark:text-slate-400\>{proj.location}</td>
 <td className=\py-3 px-3 font-medium text-slate-800 dark:text-slate-200\>{proj.landRequired}</td>
 <td className=\py-3 px-3\>
 <span className={\inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border \\}>
 {proj.stage}
 </span>
 </td>
 <td className=\py-3 pl-3 text-right\>
 <button className=\p-1 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors\>
 <MoreVertical className=\w-4 h-4\ />
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 );
}
;

fs.writeFileSync(target, code, \utf8\);
console.log(\PIARecentProjectsTable written cleanly\);

