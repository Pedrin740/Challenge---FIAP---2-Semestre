import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type CadastroFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export function Cadastro() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CadastroFormData>();

  const [registerError, setRegisterError] =
    useState("");

  const { register: registerUser } =
    useAuth();

  const navigate = useNavigate();

  const password = watch("password");

  function handleCadastro(
    data: CadastroFormData,
  ) {
    setRegisterError("");

    const success = registerUser(
      data.name,
      data.email,
      data.password,
    );

    if (!success) {
      setRegisterError(
        "Este e-mail já está cadastrado.",
      );

      return;
    }

    navigate("/", {
      replace: true,
    });
  }

  return (
    <div className="grid min-h-[calc(100vh-68px)] place-items-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#121214] p-6 shadow-2xl sm:p-8">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-purple-500/10 text-2xl text-purple-400">
            +
          </div>

          <h1 className="mt-5 text-3xl font-bold">
            Criar conta
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            Faça parte da SoulUp.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(
            handleCadastro,
          )}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Nome
            </label>

            <input
              type="text"
              placeholder="Seu nome"
              className="w-full rounded-xl border border-white/10 bg-[#0a0a0c] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-purple-500/50"
              {...register("name", {
                required:
                  "Informe seu nome.",
                minLength: {
                  value: 2,
                  message:
                    "Digite pelo menos 2 caracteres.",
                },
              })}
            />

            {errors.name && (
              <p className="mt-2 text-xs text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

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
              placeholder="Crie uma senha"
              className="w-full rounded-xl border border-white/10 bg-[#0a0a0c] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-purple-500/50"
              {...register("password", {
                required:
                  "Informe uma senha.",
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

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Confirmar senha
            </label>

            <input
              type="password"
              placeholder="Digite a senha novamente"
              className="w-full rounded-xl border border-white/10 bg-[#0a0a0c] px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-purple-500/50"
              {...register(
                "confirmPassword",
                {
                  required:
                    "Confirme sua senha.",
                  validate: (
                    value,
                  ) =>
                    value === password ||
                    "As senhas não coincidem.",
                },
              )}
            />

            {errors.confirmPassword && (
              <p className="mt-2 text-xs text-red-400">
                {
                  errors.confirmPassword
                    .message
                }
              </p>
            )}
          </div>

          {registerError && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
              {registerError}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-purple-600 px-5 py-3 font-bold text-white transition hover:bg-purple-500"
          >
            Criar conta
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-500">
          Já possui uma conta?
        </p>

        <Link
          to="/login"
          className="mt-2 block text-center text-sm font-semibold text-lime-400 hover:text-lime-300"
        >
          Entrar
        </Link>
      </div>
    </div>
  );
}