import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme, type Theme } from "../context/ThemeContext";

export default function Configuracoes() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const themeNames: Record<Theme, string> = {
    light: "Claro",
    medium: "Médio",
    dark: "Escuro",
  };

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <main className="page-container">
      <section className="page-header">
        <h1>Configurações</h1>
        <p>Gerencie sua conta e suas preferências.</p>
      </section>

      <section className="settings-section">
        <h2>Minha conta</h2>

        <div className="settings-card">
          <div>
            <strong>Nome</strong>
            <p>{user.name}</p>
          </div>

          <div>
            <strong>E-mail</strong>
            <p>{user.email}</p>
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h2>Aparência</h2>

        <div className="theme-options">
          <button type="button" className="theme-card">
            <strong>Claro</strong>
            <span>Tema claro</span>
          </button>

          <button type="button" className="theme-card">
            <strong>Médio</strong>
            <span>Tema intermediário</span>
          </button>

          <button type="button" className="theme-card">
            <strong>Escuro</strong>
            <span>Tema escuro</span>
          </button>
        </div>

        <p>
          Tema atual: <strong>{themeNames[theme]}</strong>
        </p>
      </section>

      <section className="settings-section">
        <h2>Sessão</h2>

        <div className="settings-card">
          <p>
            Você está conectado como <strong>{user.name}</strong>.
          </p>

          <button type="button" onClick={handleLogout}>
            Sair da conta
          </button>
        </div>
      </section>
    </main>
  );
}