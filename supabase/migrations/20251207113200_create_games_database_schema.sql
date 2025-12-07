/*
  # Schema para Website de Promoções de Games - Cabo Verde

  1. Novas Tabelas
    - `platforms`
      - `id` (uuid, primary key)
      - `name` (text) - Nome da plataforma (PlayStation, Xbox, Nintendo, PC)
      - `slug` (text, unique) - Slug para URLs
      - `icon_url` (text) - URL do ícone
      - `created_at` (timestamptz)
    
    - `games`
      - `id` (uuid, primary key)
      - `title` (text) - Título do jogo
      - `slug` (text, unique) - Slug para URLs
      - `description` (text) - Descrição completa
      - `original_price` (decimal) - Preço original
      - `promotional_price` (decimal) - Preço promocional
      - `discount_percentage` (integer) - Porcentagem de desconto
      - `cover_image_url` (text) - URL da capa
      - `screenshots` (jsonb) - Array de URLs de screenshots
      - `video_url` (text) - URL do vídeo
      - `release_date` (date) - Data de lançamento
      - `genre` (text) - Gênero do jogo
      - `developer` (text) - Desenvolvedora
      - `publisher` (text) - Publicadora
      - `platform_id` (uuid, foreign key) - Plataforma
      - `promotion_type` (text) - Tipo: 'discount', 'preorder', 'launch'
      - `is_featured` (boolean) - Destaque na home
      - `purchase_url` (text) - URL de compra
      - `airtable_id` (text, unique) - ID do Airtable para sincronização
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `reviews`
      - `id` (uuid, primary key)
      - `game_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key) - Referência a auth.users
      - `rating` (integer) - Nota de 1 a 5
      - `comment` (text) - Comentário
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `favorites`
      - `id` (uuid, primary key)
      - `game_id` (uuid, foreign key)
      - `user_id` (uuid, foreign key) - Referência a auth.users
      - `created_at` (timestamptz)
    
    - `user_profiles`
      - `id` (uuid, primary key) - Referência a auth.users
      - `username` (text, unique)
      - `avatar_url` (text)
      - `receive_alerts` (boolean) - Receber alertas de promoções
      - `favorite_platforms` (jsonb) - Array de plataformas favoritas
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `news`
      - `id` (uuid, primary key)
      - `title` (text) - Título da notícia
      - `slug` (text, unique) - Slug para URLs
      - `content` (text) - Conteúdo completo
      - `excerpt` (text) - Resumo
      - `cover_image_url` (text) - URL da imagem de capa
      - `author_id` (uuid, foreign key) - Referência a auth.users
      - `published_at` (timestamptz)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Segurança
    - Habilitar RLS em todas as tabelas
    - Políticas para leitura pública de games, platforms e news
    - Políticas para usuários autenticados criarem reviews e favorites
    - Políticas para proteção de dados dos usuários
*/

-- Criar tabela de plataformas
CREATE TABLE IF NOT EXISTS platforms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  icon_url text,
  created_at timestamptz DEFAULT now()
);

-- Criar tabela de jogos
CREATE TABLE IF NOT EXISTS games (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  original_price decimal(10, 2),
  promotional_price decimal(10, 2),
  discount_percentage integer DEFAULT 0,
  cover_image_url text,
  screenshots jsonb DEFAULT '[]'::jsonb,
  video_url text,
  release_date date,
  genre text,
  developer text,
  publisher text,
  platform_id uuid REFERENCES platforms(id) ON DELETE CASCADE,
  promotion_type text DEFAULT 'discount',
  is_featured boolean DEFAULT false,
  purchase_url text,
  airtable_id text UNIQUE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Criar tabela de avaliações
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id uuid REFERENCES games(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  rating integer CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  comment text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(game_id, user_id)
);

-- Criar tabela de favoritos
CREATE TABLE IF NOT EXISTS favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  game_id uuid REFERENCES games(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(game_id, user_id)
);

-- Criar tabela de perfis de usuários
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE,
  avatar_url text,
  receive_alerts boolean DEFAULT true,
  favorite_platforms jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Criar tabela de notícias
CREATE TABLE IF NOT EXISTS news (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  cover_image_url text,
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_games_platform ON games(platform_id);
CREATE INDEX IF NOT EXISTS idx_games_featured ON games(is_featured);
CREATE INDEX IF NOT EXISTS idx_games_promotion_type ON games(promotion_type);
CREATE INDEX IF NOT EXISTS idx_reviews_game ON reviews(game_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user ON reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_game ON favorites(game_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(published_at);

-- Habilitar RLS
ALTER TABLE platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Políticas para platforms (leitura pública)
CREATE POLICY "Todos podem visualizar plataformas"
  ON platforms FOR SELECT
  TO public
  USING (true);

-- Políticas para games (leitura pública)
CREATE POLICY "Todos podem visualizar jogos"
  ON games FOR SELECT
  TO public
  USING (true);

-- Políticas para reviews
CREATE POLICY "Todos podem visualizar avaliações"
  ON reviews FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Usuários autenticados podem criar avaliações"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias avaliações"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar suas próprias avaliações"
  ON reviews FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Políticas para favorites
CREATE POLICY "Usuários podem visualizar seus próprios favoritos"
  ON favorites FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários autenticados podem adicionar favoritos"
  ON favorites FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem remover seus próprios favoritos"
  ON favorites FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Políticas para user_profiles
CREATE POLICY "Usuários podem visualizar todos os perfis públicos"
  ON user_profiles FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Usuários podem criar seu próprio perfil"
  ON user_profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil"
  ON user_profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Políticas para news (leitura pública)
CREATE POLICY "Todos podem visualizar notícias publicadas"
  ON news FOR SELECT
  TO public
  USING (published_at IS NOT NULL AND published_at <= now());

-- Inserir plataformas iniciais
INSERT INTO platforms (name, slug, icon_url) VALUES
  ('PlayStation', 'playstation', 'https://images.pexels.com/photos/4009600/pexels-photo-4009600.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Xbox', 'xbox', 'https://images.pexels.com/photos/7915289/pexels-photo-7915289.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('Nintendo', 'nintendo', 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=400'),
  ('PC', 'pc', 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400')
ON CONFLICT (slug) DO NOTHING;