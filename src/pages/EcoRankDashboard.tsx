import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { buscarResumoEcoRank, type ResumoEcoRankApi } from "../services/ecoRankApi";

import { CategoryChart } from "../components/CategoryChart";
import { ChallengeCard } from "../components/ChallengeCard";
import { EcoRankHeader } from "../components/EcoRankHeader";
import { ImpactChart } from "../components/ImpactChart";
import { LevelCard } from "../components/LevelCard";
import { QuickActions } from "../components/QuickActions";
import { RankingCard } from "../components/RankingCard";
import { StatCard } from "../components/StatCard";

export function EcoRankDashboard() {
  const { user, isLoading } = useAuth();

  const [resumo, setResumo] = useState<ResumoEcoRankApi | null>(null);
  const [carregandoResumo, setCarregandoResumo] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarResumo() {
      const token = localStorage.getItem("ecorank_token");

      if (!token) {
        if (ativo) {
          setCarregandoResumo(false);
        }
        return;
      }

      try {
        setCarregandoResumo(true);
        setErro("");

        const dados = await buscarResumoEcoRank(token);

        if (ativo) {
          setResumo(dados);
        }
      } catch (error) {
        console.error("Erro ao carregar resumo do EcoRank:", error);

        if (ativo) {
          setErro("Não foi possível carregar os indicadores do EcoRank.");
        }
      } finally {
        if (ativo) {
          setCarregandoResumo(false);
        }
      }
    }

    void carregarResumo();

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
    <div className="mx-auto max-w-[1320px] p-4 pb-24 sm:p-6 lg:p-8">
      <EcoRankHeader />

      {erro && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400"
        >
          {erro}
        </p>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Pontos totais"
          value={
            carregandoResumo
              ? "..."
              : (resumo?.pontos ?? 0).toLocaleString("pt-BR")
          }
          helper={
            resumo
              ? `+${resumo.pontosSemana.toLocaleString("pt-BR")} esta semana`
              : "Pontuação acumulada"
          }
        />

        <StatCard
          title="Ações realizadas"
          value={
            carregandoResumo
              ? "..."
              : String(resumo?.acoes ?? 0)
          }
          helper={
            resumo
              ? `+${resumo.acoesSemana} esta semana`
              : "Ações aprovadas"
          }
        />

        <StatCard
          title="CO₂ evitado"
          value={
            carregandoResumo
              ? "..."
              : `${(resumo?.co2Kg ?? 0).toLocaleString("pt-BR")} kg`
          }
          helper="Total estimado"
        />

        <StatCard
          title="Posição no ranking"
          value={
            carregandoResumo
              ? "..."
              : resumo?.posicao
                ? `${resumo.posicao}º`
                : "-"
          }
          helper={
            resumo
              ? `Entre ${resumo.totalUsuarios} usuários`
              : "Ranking geral"
          }
        />
      </div>

      {resumo && (
        <section className="mt-4 rounded-2xl border border-white/10 bg-[#121214] p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-zinc-500">
                Seu nível atual
              </p>

              <h2 className="mt-1 text-2xl font-bold text-lime-400">
                {resumo.nivel}
              </h2>
            </div>

            <div className="sm:text-right">
              <p className="text-sm text-zinc-500">
                Próximo nível
              </p>

              <p className="mt-1 font-semibold">
                {resumo.proximoNivel}
              </p>

              <p className="mt-1 text-xs text-zinc-500">
                {resumo.pontosRestantes.toLocaleString("pt-BR")} pontos restantes
              </p>
            </div>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-lime-400 transition-all"
              style={{
                width: `${Math.max(0, Math.min(100, resumo.progressoNivel))}%`,
              }}
            />
          </div>

          <p className="mt-2 text-right text-xs text-zinc-500">
            {resumo.progressoNivel}% concluído
          </p>
        </section>
      )}

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <LevelCard />

        <ChallengeCard />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-[1.25fr_.9fr_.9fr]">
        <ImpactChart />

        <CategoryChart />

        <RankingCard />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <QuickActions />

        <section className="rounded-2xl border border-white/10 bg-[#121214] p-5">
          <h2 className="font-semibold">
            Registrar nova ação
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Mostre uma ação sustentável realizada por você e participe da evolução do EcoRank.
          </p>

          <a
            href="/ecorank/enviar"
            className="mt-5 inline-flex rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-bold transition hover:bg-purple-500"
          >
            Enviar ação
          </a>
        </section>
      </div>
    </div>
  );
}