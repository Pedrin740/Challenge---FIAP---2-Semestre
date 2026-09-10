import { Link, Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { challenges } from "../data/mock";

import { EcoRankHeader } from "../components/EcoRankHeader";
import { Icon } from "../components/Icons";

export function Challenges() {
    const { user } = useAuth();

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return (
        <div className="mx-auto max-w-[1050px] p-4 pb-24 sm:p-6 lg:p-8">
            <EcoRankHeader
                title="Desafios"
                subtitle="Participe, pontue e avance no EcoRank."
            />

            <div className="mt-4 grid gap-4 md:grid-cols-2">
                {challenges.map((challenge, index) => {
                    const progress =
                        user.ecoRank.challengeProgress[
                        challenge.title
                        ] ?? 0;

                    return (
                        <section
                            key={challenge.title}
                            className="rounded-2xl border border-white/10 bg-[#121214] p-5"
                        >
                            <div className="flex items-center gap-2 text-sm text-purple-300">
                                <Icon
                                    name="target"
                                    size={18}
                                />

                                {index === 0
                                    ? "Desafio da semana"
                                    : "Desafio ativo"}
                            </div>

                            <h2 className="mt-4 text-xl font-bold">
                                {challenge.title}
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-zinc-400">
                                {challenge.description}
                            </p>

                            <div className="mt-5 flex justify-between text-xs">
                                <span className="font-bold text-lime-400">
                                    +{challenge.reward} pontos
                                </span>

                                <span className="text-zinc-500">
                                    {progress}% concluído
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