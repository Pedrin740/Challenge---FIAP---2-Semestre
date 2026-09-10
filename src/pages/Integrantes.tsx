const integrantes = [
  {
    nome: "Pedro Felipe de Castro Rosa",
    rm: "569049",
    imagem: "/images/pedro-felipe.jpeg",
    github: "https://github.com/Pedrin740",
    linkedin:
      "https://www.linkedin.com/in/pedro-felipe-castro-rosa/",
  },
  {
    nome: "Victor Ferreira Gomes",
    rm: "569273",
    imagem: "/images/victor.jpeg",
    github: "https://github.com/Victor180422",
    linkedin:
      "https://www.linkedin.com/in/victor-ferreira-gomes-63b2463b5/",
  },
  {
    nome: "Rafaela Donadio Figueiredo Tavares",
    rm: "572797",
    imagem: "/images/rafaela.jpeg",
    github: "https://github.com/mrafahdft",
    linkedin:
      "https://www.linkedin.com/in/rafaela-donadio-bb3740369/",
  },
  {
    nome: "Pedro Henrique Cavalcante De Souza",
    rm: "570464",
    imagem: "/images/pedro-henrique.jpeg",
    github: "https://github.com/pedrostack-01",
    linkedin:
      "https://www.linkedin.com/in/pedro-souza-6282333b3/",
  },
  {
    nome: "Guilherme Joel de Camargo",
    rm: "570403",
    imagem: "/images/guilherme.jpeg",
    github: "https://github.com/guilhermejcam",
    linkedin:
      "https://www.linkedin.com/in/guilherme-camargo-a06410410/",
  },
];

export function Integrantes() {
  return (
    <div className="mx-auto max-w-[1200px] p-4 pb-24 sm:p-6 lg:p-8">
      <section className="mb-8 rounded-3xl border border-white/10 bg-[#121214] p-6 sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-lime-400">
          InovaTech
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Integrantes
        </h1>

        <p className="mt-3 text-zinc-400">
          Equipe responsável pelo desenvolvimento da proposta EcoRank.
        </p>
      </section>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
        {integrantes.map((integrante, index) => (
          <article
            key={integrante.rm}
            className={`rounded-3xl border border-white/10 bg-[#121214] p-6 text-center transition hover:-translate-y-1 hover:border-lime-400/20 lg:col-span-2 ${
              index === 3
                ? "lg:col-start-2"
                : index === 4
                  ? "lg:col-start-4"
                  : ""
            }`}
          >
            <img
              src={integrante.imagem}
              alt={`Foto de ${integrante.nome}`}
              className="mx-auto h-28 w-28 rounded-full border-2 border-lime-400/40 object-cover"
            />

            <h2 className="mt-5 text-lg font-bold">
              {integrante.nome}
            </h2>

            <p className="mt-2 text-sm text-zinc-500">
              RM: {integrante.rm}
            </p>

            <p className="text-sm text-zinc-500">
              Turma: 1TDSPK
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <a
                href={integrante.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-white/5"
              >
                GitHub
              </a>

              <a
                href={integrante.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-zinc-300 transition hover:bg-white/5"
              >
                LinkedIn
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}