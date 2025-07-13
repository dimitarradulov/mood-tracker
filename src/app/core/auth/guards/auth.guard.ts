import { inject } from '@angular/core';
import {
  CanActivateChildFn,
  CanActivateFn,
  RedirectCommand,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

export const isAuthenticatedGuard: CanActivateChildFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticated$.pipe(
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true;
      } else {
        const redirectUrl = router.parseUrl('/auth/login');
        return new RedirectCommand(redirectUrl);
      }
    }),
  );
};

export const isNotAuthenticatedGuard: CanActivateChildFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isAuthenticated$.pipe(
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        return true;
      } else {
        const redirectUrl = router.parseUrl('/mood-board');
        return new RedirectCommand(redirectUrl);
      }
    }),
  );
};

export const isUserProfileNotCompleteGuard: CanActivateChildFn = () => {
  const authService = inject(AuthService);
  return authService.isUserProfileComplete$.pipe(
    map((isComplete) => !isComplete),
  );
};

export const isUserProfileCompleteGuard: CanActivateChildFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return authService.isUserProfileComplete$.pipe(
    map((isComplete) => {
      if (isComplete) {
        return true;
      } else {
        const redirectUrl = router.parseUrl('/profile');
        return new RedirectCommand(redirectUrl);
      }
    }),
  );
};

export const rootRedirectGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuthenticated$.pipe(
    switchMap((isAuthenticated) => {
      if (!isAuthenticated) {
        // User is not authenticated, redirect to login
        const redirectUrl = router.parseUrl('/auth/login');
        return of(new RedirectCommand(redirectUrl));
      } else {
        // User is authenticated, check profile completion
        return authService.isUserProfileComplete$.pipe(
          map((isComplete) => {
            if (isComplete) {
              // Profile is complete, redirect to mood-board
              const redirectUrl = router.parseUrl('/mood-board');
              return new RedirectCommand(redirectUrl);
            } else {
              // Profile is incomplete, redirect to profile completion
              const redirectUrl = router.parseUrl('/profile');
              return new RedirectCommand(redirectUrl);
            }
          }),
        );
      }
    }),
  );
};
