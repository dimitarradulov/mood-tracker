import { Injectable } from '@angular/core';
import {
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey,
    );
  }

  async signUp(
    email: string,
    password: string,
  ): Promise<{
    user: User;
    session: Session;
  }> {
    try {
      const { data, error } = await this.supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      if (!data.session || !data.user) {
        throw new Error(
          'Sign up was successful, but no session was created. Please try logging in manually.',
        );
      }

      return {
        user: data.user,
        session: data.session,
      };
    } catch (error) {
      throw this.generateErrorMessage(error);
    }
  }

  async createProfile(userId: string) {
    try {
      const { error } = await this.supabase.from('profiles').insert({
        id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;
    } catch (error) {
      throw this.generateErrorMessage(error);
    }
  }

  async signOut() {
    try {
      const { error } = await this.supabase.auth.signOut();

      if (error) throw error;
    } catch (error) {
      throw this.generateErrorMessage(error, 'Sign out failed');
    }
  }

  private generateErrorMessage(
    error: unknown,
    genericMessage = 'Sign up failed',
  ): string {
    return error instanceof Error ? error.message : genericMessage;
  }
}
