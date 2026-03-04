import { IconWorld, IconMoon, IconCurrencyDollar, IconCamera } from "@tabler/icons-react";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500">Manage your profile, application preferences, and connected financial institutions.</p>
        </div>

        {/* Sección Perfil */}
        <section className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-800">Profile Information</h2>
            <button className="bg-[#6366f1] text-white px-6 py-2 rounded-xl font-bold text-sm">Save Changes</button>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            <div className="relative group self-start">
              <div className="size-24 rounded-full bg-slate-200 overflow-hidden border-4 border-white shadow-md">
                <img src="https://i.pravatar.cc/150?u=alex" alt="Profile" className="object-cover size-full" />
              </div>
              <button className="absolute bottom-0 right-0 size-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-slate-100 hover:bg-slate-50 transition-colors">
                <IconCamera size={16} className="text-slate-600" />
              </button>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputGroup label="Full Name" placeholder="Alex Johnson" />
              <InputGroup label="Email Address" placeholder="alex.johnson@example.com" />
              <div className="md:col-span-2">
                <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Bio</label>
                <textarea
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500 min-h-[100px]"
                  placeholder="Digital nomad and finance enthusiast."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sección Preferencias */}
        <section className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-8">App Preferences</h2>
          <div className="space-y-4">
            <PreferenceRow
              icon={<IconCurrencyDollar className="text-indigo-600" />}
              title="Default Currency"
              desc="Global currency for all balance displays."
              action={<select className="bg-slate-50 border-none rounded-xl text-sm font-bold p-2"><option>USD ($)</option><option>PEN (S/)</option></select>}
            />
            <PreferenceRow
              icon={<IconWorld className="text-blue-600" />}
              title="Language"
              desc="Application interface language."
              action={<select className="bg-slate-50 border-none rounded-xl text-sm font-bold p-2"><option>English</option><option>Spanish</option></select>}
            />
            <PreferenceRow
              icon={<IconMoon className="text-purple-600" />}
              title="Dark Mode"
              desc="Toggle between light and dark themes."
              action={
                <div className="bg-slate-100 p-1 rounded-xl flex">
                  <button className="px-4 py-1.5 bg-white rounded-lg text-xs font-bold shadow-sm">Light</button>
                  <button className="px-4 py-1.5 text-slate-500 text-xs font-bold">Dark</button>
                </div>
              }
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function InputGroup({ label, placeholder }: any) {
  return (
    <div>
      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}

function PreferenceRow({ icon, title, desc, action }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="size-10 rounded-xl bg-slate-100 flex items-center justify-center">{icon}</div>
        <div>
          <h4 className="font-bold text-sm text-slate-800">{title}</h4>
          <p className="text-xs text-slate-400">{desc}</p>
        </div>
      </div>
      {action}
    </div>
  );
}
