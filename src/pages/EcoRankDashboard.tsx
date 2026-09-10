import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { CategoryChart } from "../components/CategoryChart";
import { ChallengeCard } from "../components/ChallengeCard";
import { EcoRankHeader } from "../components/EcoRankHeader";
import { ImpactChart } from "../components/ImpactChart";
import { LevelCard } from "../components/LevelCard";
import { QuickActions } from "../components/QuickActions";
import { RankingCard } from "../components/RankingCard";
import { StatCard } from "../components/StatCard";

export function EcoRankDashboard() {
    const { user, getRanking } = useAuth();

    const [calculandoRanking, setCalculandoRanking] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setCalculandoRanking(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    const ecoRank = user.ecoRank;
    const ranking = getRanking();

    const posicaoUsuario =
        ranking.findIndex(
            (item) => item.id === user.id,
        ) + 1;

    return (
        <div className="mx-auto max-w-[1320px] p-4 pb-24 sm:p-6 lg:p-8">
            <EcoRankHeader />
        </div>
    );
}