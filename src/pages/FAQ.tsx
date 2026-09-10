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

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-[1000px] p-4 pb-24 sm:p-6 lg:p-8">
      <section className="mb-8 rounded-3xl border border-white/10 bg-[#121214] p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-lime-400">Ajuda</p>
        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Perguntas frequentes</h1>
        <p className="mt-3 text-zinc-400">Encontre respostas sobre o EcoRank e seu funcionamento dentro da SoulUp.</p>
      </section>

      <div className="grid gap-3">
        {questions.map(([question, answer], index) => {
          const isOpen = open === index;
          return (
            <article key={question} className="overflow-hidden rounded-2xl border border-white/10 bg-[#121214]">
              <button type="button" onClick={() => setOpen(isOpen ? null : index)} className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left font-semibold transition hover:bg-white/[.03]">
                <span>{question}</span>
                <span className={`text-xl text-lime-400 transition ${isOpen ? "rotate-45" : ""}`}>+</span>
              </button>
              {isOpen && <p className="border-t border-white/10 px-5 py-5 text-sm leading-7 text-zinc-400">{answer}</p>}
            </article>
          );
        })}
      </div>
    </div>
  );
}
