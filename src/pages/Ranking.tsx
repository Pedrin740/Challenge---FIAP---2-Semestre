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

                <aside className="rounded-2xl border border-white/10 bg-[#121214] p-5">
                    <p className="text-sm text-zinc-500">
                        Sua posição
                    </p>

                    <p className="mt-2 text-4xl font-bold text-lime-400">
                        {currentPosition}º
                    </p>

                    <p className="mt-2 text-sm text-zinc-400">
                        {user.ecoRank.points.toLocaleString("pt-BR")} pontos
                    </p>

                    <div className="mt-5 rounded-xl border border-white/5 bg-white/[.02] p-4">
                        <p className="text-xs text-zinc-500">
                            Seu ranque
                        </p>

                        <p className="mt-1 text-lg font-bold">
                            {user.ecoRank.rank}
                        </p>

                        {user.ecoRank.nextRank !== user.ecoRank.rank && (
                            <>
                                <p className="mt-3 text-xs text-zinc-500">
                                    Próximo ranque
                                </p>

                                <p className="mt-1 font-semibold text-lime-400">
                                    {user.ecoRank.nextRank}
                                </p>

                                <p className="mt-1 text-xs text-zinc-500">
                                    {user.ecoRank.nextRankPoints.toLocaleString(
                                        "pt-BR",
                                    )}{" "}
                                    pontos
                                </p>
                            </>
                        )}
                    </div>
                </aside>
            </div>

            <section className="mt-4 rounded-2xl border border-white/10 bg-[#121214] p-5">
                <div className="mb-4">
                    <h2 className="font-semibold">
                        Ranking geral
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500">
                        Confira a pontuação e o ranque de todos os usuários.
                    </p>
                </div>

                <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full min-w-[650px] border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-white/10 bg-white/[.02]">
                                <th className="w-16 px-4 py-3 text-center font-semibold">
                                    #
                                </th>

                                <th className="px-4 py-3 text-left font-semibold">
                                    Usuário
                                </th>

                                <th className="px-4 py-3 text-left font-semibold">
                                    Ranque
                                </th>

                                <th className="px-4 py-3 text-right font-semibold">
                                    Pontos
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {ranking.map((item, index) => {
                                const isCurrentUser =
                                    item.id === user.id;

                                return (
                                    <tr
                                        key={item.id}
                                        className={`border-b border-white/5 last:border-b-0 ${isCurrentUser
                                                ? "bg-lime-400/[.07]"
                                                : ""
                                            }`}
                                    >
                                        <td className="px-4 py-4 text-center font-semibold text-zinc-500">
                                            {index + 1}
                                        </td>

                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 font-bold">
                                                    {item.name.charAt(0)}
                                                </div>

                                                <div>
                                                    <p className="font-semibold">
                                                        {item.name}
                                                    </p>

                                                    {isCurrentUser && (
                                                        <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-lime-400">
                                                            Você
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${item.ecoRank.rank === "Bronze"
                                                        ? "bg-amber-600/10 text-amber-500"
                                                        : item.ecoRank.rank === "Prata"
                                                            ? "bg-zinc-300/10 text-zinc-300"
                                                            : item.ecoRank.rank === "Ouro"
                                                                ? "bg-yellow-400/10 text-yellow-400"
                                                                : item.ecoRank.rank === "Diamante"
                                                                    ? "bg-cyan-400/10 text-cyan-400"
                                                                    : "bg-emerald-400/10 text-emerald-400"
                                                    }`}
                                            >
                                                {item.ecoRank.rank}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4 text-right font-bold">
                                            {item.ecoRank.points.toLocaleString(
                                                "pt-BR",
                                            )}{" "}
                                            pts
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}