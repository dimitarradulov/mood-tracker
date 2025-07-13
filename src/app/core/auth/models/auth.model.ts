import { Session, User } from '@supabase/supabase-js';

export interface AuthCredentials {
  email: string;
  password: string;
}
export interface AuthResult {
  user: User;
  session: Session;
}
export type AuthMode = 'login' | 'signup';
export interface AuthFormData {
  email: string;
  password: string;
}
export interface AuthState {
  loading: boolean;
  error: string | null;
  user: UserProfile | null;
  session: Session | null;
}

export interface UserProfile {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  name?: string;
  avatar_url?: string;
}
