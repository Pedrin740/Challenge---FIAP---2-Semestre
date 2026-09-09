import { NavLink } from "react-router-dom";

import { Icon } from "./Icons";

const items = [
  ["Início", "/", "home"],
  ["Sobre", "/sobre", "content"],
  ["FAQ", "/faq", "question"],
  ["Contato", "/contato", "message"],
  ["Integrantes", "/integrantes", "userSingle"],
  ["Eventos", "/eventos", "calendar"],
  ["Conteúdos", "/conteudos", "content"],
  ["Desafios", "/ecorank/desafios", "target"],
  ["Recompensas", "/recompensas", "gift"],
] as const;

export function Sidebar() {
  return (
    <aside className="fixed bottom-0 left-0 top-[68px] hidden w-[238px] overflow-y-auto border-r border-white/10 bg-[#0a0a0c] lg:block">
      <nav className="space-y-1 p-3">
        {items.map(([label, to, icon]) => {
          const disabled = label === "Eventos" || label === "Recompensas";

          if (disabled) {
            return (
              <div key={label} className="flex cursor-not-allowed items-center gap-4 rounded-xl px-3 py-3 text-sm text-zinc-600">
                <Icon name={icon} size={19} />
                <span className="flex-1">{label}</span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-700">Em breve</span>
              </div>
            );
          }

          return (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-3 py-3 text-sm transition ${
                  isActive ? "bg-white/[.05] text-white" : "text-zinc-300 hover:bg-white/[.05] hover:text-white"
                }`
              }
            >
              <Icon name={icon} size={19} />
              <span>{label}</span>
            </NavLink>
          );
        })}

        <NavLink
          to="/ecorank"
          className={({ isActive }) =>
            `flex items-center gap-4 rounded-xl px-3 py-3 text-sm transition ${
              isActive ? "bg-lime-400/10 text-lime-400" : "text-zinc-300 hover:bg-white/[.05] hover:text-white"
            }`
          }
        >
          <Icon name="leaf" size={19} />
          <span>EcoRank</span>
        </NavLink>
      </nav>

      <div className="mx-4 border-t border-white/10" />

      <div className="p-3">
        <p className="mb-2 px-2 text-xs uppercase tracking-wider text-zinc-600">Atalhos</p>

        <div className="space-y-1">
          <NavLink
            to="/objetivos"
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-3 py-3 text-sm transition ${
                isActive ? "bg-white/[.05] text-white" : "text-zinc-400 hover:bg-white/[.05] hover:text-white"
              }`
            }
          >
            <Icon name="target" size={19} />
            <span>Meus objetivos</span>
          </NavLink>

          <div className="flex cursor-not-allowed items-center gap-4 rounded-xl px-3 py-3 text-sm text-zinc-600">
            <Icon name="gift" size={19} />
            <span className="flex-1">Favoritos</span>
            <span className="text-[10px] uppercase tracking-wider text-zinc-700">Em breve</span>
          </div>

          <NavLink
            to="/configuracoes"
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-3 py-3 text-sm transition ${
                isActive ? "bg-white/[.05] text-white" : "text-zinc-400 hover:bg-white/[.05] hover:text-white"
              }`
            }
          >
            <Icon name="settings" size={19} />
            <span>Configurações</span>
          </NavLink>
        </div>
      </div>

      <div className="m-4 rounded-2xl border border-purple-500/25 bg-purple-950/20 p-4">
        <p className="font-semibold">Convide amigos</p>
        <p className="mt-1 text-xs text-zinc-400">E ganhe pontos</p>

        <button
          type="button"
          className="mt-4 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-500"
        >
          Convidar
        </button>
      </div>
    </aside>
  );
}