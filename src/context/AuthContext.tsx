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

const USERS_STORAGE_KEY = "soulup_users";
const AUTH_STORAGE_KEY = "ecorank_token";

const initialUsers: AuthUser[] = [
  {
    id: 1,
    name: "InovaTech",
    email: "inovatech@email.com",
    ecoRank: {
      points: 1250,
      actions: 23,
      rank: "Prata",
      ranking: "Top 18%",
      nextRank: "Ouro",
      nextRankPoints: 2000,
      co2: "48,7 kg",
      categories: [
        { label: "Reciclagem", value: 35 },
        { label: "Mobilidade", value: 25 },
        { label: "Economia de água", value: 20 },
        { label: "Energia limpa", value: 10 },
        { label: "Outros", value: 10 },
      ],
      challengeProgress: {
        "Reduza, Reutilize, Transforme!": 0,
        "Semana sem desperdício": 60,
        "Mobilidade consciente": 35,
      },
    },
    goals: [
      {
        id: 1,
        title: "Reciclar durante o mês",
        description: "Separar corretamente os resíduos recicláveis.",
        progress: 3,
        target: 10,
      },
      {
        id: 2,
        title: "Usar menos plástico",
        description: "Evitar produtos descartáveis durante a semana.",
        progress: 4,
        target: 7,
      },
    ],
  },
  {
    id: 2,
    name: "Ana Clara",
    email: "anaclara@email.com",
    ecoRank: {
      points: 2840,
      actions: 31,
      rank: "Ouro",
      ranking: "Top 5%",
      nextRank: "Diamante",
      nextRankPoints: 4000,
      co2: "82,4 kg",
      categories: [
        { label: "Reciclagem", value: 30 },
        { label: "Mobilidade", value: 30 },
        { label: "Economia de água", value: 15 },
        { label: "Energia limpa", value: 15 },
        { label: "Outros", value: 10 },
      ],
      challengeProgress: {
        "Reduza, Reutilize, Transforme!": 100,
        "Semana sem desperdício": 80,
        "Mobilidade consciente": 60,
      },
    },
    goals: [
      {
        id: 3,
        title: "Economizar água",
        description: "Adotar hábitos para reduzir o consumo de água.",
        progress: 6,
        target: 10,
      },
      {
        id: 4,
        title: "Mobilidade sustentável",
        description: "Escolher meios de transporte menos poluentes.",
        progress: 5,
        target: 10,
      },
    ],
  },
  {
    id: 3,
    name: "Pedro Henrique",
    email: "pedrohenrique@email.com",
    ecoRank: {
      points: 2310,
      actions: 28,
      rank: "Ouro",
      ranking: "Top 10%",
      nextRank: "Diamante",
      nextRankPoints: 4000,
      co2: "69,2 kg",
      categories: [
        { label: "Reciclagem", value: 40 },
        { label: "Mobilidade", value: 20 },
        { label: "Economia de água", value: 15 },
        { label: "Energia limpa", value: 15 },
        { label: "Outros", value: 10 },
      ],
      challengeProgress: {
        "Reduza, Reutilize, Transforme!": 75,
        "Semana sem desperdício": 40,
        "Mobilidade consciente": 90,
      },
    },
    goals: [
      {
        id: 5,
        title: "Reduzir desperdícios",
        description: "Evitar desperdícios de materiais no dia a dia.",
        progress: 7,
        target: 10,
      },
      {
        id: 6,
        title: "Usar transporte sustentável",
        description: "Priorizar bicicleta, caminhada ou transporte público.",
        progress: 6,
        target: 10,
      },
    ],
  },
  {
    id: 4,
    name: "Mariana Costa",
    email: "mariana@email.com",
    ecoRank: {
      points: 1980,
      actions: 21,
      rank: "Prata",
      ranking: "Top 15%",
      nextRank: "Ouro",
      nextRankPoints: 2000,
      co2: "54,8 kg",
      categories: [
        { label: "Reciclagem", value: 30 },
        { label: "Mobilidade", value: 20 },
        { label: "Economia de água", value: 25 },
        { label: "Energia limpa", value: 15 },
        { label: "Outros", value: 10 },
      ],
      challengeProgress: {
        "Reduza, Reutilize, Transforme!": 50,
        "Semana sem desperdício": 70,
        "Mobilidade consciente": 40,
      },
    },
    goals: [
      {
        id: 7,
        title: "Economizar energia",
        description: "Reduzir o consumo de energia elétrica.",
        progress: 5,
        target: 10,
      },
      {
        id: 8,
        title: "Reduzir o plástico",
        description: "Diminuir o uso de produtos descartáveis.",
        progress: 4,
        target: 10,
      },
    ],
  },
  {
    id: 5,
    name: "João Victor",
    email: "joao@email.com",
    ecoRank: {
      points: 1120,
      actions: 16,
      rank: "Prata",
      ranking: "Top 25%",
      nextRank: "Ouro",
      nextRankPoints: 2000,
      co2: "32,5 kg",
      categories: [
        { label: "Reciclagem", value: 25 },
        { label: "Mobilidade", value: 35 },
        { label: "Economia de água", value: 15 },
        { label: "Energia limpa", value: 15 },
        { label: "Outros", value: 10 },
      ],
      challengeProgress: {
        "Reduza, Reutilize, Transforme!": 25,
        "Semana sem desperdício": 30,
        "Mobilidade consciente": 50,
      },
    },
    goals: [
      {
        id: 9,
        title: "Caminhar mais",
        description: "Substituir pequenos deslocamentos de carro por caminhada.",
        progress: 4,
        target: 10,
      },
      {
        id: 10,
        title: "Reciclar em casa",
        description: "Separar corretamente materiais recicláveis.",
        progress: 5,
        target: 10,
      },
    ],
  },
];

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

function loadUsers(): AuthUser[] {
  const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);

  if (!savedUsers) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
    return initialUsers;
  }

  try {
    const parsedUsers = JSON.parse(savedUsers) as AuthUser[];

    return parsedUsers.map((savedUser) => {
      const { password: _password, ...safeUser } =
        savedUser as AuthUser & { password?: string };

      return {
        ...safeUser,
        goals: safeUser.goals ?? [],
        actionHistory: safeUser.actionHistory ?? [],
      };
    });
  } catch {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(initialUsers));
    return initialUsers;
  }
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
  const [users, setUsers] = useState<AuthUser[]>(() => loadUsers());

  const [user, setUser] = useState<AuthUser | null>(null);

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem(AUTH_STORAGE_KEY),
  );

  const [isLoading, setIsLoading] = useState<boolean>(() =>
    Boolean(localStorage.getItem(AUTH_STORAGE_KEY)),
  );

  useEffect(() => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

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