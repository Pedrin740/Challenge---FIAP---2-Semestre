import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { environmentalNews } from "../data/mock";
import { AccountMenu } from "./AccountMenu";
import { Icon } from "./Icons";

const mobileMenuItems = [
  ["Início", "/", "home"],
  ["Sobre", "/sobre", "content"],
  ["FAQ", "/faq", "question"],
  ["Contato", "/contato", "message"],
  ["Integrantes", "/integrantes", "userSingle"],
  ["Eventos", "/eventos", "calendar"],
  ["Conteúdos", "/conteudos", "content"],
  ["Desafios", "/ecorank/desafios", "target"],
  ["Recompensas", "/recompensas", "gift"],
  ["EcoRank", "/ecorank", "leaf"],
] as const;

type SearchResult = {
  title: string;
  description: string;
  type: "Página" | "Notícia";
  icon: string;
  route?: string;
  url?: string;
  keywords?: string[];
};

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[68px] border-b border-white/10 bg-[#0a0a0c]/95 backdrop-blur-xl">
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-300 transition hover:bg-white/[.05] hover:text-white lg:hidden"
          >
            <span className="text-2xl leading-none">☰</span>
          </button>

          <NavLink
            to="/"
            className="text-2xl font-bold text-purple-500"
          >
            SoulUp
          </NavLink>
        </div>
      </div>
    </header>
  );
}