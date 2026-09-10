// src/data/mock.ts

export type Rank =
  | "Bronze"
  | "Prata"
  | "Ouro"
  | "Diamante"
  | "Esmeralda";

export type EnvironmentalNews = {
  id: number;
  category: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  url: string;
};

export type Challenge = {
  title: string;
  description: string;
  reward: number;
  progress: number;
};

export const ranking = [
  {
    position: 1,
    name: "Ana Clara",
    points: 2840,
    rank: "Ouro" as Rank,
  },
  {
    position: 2,
    name: "Pedro Henrique",
    points: 2310,
    rank: "Prata" as Rank,
  },
  {
    position: 3,
    name: "Mariana Costa",
    points: 1980,
    rank: "Bronze" as Rank,
  },
  {
    position: 4,
    name: "InovaTech",
    points: 1250,
    rank: "Prata" as Rank,
  },
  {
    position: 5,
    name: "João Victor",
    points: 1120,
    rank: "Bronze" as Rank,
  },
];

