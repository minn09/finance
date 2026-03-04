import { Input, Separator } from "@base-ui/react";
import { IconSearch, IconBell } from "@tabler/icons-react";
import { AvatarDemo } from "./Avatar";

export default function HeaderDashboard() {
  return (
    <header className="flex items-center justify-between px-6 py-3 border-b bg-white">
      {/* Grupo de Búsqueda */}
      <div className="flex items-center gap-2 flex-1 max-w-md">
        <IconSearch className="text-slate-400" size={20} />
        <Input
          placeholder="Search transactions..."
          className="w-full bg-transparent outline-none p-1"
        />
      </div>

      {/* Grupo de Acciones */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <IconBell size={22} className="text-slate-600" />
        </button>

        {/* El Separador con altura definida */}
        <Separator orientation="vertical" className="h-6 w-px bg-slate-200" />

        <div className="flex items-center gap-3">
          <span className="text-sm font-medium hidden md:block">Usuario</span>
          <AvatarDemo />
        </div>
      </div>
    </header>
  );
}
