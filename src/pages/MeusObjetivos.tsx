import React, { useState } from 'react';
import { CheckCircle, Plus } from 'lucide-react';

interface Goal {
  id: number;
  title: string;
  category: string;
  progress: number;
  target: string;
  completed: boolean;
}

export const MeusObjetivos: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      title: 'Pedalar 50 km para o trabalho',
      category: 'Mobilidade',
      progress: 75,
      target: '50 km',
      completed: false,
    },
    {
      id: 2,
      title: 'Compostar resíduos por 30 dias',
      category: 'Resíduos',
      progress: 100,
      target: '30 dias',
      completed: true,
    },
    {
      id: 3,
      title: 'Substituir lâmpadas residenciais por LED',
      category: 'Energia',
      progress: 40,
      target: '10 lâmpadas',
      completed: false,
    },
  ]);

  const toggleGoal = (id: number) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Meus Objetivos</h1>
          <p className="text-sm text-gray-500">Acompanhe e cumpra suas metas ecológicas</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" />
          <span>Nova Meta</span>
        </button>
      </div>

      <div className="space-y-4">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`p-5 rounded-xl border bg-white shadow-sm transition-all ${
              goal.completed ? 'border-emerald-200 bg-emerald-50/20' : 'border-gray-100'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <button
                  onClick={() => toggleGoal(goal.id)}
                  className={`mt-1 text-gray-300 hover:text-emerald-500 transition-colors ${
                    goal.completed ? 'text-emerald-500' : ''
                  }`}
                >
                  <CheckCircle className="w-5 h-5" />
                </button>
                <div>
                  <h3
                    className={`font-semibold text-gray-800 ${
                      goal.completed ? 'line-through text-gray-400' : ''
                    }`}
                  >
                    {goal.title}
                  </h3>
                  <span className="inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded bg-gray-100 text-gray-600">
                    {goal.category}
                  </span>
                </div>
              </div>
              <span className="text-xs font-semibold text-gray-500">{goal.target}</span>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  goal.completed ? 'bg-emerald-500' : 'bg-teal-500'
                }`}
                style={{ width: `${goal.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeusObjetivos;