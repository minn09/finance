import HeaderDashboard from "@/components/HeaderDashboard";
import {
  IconSearch, IconPlus, IconChevronLeft, IconChevronRight,
  IconArrowUpRight, IconArrowDownLeft, IconFilter, IconCalendar
} from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";

// 1. Tipos para los datos
interface Transaction {
  id: string;
  type: 'income' | 'expense';
  category: string;
  description: string;
  entity: string;
  date: string;
  amount: string;
}

export default function TransactionsPage() {
  // Datos de ejemplo basados en tu imagen
  const transactions: Transaction[] = [
    { id: '1', type: 'income', category: 'Salary', description: 'Monthly Payroll Transfer', entity: 'TechCorp Systems Inc.', date: 'Oct 24, 2023', amount: '+$5,200.00' },
    { id: '2', type: 'expense', category: 'Dining', description: 'The Golden Plate', entity: 'Restaurant & Bar', date: 'Oct 23, 2023', amount: '-$84.50' },
    { id: '3', type: 'expense', category: 'Utilities', description: 'City Power & Water', entity: 'Monthly Bill', date: 'Oct 22, 2023', amount: '-$145.00' },
    { id: '4', type: 'income', category: 'Investment', description: 'Global Tech ETF', entity: 'Dividend Payout', date: 'Oct 21, 2023', amount: '+$12.40' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <HeaderDashboard />

      <main className="p-6 lg:p-12 max-w-[1400px] mx-auto">
        {/* HEADER DE SECCIÓN */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#1e293b]">Transactions</h1>
            <p className="text-slate-500 text-sm mt-1">Review your history and manage monthly spending.</p>
          </div>
          <button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-100">
            <IconPlus size={20} />
            New Transaction
          </button>
        </div>

        {/* BARRA DE FILTROS */}
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6 flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[300px] relative">
            <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search description..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
            />
          </div>
          <FilterButton icon={<IconFilter size={18} />} label="All Types" />
          <FilterButton icon={<IconCalendar size={18} />} label="This Month" />
          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 font-semibold text-sm hover:bg-slate-50 rounded-xl transition-colors">
            <IconFilter size={18} />
            More Filters
          </button>
        </div>

        {/* TABLA DE TRANSACCIONES */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50 text-[11px] uppercase tracking-widest text-slate-400 font-bold">
                <th className="px-8 py-5">Type</th>
                <th className="px-6 py-5">Category</th>
                <th className="px-6 py-5">Description</th>
                <th className="px-6 py-5">Date</th>
                <th className="px-8 py-5 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className={`size-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {tx.type === 'income' ? <IconArrowUpRight size={20} /> : <IconArrowDownLeft size={20} />}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-tight">
                      {tx.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-sm text-slate-800">{tx.description}</p>
                    <p className="text-xs text-slate-400">{tx.entity}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">{tx.date}</td>
                  <td className={`px-8 py-4 text-right font-bold text-sm ${tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {tx.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINACIÓN */}
          <div className="px-8 py-4 bg-slate-50/50 flex justify-between items-center text-xs font-medium text-slate-500">
            <p>Showing 1 to 6 of 42 transactions</p>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all"><IconChevronLeft size={16} /></button>
              <button className="size-8 flex items-center justify-center bg-indigo-600 text-white rounded-lg shadow-md shadow-indigo-100">1</button>
              <button className="size-8 flex items-center justify-center hover:bg-white rounded-lg transition-all">2</button>
              <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-slate-200 transition-all"><IconChevronRight size={16} /></button>
            </div>
          </div>
        </div>

        {/* CARDS DE RESUMEN INFERIOR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SummaryCard title="Total Income" amount="$8,450.00" change="+ 12%" isUp />
          <SummaryCard title="Total Expenses" amount="$3,120.50" change="- 4%" isUp={false} />
          <div className="bg-[#6366f1] p-6 rounded-[2rem] text-white flex justify-between items-center shadow-xl shadow-indigo-100">
            <div>
              <p className="text-xs font-bold uppercase opacity-80 tracking-widest">Net Savings</p>
              <h3 className="text-3xl font-black mt-1">$5,329.50</h3>
              <p className="text-[10px] mt-1 opacity-70 italic">85% of monthly goal reached</p>
            </div>
            <div className="size-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <IconPlus size={24} className="rotate-45" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Componentes internos útiles
function FilterButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 hover:bg-white transition-all">
      {label}
      {icon}
    </button>
  );
}

function SummaryCard({ title, amount, change, isUp }: any) {
  return (
    <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex justify-between items-center">
      <div>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
        <h3 className="text-3xl font-black text-slate-800 mt-1">{amount}</h3>
        <p className={`text-[10px] font-bold mt-1 ${isUp ? 'text-emerald-500' : 'text-rose-500'}`}>
          {isUp ? '↑' : '↓'} {change} from last month
        </p>
      </div>
      <div className={`size-10 rounded-full flex items-center justify-center ${isUp ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
        {isUp ? <IconArrowUpRight size={20} /> : <IconArrowDownLeft size={20} />}
      </div>
    </div>
  );
}
