import { api } from "./api";

export type UsuarioAutenticado = {
  id: number;
  nome: string;
  email: string;
  pontos: number;
  nivel: string;
  recompensa: string;
};

export type SessaoAutenticacao = {
  token: string;
  usuario: UsuarioAutenticado;
};

type CadastroDados = {
  nome: string;
  email: string;
  senha: string;
};

type LoginDados = {
  email: string;
  senha: string;
};

type AtualizarPerfilDados = {
  id: number;
  nome: string;
  email: string;
  pontos: number;
  nivel: string;
  recompensa: string;
};

export async function cadastrarUsuario(
  dados: CadastroDados,
): Promise<SessaoAutenticacao> {
  return api<SessaoAutenticacao>(
    "/api/v1/auth/cadastro",
    { method: "POST", body: dados },
  );
}

export async function realizarLogin(
  dados: LoginDados,
): Promise<SessaoAutenticacao> {
  return api<SessaoAutenticacao>(
    "/api/v1/auth/login",
    { method: "POST", body: dados },
  );
}

export async function realizarLogout(token: string): Promise<void> {
  return api<void>(
    "/api/v1/auth/logout",
    { method: "POST", token },
  );
}

export async function buscarUsuarioAutenticado(
  token: string,
): Promise<UsuarioAutenticado> {
  return api<UsuarioAutenticado>(
    "/api/v1/usuarios/me",
    { token },
  );
}

export async function atualizarPerfil(
  token: string,
  dados: AtualizarPerfilDados,
): Promise<UsuarioAutenticado> {
  return api<UsuarioAutenticado>(
    "/api/v1/usuarios/me",
    {
      method: "PUT",
      token,
      body: dados,
    },
  );
}