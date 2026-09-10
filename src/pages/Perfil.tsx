import {
  Link,
  Navigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export function Perfil() {
  const {
    user,
    logout,
  } = useAuth();

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  const ecoRank =
    user.ecoRank;

  return (
    <div className="mx-auto max-w-[1000px] p-4 pb-24 sm:p-6 lg:p-8">
      <section className="rounded-3xl border border-white/10 bg-[#121214] p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-200 text-2xl font-bold text-zinc-900">
              {user.name.charAt(0)}
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Minha conta
              </p>

              <h1 className="mt-1 text-3xl font-bold">
                {user.name}
              </h1>

              <p className="mt-1 text-sm text-zinc-400">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="rounded-xl border border-red-500/20 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
          >
            Sair da conta
          </button>
        </div>
      </section>

      <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#121214] p-5">
          <p className="text-sm text-zinc-500">
            Pontos
          </p>

          <p className="mt-2 text-3xl font-bold">
            {ecoRank.points.toLocaleString(
              "pt-BR",
            )}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121214] p-5">
          <p className="text-sm text-zinc-500">
            Nível
          </p>

          <p className="mt-2 text-3xl font-bold text-lime-400">
            {ecoRank.rank}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121214] p-5">
          <p className="text-sm text-zinc-500">
            Ações
          </p>

          <p className="mt-2 text-3xl font-bold">
            {ecoRank.actions}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#121214] p-5">
          <p className="text-sm text-zinc-500">
            Posição
          </p>

          <p className="mt-2 text-3xl font-bold text-lime-400">
            {ecoRank.ranking}
          </p>
        </div>
      </section>

      <section className="mt-5 rounded-3xl border border-white/10 bg-[#121214] p-6">
        <h2 className="text-xl font-bold">
          Acesso rápido
        </h2>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Link
            to="/ecorank"
            className="rounded-xl border border-white/10 px-4 py-4 text-sm font-semibold text-zinc-300 transition hover:bg-white/[.04] hover:text-white"
          >
            Ver meu EcoRank
          </Link>

          <Link
            to="/ecorank/ranking"
            className="rounded-xl border border-white/10 px-4 py-4 text-sm font-semibold text-zinc-300 transition hover:bg-white/[.04] hover:text-white"
          >
            Ver ranking
          </Link>

          <Link
            to="/ecorank/desafios"
            className="rounded-xl border border-white/10 px-4 py-4 text-sm font-semibold text-zinc-300 transition hover:bg-white/[.04] hover:text-white"
          >
            Meus desafios
          </Link>

          <Link
            to="/ecorank/impacto"
            className="rounded-xl border border-white/10 px-4 py-4 text-sm font-semibold text-zinc-300 transition hover:bg-white/[.04] hover:text-white"
          >
            Ver meu impacto
          </Link>
        </div>
      </section>
    </div>
  );
}