import { api } from "./api";

export type ConquistaUsuario = {
  id: number;
  idUsuario: number;
  nome: string;
  descricao: string;
  dataConquista: string;
};

export function buscarMinhasConquistas(
  token: string,
  idUsuario: number,
): Promise<ConquistaUsuario[]> {
  return api<ConquistaUsuario[]>(
    `/api/v1/conquistas/usuario/${idUsuario}`,
    { token },
  );
}