import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { challenges } from "../data/mock";
import { Icon } from "./Icons";

export function ChallengeCard() {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    const challenge = challenges[0];

    const progress =
        user.ecoRank.challengeProgress[challenge.title] ?? 0;

    return (
        <section className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-950/35 to-[#121214] p-5">
            <div className="flex items-start justify-between gap-5">
                <div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-purple-300">
                        <Icon
                            name="target"
                            size={18}
                        />

                        Desafio da semana
                    </div>

                    <h2 className="mt-4 text-xl font-bold">
                        {challenge.title}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                        {challenge.description}
                    </p>

                    <p className="mt-4 text-lg font-bold text-lime-400">
                        +{challenge.reward} pontos
                    </p>

                    <div className="mt-4">
                        <div className="flex justify-between text-xs text-zinc-500">
                            <span>
                                Progresso
                            </span>

                            <span>
                                {progress}%
                            </span>
                        </div>

                        <div className="mt-2 h-2 rounded-full bg-white/10">
                            <div
                                className="h-full rounded-full bg-lime-400 transition-all"
                                style={{
                                    width: `${progress}%`,
                                }}
                            />
                        </div>
                    </div>

                    <Link
                        to="/ecorank/desafios"
                        className="mt-4 inline-flex rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-bold transition hover:bg-purple-500"
                    >
                        Participar
                    </Link>
                </div>

                <div className="hidden h-24 w-24 items-center justify-center rounded-full bg-lime-400/10 text-lime-400 sm:flex">
                    <Icon
                        name="leaf"
                        size={50}
                    />
                </div>
            </div>
        </section>
    );
}