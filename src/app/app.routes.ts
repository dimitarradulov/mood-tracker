import { Routes } from '@angular/router';
import {
  isAuthenticatedGuard,
  isNotAuthenticatedGuard,
  isUserProfileNotCompleteGuard,
  isUserProfileCompleteGuard,
  rootRedirectGuard,
} from './core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [rootRedirectGuard],
    children: [],
  },
  {
    path: 'auth',
    loadChildren: () => import('./core/auth/auth.routes').then((m) => m.routes),
    canActivateChild: [isNotAuthenticatedGuard],
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./core/profile/profile.routes').then((m) => m.routes),
    canActivateChild: [isAuthenticatedGuard, isUserProfileNotCompleteGuard],
  },
  {
    path: 'mood-board',
    loadChildren: () =>
      import('./modules/mood/mood.routes').then((m) => m.routes),
    canActivateChild: [isAuthenticatedGuard, isUserProfileCompleteGuard],
  },
];
