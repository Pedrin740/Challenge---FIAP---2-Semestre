import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { buscarImpacto, type ImpactoApi } from "../services/ecoRankApi";

type PontoGrafico = {
  label: string;
  value: number;
};

function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
  });
}

export function ImpactChart() {
  const { user } = useAuth();
  const [impacto, setImpacto] = useState<ImpactoApi | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarImpacto() {
      const token = localStorage.getItem("ecorank_token");

      if (!token) {
        if (ativo) {
          setErro("Faça login para visualizar sua evolução.");
          setCarregando(false);
        }
        return;
      }

      try {
        setCarregando(true);
        setErro("");

        const dados = await buscarImpacto(token);

        if (ativo) {
          setImpacto(dados);
        }
      } catch (error) {
        console.error("Erro ao carregar evolução de pontos:", error);

        if (ativo) {
          setErro("Não foi possível carregar a evolução de pontos.");
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    void carregarImpacto();

    return () => {
      ativo = false;
    };
  }, []);

  if (!user) {
    return null;
  }

  const hoje = new Date();
  const inicioPeriodo = new Date(
    hoje.getFullYear(),
    hoje.getMonth(),
    hoje.getDate() - 29,
  );

  const timeline: PontoGrafico[] = [];

  if (impacto) {
    timeline.push({
      label: formatDate(inicioPeriodo),
      value: impacto.pontosIniciais,
    });

    impacto.evolucao.forEach((item) => {
      const data = new Date(`${item.data}T12:00:00`);

      timeline.push({
        label: formatDate(data),
        value: item.acumulado,
      });
    });

    if (impacto.evolucao.length === 0) {
      timeline.push({
        label: formatDate(hoje),
        value: impacto.pontos,
      });
    }
  }

  const visibleTimeline =
    timeline.length > 7
      ? [timeline[0], ...timeline.slice(-6)]
      : timeline;

  const values = visibleTimeline.map((item) => item.value);

  const maxValue = Math.max(...values, 100);
  const minValue = Math.min(...values, 0);
  const range = Math.max(maxValue - minValue, 100);
  const chartHeight = 115;

  const calcularX = (index: number) =>
    visibleTimeline.length === 1
      ? 180
      : 20 + (index / (visibleTimeline.length - 1)) * 320;

  const calcularY = (value: number) =>
    145 - ((value - minValue) / range) * chartHeight;

  const points = visibleTimeline
    .map((item, index) => {
      return `${calcularX(index)},${calcularY(item.value)}`;
    })
    .join(" ");

  const semAcoes = impacto?.totalAcoes === 0;

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

      {carregando ? (
        <div className="mt-4 flex h-[180px] items-center justify-center">
          <p className="text-sm text-zinc-500">
            Carregando evolução...
          </p>
        </div>
      ) : erro ? (
        <div className="mt-4 flex h-[180px] items-center justify-center text-center">
          <p className="text-sm text-red-400">
            {erro}
          </p>
        </div>
      ) : semAcoes ? (
        <div className="mt-4 flex h-[180px] items-center justify-center text-center">
          <div>
            <p className="text-sm text-zinc-400">
              Ainda não há ações aprovadas no gráfico.
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              Registre uma ação para acompanhar sua evolução.
            </p>
          </div>
        </div>
      ) : (
        <>
          <svg
            viewBox="0 0 360 170"
            className="mt-4 h-[180px] w-full"
          >
            <line
              x1="20"
              y1="145"
              x2="340"
              y2="145"
              stroke="rgba(255,255,255,.08)"
            />

            <line
              x1="20"
              y1="90"
              x2="340"
              y2="90"
              stroke="rgba(255,255,255,.08)"
            />

            <line
              x1="20"
              y1="35"
              x2="340"
              y2="35"
              stroke="rgba(255,255,255,.08)"
            />

            <polyline
              points={points}
              fill="none"
              stroke="#a3e635"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {visibleTimeline.map((item, index) => (
              <circle
                key={`${item.label}-${index}`}
                cx={calcularX(index)}
                cy={calcularY(item.value)}
                r="4"
                fill="#a3e635"
              />
            ))}
          </svg>

          <div
            className="grid gap-2 text-[10px] text-zinc-600"
            style={{
              gridTemplateColumns: `repeat(${visibleTimeline.length}, minmax(0, 1fr))`,
            }}
          >
            {visibleTimeline.map((item, index) => (
              <span
                key={`${item.label}-label-${index}`}
                className={
                  index === visibleTimeline.length - 1
                    ? "text-right"
                    : index === 0
                      ? "text-left"
                      : "text-center"
                }
              >
                {item.label}
              </span>
            ))}
          </div>

          <p className="mt-2 text-xs text-zinc-500">
            Total de pontos:{" "}
            <strong className="text-lime-400">
              {impacto?.pontos.toLocaleString("pt-BR")}
            </strong>
          </p>
        </>
      )}
    </section>
  );
}