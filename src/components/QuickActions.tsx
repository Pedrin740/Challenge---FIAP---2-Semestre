import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, BookOpen, BarChart3, Target } from 'lucide-react';

export interface QuickActionItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  color: string;
}

export const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions: QuickActionItem[] = [
    {
      id: 'submit',
      title: 'Registrar Ação',
      description: 'Envie uma iniciativa sustentável',
      icon: <PlusCircle className="w-6 h-6" />,
      path: '/submit',
      color: 'bg-emerald-500 hover:bg-emerald-600',
    },
    {
      id: 'conteudos',
      title: 'Conteúdos',
      description: 'Aprenda práticas ecológicas',
      icon: <BookOpen className="w-6 h-6" />,
      path: '/conteudos',
      color: 'bg-teal-500 hover:bg-teal-600',
    },
    {
      id: 'impact',
      title: 'Meu Impacto',
      description: 'Acompanhe suas métricas de CO₂',
      icon: <BarChart3 className="w-6 h-6" />,
      path: '/impact',
      color: 'bg-cyan-500 hover:bg-cyan-600',
    },
    {
      id: 'objetivos',
      title: 'Meus Objetivos',
      description: 'Veja metas e conquistas ativas',
      icon: <Target className="w-6 h-6" />,
      path: '/meus-objetivos',
      color: 'bg-green-600 hover:bg-green-700',
    },
  ];

  return (
    <section className="w-full my-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Ações Rápidas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action) => (
          <div key={action.id}>{action.title}</div>
        ))}
      </div>
    </section>
  );
};

export default QuickActions;