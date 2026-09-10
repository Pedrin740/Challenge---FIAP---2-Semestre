
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export function RankingCard() {
    const {
        user,
        getRanking,
    } = useAuth();

    if (!user) {
        return null;
    }

    const ranking = getRanking();

    return (
        <section className="rounded-2xl border border-white/10 bg-[#121214] p-5">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="font-semibold">
                        Ranking geral
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500">
                        Todos os usuários
                    </p>
                </div>

                <Link
                    to="/ecorank/ranking"
                    className="text-xs font-semibold text-lime-400"
                >
                    Ver completo
                </Link>
            </div>

            <div className="mt-3 divide-y divide-white/5">
                {ranking
                    .slice(0, 5)
                    .map((item, index) => {
                        const isCurrentUser =
                            item.id === user.id;

                        return (
                            <div
                                key={item.id}
                                className={`flex items-center gap-3 py-3 ${isCurrentUser
                                        ? "rounded-xl bg-lime-400/[.07] px-2"
                                        : ""
                                    }`}
                            >
                                <span className="w-4 text-xs text-zinc-500">
                                    {index + 1}
                                </span>

                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-xs font-bold">
                                    {item.name.charAt(0)}
                                </div>

                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm">
                                        {item.name}

                                        {isCurrentUser && (
                                            <span className="ml-2 text-[10px] text-lime-400">
                                                (você)
                                            </span>
                                        )}
                                    </p>

                                    <p className="text-[10px] text-zinc-500">
                                        {item.ecoRank.rank}
                                    </p>
                                </div>

                                <span className="text-xs font-semibold">
                                    {item.ecoRank.points.toLocaleString(
                                        "pt-BR",
                                    )}
                                </span>
                            </div>
                        );
                    })}
            </div>
        </section>
    );
}