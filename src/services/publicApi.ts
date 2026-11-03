import { api } from "./api";

// ==============================
// TIPOS DOS DADOS DA API
// ==============================

export type RankingItem = {
  posicao: number;
  idUsuario: number;
  nome: string;
  pontos: number;
  nivel: string;
};

export type CatalogoAcao = {
  id: number;
  codigo: string;
  rotulo: string;
  categoria: string;
  pontos: number;
  co2Kg: number;
};

export type Desafio = {
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

export type Nivel = {
  id: number;
  nome: string;
  pontosNecessarios: number;
  multiplicador: number;
};

export type Conteudo = {
  id: number;
  categoria: string;
  titulo: string;
  resumo: string;
  fonte: string;
  data: string;
  url: string;
};

// ==============================
// SERVIÇOS PÚBLICOS
// ==============================

// Ranking geral
export function buscarRanking() {
  return api<RankingItem[]>("/api/v1/ranking");
}

// Catálogo oficial de ações
export function buscarCatalogoAcoes() {
  return api<CatalogoAcao[]>("/api/v1/acoes/catalogo");
}

// Lista de desafios disponíveis
export function buscarDesafios() {
  return api<Desafio[]>("/api/v1/desafios");
}

// Lista de níveis
export function buscarNiveis() {
  return api<Nivel[]>("/api/v1/niveis");
}

// Lista de conteúdos
export function buscarConteudos(filtros?: {
  categoria?: string;
  busca?: string;
}) {
  const parametros = new URLSearchParams();

  if (filtros?.categoria) {
    parametros.set("categoria", filtros.categoria);
  }

  if (filtros?.busca) {
    parametros.set("busca", filtros.busca);
  }

  const query = parametros.toString();

  const endpoint = query
    ? `/api/v1/conteudos?${query}`
    : "/api/v1/conteudos";

  return api<Conteudo[]>(endpoint);
}