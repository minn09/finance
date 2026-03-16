import { useMemo } from "react";
import { Transaction } from "@/types/transactions";
import { capitalize } from "@/lib/formatters";

const COLORS = [
  "#ef4444",
  "#f97316",
  "#f59e0b",
  "#10b981",
  "#06b6d4",
  "#3b82f6",
  "#8b5cf6",
];

export type ChartSegment = {
  label: string;
  value: number;
  percent: number;
  color: string;
};

type UseMonthlyExpensesChartResult =
  | { hasData: false }
  | {
      hasData: true;
      segments: ChartSegment[];
      total: number;
      gradient: string;
    };

export function useMonthlyExpensesChart(
  transactions: Transaction[],
): UseMonthlyExpensesChartResult {
  return useMemo(() => {
    const now = new Date();

    const monthExpenses = transactions.filter((t) => {
      if (t.kind !== "expense") return false;
      const d = new Date(t.date);
      return (
        d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      );
    });

    const totals: Record<string, number> = {};
    monthExpenses.forEach((t) => {
      const cat = capitalize(t.category || "Other");
      totals[cat] = (totals[cat] || 0) + Math.abs(Number(t.amount) || 0);
    });

    const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    if (!entries.length) return { hasData: false };

    const total = entries.reduce((s, [, v]) => s + v, 0);

    const segments: ChartSegment[] = entries.map(([label, value], i) => ({
      label,
      value,
      percent: (value / total) * 100,
      color: COLORS[i % COLORS.length],
    }));

    // Corregir residuos de redondeo para que sumen exactamente 100
    const roundedTotal = segments.reduce(
      (s, seg) => s + Math.round(seg.percent),
      0,
    );
    const diff = roundedTotal - 100;
    if (diff !== 0) {
      const maxIdx = segments.reduce(
        (mi, seg, idx, arr) => (seg.percent > arr[mi].percent ? idx : mi),
        0,
      );
      segments[maxIdx].percent = Math.round(segments[maxIdx].percent) - diff;
    }

    const gradient = segments
      .map((seg, i) => {
        const end = segments
          .slice(0, i + 1)
          .reduce((s, sh) => s + Math.round(sh.percent), 0);
        const start = end - Math.round(seg.percent);
        return `${seg.color} ${start}% ${end}%`;
      })
      .join(", ");

    return { hasData: true, segments, total, gradient };
  }, [transactions]);
}
