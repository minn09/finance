import { IconPlus, IconChevronRight, IconBuildingBank, IconCreditCard, IconCash } from "@tabler/icons-react";

interface AccountProps {
  name: string;
  type: string;
  balance: string;
  icon: React.ReactNode;
  status?: "active" | "primary";
}

export default function AccountsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">My Accounts</h1>
            <p className="text-slate-500">Manage your bank accounts, credit cards, and cash assets.</p>
          </div>
          <button className="bg-[#6366f1] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-100 transition-hover hover:bg-[#4f46e5]">
            <IconPlus size={20} /> Add New Account
          </button>
        </div>

        {/* Resumen Superior */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <SummaryMiniCard label="Total Balance" value="$45,280.42" sub="+2.4% this month" subColor="text-emerald-500" />
          <SummaryMiniCard label="Credit Limit" value="$12,000.00" sub="35% utilized" subColor="text-slate-400" />
          <SummaryMiniCard label="Active Accounts" value="6" sub="Bank, Credit, and Cash" subColor="text-slate-400" />
        </div>

        {/* Rejilla de Cuentas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AccountCard name="Bank of America" type="Checking Account" balance="$12,450.00" status="active" icon={<IconBuildingBank className="text-blue-600" />} />
          <AccountCard name="Chase Sapphire" type="Credit Card" balance="-$2,100.50" status="primary" isNegative icon={<IconCreditCard className="text-indigo-600" />} />
          <AccountCard name="Goldman Sachs" type="Savings Account" balance="$30,480.92" icon={<IconBuildingBank className="text-purple-600" />} />
          <AccountCard name="Cash Wallet" type="Physical Cash" balance="$450.00" icon={<IconCash className="text-emerald-600" />} />

          {/* Botón Conectar */}
          <button className="border-2 border-dashed border-slate-200 rounded-[2rem] p-8 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors group">
            <div className="size-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-white transition-colors">
              <IconPlus className="text-slate-400" />
            </div>
            <p className="text-slate-400 font-bold text-sm">Connect another account</p>
          </button>
        </div>
      </div>
    </div>
  );
}

function AccountCard({ name, type, balance, icon, status, isNegative }: any) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-all group">
      <div className="flex justify-between items-start mb-8">
        <div className="flex gap-4 items-center">
          <div className="size-14 rounded-2xl bg-slate-50 flex items-center justify-center">{icon}</div>
          <div>
            <h3 className="font-bold text-lg text-slate-800">{name}</h3>
            <p className="text-sm text-slate-400 font-medium">{type}</p>
          </div>
        </div>
        {status && (
          <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
            {status}
          </span>
        )}
      </div>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{isNegative ? 'Current Balance' : 'Available Balance'}</p>
          <p className={`text-3xl font-black tracking-tighter ${isNegative ? 'text-rose-500' : 'text-slate-900'}`}>{balance}</p>
        </div>
        <button className="size-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all">
          <IconChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

function SummaryMiniCard({ label, value, sub, subColor }: any) {
  return (
    <div className="bg-white p-6 rounded-[1.5rem] border border-slate-100 shadow-sm">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</p>
      <p className="text-2xl font-black text-slate-800 mt-1">{value}</p>
      <p className={`text-xs font-bold mt-1 ${subColor}`}>{sub}</p>
    </div>
  );
}
