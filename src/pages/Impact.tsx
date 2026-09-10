import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { EcoRankHeader } from "../components/EcoRankHeader";

export function Impact() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  const ecoRank = user.ecoRank;

  return (
    <div className="mx-auto max-w-[1050px] p-4 pb-24 sm:p-6 lg:p-8">
      <EcoRankHeader
        title="Meu impacto"
        subtitle="Visualize os resultados das suas ações sustentáveis."
      />

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-[#121214] p-5">
          <p className="text-xs text-zinc-500">
            CO₂ evitado
          </p>

          <p className="mt-2 text-3xl font-bold text-lime-400">
            {ecoRank.co2}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121214] p-5">
          <p className="text-xs text-zinc-500">
            Ações realizadas
          </p>

          <p className="mt-2 text-3xl font-bold">
            {ecoRank.actions}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121214] p-5">
          <p className="text-xs text-zinc-500">
            Pontos acumulados
          </p>

          <p className="mt-2 text-3xl font-bold">
            {ecoRank.points.toLocaleString("pt-BR")}
          </p>
        </div>
      </div>

      <section className="mt-4 rounded-2xl border border-white/10 bg-[#121214] p-5">
        <h2 className="font-semibold">
          Resumo da sua evolução
        </h2>

        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Você está no nível{" "}
          <b className="text-white">
            {ecoRank.rank}
          </b>{" "}
          e atualmente ocupa a posição{" "}
          <b className="text-lime-400">
            {ecoRank.ranking}
          </b>{" "}
          no ranking.
        </p>
      </section>
    </div>
  );
}