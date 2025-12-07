import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { configureSSL } from './ssl-config';

configureSSL();

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: 'gamepromo-auth',
  },
  global: {
    headers: {
      'X-Client-Info': 'gamepromo-cv',
    },
    fetch: (url, options = {}) => {
      return fetch(url, {
        ...options,
        mode: 'cors',
        credentials: 'omit',
      });
    },
  },
  db: {
    schema: 'public',
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});
