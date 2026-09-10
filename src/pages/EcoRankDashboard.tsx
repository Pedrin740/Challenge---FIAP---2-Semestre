import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { CategoryChart } from "../components/CategoryChart";
import { ChallengeCard } from "../components/ChallengeCard";
import { EcoRankHeader } from "../components/EcoRankHeader";
import { ImpactChart } from "../components/ImpactChart";
import { LevelCard } from "../components/LevelCard";
import { QuickActions } from "../components/QuickActions";
import { RankingCard } from "../components/RankingCard";
import { StatCard } from "../components/StatCard";

export function EcoRankDashboard() {
  const { user, getRanking } = useAuth();

  const [calculandoRanking, setCalculandoRanking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCalculandoRanking(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  const ecoRank = user.ecoRank;
  const ranking = getRanking();

  const posicaoUsuario =
    ranking.findIndex(
      (item) => item.id === user.id,
    ) + 1;

  return (
    <div className="mx-auto max-w-[1320px] p-4 pb-24 sm:p-6 lg:p-8">
      <EcoRankHeader />

      <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Pontos totais"
          value={ecoRank.points.toLocaleString(
            "pt-BR",
          )}
          helper="+120 esta semana"
        />

        <StatCard
          title="Ações realizadas"
          value={String(ecoRank.actions)}
          helper="+5 esta semana"
        />

        <StatCard
          title="CO₂ evitado"
          value={ecoRank.co2}
          helper="Total estimado"
        />

        <StatCard
          title="Posição no ranking"
          value={
            calculandoRanking
              ? "Calculando..."
              : `${posicaoUsuario}º`
          }
          helper="Entre todos os usuários"
        />
      </div>

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