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

      <div className="mt-5 flex items-center gap-5">
        <div
          className="relative h-28 w-28 shrink-0 rounded-full"
          style={{
            background: hasActions
              ? gradient
              : "#27272a",
          }}
        >
          <div className="absolute inset-[25%] rounded-full bg-[#121214]" />
        </div>

        <div className="flex-1 space-y-2">
          {categories.map(
            (category, index) => (
              <div
                key={category.label}
                className="flex items-center justify-between gap-2 text-xs"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor:
                        categoryColors[
                          index %
                            categoryColors.length
                        ],
                    }}
                  />

                  <span className="truncate text-zinc-400">
                    {category.label}
                  </span>
                </div>

                <b>
                  {category.value}%
                </b>
              </div>
            ),
          )}
        </div>
      </div>

      {!hasActions && (
        <p className="mt-4 text-xs text-zinc-600">
          Registre uma ação para preencher este gráfico.
        </p>
      )}
    </section>
  );
}