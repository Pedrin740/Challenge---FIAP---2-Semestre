import { EcoLogo } from "./Icons";

type Props = {
  title?: string;
  subtitle?: string;
};

export function EcoRankHeader({
  title = "EcoRank",
  subtitle = "Acompanhe seu impacto e evolução dentro do EcoRank.",
}: Props) {
  return (
    <div className="border border-white/10 bg-[#121214] relative overflow-hidden rounded-2xl p-5 sm:p-6">
      <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full bg-lime-400/10 blur-3xl" />

      <div className="relative flex items-center gap-4">
        <EcoLogo compact />

        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
          <p className="mt-1 text-sm text-zinc-400">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}