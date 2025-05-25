import { computed, Injectable, signal } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';
import { AuthState } from '../models/auth.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly supabase: SupabaseClient;
  private readonly state = signal<AuthState>({
    loading: false,
    error: null,
    session: null,
  });

  session = computed(() => this.state().session);
  loading = computed(() => this.state().loading);
  error = computed(() => this.state().error);

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );

    this.supabase.auth.onAuthStateChange((event, session) => {
      this.updateState({
        session,
        loading: false,
        error: null,
      });
    });
  }

  async signUp(email: string, password: string) {
    this.state.update((state) => ({ ...state, loading: true, error: null }));

    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      this.updateState({
        session: data.session,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Sign up failed';
      this.updateState({ loading: false, error: errorMessage });
    } finally {
      this.updateState({ loading: false });
    }
  }

  private updateState(partial: Partial<AuthState>) {
    this.state.update((current) => ({
      ...current,
      ...partial,
    }));
  }
}
