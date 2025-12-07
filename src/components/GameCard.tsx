import { Heart, Star, TrendingDown } from 'lucide-react';
import type { Game, Platform } from '../lib/database.types';

interface GameCardProps {
  game: Game & { platforms?: Platform };
  onGameClick: (game: Game) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (gameId: string) => void;
}

export default function GameCard({ game, onGameClick, isFavorite, onToggleFavorite }: GameCardProps) {
  const hasDiscount = game.discount_percentage > 0;

  return (
    <div
      className="group bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/20 cursor-pointer"
      onClick={() => onGameClick(game)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-slate-900">
        <img
          src={game.cover_image_url || 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 rounded-lg font-bold text-sm shadow-lg flex items-center gap-1">
            <TrendingDown className="w-4 h-4" />
            -{game.discount_percentage}%
          </div>
        )}

        {game.is_featured && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-lg font-bold text-xs shadow-lg flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" />
            DESTAQUE
          </div>
        )}

        {onToggleFavorite && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(game.id);
            }}
            className={`absolute bottom-3 right-3 p-2 rounded-lg transition-all duration-200 ${
              isFavorite
                ? 'bg-red-500 text-white'
                : 'bg-slate-900/80 text-gray-300 hover:bg-slate-800 hover:text-red-400'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {game.platforms && (
            <span className="text-xs text-cyan-400 font-medium">
              {game.platforms.name}
            </span>
          )}
          {game.genre && (
            <span className="text-xs text-gray-500">• {game.genre}</span>
          )}
        </div>

        <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-cyan-400 transition-colors">
          {game.title}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {hasDiscount && game.original_price && (
              <span className="text-gray-500 text-sm line-through">
                {game.original_price.toFixed(2)} CVE
              </span>
            )}
            <span className="text-cyan-400 font-bold text-xl">
              {game.promotional_price?.toFixed(2) || game.original_price?.toFixed(2) || '---'} CVE
            </span>
          </div>

          {game.promotion_type && (
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              game.promotion_type === 'preorder'
                ? 'bg-purple-500/20 text-purple-400'
                : game.promotion_type === 'launch'
                ? 'bg-green-500/20 text-green-400'
                : 'bg-blue-500/20 text-blue-400'
            }`}>
              {game.promotion_type === 'preorder' ? 'Pré-venda' :
               game.promotion_type === 'launch' ? 'Lançamento' :
               'Promoção'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
