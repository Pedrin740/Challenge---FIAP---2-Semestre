import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [loginError, setLoginError] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  function onSubmit(data: LoginFormData) {
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

    navigate(destination);
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
            Entrar
          </h1>

          <p className="mt-2 opacity-70">
            Acesse sua conta SoulUp.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
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
                required: "Informe sua senha.",
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

          {loginError && (
            <p className="rounded-xl bg-red-500/10 p-3 text-sm text-red-500">
              {loginError}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl px-4 py-3 font-semibold"
          >
            Entrar
          </button>
        </form>

        <div className="mt-6 rounded-xl border p-4 text-sm">
          <p className="font-semibold">
            Conta para teste
          </p>

          <p className="mt-2 opacity-70">
            E-mail: inovatech@email.com
          </p>

          <p className="opacity-70">
            Senha: 123456
          </p>
        </div>

        <p className="mt-6 text-center text-sm opacity-70">
          Ainda não possui uma conta?{" "}
          <Link
            to="/cadastro"
            className="font-semibold underline"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </main>
  );
}