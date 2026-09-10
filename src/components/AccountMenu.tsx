import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export function AccountMenu() {
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth();

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    setOpen(false);
    navigate("/login");
  }

  if (!user) {
    return (
      <Link
        to="/login"
        className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-500"
      >
        Entrar
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="flex items-center gap-2"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-200 font-bold text-zinc-900">
          {user.name.charAt(0)}
        </div>

        <span className="hidden text-sm font-semibold sm:block">
          Olá, {user.name}!
        </span>

        <span className="text-zinc-500">
          {open ? "⌃" : "⌄"}
        </span>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label="Fechar menu da conta"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="absolute right-0 top-[calc(100%+10px)] z-50 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#121214] shadow-2xl">
            <div className="border-b border-white/10 p-4">
              <p className="font-semibold text-white">
                {user.name}
              </p>

              <p className="mt-1 truncate text-xs text-zinc-500">
                {user.email}
              </p>
            </div>

            <div className="p-2">
              <Link
                to="/perfil"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-sm text-zinc-300 transition hover:bg-white/[.05] hover:text-white"
              >
                Meu perfil
              </Link>

              <Link
                to="/objetivos"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-sm text-zinc-300 transition hover:bg-white/[.05] hover:text-white"
              >
                Meus objetivos
              </Link>

              <button
                type="button"
                disabled
                className="flex w-full cursor-not-allowed items-center rounded-xl px-3 py-3 text-left text-sm text-zinc-600"
              >
                <span className="flex-1">
                  Favoritos
                </span>

                <span className="text-[10px] uppercase tracking-wider text-zinc-700">
                  Em breve
                </span>
              </button>

              <Link
                to="/configuracoes"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-3 py-3 text-sm text-zinc-300 transition hover:bg-white/[.05] hover:text-white"
              >
                Configurações
              </Link>
            </div>

            <div className="border-t border-white/10 p-2">
              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-xl px-3 py-3 text-left text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
              >
                Sair
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}