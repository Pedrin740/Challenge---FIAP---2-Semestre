import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { EcoRankHeader } from "../components/EcoRankHeader";
import { Icon } from "../components/Icons";
import {
  buscarConteudos,
  type Conteudo,
} from "../services/publicApi";

const categories = [
  "Mudanças climáticas",
  "Sustentabilidade",
  "Preservação",
  "Reciclagem",
  "Energia limpa",
];

export function Conteudos() {
  const [conteudos, setConteudos] = useState<Conteudo[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [busca, setBusca] = useState("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarConteudos() {
      try {
        setErro("");
        setCarregando(true);

        const dados = await buscarConteudos({
          categoria: selectedCategory ?? undefined,
          busca: busca.trim() || undefined,
        });

        if (ativo) setConteudos(dados);
      } catch (error) {
        console.error("Erro ao carregar conteúdos:", error);

        if (ativo) {
          setErro("Não foi possível carregar os conteúdos.");
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    void carregarConteudos();

    return () => {
      ativo = false;
    };
  }, [selectedCategory, busca]);

  const featured = useMemo(() => conteudos[0], [conteudos]);
  const displayedNews = selectedCategory || busca.trim()
    ? conteudos
    : conteudos.slice(1);

  return (
    <div className="mx-auto max-w-[1200px] p-4 pb-24 sm:p-6 lg:p-8">
      <EcoRankHeader
        title="Conteúdos"
        subtitle="Notícias e informações para você acompanhar o meio ambiente."
      />

      <section className="mt-6 rounded-3xl border border-white/10 bg-[#121214] p-5">
        <label htmlFor="busca-conteudos" className="text-sm font-semibold">
          Buscar conteúdos
        </label>

        <input
          id="busca-conteudos"
          type="search"
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
          placeholder="Digite um assunto..."
          className="mt-2 w-full rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-lime-400/50"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
              selectedCategory === null
                ? "border-lime-400/40 bg-lime-400/10 text-lime-400"
                : "border-white/10 text-zinc-400 hover:text-white"
            }`}
          >
            Todas
          </button>

          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
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

      {erro && (
        <p role="alert" className="mt-4 rounded-xl bg-red-500/10 p-4 text-sm text-red-400">
          {erro}
        </p>
      )}

      {carregando ? (
        <p className="mt-8 text-center text-sm text-zinc-400">
          Carregando conteúdos...
        </p>
      ) : conteudos.length === 0 ? (
        !erro && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-[#121214] p-8 text-center">
            <h2 className="font-bold">Nenhum conteúdo encontrado</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Tente outra categoria ou termo de busca.
            </p>
          </div>
        )
      ) : (
        <>
          {!selectedCategory && !busca.trim() && featured && (
            <section className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[#121214]">
              <div className="flex min-h-[280px] items-end bg-gradient-to-br from-lime-400/25 via-lime-950/30 to-[#121214] p-6 sm:p-8">
                <div className="max-w-2xl">
                  <span className="inline-flex items-center gap-2 rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-zinc-950">
                    <Icon name="leaf" size={14} />
                    Destaque
                  </span>

                  <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-lime-300">
                    {featured.categoria}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
                    {featured.titulo}
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-zinc-300">
                    {featured.resumo}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-4 text-xs text-zinc-500">
                    <span>{featured.fonte}</span>
                    <span>{new Date(`${featured.data}T00:00:00`).toLocaleDateString("pt-BR")}</span>
                  </div>

                  {featured.url && (
                    <a
                      href={featured.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex items-center gap-2 rounded-lg bg-lime-400 px-4 py-2.5 text-sm font-bold text-zinc-950 transition hover:bg-lime-300"
                    >
                      Ler conteúdo →
                    </a>
                  )}
                </div>
              </div>
            </section>
          )}

          <section className="mt-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-lime-400">
              Biblioteca ambiental
            </p>

            <h2 className="mt-1 text-2xl font-bold">
              {selectedCategory || (busca.trim() ? "Resultados da busca" : "Últimos conteúdos")}
            </h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {displayedNews.map((item) => (
                <article
                  key={item.id}
                  className="rounded-3xl border border-white/10 bg-[#121214] p-5 transition hover:border-lime-400/20"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-lime-400/10 px-3 py-1 text-xs font-semibold text-lime-400">
                      {item.categoria}
                    </span>

                    <span className="text-xs text-zinc-600">
                      {new Date(`${item.data}T00:00:00`).toLocaleDateString("pt-BR")}
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold leading-7">
                    {item.titulo}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {item.resumo}
                  </p>

                  <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/5 pt-4">
                    <span className="text-xs text-zinc-600">
                      {item.fonte}
                    </span>

                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-semibold text-lime-400 transition hover:text-lime-300"
                      >
                        Ler conteúdo →
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </>
      )}

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
              Descubra novas práticas sustentáveis e registre suas ações no EcoRank.
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