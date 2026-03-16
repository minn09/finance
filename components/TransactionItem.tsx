import {
  ReactNode
} from "@tabler/icons-react";
export function TransactionItem({ icon, title, subtitle, amount, kind }: { icon: ReactNode, title: string, subtitle: string, amount: string, kind: "income" | "expense" }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="size-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-500">{icon}</div>
        <div>
          <p className="font-bold text-sm">{title}</p>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>
      <p className={`font-bold text-sm ${kind === "income" ? 'text-emerald-500' : 'text-slate-900'}`}>{kind === "income" ? "+" : "-"}{amount}</p>
    </div>
  );
}
