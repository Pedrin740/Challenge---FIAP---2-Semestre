import React, { useState } from 'react';
import { CheckCircle, Plus } from 'lucide-react';

export interface Goal {
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
          <div key={goal.id} className="p-4 border rounded flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button onClick={() => toggleGoal(goal.id)}>
                <CheckCircle className={`w-5 h-5 ${goal.completed ? 'text-emerald-500' : 'text-gray-300'}`} />
              </button>
              <span className={goal.completed ? 'line-through text-gray-400' : ''}>{goal.title}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeusObjetivos;