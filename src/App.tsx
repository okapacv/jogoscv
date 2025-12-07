import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import type { Game, Platform, Favorite } from './lib/database.types';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroBanner from './components/HeroBanner';
import GameCard from './components/GameCard';
import FilterBar from './components/FilterBar';
import GameDetailModal from './components/GameDetailModal';
import AuthModal from './components/AuthModal';
import FAQPage from './components/FAQPage';
import NewsPage from './components/NewsPage';
import { Heart, TrendingUp } from 'lucide-react';

function App() {
  const [user, setUser] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedPromoType, setSelectedPromoType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    loadPlatforms();
    loadGames();

    const { data: authListener } = supabase.auth.onAuthStateChange(() => {
      (() => {
        checkUser();
      })();
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      loadFavorites();
    }
  }, [user]);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const loadPlatforms = async () => {
    const { data } = await supabase
      .from('platforms')
      .select('*')
      .order('name');

    if (data) {
      setPlatforms(data);
    }
  };

  const loadGames = async () => {
    const { data } = await supabase
      .from('games')
      .select('*, platforms(*)')
      .order('created_at', { ascending: false });

    if (data) {
      setGames(data);
    }
    setLoading(false);
  };

  const loadFavorites = async () => {
    if (!user) return;

    const { data } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', user.id);

    if (data) {
      setFavorites(data);
    }
  };

  const handleToggleFavorite = async (gameId: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    const isFavorite = favorites.some(f => f.game_id === gameId);

    if (isFavorite) {
      await supabase
        .from('favorites')
        .delete()
        .eq('game_id', gameId)
        .eq('user_id', user.id);
    } else {
      await supabase
        .from('favorites')
        .insert({ game_id: gameId, user_id: user.id });
    }

    loadFavorites();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setFavorites([]);
    setCurrentPage('home');
  };

  const featuredGames = games.filter(g => g.is_featured).slice(0, 5);

  const filteredGames = games.filter(game => {
    const platformMatch = selectedPlatform === 'all' || game.platform_id === selectedPlatform;
    const promoMatch = selectedPromoType === 'all' || game.promotion_type === selectedPromoType;
    return platformMatch && promoMatch;
  });

  const favoriteGames = games.filter(g => favorites.some(f => f.game_id === g.id));

  const renderPage = () => {
    if (currentPage === 'faq') {
      return <FAQPage />;
    }

    if (currentPage === 'news') {
      return <NewsPage />;
    }

    if (currentPage === 'favorites') {
      if (!user) {
        return (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Entre para ver seus favoritos</h2>
            <p className="text-gray-400 mb-6">
              Faça login para salvar seus jogos favoritos e receber alertas
            </p>
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-lg"
            >
              Entrar Agora
            </button>
          </div>
        );
      }

      return (
        <div>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Meus Favoritos
            </h1>
            <p className="text-gray-400 text-lg">
              Seus jogos salvos em um só lugar
            </p>
          </div>

          {favoriteGames.length === 0 ? (
            <div className="text-center py-12 bg-slate-800 rounded-xl border border-slate-700">
              <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">
                Você ainda não tem jogos favoritos
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favoriteGames.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onGameClick={setSelectedGame}
                  isFavorite={true}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <>
        <HeroBanner featuredGames={featuredGames} onGameClick={setSelectedGame} />

        <div className="mt-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-black text-white">
              {currentPage === 'promotions' ? 'Todas as Promoções' : 'Destaques da Semana'}
            </h2>
          </div>

          {currentPage === 'promotions' && (
            <FilterBar
              platforms={platforms}
              selectedPlatform={selectedPlatform}
              selectedPromoType={selectedPromoType}
              onPlatformChange={setSelectedPlatform}
              onPromoTypeChange={setSelectedPromoType}
            />
          )}

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-400">Carregando promoções...</p>
              </div>
            </div>
          ) : filteredGames.length === 0 ? (
            <div className="text-center py-12 bg-slate-800 rounded-xl border border-slate-700">
              <p className="text-gray-400 text-lg">
                Nenhuma promoção encontrada com os filtros selecionados
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {(currentPage === 'home' ? filteredGames.slice(0, 8) : filteredGames).map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onGameClick={setSelectedGame}
                  isFavorite={favorites.some(f => f.game_id === game.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}

          {currentPage === 'home' && filteredGames.length > 8 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setCurrentPage('promotions')}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold rounded-lg transition-all duration-200"
              >
                Ver Todas as Promoções
              </button>
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <Header
        onNavigate={setCurrentPage}
        currentPage={currentPage}
        user={user}
        onAuthClick={() => {
          if (user) {
            handleLogout();
          } else {
            setAuthModalOpen(true);
          }
        }}
      />

      <main className="container mx-auto px-4 py-8">
        {renderPage()}
      </main>

      <Footer />

      <GameDetailModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
        user={user}
        isFavorite={selectedGame ? favorites.some(f => f.game_id === selectedGame.id) : false}
        onToggleFavorite={handleToggleFavorite}
      />

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          checkUser();
          setAuthModalOpen(false);
        }}
      />
    </div>
  );
}

export default App;
