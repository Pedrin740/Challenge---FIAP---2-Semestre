import {
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

const AuthContext =
  createContext<AuthContextData | undefined>(
    undefined,
  );

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