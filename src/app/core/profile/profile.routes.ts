import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/complete-profile/complete-profile.component').then(
        (m) => m.CompleteProfileComponent,
      ),
  },
];
