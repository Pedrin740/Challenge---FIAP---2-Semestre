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

      <section className="mt-6 rounded-3xl border border-white/10 bg-[#121214] p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-lime-400">O problema</p>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Transformar intenção em hábito</h2>
        <p className="mt-4 max-w-4xl leading-7 text-zinc-400">
          Muitas pessoas sabem da importância da sustentabilidade, mas não encontram incentivo ou motivação suficientes para aplicar essas práticas no cotidiano. O EcoRank busca transformar conscientização em participação contínua, reconhecendo atitudes sustentáveis e tornando a experiência mais motivadora.
        </p>
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-white/10 bg-[#121214] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-lime-400">Nossa solução</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Ação, validação e evolução</h2>
          <p className="mt-4 leading-7 text-zinc-400">
            O usuário realiza uma ação sustentável e envia uma evidência, como foto ou vídeo. A proposta prevê validação automática com inteligência artificial e, após a aprovação, a ação gera pontos para sua evolução dentro do EcoRank.
          </p>
        </article>
        <article className="rounded-3xl border border-white/10 bg-[#121214] p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-lime-400">Como funciona</p>
          <ol className="mt-5 grid gap-4 text-sm text-zinc-300">
            {[
              "O usuário realiza uma ação sustentável.",
              "Registra e envia uma evidência pela plataforma.",
              "O sistema valida a ação.",
              "A ação aprovada gera pontos.",
              "O usuário evolui no ranking, do Bronze ao Esmeralda.",
            ].map((item, index) => (
              <li key={item} className="flex gap-3 rounded-xl border border-white/5 bg-white/[.03] p-3">
                <span className="font-bold text-lime-400">0{index + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </article>
      </section>

       <section className="mt-6 rounded-3xl border border-white/10 bg-[#121214] p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-lime-400">Diferenciais</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {["Gamificação com níveis", "Validação por evidência", "Ranking entre usuários", "Desafios e recompensas", "Foco em impacto real"].map((item) => (
            <div key={item} className="rounded-2xl border border-white/10 bg-white/[.03] p-5">
              <div className="text-xl text-lime-400">✓</div>
              <p className="mt-3 text-sm font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </section>

            <section className="mt-6 grid gap-8 rounded-3xl border border-white/10 bg-[#121214] p-6 sm:p-8 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-lime-400">Tecnologias utilizadas</p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Frontend moderno e preparado para evolução</h2>
          <p className="mt-4 leading-7 text-zinc-400">
            O protótipo atual foi adaptado para React, Vite e TypeScript, utilizando Tailwind CSS v4 para a interface. A arquitetura permite futuras integrações com backend, banco de dados e inteligência artificial para validação das ações.
          </p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {["React", "Vite", "TypeScript", "Tailwind CSS v4"].map((item) => (
              <span key={item} className="rounded-xl border border-lime-400/20 bg-lime-400/5 px-3 py-3 text-center text-xs font-semibold text-lime-300">{item}</span>
            ))}
          </div>
        </div>
        <img src="/images/tecnologias-utilizadas.png" alt="Tecnologias utilizadas no projeto" className="w-full rounded-2xl border border-white/10" />
      </section>
    </div>
  );
}