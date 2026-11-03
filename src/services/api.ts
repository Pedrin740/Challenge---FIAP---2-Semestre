import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { EcoRankHeader } from "../components/EcoRankHeader";
import { Icon } from "../components/Icons";

import {
  buscarMeusDesafios,
  participarDesafio,
  type DesafioUsuario,
} from "../services/userApi";

export function Challenges() {
  const { user, isLoading } = useAuth();

  const [desafios, setDesafios] = useState<DesafioUsuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [participandoId, setParticipandoId] = useState<number | null>(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarDesafios() {
      const token = localStorage.getItem("ecorank_token");

      if (!token) {
        if (ativo) {
          setCarregando(false);
        }
        return;
      }

      try {
        const dados = await buscarMeusDesafios(token);

        if (ativo) {
          setDesafios(dados);
        }
      } catch (error) {
        console.error("Erro ao carregar desafios:", error);

        if (ativo) {
          setErro("Não foi possível carregar seus desafios.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    void carregarDesafios();

    return () => {
      ativo = false;
    };
  }, []);

  async function handleParticipar(id: number) {
    const token = localStorage.getItem("ecorank_token");

    if (!token) {
      setErro("Sua sessão expirou. Entre novamente.");
      return;
    }

    try {
      setErro("");
      setParticipandoId(id);

      const dadosAtualizados = await participarDesafio(token, id);

      setDesafios(dadosAtualizados);
    } catch (error) {
      console.error("Erro ao participar do desafio:", error);
      setErro("Não foi possível participar deste desafio.");
    } finally {
      setParticipandoId(null);
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
    <div className="mx-auto max-w-[1050px] p-4 pb-24 sm:p-6 lg:p-8">
      <EcoRankHeader
        title="Desafios"
        subtitle="Participe, pontue e avance no EcoRank."
      />

      {erro && (
        <p
          role="alert"
          className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400"
        >
          {erro}
        </p>
      )}

      {carregando ? (
        <p className="mt-6 text-center text-sm text-zinc-500">
          Carregando desafios...
        </p>
      ) : desafios.length > 0 ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {desafios.map((desafio) => (
            <section
              key={desafio.id}
              className="rounded-2xl border border-white/10 bg-[#121214] p-5"
            >
              <div className="flex items-center gap-2 text-sm text-purple-300">
                <Icon name="target" size={18} />

                {desafio.concluido
                  ? "Desafio concluído"
                  : desafio.participando
                    ? "Desafio ativo"
                    : "Desafio disponível"}
              </div>

              <h2 className="mt-4 text-xl font-bold">
                {desafio.titulo}
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {desafio.descricao}
              </p>

              <div className="mt-5 flex flex-wrap justify-between gap-2 text-xs">
                <span className="font-bold text-lime-400">
                  +{desafio.recompensa} pontos
                </span>

                <span className="text-zinc-500">
                  {desafio.acoesRealizadas}/{desafio.metaAcoes} ações
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-lime-400 transition-all"
                  style={{
                    width: `${Math.max(0, Math.min(100, desafio.progresso))}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-right text-xs text-zinc-500">
                {desafio.progresso}% concluído
              </p>

              {desafio.concluido ? (
                <p className="mt-5 text-sm font-semibold text-lime-400">
                  Você concluiu este desafio!
                </p>
              ) : desafio.participando ? (
                <Link
                  to="/ecorank/enviar"
                  className="mt-5 inline-flex rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-bold transition hover:bg-purple-500"
                >
                  Registrar ação
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => void handleParticipar(desafio.id)}
                  disabled={participandoId !== null}
                  className="mt-5 inline-flex rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-bold transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {participandoId === desafio.id
                    ? "Participando..."
                    : "Participar"}
                </button>
              )}
            </section>
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-xl border border-white/10 bg-[#121214] p-6 text-center text-sm text-zinc-500">
          Nenhum desafio disponível no momento.
        </p>
      )}
    </div>
  );
}