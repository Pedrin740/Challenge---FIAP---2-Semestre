import { api } from "./api";

export type MissaoUsuario = {
  id: number;
  idUsuario: number;
  descricao: string;
  objetivo: number;
  progresso: number;
  recompensa: number;
  prazo: string;
};

export function buscarMinhasMissoes(
  token: string,
  idUsuario: number,
): Promise<MissaoUsuario[]> {
  return api<MissaoUsuario[]>(
    `/api/v1/missoes/usuario/${idUsuario}`,
    { token },
  );
}