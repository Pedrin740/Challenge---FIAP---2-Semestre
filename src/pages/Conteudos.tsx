import { useState } from "react";
import { Link } from "react-router-dom";

import { EcoRankHeader } from "../components/EcoRankHeader";
import { Icon } from "../components/Icons";
import { environmentalNews } from "../data/mock";

const categories = [
  "Mudanças climáticas",
  "Sustentabilidade",
  "Preservação",
  "Reciclagem",
  "Energia limpa",
];

export function Conteudos() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    null,
  );

  const filteredNews = selectedCategory
    ? environmentalNews.filter(
        (item) => item.category === selectedCategory,
      )
    : environmentalNews;

  const featured = environmentalNews[0];

  const displayedNews = selectedCategory
    ? filteredNews
    : environmentalNews.slice(1);

  return (
    <div className="mx-auto max-w-[1200px] p-4 pb-24 sm:p-6 lg:p-8">
      <EcoRankHeader
        title="Conteúdos"
        subtitle="Notícias e informações para você acompanhar o meio ambiente."
      />

      {/* Destaque */}
      {!selectedCategory && (
        <section className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
          <article className="overflow-hidden rounded-3xl border border-white/10 bg-[#121214]">
            <div className="flex min-h-[300px] items-end bg-gradient-to-br from-lime-400/25 via-lime-950/30 to-[#121214] p-6 sm:p-8">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-zinc-950">
                  <Icon
                    name="leaf"
                    size={14}
                  />

                  Destaque
                </span>

                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-lime-300">
                  {featured.category}
                </p>

                <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                  {featured.title}
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-300">
                  {featured.summary}
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                  <span>
                    {featured.source}
                  </span>

                  <span>
                    •
                  </span>

                  <span>
                    {featured.date}
                  </span>
                </div>

                <a
                  href={featured.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-lime-400 px-4 py-2.5 text-sm font-bold text-zinc-950 transition hover:bg-lime-300"
                >
                  Ler notícia

                  <span>
                    →
                  </span>
                </a>
              </div>
            </div>
          </article>

          <aside className="rounded-3xl border border-white/10 bg-[#121214] p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
                <Icon
                  name="leaf"
                  size={22}
                />
              </div>

              <div>
                <h2 className="font-bold">
                  Canal ambiental
                </h2>

                <p className="text-xs text-zinc-500">
                  Filtre por categoria
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[.02] px-4 py-3 text-left text-sm text-zinc-300 transition hover:border-lime-400/20 hover:text-white"
                >
                  <span>
                    {category}
                  </span>

                  <span className="text-zinc-600">
                    →
                  </span>
                </button>
              ))}
            </div>
          </aside>
        </section>
      )}

      {/* Canal ambiental quando um filtro está selecionado */}
      {selectedCategory && (
        <section className="mt-4 rounded-3xl border border-white/10 bg-[#121214] p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400/10 text-lime-400">
                <Icon
                  name="leaf"
                  size={22}
                />
              </div>

              <div>
                <h2 className="font-bold">
                  Canal ambiental
                </h2>

                <p className="text-xs text-zinc-500">
                  Categoria: {selectedCategory}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className="rounded-xl border border-white/10 px-4 py-2 text-xs font-semibold text-zinc-400 transition hover:bg-white/[.04] hover:text-white"
            >
              Ver todas as notícias
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                  selectedCategory === category
                    ? "border-lime-400/40 bg-lime-400/10 text-lime-400"
                    : "border-white/10 text-zinc-400 hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Notícias */}
      <section className="mt-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-lime-400">
              Notícias
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              {selectedCategory
                ? selectedCategory
                : "Últimos conteúdos"}
            </h2>
          </div>

        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {displayedNews.map((item) => (
            <article
              key={item.id}
              className="rounded-3xl border border-white/10 bg-[#121214] p-5 transition hover:border-lime-400/20"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-lime-400/10 px-3 py-1 text-xs font-semibold text-lime-400">
                  {item.category}
                </span>

                <span className="text-xs text-zinc-600">
                  {item.date}
                </span>
              </div>

              <h3 className="mt-4 text-xl font-bold leading-7">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {item.summary}
              </p>

              <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/5 pt-4">
                <span className="text-xs text-zinc-600">
                  {item.source}
                </span>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-lime-400 transition hover:text-lime-300"
                >
                  Ler notícia →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Integração com EcoRank */}
      <section className="mt-6 rounded-3xl border border-purple-500/20 bg-purple-950/20 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-purple-300">
              Conteúdos + EcoRank
            </p>

            <h2 className="mt-1 text-xl font-bold">
              Transforme informação em ação
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
              Use os conteúdos para descobrir novas práticas sustentáveis e
              depois registre suas ações no EcoRank.
            </p>
          </div>

          <Link
            to="/ecorank/enviar"
            className="shrink-0 rounded-lg bg-purple-600 px-5 py-3 text-center text-sm font-bold transition hover:bg-purple-500"
          >
            Registrar ação
          </Link>
        </div>
      </section>
    </div>
  );
}