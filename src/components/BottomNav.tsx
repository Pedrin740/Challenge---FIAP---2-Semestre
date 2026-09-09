import { Link, useLocation } from "react-router-dom";

import { Icon } from "./Icons";

export function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-5 border-t border-white/10 bg-[#0b0b0d]/95 px-2 py-2 backdrop-blur-xl lg:hidden">
      <Link
        to="/"
        className={`flex flex-col items-center gap-1 py-1 text-[10px] transition ${
          isActive("/")
            ? "text-white"
            : "text-zinc-500 hover:text-white"
        }`}
      >
        <Icon
          name="home"
          size={18}
        />

        <span>
          Início
        </span>
      </Link>

      <Link
        to="/ecorank"
        className={`flex flex-col items-center gap-1 py-1 text-[10px] transition ${
          isActive("/ecorank")
            ? "text-lime-400"
            : "text-zinc-500 hover:text-white"
        }`}
      >
        <Icon
          name="leaf"
          size={18}
        />

        <span>
          EcoRank
        </span>
      </Link>

      <Link
        to="/ecorank/enviar"
        aria-label="Enviar ação"
        className="mx-auto -mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-lime-400 text-zinc-950 shadow-[0_0_28px_rgba(163,230,53,0.18)] transition hover:bg-lime-300"
      >
        <Icon
          name="plus"
          size={27}
        />
      </Link>

      <Link
        to="/ecorank/desafios"
        className={`flex flex-col items-center gap-1 py-1 text-[10px] transition ${
          isActive("/ecorank/desafios")
            ? "text-lime-400"
            : "text-zinc-500 hover:text-white"
        }`}
      >
        <Icon
          name="target"
          size={18}
        />

        <span>
          Desafios
        </span>
      </Link>

      <Link
        to="/perfil"
        className={`flex flex-col items-center gap-1 py-1 text-[10px] transition ${
          isActive("/perfil")
            ? "text-purple-400"
            : "text-zinc-500 hover:text-white"
        }`}
      >
        <Icon
          name="userSingle"
          size={18}
        />

        <span>
          Perfil
        </span>
      </Link>
    </nav>
  );
}