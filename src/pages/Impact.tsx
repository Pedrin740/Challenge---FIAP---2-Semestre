import React from 'react';
import { TrendingDown, Zap, Trash2, Award } from 'lucide-react';

export interface StatMetric {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  bg: string;
}

export const Impact: React.FC = () => {
  const stats: StatMetric[] = [
    {
      label: 'CO₂ Evitado',
      value: '142 kg',
      change: '-18% este mês',
      icon: <TrendingDown className="w-6 h-6 text-emerald-600" />,
      bg: 'bg-emerald-50',
    },
    {
      label: 'Energia Poupada',
      value: '230 kWh',
      change: '+12% eficiência',
      icon: <Zap className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-50',
    },
    {
      label: 'Resíduos Desviados',
      value: '45 kg',
      change: '8 coletas registradas',
      icon: <Trash2 className="w-6 h-6 text-teal-600" />,
      bg: 'bg-teal-50',
    },
    {
      label: 'Pontos EcoRank',
      value: '1.280 pts',
      change: 'Nível: Guardião Verde',
      icon: <Award className="w-6 h-6 text-indigo-600" />,
      bg: 'bg-indigo-50',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Seu Impacto Ambiental</h1>
        <p className="text-sm text-gray-500">Métricas consolidadas a partir das suas ações verificadas</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-500">{stat.label}</span>
              <div className={`p-2 rounded-lg ${stat.bg}`}>{stat.icon}</div>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.change}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Impact;