import HeaderDashboard from "@/components/HeaderDashboard";
import {
  IconCash,
  IconCoin,
  IconArrowLeft,
  IconPlus,
  IconMinus
} from "@tabler/icons-react";
import Link from "next/link";
// Tipos para el desglose
interface CashDenomination {
  label: string;
  value: number;
  quantity: number;
  type: 'bill' | 'coin';
}

export default function CashPage() {
  const denominations: CashDenomination[] = [
    { label: "Billetes de S/ 200", value: 200, quantity: 2, type: 'bill' },
    { label: "Billetes de S/ 100", value: 100, quantity: 5, type: 'bill' },
    { label: "Monedas de S/ 5", value: 5, quantity: 5, type: 'coin' },
    { label: "Monedas de S/ 2", value: 2, quantity: 10, type: 'coin' },
  ];

  const totalCash = denominations.reduce((acc, curr) => acc + (curr.value * curr.quantity), 0);

  return (
    <div className="min-h-screen bg-[#f5f8f5] text-slate-900">
      <HeaderDashboard />

      <main className="p-6 lg:p-12 max-w-4xl mx-auto">
        {/* Botón Volver */}
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors mb-8 group">
          <IconArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold text-sm uppercase tracking-widest">Dashboard</span>
        </Link>

        <div className="grid grid-cols-1 gap-8">

          {/* Card de Resumen Total */}
          <div className="neu-card bg-white rounded-[2rem] p-10 flex flex-col md:flex-row justify-between items-center border border-white/50 shadow-sm">
            <div>
              <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] mb-2">Efectivo Total</p>
              <h1 className="text-6xl font-black text-slate-900 tracking-tighter">S/ {totalCash.toLocaleString('es-PE', { minimumFractionDigits: 2 })}</h1>
            </div>
            <div className="mt-6 md:mt-0 p-5 bg-orange-50 rounded-3xl text-orange-600">
              <IconCash size={48} stroke={1.5} />
            </div>
          </div>

          {/* Listado de Denominaciones (Bento Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {denominations.map((item, index) => (
              <div key={index} className="bg-white rounded-[1.5rem] p-6 flex items-center justify-between border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className={`size-12 rounded-2xl flex items-center justify-center ${item.type === 'bill' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                    {item.type === 'bill' ? <IconCash size={24} /> : <IconCoin size={24} />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{item.label}</p>
                    <p className="text-xs text-slate-400">Subtotal: S/ {item.value * item.quantity}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-xl">
                  <button className="size-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:text-red-500 transition-colors">
                    <IconMinus size={16} />
                  </button>
                  <span className="font-bold min-w-5 text-center">{item.quantity}</span>
                  <button className="size-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:text-emerald-500 transition-colors">
                    <IconPlus size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Acción Rápida */}
          <button className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-bold text-lg hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-3">
            <IconPlus />
            Registrar nuevo ingreso de efectivo
          </button>

        </div>
      </main>
    </div>
  );
}
