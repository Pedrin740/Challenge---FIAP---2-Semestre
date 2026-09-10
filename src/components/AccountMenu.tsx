import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function AccountMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return (
      <Link
        to="/login"
        className="rounded-xl px-4 py-2 text-sm font-semibold"
      >
        Entrar
      </Link>
    );
  }

  function handleLogout() {
    logout();
    setIsOpen(false);
    navigate("/login");
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 rounded-xl px-3 py-2"
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-full font-bold">
          {user.name.charAt(0).toUpperCase()}
        </span>

        <span className="hidden text-left sm:block">
          <span className="block text-xs opacity-60">
            Olá,
          </span>

          <span className="block max-w-32 truncate text-sm font-semibold">
            {user.name}
          </span>
        </span>

        <span className="text-xs">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border p-3 shadow-xl">
          <div className="border-b px-3 pb-3">
            <p className="font-semibold">
              {user.name}
            </p>

            <p className="mt-1 truncate text-xs opacity-60">
              {user.email}
            </p>
          </div>

          <div className="mt-2 space-y-1">
            <Link
              to="/perfil"
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm"
            >
              Meu perfil
            </Link>

            <Link
              to="/objetivos"
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm"
            >
              Meus objetivos
            </Link>

            <button
              type="button"
              disabled
              className="block w-full cursor-not-allowed rounded-xl px-3 py-2 text-left text-sm opacity-50"
            >
              Favoritos
              <span className="ml-2 text-xs">
                Em breve
              </span>
            </button>

            <Link
              to="/configuracoes"
              onClick={() => setIsOpen(false)}
              className="block rounded-xl px-3 py-2 text-sm"
            >
              Configurações
            </Link>
          </div>

          <div className="mt-2 border-t pt-2">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold"
            >
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
}