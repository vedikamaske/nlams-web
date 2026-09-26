const fs = require(" fs\);
const path = require(\path\);

const dir = path.join(process.cwd(), \components\, \dashboard\, \pia\);
const appDir = path.join(process.cwd(), \app\, \dashboard\, \pia\);

fs.mkdirSync(dir, { recursive: true });
fs.mkdirSync(appDir, { recursive: true });

function write(p, c) {
 fs.writeFileSync(p, c, \utf8\);
 console.log(\Wrote\, p);
}

const kpi = \use client\;

import React from \react\;
import { Folder, Clock, CheckCircle2, FileText, TrendingUp } from \lucide-react\;

interface KpiItem {
 id: string;
 title: string;
 value: string | number;
 change: string;
 period: string;
 icon: React.ElementType;
 iconBg: string;
 iconColor: string;
 badgeColor: string;
}

const kpiData: KpiItem[] = [
 {
 id: \assigned\,
 title: \Assigned Projects\,
 value: \18\,
 change: \+20%\,
 period: \from last month\,
 icon: Folder,
 iconBg: \bg-blue-50 dark:bg-blue-950/40\,
 iconColor: \text-blue-600 dark:text-blue-400\,
 badgeColor: \text-emerald-600 dark:text-emerald-400\,
 },
 {
 id: \pending_review\,
 title: \Pending Technical Review\,
 value: \6\,
 change: \+50%\,
 period: \from last month\,
 icon: Clock,
 iconBg: \bg-amber-50 dark:bg-amber-950/40\,
 iconColor: \text-amber-500 dark:text-amber-400\,
 badgeColor: \text-red-600 dark:text-red-400\,
 },
 {
 id: \ready_routing\,
 title: \Ready for Routing\,
 value: \4\,
 change: \+33%\,
 period: \from last month\,
 icon: CheckCircle2,
 iconBg: \bg-blue-50 dark:bg-blue-950/40\,
 iconColor: \text-blue-500 dark:text-blue-400\,
 badgeColor: \text-emerald-600 dark:text-emerald-400\,
 },
 {
 id: \clarifications\,
 title: \Clarifications to LRB\,
 value: \3\,
 change: \+50%\,
 period: \from last month\,
 icon: FileText,
 iconBg: \bg-red-50 dark:bg-red-950/40\,
 iconColor: \text-red-500 dark:text-red-400\,
 badgeColor: \text-red-600 dark:text-red-400\,
 },
];

export function PIAKpiCards() {
 return (
 <div className=\grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4\>
 {kpiData.map((kpi) => {
 const Icon = kpi.icon;
 return (
 <div
 key={kpi.id}
 className=\bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-between\
 >
 <div className={\w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800 \\}>
 <Icon className={\w-6 h-6 \\} />
 </div>

 <div className=\text-right\>
 <p className=\text-xs font-medium text-slate-500 dark:text-slate-400\>{kpi.title}</p>
 <p className=\text-3xl font-extrabold text-slate-900 dark:text-white my-0.5\>{kpi.value}</p>
 <div className=\flex items-center justify-end gap-1 text-[11px]\>
 <span className={\inline-flex items-center gap-0.5 font-bold \\}>
 <TrendingUp className=\w-3 h-3 stroke-[2.5]\ />
 {kpi.change}
 </span>
 <span className=\text-slate-400 dark:text-slate-500\>{kpi.period}</span>
 </div>
 </div>
 </div>
 );
 })}
 </div>
 );
}
;

write(path.join(dir, \PIAKpiCards.tsx\), kpi);

