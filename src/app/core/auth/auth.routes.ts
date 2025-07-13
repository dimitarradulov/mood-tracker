import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/auth.component').then((m) => m.AuthComponent),
    data: { authMode: 'login' },
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./pages/auth/auth.component').then((m) => m.AuthComponent),
    data: { authMode: 'signup' },
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
