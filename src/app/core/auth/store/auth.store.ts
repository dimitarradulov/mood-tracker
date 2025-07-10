import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { AuthState } from '../models/auth.model';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

const initialState: AuthState = {
  loading: false,
  error: null,
  session: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, authService = inject(AuthService)) => ({
    async signUp(email: string, password: string) {
      patchState(store, { loading: true, error: null });

      try {
        throw new Error('This method is not implemented yet.');
        const data = await authService.signUp(email, password);

        await authService.createProfile(data.user.id);
      } catch (error: any) {
        patchState(store, { error });
      } finally {
        patchState(store, { loading: false });
      }
    },

    async signOut() {
      patchState(store, { loading: true, error: null });

      try {
        await authService.signOut();
        patchState(store, { session: null, error: null });
      } catch (error: any) {
        patchState(store, { error });
      } finally {
        patchState(store, { loading: false });
      }
    },
  })),
  withHooks((store) => ({
    onInit() {
      const authService = inject(AuthService);

      authService.supabase.auth.onAuthStateChange((_, session) => {
        patchState(store, {
          session,
          loading: false,
          error: null,
        });
      });
    },
  })),
);
