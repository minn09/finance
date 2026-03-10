'use client'
import HeaderDashboard from "@/components/HeaderDashboard";
import {
  IconTrendingUp, IconStopwatch, IconDeviceLaptop, IconBuildingBank, IconCash, IconClipboardList,
  ReactNode
} from "@tabler/icons-react";

import { useBalanceStore } from '@/store/balance';
import { useSavingsStore } from "@/store/savings";
import { useTransactionStore } from "@/store/transactions";
import { capitalize, formatCurrency, formatDate } from "@/lib/formatters";

import { DialogTransaction } from "@/components/DialogTransaction";
import { useEffect, useState } from "react";

export default function Page() {
  const { total, bank, cash, pending_income } = useBalanceStore()
  const { goal, saved, progress, currentSave } = useSavingsStore()
  const transactions = useTransactionStore((store) => store.transactions);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === 'c' &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setIsDialogOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f8f5] text-slate-900 font-sans">
      <HeaderDashboard />
      <main className="p-6 lg:p-12 max-w-350 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6">

          {/* 1. TOTAL BALANCE (Grande - Arriba Izquierda) */}
          <div className="md:col-span-4 lg:col-span-9 bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100 flex flex-col justify-between min-h-87.5">
            <div>
              <h2 className="text-slate-400 font-semibold text-sm uppercase tracking-wider">Total Balance</h2>
              <h1 className="text-7xl font-bold mt-4 text-[#0f172a]">{total()}</h1>
            </div>
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-1 text-emerald-500 font-bold text-sm">
                <IconTrendingUp size={18} />
                <span>+12.5%</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <IconStopwatch size={18} />
                <span>Updated 2 mins ago</span>
              </div>
            </div>
          </div>

          {/* 2. MINI STATS (Columna Derecha) */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col gap-4 justify-around">
            <MiniStatCard icon={<IconBuildingBank className="text-blue-600" />} label="Bank" value={bank} bg="bg-blue-50" />
            <MiniStatCard icon={<IconCash className="text-orange-600" />} label="Cash" value={cash} bg="bg-orange-50" />
            <MiniStatCard icon={<IconClipboardList className="text-purple-600" />} label="Pending Income" value={pending_income} bg="bg-purple-50" />
          </div>

          {/* 3. RECENT TRANSACTIONS (Abajo Izquierda) */}
          <div className="md:col-span-4 lg:col-span-6 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl">Recent Transactions</h3>
              <button className="text-emerald-500 font-bold text-sm">View All</button>
            </div>
            <div className="space-y-6">
              {transactions.slice(0, 4).map((transaction) => (
                <TransactionItem
                  key={transaction.id}
                  icon={<IconDeviceLaptop />}
                  title={transaction.name}
                  subtitle={`${capitalize(transaction.category)} • ${formatDate(transaction.date)}`}
                  amount={formatCurrency(transaction.amount)}
                  kind={transaction.kind}
                />
              ))}
            </div>
          </div>

          {/* 4. SAVINGS GOAL (Centro Abajo) */}
          <div className="md:col-span-2 lg:col-span-3 bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-between">
            <h3 className="font-bold text-lg self-start">Savings Goal</h3>
            <div className="relative py-4">
              {/* Simulación del arco de progreso 75% */}
              <div className="size-28 rounded-full border-[6px] border-emerald-500 border-t-transparent flex items-center justify-center rotate-45">
                <span className="text-2xl font-bold -rotate-45">{progress()}</span>
              </div>
            </div>
            <div className="text-center">
              <p className="font-bold">{currentSave}</p>
              <p className="text-slate-400 text-sm">{saved} / {goal}</p>
            </div>
            <button className="w-full py-3 bg-emerald-50 text-emerald-600 font-bold rounded-xl mt-4">Add Funds</button>
          </div>

          {/* 5. RESUMEN DE GASTOS POR CATEGORÍA (Gráfico de Tarta) */}
          <div className="md:col-span-2 lg:col-span-3 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 flex flex-col">
            <h3 className="font-bold text-lg mb-4">Summary of Expenses (month)</h3>

            {/* IIFE para calcular datos del mes actual y renderizar un gráfico de tarta CSS */}
            {(() => {
              // Filtrar solo gastos del mes actual
              const now = new Date();
              const monthExpenses = transactions.filter((t) => {
                if (t.kind !== "expense") return false;
                const d = new Date(t.date);
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
              });

              // Sumar por categoría
              const totals: Record<string, number> = {};
              monthExpenses.forEach((t) => {
                const cat = capitalize(t.category || "Other");
                const amount = Math.abs(Number(t.amount) || 0);
                totals[cat] = (totals[cat] || 0) + amount;
              });

              const entries = Object.entries(totals).sort((a, b) => b[1] - a[1]);
              const total = entries.reduce((s, [, v]) => s + v, 0);

              if (!entries.length) {
                return (
                  <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-sm">
                    <p>No hay gastos en el mes actual</p>
                  </div>
                );
              }

              // Colores para segmentos
              const colors = ["#ef4444", "#f97316", "#f59e0b", "#10b981", "#06b6d4", "#3b82f6", "#8b5cf6"];

              // Crear segmentos con porcentaje redondeado
              const segments = entries.map(([label, value], i) => ({
                label,
                value,
                percent: (value / total) * 100,
                color: colors[i % colors.length],
              }));

              // Normalizar para que sumen 100 (evitar pequeños residuos por redondeo visual)
              const roundedPercentTotal = segments.reduce((s, seg) => s + Math.round(seg.percent), 0);
              const adjust = roundedPercentTotal - 100;
              if (adjust !== 0) {
                // Ajusta el mayor segmento para corregir
                const maxIdx = segments.reduce((mi, seg, idx, arr) => (seg.percent > arr[mi].percent ? idx : mi), 0);
                segments[maxIdx].percent = Math.round(segments[maxIdx].percent) - adjust;
              }
              // Generar gradiente tipo conic-gradient
              const gradientParts = segments.map((seg, i) => {
                const rounded = Math.round(seg.percent);
                const end = segments.slice(0, i + 1).reduce((s, sh) => s + Math.round(sh.percent), 0);
                const start = end - rounded;
                return `${seg.color} ${start}% ${end}%`;
              });
              const gradient = gradientParts.join(", ");

              return (
                <div className="flex-1 flex flex-col items-center">
                  <div
                    className="w-36 h-36 rounded-full shadow-inner"
                    style={{
                      background: `conic-gradient(${gradient})`,
                    }}
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
              );
            })()}
          </div>

        </div>
      </main >
      <div className="fixed bottom-8 right-8 z-50">
        <DialogTransaction open={isDialogOpen} onOpenChange={setIsDialogOpen} />
      </div>
    </div >
  );
}

// --- Componentes Auxiliares para limpieza ---

function MiniStatCard({ icon, label, value, bg }: { icon: ReactNode, label: string, value: number, bg: string }) {
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

function TransactionItem({ icon, title, subtitle, amount, kind }: { icon: ReactNode, title: string, subtitle: string, amount: string, kind: "income" | "expense" }) {
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
