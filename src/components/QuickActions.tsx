import { Link } from "react-router-dom";
import { Icon } from "./Icons";

const items = [
  ["Enviar ação", "/ecorank/enviar", "camera"],
  ["Meu ranking", "/ecorank/ranking", "chart"],
  ["Desafios", "/ecorank/desafios", "target"],
  ["Meu impacto", "/ecorank/impacto", "leaf"],
] as const;

export function QuickActions() {
  return (
    <section className="border border-white/10 bg-[#121214] rounded-2xl p-5">
      <h2 className="font-semibold">Ações rápidas</h2>

      <div className="mt-4 grid grid-cols-2 gap-2">
        {items.map(([label, to, icon]) => (
          <Link
            key={label}
            to={to}
            className="flex flex-col items-center gap-2 rounded-xl bg-white/[.03] p-4 text-center text-xs text-zinc-300 hover:bg-lime-400/[.05] hover:text-white"
          >
            <Icon name={icon} size={20} />
            {label}
          </Link>
        ))}
      </div>
    </section>
  );
}