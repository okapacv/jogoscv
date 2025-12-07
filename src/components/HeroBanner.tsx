import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Game } from '../lib/database.types';

interface HeroBannerProps {
  featuredGames: Game[];
  onGameClick: (game: Game) => void;
}

export default function HeroBanner({ featuredGames, onGameClick }: HeroBannerProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (featuredGames.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredGames.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredGames.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredGames.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredGames.length) % featuredGames.length);
  };

  if (featuredGames.length === 0) {
    return (
      <div className="relative h-[500px] bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl overflow-hidden flex items-center justify-center">
        <p className="text-gray-400">Carregando promoções...</p>
      </div>
    );
  }

  const currentGame = featuredGames[currentSlide];

  return (
    <div className="relative h-[500px] rounded-2xl overflow-hidden group">
      <div className="absolute inset-0">
        <img
          src={currentGame.cover_image_url || 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1200'}
          alt={currentGame.title}
          className="w-full h-full object-cover scale-110 animate-subtle-zoom"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
      </div>

      <div className="relative h-full container mx-auto px-4 flex items-center">
        <div className="max-w-2xl">
          {currentGame.discount_percentage > 0 && (
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-full font-bold mb-4 animate-pulse">
              <span className="text-2xl">-{currentGame.discount_percentage}%</span>
              <span className="text-sm">DE DESCONTO</span>
            </div>
          )}

          <h2 className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight">
            {currentGame.title}
          </h2>

          <p className="text-gray-300 text-lg mb-6 line-clamp-3">
            {currentGame.description || 'Aproveite esta incrível promoção!'}
          </p>

          <div className="flex items-center gap-4 mb-6">
            {currentGame.original_price && currentGame.promotional_price && (
              <>
                <span className="text-gray-400 text-2xl line-through">
                  {currentGame.original_price.toFixed(2)} CVE
                </span>
                <span className="text-cyan-400 text-4xl font-bold">
                  {currentGame.promotional_price.toFixed(2)} CVE
                </span>
              </>
            )}
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => onGameClick(currentGame)}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-cyan-500/30"
            >
              Ver Detalhes
              <ExternalLink className="w-5 h-5" />
            </button>

            {currentGame.purchase_url && (
              <a
                href={currentGame.purchase_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="px-8 py-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-cyan-500 text-white font-bold rounded-lg transition-all duration-200"
              >
                Comprar Agora
              </a>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {featuredGames.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'w-8 bg-cyan-500'
                : 'w-2 bg-slate-600 hover:bg-slate-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
