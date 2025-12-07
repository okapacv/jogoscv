import { Filter } from 'lucide-react';
import type { Platform } from '../lib/database.types';

interface FilterBarProps {
  platforms: Platform[];
  selectedPlatform: string;
  selectedPromoType: string;
  onPlatformChange: (platform: string) => void;
  onPromoTypeChange: (promoType: string) => void;
}

export default function FilterBar({
  platforms,
  selectedPlatform,
  selectedPromoType,
  onPlatformChange,
  onPromoTypeChange,
}: FilterBarProps) {
  const promoTypes = [
    { id: 'all', label: 'Todas' },
    { id: 'discount', label: 'Descontos' },
    { id: 'preorder', label: 'Pré-vendas' },
    { id: 'launch', label: 'Lançamentos' },
  ];

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-bold text-white">Filtrar Promoções</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Plataforma
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onPlatformChange('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedPlatform === 'all'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              Todas
            </button>
            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => onPlatformChange(platform.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedPlatform === platform.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {platform.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Tipo de Promoção
          </label>
          <div className="flex flex-wrap gap-2">
            {promoTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => onPromoTypeChange(type.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedPromoType === type.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
