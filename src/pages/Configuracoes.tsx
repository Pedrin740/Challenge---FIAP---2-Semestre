import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useTheme, type Theme } from "../context/ThemeContext";

export function Configuracoes() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  function handleLogout() {
    logout();
  }

  const themes: {
    id: Theme;
    name: string;
    description: string;
  }[] = [
    {
      id: "light",
      name: "Claro",
      description: "Uma interface clara e iluminada.",
    },
    {
      id: "medium",
      name: "Intermediário",
      description: "Um equilíbrio entre claro e escuro.",
    },
    {
      id: "dark",
      name: "Escuro",
      description: "O visual escuro atual da SoulUp.",
    },
  ];

  return (
    <div className="mx-auto max-w-[900px] p-4 pb-24 sm:p-6 lg:p-8">
      <div>
        <p className="text-sm text-zinc-500">SoulUp</p>

        <h1 className="mt-1 text-3xl font-bold">Configurações</h1>

        <p className="mt-2 text-sm text-zinc-400">
          Gerencie sua conta e suas preferências.
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <section className="rounded-2xl border border-white/10 bg-[#121214] p-5">
          <h2 className="font-semibold">Minha conta</h2>

          <div className="mt-4 space-y-3">
            <div>
              <p className="text-xs text-zinc-600">Nome</p>
              <p className="mt-1 text-sm text-zinc-300">{user.name}</p>
            </div>

            <div>
              <p className="text-xs text-zinc-600">E-mail</p>
              <p className="mt-1 text-sm text-zinc-300">{user.email}</p>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#121214] p-5">
          <div>
            <h2 className="font-semibold">Tema da interface</h2>

            <p className="mt-1 text-sm text-zinc-500">
              Escolha como a SoulUp será exibida para você.
            </p>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {themes.map((item) => {
              const selected = theme === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTheme(item.id)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    selected
                      ? "border-purple-500 bg-purple-500/10"
                      : "border-white/10 bg-white/[.02] hover:bg-white/[.05]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{item.name}</span>

                    <span
                      className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                        selected
                          ? "border-purple-400"
                          : "border-zinc-600"
                      }`}
                    >
                      {selected && (
                        <span className="h-2.5 w-2.5 rounded-full bg-purple-400" />
                      )}
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-zinc-500">
                    {item.description}
                  </p>

                  <div className="mt-4 grid grid-cols-3 gap-1">
                    <span
                      className={`h-8 rounded ${
                        item.id === "light"
                          ? "border border-zinc-300 bg-white"
                          : item.id === "medium"
                            ? "bg-zinc-600"
                            : "bg-zinc-950"
                      }`}
                    />

                    <span
                      className={`h-8 rounded ${
                        item.id === "light"
                          ? "bg-zinc-100"
                          : item.id === "medium"
                            ? "bg-zinc-800"
                            : "bg-zinc-900"
                      }`}
                    />

                    <span className="h-8 rounded bg-purple-500" />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-xl border border-lime-400/10 bg-lime-400/[.03] p-4">
            <p className="text-xs font-semibold text-lime-400">
              Tema selecionado
            </p>

            <p className="mt-1 text-sm text-zinc-400">
              {themes.find((item) => item.id === theme)?.name}
            </p>
          </div>
        </section>

        <section className="rounded-2xl border border-red-500/10 bg-[#121214] p-5">
          <h2 className="font-semibold">Sessão</h2>

          <p className="mt-2 text-sm text-zinc-500">
            Você está conectado como{" "}
            <span className="font-semibold text-zinc-300">
              {user.name}
            </span>
            .
          </p>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-4 rounded-xl border border-red-500/20 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
          >
            Sair da conta
          </button>
        </section>
      </div>
    </div>
  );
}