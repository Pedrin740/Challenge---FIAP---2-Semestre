import { api } from "./api";

export type DadosContato = {
  nome: string;
  email: string;
  motivo: string;
  mensagem: string;
};

export type ContatoResposta = {
  id: number;
  nome: string;
  email: string;
  motivo: string;
  mensagem: string;
  status: string;
};

export function enviarContato(
  dados: DadosContato,
): Promise<ContatoResposta> {
  return api<ContatoResposta>(
    "/api/v1/contato",
    {
      method: "POST",
      body: dados,
    },
  );
}