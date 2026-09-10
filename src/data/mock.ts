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

export const challenges: Challenge[] = [
  {
    title: "Reduza, Reutilize, Transforme!",
    description:
      "Mostre como você reutiliza materiais no seu dia a dia.",
    reward: 200,
    progress: 0,
  },
  {
    title: "Semana sem desperdício",
    description:
      "Registre uma atitude que reduza o desperdício.",
    reward: 150,
    progress: 60,
  },
  {
    title: "Mobilidade consciente",
    description:
      "Compartilhe uma alternativa sustentável de transporte.",
    reward: 150,
    progress: 35,
  },
];

export const environmentalNews: EnvironmentalNews[] = [
  // ============================
  // MUDANÇAS CLIMÁTICAS
  // ============================

  {
    id: 1,
    category: "Mudanças climáticas",
    title: "Aquecimento além de 1,5°C ameaça saúde, agricultura e economia",
    summary: "Especialistas alertam para os impactos de um planeta mais quente e defendem medidas urgentes para reduzir as emissões de gases.",
    source: "Agência Brasil",
    date: "02/09/2026",
    url: "https://agenciabrasil.ebc.com.br/meio-ambiente/noticia/2026-09/aquecimento-alem-de-15degc-ameaca-saude-agricultura-e-economia",
  },

  {
    id: 2,
    category: "Mudanças climáticas",
    title:
      "Relatório traz soluções para reduzir emissões de metano no país",
    summary:
      "Relatório reúne propostas para reduzir as emissões de metano e aponta medidas que podem ser adotadas por produtores, municípios e regiões.",
    source: "Agência Brasil",
    date: "18/08/2026",
    url: "https://agenciabrasil.ebc.com.br/meio-ambiente/noticia/2026-08/relatorio-traz-solucoes-para-reduzir-emissoes-de-metano-no-pais",
  },

  // ============================
  // SUSTENTABILIDADE
  // ============================

  {
    id: 3,
    category: "Sustentabilidade",
    title: "Brasil promete restaurar 163 mil km² de terras degradadas até 2030",
    summary: "O país apresentou metas de recuperação de terras degradadas com ações voltadas à vegetação nativa, sistemas agroflorestais e áreas de conservação.",
    source: "Agência Brasil",
    date: "25/08/2026",
    url: "https://agenciabrasil.ebc.com.br/meio-ambiente/noticia/2026-08/brasil-promete-restaurar-163-mil-km2-de-terras-degradadas-ate-2030",
  },

  {
    id: 4,
    category: "Sustentabilidade",
    title: "Quatro em cada 10 brasileiros nunca ouviram falar em economia circular",
    summary: "A economia circular busca reutilizar, recuperar e reinserir produtos e recursos no ciclo produtivo, reduzindo o descarte.",
    source: "Agência Brasil",
    date: "05/07/2026",
    url: "https://agenciabrasil.ebc.com.br/meio-ambiente/noticia/2026-07/quatro-em-cada-dez-brasileiros-nunca-ouviram-falar-em-economia-circular",
  },

  // ============================
  // PRESERVAÇÃO
  // ============================

  {
    id: 5,
    category: "Preservação",
    title: "Senado aprova direito prioritário da criança a meio ambiente saudável",
    summary: "Projeto aprovado pelo Senado estabelece prioridade para o direito de crianças e adolescentes a um meio ambiente saudável.",
    source: "Agência Brasil",
    date: "04/09/2026",
    url: "https://agenciabrasil.ebc.com.br/meio-ambiente/noticia/2026-09/senado-aprova-direito-prioritario-da-crianca-meio-ambiente-saudavel",
  },

  {
    id: 6,
    category: "Preservação",
    title: "Imazon aponta desmatamento zero em 60% de terras indígenas na Amazônia",
    summary: "Levantamento aponta que 60% das terras indígenas analisadas registraram desmatamento zero no período avaliado.",
    source: "Agência Brasil",
    date: "27/08/2026",
    url: "https://agenciabrasil.ebc.com.br/meio-ambiente/noticia/2026-08/imazon-aponta-desmatamento-zero-em-60-de-terras-indigenas-na-amazonia",
  },

    // ============================
  // RECICLAGEM
  // ============================

  {
    id: 7,
    category: "Reciclagem",
    title: "Tecnologia favorece descarte adequado de grandes eletrodomésticos",
    summary: "Novas soluções ajudam consumidores a encontrar formas adequadas de descarte para equipamentos que não podem ser simplesmente colocados no lixo comum.",
    source: "Agência Brasil",
    date: "25/06/2026",
    url: "https://agenciabrasil.ebc.com.br/meio-ambiente/noticia/2026-06/tecnologia-favorece-descarte-adequado-de-grandes-eletrodomesticos",
  },

  {
    id: 8,
    category: "Reciclagem",
    title: "Medidas podem ampliar a coleta seletiva e reduzir o desperdício",
    summary: "A ampliação da coleta seletiva e o melhor aproveitamento de materiais podem contribuir para reduzir a quantidade de resíduos descartados.",
    source: "Agência Brasil",
    date: "18/08/2026",
    url: "https://agenciabrasil.ebc.com.br/meio-ambiente/noticia/2026-08/relatorio-traz-solucoes-para-reduzir-emissoes-de-metano-no-pais",
  },

  // ============================
  // ENERGIA LIMPA
  // ============================

  {
    id: 9,
    category: "Energia limpa",
    title: "TV Brasil apresenta alternativas para os combustíveis do futuro",
    summary: "Biometano, e-metanol e hidrogênio verde são apresentados como alternativas produzidas a partir de fontes renováveis.",
    source: "Agência Brasil",
    date: "25/05/2026",
    url: "https://agenciabrasil.ebc.com.br/meio-ambiente/noticia/2026-05/tv-brasil-caminhos-da-reportagem-apresenta-os-combustiveis-do-futuro",
  },

  {
    id: 10,
    category: "Energia limpa",
    title: "Grande Muralha Verde avança em restauração de áreas na África",
    summary: "Iniciativa internacional combina recuperação de terras, segurança alimentar, acesso à energia limpa e maior resiliência diante das mudanças climáticas.",
    source: "Agência Brasil",
    date: "08/08/2026",
    url: "https://agenciabrasil.ebc.com.br/meio-ambiente/noticia/2026-08/grande-muralha-verde-restaura-166-milhao-de-hectares",
  },

  {
    id: 11,
    category: "Meio ambiente",
    title: "Iniciativas ambientais mostram como ações locais podem gerar impacto positivo",
    summary: "Projetos desenvolvidos por comunidades e organizações ajudam a fortalecer a conscientização e a preservação ambiental.",
    source: "Agência Brasil",
    date: "30/08/2026",
    url: "https://agenciabrasil.ebc.com.br/meio-ambiente",
  },
];