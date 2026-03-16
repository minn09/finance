import { Transaction } from "@/types/transactions"
import { formatCurrency } from "@/lib/formatters"
import { useMonthlyExpensesChart } from "@/hooks/useMonthlyExpensesChart"

type Props = {
  transactions: Transaction[]
}

export function MonthlyExpensesChart({ transactions }: Props) {
  const chart = useMonthlyExpensesChart(transactions)

  if (!chart.hasData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-sm">
        <p>No hay gastos en el mes actual</p>
      </div>
    )
  }

  const { segments, total, gradient } = chart

  return (
    <div className="flex-1 flex flex-col items-center">
      <div
        className="w-36 h-36 rounded-full shadow-inner"
        style={{ background: `conic-gradient(${gradient})` }}
        aria-hidden
      />
      <div className="mt-4 w-full space-y-2">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full" style={{ background: seg.color }} />
              <span className="truncate">{seg.label}</span>
            </div>
            <span className="font-bold">{Math.round(seg.percent)}%</span>
          </div>
        ))}
        <div className="pt-3 border-t border-slate-100 mt-3 text-xs text-slate-400">
          Total: {formatCurrency(total)}
        </div>
      </div>
    </div>
  )
}
