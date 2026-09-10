import React, { useState } from 'react';
import { Search } from 'lucide-react';

export interface Article {
  id: number;
  title: string;
  category: string;
  readTime: string;
  summary: string;
  sourceUrl: string;
}

export const Conteudos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const articles: Article[] = [
    {
      id: 1,
      title: 'Economia Circular: Muito Além da Reciclagem',
      category: 'Economia Circular',
      readTime: '4 min',
      summary: 'Entenda os princípios de regeneração e ciclo fechado na indústria e consumo.',
      sourceUrl: '#',
    },
    {
      id: 2,
      title: 'Mobilidade Ativa e a Redução do CO₂ Urbano',
      category: 'Transporte',
      readTime: '6 min',
      summary: 'Como a transição para bicicletas e transporte coletivo transforma a qualidade do ar.',
      sourceUrl: '#',
    },
    {
      id: 3,
      title: 'Compostagem Doméstica Simples',
      category: 'Resíduos',
      readTime: '5 min',
      summary: 'Guia prático para processar matéria orgânica e enriquecer solos residenciais.',
      sourceUrl: '#',
    },
  ];

  const filtered = articles.filter((a) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Biblioteca de Sustentabilidade</h1>
          <p className="text-sm text-gray-500">Materiais informativos e boas práticas ambientais</p>
        </div>
        <div className="relative w-full md:w-64">
          <Search className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Pesquisar artigos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((item) => (
          <div key={item.id} className="p-4 border rounded">
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Conteudos;