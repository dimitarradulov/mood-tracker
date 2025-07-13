import { inject, Injectable } from '@angular/core';
import {
  AuthCredentials,
  AuthMode,
  AuthResult,
  UserProfile,
} from '../models/auth.model';
import { SupabaseService } from '../../../shared/services/supabase.service';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { from } from 'rxjs';
import { filter, map, shareReplay, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly supabaseService = inject(SupabaseService);
  private readonly supabaseAuth = this.supabaseService.auth;

  isUserProfileComplete$ = from(this.supabaseAuth.getUser()).pipe(
    filter(({ data }) => !!data?.user),
    switchMap(({ data }) => from(this.getProfileById(data.user!.id))),
    map((profile) => !!profile.name),
    shareReplay(1),
  );

  isAuthenticated$ = from(this.supabaseAuth.getSession()).pipe(
    map(({ data }) => !!data.session),
    shareReplay(1),
  );

  onAuthStateChange(
    callback: (event: AuthChangeEvent, session: Session | null) => void,
  ) {
    return this.supabaseAuth.onAuthStateChange(callback);
  }

  async signUp(email: string, password: string): Promise<AuthResult> {
    return this.authenticate('signup', email, password);
  }

  async signIn(email: string, password: string): Promise<AuthResult> {
    return this.authenticate('login', email, password);
  }

  async signOut() {
    try {
      const { error } = await this.supabaseAuth.signOut();

      if (error) throw error;
    } catch (error) {
      throw this.generateErrorMessage(error, 'Sign out failed');
    }
  }

  async createProfile(userId: string, email: string) {
    try {
      return this.supabaseService.insertDocument<UserProfile>('profiles', {
        id: userId,
        email,
      });
    } catch (error) {
      throw this.generateErrorMessage(error);
    }
  }

  async getProfileById(id: string) {
    try {
      return this.supabaseService.getDocumentById<UserProfile>('profiles', id);
    } catch (error) {
      throw this.generateErrorMessage(error, 'Error fetching profile');
    }
  }

  private async authenticate(
    method: AuthMode,
    email: string,
    password: string,
  ): Promise<AuthResult> {
    try {
      const authOperation = this.getAuthOperation(method);
      const { data, error } = await authOperation({ email, password });

      if (error) throw error;

      return this.validateAuthResponse(data, method);
    } catch (error) {
      throw this.generateErrorMessage(error);
    }
  }

  private getAuthOperation = (method: AuthMode) =>
    ({
      signup: (credentials: AuthCredentials) =>
        this.supabaseAuth.signUp(credentials),
      login: (credentials: AuthCredentials) =>
        this.supabaseAuth.signInWithPassword(credentials),
    })[method];

  private validateAuthResponse = (
    data: {
      user: User | null;
      session: Session | null;
    },
    method: AuthMode,
  ): AuthResult => {
    if (!data.session || !data.user) {
      const action = method === 'signup' ? 'Sign up' : 'Sign in';
      throw new Error(
        `${action} was successful, but no session was created. Please try logging in manually.`,
      );
    }

    return {
      user: data.user,
      session: data.session,
    };
  };

  private generateErrorMessage(
    error: unknown,
    genericMessage = 'Sign up failed',
  ): string {
    return error instanceof Error ? error.message : genericMessage;
  }
}
