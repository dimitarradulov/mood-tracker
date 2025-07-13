import { effect, inject, Signal } from '@angular/core';
import { patchState, signalStoreFeature, type, withHooks } from '@ngrx/signals';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AuthState } from '../models/auth.model';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function withInitAuthHook<_>() {
  return signalStoreFeature(
    {
      state: type<AuthState>(),
      props: { isAuthenticated: type<Signal<boolean>>() },
    },
    withHooks((store) => ({
      onInit() {
        const authService = inject(AuthService);
        const router = inject(Router);

        effect(() => {
          store.isAuthenticated();

          router.navigate(['/']);
        });

        authService.onAuthStateChange((event, session) => {
          if (event === 'SIGNED_OUT') {
            patchState(store, { user: null, session: null });
          }

          if (event === 'INITIAL_SESSION' && session?.user) {
            patchState(store, { session });

            authService
              .getProfileById(session.user.id)
              .then((user) => patchState(store, { user }))
              .catch((error) => {
                console.error(error);
                patchState(store, { error: 'Failed to retrieve user profile' });
              });
          }
        });
      },
    })),
  );
}
