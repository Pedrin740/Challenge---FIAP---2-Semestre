import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

type CadastroFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Cadastro() {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();

  const [registerError, setRegisterError] =
    useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CadastroFormData>();

  const password = watch("password");

  function onSubmit(data: CadastroFormData) {
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

    navigate("/");
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link
            to="/"
            className="text-sm opacity-70 hover:opacity-100"
          >
            ← Voltar
          </Link>

          <h1 className="mt-6 text-3xl font-bold">
            Criar conta
          </h1>

          <p className="mt-2 opacity-70">
            Faça parte da comunidade SoulUp.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium"
            >
              Nome
            </label>

            <input
              id="name"
              type="text"
              {...register("name", {
                required: "Informe seu nome.",
                minLength: {
                  value: 2,
                  message:
                    "O nome deve ter pelo menos 2 caracteres.",
                },
              })}
              className="w-full rounded-xl border px-4 py-3 outline-none"
              placeholder="Seu nome"
            />

            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium"
            >
              E-mail
            </label>

            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Informe seu e-mail.",
                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:
                    "Informe um e-mail válido.",
                },
              })}
              className="w-full rounded-xl border px-4 py-3 outline-none"
              placeholder="seu@email.com"
            />

            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium"
            >
              Senha
            </label>

            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Informe uma senha.",
                minLength: {
                  value: 6,
                  message:
                    "A senha deve ter pelo menos 6 caracteres.",
                },
              })}
              className="w-full rounded-xl border px-4 py-3 outline-none"
              placeholder="Sua senha"
            />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium"
            >
              Confirmar senha
            </label>

            <input
              id="confirmPassword"
              type="password"
              {...register("confirmPassword", {
                required:
                  "Confirme sua senha.",
                validate: (value) =>
                  value === password ||
                  "As senhas não coincidem.",
              })}
              className="w-full rounded-xl border px-4 py-3 outline-none"
              placeholder="Confirme sua senha"
            />

            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">
                {
                  errors.confirmPassword
                    .message
                }
              </p>
            )}
          </div>

          {registerError && (
            <p className="rounded-xl bg-red-500/10 p-3 text-sm text-red-500">
              {registerError}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl px-4 py-3 font-semibold"
          >
            Criar conta
          </button>
        </form>

        <p className="mt-6 text-center text-sm opacity-70">
          Já possui uma conta?{" "}
          <Link
            to="/login"
            className="font-semibold underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </main>
  );
}