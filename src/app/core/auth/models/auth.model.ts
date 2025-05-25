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
