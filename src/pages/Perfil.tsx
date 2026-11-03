
import { useState } from "react";
import {
  Link,
  Navigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export function Perfil() {
  const {
    user,
    logout,
    updateProfile,
  } = useAuth();

  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  const usuario = user;
  const ecoRank = usuario.ecoRank;

  function iniciarEdicao() {
    setNome(usuario.name);
    setEmail(usuario.email);
    setMensagem("");
    setEditando(true);
  }

  async function salvarAlteracoes(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setMensagem("");
    setCarregando(true);

    const sucesso = await updateProfile({
      nome,
      email,
    });

    setCarregando(false);

    if (sucesso) {
      setEditando(false);
      setMensagem("Dados atualizados com sucesso!");
    } else {
      setMensagem(
        "Não foi possível atualizar seus dados. Verifique as informações e tente novamente.",
      );
    }
  }

  return (
    <div className="mx-auto max-w-[1000px] p-4 pb-24 sm:p-6 lg:p-8">
      <section className="rounded-3xl border border-white/10 bg-[#121214] p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-200 text-2xl font-bold text-zinc-900">
              {usuario.name.charAt(0)}
            </div>

            <div>
              <p className="text-sm text-zinc-500">
                Minha conta
              </p>

              <h1 className="mt-1 text-3xl font-bold">
                {usuario.name}
              </h1>

              <p className="mt-1 text-sm text-zinc-400">
                {usuario.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={iniciarEdicao}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/[.04] hover:text-white"
            >
              Editar perfil
            </button>

            <button
              type="button"
              onClick={logout}
              className="rounded-xl border border-red-500/20 px-5 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
            >
              Sair da conta
            </button>
          </div>
        </div>
      </section>

      {editando && (
        <section className="mt-5 rounded-3xl border border-white/10 bg-[#121214] p-6">
          <h2 className="text-xl font-bold">
            Editar meus dados
          </h2>

          <form
            onSubmit={salvarAlteracoes}
            className="mt-5 space-y-4"
          >
            <div>
              <label
                htmlFor="nome"
                className="mb-2 block text-sm text-zinc-400"
              >
                Nome
              </label>

              <input
                id="nome"
                type="text"
                value={nome}
                onChange={(event) =>
                  setNome(event.target.value)
                }
                maxLength={100}
                required
                className="w-full rounded-xl border border-white/10 bg-[#1b1b1e] px-4 py-3 text-white outline-none focus:border-lime-400"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm text-zinc-400"
              >
                E-mail
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                maxLength={100}
                required
                className="w-full rounded-xl border border-white/10 bg-[#1b1b1e] px-4 py-3 text-white outline-none focus:border-lime-400"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={carregando}
                className="rounded-xl bg-lime-400 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {carregando
                  ? "Salvando..."
                  : "Salvar alterações"}
              </button>

              <button
                type="button"
                disabled={carregando}
                onClick={() => {
                  setEditando(false);
                  setMensagem("");
                }}
                className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-white/[.04]"
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      )}

      {mensagem && (
        <p
          role="status"
          className="mt-4 text-sm text-lime-400"
        >
          {mensagem}
        </p>
      )}

      <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/10 bg-[#121214] p-5">
          <p className="text-sm text-zinc-500">
            Pontos
          </p>

          <p className="mt-2 text-3xl font-bold">
            {ecoRank.points.toLocaleString("pt-BR")}
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
