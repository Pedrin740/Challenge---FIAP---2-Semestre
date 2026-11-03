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

export type AtualizarUsuarioDados = {
  nome: string;
  email: string;
};

export async function cadastrarUsuario(
  dados: CadastroDados,
): Promise<SessaoAutenticacao> {
  return api<SessaoAutenticacao>(
    "/api/v1/auth/cadastro",
    {
      method: "POST",
      body: dados,
    },
  );
}

export async function realizarLogin(
  dados: LoginDados,
): Promise<SessaoAutenticacao> {
  return api<SessaoAutenticacao>(
    "/api/v1/auth/login",
    {
      method: "POST",
      body: dados,
    },
  );
}

export async function realizarLogout(
  token: string,
): Promise<void> {
  return api<void>(
    "/api/v1/auth/logout",
    {
      method: "POST",
      token,
    },
  );
}

export async function buscarUsuarioAutenticado(
  token: string,
): Promise<UsuarioAutenticado> {
  return api<UsuarioAutenticado>(
    "/api/v1/usuarios/me",
    {
      token,
    },
  );
}

export async function atualizarUsuario(
  token: string,
  usuario: UsuarioAutenticado,
  dados: AtualizarUsuarioDados,
): Promise<UsuarioAutenticado> {
  return api<UsuarioAutenticado>(
    `/api/v1/usuarios/${usuario.id}`,
    {
      method: "PUT",
      token,
      body: {
        id: usuario.id,
        nome: dados.nome,
        email: dados.email,
        pontos: usuario.pontos,
        nivel: usuario.nivel,
        recompensa: usuario.recompensa,
      },
    },
  );
}