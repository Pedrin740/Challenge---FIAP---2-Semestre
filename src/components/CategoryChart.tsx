import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { buscarResumoEcoRank, type ResumoEcoRankApi, } from "../services/ecoRankApi";

const categoryColors = [
  "#a3e635",
  "#65a30d",
  "#7dd3fc",
  "#facc15",
  "#94a3b8",
];

export function CategoryChart() {
  const { user } = useAuth();

  const [resumo, setResumo] = useState<ResumoEcoRankApi | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarCategorias() {
      const token = localStorage.getItem("ecorank_token");

      if (!token) {
        if (ativo) {
          setErro("Faça login para visualizar suas categorias.");
          setCarregando(false);
        }
        return;
      }

      try {
        setCarregando(true);
        setErro("");

        const dados = await buscarResumoEcoRank(token);

        if (ativo) {
          setResumo(dados);
        }
      } catch (error) {
        console.error("Erro ao carregar ações por categoria:", error);

        if (ativo) {
          setErro("Não foi possível carregar as categorias.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    void carregarCategorias();

    return () => {
      ativo = false;
    };
  }, []);

  if (!user) {
    return null;
  }

  const categories = resumo?.categorias ?? [];

  let accumulated = 0;

  const gradientParts = categories
    .filter((category) => category.percentual > 0)
    .map((category) => {
      const start = accumulated;
      const end = accumulated + category.percentual;
      accumulated = end;

      const index = categories.indexOf(category);

      return `${categoryColors[index % categoryColors.length]} ${start}% ${end}%`;
    });

  const gradient = `conic-gradient(${gradientParts.join(",")})`;

  const hasActions =
    (resumo?.acoes ?? 0) > 0 &&
    categories.some((category) => category.percentual > 0);

  return (
    <section className="rounded-2xl border border-white/10 bg-[#121214] p-5">
      <h2 className="font-semibold">
        Ações por categoria
      </h2>

      {carregando ? (
        <div className="mt-5 flex h-28 items-center justify-center">
          <p className="text-sm text-zinc-500">
            Carregando categorias...
          </p>
        </div>
      ) : erro ? (
        <div className="mt-5 flex h-28 items-center justify-center text-center">
          <p className="text-sm text-red-400">
            {erro}
          </p>
        </div>
      ) : (
        <>
          <div className="mt-5 flex items-center gap-5">
            <div
              className="relative h-28 w-28 shrink-0 rounded-full"
              style={{
                background: hasActions
                  ? gradient
                  : "#27272a",
              }}
            >
              <div className="absolute inset-[25%] rounded-full bg-[#121214]" />
            </div>

            <div className="flex-1 space-y-2">
              {categories.map((category, index) => (
                <div
                  key={category.rotulo}
                  className="flex items-center justify-between gap-2 text-xs"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor:
                          categoryColors[index % categoryColors.length],
                      }}
                    />

                    <span className="truncate text-zinc-400">
                      {category.rotulo}
                    </span>
                  </div>

                  <div className="shrink-0 text-right">
                    <b>{category.percentual}%</b>
                    <span className="ml-1 text-zinc-500">
                      ({category.quantidade})
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {!hasActions && (
            <p className="mt-4 text-xs text-zinc-600">
              Ainda não há ações aprovadas para preencher este gráfico.
            </p>
          )}
        </>
      )}
    </section>
  );
}