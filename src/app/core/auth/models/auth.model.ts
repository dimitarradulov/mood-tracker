import { AuthSession } from '@supabase/supabase-js';

export type AuthMode = 'login' | 'signup';
export type AuthFormData = {
  email: string;
  password: string;
};
export type AuthState = {
  loading: boolean;
  error: string | null;
  session: AuthSession | null;
};

export type Profile = {
  id: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
};
