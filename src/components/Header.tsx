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

const pages: SearchResult[] = [
  {
    title: "Início",
    description: "Página inicial da SoulUp.",
    type: "Página",
    icon: "home",
    route: "/",
    keywords: ["home", "inicio", "principal"],
  },
  {
    title: "Sobre",
    description: "Conheça a proposta EcoRank.",
    type: "Página",
    icon: "content",
    route: "/sobre",
    keywords: ["projeto", "soulup", "ecorank", "sobre"],
  },
  {
    title: "FAQ",
    description: "Perguntas frequentes sobre o projeto.",
    type: "Página",
    icon: "question",
    route: "/faq",
    keywords: ["perguntas", "duvidas", "ajuda", "faq"],
  },
  {
    title: "Contato",
    description: "Entre em contato com a equipe.",
    type: "Página",
    icon: "message",
    route: "/contato",
    keywords: ["falar", "equipe", "mensagem", "email", "contato"],
  },
  {
    title: "Integrantes",
    description: "Conheça a equipe InovaTech.",
    type: "Página",
    icon: "userSingle",
    route: "/integrantes",
    keywords: ["equipe", "inovatech", "membros", "integrantes"],
  },
  {
    title: "Conteúdos",
    description: "Notícias e informações sobre meio ambiente.",
    type: "Página",
    icon: "content",
    route: "/conteudos",
    keywords: ["noticias", "notícias", "meio ambiente", "ambiental", "informacoes"],
  },
  {
    title: "Desafios",
    description: "Participe dos desafios do EcoRank.",
    type: "Página",
    icon: "target",
    route: "/ecorank/desafios",
    keywords: ["desafio", "desafios", "tarefas", "diario", "diário"],
  },
  {
    title: "EcoRank",
    description: "Acompanhe sua evolução, pontos e ações sustentáveis.",
    type: "Página",
    icon: "leaf",
    route: "/ecorank",
    keywords: ["pontos", "acoes", "ações", "pontuacao", "pontuação", "nivel", "nível", "impacto"],
  },
  {
    title: "Ranking",
    description: "Veja a posição dos participantes e os ranques.",
    type: "Página",
    icon: "target",
    route: "/ecorank/ranking",
    keywords: ["ranking", "classificacao", "classificação", "posicao", "posição", "usuarios", "usuários", "ranque"],
  },
  {
    title: "Enviar ação",
    description: "Registre uma nova ação sustentável.",
    type: "Página",
    icon: "camera",
    route: "/ecorank/enviar",
    keywords: ["enviar", "acao", "ação", "registrar", "foto", "video", "vídeo", "prova"],
  },
  {
    title: "Meu impacto",
    description: "Veja seu histórico e impacto ambiental.",
    type: "Página",
    icon: "leaf",
    route: "/ecorank/impacto",
    keywords: ["impacto", "co2", "carbono", "historico", "histórico"],
  },
  {
    title: "Meu perfil",
    description: "Visualize e gerencie os dados do seu perfil.",
    type: "Página",
    icon: "userSingle",
    route: "/perfil",
    keywords: ["perfil", "conta", "usuario", "usuário", "dados pessoais"],
  },
  {
    title: "Meus objetivos",
    description: "Acompanhe seus objetivos pessoais.",
    type: "Página",
    icon: "target",
    route: "/objetivos",
    keywords: ["objetivos", "metas", "meta", "objetivo pessoal"],
  },
  {
    title: "Configurações",
    description: "Gerencie sua conta e suas preferências.",
    type: "Página",
    icon: "settings",
    route: "/configuracoes",
    keywords: ["configuracoes", "configurações", "preferencias", "preferências", "tema", "conta", "senha"],
  },
];
function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setSearch("");
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const searchResults = useMemo<SearchResult[]>(() => {
    const normalizedSearch = normalizeText(search.trim());

    if (!normalizedSearch) {
      return [];
    }

    const searchTerms = normalizedSearch.split(/\s+/).filter(Boolean);

    const pageResults = pages
      .map((page) => {
        const searchableText = normalizeText(
          [
            page.title,
            page.description,
            ...(page.keywords ?? []),
          ].join(" "),
        );

        const matchedTerms = searchTerms.filter((term) =>
          searchableText.includes(term),
        );

        return {
          page,
          score: matchedTerms.length,
        };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        const titleA = normalizeText(a.page.title);
        const titleB = normalizeText(b.page.title);

        const exactA = titleA === normalizedSearch ? 1 : 0;
        const exactB = titleB === normalizedSearch ? 1 : 0;

        return exactB - exactA;
      })
      .map((item) => item.page);

    const newsResults = environmentalNews
      .map((news) => {
        const searchableText = normalizeText(
          [
            news.title,
            news.category,
            news.summary,
            news.source,
          ].join(" "),
        );

        const matchedTerms = searchTerms.filter((term) =>
          searchableText.includes(term),
        );

        return {
          news,
          score: matchedTerms.length,
        };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => ({
        title: item.news.title,
        description: `${item.news.category} • ${item.news.source}`,
        type: "Notícia" as const,
        icon: "leaf",
        url: item.news.url,
      }));

    return [...pageResults, ...newsResults].slice(0, 10);
  }, [search]);

  function handleSearchSubmit() {
    if (!search.trim()) {
      return;
    }

    if (searchResults.length === 0) {
      return;
    }

    handleSearchResult(searchResults[0]);
  }

  function handleSearchResult(result: SearchResult) {
    setSearch("");
    setSearchOpen(false);

    if (result.route) {
      navigate(result.route);
      return;
    }

    if (result.url) {
      window.open(result.url, "_blank", "noopener,noreferrer");
    }
  }
  return (
    <>
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

            <NavLink to="/" className="text-2xl font-bold text-purple-500">
              SoulUp
            </NavLink>
          </div>

          <div className="hidden flex-1 justify-center lg:flex">
            <div className="relative w-full max-w-[435px]">
              <Icon name="search" size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />

              <input
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setSearchOpen(true);
                }}
                onFocus={() => {
                  if (search.trim()) {
                    setSearchOpen(true);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearchSubmit();
                  }

                  if (event.key === "Escape") {
                    setSearchOpen(false);
                  }
                }}
                placeholder="Buscar no SoulUp..."
                className="w-full rounded-full border border-white/10 bg-[#151517] py-2.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-purple-500/40"
              />

              {searchOpen && search.trim() && (
                <div className="absolute left-0 right-0 top-[calc(100%+8px)] overflow-hidden rounded-2xl border border-white/10 bg-[#121214] shadow-2xl">
                  {searchResults.length > 0 ? (
                    <div className="max-h-[440px] overflow-y-auto p-2">
                      {searchResults.map((result, index) => (
                        <button
                          key={`${result.type}-${result.title}-${index}`}
                          type="button"
                          onClick={() => handleSearchResult(result)}
                          className="flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-white/[.05]"
                        >
                          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[.04] text-zinc-400">
                            <Icon name={result.icon} size={17} />
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-zinc-200">
                              {result.title}
                            </p>

                            <p className="mt-1 truncate text-xs text-zinc-500">
                              {result.description}
                            </p>
                          </div>

                          <span className="shrink-0 pt-1 text-[10px] uppercase tracking-wider text-zinc-600">
                            {result.type}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <Icon name="search" size={22} className="mx-auto text-zinc-600" />

                      <p className="mt-3 text-sm font-semibold text-zinc-400">
                        Nenhum resultado encontrado
                      </p>

                      <p className="mt-1 text-xs text-zinc-600">
                        Tente buscar por outra palavra.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="Notificações"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-zinc-300 transition hover:bg-white/[.05] hover:text-white"
            >
              <Icon name="bell" size={20} />
            </button>

            <AccountMenu />
          </div>
        </div>
      </header>

      {searchOpen && search.trim() && (
        <button
          type="button"
          aria-label="Fechar resultados da pesquisa"
          onClick={() => setSearchOpen(false)}
          className="fixed inset-0 z-40 hidden lg:block"
        />
      )}

      {menuOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button
            type="button"
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <aside className="relative h-full w-[310px] max-w-[85vw] overflow-y-auto border-r border-white/10 bg-[#0a0a0c] shadow-2xl">
            <div className="flex h-[68px] items-center justify-between border-b border-white/10 px-5">
              <NavLink to="/" className="text-2xl font-bold text-purple-500">
                SoulUp
              </NavLink>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Fechar menu"
                className="flex h-10 w-10 items-center justify-center rounded-xl text-3xl leading-none text-zinc-400 transition hover:bg-white/[.05] hover:text-white"
              >
                ×
              </button>
            </div>
