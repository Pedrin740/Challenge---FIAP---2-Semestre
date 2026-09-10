import { Link } from "react-router-dom";

export function Sobre() {
  return (
    <div className="mx-auto max-w-[1200px] p-4 pb-24 sm:p-6 lg:p-8">
      <section className="grid gap-8 rounded-3xl border border-white/10 bg-[#121214] p-6 sm:p-8 lg:grid-cols-2 lg:items-center lg:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-lime-400">Sobre o projeto</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">EcoRank dentro da SoulUp</h1>
          <p className="mt-5 leading-7 text-zinc-400">
            O EcoRank é uma funcionalidade gamificada integrada à plataforma SoulUp, criada pela equipe InovaTech para incentivar práticas sustentáveis de maneira dinâmica e interativa.
          </p>
          <p className="mt-4 leading-7 text-zinc-400">
            A proposta permite que usuários registrem ações sustentáveis realizadas no cotidiano, recebam reconhecimento e acompanhem sua evolução por meio de pontos, níveis, desafios e ranking.
          </p>
          <Link to="/ecorank" className="mt-7 inline-flex rounded-xl bg-lime-400 px-5 py-3 text-sm font-bold text-zinc-950 transition hover:bg-lime-300">
            Acessar EcoRank
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/20">
          <img src="/images/ranque-do-projeto.png" alt="Ranking do projeto EcoRank" className="h-auto w-full object-cover" />
        </div>
      </section>

      