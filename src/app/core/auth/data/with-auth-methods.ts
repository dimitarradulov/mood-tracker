import { inject } from '@angular/core';
import { patchState, signalStoreFeature, withMethods } from '@ngrx/signals';
import { AuthService } from '../services/auth.service';

export function withAuthMethods() {
  return signalStoreFeature(
    withMethods((store, authService = inject(AuthService)) => ({
      async signUp(email: string, password: string) {
        patchState(store, { loading: true, error: null });

        try {
          const data = await authService.signUp(email, password);

          const userProfile = await authService.createProfile(
            data.user.id,
            data.user.email!,
          );

          patchState(store, { user: userProfile, session: data.session });
        } catch (error: unknown) {
          if (typeof error === 'string') {
            patchState(store, { error });
          }
        } finally {
          patchState(store, { loading: false });
        }
      },

      async signIn(email: string, password: string) {
        patchState(store, { loading: true, error: null });

        try {
          const { session } = await authService.signIn(email, password);

          const userId = session.user.id;

          const user = await authService.getProfileById(userId);

          patchState(store, { user, session });
        } catch (error: unknown) {
          if (typeof error === 'string') {
            patchState(store, { error });
          }
        } finally {
          patchState(store, { loading: false });
        }
      },

      async signOut() {
        patchState(store, { loading: true, error: null });

        try {
          await authService.signOut();
        } catch (error: unknown) {
          if (typeof error === 'string') {
            patchState(store, { error });
          }
        } finally {
          patchState(store, { loading: false });
        }
      },
    })),
  );
}
