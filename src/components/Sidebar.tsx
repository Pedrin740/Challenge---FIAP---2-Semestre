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
          const disabled =
            label === "Eventos" || label === "Recompensas";

          if (disabled) {
            return (
              <div
                key={label}
                className="flex cursor-not-allowed items-center gap-4 rounded-xl px-3 py-3 text-sm text-zinc-600"
              >
                <Icon name={icon} size={19} />
                <span className="flex-1">{label}</span>
                <span className="text-[10px] uppercase tracking-wider text-zinc-700">
                  Em breve
                </span>
              </div>
            );
          }

          return (
            <NavLink
              key={label}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-4 rounded-xl px-3 py-3 text-sm transition ${
                  isActive
                    ? "bg-white/[.05] text-white"
                    : "text-zinc-300 hover:bg-white/[.05] hover:text-white"
                }`
              }
            >
              <Icon name={icon} size={19} />
              <span>{label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}