// ==========================================
// 1. src/services/userApi.ts (Commit 16)
// ==========================================

import { api } from "./api";

export type AcaoUsuario = {
  id: number;
  idUsuario: number;
  categoria: string;
  descricao: string;
  linkEvidencia: string;
  status: string;
  pontos: number;
  data: string;
};

export type ResultadoEnvioAcao = {
  idAcao: number;
  status: string;
  pontosGanhos: number;
  bonus: number;
  pontosTotais: number;
  nivel: string;
};

export type DesafioUsuario = {
  id: number;
  titulo: string;
  descricao: string;
  recompensa: number;
  categoria: string;
  metaAcoes: number;
  participando: boolean;
  concluido: boolean;
  acoesRealizadas: number;
  progresso: number;
};

export type ObjetivoUsuario = {
  id: number;
  titulo: string;
  descricao: string;
  meta: number;
  progresso: number;
};

export type DadosObjetivo = {
  titulo: string;
  descricao: string;
  meta: number;
  progresso: number;
};

export function buscarMinhasAcoes(token: string) {
  return api<AcaoUsuario[]>(
    "/api/v1/acoes/me",
    { token },
  );
}

export function enviarAcao(
  token: string,
  dados: {
    codigo: string;
    descricao: string;
    arquivo: File;
  },
) {
  const formulario = new FormData();

  formulario.append("codigo", dados.codigo);
  formulario.append("descricao", dados.descricao);
  formulario.append("arquivo", dados.arquivo);

  return api<ResultadoEnvioAcao>(
    "/api/v1/acoes/enviar",
    {
      method: "POST",
      token,
      body: formulario,
    },
  );
}

export function buscarMeusDesafios(token: string) {
  return api<DesafioUsuario[]>(
    "/api/v1/desafios/me",
    { token },
  );
}

export function participarDesafio(
  token: string,
  id: number,
) {
  return api<DesafioUsuario[]>(
    `/api/v1/desafios/${id}/participar`,
    {
      method: "POST",
      token,
    },
  );
}

export function buscarMeusObjetivos(token: string) {
  return api<ObjetivoUsuario[]>(
    "/api/v1/objetivos",
    { token },
  );
}

export function criarObjetivo(
  token: string,
  dados: DadosObjetivo,
) {
  return api<ObjetivoUsuario>(
    "/api/v1/objetivos",
    {
      method: "POST",
      token,
      body: dados,
    },
  );
}

export function atualizarObjetivo(
  token: string,
  id: number,
  dados: DadosObjetivo,
) {
  return api<ObjetivoUsuario>(
    `/api/v1/objetivos/${id}`,
    {
      method: "PUT",
      token,
      body: dados,
    },
  );
}

export function excluirObjetivo(
  token: string,
  id: number,
) {
  return api<void>(
    `/api/v1/objetivos/${id}`,
    {
      method: "DELETE",
      token,
    },
  );
}


// ==========================================
// 2. src/pages/SubmitAction.tsx (Commit 17)
// ==========================================

import { useEffect, useState, type ChangeEvent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { EcoRankHeader } from "../components/EcoRankHeader";
import { Icon } from "../components/Icons";
import { buscarCatalogoAcoes, type CatalogoAcao } from "../services/publicApi";
import { enviarAcao, type ResultadoEnvioAcao } from "../services/userApi";

type FormData = {
  action: string;
  description: string;
  proof: FileList;
};

function validateVideoDuration(file: File): Promise<boolean | string> {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    const objectUrl = URL.createObjectURL(file);

    video.preload = "metadata";

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(objectUrl);

      if (!Number.isFinite(video.duration)) {
        resolve("Não foi possível identificar a duração do vídeo.");
        return;
      }

      if (video.duration > 45) {
        resolve("O vídeo deve ter no máximo 45 segundos.");
        return;
      }

      resolve(true);
    };

    video.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve("Não foi possível carregar este vídeo.");
    };

    video.src = objectUrl;
  });
}

async function validateProof(files: FileList | undefined): Promise<boolean | string> {
  const file = files?.[0];

  if (!file) {
    return "Envie uma foto ou um vídeo.";
  }

  if (file.type.startsWith("image/")) {
    return true;
  }

  if (file.type.startsWith("video/")) {
    return validateVideoDuration(file);
  }

  return "Envie somente uma foto ou um vídeo.";
}

export function SubmitAction() {
  const { user, isLoading } = useAuth();
  const [catalogo, setCatalogo] = useState<CatalogoAcao[]>([]);
  const [carregandoCatalogo, setCarregandoCatalogo] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resultado, setResultado] = useState<ResultadoEnvioAcao | null>(null);
  const [erroApi, setErroApi] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormData>();

  const selectedActionId = watch("action");
  const selectedAction = catalogo.find((action) => action.codigo === selectedActionId);

  useEffect(() => {
    let ativo = true;

    async function carregarCatalogo() {
      try {
        const dados = await buscarCatalogoAcoes();
        if (ativo) {
          setCatalogo(dados);
        }
      } catch (error) {
        console.error("Erro ao carregar catálogo:", error);
        if (ativo) {
          setErroApi("Não foi possível carregar o catálogo de ações.");
        }
      } finally {
        if (ativo) {
          setCarregandoCatalogo(false);
        }
      }
    }

    void carregarCatalogo();

    return () => {
      ativo = false;
    };
  }, []);

  const proofRegister = register("proof", {
    required: "Envie uma foto ou um vídeo.",
    validate: validateProof,
  });

  const submit: SubmitHandler<FormData> = async (data) => {
    const acao = catalogo.find((item) => item.codigo === data.action);
    const arquivo = data.proof?.[0];
    const token = localStorage.getItem("ecorank_token");

    if (!acao || !arquivo || !token) {
      setErroApi("Confira os dados do formulário e tente novamente.");
      return;
    }

    try {
      setErroApi("");
      setResultado(null);

      const resposta = await enviarAcao(token, {
        codigo: acao.codigo,
        descricao: data.description,
        arquivo,
      });

      setResultado(resposta);
      reset();
      setSelectedFile(null);
    } catch (error) {
      console.error("Erro ao enviar ação:", error);
      setErroApi("Não foi possível enviar sua ação. Tente novamente.");
    }
  };

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    void proofRegister.onChange(event);
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-zinc-400">Carregando sua conta...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-zinc-300">Entre na sua conta para enviar uma ação.</p>
        <Link to="/login" className="mt-4 inline-block text-sm font-semibold text-lime-400">
          Ir para o login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[850px] p-4 pb-24 sm:p-6 lg:p-8">
      <EcoRankHeader title="Enviar ação" subtitle="Registre uma prática sustentável realizada por você." />

      <form onSubmit={handleSubmit(submit)} className="mt-4 rounded-2xl border border-white/10 bg-[#121214] p-5 sm:p-7">
        <div className="space-y-5">
          <div>
            <label htmlFor="action" className="text-sm font-semibold">Ação realizada</label>
            <select
              id="action"
              {...register("action", { required: "Selecione uma ação." })}
              disabled={carregandoCatalogo || catalogo.length === 0}
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#0c0c0e] px-4 py-3 text-sm text-white outline-none focus:border-lime-400/50 disabled:opacity-50"
            >
              <option value="">{carregandoCatalogo ? "Carregando ações..." : "Selecione uma ação"}</option>
              {catalogo.map((action) => (
                <option key={action.id} value={action.codigo}>
                  {action.rotulo} — +{action.pontos} pontos
                </option>
              ))}
            </select>
            {errors.action && <p className="mt-1 text-xs text-red-400">{errors.action.message}</p>}
            {selectedAction && (
              <div className="mt-3 rounded-xl border border-lime-400/10 bg-lime-400/[.03] px-4 py-3">
                <p className="text-xs text-zinc-500">Categoria</p>
                <p className="mt-1 text-sm font-semibold text-zinc-300">{selectedAction.categoria}</p>
                <p className="mt-2 text-sm font-bold text-lime-400">+{selectedAction.pontos} pontos previstos</p>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="description" className="text-sm font-semibold">Descrição</label>
            <textarea
              id="description"
              rows={5}
              placeholder="Conte como foi sua ação..."
              {...register("description", {
                required: "Descreva a ação.",
                minLength: { value: 10, message: "Digite pelo menos 10 caracteres." },
                maxLength: { value: 180, message: "Máximo de 180 caracteres." },
              })}
              className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-[#0c0c0e] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-lime-400/50"
            />
            {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>}
          </div>

          <div>
            <label htmlFor="proof" className="text-sm font-semibold">Comprovação</label>
            <label
              htmlFor="proof"
              className="mt-2 flex min-h-[190px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[.02] px-5 text-center transition hover:border-lime-400/40"
            >
              <Icon name="camera" size={36} className="text-lime-400" />
              <span className="mt-3 text-sm font-semibold">Adicionar foto ou vídeo</span>
              <span className="mt-1 text-xs text-zinc-500">Vídeos devem ter no máximo 45 segundos.</span>
              {selectedFile && (
                <span className="mt-4 max-w-full truncate rounded-lg bg-white/[.04] px-3 py-2 text-xs text-zinc-300">
                  {selectedFile.name}
                </span>
              )}
              <input
                id="proof"
                type="file"
                accept="image/*,video/*"
                className="sr-only"
                {...proofRegister}
                onChange={handleFileChange}
              />
            </label>
            {errors.proof && <p className="mt-1 text-xs text-red-400">{errors.proof.message as string}</p>}
          </div>

          {erroApi && (
            <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
              {erroApi}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link to="/ecorank" className="rounded-lg border border-white/10 px-5 py-3 text-center text-sm font-semibold text-zinc-300 transition hover:bg-white/[.03]">
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || carregandoCatalogo}
              className="rounded-lg bg-lime-400 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Enviando..." : "Enviar ação"}
            </button>
          </div>

          {resultado && (
            <div className="rounded-xl border border-lime-400/20 bg-lime-400/[.05] p-5">
              <div className="flex items-center gap-2 text-lime-300">
                <Icon name="check" size={19} />
                <span className="text-sm font-semibold">Ação enviada com sucesso!</span>
              </div>
              <p className="mt-2 text-sm text-zinc-400">Pontos recebidos: <strong className="text-lime-400">+{resultado.pontosGanhos}</strong></p>
              <p className="mt-1 text-sm text-zinc-400">Status: {resultado.status}</p>
              <p className="mt-1 text-sm text-zinc-400">Pontuação total: {resultado.pontosTotais}</p>
              <p className="mt-1 text-sm text-zinc-400">Nível atual: {resultado.nivel}</p>
              <button
                type="button"
                onClick={() => navigate("/ecorank")}
                className="mt-4 rounded-lg bg-lime-400 px-4 py-2.5 text-sm font-bold text-zinc-950 transition hover:bg-lime-300"
              >
                Ver meu EcoRank
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}


// ==========================================
// 3. src/pages/Challenges.tsx (Commit 18)
// ==========================================

import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { EcoRankHeader } from "../components/EcoRankHeader";
import { Icon } from "../components/Icons";
import { buscarMeusDesafios, participarDesafio, type DesafioUsuario } from "../services/userApi";

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
        if (ativo) setCarregando(false);
        return;
      }

      try {
        const dados = await buscarMeusDesafios(token);
        if (ativo) setDesafios(dados);
      } catch (error) {
        console.error("Erro ao carregar desafios:", error);
        if (ativo) setErro("Não foi possível carregar seus desafios.");
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    void carregarDesafios();
    return () => { ativo = false; };
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
        <p className="text-sm text-zinc-400">Carregando sua conta...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="mx-auto max-w-[1050px] p-4 pb-24 sm:p-6 lg:p-8">
      <EcoRankHeader title="Desafios" subtitle="Participe, pontue e avance no EcoRank." />

      {erro && (
        <p role="alert" className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
          {erro}
        </p>
      )}

      {carregando ? (
        <p className="mt-6 text-center text-sm text-zinc-500">Carregando desafios...</p>
      ) : desafios.length > 0 ? (
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {desafios.map((desafio) => (
            <section key={desafio.id} className="rounded-2xl border border-white/10 bg-[#121214] p-5">
              <div className="flex items-center gap-2 text-sm text-purple-300">
                <Icon name="target" size={18} />
                {desafio.concluido ? "Desafio concluído" : desafio.participando ? "Desafio ativo" : "Desafio disponível"}
              </div>

              <h2 className="mt-4 text-xl font-bold">{desafio.titulo}</h2>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{desafio.descricao}</p>

              <div className="mt-5 flex flex-wrap justify-between gap-2 text-xs">
                <span className="font-bold text-lime-400">+{desafio.recompensa} pontos</span>
                <span className="text-zinc-500">{desafio.acoesRealizadas}/{desafio.metaAcoes} ações</span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-lime-400 transition-all"
                  style={{ width: `${Math.max(0, Math.min(100, desafio.progresso))}%` }}
                />
              </div>

              <p className="mt-2 text-right text-xs text-zinc-500">{desafio.progresso}% concluído</p>

              {desafio.concluido ? (
                <p className="mt-5 text-sm font-semibold text-lime-400">Você concluiu este desafio!</p>
              ) : desafio.participando ? (
                <Link to="/ecorank/enviar" className="mt-5 inline-flex rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-bold transition hover:bg-purple-500">
                  Registrar ação
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => void handleParticipar(desafio.id)}
                  disabled={participandoId !== null}
                  className="mt-5 inline-flex rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-bold transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {participandoId === desafio.id ? "Participando..." : "Participar"}
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


// ==========================================
// 4. src/pages/MeusObjetivos.tsx (Commit 19)
// ==========================================

import { useEffect, useState, type FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { atualizarObjetivo, buscarMeusObjetivos, criarObjetivo, excluirObjetivo, type ObjetivoUsuario } from "../services/userApi";

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
        if (ativo) setCarregando(false);
        return;
      }

      try {
        const dados = await buscarMeusObjetivos(token);
        if (ativo) setObjetivos(dados);
      } catch (error) {
        console.error("Erro ao carregar objetivos:", error);
        if (ativo) setErro("Não foi possível carregar seus objetivos.");
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    void carregarObjetivos();
    return () => { ativo = false; };
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

    const novoProgresso = Math.min(objetivo.progresso + 1, objetivo.meta);

    try {
      setErro("");
      setMensagem("");

      const atualizado = await atualizarObjetivo(token, objetivo.id, {
        titulo: objetivo.titulo,
        descricao: objetivo.descricao,
        meta: objetivo.meta,
        progresso: novoProgresso,
      });

      setObjetivos((atuais) =>
        atuais.map((item) => (item.id === atualizado.id ? atualizado : item))
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
      setObjetivos((atuais) => atuais.filter((item) => item.id !== id));
      setMensagem("Objetivo excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir objetivo:", error);
      setErro("Não foi possível excluir o objetivo.");
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-zinc-400">Carregando sua conta...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="mx-auto max-w-[1000px] p-4 pb-24 sm:p-6 lg:p-8">
      <div>
        <p className="text-sm text-zinc-500">EcoRank</p>
        <h1 className="mt-1 text-3xl font-bold">Meus objetivos</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-400">Crie metas pessoais e acompanhe seu progresso.</p>
      </div>

      {erro && <p role="alert" className="mt-4 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">{erro}</p>}
      {mensagem && <p role="status" className="mt-4 rounded-xl border border-lime-400/20 bg-lime-400/[.05] p-4 text-sm text-lime-400">{mensagem}</p>}

      <section className="mt-6 rounded-2xl border border-white/10 bg-[#121214] p-5">
        <h2 className="text-lg font-bold">Criar novo objetivo</h2>
        <form onSubmit={handleCriarObjetivo} className="mt-4 space-y-4">
          <div>
            <label htmlFor="titulo" className="mb-2 block text-sm font-semibold">Título</label>
            <input
              id="titulo"
              type="text"
              value={formulario.titulo}
              onChange={(event) => setFormulario((atual) => ({ ...atual, titulo: event.target.value }))}
              maxLength={100}
              required
              placeholder="Ex.: Economizar água"
              className="w-full rounded-xl border border-white/10 bg-[#0c0c0e] px-4 py-3 text-sm text-white outline-none focus:border-lime-400/50"
            />
          </div>

          <div>
            <label htmlFor="descricao" className="mb-2 block text-sm font-semibold">Descrição</label>
            <textarea
              id="descricao"
              value={formulario.descricao}
              onChange={(event) => setFormulario((atual) => ({ ...atual, descricao: event.target.value }))}
              maxLength={250}
              rows={3}
              required
              placeholder="Descreva o que você pretende alcançar..."
              className="w-full resize-none rounded-xl border border-white/10 bg-[#0c0c0e] px-4 py-3 text-sm text-white outline-none focus:border-lime-400/50"
            />
          </div>

          <div>
            <label htmlFor="meta" className="mb-2 block text-sm font-semibold">Meta</label>
            <input
              id="meta"
              type="number"
              min={1}
              step={1}
              value={formulario.meta}
              onChange={(event) => setFormulario((atual) => ({ ...atual, meta: Number(event.target.value) }))}
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
        <h2 className="text-xl font-bold">Objetivos cadastrados</h2>
        {carregando ? (
          <p className="mt-5 text-sm text-zinc-500">Carregando objetivos...</p>
        ) : objetivos.length > 0 ? (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {objetivos.map((objetivo) => {
              const percentual = Math.min(Math.round((objetivo.progresso / objetivo.meta) * 100), 100);
              const concluido = objetivo.progresso >= objetivo.meta;

              return (
                <article key={objetivo.id} className="rounded-2xl border border-white/10 bg-[#121214] p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-lime-400">Objetivo pessoal</p>
                      <h3 className="mt-2 text-xl font-bold">{objetivo.titulo}</h3>
                    </div>
                    <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-300">Privado</span>
                  </div>

                  <p className="mt-3 text-sm leading-6 text-zinc-400">{objetivo.descricao}</p>

                  <div className="mt-5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-500">Progresso</span>
                      <span className="font-semibold text-zinc-300">{objetivo.progresso}/{objetivo.meta}</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-lime-400 transition-all" style={{ width: `${percentual}%` }} />
                    </div>
                    <p className="mt-2 text-xs text-zinc-500">{percentual}% concluído</p>
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


// ==========================================
// 5. src/pages/SubmitAction.tsx (Commit 20 — Versão Final com Histórico)
// ==========================================

import { useEffect, useState, type ChangeEvent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { EcoRankHeader } from "../components/EcoRankHeader";
import { Icon } from "../components/Icons";
import { buscarCatalogoAcoes, type CatalogoAcao } from "../services/publicApi";
import { buscarMinhasAcoes, enviarAcao, type AcaoUsuario, type ResultadoEnvioAcao } from "../services/userApi";

type FormDataFinal = {
  action: string;
  description: string;
  proof: FileList;
};

export function SubmitActionFinal() {
  const { user, isLoading } = useAuth();
  const [catalogo, setCatalogo] = useState<CatalogoAcao[]>([]);
  const [acoes, setAcoes] = useState<AcaoUsuario[]>([]);
  const [carregandoCatalogo, setCarregandoCatalogo] = useState(true);
  const [carregandoHistorico, setCarregandoHistorico] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resultado, setResultado] = useState<ResultadoEnvioAcao | null>(null);
  const [erroApi, setErroApi] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<FormDataFinal>();

  const selectedActionId = watch("action");
  const selectedAction = catalogo.find((action) => action.codigo === selectedActionId);

  useEffect(() => {
    let ativo = true;

    async function carregarDados() {
      const token = localStorage.getItem("ecorank_token");

      try {
        const dadosCatalogo = await buscarCatalogoAcoes();
        if (ativo) setCatalogo(dadosCatalogo);
      } catch (error) {
        console.error("Erro ao carregar catálogo:", error);
        if (ativo) setErroApi("Não foi possível carregar o catálogo de ações.");
      } finally {
        if (ativo) setCarregandoCatalogo(false);
      }

      if (!token) {
        setCarregandoHistorico(false);
        return;
      }

      try {
        const dadosAcoes = await buscarMinhasAcoes(token);
        if (ativo) setAcoes(dadosAcoes);
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
        if (ativo) setErroApi("Não foi possível carregar seu histórico de ações.");
      } finally {
        if (ativo) setCarregandoHistorico(false);
      }
    }

    void carregarDados();
    return () => { ativo = false; };
  }, []);

  const proofRegister = register("proof", {
    required: "Envie uma foto ou um vídeo.",
    validate: validateProof,
  });

  const submit: SubmitHandler<FormDataFinal> = async (data) => {
    const acao = catalogo.find((item) => item.codigo === data.action);
    const arquivo = data.proof?.[0];
    const token = localStorage.getItem("ecorank_token");

    if (!acao || !arquivo || !token) {
      setErroApi("Confira os dados do formulário e tente novamente.");
      return;
    }

    try {
      setErroApi("");
      setResultado(null);

      const resposta = await enviarAcao(token, {
        codigo: acao.codigo,
        descricao: data.description,
        arquivo,
      });

      setResultado(resposta);
      reset();
      setSelectedFile(null);

      const historicoAtualizado = await buscarMinhasAcoes(token);
      setAcoes(historicoAtualizado);
    } catch (error) {
      console.error("Erro ao enviar ou atualizar histórico:", error);
      setErroApi("Não foi possível concluir a operação. Tente novamente.");
    }
  };

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    void proofRegister.onChange(event);
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm text-zinc-400">Carregando sua conta...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p className="text-zinc-300">Entre na sua conta para enviar uma ação.</p>
        <Link to="/login" className="mt-4 inline-block text-sm font-semibold text-lime-400">
          Ir para o login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[850px] p-4 pb-24 sm:p-6 lg:p-8">
      <EcoRankHeader title="Enviar ação" subtitle="Registre uma prática sustentável realizada por você." />

      <form onSubmit={handleSubmit(submit)} className="mt-4 rounded-2xl border border-white/10 bg-[#121214] p-5 sm:p-7">
        <div className="space-y-5">
          <div>
            <label htmlFor="action" className="text-sm font-semibold">Ação realizada</label>
            <select
              id="action"
              {...register("action", { required: "Selecione uma ação." })}
              disabled={carregandoCatalogo || catalogo.length === 0}
              className="mt-2 w-full rounded-xl border border-white/10 bg-[#0c0c0e] px-4 py-3 text-sm text-white outline-none focus:border-lime-400/50 disabled:opacity-50"
            >
              <option value="">{carregandoCatalogo ? "Carregando ações..." : "Selecione uma ação"}</option>
              {catalogo.map((action) => (
                <option key={action.id} value={action.codigo}>
                  {action.rotulo} — +{action.pontos} pontos
                </option>
              ))}
            </select>
            {errors.action && <p className="mt-1 text-xs text-red-400">{errors.action.message}</p>}
            {selectedAction && (
              <div className="mt-3 rounded-xl border border-lime-400/10 bg-lime-400/[.03] px-4 py-3">
                <p className="text-xs text-zinc-500">Categoria</p>
                <p className="mt-1 text-sm font-semibold text-zinc-300">{selectedAction.categoria}</p>
                <p className="mt-2 text-sm font-bold text-lime-400">+{selectedAction.pontos} pontos previstos</p>
              </div>
            )}
          </div>

          <div>
            <label htmlFor="description" className="text-sm font-semibold">Descrição</label>
            <textarea
              id="description"
              rows={5}
              placeholder="Conte como foi sua ação..."
              {...register("description", {
                required: "Descreva a ação.",
                minLength: { value: 10, message: "Digite pelo menos 10 caracteres." },
                maxLength: { value: 180, message: "Máximo de 180 caracteres." },
              })}
              className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-[#0c0c0e] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-lime-400/50"
            />
            {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>}
          </div>

          <div>
            <label htmlFor="proof" className="text-sm font-semibold">Comprovação</label>
            <label
              htmlFor="proof"
              className="mt-2 flex min-h-[190px] cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/[.02] px-5 text-center transition hover:border-lime-400/40"
            >
              <Icon name="camera" size={36} className="text-lime-400" />
              <span className="mt-3 text-sm font-semibold">Adicionar foto ou vídeo</span>
              <span className="mt-1 text-xs text-zinc-500">Vídeos devem ter no máximo 45 segundos.</span>
              {selectedFile && (
                <span className="mt-4 max-w-full truncate rounded-lg bg-white/[.04] px-3 py-2 text-xs text-zinc-300">
                  {selectedFile.name}
                </span>
              )}
              <input
                id="proof"
                type="file"
                accept="image/*,video/*"
                className="sr-only"
                {...proofRegister}
                onChange={handleFileChange}
              />
            </label>
            {errors.proof && <p className="mt-1 text-xs text-red-400">{errors.proof.message as string}</p>}
          </div>

          {erroApi && (
            <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-400">
              {erroApi}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link to="/ecorank" className="rounded-lg border border-white/10 px-5 py-3 text-center text-sm font-semibold text-zinc-300 transition hover:bg-white/[.03]">
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={isSubmitting || carregandoCatalogo}
              className="rounded-lg bg-lime-400 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-lime-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Enviando..." : "Enviar ação"}
            </button>
          </div>

          {resultado && (
            <div className="rounded-xl border border-lime-400/20 bg-lime-400/[.05] p-5">
              <div className="flex items-center gap-2 text-lime-300">
                <Icon name="check" size={19} />
                <span className="text-sm font-semibold">Ação enviada com sucesso!</span>
              </div>
              <p className="mt-2 text-sm text-zinc-400">Pontos recebidos: <strong className="text-lime-400">+{resultado.pontosGanhos}</strong></p>
              <p className="mt-1 text-sm text-zinc-400">Status: {resultado.status}</p>
              <p className="mt-1 text-sm text-zinc-400">Pontuação total: {resultado.pontosTotais}</p>
              <p className="mt-1 text-sm text-zinc-400">Nível atual: {resultado.nivel}</p>
              <button
                type="button"
                onClick={() => navigate("/ecorank")}
                className="mt-4 rounded-lg bg-lime-400 px-4 py-2.5 text-sm font-bold text-zinc-950 transition hover:bg-lime-300"
              >
                Ver meu EcoRank
              </button>
            </div>
          )}
        </div>
      </form>

      <section className="mt-6 rounded-2xl border border-white/10 bg-[#121214] p-5 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold">Histórico de ações</h2>
            <p className="mt-1 text-xs text-zinc-500">Consulte as ações enviadas pela sua conta.</p>
          </div>
          <span className="rounded-full bg-lime-400/10 px-3 py-1 text-xs font-semibold text-lime-400">
            {acoes.length} registros
          </span>
        </div>

        {carregandoHistorico ? (
          <p className="mt-5 text-sm text-zinc-500">Carregando histórico...</p>
        ) : acoes.length > 0 ? (
          <div className="mt-4 space-y-3">
            {acoes.map((acao) => (
              <article key={acao.id} className="rounded-xl border border-white/5 bg-white/[.02] p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="font-semibold">{acao.categoria}</h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-400">{acao.descricao}</p>
                    <p className="mt-2 text-xs text-zinc-500">
                      {new Date(`${acao.data}T00:00:00`).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                  <div className="shrink-0 sm:text-right">
                    <p className="font-bold text-lime-400">+{acao.pontos} pontos</p>
                    <span className="mt-2 inline-flex rounded-full bg-white/5 px-3 py-1 text-xs text-zinc-400">
                      {acao.status}
                    </span>
                  </div>
                </div>

                {acao.linkEvidencia && (
                  <a
                    href={acao.linkEvidencia}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-block text-xs font-semibold text-purple-300 hover:text-purple-200"
                  >
                    Ver comprovante
                  </a>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-5 rounded-xl border border-white/5 bg-white/[.02] p-5 text-center text-sm text-zinc-500">
            Você ainda não enviou nenhuma ação.
          </p>
        )}
      </section>
    </div>
  );
}