import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Leaf, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ActionForm {
  title: string;
  category: string;
  description: string;
  estimatedImpact: string;
}

export const SubmitAction: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ActionForm>({
    title: '',
    category: 'reciclagem',
    description: '',
    estimatedImpact: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title || !formData.description) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => navigate('/impact'), 1500);
    }, 1000);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Registrar Ação Sustentável</h1>
            <p className="text-sm text-gray-500">Contribua para o ranking e reduza sua pegada ecológica</p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-xl flex items-center space-x-2 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-4 bg-emerald-50 text-emerald-700 rounded-xl flex items-center space-x-2 text-sm">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            <span>Ação registrada com sucesso! Redirecionando...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título da Ação *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex: Descarte correto de eletrônicos"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 bg-white"
            >
              <option value="reciclagem">Reciclagem & Resíduos</option>
              <option value="mobilidade">Mobilidade Ativa / Coletiva</option>
              <option value="energia">Conservação de Energia</option>
              <option value="consumo">Consumo Consciente</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Estimativa de Impacto (opcional)</label>
            <input
              type="text"
              name="estimatedImpact"
              value={formData.estimatedImpact}
              onChange={handleChange}
              placeholder="Ex: 5 kg de resíduos ou 3 km de bike"
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição Detalhada *</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Descreva como a atividade foi executada..."
              className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
            <span>{isSubmitting ? 'Enviando...' : 'Submeter Ação'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitAction;