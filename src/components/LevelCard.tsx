import { useAuth } from "../context/AuthContext";

export function LevelCard() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  const ecoRank = user.ecoRank;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#121214] p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-400">
            Nível atual
          </p>

          <p className="mt-2 text-2xl font-bold text-zinc-200">
            {ecoRank.rank}
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Multiplicador 1,2x
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-400/30 text-2xl">
          ◆
        </div>
      </div>

      <div className="mt-5">
        <div className="flex justify-between text-xs text-zinc-500">
          <span>
            Próximo nível:{" "}
            <b className="text-yellow-400">
              {ecoRank.nextRank}
            </b>
          </span>

          <span>
            {ecoRank.nextRankPoints} pts
          </span>
        </div>

        <div className="mt-2 h-2 rounded-full bg-white/10">
          <div className="h-full w-[63%] rounded-full bg-lime-400" />
        </div>
      </div>
    </div>
  );
}