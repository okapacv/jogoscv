import { useState, useEffect } from 'react';
import { Clock, User } from 'lucide-react';
import type { News } from '../lib/database.types';
import { supabase } from '../lib/supabase';

export default function NewsPage() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const { data } = await supabase
      .from('news')
      .select('*')
      .not('published_at', 'is', null)
      .lte('published_at', new Date().toISOString())
      .order('published_at', { ascending: false });

    if (data) {
      setNews(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Carregando notícias...</p>
        </div>
      </div>
    );
  }

  if (news.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-4xl font-black text-white mb-4">Notícias e Novidades</h2>
        <p className="text-gray-400 text-lg mb-8">
          Fique por dentro das últimas novidades do mundo dos games
        </p>
        <div className="bg-slate-800 rounded-xl p-12 border border-slate-700">
          <p className="text-gray-400 text-lg">
            Em breve teremos notícias e dicas incríveis para você!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          Notícias e Novidades
        </h1>
        <p className="text-gray-400 text-lg">
          Fique por dentro das últimas novidades do mundo dos games
        </p>
      </div>

      <div className="grid gap-8">
        {news.map((article) => (
          <article
            key={article.id}
            className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500 transition-all duration-300 group"
          >
            <div className="md:flex">
              {article.cover_image_url && (
                <div className="md:w-1/3 aspect-video md:aspect-auto overflow-hidden bg-slate-900">
                  <img
                    src={article.cover_image_url}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              <div className={`p-6 ${article.cover_image_url ? 'md:w-2/3' : 'w-full'}`}>
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
                  {article.published_at && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <time>
                        {new Date(article.published_at).toLocaleDateString('pt-BR', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </time>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>Equipe GamePromo</span>
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {article.title}
                </h2>

                <p className="text-gray-300 leading-relaxed mb-4">
                  {article.excerpt || article.content.substring(0, 200) + '...'}
                </p>

                <button className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                  Ler mais →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
