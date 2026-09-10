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

    const totalHistoryPoints =
        actionHistory.reduce(
            (sum, action) =>
                sum + action.points,
            0,
        );

    const initialPoints = Math.max(
        0,
        user.ecoRank.points -
        totalHistoryPoints,
    );

    const pointsBeforePeriod =
        actionHistory
            .filter(
                (action) =>
                    new Date(action.date) <
                    thirtyDaysAgo,
            )
            .reduce(
                (sum, action) =>
                    sum + action.points,
                0,
            );

    let currentPoints =
        initialPoints +
        pointsBeforePeriod;

    const recentActions =
        actionHistory
            .filter(
                (action) =>
                    new Date(action.date) >=
                    thirtyDaysAgo &&
                    new Date(action.date) <= now,
            )
            .sort(
                (a, b) =>
                    new Date(a.date).getTime() -
                    new Date(b.date).getTime(),
            );

    const groupedActions =
        new Map<string, number>();

    recentActions.forEach(
        (action) => {
            const actionDate =
                new Date(action.date);

            const key =
                actionDate.toISOString()
                    .split("T")[0];

            const currentValue =
                groupedActions.get(key) ??
                0;

            groupedActions.set(
                key,
                currentValue +
                action.points,
            );
        },
    );

    const timeline: {
        label: string;
        value: number;
    }[] = [
            {
                label: formatDate(
                    thirtyDaysAgo,
                ),
                value: currentPoints,
            },
        ];

    Array.from(
        groupedActions.entries(),
    )
        .sort(
            ([dateA], [dateB]) =>
                dateA.localeCompare(
                    dateB,
                ),
        )
        .forEach(
            ([date, points]) => {
                currentPoints += points;

                timeline.push({
                    label: formatDate(
                        new Date(
                            `${date}T12:00:00`,
                        ),
                    ),
                    value: currentPoints,
                });
            },
        );

    if (timeline.length === 1) {
        timeline.push({
            label: formatDate(now),
            value: user.ecoRank.points,
        });
    }

    const visibleTimeline =
        timeline.length > 7
            ? [
                timeline[0],
                ...timeline.slice(-6),
            ]
            : timeline;

    const values =
        visibleTimeline.map(
            (item) => item.value,
        );

    const maxValue =
        Math.max(
            ...values,
            100,
        );

    const minValue =
        Math.min(
            ...values,
            0,
        );

    const range =
        Math.max(
            maxValue - minValue,
            100,
        );

    const chartHeight = 115;

    const points = visibleTimeline
        .map((item, index) => {
            const x =
                visibleTimeline.length === 1
                    ? 180
                    : 20 +
                    (index /
                        (visibleTimeline.length -
                            1)) *
                    320;

            const y =
                145 -
                ((item.value -
                    minValue) /
                    range) *
                chartHeight;

            return `${x},${y}`;
        })
        .join(" ");

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