import { Link, Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Perfil() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  function handleLogout() {
    logout();
  }

  return (
    <main className="min-h-screen px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <Link
              to="/"
              className="text-sm opacity-70 hover:opacity-100"
            >
              ← Voltar
            </Link>

            <h1 className="mt-4 text-3xl font-bold">
              Meu perfil
            </h1>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-xl px-4 py-2 text-sm font-semibold"
          >
            Sair
          </button>
        </div>

        <section className="rounded-2xl border p-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-3xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                {user.name}
              </h2>

              <p className="mt-1 opacity-60">
                {user.email}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-6">
          <h2 className="mb-4 text-xl font-bold">
            Meu EcoRank
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border p-5">
              <p className="text-sm opacity-60">
                Pontos
              </p>

              <p className="mt-2 text-2xl font-bold">
                {user.ecoRank.points}
              </p>
            </div>

            <div className="rounded-2xl border p-5">
              <p className="text-sm opacity-60">
                Ranking
              </p>

              <p className="mt-2 text-2xl font-bold">
                {user.ecoRank.rank}
              </p>
            </div>

            <div className="rounded-2xl border p-5">
              <p className="text-sm opacity-60">
                Ações
              </p>

              <p className="mt-2 text-2xl font-bold">
                {user.ecoRank.actions}
              </p>
            </div>

            <div className="rounded-2xl border p-5">
              <p className="text-sm opacity-60">
                Posição
              </p>

              <p className="mt-2 text-2xl font-bold">
                {user.ecoRank.ranking}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-xl font-bold">
            Acesso rápido
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              to="/ecorank"
              className="rounded-2xl border p-4"
            >
              <span className="font-semibold">
                Meu EcoRank
              </span>
            </Link>

            <Link
              to="/ecorank/ranking"
              className="rounded-2xl border p-4"
            >
              <span className="font-semibold">
                Ranking
              </span>
            </Link>

            <Link
              to="/ecorank/desafios"
              className="rounded-2xl border p-4"
            >
              <span className="font-semibold">
                Desafios
              </span>
            </Link>

            <Link
              to="/ecorank/impacto"
              className="rounded-2xl border p-4"
            >
              <span className="font-semibold">
                Meu impacto
              </span>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}