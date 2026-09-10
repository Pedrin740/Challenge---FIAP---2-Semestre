import { useAuth } from "../context/AuthContext";

const categoryColors = [
    "#a3e635",
    "#65a30d",
    "#7dd3fc",
    "#facc15",
    "#94a3b8",
];

export function CategoryChart() {
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    const categories =
        user.ecoRank.categories;

    let accumulated = 0;

    const gradientParts =
        categories.map(
            (category, index) => {
                const start =
                    accumulated;

                const end =
                    accumulated +
                    category.value;

                accumulated = end;

                return `${categoryColors[index % categoryColors.length]} ${start}% ${end}%`;
            },
        );

    const gradient =
        `conic-gradient(${gradientParts.join(",")})`;

    const hasActions =
        user.ecoRank.actions > 0 &&
        categories.some(
            (category) =>
                category.value > 0,
        );

    return (
        <section className="rounded-2xl border border-white/10 bg-[#121214] p-5">
            <h2 className="font-semibold">
                Ações por categoria
            </h2>
        </section>
    );
}