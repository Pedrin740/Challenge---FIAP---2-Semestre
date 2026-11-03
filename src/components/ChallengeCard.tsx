import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import {
  buscarMeusDesafios,
  type DesafioUsuario,
} from "../services/userApi";
import { Icon } from "./Icons";

export function ChallengeCard() {
  const { user, isLoading } = useAuth();
  const [desafios, setDesafios] = useState<DesafioUsuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function carregarDesafios() {
      if (isLoading) {
        return;
      }

      if (!user) {
        setDesafios([]);
        setCarregando(false);
        return;
      }

      const token = localStorage.getItem("ecorank_token");

      if (!token) {
        setDesafios([]);
        setCarregando(false);
        return;
      }

      try {
        setCarregando(true);
        setErro(false);

        const dados = await buscarMeusDesafios(token);

        if (ativo) {
          setDesafios(dados);
        }
      } catch (error) {
        console.error("Erro ao carregar o desafio em destaque:", error);

        if (ativo) {
          setErro(true);
          setDesafios([]);
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
  }, [user, isLoading]);

  if (isLoading || carregando) {
    return (
      <section className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-950/35 to-[#121214] p-5">
        <p className="text-sm text-zinc-400">
          Carregando desafio...
        </p>
      </section>
    );
  }

  if (!user) {
    return null;
  }

  const desafio =
    desafios.find((item) => item.participando && !item.concluido) ??
    desafios.find((item) => !item.concluido) ??
    desafios[0];

  if (!desafio) {
    return (
      <section className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-950/35 to-[#121214] p-5">
        <div className="flex items-center gap-2 text-sm font-semibold text-purple-300">
          <Icon name="target" size={18} />
          Desafio da semana
        </div>

        <h2 className="mt-4 text-xl font-bold">
          {erro ? "Não foi possível carregar os desafios" : "Nenhum desafio disponível"}
        </h2>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          {erro
            ? "Tente novamente mais tarde para consultar os desafios."
            : "Novos desafios estarão disponíveis em breve."}
        </p>

        <Link
          to="/ecorank/desafios"
          className="mt-4 inline-flex rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-bold transition hover:bg-purple-500"
        >
          Ver desafios
        </Link>
      </section>
    );
  }

  const progresso = Math.min(100, Math.max(0, desafio.progresso));

  return (
    <section className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-950/35 to-[#121214] p-5">
      <div className="flex items-start justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 text-sm font-semibold text-purple-300">
            <Icon name="target" size={18} />
            Desafio da semana
          </div>

          <h2 className="mt-4 text-xl font-bold">
            {desafio.titulo}
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            {desafio.descricao}
          </p>

          <p className="mt-4 text-lg font-bold text-lime-400">
            +{desafio.recompensa} pontos
          </p>

          <div className="mt-4">
            <div className="flex justify-between text-xs text-zinc-500">
              <span>Progresso</span>
              <span>{progresso}%</span>
            </div>

            <div className="mt-2 h-2 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-lime-400 transition-all"
                style={{ width: `${progresso}%` }}
              />
            </div>
          </div>

          <Link
            to="/ecorank/desafios"
            className="mt-4 inline-flex rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-bold transition hover:bg-purple-500"
          >
            {desafio.participando ? "Ver desafio" : "Participar"}
          </Link>
        </div>

        <div className="hidden h-24 w-24 items-center justify-center rounded-full bg-lime-400/10 text-lime-400 sm:flex">
          <Icon name="leaf" size={50} />
        </div>
      </div>
    </section>
  );
}