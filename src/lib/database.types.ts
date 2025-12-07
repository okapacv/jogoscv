export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      platforms: {
        Row: {
          id: string
          name: string
          slug: string
          icon_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          icon_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          icon_url?: string | null
          created_at?: string
        }
      }
      games: {
        Row: {
          id: string
          title: string
          slug: string
          description: string | null
          original_price: number | null
          promotional_price: number | null
          discount_percentage: number
          cover_image_url: string | null
          screenshots: Json
          video_url: string | null
          release_date: string | null
          genre: string | null
          developer: string | null
          publisher: string | null
          platform_id: string | null
          promotion_type: string
          is_featured: boolean
          purchase_url: string | null
          airtable_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description?: string | null
          original_price?: number | null
          promotional_price?: number | null
          discount_percentage?: number
          cover_image_url?: string | null
          screenshots?: Json
          video_url?: string | null
          release_date?: string | null
          genre?: string | null
          developer?: string | null
          publisher?: string | null
          platform_id?: string | null
          promotion_type?: string
          is_featured?: boolean
          purchase_url?: string | null
          airtable_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string | null
          original_price?: number | null
          promotional_price?: number | null
          discount_percentage?: number
          cover_image_url?: string | null
          screenshots?: Json
          video_url?: string | null
          release_date?: string | null
          genre?: string | null
          developer?: string | null
          publisher?: string | null
          platform_id?: string | null
          promotion_type?: string
          is_featured?: boolean
          purchase_url?: string | null
          airtable_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          game_id: string
          user_id: string
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          game_id: string
          user_id: string
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          game_id?: string
          user_id?: string
          rating?: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          game_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          game_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          game_id?: string
          user_id?: string
          created_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          username: string | null
          avatar_url: string | null
          receive_alerts: boolean
          favorite_platforms: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          avatar_url?: string | null
          receive_alerts?: boolean
          favorite_platforms?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          avatar_url?: string | null
          receive_alerts?: boolean
          favorite_platforms?: Json
          created_at?: string
          updated_at?: string
        }
      }
      news: {
        Row: {
          id: string
          title: string
          slug: string
          content: string
          excerpt: string | null
          cover_image_url: string | null
          author_id: string | null
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: string
          excerpt?: string | null
          cover_image_url?: string | null
          author_id?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string | null
          cover_image_url?: string | null
          author_id?: string | null
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type Platform = Database['public']['Tables']['platforms']['Row'];
export type Game = Database['public']['Tables']['games']['Row'];
export type Review = Database['public']['Tables']['reviews']['Row'];
export type Favorite = Database['public']['Tables']['favorites']['Row'];
export type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
export type News = Database['public']['Tables']['news']['Row'];
