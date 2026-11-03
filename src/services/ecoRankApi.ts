import { api } from "./api";

export type CategoriaResumoApi = {
  rotulo: string;
  quantidade: number;
  percentual: number;
};

export type ResumoEcoRankApi = {
  idUsuario: number;
  nome: string;
  pontos: number;
  acoes: number;
  nivel: string;
  multiplicador: number;
  proximoNivel: string;
  pontosNivelAtual: number;
  pontosProximoNivel: number;
  pontosRestantes: number;
  progressoNivel: number;
  posicao: number;
  totalUsuarios: number;
  pontosSemana: number;
  acoesSemana: number;
  co2Kg: number;
  categorias: CategoriaResumoApi[];
};

export type DiaPontosApi = {
  data: string;
  pontos: number;
  acumulado: number;
};

export type ImpactoApi = {
  co2Kg: number;
  totalAcoes: number;
  pontos: number;
  pontosIniciais: number;
  evolucao: DiaPontosApi[];
  categorias: CategoriaResumoApi[];
  metodologia: string;
};

export async function buscarResumoEcoRank(
  token: string,
): Promise<ResumoEcoRankApi> {
  return api<ResumoEcoRankApi>(
    "/api/v1/ecorank/me",
    { token },
  );
}

export async function buscarImpacto(
  token: string,
): Promise<ImpactoApi> {
  return api<ImpactoApi>(
    "/api/v1/impacto/me",
    { token },
  );
}