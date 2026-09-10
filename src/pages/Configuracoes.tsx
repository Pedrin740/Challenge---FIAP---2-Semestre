import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme, type Theme } from "../context/ThemeContext";

export function Configuracoes() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const themeNames: Record<Theme, string> = {
    light: "Claro",
    medium: "Médio",
    dark: "Escuro",
  };

  const themes: {
    value: Theme;
    title: string;
    description: string;
  }[] = [
    {
      value: "light",
      title: "Claro",
      description: "Tema claro",
    },
    {
      value: "medium",
      title: "Médio",
      description: "Tema intermediário",
    },
    {
      value: "dark",
      title: "Escuro",
      description: "Tema escuro",
    },
  ];

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
          {themes.map((item) => (
            <button
              key={item.value}
              type="button"
              className={`theme-card ${
                theme === item.value ? "selected" : ""
              }`}
              onClick={() => setTheme(item.value)}
              aria-pressed={theme === item.value}
            >
              <strong>{item.title}</strong>
              <span>{item.description}</span>

              {theme === item.value && (
                <small>Tema selecionado</small>
              )}
            </button>
          ))}
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