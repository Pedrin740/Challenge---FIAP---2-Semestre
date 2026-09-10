import { Navigate } from "react-router-dom";

import { useAuth, type Rank } from "../context/AuthContext";

import { EcoRankHeader } from "../components/EcoRankHeader";

const rankRequirements: {
    rank: Rank;
    points: number;
}[] = [
        {
            rank: "Bronze",
            points: 0,
        },
        {
            rank: "Prata",
            points: 1000,
        },
        {
            rank: "Ouro",
            points: 2000,
        },
        {
            rank: "Diamante",
            points: 4000,
        },
        {
            rank: "Esmeralda",
            points: 7000,
        },
    ];

export function Ranking() {
    const { user, getRanking } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const ranking = getRanking();

    const currentPosition =
        ranking.findIndex((item) => item.id === user.id) + 1;

    return (
        <div className="mx-auto max-w-[1100px] p-4 pb-24 sm:p-6 lg:p-8">
            <EcoRankHeader
                title="Ranking"
                subtitle="Veja sua posição, os outros usuários e os pontos necessários para cada ranque."
            />

            <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_330px]">
                <section className="rounded-2xl border border-white/10 bg-[#121214] p-5">
                    <div className="mb-4">
                        <h2 className="font-semibold">
                            Pontos necessários por ranque
                        </h2>

                        <p className="mt-1 text-xs text-zinc-500">
                            Quanto você precisa acumular para alcançar cada nível.
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-white/10">
                        <table className="w-full border-collapse text-sm">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/[.02]">
                                    <th className="px-4 py-3 text-left font-semibold">
                                        Ranque
                                    </th>

                                    <th className="px-4 py-3 text-right font-semibold">
                                        Pontos necessários
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {rankRequirements.map((item) => {
                                    const isCurrentRank =
                                        user.ecoRank.rank === item.rank;

                                    return (
                                        <tr
                                            key={item.rank}
                                            className={`border-b border-white/5 last:border-b-0 ${isCurrentRank
                                                    ? "bg-lime-400/[.07]"
                                                    : ""
                                                }`}
                                        >
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className={`h-2.5 w-2.5 rounded-full ${item.rank === "Bronze"
                                                                ? "bg-amber-600"
                                                                : item.rank === "Prata"
                                                                    ? "bg-zinc-300"
                                                                    : item.rank === "Ouro"
                                                                        ? "bg-yellow-400"
                                                                        : item.rank === "Diamante"
                                                                            ? "bg-cyan-400"
                                                                            : "bg-emerald-400"
                                                            }`}
                                                    />

                                                    <span className="font-semibold">
                                                        {item.rank}
                                                    </span>

                                                    {isCurrentRank && (
                                                        <span className="rounded-full bg-lime-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-lime-400">
                                                            Você
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="px-4 py-3 text-right font-semibold text-zinc-300">
                                                {item.points.toLocaleString("pt-BR")} pts
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </section>