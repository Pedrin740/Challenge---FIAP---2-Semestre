import React from 'react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <section className="w-full my-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Ações Rápidas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Itens inseridos no próximo commit */}
      </div>
    </section>
  );
};

export default QuickActions;