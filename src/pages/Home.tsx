import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Home() {
  const { user } = useAuth();

  return (
    <div className="mx-auto max-w-[1200px] p-4 pb-24 sm:p-6 lg:p-8">
      <section className="rounded-3xl border border-white/10 bg-[#121214] p-7 sm:p-10">
        <p className="text-sm text-zinc-500">
          SoulUp
        </p>

        <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
          Olá, {user?.name}! 👋
        </h1>

        <p className="mt-2 text-zinc-400">
          Acompanhe sua jornada e descubra novas experiências.
        </p>

        <div className="mt-8 w-full rounded-2xl border border-lime-400/20 bg-lime-400/5 p-6 sm:p-7 md:mx-auto md:max-w-3xl lg:max-w-4xl lg:p-8">
          <p className="text-sm font-semibold text-lime-400">
            Uma nova experiência no SoulUp
          </p>

          <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
            EcoRank
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
            Registre ações sustentáveis, acumule pontos e acompanhe sua
            evolução no ranking.
          </p>

          <Link
            to="/ecorank"
            className="mt-5 inline-flex rounded-lg bg-lime-400 px-5 py-2.5 text-sm font-bold text-zinc-950 transition hover:bg-lime-300 sm:px-6 sm:py-3"
          >
            Acessar EcoRank
          </Link>
        </div>
      </section>
    </div>
  );
}