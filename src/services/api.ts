import { useEffect, useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import {
  atualizarObjetivo,
  buscarMeusObjetivos,
  criarObjetivo,
  excluirObjetivo,
  type ObjetivoUsuario,
} from "../services/userApi";

type FormularioObjetivo = {
  titulo: string;
  descricao: string;
  meta: number;
};

const formularioInicial: FormularioObjetivo = {
  titulo: "",
  descricao: "",
  meta: 10,
};

export function MeusObjetivos() {
  const { user, isLoading } = useAuth();

  const [objetivos, setObjetivos] = useState<ObjetivoUsuario[]>([]);
  const [formulario, setFormulario] = useState(formularioInicial);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarObjetivos() {
      const token = localStorage.getItem("ecorank_token");

      if (!token) {
        if (ativo) {
          setCarregando(false);
        }
        return;
      }

      try {
        const dados = await buscarMeusObjetivos(token);

        if (ativo) {
          setObjetivos(dados);
        }
      } catch (error) {
        console.error("Erro ao carregar objetivos:", error);

        if (ativo) {
          setErro("Não foi possível carregar seus objetivos.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    void carregarObjetivos();

    return () => {
      ativo = false;
    };
  }, []);

  async function handleCriarObjetivo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const token = localStorage.getItem("ecorank_token");

    if (!token) {
      setErro("Sua sessão expirou. Entre novamente.");
      return;
    }

    if (!formulario.titulo.trim() || !formulario.descricao.trim()) {
      setErro("Preencha o título e a descrição.");
      return;
    }

    if (!Number.isInteger(formulario.meta) || formulario.meta <= 0) {
      setErro("A meta precisa ser um número inteiro maior que zero.");
      return;
    }

    try {
      setErro("");
      setMensagem("");
      setSalvando(true);

      const novoObjetivo = await criarObjetivo(token, {
        titulo: formulario.titulo.trim(),
        descricao: formulario.descricao.trim(),
        meta: formulario.meta,
        progresso: 0,
      });

      setObjetivos((atuais) => [...atuais, novoObjetivo]);
      setFormulario(formularioInicial);
      setMensagem("Objetivo criado com sucesso!");
    } catch (error) {
      console.error("Erro ao criar objetivo:", error);
      setErro("Não foi possível criar o objetivo.");
    } finally {
      setSalvando(false);
    }
  }

  async function handleAtualizarProgresso(objetivo: ObjetivoUsuario) {
    const token = localStorage.getItem("ecorank_token");

    if (!token) {
      setErro("Sua sessão expirou. Entre novamente.");
      return;
    }

    const novoProgresso = Math.min(
      objetivo.progresso + 1,
      objetivo.meta,
    );

    try {
      setErro("");
      setMensagem("");

      const atualizado = await atualizarObjetivo(
        token,
        objetivo.id,
        {
          titulo: objetivo.titulo,
          descricao: objetivo.descricao,
          meta: objetivo.meta,
          progresso: novoProgresso,
        },
      );

      setObjetivos((atuais) =>
        atuais.map((item) =>
          item.id === atualizado.id ? atualizado : item,
        ),
      );

      setMensagem("Progresso atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar objetivo:", error);
      setErro("Não foi possível atualizar o progresso.");
    }
  }

  async function handleExcluirObjetivo(id: number) {
    const token = localStorage.getItem("ecorank_token");

    if (!token) {
      setErro("Sua sessão expirou. Entre novamente.");
      return;
    }

    try {
      setErro("");
      setMensagem("");

      await excluirObjetivo(token, id);

      setObjetivos((atuais) =>
        atuais.filter((item) => item.id !== id),
      );

      setMensagem("Objetivo excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir objetivo:", error);
      setErro("Não foi possível excluir o objetivo.");
    }
  }

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
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="mx-auto max-w-[1000px] p-4 pb-24 sm:p-6 lg:p-8">
      <div>
        <p className="text-sm text-zinc-500">
          EcoRank
        </p>

        <h1 className="mt-1 text-3xl font-bold">
          Meus objetivos
        </h1>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Crie metas pessoais e acompanhe seu progresso.
        </p>
      </div>

      {erro && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400"
        >
          {erro}
        </p>
      )}

      {mensagem && (
        <p
          role="status"
          className="mt-4 rounded-xl border border-lime-400/20 bg-lime-400/[.05] p-4 text-sm text-lime-400"
        >
          {mensagem}
        </p>
      )}

      <section className="mt-6 rounded-2xl border border-white/10 bg-[#121214] p-5">
        <h2 className="text-lg font-bold">
          Criar novo objetivo
        </h2>

        <form
          onSubmit={handleCriarObjetivo}
          className="mt-4 space-y-4"
        >
          <div>
            <label
              htmlFor="titulo"
              className="mb-2 block text-sm font-semibold"
            >
              Título
            </label>

            <input
              id="titulo"
              type="text"
              value={formulario.titulo}
              onChange={(event) =>
                setFormulario((atual) => ({
                  ...atual,
                  titulo: event.target.value,
                }))
              }
              maxLength={100}
              required
              placeholder="Ex.: Economizar água"
              className="w-full rounded-xl border border-white/10 bg-[#0c0c0e] px-4 py-3 text-sm text-white outline-none focus:border-lime-400/50"
            />
          </div>

          <div>
            <label
              htmlFor="descricao"
              className="mb-2 block text-sm font-semibold"
            >
              Descrição
            </label>

            <textarea
              id="descricao"
              value={formulario.descricao}
              onChange={(event) =>
                setFormulario((atual) => ({
                  ...atual,
                  descricao: event.target.value,
                }))
              }
              maxLength={250}
              rows={3}
              required
              placeholder="Descreva o que você pretende alcançar..."
              className="w-full resize-none rounded-xl border border-white/10 bg-[#0c0c0e] px-4 py-3 text-sm text-white outline-none focus:border-lime-400/50"
            />
          </div>

          <div>
            <label
              htmlFor="meta"
              className="mb-2 block text-sm font-semibold"
            >
              Meta
            </label>

            <input
              id="meta"
              type="number"
              min={1}
              step={1}
              value={formulario.meta}
              onChange={(event) =>
                setFormulario((atual) => ({
                  ...atual,
                  meta: Number(event.target.value),
                }))
              }
              required
              className="w-full rounded-xl border border-white/10 bg-[#0c0c0e] px-4 py-3 text-sm text-white outline-none focus:border-lime-400/50"
            />
          </div>

          <button
            type="submit"
            disabled={salvando}
            className="rounded-lg bg-lime-400 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {salvando ? "Salvando..." : "Criar objetivo"}
          </button>
        </form>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-bold">
          Objetivos cadastrados
        </h2>

        {carregando ? (
          <p className="mt-5 text-sm text-zinc-500">
            Carregando objetivos...
          </p>
        ) : objetivos.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {objetivos.map((objetivo) => {
              const percentual = Math.min(
                Math.round(
                  (objetivo.progresso / objetivo.meta) * 100,
                ),
                100,
              );

              const concluido = objetivo.progresso >= objetivo.meta;

              return (
                <article
                  key={objetivo.id}
                  className="rounded-2xl border border-white/10 bg-[#121214] p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-lime-400">
                        Objetivo pessoal
                      </p>

                      <h3 className="mt-2 text-xl font-bold">
                        {objetivo.titulo}
                      </h3>
                    </div>

                    <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300">
                      Privado
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {objetivo.descricao}
                  </p>

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500">
                        Progresso
                      </span>

                      <span className="font-semibold text-zinc-300">
                        {objetivo.progresso}/{objetivo.meta}
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-lime-400 transition-all"
                        style={{ width: `${percentual}%` }}
                      />
                    </div>

                    <p className="mt-2 text-xs text-zinc-500">
                      {percentual}% concluído
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => void handleAtualizarProgresso(objetivo)}
                      disabled={concluido}
                      className="rounded-lg bg-lime-400 px-4 py-2.5 text-xs font-bold text-zinc-950 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {concluido ? "Concluído" : "Avançar progresso"}
                    </button>

                    <button
                      type="button"
                      onClick={() => void handleExcluirObjetivo(objetivo.id)}
                      className="rounded-lg border border-red-500/20 px-4 py-2.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/10"
                    >
                      Excluir
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p className="mt-4 rounded-xl border border-white/10 bg-[#121214] p-6 text-center text-sm text-zinc-500">
            Você ainda não cadastrou objetivos.
          </p>
        )}
      </section>
    </div>
  );
}