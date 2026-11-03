
import { api } from "./api";

// ==============================
// TIPOS
// ==============================

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

// ==============================
// AÇÕES DO USUÁRIO
// ==============================

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

// ==============================
// DESAFIOS DO USUÁRIO
// ==============================

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

// ==============================
// OBJETIVOS DO USUÁRIO
// ==============================

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
