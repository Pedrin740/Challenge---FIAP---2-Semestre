import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { environmentalNews } from "../data/mock";
import { AccountMenu } from "./AccountMenu";
import { Icon } from "./Icons";

const mobileMenuItems = [
  ["Início", "/", "home"],
  ["Sobre", "/sobre", "content"],
  ["FAQ", "/faq", "question"],
  ["Contato", "/contato", "message"],
  ["Integrantes", "/integrantes", "userSingle"],
  ["Eventos", "/eventos", "calendar"],
  ["Conteúdos", "/conteudos", "content"],
  ["Desafios", "/ecorank/desafios", "target"],
  ["Recompensas", "/recompensas", "gift"],
  ["EcoRank", "/ecorank", "leaf"],
] as const;

type SearchResult = {
  title: string;
  description: string;
  type: "Página" | "Notícia";
  icon: string;
  route?: string;
  url?: string;
  keywords?: string[];

  const pages: SearchResult[] = [
  {
    title: "Início",
    description: "Página inicial da SoulUp.",
    type: "Página",
    icon: "home",
    route: "/",
    keywords: ["home", "inicio", "principal"],
  },
  {
    title: "Sobre",
    description: "Conheça a proposta EcoRank.",
    type: "Página",
    icon: "content",
    route: "/sobre",
    keywords: ["projeto", "soulup", "ecorank", "sobre"],
  },
  {
    title: "FAQ",
    description: "Perguntas frequentes sobre o projeto.",
    type: "Página",
    icon: "question",
    route: "/faq",
    keywords: ["perguntas", "duvidas", "ajuda", "faq"],
  },
  {
    title: "Contato",
    description: "Entre em contato com a equipe.",
    type: "Página",
    icon: "message",
    route: "/contato",
    keywords: ["falar", "equipe", "mensagem", "email", "contato"],
  },
  {
    title: "Integrantes",
    description: "Conheça a equipe InovaTech.",
    type: "Página",
    icon: "userSingle",
    route: "/integrantes",
    keywords: ["equipe", "inovatech", "membros", "integrantes"],
  },
  {
    title: "Conteúdos",
    description: "Notícias e informações sobre meio ambiente.",
    type: "Página",
    icon: "content",
    route: "/conteudos",
    keywords: [
      "noticias",
      "notícias",
      "meio ambiente",
      "ambiental",
      "informacoes",
    ],
  },
  {
    title: "Desafios",
    description: "Participe dos desafios do EcoRank.",
    type: "Página",
    icon: "target",
    route: "/ecorank/desafios",
    keywords: ["desafio", "desafios", "tarefas", "diario", "diário"],
  },
  {
    title: "EcoRank",
    description: "Acompanhe sua evolução, pontos e ações sustentáveis.",
    type: "Página",
    icon: "leaf",
    route: "/ecorank",
    keywords: [
      "pontos",
      "acoes",
      "ações",
      "pontuacao",
      "pontuação",
      "nivel",
      "nível",
      "impacto",
    ],
  },
  {
    title: "Ranking",
    description: "Veja a posição dos participantes e os ranques.",
    type: "Página",
    icon: "target",
    route: "/ecorank/ranking",
    keywords: [
      "ranking",
      "classificacao",
      "classificação",
      "posicao",
      "posição",
      "usuarios",
      "usuários",
      "ranque",
    ],
  },
  {
    title: "Enviar ação",
    description: "Registre uma nova ação sustentável.",
    type: "Página",
    icon: "camera",
    route: "/ecorank/enviar",
    keywords: [
      "enviar",
      "acao",
      "ação",
      "registrar",
      "foto",
      "video",
      "vídeo",
      "prova",
    ],
  },
  {
    title: "Meu impacto",
    description: "Veja seu histórico e impacto ambiental.",
    type: "Página",
    icon: "leaf",
    route: "/ecorank/impacto",
    keywords: ["impacto", "co2", "carbono", "historico", "histórico"],
  },
  {
    title: "Meu perfil",
    description: "Visualize e gerencie os dados do seu perfil.",
    type: "Página",
    icon: "userSingle",
    route: "/perfil",
    keywords: [
      "perfil",
      "conta",
      "usuario",
      "usuário",
      "dados pessoais",
    ],
  },
  {
    title: "Meus objetivos",
    description: "Acompanhe seus objetivos pessoais.",
    type: "Página",
    icon: "target",
    route: "/objetivos",
    keywords: ["objetivos", "metas", "meta", "objetivo pessoal"],
  },
  {
    title: "Configurações",
    description: "Gerencie sua conta e suas preferências.",
    type: "Página",
    icon: "settings",
    route: "/configuracoes",
    keywords: [
      "configuracoes",
      "configurações",
      "preferencias",
      "preferências",
      "tema",
      "conta",
      "senha",
    ],
  },
];
};
