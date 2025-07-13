import { signalStore } from '@ngrx/signals';
import { withAuthMethods } from './with-auth-methods';
import { withInitAuthHook } from './with-init-auth-hook';
import { withAuthState } from './with-auth-state';

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withAuthState(),
  withAuthMethods(),
  withInitAuthHook(),
);
