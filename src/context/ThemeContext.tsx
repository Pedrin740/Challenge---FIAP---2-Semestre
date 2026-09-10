import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { useAuth } from "./AuthContext";

export type Theme = "light" | "medium" | "dark";

type ThemeContextData = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const DEFAULT_THEME: Theme = "dark";
const THEME_STORAGE_KEY = "soulup_theme";

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [theme, setThemeState] = useState<Theme>(DEFAULT_THEME);

  useEffect(() => {
    const storageKey = user
      ? `${THEME_STORAGE_KEY}_${user.id}`
      : `${THEME_STORAGE_KEY}_guest`;

    const savedTheme = localStorage.getItem(storageKey);

    if (savedTheme === "light" || savedTheme === "medium" || savedTheme === "dark") {
      setThemeState(savedTheme);
    } else {
      setThemeState(DEFAULT_THEME);
    }
  }, [user]);

  useEffect(() => {
    const storageKey = user
      ? `${THEME_STORAGE_KEY}_${user.id}`
      : `${THEME_STORAGE_KEY}_guest`;

    localStorage.setItem(storageKey, theme);
  }, [theme, user]);

  function setTheme(newTheme: Theme) {
    setThemeState(newTheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme deve ser utilizado dentro de ThemeProvider.");
  }

  return context;
}