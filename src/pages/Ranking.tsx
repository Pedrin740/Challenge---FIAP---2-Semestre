import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  buscarRanking,
  buscarNiveis,
  type RankingItem,
  type Nivel,
} from "../services/publicApi";

import { EcoRankHeader } from "../components/EcoRankHeader";

export function Ranking() {
  const { user, isLoading } = useAuth();

  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [niveis, setNiveis] = useState<Nivel[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      try {
        setCarregando(true);
        setErro("");

        const [dadosRanking, dadosNiveis] = await Promise.all([
          buscarRanking(),
          buscarNiveis(),
        ]);

        if (ativo) {
          setRanking(dadosRanking);
          setNiveis(dadosNiveis);
        }
      } catch (error) {
        console.error("Erro ao carregar ranking:", error);

        if (ativo) {
          setErro("Não foi possível carregar o ranking e os níveis.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    void carregarDados();

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

  const usuarioRanking = ranking.find(
    (item) => item.idUsuario === user.id,
  );

  const nivelAtual = usuarioRanking?.nivel ?? user.ecoRank.rank;
  const pontosAtuais = usuarioRanking?.pontos ?? user.ecoRank.points;

  return (
    <div className="mx-auto max-w-[1100px] p-4 pb-24 sm:p-6 lg:p-8">
      <EcoRankHeader
        title="Ranking"
        subtitle="Veja sua posição, os outros usuários e os pontos necessários para cada ranque."
      />

      {erro && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400"
        >
          {erro}
        </p>
      )}

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_330px]">
        <section className="rounded-2xl border border-white/10 bg-[#121214] p-5">
          <div className="mb-4">
            <h2 className="font-semibold">
              Pontos necessários por ranque
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              Quanto você precisa acumular para alcançar cada nível.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[.02]">
                  <th className="px-4 py-3 text-left font-semibold">
                    Ranque
                  </th>

                  <th className="px-4 py-3 text-right font-semibold">
                    Pontos necessários
                  </th>

                  <th className="px-4 py-3 text-right font-semibold">
                    Multiplicador
                  </th>
                </tr>
              </thead>

              <tbody>
                {niveis.map((item) => {
                  const isCurrentRank =
                    nivelAtual.toLowerCase() === item.nome.toLowerCase();

                  return (
                    <tr
                      key={item.id}
                      className={`border-b border-white/5 last:border-b-0 ${
                        isCurrentRank
                          ? "bg-lime-400/[.07]"
                          : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`h-2.5 w-2.5 rounded-full ${
                              item.nome === "Bronze"
                                ? "bg-amber-600"
                                : item.nome === "Prata"
                                  ? "bg-zinc-300"
                                  : item.nome === "Ouro"
                                    ? "bg-yellow-400"
                                    : item.nome === "Diamante"
                                      ? "bg-cyan-400"
                                      : "bg-emerald-400"
                            }`}
                          />

                          <span className="font-semibold">
                            {item.nome}
                          </span>

                          {isCurrentRank && (
                            <span className="rounded-full bg-lime-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-lime-400">
                              Você
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-4 py-3 text-right font-semibold text-zinc-300">
                        {item.pontosNecessarios.toLocaleString("pt-BR")} pts
                      </td>

                      <td className="px-4 py-3 text-right text-zinc-400">
                        {item.multiplicador.toLocaleString("pt-BR")}x
                      </td>
                    </tr>
                  );
                })}

                {!carregando && niveis.length === 0 && (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-6 text-center text-sm text-zinc-500"
                    >
                      Nenhum nível encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        <aside className="rounded-2xl border border-white/10 bg-[#121214] p-5">
          <p className="text-sm text-zinc-500">
            Sua posição
          </p>

          <p className="mt-2 text-4xl font-bold text-lime-400">
            {carregando
              ? "..."
              : usuarioRanking
                ? `${usuarioRanking.posicao}º`
                : "-"}
          </p>

          <p className="mt-2 text-sm text-zinc-400">
            {pontosAtuais.toLocaleString("pt-BR")} pontos
          </p>

          <div className="mt-5 rounded-xl border border-white/5 bg-white/[.02] p-4">
            <p className="text-xs text-zinc-500">
              Seu ranque
            </p>

            <p className="mt-1 text-lg font-bold">
              {nivelAtual}
            </p>

            {user.ecoRank.nextRank !== user.ecoRank.rank && (
              <>
                <p className="mt-3 text-xs text-zinc-500">
                  Próximo ranque
                </p>

                <p className="mt-1 font-semibold text-lime-400">
                  {user.ecoRank.nextRank}
                </p>

                <p className="mt-1 text-xs text-zinc-500">
                  {user.ecoRank.nextRankPoints.toLocaleString("pt-BR")} pontos
                </p>
              </>
            )}
          </div>
        </aside>
      </div>

      <section className="mt-4 rounded-2xl border border-white/10 bg-[#121214] p-5">
        <div className="mb-4">
          <h2 className="font-semibold">
            Ranking geral
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            Confira a pontuação e o ranque de todos os usuários.
          </p>
        </div>

        {carregando ? (
          <p className="py-6 text-center text-sm text-zinc-500">
            Carregando ranking...
          </p>
        ) : ranking.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[650px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[.02]">
                  <th className="w-16 px-4 py-3 text-center font-semibold">
                    #
                  </th>

                  <th className="px-4 py-3 text-left font-semibold">
                    Usuário
                  </th>

                  <th className="px-4 py-3 text-left font-semibold">
                    Ranque
                  </th>

                  <th className="px-4 py-3 text-right font-semibold">
                    Pontos
                  </th>
                </tr>
              </thead>

              <tbody>
                {ranking.map((item) => {
                  const isCurrentUser =
                    item.idUsuario === user.id;

                  return (
                    <tr
                      key={item.idUsuario}
                      className={`border-b border-white/5 last:border-b-0 ${
                        isCurrentUser
                          ? "bg-lime-400/[.07]"
                          : ""
                      }`}
                    >
                      <td className="px-4 py-4 text-center font-semibold text-zinc-500">
                        {item.posicao}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 font-bold">
                            {item.nome.charAt(0)}
                          </div>

                          <div>
                            <p className="font-semibold">
                              {item.nome}
                            </p>

                            {isCurrentUser && (
                              <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-lime-400">
                                Você
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            item.nivel === "Bronze"
                              ? "bg-amber-600/10 text-amber-500"
                              : item.nivel === "Prata"
                                ? "bg-zinc-300/10 text-zinc-300"
                                : item.nivel === "Ouro"
                                  ? "bg-yellow-400/10 text-yellow-400"
                                  : item.nivel === "Diamante"
                                    ? "bg-cyan-400/10 text-cyan-400"
                                    : "bg-emerald-400/10 text-emerald-400"
                          }`}
                        >
                          {item.nivel}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-right font-bold">
                        {item.pontos.toLocaleString("pt-BR")} pts
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="py-6 text-center text-sm text-zinc-500">
            Nenhum usuário encontrado no ranking.
          </p>
        )}
      </section>
    </div>
  );
}