import { X, ExternalLink, Star, Calendar, Users, TrendingDown, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import type { Game, Review } from '../lib/database.types';
import { supabase } from '../lib/supabase';

interface GameDetailModalProps {
  game: Game | null;
  onClose: () => void;
  user: any;
  isFavorite?: boolean;
  onToggleFavorite?: (gameId: string) => void;
}

export default function GameDetailModal({ game, onClose, user, isFavorite, onToggleFavorite }: GameDetailModalProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [loadingReview, setLoadingReview] = useState(false);

  useEffect(() => {
    if (game) {
      loadReviews();
    }
  }, [game]);

  const loadReviews = async () => {
    if (!game) return;

    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('game_id', game.id)
      .order('created_at', { ascending: false });

    if (data) {
      setReviews(data);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!game || !user) return;

    setLoadingReview(true);

    const { error } = await supabase.from('reviews').insert({
      game_id: game.id,
      user_id: user.id,
      rating: newRating,
      comment: newComment,
    });

    if (!error) {
      setNewComment('');
      setNewRating(5);
      loadReviews();
    }

    setLoadingReview(false);
  };

  if (!game) return null;

  const avgRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 animate-slideUp">
          <div className="relative h-96 rounded-t-2xl overflow-hidden">
            <img
              src={game.cover_image_url || 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1200'}
              alt={game.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-800 via-slate-800/50 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-3 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            {game.discount_percentage > 0 && (
              <div className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-lg font-bold text-lg flex items-center gap-2 shadow-lg">
                <TrendingDown className="w-5 h-5" />
                -{game.discount_percentage}%
              </div>
            )}

            <div className="absolute bottom-8 left-8 right-8">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                {game.title}
              </h2>
              <div className="flex flex-wrap gap-2">
                {game.genre && (
                  <span className="px-3 py-1 bg-slate-700/80 text-cyan-400 rounded-full text-sm font-medium">
                    {game.genre}
                  </span>
                )}
                {game.developer && (
                  <span className="px-3 py-1 bg-slate-700/80 text-gray-300 rounded-full text-sm">
                    {game.developer}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-3">Sobre o Jogo</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {game.description || 'Nenhuma descrição disponível.'}
                  </p>
                </div>

                {game.video_url && (
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-3">Trailer</h3>
                    <div className="aspect-video rounded-lg overflow-hidden bg-slate-900">
                      <iframe
                        src={game.video_url}
                        className="w-full h-full"
                        allowFullScreen
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                  <div className="space-y-4">
                    {game.original_price && game.promotional_price && (
                      <>
                        <div>
                          <span className="text-gray-400 text-sm">Preço Original</span>
                          <p className="text-gray-500 text-xl line-through">
                            {game.original_price.toFixed(2)} CVE
                          </p>
                        </div>
                        <div>
                          <span className="text-gray-400 text-sm">Preço Promocional</span>
                          <p className="text-cyan-400 text-3xl font-bold">
                            {game.promotional_price.toFixed(2)} CVE
                          </p>
                        </div>
                      </>
                    )}

                    {game.release_date && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {new Date(game.release_date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                    )}

                    {reviews.length > 0 && (
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="text-white font-bold">
                          {avgRating.toFixed(1)}
                        </span>
                        <span className="text-gray-400 text-sm">
                          ({reviews.length} {reviews.length === 1 ? 'avaliação' : 'avaliações'})
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 mt-6">
                    {game.purchase_url && (
                      <a
                        href={game.purchase_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        Comprar
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {onToggleFavorite && user && (
                      <button
                        onClick={() => onToggleFavorite(game.id)}
                        className={`p-3 rounded-lg transition-all duration-200 ${
                          isFavorite
                            ? 'bg-red-500 text-white'
                            : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="w-6 h-6 text-cyan-400" />
                Avaliações da Comunidade
              </h3>

              {user && (
                <form onSubmit={handleSubmitReview} className="bg-slate-900 rounded-xl p-6 mb-6 border border-slate-700">
                  <h4 className="text-lg font-semibold text-white mb-4">Deixe sua avaliação</h4>

                  <div className="flex gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setNewRating(rating)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            rating <= newRating
                              ? 'text-yellow-500 fill-current'
                              : 'text-gray-600'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Compartilhe sua opinião sobre este jogo..."
                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                    rows={3}
                  />

                  <button
                    type="submit"
                    disabled={loadingReview}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-600 text-white font-bold rounded-lg transition-all duration-200"
                  >
                    {loadingReview ? 'Enviando...' : 'Publicar Avaliação'}
                  </button>
                </form>
              )}

              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-slate-900 rounded-xl p-6 border border-slate-700">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating
                                ? 'text-yellow-500 fill-current'
                                : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-500 text-sm">
                        {new Date(review.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    {review.comment && (
                      <p className="text-gray-300">{review.comment}</p>
                    )}
                  </div>
                ))}

                {reviews.length === 0 && (
                  <p className="text-center text-gray-500 py-8">
                    Nenhuma avaliação ainda. Seja o primeiro a avaliar!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
