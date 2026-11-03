import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { EcoRankHeader } from "../components/EcoRankHeader";
import {
  buscarMinhasConquistas,
  type ConquistaUsuario,
} from "../services/conquistaApi";

export function Conquistas() {
  const { user, isLoading } = useAuth();

  const [conquistas, setConquistas] = useState<ConquistaUsuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregar() {
      const token = localStorage.getItem("ecorank_token");

      if (!token || !user) {
        if (ativo) setCarregando(false);
        return;
      }

      try {
        const dados = await buscarMinhasConquistas(token, user.id);

        if (ativo) setConquistas(dados);
      } catch (error) {
        console.error("Erro ao carregar conquistas:", error);

        if (ativo) {
          setErro("Não foi possível carregar suas conquistas.");
        }
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    if (!isLoading && user) {
      void carregar();
    }

    return () => {
      ativo = false;
    };
  }, [user, isLoading]);

  if (isLoading) {
    return <p className="p-8 text-center text-zinc-400">Carregando...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="mx-auto max-w-[1100px] p-4 pb-24 sm:p-6 lg:p-8">
      <EcoRankHeader
        title="Minhas conquistas"
        subtitle="Confira as conquistas que você já desbloqueou."
      />

      {erro && (
        <p role="alert" className="mt-4 rounded-xl bg-red-500/10 p-4 text-sm text-red-400">
          {erro}
        </p>
      )}

      {carregando ? (
        <p className="mt-6 text-center text-sm text-zinc-400">
          Carregando conquistas...
        </p>
      ) : conquistas.length === 0 ? (
        !erro && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-[#121214] p-8 text-center">
            <h2 className="font-bold">Nenhuma conquista desbloqueada</h2>
            <p className="mt-2 text-sm text-zinc-500">
              Continue realizando ações sustentáveis para conquistar novos reconhecimentos.
            </p>
          </div>
        )
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {conquistas.map((conquista) => (
            <article
              key={conquista.id}
              className="rounded-2xl border border-white/10 bg-[#121214] p-5"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-400/10 text-2xl">
                🏆
              </div>

              <h2 className="mt-4 text-lg font-bold">
                {conquista.nome}
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {conquista.descricao}
              </p>

              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="text-xs text-zinc-500">
                  Data da conquista
                </p>
                <p className="mt-1 text-sm font-semibold text-lime-400">
                  {new Date(`${conquista.dataConquista}T00:00:00`).toLocaleDateString("pt-BR")}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}