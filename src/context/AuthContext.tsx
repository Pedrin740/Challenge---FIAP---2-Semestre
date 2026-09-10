import React, {
  createContext,
  useContext,
} from "react";

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
  password: string;
  ecoRank: EcoRankData;
  goals: UserGoal[];
  actionHistory?: UserAction[];
};

type AuthContextData = {
  user: AuthUser | null;
  users: AuthUser[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (
    name: string,
    email: string,
    password: string,
  ) => boolean;
  logout: () => void;
  addAction: (points: number, category: string) => void;
  getRanking: () => AuthUser[];
};

const initialUsers: AuthUser[] = [

];

const USERS_STORAGE_KEY = "soulup_users";
const AUTH_STORAGE_KEY = "soulup_auth";

function loadUsers(): AuthUser[] {
  const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);

  if (storedUsers) {
    try {
      return JSON.parse(storedUsers);
    } catch {
      return initialUsers;
    }
  }

  localStorage.setItem(
    USERS_STORAGE_KEY,
    JSON.stringify(initialUsers),
  );

  return initialUsers;
}

function loadAuthenticatedUser(
  users: AuthUser[],
): AuthUser | null {
  const storedAuth = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedAuth) {
    return null;
  }

  try {
    const authData = JSON.parse(storedAuth);

    return (
      users.find(
        (user) => user.id === authData.userId,
      ) ?? null
    );
  } catch {
    return null;
  }
}

const AuthContext =
  createContext<AuthContextData | undefined>(
    undefined,
  );

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [users, setUsers] =
    React.useState<AuthUser[]>(loadUsers);

  const [user, setUser] =
    React.useState<AuthUser | null>(() =>
      loadAuthenticatedUser(users),
    );

  function login(
    email: string,
    password: string,
  ): boolean {
    const foundUser = users.find(
      (item) =>
        item.email === email &&
        item.password === password,
    );

    if (!foundUser) {
      return false;
    }

    setUser(foundUser);

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        userId: foundUser.id,
      }),
    );

    return true;
  }

  function register(
    name: string,
    email: string,
    password: string,
  ): boolean {
    const emailExists = users.some(
      (item) =>
        item.email.toLowerCase() ===
        email.toLowerCase(),
    );

    if (emailExists) {
      return false;
    }

    const newUser: AuthUser = {
      id: Date.now(),
      name,
      email,
      password,
      ecoRank: {
        points: 0,
        actions: 0,
        rank: "Bronze",
        ranking: "Novo",
        nextRank: "Prata",
        nextRankPoints: 1000,
        co2: "0 kg",
        categories: [
          {
            label: "Reciclagem",
            value: 0,
          },
          {
            label: "Mobilidade",
            value: 0,
          },
          {
            label: "Economia de água",
            value: 0,
          },
          {
            label: "Energia limpa",
            value: 0,
          },
          {
            label: "Outros",
            value: 0,
          },
        ],
        challengeProgress: {},
      },
      goals: [],
      actionHistory: [],
    };

    const updatedUsers = [
      ...users,
      newUser,
    ];

    setUsers(updatedUsers);

    localStorage.setItem(
      USERS_STORAGE_KEY,
      JSON.stringify(updatedUsers),
    );

    return true;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        isAuthenticated: user !== null,
        login,
        register,
        logout,
        addAction: () => {},
        getRanking: () => users,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth deve ser utilizado dentro de AuthProvider.",
    );
  }

  return context;
}