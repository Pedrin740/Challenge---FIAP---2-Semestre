import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

type LoginFormData = {
  email: string;
  password: string;
};

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [loginError, setLoginError] =
    useState("");

  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  function handleLogin(
    data: LoginFormData,
  ) {
    setLoginError("");

    const success = login(
      data.email,
      data.password,
    );

    if (!success) {
      setLoginError(
        "E-mail ou senha incorretos.",
      );

      return;
    }

    const destination =
      location.state?.from || "/";

    navigate(destination, {
      replace: true,
    });
  }

  return (
    <div className="grid min-h-[calc(100vh-68px)] place-items-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#121214] p-6 shadow-2xl sm:p-8">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-purple-500/40 bg-purple-500/10 text-2xl text-purple-400">
            ◉
          </div>

          <h1 className="mt-5 text-3xl font-bold">
            Entrar no EcoRank
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Acesse sua conta e acompanhe sua jornada.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleLogin)}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              E-mail
            </label>

            <input
              type="email"
              placeholder="seu@email.com"
              className="w-full rounded-xl border border-white/10 bg-[#0a0a0c] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-purple-500/50"
              {...register("email", {
                required:
                  "Informe seu e-mail.",
                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:
                    "Digite um e-mail válido.",
                },
              })}
            />

            {errors.email && (
              <p className="mt-2 text-xs text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Senha
            </label>

            <input
              type="password"
              placeholder="Digite sua senha"
              className="w-full rounded-xl border border-white/10 bg-[#0a0a0c] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-purple-500/50"
              {...register("password", {
                required:
                  "Informe sua senha.",
                minLength: {
                  value: 6,
                  message:
                    "A senha deve possuir pelo menos 6 caracteres.",
                },
              })}
            />

            {errors.password && (
              <p className="mt-2 text-xs text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          {loginError && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              {loginError}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-purple-600 px-5 py-3 font-bold text-white transition hover:bg-purple-500"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 rounded-xl border border-lime-400/10 bg-lime-400/[.03] p-4">
          <p className="text-xs font-semibold text-lime-400">
            Conta para teste
          </p>

          <p className="mt-2 text-xs text-zinc-500">
            E-mail: inovatech@email.com
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Senha: 123456
          </p>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-zinc-500">
            Ainda não possui uma conta?
          </p>

          <Link
            to="/cadastro"
            className="mt-2 inline-block text-sm font-semibold text-lime-400 transition hover:text-lime-300"
          >
            Criar conta
          </Link>
        </div>

        <Link
          to="/"
          className="mt-6 block text-center text-sm text-zinc-500 transition hover:text-white"
        >
          Voltar para o Início
        </Link>
      </div>
    </div>
  );
}