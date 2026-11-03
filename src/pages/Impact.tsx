import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import {
  buscarImpacto,
  type ImpactoApi,
} from "../services/ecoRankApi";

import { EcoRankHeader } from "../components/EcoRankHeader";

export function Impact() {
  const { user, isLoading } = useAuth();

  const [impacto, setImpacto] = useState<ImpactoApi | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarImpacto() {
      const token = localStorage.getItem("ecorank_token");

      if (!token) {
        if (ativo) {
          setCarregando(false);
        }
        return;
      }

      try {
        setCarregando(true);
        setErro("");

        const dados = await buscarImpacto(token);

        if (ativo) {
          setImpacto(dados);
        }
      } catch (error) {
        console.error("Erro ao carregar impacto:", error);

        if (ativo) {
          setErro("Não foi possível carregar seus indicadores de impacto.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    void carregarImpacto();

    return () => {
      ativo = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-zinc-400">
          Carregando sua conta...
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return (
    <div className="mx-auto max-w-[1050px] p-4 pb-24 sm:p-6 lg:p-8">
      <EcoRankHeader
        title="Meu impacto"
        subtitle="Visualize os resultados das suas ações sustentáveis."
      />

      {erro && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400"
        >
          {erro}
        </p>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#121214] p-5">
          <p className="text-xs text-zinc-500">
            CO₂ evitado
          </p>

          <p className="mt-2 text-3xl font-bold text-lime-400">
            {carregando
              ? "..."
              : `${(impacto?.co2Kg ?? 0).toLocaleString("pt-BR")} kg`}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121214] p-5">
          <p className="text-xs text-zinc-500">
            Ações realizadas
          </p>

          <p className="mt-2 text-3xl font-bold">
            {carregando
              ? "..."
              : impacto?.totalAcoes ?? 0}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121214] p-5">
          <p className="text-xs text-zinc-500">
            Pontos acumulados
          </p>

          <p className="mt-2 text-3xl font-bold">
            {carregando
              ? "..."
              : (impacto?.pontos ?? 0).toLocaleString("pt-BR")}
          </p>
        </div>
      </div>

      <section className="mt-4 rounded-2xl border border-white/10 bg-[#121214] p-5">
        <h2 className="font-semibold">
          Resumo da sua evolução
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Os indicadores são calculados a partir das ações aprovadas registradas na sua conta.
        </p>

        {impacto && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-white/5 bg-white/[.02] p-4">
              <p className="text-xs text-zinc-500">
                Pontos no início dos últimos 30 dias
              </p>

              <p className="mt-2 text-xl font-bold">
                {impacto.pontosIniciais.toLocaleString("pt-BR")}
              </p>
            </div>

            <div className="rounded-xl border border-white/5 bg-white/[.02] p-4">
              <p className="text-xs text-zinc-500">
                Evolução nos últimos 30 dias
              </p>

              <p className="mt-2 text-xl font-bold text-lime-400">
                +{impacto.evolucao.reduce(
                  (total, dia) => total + dia.pontos,
                  0,
                ).toLocaleString("pt-BR")} pontos
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="mt-4 rounded-2xl border border-white/10 bg-[#121214] p-5">
        <h2 className="font-semibold">
          Ações por categoria
        </h2>

        {carregando ? (
          <p className="mt-4 text-sm text-zinc-500">
            Carregando categorias...
          </p>
        ) : impacto && impacto.categorias.length > 0 ? (
          <div className="mt-4 space-y-4">
            {impacto.categorias.map((categoria) => (
              <div key={categoria.rotulo}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="text-sm text-zinc-300">
                    {categoria.rotulo}
                  </span>

                  <span className="text-xs text-zinc-500">
                    {categoria.quantidade} ações · {categoria.percentual}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-lime-400 transition-all"
                    style={{
                      width: `${Math.max(0, Math.min(100, categoria.percentual))}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-4 text-sm text-zinc-500">
            Nenhuma ação aprovada foi registrada até o momento.
          </p>
        )}
      </section>

      <section className="mt-4 rounded-2xl border border-white/10 bg-[#121214] p-5">
        <h2 className="font-semibold">
          Evolução dos últimos 30 dias
        </h2>

        {carregando ? (
          <p className="mt-4 text-sm text-zinc-500">
            Carregando evolução...
          </p>
        ) : impacto && impacto.evolucao.length > 0 ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[500px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left text-zinc-500">
                  <th className="px-3 py-3 font-medium">
                    Data
                  </th>

                  <th className="px-3 py-3 text-right font-medium">
                    Pontos do dia
                  </th>

                  <th className="px-3 py-3 text-right font-medium">
                    Total acumulado
                  </th>
                </tr>
              </thead>

              <tbody>
                {impacto.evolucao.map((dia) => (
                  <tr
                    key={dia.data}
                    className="border-b border-white/5 last:border-0"
                  >
                    <td className="px-3 py-3 text-zinc-300">
                      {new Date(`${dia.data}T00:00:00`).toLocaleDateString("pt-BR")}
                    </td>

                    <td className="px-3 py-3 text-right text-lime-400">
                      +{dia.pontos.toLocaleString("pt-BR")}
                    </td>

                    <td className="px-3 py-3 text-right font-semibold">
                      {dia.acumulado.toLocaleString("pt-BR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 text-sm text-zinc-500">
            Ainda não há evolução registrada nos últimos 30 dias.
          </p>
        )}
      </section>

      {impacto?.metodologia && (
        <section className="mt-4 rounded-2xl border border-white/10 bg-[#121214] p-5">
          <h2 className="font-semibold">
            Metodologia de cálculo
          </h2>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            {impacto.metodologia}
          </p>
        </section>
      )}
    </div>
  );
}