import { useAuth } from "../context/AuthContext";

function formatDate(date: Date) {
    return date.toLocaleDateString(
        "pt-BR",
        {
            day: "2-digit",
            month: "2-digit",
        },
    );
}

export function ImpactChart() {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    const actionHistory =
        user.actionHistory ?? [];

    const now = new Date();

    const thirtyDaysAgo =
        new Date(
            now.getTime() -
            30 *
            24 *
            60 *
            60 *
            1000,
        );

    return (
        <section className="rounded-2xl border border-white/10 bg-[#121214] p-5">
            <div className="flex items-center justify-between">
                <h2 className="font-semibold">
                    Evolução de pontos
                </h2>

                <span className="text-xs text-zinc-500">
                    Últimos 30 dias
                </span>
            </div>
        </section>
    );
}