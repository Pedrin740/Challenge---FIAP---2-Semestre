import { useState } from "react";

const questions = [
  ["O que é o EcoRank?", "É uma funcionalidade da SoulUp que incentiva ações sustentáveis por meio de pontos, validação, níveis, desafios e ranking."],
  ["Como funciona?", "O usuário realiza uma ação sustentável, envia uma evidência e, após a validação, recebe pontos que contribuem para sua evolução."],
  ["Quais tipos de ações são aceitas?", "Exemplos incluem reciclagem, economia de água, transporte sustentável, redução de desperdício e outras práticas ambientais."],
  ["Como funciona o ranking?", "Os participantes são classificados de acordo com os pontos acumulados e podem evoluir pelos níveis Bronze, Prata, Ouro, Diamante e Esmeralda."],
  ["Existe limite de envio de ações?", "A proposta prevê regras e limites para evitar abusos e manter uma competição justa entre os participantes."],
  ["E se a evidência for inválida?", "A ação pode ser recusada ou permanecer pendente para análise e, nesse caso, não gera pontuação definitiva."],
  ["Como funciona a análise das evidências?", "A proposta prevê o uso de reconhecimento de imagem e vídeo para auxiliar na validação automática das ações enviadas."],
  ["Posso ganhar recompensas?", "Sim. Desafios e conquistas podem oferecer recompensas e reconhecimento como incentivo à continuidade."],
  ["Como tirar dúvidas sobre o sistema?", "Você pode utilizar os canais de suporte da SoulUp e as áreas de ajuda disponíveis na plataforma."],
];

