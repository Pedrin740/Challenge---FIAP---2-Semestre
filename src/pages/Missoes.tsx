import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { EcoRankHeader } from "../components/EcoRankHeader";
import {
  buscarMinhasMissoes,
  type MissaoUsuario,
} from "../services/missaoApi";

export function Missoes() {
  const { user, isLoading } = useAuth();

  const [missoes, setMissoes] = useState<MissaoUsuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      const token = localStorage.getItem("ecorank_token");

      if (!token || !user) {
        if (ativo) setCarregando(false);
        return;
      }

      try {
        const dados = await buscarMinhasMissoes(token, user.id);

        if (ativo) setMissoes(dados);
      } catch (error) {
        console.error("Erro ao carregar missões:", error);

        if (ativo) {
          setErro("Não foi possível carregar suas missões.");
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    if (!isLoading && user) {
      void carregar();
    }

    return () => {
      ativo = false;
    };
  }, [user, isLoading]);

  if (isLoading) {
    return <p className="p-8 text-center text-zinc-400">Carregando...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="mx-auto max-w-[1100px] p-4 pb-24 sm:p-6 lg:p-8">
      <EcoRankHeader
        title="Minhas missões"
        subtitle="Acompanhe suas metas e recompensas sustentáveis."
      />

      {erro && (
        <p role="alert" className="mt-4 rounded-xl bg-red-500/10 p-4 text-sm text-red-400">
          {erro}
        </p>
      )}

      {carregando ? (
        <p className="mt-6 text-center text-sm text-zinc-400">
          Carregando missões...
        </p>
      ) : missoes.length === 0 ? (
        !erro && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-[#121214] p-8 text-center">
            <h2 className="font-bold">Nenhuma missão encontrada</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Suas missões aparecerão aqui quando estiverem disponíveis.
            </p>
          </div>
        )
      ) : (
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {missoes.map((missao) => {
            const percentual = missao.objetivo > 0
              ? Math.min(
                  Math.round((missao.progresso / missao.objetivo) * 100),
                  100,
                )
              : 0;

            const concluida = missao.progresso >= missao.objetivo;

            return (
              <article
                key={missao.id}
                className="rounded-2xl border border-white/10 bg-[#121214] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-lime-400">
                      Missão
                    </p>
                    <h2 className="mt-2 text-lg font-bold">
                      {missao.descricao}
                    </h2>
                  </div>

                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    concluida
                      ? "bg-lime-400/10 text-lime-400"
                      : "bg-purple-500/10 text-purple-300"
                  }`}>
                    {concluida ? "Concluída" : "Em andamento"}
                  </span>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between text-xs text-zinc-400">
                    <span>Progresso</span>
                    <span>{missao.progresso}/{missao.objetivo}</span>
                  </div>

                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-lime-400 transition-all"
                      style={{ width: `${percentual}%` }}
                    />
                  </div>

                  <p className="mt-2 text-right text-xs text-zinc-500">
                    {percentual}% concluído
                  </p>
                </div>

                <div className="mt-5 flex justify-between border-t border-white/10 pt-4">
                  <div>
                    <p className="text-xs text-zinc-500">Recompensa</p>
                    <p className="mt-1 font-bold text-lime-400">
                      +{missao.recompensa} pontos
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-zinc-500">Prazo</p>
                    <p className="mt-1 text-sm text-zinc-300">
                      {new Date(`${missao.prazo}T00:00:00`).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}