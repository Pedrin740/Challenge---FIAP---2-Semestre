import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  cadastrarUsuario,
  realizarLogin,
  realizarLogout,
  buscarUsuarioAutenticado,
  atualizarPerfil,
  type UsuarioAutenticado,
} from "../services/auth";

export type Rank =
  | "Bronze"
  | "Prata"
  | "Ouro"
  | "Diamante"
  | "Esmeralda";

export type EcoRankData = {
  points: number;
  actions: number;
  rank: Rank;
  ranking: string;
  nextRank: Rank;
  nextRankPoints: number;
  co2: string;
  categories: {
    label: string;
    value: number;
  }[];
  challengeProgress: Record<string, number>;
};

export type UserGoal = {
  id: number;
  title: string;
  description: string;
  progress: number;
  target: number;
};

export type UserAction = {
  id: number;
  points: number;
  category: string;
  date: string;
};

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  ecoRank: EcoRankData;
  goals: UserGoal[];
  actionHistory?: UserAction[];
};

type AuthContextData = {
  user: AuthUser | null;
  users: AuthUser[];
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (dados: {
    nome: string;
    email: string;
  }) => Promise<boolean>;
  addAction: (points: number, category: string) => void;
  getRanking: () => AuthUser[];
};

const AUTH_STORAGE_KEY = "ecorank_token";

const AuthContext = createContext<AuthContextData | undefined>(undefined);

function getRankInfo(points: number) {
  if (points >= 7000) {
    return {
      rank: "Esmeralda" as Rank,
      nextRank: "Esmeralda" as Rank,
      nextRankPoints: 7000,
    };
  }

  if (points >= 4000) {
    return {
      rank: "Diamante" as Rank,
      nextRank: "Esmeralda" as Rank,
      nextRankPoints: 7000,
    };
  }

  if (points >= 2000) {
    return {
      rank: "Ouro" as Rank,
      nextRank: "Diamante" as Rank,
      nextRankPoints: 4000,
    };
  }

  if (points >= 1000) {
    return {
      rank: "Prata" as Rank,
      nextRank: "Ouro" as Rank,
      nextRankPoints: 2000,
    };
  }

  return {
    rank: "Bronze" as Rank,
    nextRank: "Prata" as Rank,
    nextRankPoints: 1000,
  };
}

function updateCategoryPercentages(
  categories: EcoRankData["categories"],
  totalActions: number,
  category: string,
): EcoRankData["categories"] {
  if (totalActions <= 0) {
    return categories.map((item) => ({
      ...item,
      value: item.label === category ? 100 : 0,
    }));
  }

  const updated = categories.map((item) => {
    const previousCount = (item.value / 100) * totalActions;
    const newCount = previousCount + (item.label === category ? 1 : 0);

    return {
      ...item,
      value: Math.round((newCount / (totalActions + 1)) * 100),
    };
  });

  const totalPercentage = updated.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  const difference = 100 - totalPercentage;

  if (difference !== 0) {
    const selectedIndex = updated.findIndex(
      (item) => item.label === category,
    );

    if (selectedIndex >= 0) {
      updated[selectedIndex] = {
        ...updated[selectedIndex],
        value: updated[selectedIndex].value + difference,
      };
    }
  }

  return updated;
}

function mapearUsuario(usuario: UsuarioAutenticado): AuthUser {
  const rankInfo = getRankInfo(usuario.pontos);

  return {
    id: usuario.id,
    name: usuario.nome,
    email: usuario.email,
    ecoRank: {
      points: usuario.pontos,
      actions: 0,
      rank: rankInfo.rank,
      ranking: "",
      nextRank: rankInfo.nextRank,
      nextRankPoints: rankInfo.nextRankPoints,
      co2: "0 kg",
      categories: [],
      challengeProgress: {},
    },
    goals: [],
    actionHistory: [],
  };
}

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [users, setUsers] = useState<AuthUser[]>([]);

  const [user, setUser] = useState<AuthUser | null>(null);

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(AUTH_STORAGE_KEY),
  );

  const [isLoading, setIsLoading] = useState<boolean>(() =>
    Boolean(localStorage.getItem(AUTH_STORAGE_KEY)),
  );

  useEffect(() => {
    function tratarSessaoExpirada() {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setToken(null);
      setUser(null);
      setIsLoading(false);
    }

    window.addEventListener(
      "ecorank:session-expired",
      tratarSessaoExpirada,
    );

    return () => {
      window.removeEventListener(
        "ecorank:session-expired",
        tratarSessaoExpirada,
      );
    };
  }, []);

  useEffect(() => {
    let ativo = true;

    async function restaurarSessao() {
      if (!token) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const usuario = await buscarUsuarioAutenticado(token);

        if (!ativo) return;

        const usuarioMapeado = mapearUsuario(usuario);

        setUser(usuarioMapeado);
        setUsers((atuais) => [
          ...atuais.filter((item) => item.id !== usuarioMapeado.id),
          usuarioMapeado,
        ]);
      } catch (error) {
        if (!ativo) return;

        console.error("Não foi possível restaurar a sessão:", error);

        localStorage.removeItem(AUTH_STORAGE_KEY);
        setToken(null);
        setUser(null);
      } finally {
        if (ativo) {
          setIsLoading(false);
        }
      }
    }

    void restaurarSessao();

    return () => {
      ativo = false;
    };
  }, [token]);

  async function login(
    email: string,
    password: string,
  ): Promise<boolean> {
    try {
      const sessao = await realizarLogin({
        email: email.trim().toLowerCase(),
        senha: password,
      });

      localStorage.setItem(AUTH_STORAGE_KEY, sessao.token);
      setToken(sessao.token);

      const usuarioMapeado = mapearUsuario(sessao.usuario);

      setUser(usuarioMapeado);
      setUsers((atuais) => [
        ...atuais.filter((item) => item.id !== usuarioMapeado.id),
        usuarioMapeado,
      ]);

      return true;
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      return false;
    }
  }

  async function register(
    name: string,
    email: string,
    password: string,
  ): Promise<boolean> {
    try {
      const sessao = await cadastrarUsuario({
        nome: name.trim(),
        email: email.trim().toLowerCase(),
        senha: password,
      });

      localStorage.setItem(AUTH_STORAGE_KEY, sessao.token);
      setToken(sessao.token);

      const usuarioMapeado = mapearUsuario(sessao.usuario);

      setUser(usuarioMapeado);
      setUsers((atuais) => [
        ...atuais.filter((item) => item.id !== usuarioMapeado.id),
        usuarioMapeado,
      ]);

      return true;
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      return false;
    }
  }

  async function logout(): Promise<void> {
    const tokenAtual = token;

    localStorage.removeItem(AUTH_STORAGE_KEY);
    setToken(null);
    setUser(null);
    setIsLoading(false);

    if (tokenAtual) {
      try {
        await realizarLogout(tokenAtual);
      } catch (error) {
        console.error("Erro ao realizar logout:", error);
      }
    }
  }

  async function updateProfile(
    dados: { nome: string; email: string },
  ): Promise<boolean> {
    if (!user || !token) {
      return false;
    }

    try {
      const usuarioAtualizado = await atualizarPerfil(token, {
        id: user.id,
        nome: dados.nome.trim(),
        email: dados.email.trim().toLowerCase(),
        pontos: user.ecoRank.points,
        nivel: user.ecoRank.rank,
        recompensa: "",
      });

      const rankInfo = getRankInfo(usuarioAtualizado.pontos);

      const usuarioLocal: AuthUser = {
        ...user,
        name: usuarioAtualizado.nome,
        email: usuarioAtualizado.email,
        ecoRank: {
          ...user.ecoRank,
          points: usuarioAtualizado.pontos,
          rank: rankInfo.rank,
          nextRank: rankInfo.nextRank,
          nextRankPoints: rankInfo.nextRankPoints,
        },
      };

      setUser(usuarioLocal);

      setUsers((atuais) =>
        atuais.map((item) =>
          item.id === usuarioLocal.id ? usuarioLocal : item,
        ),
      );

      return true;
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      return false;
    }
  }

  function addAction(points: number, category: string) {
    if (!user) return;

    setUsers((currentUsers) =>
      currentUsers.map((currentUser) => {
        if (currentUser.id !== user.id) return currentUser;

        const currentActions = currentUser.ecoRank.actions;
        const newPoints = currentUser.ecoRank.points + points;
        const rankInfo = getRankInfo(newPoints);
        const actionHistory = currentUser.actionHistory ?? [];

        const newAction: UserAction = {
          id: Date.now(),
          points,
          category,
          date: new Date().toISOString(),
        };

        const updatedCategories = updateCategoryPercentages(
          currentUser.ecoRank.categories,
          currentActions,
          category,
        );

        return {
          ...currentUser,
          ecoRank: {
            ...currentUser.ecoRank,
            points: newPoints,
            actions: currentActions + 1,
            rank: rankInfo.rank,
            nextRank: rankInfo.nextRank,
            nextRankPoints: rankInfo.nextRankPoints,
            ranking: currentUser.ecoRank.ranking,
            co2:
              (
                parseFloat(currentUser.ecoRank.co2) +
                points / 100
              ).toFixed(1) + " kg",
            categories: updatedCategories,
          },
          actionHistory: [...actionHistory, newAction],
        };
      }),
    );
  }

  function getRanking() {
    return [...users].sort(
      (a, b) => b.ecoRank.points - a.ecoRank.points,
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        addAction,
        getRanking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth deve ser utilizado dentro de AuthProvider.",
    );
  }

  return context;
}