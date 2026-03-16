'use client'
import HeaderDashboard from "@/components/HeaderDashboard";
import {
  IconTrendingUp, IconStopwatch, IconDeviceLaptop, IconBuildingBank, IconCash, IconClipboardList
} from "@tabler/icons-react";

import { useBalanceStore } from '@/store/balance';
import { useSavingsStore } from "@/store/savings";
import { useTransactionStore } from "@/store/transactions";
import { capitalize, formatCurrency, formatDate } from "@/lib/formatters";

import { DialogTransaction } from "@/components/DialogTransaction";
import DialogBalance from "@/components/DialogBalance";
import { ActionButtonGroup } from "@/components/ActionButtonGroup";
import { MonthlyExpensesChart } from "@/components/MonthlyExpensesChart";
import { TransactionItem } from "@/components/TransactionItem";
import { MiniStatCard } from "@/components/MiniStatCard";

export default function Page() {
  const { total, bank, cash, pendingIncome } = useBalanceStore()
  const { goal, saved, progress, currentSave } = useSavingsStore()
  const transactions = useTransactionStore((store) => store.transactions);

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
            <MiniStatCard icon={<IconClipboardList className="text-purple-600" />} label="Pending Income" value={pendingIncome} bg="bg-purple-50" />
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
            <MonthlyExpensesChart transactions={transactions} />
          </div>

        </div>
      </main >

      <div className="fixed bottom-8 right-8 z-50">
        <ActionButtonGroup />
        <DialogTransaction />
        <DialogBalance />
      </div>
    </div >
  );
}
