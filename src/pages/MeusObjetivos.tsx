import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export function MeusObjetivos() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="mx-auto max-w-[1000px] p-4 pb-24 sm:p-6 lg:p-8">
      <div>
        <p className="text-sm text-zinc-500">SoulUp</p>

        <h1 className="mt-1 text-3xl font-bold">Meus objetivos</h1>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Acompanhe seus objetivos pessoais dentro da SoulUp.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {user.goals.map((goal) => {
          const percentage = Math.min(Math.round((goal.progress / goal.target) * 100), 100);

          return (
            <section key={goal.id} className="rounded-2xl border border-white/10 bg-[#121214] p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-lime-400">Objetivo pessoal</p>
                  <h2 className="mt-2 text-xl font-bold">{goal.title}</h2>
                </div>

                <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300">
                  Privado
                </span>
              </div>

              <p className="mt-3 text-sm leading-6 text-zinc-400">{goal.description}</p>

              <div className="mt-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-500">Progresso</span>
                  <span className="font-semibold text-zinc-300">{goal.progress}/{goal.target}</span>
                </div>

                <div className="mt-2 h-2 rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-lime-400 transition-all" style={{ width: `${percentage}%` }} />
                </div>

                <p className="mt-2 text-xs text-zinc-600">{percentage}% concluído</p>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}