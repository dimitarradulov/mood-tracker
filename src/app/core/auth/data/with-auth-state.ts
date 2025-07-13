import { signalStoreFeature, withComputed, withState } from '@ngrx/signals';
import { AuthState } from '../models/auth.model';
import { computed } from '@angular/core';

const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
  session: null,
};

export function withAuthState() {
  return signalStoreFeature(
    withState(initialState),
    withComputed(({ session }) => ({
      isAuthenticated: computed(() => !!session()),
    })),
  );
}
