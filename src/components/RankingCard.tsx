import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import {
  buscarRanking,
  type RankingItem,
} from "../services/publicApi";

export function RankingCard() {
  const { user } = useAuth();

  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;

    async function carregarRanking() {
      try {
        const dados = await buscarRanking();

        if (ativo) {
          setRanking(dados);
        }
      } catch (error) {
        console.error("Erro ao carregar ranking:", error);
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    void carregarRanking();

    return () => {
      ativo = false;
    };
  }, []);

  if (!user) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-[#121214] p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold">
            Ranking geral
          </h2>

          <p className="mt-1 text-xs text-zinc-500">
            Todos os usuários
          </p>
        </div>

        <Link
          to="/ecorank/ranking"
          className="text-xs font-semibold text-lime-400"
        >
          Ver completo
        </Link>
      </div>

      {carregando ? (
        <p className="py-6 text-center text-sm text-zinc-500">
          Carregando ranking...
        </p>
      ) : ranking.length > 0 ? (
        <div className="mt-3 divide-y divide-white/5">
          {ranking.slice(0, 5).map((item) => {
            const isCurrentUser =
              item.idUsuario === user.id;

            return (
              <div
                key={item.idUsuario}
                className={`flex items-center gap-3 py-3 ${
                  isCurrentUser
                    ? "rounded-xl bg-lime-400/[.07] px-2"
                    : ""
                }`}
              >
                <span className="w-4 text-xs text-zinc-500">
                  {item.posicao}
                </span>

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-xs font-bold">
                  {item.nome.charAt(0)}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm">
                    {item.nome}

                    {isCurrentUser && (
                      <span className="ml-2 text-[10px] text-lime-400">
                        (você)
                      </span>
                    )}
                  </p>

                  <p className="text-[10px] text-zinc-500">
                    {item.nivel}
                  </p>
                </div>

                <span className="text-xs font-semibold">
                  {item.pontos.toLocaleString("pt-BR")}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="py-6 text-center text-sm text-zinc-500">
          Nenhum usuário encontrado.
        </p>
      )}
    </section>
  );
}