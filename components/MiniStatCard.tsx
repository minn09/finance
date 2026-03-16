import {
  ReactNode
} from "@tabler/icons-react";
export function MiniStatCard({ icon, label, value, bg }: { icon: ReactNode, label: string, value: number, bg: string }) {
  return (
    <div className="bg-white rounded-3xl p-5 flex items-center gap-4 shadow-sm border border-slate-50">
      <div className={`p-3 rounded-2xl ${bg}`}>{icon}</div>
      <div>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{label}</p>
        <p className="text-lg font-bold">{value}</p>
      </div>
    </div>
  );
}
